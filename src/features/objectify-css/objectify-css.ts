import type { TObjectifiedCss } from "@/types/models/ObjectifiedCss";
import { logCssSyntaxErr } from "@/utils/log-css-syntax-err";
import postcss from "postcss";
import postcssJs from "postcss-js";

export const objectifyCss = (styles: string): TObjectifiedCss | null => {
    try {
        const postCssObj = postcss.parse(styles);
        return postcssJs.objectify(postCssObj);
    } catch (e) {
        if (e instanceof postcss.CssSyntaxError) logCssSyntaxErr(e);
        else console.log("Failed objectifying CSS!");

        return null;
    }
};
