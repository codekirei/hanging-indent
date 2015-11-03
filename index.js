'use strict'

/**
 * @function hangingIndent
 * @desc format a string into a paragraph with hanging indents
 * @param {string} line - source string to format
 * @param {number} indent - number of spaces to indent lines
 * @param {number} limit - maximum number of characters on a line
 * @param {string} accum - internal accumulator string
 * @returns {string} formatted paragraph with spacing and newlines inserted
 */
module.exports = function hangingIndent(line, indent, limit, accum) {
  // params and defaults
  indent = indent ? indent : 4
  limit = limit ? limit : 80
  accum = accum ? accum : ''

  // if line is too long
  if (line.length > limit) {
    // get longest possible substring from line
    const reverseSlice = line.slice(0, limit).split('').reverse('')
    const firstSpace = reverseSlice.indexOf(' ')
    const longest = reverseSlice.slice(firstSpace + 1).reverse().join('')
    const rem = ' '.repeat(indent) + line.slice(longest.length + 1)

    // call self with new values
    return hangingIndent(rem, indent, limit,
      accum += `${longest}\n`
    )
  }

  // else append line to accum
  return accum += line
}
