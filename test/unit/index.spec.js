const multiline = require('../../');

describe('multiline', () => {
  it('handles simple lines', () => {
    multiline`
      |
      |first
      |
      |second
      |
    `.should.equal('\nfirst\n\nsecond\n');
  });

  it('handles simple interpolation', () => {
    const part = multiline`
      |second
      |third
    `;

    multiline`
      |first
      |${part}
      |fourth
    `.should.equal('first\nsecond\nthird\nfourth');
  });

  it('indents interpolated values', () => {
    const part = multiline`
      |second
      |third
    `;

    multiline`
      |first
      |  ${part}
      |fourth
    `.should.equal('first\n  second\n  third\nfourth');
  });

  it('allows extra intentional whitespace', () => {
    const part = multiline`
      |second\n
      |third
    `;

    // Have to use ${''} hack because vscode removes trailing whitespace
    // event inside template literals! It's not context/JS aware.
    // https://github.com/Microsoft/vscode/issues/52711
    multiline`
      |first \n
      |${part}
      |fourth ${''}
    `.should.equal('first \n\nsecond\n\nthird\nfourth ');
  });
});
