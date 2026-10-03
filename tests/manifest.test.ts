import { describe, expect, it } from "vitest";
import manifest from "@/app/manifest";

describe("Web App Manifest", () => {
  it("provides valid PWA manifest fields", () => {
    const data = manifest();
    expect(data.name).toContain("yokBangun");
    expect(data.short_name).toBe("yokBangun");
    expect(data.display).toBe("standalone");
    expect(data.theme_color).toBe("#1F5D45");
    expect(data.background_color).toBe("#FFFFFF");
    expect(data.icons?.length).toBeGreaterThanOrEqual(3);
  });
});
