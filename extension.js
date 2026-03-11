const vscode = require('vscode');

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
    const outputChannel = vscode.window.createOutputChannel("Telegram Bridge CDP");
    outputChannel.appendLine('Antigravity Telegram Bridge Extension Activated.');

    // Commands to configure tokens from VS Code UI
    context.subscriptions.push(
        vscode.commands.registerCommand('antigravity-telegram.setToken', async () => {
            const token = await vscode.window.showInputBox({ prompt: 'Telegram Bot Token', password: true });
            if (token) {
                await vscode.workspace.getConfiguration('antigravityTelegram').update('botToken', token, vscode.ConfigurationTarget.Global);
                vscode.window.showInformationMessage('Token updated. Please restart standalone_bot.js.');
            }
        }),
        vscode.commands.registerCommand('antigravity-telegram.setChatId', async () => {
            const chatId = await vscode.window.showInputBox({ prompt: 'Your Chat ID' });
            if (chatId) {
                await vscode.workspace.getConfiguration('antigravityTelegram').update('chatId', chatId, vscode.ConfigurationTarget.Global);
                vscode.window.showInformationMessage('Chat ID updated.');
            }
        })
    );
}

function deactivate() {}

module.exports = {
    activate,
    deactivate
}
