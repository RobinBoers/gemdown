import { parse } from "node-html-parser";

const renderer = {
  // Block
  code(code, infostring, escaped) {
    return `\n\`\`\`${infostring}\n${code}\n\`\`\`\n`;
  },
  blockquote(quote) {
    return `\n> ${handleLineBreaks(quote)}\n`;
  },
  html(html) {
    return "";
  },
  heading(text, level, raw, slugger) {
    return `\n${"#".repeat(level)} ${text}\n`;
  },
  hr() {
    return "\n-----\n";
  },
  list(body, ordered, start) {
    return `\n${body}`;
  },
  listitem(text, task, checked) {
    return `* ${text}\n`;
  },
  checkbox(checked) {
    return checked ? "☑" : "◻";
  },
  paragraph(text) {
    let [content, links] = text.split("\n\n");
  
    if (links) {
      return `\n${handleLineBreaks(content)}\n\n${links}\n`;
    } else if (content) {
      return `\n${handleLineBreaks(content)}\n`;
    }
  },
  table(header, body) {
    return `\n\`\`\`A table\n${body}\`\`\`\n`;
  },
  tablerow(content) {
    return `|${content}\n`;
  },
  tablecell(content) {
    return ` ${content}\t |`;
  },

  // Inline
  br() {
    return "<br>";
  },
  del(text) {
    return text;
  },
  link(href, title, text) {
    return `${text}`;
  },
  image(href, title, text) {
    return `=> ${href} ${text}`;
  },
  text(text) {
    return text;
  },
  strong(text) {
    return `${text}`;
  },
  em(text) {
    return `*${text}*`;
  },
  codespan(text) {
    return `\`${text}\``;
  },
};

function handleLineBreaks(content) {
  return content
    .trim()
    .split("\n")
    .map((s) => s.trim())
    .join(" ")
    .replace("<br>", "\n");
}

function extractLinks(tokens, startIndex = 0) {
  function extractLinksInner(tokens) {
    let links = [];
    for (let i = 0; i < tokens.length; i++) {
      const child = tokens[i];
      if (child.type === "link") {
        const text = `${child.text}[${++startIndex}]`;

        tokens.splice(i, 1, { type: "text", raw: text, text });
        links.push(child);
      } else if (child.tokens) {
        links = links.concat(extractLinksInner(child.tokens));
      }
    }
    return links;
  }

  return extractLinksInner(tokens);
}

function walkTokens(token) {
  let links = [];
  let tokens = token.items || token.tokens;
  if (tokens) links = links.concat(extractLinks(tokens, links.length));

  if (links.length == 0) return;

  let outLinks = links.map((link) => `=> ${link.href} ${link.text}`);
  let start = token.type == "list" ? "\n" : "\n\n";

  const linkText = start + outLinks.join("\n");
  const newToken = { type: "text", raw: linkText, text: linkText };

  if (token.type == "list") {
    token.items[token.items.length - 1].tokens.push(newToken);
  } else if (token.tokens) {
    token.tokens.push(newToken);
  }
}

function postprocess(result) {
  // The marked library, by default, replaces apostrophes ('), quotes (") and ampersands (&) with HTML entities.

  return result
    .trimStart() // Remove newlines from the beginning of the document.
    .replaceAll("&#39;", "'")
    .replaceAll("&quot;", '"')
    .replaceAll("&amp;", "&");
}

let hooks = { postprocess };
export { hooks, renderer, walkTokens };
