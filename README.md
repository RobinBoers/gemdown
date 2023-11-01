# Gemdown

A very opiniated fork of [Gemdown](https://github.com/audiodude/gemdown), a Javascript library for rendering Markdown files in the gemtext format.

This is a more minimal version, without depending on Marked. I also stripped off all features I didn't strictly need, like inline HTML, link achors among some other things. You can see everything Gemdown does in the `testdata` folder.

If this is not what you're looking for, please consider the [upstream](https://github.com/audiodude/gemdown) instead.

## What?

[Gemini](https://gemini.circumlunar.space/) is a recent text-based internet protocol that aims to be more robust than Gopher but more lightweight than the web, and doesn't seek to replace either. You need a special [Gemini client](https://github.com/kr1sp1n/awesome-gemini#clients) to connect to "Gemini capsules" in "Gemspace" (such as `gemini://gemini.circumlunar.space/`).

Gemini capsules are authored using "Gemtext", which you can [read the description of](https://gemini.circumlunar.space/docs/gemtext.gmi). For a list of many Gemini related projects and sites, see [Awesome Gemini](https://github.com/kr1sp1n/awesome-gemini).

According to [Wikipedia](https://en.wikipedia.org/wiki/Markdown), [Markdown](https://daringfireball.net/projects/markdown/) is "a lightweight markup language for creating formatted text using a plain-text editor". Markdown is commonly used in [Static Site Generators](https://www.cloudflare.com/learning/performance/static-site-generator/) to store the source code for pages such as blog posts without making the author write full HTML markup.

Gemdown, then, is a library that takes Markdown input and outputs Gemtext. It is designed to be used in conjunction with a static site generator in order to create a Gemini mirror of an HTTP website (HTTP/Gemini mirrors of the same content is common amongst the Gemini community).

## Installation

My fork of `gemdown` isn't published anywhere yet. Sorry!

## Usage

For now, this package exposes a single function called `gemdown.parse`. It takes a string containing raw Markdown text and returns a string which contains raw gemtext.

From `example.js`:

```javascript
import gemdown from 'gemdown';

const markdown = 
    `This is some [Markdown](https://daringfireball.net/projects/markdown)! Links are extracted to the end of the paragraph.

     Here's a second paragraph! **Bold** is ignored, but *italics* are kept, but always _converted_ to the * format.`;

const gemtext = gemdown.parse(markdown);
console.log(gemtext);
```

## Features

- Collects links and puts them outside the paragraph.
- Proper line breaks: hard line breaks (two spaces at the end of the line) will become a newline in gemtext; otherwise the newline is ignored.
- Lists are flattened.
- If a list item contains just a link or image, it is transformed to a link.
- Images are transformed to links.
- Headings level 4-6 and numbered lists are interpreted as paragraphs.
- Extra empty lines are kept.
- Italic identifiers are kept, but bold mofifiers are removed.
- Horizontal lines are kept as is.
- Smartypants punctuation

## Stability note

This library is subject to change without any prior notice. It is purely for my own use. If I change my preference and want my blog to look differently, this library will change accordingly.

If you're looking for a stable/reliable library, take a look at the [uptream](https://github.com/audiodude/gemdown).

## Options

- **`linkPrefix`**: if specified, all relative links starting with `/` will be prefixed with the given string.
