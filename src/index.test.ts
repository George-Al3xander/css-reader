import { describe, expect, test as it } from "vitest";
import { add } from "./index.js";

describe("Dummy test", () => {
    it("should add", () => {
        expect(add(1, 2)).toBe(3);
    });
});
