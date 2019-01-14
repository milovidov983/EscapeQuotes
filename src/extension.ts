
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


	context.subscriptions.push(screenQuotes);
}

// this method is called when your extension is deactivated
export function deactivate() {}
