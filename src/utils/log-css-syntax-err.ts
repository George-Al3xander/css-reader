import { CssSyntaxError } from "postcss";

export const logCssSyntaxErr = (err: CssSyntaxError): void => {
    const { reason, source, line, column } = err;
    let message: string = `Syntax Error: ${reason}.`;

    if (line && column) {
        message += ` (Line: ${line}, Column: ${column})`;
    } else if (line) {
        message += ` (Line: ${line})`;
    } else if (column) {
        message += ` (Column: ${column})`;
    }

    if (source) {
        message += `\n\nSource:\n${source}`;
    }

    console.log(message);
};
