const _ = require('lodash')

const alphabet = {
  'a': 0,
  'b': 0,
  'c': 1,
  'd': 1,
  'e': 1,
  'f': 2,
  'g': 2,
  'h': 3,
  'i': 3,
  'j': 3,
  'k': 4,
  'l': 4,
  'm': 5,
  'n': 5,
  'o': 5,
  'p': 6,
  'q': 6,
  'r': 7,
  's': 7,
  't': 7,
  'u': 8,
  'v': 8,
  'w': 9,
  'x': 9,
  'y': 9,
  'z': 9
}

const getAlphabet = (char) => {
  const numb = alphabet[char]
  if (_.isUndefined(numb)) {
    throw new TypeError('Character not recognized')
  }
  return numb
}
module.exports = {
  alphabet,
  getAlphabet
}
