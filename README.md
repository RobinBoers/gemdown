# gemdown

A very opiniated fork of [gemdown](https://github.com/audiodude/gemdown), a Javascript library for rendering Markdown files in the gemtext format.

## Overview

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

const markdown = `This is some [Markdown](https://daringfireball.net/projects/markdown/)! Links are extracted to the end of the paragraph.

Here's a second paragraph! Things like **bold** and _italic_ are ignored unless options are set. Italics will always change to this symbol: \*`;

const gemtext = gemdown.parse(markdown);
console.log(gemtext);
```

## Principles

### Proper line breaks

Line breaks work like this:

- A "hard" line break (two spaces and then `\n`), will result in a line break in gemini.
- Any "soft" line breaks (without spaces), will be wrapped, just like they would in rendered HTML.
- Any `<br>` is ignored.

### Usable links

Displaying the links with numbers before them, like the original library does, is not the best way to handle links I think.

In my blogposts, I usually carefully choose the text of the links to properly indicate their location. By removing that context I lose information on Gemini.

Instead, my fork just sets the text of the link as the text of the link. Simple but usable. It results in a bit of duplicated text, but in most cases this isn't such an issue.

## Stability note

This library is subject to change without any prior notice. It is purely for my own use. If I change my preference and want my blog to look differently, this library will change accordingly.

If you're looking for a stable/reliable library, take a look at the [uptream](https://github.com/audiodude/gemdown).

## Options

The library currently supports the following options:

| Option          | Default | Description                                               |
|-----------------|---------|-----------------------------------------------------------|
| stripBold       | true    | Whether to keep the markdown-style bold markings.         |
| stripItalic     | false   | Whether to strip the markdown-style italic markings.      |
| stripInlineCode | false   | Whether to strip the markdown-style inline code markings. |
