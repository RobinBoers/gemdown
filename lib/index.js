class Gemdown {
  constructor({ linkPrefix }) {
    this.linkPrefix = linkPrefix;
    this.isInQuote = false;
    this.isInTable = false;
    this.isInPreformatted = false;
    this.links = '';
    this.out = '';
    this.collectedLinks = [];
  }

  convert(markdown) {
    for (const line of markdown.split("\n")) {
      this.line = line;

      if(!this.isInPreformatted) {
        this.stripBold();
        this.stripItalics();
        this.replaceSymbols();
        this.prettifyFootnotes();
      }

      if (this.isInQuote && !this.line.startsWith('>')) {
        this.isInQuote = false;
      }

      // Preformatted text
      if (this.isInPreformatted && !this.line.endsWith('```')) {
        this.lineAsIs();
      }
      else if (this.isInPreformatted && this.line.endsWith('```')) {
        this.isInPreformatted = false;
        this.addLine(this.line.trimEnd());
      } 
      else if (this.line.trim().startsWith('```')) {
        this.isInPreformatted = true;
        this.addLine(this.line.trimStart());
      } 

      // Tables
      else if (this.isInTable && !this.line.startsWith("|")) {
        this.isInTable = false;
        this.addLine("```");
      } else if(!this.isInTable && this.line.startsWith("|")) {
        this.isInTable = true;
        this.addLine("```A table");
        this.addLine();
      } else if(this.isInTable && this.line.startsWith("|")) {
        this.addLine();
      }

      // Quotes
      else if (this.line.startsWith('>') && this.isInQuote) {
        this.collectLinks();
        this.addText(this.restOfLine());
      } 
      else if (this.line.startsWith('>') && !this.isInQuote) {
        this.isInQuote = true;
        this.collectLinks();
        this.addText('> ' + this.restOfLine());
      } 

      // Headings
      else if (this.isHeading()) {
        this.collectLinks();
        this.addLine();
      } 

      // Horizontal rules
      else if (this.isHr()) {
        this.addLine();
      } 

      // List items
      else if (this.isListItem()) {
        const listItemContent = this.restOfLine().trim();

        // List items containing just a link or image
        if (this.isLink(listItemContent) || this.isImage(listItemContent)) {
          this.addLink()
        } else {
          this.collectLinks();
          this.line = this.line.trim();
          this.addLine(`* ${this.restOfLine()}`);
        }
      } 

      // Links or images
      else if (this.isLink() || this.isImage()) {
        this.addLink();
      } 

      // Empty lines
      else if (this.line.trim() === '') {
        this.insertCollectedLinks();
        this.emptyLine();
      } 

      // Paragraphs
      else if (this.line.endsWith('  ')) {
        this.collectLinks();
        this.addLine();
      } else {
        this.collectLinks();
        this.addText();
      }
    }
      
    return this.out.trim();
  }

  stripBold() { 
    this.line = this.line.replace(/\*\*/g, '');
  }

  stripItalics() {
    this.line = this.line.replace(/\b_(.*?)_\b/g, (_, match) => match)
  }

  replaceSymbols() {
    this.line = this.line.replace("(tm)", "™");
    this.line = this.line.replace("(c)", "©");
    this.line = this.line.replace("(R)", "®");
  }

  prettifyFootnotes() {
    this.line = this.line.replace(/\[\^([0-9]+)\]\:*/g, (_, match) => `[${match}]`)
  }

  lineAsIs() {
    this.out += this.line + '\n';
  }

  emptyLine() {
    if(this.out.endsWith("\n")) {
      this.addLine();
    } else {
      this.addLine();
      this.addLine();
    }
  }

  restOfLine() {
    return this.line.slice(1).trim();
  }

  addText(text = null) {
    if (!text) text = this.line;
    this.out += text.trim() + ' ';
  }

  addLine(line = null) {
    if (!line) line = this.line;
    this.out += line.trim() + '\n';
  }

  addLink() {
    let [_, text, location] = this.link;
    if(this.isRelativeLink() && this.linkPrefix) location = this.linkPrefix + location;
    
    this.addLine(`=> ${location} ${text}`);
  }

  isRelativeLink() {
    const [_full, _text, location] = this.link;
    return /^\/(?!\/)/.test(location)
  }

  collectLinks() {
    this.line = this.line.replace(/\[([^\]]+?)\]\(([^ \t\n\r\f\v]+?)\)/g, (_, linkText, linkLocation) => {
      this.collectedLinks.push([linkText, linkLocation]);
      return linkText;
    });
  }

  insertCollectedLinks() {
    if (this.collectedLinks.length > 0) {
      this.emptyLine();
      this.collectedLinks.forEach(([linkText, linkLocation]) => {
        this.link = [null, linkText, linkLocation];
        this.addLink();
      });
      this.collectedLinks = [];
    }
  }

  isHeading(n = null) {
    if (n) {
      return this.line.startsWith('#'.repeat(n) && this.line[n] !== '#');
    } else {
      return [1, 2, 3].some((n) => this.isHeading(n));
    }
  }

  isHr() {
    return /^[-~]+$/.test(this.line.trim());
  }

  isListItem() {
    return this.line.trim().startsWith('*') || this.line.trim().startsWith('-');
  }

  isLink(text = null) {
    if (!text) text = this.line;

    this.link = text.match(/^\[([^\]]+?)\]\(([^ \t\n\r\f\v]+?)\)$/i);
    return this.link;
  }

  isImage(text = null) {
    if (!text) text = this.line;

    this.link = text.match(/^!\[([^\]]+?)\]\(([^ \t\n\r\f\v]+?)\)$/i);
    return this.link;
  }
}

function parse(markdown, options = {}) {
  const gemdown = new Gemdown(options);
  return gemdown.convert(markdown);
}

export { parse };
