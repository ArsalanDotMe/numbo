const FS = require('fs')
const lineReader = require('line-reader')

const MOVIES_IN_PATH = './assets/ratings-in.list'
const MOVIES_OUT_PATH = './outs/ratings-out.tsv'
const EXCLUDED_IN_PATH = './assets/excluded.txt'

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
const excludedWords = ['a','the','an','is','am','this','that','will','shall','be','do','of']

const getAlphabet = (char) => {
  const numb = alphabet[char]
  if (!numb) {
    throw new TypeError('Character not recognized')
  }
  return numb
}
const excludeKeywords = (name) => {
  var words = name.split(" ");
  var included = words.filter(titleWords => {
    if(titleWords.length > 0 ){
      return !excludedWords.includes(titleWords);
    }
  })
  return included;
}
const outStream = FS.createWriteStream(MOVIES_OUT_PATH)

const readFile = () => {
  return new Promise((resolve, reject) => {
    lineReader.eachLine(MOVIES_IN_PATH, (line, last) => {
      const [distribution,votes,rank,title] = line.split('  ')
      const [name,year] = title.split('(').map(title => title.toLowerCase())
      const nameLength = name.split(' ').length
      var nameTokens = excludeKeywords(name)
      if(nameTokens.length !== 2 ){
        return
      }
      const [first,second] = nameTokens 
      let numberString = ''
      try {
        numberString = `${getAlphabet(first[0])}${getAlphabet(first[first.length - 1])}${getAlphabet(second[0])}${getAlphabet(second[second.length - 1])}`
      } catch (err) {
        return
      }
      outStream.write([numberString, `${first} ${second}`, rank, distribution,year].join('\t') + '\n')
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
