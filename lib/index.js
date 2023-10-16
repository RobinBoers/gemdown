const { marked } = await import("marked");
const markedSmartypants = await import("marked-smartypants");
let { hooks, renderer, walkTokens } = await import("./gemtext.js");

function gemtext({ stripItalic, stripInlineCode, stripBold = true}) {
  if (!stripBold) {
    renderer.strong = function(text) {
      return `**${text}**`;
    }
  }

  if (stripItalic) {
    renderer.em = function(text) {
      return `${text}`;
    }
  }

  if (stripInlineCode) {
    renderer.codespan = function(text) {
      return `${text}`;
    }
  }

  return { hooks, renderer, walkTokens };
}

function parse(markdown, options = { stripBold: true}) {
  marked.use(markedSmartypants);
  marked.use(gemtext(options));

  return marked.parse(markdown);
}

export { parse, gemtext };
