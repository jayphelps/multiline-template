var slice = Array.prototype.slice;

function multiline(strings) {
  var args = slice.call(arguments, 1);

  return strings
    // Add interpolated arguments being sure to
    // indent each line to match
    .reduce((out, part, i) => {
      const lines = part.split('\n');
      
      if (args.hasOwnProperty(i)) {
        const indent = lines[lines.length - 1].replace(/[ \t\r]*\| ([ \t\r]*).*$/, '$1');
        const arg = args[i] || '';
        return out + part + arg.split('\n').join('\n' + indent);
      } else {
        return out + part;
      }
    }, '')
    // remove whitespace from start/end
    .replace(/^\s*|\n\s*$/g, '')
    // indent as instructed, relative to pipe position
    // plus a single space after
    .replace(/^[ \t\r]*\| (.*)$/gm, '$1')
}

module.exports = multiline;
module.exports.multiline = multiline;
module.exports['default'] = multiline;
