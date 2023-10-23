# Gemdown

This is an example document used to test [Gemdown](https://git.dupunkto.org/~robin/libre0b11/gemdown). Specifically my fork which is is a very *opiniated* version of the [upstream](https://github.com/audiodude/gemdown).

It does a lot of things. Forexample, it turns _italics_ into a different kind of *italics*. It doesn't touch words_with under_scores however.

It also extracts links out of paragraphs, as you might have seen. It also does it for list items:

- I have to update to [Debian 13](https://debian.org).
- Nevermind. [Arch](https://archlinux.org) is better!
- Nope. [NixOS](https://nixorg.org) FTW!

It converts list items that just contain a link to a link:

- [Elixir (Programming Language)](https://elixir-lang.org)

It also **strips** all bold modifiers, but keeps `inline code`.

It flattens lists:

- Something
    - Something else
        - Another thing

## Images

![Some image](/image.jpg)

### Headings

Level 4-6 headings are converted to paragraphs:

#### Header :)

Paragraphs use [Markdown](https://daringfireball.net/projects/markdown/) line wrapping rules.
That means that this isn't a line break.  
But this sentence is on a seperate line, because the last one ended with a "hard break", aka two spaces + newline.

Quotes work as well:

> The overriding design goal for Markdown's
> formatting syntax is to make it as readable 
> as possible. The idea is that a
> Markdown-formatted document should be
> publishable as-is, as plain text, without 
> looking like it's been marked up with tags
> or formatting instructions.

Yea, that's about it.

## HTML

<span>Embedded HTML</span> is kept as is; please don't use HTML in your files. It's not really the thing Markdown was made for.

Also,<br> does nothing.

## Code

Preformatted is kept as is. Here's a code snippet:

```javascript
let x = 10;
x += 20;
console.log(x) // => 30
```

Here's some ASCII art:

```The word "Gemdown", styled in bold letters.
 e88~~\                                888                                  
d888      e88~~8e  888-~88e-~88e  e88~\888  e88~-_  Y88b    e    / 888-~88e 
8888 __  d888  88b 888  888  888 d888  888 d888   i  Y88b  d8b  /  888  888 
8888   | 8888__888 888  888  888 8888  888 8888   |   Y888/Y88b/   888  888 
Y888   | Y888    , 888  888  888 Y888  888 Y888   '    Y8/  Y8/    888  888 
 "88__/   "88___/  888  888  888  "88_/888  "88_-~      Y    Y     888  888 
```

And some more:

```ASCII art: the word "{du}punkto" using a large font

                                                                                           
    ,pm      ,,           mq.                                                              
   6M      `7MM             Mb                                   `7MM        mm            
   MM        MM             MM                                     MM        MM            
   M9   ,M""bMM `7MM  `7MM  YM `7MMpdMAo.`7MM  `7MM  `7MMpMMMb.    MM  ,MP'mmMMmm ,pW"Wq.  
_.d"' ,AP    MM   MM    MM  `"b._MM   `Wb  MM    MM    MM    MM    MM ;Y     MM  6W'   `Wb 
`"bp. 8MI    MM   MM    MM  ,qd"'MM    M8  MM    MM    MM    MM    MM;Mm     MM  8M     M8 
   Mb `Mb    MM   MM    MM  6M   MM   ,AP  MM    MM    MM    MM    MM `Mb.   MM  YA.   ,A9 
   MM  `Wbmd"MML. `Mbod"YML.MM   MMbmmd'   `Mbod"YML..JMML  JMML..JMML. YA.  `Mbmo`Ybmd9'  
   YM                       M9   MM                                                        
    `bm                   md'  .JMML.   ==== A pubnix/tilde for fun ====                   

```