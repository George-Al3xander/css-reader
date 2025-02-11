import { readFile } from "node:fs/promises";
import { getCssProperty, objectifyCss } from "@/features";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { readCssFile } from "./read-css-file";

// Mock dependencies
vi.mock("node:fs/promises", () => ({
    readFile: vi.fn(),
}));
vi.mock("@/features", () => ({
    getCssProperty: vi.fn(),
    objectifyCss: vi.fn(),
}));

describe("readCssFile", () => {
    const mockCssContent = `
        .container {
            color: red;
            font-size: 16px;
        }
    `;

    beforeEach(() => {
        vi.clearAllMocks();
    });

    it("should return full CSS object when no property path is provided", async () => {
        vi.mocked(readFile).mockResolvedValue(Buffer.from(mockCssContent));
        vi.mocked(objectifyCss).mockReturnValue({
            container: { color: "red", "font-size": "16px" },
        });

        const result = await readCssFile("styles.css");

        expect(readFile).toHaveBeenCalledWith(
            expect.stringContaining("styles.css"),
        );
        expect(objectifyCss).toHaveBeenCalledWith(mockCssContent);
        expect(result).toEqual({
            container: { color: "red", "font-size": "16px" },
        });
    });

    it("should return specific CSS property when property path is provided", async () => {
        vi.mocked(readFile).mockResolvedValue(Buffer.from(mockCssContent));
        vi.mocked(getCssProperty).mockReturnValue("red");

        const result = await readCssFile("styles.css", "container", "color");

        expect(readFile).toHaveBeenCalledWith(
            expect.stringContaining("styles.css"),
        );
        expect(getCssProperty).toHaveBeenCalledWith(
            mockCssContent,
            "container",
            "color",
        );
        expect(result).toBe("red");
    });

    it("should return null and log error if file reading fails", async () => {
        const consoleErrorMock = vi.spyOn(console, "error");

        vi.mocked(readFile).mockRejectedValue(new Error("File not found"));

        const result = await readCssFile("missing.css");

        expect(readFile).toHaveBeenCalledWith(
            expect.stringContaining("missing.css"),
        );
        expect(consoleErrorMock).toHaveBeenCalled();
        expect(result).toBeNull();

        consoleErrorMock.mockRestore();
    });
});
