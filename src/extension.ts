
import * as vscode from 'vscode';
import { TextEditorEdit, TextLine, Range } from 'vscode';


export function activate(context: vscode.ExtensionContext) {


	let screenQuotes = vscode.commands.registerCommand('extension.screenQuotes', () => {
		
		let textEditor = vscode.window.activeTextEditor;

		if(textEditor){
			let selections: vscode.Selection[] = textEditor.selections;
			let doc: vscode.TextDocument = textEditor.document;

			textEditor.edit(function(edit: TextEditorEdit):void {
				selections.forEach( (selection: vscode.Selection, index: Number) =>{
					for (let i = selection.start.line; i <= selection.end.line; i++) {
						let selLine: TextLine = doc.lineAt(i);
						let insertPos: Range = selLine.range;
						let insertLineText: string = selLine.text;
						
						let resultLineText = [...insertLineText].map(c =>{
							if(c == '\"' || c == '\''){
								return '\\' + c;
							}
							return c;
						}).join('');

						edit.replace(insertPos, resultLineText);
					}
				})
			});
		}
		
	});

	let screenUnquote = vscode.commands.registerCommand('extension.screenUnquotes', () => {
	
		let textEditor = vscode.window.activeTextEditor;

		if(textEditor){
			let selections: vscode.Selection[] = textEditor.selections;
			let doc: vscode.TextDocument = textEditor.document;

			textEditor.edit(function(edit: TextEditorEdit):void {
				selections.forEach( (selection: vscode.Selection, index: Number) =>{
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

	context.subscriptions.push(screenQuotes);
	context.subscriptions.push(screenUnquote);
}

// this method is called when your extension is deactivated
export function deactivate() {}
