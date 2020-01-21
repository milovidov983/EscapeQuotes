
import * as vscode from 'vscode';
import {
	TextEditorEdit,
	TextLine,
	Position,
	TextDocument,
	Selection
} from 'vscode';


export function activate(context: vscode.ExtensionContext) {
	const getQuotedText = (text: string) => [...text].map(c => {
		if (c == '\"' || c == '\'') {
			return '\\' + c;
		}
		return c;
	}).join('');

	const getUnquotedText = (text: string) => {
		let resultLineText: string = "";
		for (let i = 0; i < text.length; i++) {
			if (text[i] == '\\') {
				switch (text[i + 1]) {
					case 'n':
						resultLineText += '\n';
						break;
					case 'r':
						resultLineText += '\r';
						break;
					case 't':
						resultLineText += '\t';
						break;
					case '\\':
						resultLineText += '\\';
						break;
					case '"':
						resultLineText += '"';
						break;
					case '\'':
						resultLineText += '\'';
						break;
				}
				i += 1;
			} else {
				resultLineText += text[i];
			}
		}
		return resultLineText;
	}

	const getSelectedText = (selection: Selection, doc: TextDocument) => {
		const startPosition: Position = selection.start;
		const endPosition: Position = selection.end;
		const selectedLine: TextLine = doc.lineAt(startPosition.line);
		return selectedLine.text.substring(startPosition.character, endPosition.character);
	};

	const screenQuotesVScommand = vscode.commands.registerCommand('extension.screenQuotes', () => {
		const textEditor = vscode.window.activeTextEditor;

		if (textEditor) {
			const selections: Selection[] = textEditor.selections;
			const doc: TextDocument = textEditor.document;

			textEditor.edit((edit: TextEditorEdit) => {
				selections.forEach((selection: Selection) => {
					const selectedText = getSelectedText(selection, doc);
					const resultText = getQuotedText(selectedText);

					edit.replace(selection, resultText);
				})
			});
		}

	});

	const screenUnquoteVScommand = vscode.commands.registerCommand('extension.screenUnquotes', () => {
		const textEditor = vscode.window.activeTextEditor;

		if (textEditor) {
			const selections: vscode.Selection[] = textEditor.selections;
			const doc: vscode.TextDocument = textEditor.document;

			textEditor.edit((edit: TextEditorEdit) => {
				selections.forEach((selection: Selection) => {
					const selectedText = getSelectedText(selection, doc);
					const resultText = getUnquotedText(selectedText);

					edit.replace(selection, resultText);
				})
			});
		}

	});

	context.subscriptions.push(screenQuotesVScommand);
	context.subscriptions.push(screenUnquoteVScommand);
}

// this method is called when your extension is deactivated
export function deactivate() { }