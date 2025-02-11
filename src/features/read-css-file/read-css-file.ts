import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { getCssProperty, objectifyCss } from "@/features";

export const readCssFile = async (
    filePath: string,
    ...propertyPath: string[]
): Promise<ReturnType<typeof getCssProperty>> => {
    try {
        const file = await readFile(join(process.cwd(), filePath));

        const stringFile = file.toString();

        if (propertyPath.length > 0) {
            return getCssProperty(
                stringFile,
                ...(propertyPath as [string, ...string[]]),
            );
        }

        return objectifyCss(stringFile);
    } catch (e) {
        console.error(e);
        return null;
    }
};
