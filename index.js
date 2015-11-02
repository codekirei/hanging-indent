'use strict'

function hangingIndent(line, indent, limit, accum) {
  // params and defaults
  indent = indent ? indent : 4
  limit = limit ? limit : 80
  accum = accum ? accum : ''

  // if line is too long
  if (line.length > limit) {
    // get longest possible substring from line
    const reverseSlice = line.slice(0, limit - 1).split('').reverse('')
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

console.log(hangingIndent(testStr))
// console.log(hangingIndent(testStr).split('\n').map(line => line.length))
