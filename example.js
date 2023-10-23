import gemdown from 'gemdown';

const markdown = 
    `This is some [Markdown](https://daringfireball.net/projects/markdown)! Links are extracted to the end of the paragraph.

     Here's a second paragraph! **Bold** is ignored, but *italics* are kept, but always _converted_ to the * format.`;

const gemtext = gemdown.parse(markdown);
console.log(gemtext);