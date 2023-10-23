class Gemdown {
  constructor() {
    this.isInQuote = false;
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
        this.replaceItalics();
      }

      if (this.isInQuote && !this.line.startsWith('>')) {
        this.isInQuote = false;
      }

      // Preformatted texr
      if (this.isInPreformatted && !this.line.startsWith('```')) {
        this.lineAsIs();
      }
      else if (this.isInPreformatted && this.line.startsWith('```')) {
        this.isInPreformatted = false;
        this.lineAsIs();
      } 
      else if (this.line.startsWith('```')) {
        this.isInPreformatted = true;
        this.lineAsIs();
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
        this.lineAsIs();
      } 

      // Horizontal rules
      else if (this.isHr()) {
        this.lineAsIs();
      } 

      // List items
      else if (this.isListItem()) {
        const listItemContent = this.restOfLine().trim();

        // List items containing just a link or image
        if (this.isLink(listItemContent) || this.isImage(listItemContent)) {
          const [_, text, location] = this.link;
          this.addLine(`=> ${location} ${text}`);
        } else {
          this.collectLinks();
          this.line = this.line.trim();
          this.addLine(`* ${this.restOfLine()}`);
        }
      } 

      // Links or images
      else if (this.isLink() || this.isImage()) {
        const [_, text, location] = this.link;
        this.addLine(`=> ${location} ${text}`);
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

  replaceItalics() {
    this.line = this.line.replace(/\b_(.*?)_\b/g, (_, match) => `*${match}*`)
  }

  lineAsIs() {
    this.addLine();
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

  collectLinks() {
    this.line = this.line.replace(/\[(.*?)\]\(([^ \t\n\r\f\v]+)\)/g, (_, linkText, linkLocation) => {
      this.collectedLinks.push([linkText, linkLocation]);
      return linkText;
    });
  }

  insertCollectedLinks() {
    if (this.collectedLinks.length > 0) {
      this.emptyLine();
      this.collectedLinks.forEach(([linkText, linkLocation]) => {
        this.addLine(`=> ${linkLocation} ${linkText}`);
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
    return /^[-~]+$/.test(this.line);
  }

  isListItem() {
    return this.line.trim().startsWith('*') || this.line.trim().startsWith('-');
  }

  isLink(text = null) {
    if (!text) text = this.line;

    this.link = text.match(/^\[(.*?)\]\(([^ \t\n\r\f\v]+)\)$/);
    return this.link;
  }

  isImage(text = null) {
    if (!text) text = this.line;

    this.link = text.match(/^!\[(.*?)\]\(([^ \t\n\r\f\v]+)\)$/);
    return this.link;
  }
}

function parse(markdown) {
  const gemdown = new Gemdown();
  return gemdown.convert(markdown);
}

export { parse };
