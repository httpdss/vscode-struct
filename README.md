# Struct YAML Support for VS Code

A VS Code extension that provides enhanced support for struct YAML configuration files with schema validation and intelligent autocomplete.

## Features

- **Schema Validation**: Automatic validation of `*.struct.yaml` files using the official struct schema
- **Custom Schema Generation**: Generate custom schemas based on your struct configurations
- **Intelligent Autocomplete**: Get suggestions and validation while editing struct files
- **Configurable Struct Path**: Set custom path to your struct command executable
- **Custom Structures Support**: Configure path to custom structures for enhanced validation

## Configuration

### Extension Settings

This extension contributes the following settings:

- `struct.commandPath`: Path to the struct command executable (default: `struct`)
- `struct.customStructuresPath`: Path to custom structures directory (default: empty)

### Setting up the Extension

1. Install the extension
2. Configure the struct command path in VS Code settings:
   - Open VS Code settings (Ctrl/Cmd + ,)
   - Search for "struct"
   - Set `struct.commandPath` to the path of your struct executable
   - Optionally set `struct.customStructuresPath` to your custom structures directory

## Commands

- `Struct: Generate Custom Schema` - Generate a custom schema based on your struct configuration
- `Struct: Refresh Schema` - Refresh the schema validation

## Usage

1. Create or open a file with the `.struct.yaml` extension
2. The extension will automatically apply schema validation
3. If you have custom structures configured, use the "Generate Custom Schema" command to create enhanced validation
4. Enjoy intelligent autocomplete and validation while editing your struct files

## Requirements

- VS Code 1.74.0 or higher
- struct command-line tool (optional, for custom schema generation)

## Extension Settings

This extension contributes the following settings:

* `struct.commandPath`: Path to the struct command executable
* `struct.customStructuresPath`: Path to custom structures directory

## Known Issues

- Custom schema generation requires the struct command to be available in your system
- Schema validation is currently limited to `*.struct.yaml` files

## Release Notes

### 0.1.0

Initial release of Struct YAML Support extension:

- Basic schema validation for `*.struct.yaml` files
- Custom schema generation support
- Configurable struct command path
- Custom structures path configuration

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT
