import { describe, expect, it } from "vitest";
import { pagesFromAllFiles, parseFolderListing } from "../src/components/FolderContent";

describe("pagesFromAllFiles", () => {
  it("returns direct children of the requested folder", () => {
    const allFiles = [
      { slug: "notes/a", frontmatter: { title: "A" } },
      { slug: "notes/b", frontmatter: { title: "B" } },
      { slug: "other/c", frontmatter: { title: "C" } },
    ];
    const result = pagesFromAllFiles(allFiles, "notes/index", true);
    expect(result.map((r) => r.slug).sort()).toEqual(["notes/a", "notes/b"]);
  });

  it("excludes unlisted pages from folder listings", () => {
    const allFiles = [
      { slug: "notes/public", frontmatter: { title: "Public" } },
      { slug: "notes/secret", frontmatter: { title: "Secret" }, unlisted: true },
      { slug: "notes/another", frontmatter: { title: "Another" } },
    ];
    const result = pagesFromAllFiles(allFiles, "notes/index", true);
    const slugs = result.map((r) => r.slug);
    expect(slugs).toContain("notes/public");
    expect(slugs).toContain("notes/another");
    expect(slugs).not.toContain("notes/secret");
  });

  it("includes explicit unlisted: false pages", () => {
    const allFiles = [{ slug: "notes/forced", frontmatter: { title: "Forced" }, unlisted: false }];
    const result = pagesFromAllFiles(allFiles, "notes/index", true);
    expect(result.map((r) => r.slug)).toEqual(["notes/forced"]);
  });

  it("groups subfolders when showSubfolders is true", () => {
    const allFiles = [
      { slug: "notes/top", frontmatter: { title: "Top" } },
      { slug: "notes/sub/page", frontmatter: { title: "SubPage" } },
    ];
    const result = pagesFromAllFiles(allFiles, "notes/index", true);
    const slugs = result.map((r) => r.slug).sort();
    expect(slugs).toContain("notes/top");
    expect(slugs.some((s) => s?.startsWith("notes/sub"))).toBe(true);
  });

  it("does not include the folder index itself", () => {
    const allFiles = [
      { slug: "notes/index", frontmatter: { title: "Index" } },
      { slug: "notes/page", frontmatter: { title: "Page" } },
    ];
    const result = pagesFromAllFiles(allFiles, "notes/index", true);
    expect(result.map((r) => r.slug)).toEqual(["notes/page"]);
  });
});

describe("parseFolderListing", () => {
  it("caps the listing at a positive number, given as a number or a string", () => {
    expect(parseFolderListing(25)).toEqual({ hide: false, limit: 25 });
    expect(parseFolderListing("25")).toEqual({ hide: false, limit: 25 });
    expect(parseFolderListing(" 10 ")).toEqual({ hide: false, limit: 10 });
    expect(parseFolderListing(2.9)).toEqual({ hide: false, limit: 2 });
  });

  it("hides the listing for none, in any case", () => {
    expect(parseFolderListing("none")).toEqual({ hide: true });
    expect(parseFolderListing(" None ")).toEqual({ hide: true });
  });

  it("leaves the listing unchanged when the key is absent or not usable", () => {
    for (const value of [undefined, null, "", "all", 0, -5, Number.NaN, Infinity, true, {}, []]) {
      expect(parseFolderListing(value)).toEqual({ hide: false });
    }
  });
});
