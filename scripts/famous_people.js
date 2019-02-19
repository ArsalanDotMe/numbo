const FS = require('fs')
const Path = require('path')
const lineReader = require('line-reader')
const { getAlphabet } = require('./common')

const FAMOUS_IN_PATH = Path.join(__dirname, '../assets/famous-in.tsv')
const FAMOUS_OUT_PATH = Path.join(__dirname, '../outs/famous-out.tsv')

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
