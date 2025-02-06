import {
    basicStyleMock,
    layoutStylesMock,
    tailwindThemeMock,
} from "@/mocks/css.mocks";
import { describe, expect, it, vi } from "vitest";
import { getCssProperty } from "./get-css-property";

describe("Extract CSS Property", () => {
    it("should extract a top-level property from a string source", () => {
        expect(getCssProperty(basicStyleMock, "color")).toBe("maroon");
    });

    it("should extract a top-level property with fallback", () => {
        expect(getCssProperty(basicStyleMock, "color", "other prop")).toBe(
            "maroon",
        );
    });

    it("should extract a nested property from a complex object", () => {
        expect(getCssProperty(layoutStylesMock, "section div", "color")).toBe(
            "blue",
        );
    });

    it("should return the correct value for the first key", () => {
        expect(getCssProperty(layoutStylesMock, "kbd", "display")).toBe(
            "inline-block",
        );
    });

    it("should extract a deeply nested property", () => {
        expect(
            getCssProperty(
                tailwindThemeMock,
                "@layer base",
                ":root",
                "--background",
            ),
        ).toBe("283 36% 98%");
    });

    it("should handle invalid property key chain", () => {
        expect(getCssProperty(basicStyleMock, "nonexistent")).toBeNull();
        expect(
            getCssProperty(layoutStylesMock, "nonexistent", "color"),
        ).toBeNull();
    });

    it("should throw an error when no property keys are provided", () => {
        //@ts-ignore
        expect(getCssProperty(basicStyleMock)).toBeNull();
    });

    it("should return null when first property key is not found", () => {
        expect(
            getCssProperty(layoutStylesMock, "nonexistent", "color"),
        ).toBeNull();
    });

    it("should return null when deeper property keys are not found", () => {
        expect(
            getCssProperty(layoutStylesMock, "section", "nonexistent"),
        ).toBeNull();
    });

    it("should log a warning if too many property keys are provided", () => {
        const warnSpy = vi.spyOn(console, "warn");
        expect(getCssProperty(basicStyleMock, "color", "anotherKey")).toBe(
            "maroon",
        );
        expect(warnSpy).toHaveBeenCalledWith(
            "Warning: You've provided more property keys than expected. Please verify your input.",
        );
    });

    it("should handle array items in a nested structure correctly", () => {
        expect(getCssProperty(layoutStylesMock, "li + li", "color")).toBe(
            "pink",
        );
    });

    it("should return null for a non-existent nested array item", () => {
        expect(
            getCssProperty(layoutStylesMock, "section", "ul", "li", "color"),
        ).toBeNull();
    });

    it("should handle string conversion properly when the source is a string", () => {
        const cssString = "div { color: maroon; background-color: blue; }";
        const res = getCssProperty<string>(cssString, "div", "color");
        expect(res).toBe("maroon");
    });

    it("should return an array value", () => {
        const res = getCssProperty<string[]>(tailwindThemeMock, "@layer base");
        expect(res).toBeInstanceOf(Array);
    });
});
