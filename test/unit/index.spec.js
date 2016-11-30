const multiline = require('../../');

describe('multiline', () => {
  it('handles simple lines', () => {
    multiline`
      | first
      | second
    `.should.equal('first\nsecond');
  });

  it('handles simple interpolation', () => {
    const part = multiline`
      | second
      | third
    `;

    multiline`
      | first
      | ${part}
      | fourth
    `.should.equal('first\nsecond\nthird\nfourth');
  });

  it('indents interpolated values', () => {
    const part = multiline`
      | second
      | third
    `;

    multiline`
      | first
      |   ${part}
      | fourth
    `.should.equal('first\n  second\n  third\nfourth');
  });

  it('allows extra intentional whitespace', () => {
    const part = multiline`
      | second\n
      | third
    `;

    multiline`
      | first \n
      | ${part}
      | fourth 
    `.should.equal('first \n\nsecond\n\nthird\nfourth ');
  });
});
