export function getQuotedText(text: string) {
    return text.replace(/(?<!\\)([\"'])/g, '\\$1');
}

export function getUnquotedText(text: string) {
    text = text.replace(/\\([\"'])/g, '$1');
    return text;
}