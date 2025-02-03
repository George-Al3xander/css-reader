import { objectifyCss } from "@/features/objectify-css/objectify-css";
import { logCssSyntaxErr } from "@/utils/log-css-syntax-err";
import { describe, expect, it, vi } from "vitest";

vi.mock("@/utils/log-css-syntax-err", () => ({
    logCssSyntaxErr: vi.fn(),
}));

describe("objectifyCss", () => {
    it("should convert valid CSS into an object", () => {
        const css = "body { color: red; background: blue; }";
        const result = objectifyCss(css);

        expect(result).toEqual({
            body: {
                color: "red",
                background: "blue",
            },
        });
    });

    it("should return null and log syntax error for invalid CSS", () => {
        const invalidCss = "body { color: red; background:";
        const result = objectifyCss(invalidCss);

        expect(result).toBeNull();
        expect(logCssSyntaxErr).toHaveBeenCalled();
    });
});
