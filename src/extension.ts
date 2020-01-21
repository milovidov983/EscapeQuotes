
import * as vscode from 'vscode';
import {
	TextEditorEdit,
	TextLine,
	Range,
	Position,
	TextDocument,
	Selection
} from 'vscode';


export function activate(context: vscode.ExtensionContext) {
	const setQuotes = (text: string) => [...text].map(c => {
		if (c == '\"' || c == '\'') {
			return '\\' + c;
		}
		return c;
	}).join('');

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
					const resultLineText = setQuotes(selectedText);

					edit.replace(selection, resultLineText);
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
					for (let i = selection.start.line; i <= selection.end.line; i++) {
						let selLine: TextLine = doc.lineAt(i);
						let insertPos: Range = selLine.range;
						let insertLineText: string = selLine.text;

						let resultLineText: string = "";
						for (let i = 0; i < insertLineText.length; i++) {
							if (insertLineText[i] == '\\') {
								switch (insertLineText[i + 1]) {
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
								resultLineText += insertLineText[i];
							}
						}

						edit.replace(insertPos, resultLineText);
					}
				})
			});
		}

	});

	context.subscriptions.push(screenQuotesVScommand);
	context.subscriptions.push(screenUnquoteVScommand);
}

// this method is called when your extension is deactivated
export function deactivate() { }