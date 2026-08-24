# StructKit for VS Code and Cursor

Companion to [StructKit](https://github.com/httpdss/structkit). Schema validation and autocomplete for `.struct.yaml`. Install the CLI with `pip install structkit`. Star the [core repo](https://github.com/httpdss/structkit).

## Features

- **Schema Validation**: Automatic validation of `*.struct.yaml` files using the official StructKit schema
- **Custom Schema Generation**: Generate custom schemas based on your StructKit configurations
- **Intelligent Autocomplete**: Get suggestions and validation while editing StructKit files
- **Configurable CLI Path**: Set custom path to your `structkit` command executable
- **Custom Structures Support**: Configure path to custom structures for enhanced validation

## Installation

### Prerequisites

Install the StructKit CLI:

```bash
pip install structkit
```

### Extension Installation

- **From Marketplace** (coming soon): Search for "StructKit" in VS Code/Cursor extensions
- **From VSIX**: Download the `.vsix` file and install via `code --install-extension structkit-*.vsix`

## Configuration

### Extension Settings

This extension contributes the following settings:

- `structkit.commandPath`: Path to the structkit command executable (default: `structkit`)
- `structkit.customStructuresPath`: Path to custom structures directory (default: empty)

### Setting up the Extension

1. Install the extension
2. Install StructKit CLI: `pip install structkit`
3. Configure the structkit command path in VS Code settings (optional):
   - Open VS Code settings (Ctrl/Cmd + ,)
   - Search for "structkit"
   - Set `structkit.commandPath` to the path of your structkit executable
   - Optionally set `structkit.customStructuresPath` to your custom structures directory

## Commands

- `StructKit: Generate Custom Schema` - Generate a custom schema based on your StructKit configuration
- `StructKit: Refresh Schema` - Refresh the schema validation

## Usage

1. Create or open a file with the `.struct.yaml` extension
2. The extension will automatically apply schema validation
3. If you have custom structures configured, use the "Generate Custom Schema" command to create enhanced validation
4. Enjoy intelligent autocomplete and validation while editing your StructKit files

## Requirements

- VS Code or Cursor 1.74.0 or higher
- StructKit CLI: `pip install structkit` (required for custom schema generation)

## Known Issues

- Custom schema generation requires the `structkit` command to be available in your system
- Schema validation is currently optimized for `*.struct.yaml` files

## Release Notes

### 0.1.0

Initial release of the official StructKit extension:

- Schema validation for `*.struct.yaml` files using official StructKit schema
- Custom schema generation support
- Configurable structkit command path
- Custom structures path configuration
- Support for VS Code and Cursor

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT
