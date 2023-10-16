import gemdown from "gemdown";

const markdown = `This is some [Markdown](https://daringfireball.net/projects/markdown/)! Links are extracted to the end of the paragraph.

Here's a second paragraph! Things like **bold** and _italic_ are ignored unless options are set. Italics will always change to this symbol: \*`;

const gemtext = gemdown.parse(markdown);
console.log(gemtext);
