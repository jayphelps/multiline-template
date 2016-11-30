'use strict';
var slice = Array.prototype.slice;

function multiline(strings) {
  var args = slice.call(arguments, 1);

  return strings
    // add interpolated arguments
    .reduce(function (out, part, i) {
      if (args.hasOwnProperty(i)) {
        var lines = part.split('\n');
        // find indention of the current line
        var indent = lines[lines.length - 1].replace(/[ \t\r]*\| ([ \t\r]*).*$/, '$1');
        // indent interpolated lines to match
        var tail = (args[i] || '').split('\n').join('\n' + indent);
        return out + part + tail;
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
