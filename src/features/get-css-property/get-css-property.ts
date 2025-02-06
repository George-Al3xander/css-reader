import { objectifyCss } from "@/features";
import type { TObjectifiedCss } from "@/types/models";

const EXTRA_PROPERTY_KEYS_WARNING_MSG =
    "Warning: You've provided more property keys than expected. Please verify your input.";

export const getCssProperty = <TReturnType = unknown>(
    source: TObjectifiedCss | string,
    ...propertyPath: [string, ...string[]]
): TReturnType | null => {
    const cssObject =
        typeof source === "string" ? objectifyCss(source) : source;
    if (!cssObject) return null;

    const firstPropertyKey = propertyPath[0];
    const firstPropertyItem = cssObject[firstPropertyKey];
    if (!firstPropertyItem) return null;

    if (propertyPath.length > 1 && !(typeof firstPropertyItem === "string")) {
        const nextPropertyKey = propertyPath[1]!;
        const nextPropertyItem = Array.isArray(firstPropertyItem)
            ? firstPropertyItem.find((item) => nextPropertyKey in item)
            : firstPropertyItem;
        if (!nextPropertyItem) return null;

        const remainingParams = propertyPath.slice(1) as [string, ...string[]];

        return getCssProperty(nextPropertyItem, ...remainingParams);
    } else {
        if (propertyPath.length > 1 && typeof firstPropertyItem === "string")
            console.warn(EXTRA_PROPERTY_KEYS_WARNING_MSG);

        return firstPropertyItem as TReturnType;
    }
};
