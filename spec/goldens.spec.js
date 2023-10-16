const path = await import("node:path");
const gemdown = await import("../lib/index.js");

async function loadMarkdown(slug) {
  return Bun.file(path.resolve(
    path.join("testdata", "markdown", `${slug}.md`)
  )).text();
}

async function loadGemini(slug) {
  return Bun.file(path.resolve(
    path.join("testdata", "gemini", `${slug}.gmi`)
  )).text();
}

// Add new golden slugs here. There should be a <slug>.md file with the input
// and a <slug>.gmi file with the output, in the appropriate folders.
const slugs = ["sample", "preformatted", "html_blocks", "entities", "tables"];

describe('golden files', () => {
  for (const slug of slugs) {
    it(`${slug}.md matches golden`, async () => {
      const markdown = await loadMarkdown(slug);
      const gemini = await loadGemini(slug);
      const actual = gemdown.parse(markdown);

      Bun.write(path.join("testdata", "output", `${slug}.gmi`), actual);
      expect(actual).toEqual(gemini);
    });
  }
});
