const FS = require('fs')
const lineReader = require('line-reader')

const FAMOUS_IN_PATH = './assets/famous-in.tsv'
const FAMOUS_OUT_PATH = './outs/famous-out.tsv'

const alphabet = {
  'a': 1,
  'b': 1,
  'c': 1,
  'd': 2,
  'e': 2,
  'f': 2,
  'g': 3,
  'h': 3,
  'i': 3,
  'j': 4,
  'k': 4,
  'l': 4,
  'm': 5,
  'n': 5,
  'o': 5,
  'p': 6,
  'q': 6,
  'r': 6,
  's': 7,
  't': 7,
  'u': 7,
  'v': 8,
  'w': 8,
  'x': 8,
  'y': 9,
  'z': 9
}

const getAlphabet = (char) => {
  const numb = alphabet[char]
  if (!numb) {
    throw new TypeError('Character not recognized')
  }
  return numb
}

const outStream = FS.createWriteStream(FAMOUS_OUT_PATH)

const readFile = () => {
  return new Promise((resolve, reject) => {
    lineReader.eachLine(FAMOUS_IN_PATH, (line, last) => {
      const [name, wikiID, intro] = line.split('\t')
      const nameLength = name.split(' ').length
      if (nameLength !== 2) {
        return
      }
      const [first, second] = name.split(' ').map(name => name.toLowerCase())
      let numberString = ''
      try {
        numberString = `${getAlphabet(first[0])}${getAlphabet(first[first.length - 1])}${getAlphabet(second[0])}${getAlphabet(second[second.length - 1])}`
      } catch (err) {
        return
      }
      outStream.write([numberString, `${first} ${second}`, wikiID, intro].join('\t') + '\n')
      if (last) {
        resolve()
      }
    }, (err) => {
      reject(err)
    })
  })
}

readFile().then(() => {
  outStream.end()
})
