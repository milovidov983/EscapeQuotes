import * as vscode from 'vscode';
import { Commands } from './constants';
import { getQuotedText as escapeSimpleQuotes, getUnquotedText as unescapeSimpleQuotes } from './utils';

export function activate(context: vscode.ExtensionContext) {

	context.subscriptions.push(vscode.commands.registerCommand(Commands.EscapeQuotes, () => {
		const textEditor = vscode.window.activeTextEditor;

		if (textEditor) {
			const selections: vscode.Selection[] = textEditor.selections;
			const doc: vscode.TextDocument = textEditor.document;

			textEditor.edit((edit: vscode.TextEditorEdit) => {
				selections.forEach((selection: vscode.Selection) => {
					const selectedText = doc.getText(selection);
					const resultText = escapeSimpleQuotes(selectedText);

					edit.replace(selection, resultText);
				});
			});
		}

	}), vscode.commands.registerCommand(Commands.UnescapeQuotes, () => {
		const textEditor = vscode.window.activeTextEditor;

		if (textEditor) {
			const selections: vscode.Selection[] = textEditor.selections;
			const doc: vscode.TextDocument = textEditor.document;

			textEditor.edit((edit: vscode.TextEditorEdit) => {
				selections.forEach((selection: vscode.Selection) => {
					const selectedText = doc.getText(selection);
					const resultText = unescapeSimpleQuotes(selectedText);

					edit.replace(selection, resultText);
				});
			});
		}

	}));
}

export function deactivate() { }