import { process } from './shared';

describe('default export (postcss plugin)', () => {
    it('assert hostSelector option', () => {
        expect(() => process('', { } as any)).toThrow(
            /hostSelector option must be a string but instead received undefined/,
        );
    });

    it('transform selectors', async () => {
        const { css } = await process(
            ':host { display: block; } h1 { color: red; }',
        );
        expect(css).toBe(
            [
                `:host { display: block; }`,
                `[x-foo_tmpl-host] { display: block; } h1[x-foo_tmpl] { color: red; }`,
            ].join(' ')
        );
    });
});
