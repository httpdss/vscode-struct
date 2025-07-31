function updateStatusBar(isAvailable: boolean) {
    if (isAvailable) {
        statusBarItem.text = 'Struct: $(check) Available';
        statusBarItem.color = 'lightgreen';
    } else {
        statusBarItem.text = 'Struct: $(x) Not Available';
        statusBarItem.color = 'red';
    }
    statusBarItem.show();
}

import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

let schemaProvider: vscode.Disposable | undefined;
let statusBarItem: vscode.StatusBarItem;
let documentSelector: vscode.DocumentSelector = { pattern: '**/*.struct.yaml' };

export function activate(context: vscode.ExtensionContext) {
    console.log('Struct YAML extension is now active!');

    // Create status bar item
    statusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right, 100);
    statusBarItem.command = 'struct.refreshSchema';
    context.subscriptions.push(statusBarItem);

    // Register configuration change listener
    const configWatcher = vscode.workspace.onDidChangeConfiguration(event => {
        if (event.affectsConfiguration('struct')) {
            updateSchemaForStructFiles();
        }
    });

    // Register command to generate custom schema
    const generateSchemaCommand = vscode.commands.registerCommand('struct.generateSchema', async () => {
        await generateCustomSchema();
    });

    // Register command to refresh schema
    const refreshSchemaCommand = vscode.commands.registerCommand('struct.refreshSchema', async () => {
        await updateSchemaForStructFiles();
    });

    // Set up initial schema
    setupYamlSchema();

    // Update schema on activation
    updateSchemaForStructFiles();

    context.subscriptions.push(configWatcher, generateSchemaCommand, refreshSchemaCommand);
}

async function updateSchemaForStructFiles() {
    const config = vscode.workspace.getConfiguration('struct');
    const structPath = config.get<string>('commandPath', 'struct');
    const customStructuresPath = config.get<string>('customStructuresPath', '');

    try {
        // Check if struct command is available
        console.log(`[DEBUG] Trying to execute: ${structPath} list`);
        const result = await execAsync(`${structPath} list`);
        console.log(`[DEBUG] Command succeeded:`, result.stdout.substring(0, 100) + '...');
        updateStatusBar(true);
        
        // Generate custom schema if custom structures path is set
        if (customStructuresPath && customStructuresPath.trim() !== '') {
            await generateCustomSchema();
        }
    } catch (error: any) {
        console.log(`[DEBUG] Command failed: ${structPath} list`);        
        console.log(`[DEBUG] Error:`, error.message || error);
        console.log('Struct command not found or not working, using default schema');
        updateStatusBar(false);
        vscode.window.showWarningMessage(`Struct command not found. Please [install](https://github.com/httpdss/struct/blob/main/docs/installation.md) it to use all features of this extension.`, 'Install').then(selection => {
            if (selection === 'Install') {
                vscode.commands.executeCommand('vscode.open', vscode.Uri.parse('https://github.com/httpdss/struct/blob/main/docs/installation.md'));
            }
        });
    }
}

