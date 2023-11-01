const gemdown = await import("../lib/index.js");

const input = `# Link tests

- [Homepage](/)
- [About me](/about)
- [LinkedIn](//linkedin.com/in/...)
- [GitHub](https://github.com/...)

[Homepage](/)
[About me](/about)
[LinkedIn](//linkedin.com/in/...)
[GitHub](https://github.com/...)

Some [link](/) in [text](//example.com).
`;

const expected_prefixed = `# Link tests 

=> /blog/ Homepage
=> /blog/about About me
=> //linkedin.com/in/... LinkedIn
=> https://github.com/... GitHub

=> /blog/ Homepage
=> /blog/about About me
=> //linkedin.com/in/... LinkedIn
=> https://github.com/... GitHub

Some link in text. 

=> /blog/ link
=> //example.com text`;

const expected_unprefixed = `# Link tests 

=> / Homepage
=> /about About me
=> //linkedin.com/in/... LinkedIn
=> https://github.com/... GitHub

=> / Homepage
=> /about About me
=> //linkedin.com/in/... LinkedIn
=> https://github.com/... GitHub

Some link in text. 

=> / link
=> //example.com text`;

describe('link prefixes', () => {
    it('with prefix', async () => {
        const out_prefixed = gemdown.parse(input, {
            linkPrefix: "/blog"
        });
        expect(out_prefixed).toEqual(expected_prefixed);
    });

    it('without prefix', async () => {
        const out_unprefixed = gemdown.parse(input);
        expect(out_unprefixed).toEqual(expected_unprefixed);
    });    
});