async function generateCustomSchema(): Promise<void> {
    const config = vscode.workspace.getConfiguration('struct');
    const structPath = config.get<string>('commandPath', 'struct');
    const customStructuresPath = config.get<string>('customStructuresPath', '');

    // Check if struct command is available first
    try {
        await execAsync(`${structPath} list`);
    } catch (error) {
        vscode.window.showErrorMessage(
            'Struct command not found. Please install it first to generate custom schemas.',
            'Install'
        ).then(selection => {
            if (selection === 'Install') {
                vscode.commands.executeCommand('vscode.open', vscode.Uri.parse('https://github.com/httpdss/struct/blob/main/docs/installation.md'));
            }
        });
        return;
    }

    try {
        // Show progress
        await vscode.window.withProgress({
            location: vscode.ProgressLocation.Notification,
            title: "Generating custom schema...",
            cancellable: false
        }, async (progress) => {
            progress.report({ increment: 0 });

            // Build the command with optional --structures-path parameter
            let command = `${structPath} generate-schema`;
            if (customStructuresPath && customStructuresPath.trim() !== '') {
                command += ` --structures-path "${customStructuresPath}"`;
            }

            // Run struct generate-schema command
            const { stdout } = await execAsync(command);
            
            progress.report({ increment: 50 });

            // Parse the generated schema to get the plugin list
            const generatedSchema = JSON.parse(stdout);
            const pluginList = generatedSchema.definitions?.PluginList?.enum || [];
            
            // Create merged schema with custom plugin list
            const mergedSchema = createMergedSchema(pluginList);

            // Save custom schema
            const workspaceFolder = vscode.workspace.workspaceFolders?.[0];
            if (workspaceFolder) {
                const customSchemaPath = path.join(workspaceFolder.uri.fsPath, '.vscode', 'struct-custom-schema.json');
                
                // Ensure .vscode directory exists
                const vscodeDir = path.dirname(customSchemaPath);
                if (!fs.existsSync(vscodeDir)) {
                    fs.mkdirSync(vscodeDir, { recursive: true });
                }
                
                fs.writeFileSync(customSchemaPath, JSON.stringify(mergedSchema, null, 2));
                
                progress.report({ increment: 100 });
                
                vscode.window.showInformationMessage('Custom schema generated successfully!');
            }
        });
        
        // Update schema after generation
        setupYamlSchema();
    } catch (error: any) {
        vscode.window.showErrorMessage(`Failed to generate custom schema: ${error.message}`);
    }
}

function setupYamlSchema() {
    const workspaceFolder = vscode.workspace.workspaceFolders?.[0];
    if (!workspaceFolder) {
        return;
    }

    const customSchemaPath = path.join(workspaceFolder.uri.fsPath, '.vscode', 'struct-custom-schema.json');
    const defaultSchemaPath = path.join(__dirname, '..', 'schemas', 'struct-schema.json');
    
    // Check if custom schema exists
    const useCustomSchema = fs.existsSync(customSchemaPath);
    const schemaUri = useCustomSchema 
        ? vscode.Uri.file(customSchemaPath).toString()
        : vscode.Uri.file(defaultSchemaPath).toString();
    
    console.log(`[DEBUG] Using schema: ${useCustomSchema ? 'custom' : 'default'} - ${schemaUri}`);
    
    // Update YAML schema associations
    updateYamlSchemaAssociation(schemaUri);
}

function createMergedSchema(pluginList: string[]) {
    // Read the base schema
    const defaultSchemaPath = path.join(__dirname, '..', 'schemas', 'struct-schema.json');
    const baseSchema = JSON.parse(fs.readFileSync(defaultSchemaPath, 'utf8'));
    
    // Create the merged schema with custom plugin enum
    const mergedSchema = {
        ...baseSchema,
        properties: {
            ...baseSchema.properties,
            folders: {
                ...baseSchema.properties.folders,
                items: {
                    ...baseSchema.properties.folders.items,
                    patternProperties: {
                        '.*': {
                            ...baseSchema.properties.folders.items.patternProperties['.*'],
                            properties: {
                                ...baseSchema.properties.folders.items.patternProperties['.*'].properties,
                                struct: {
                                    oneOf: [
                                        {
                                            type: 'string',
                                            enum: pluginList
                                        },
                                        {
                                            type: 'array',
                                            items: {
                                                type: 'string',
                                                enum: pluginList
                                            }
                                        }
                                    ]
                                }
                            }
                        }
                    }
                }
            }
        }
    };
    
    console.log(`[DEBUG] Created merged schema with ${pluginList.length} custom plugins`);
    return mergedSchema;
}

function updateYamlSchemaAssociation(schemaUri: string) {
    const yamlConfig = vscode.workspace.getConfiguration('yaml');
    const schemas: { [key: string]: string[] } = yamlConfig.get('schemas') || {};
    
    // Update the schema association for *.struct.yaml files
    schemas[schemaUri] = ['*.struct.yaml'];
    
    // Set the configuration
    yamlConfig.update('schemas', schemas, vscode.ConfigurationTarget.Workspace);
    
    console.log(`[DEBUG] Updated YAML schema association:`, { [schemaUri]: ['*.struct.yaml'] });
}

export function deactivate() {
    if (schemaProvider) {
        schemaProvider.dispose();
    }
}
