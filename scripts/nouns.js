const FS = require('fs')
const Path = require('path')
const lineReader = require('line-reader')
const { getAlphabet } = require('./common')

const NOUNS_IN_PATH = Path.join(__dirname, '../assets/nounlist-in.txt')
const NOUNS_OUT_PATH = Path.join(__dirname, '../outs/nounlist-out.tsv')

const outStream = FS.createWriteStream(NOUNS_OUT_PATH)

const readFile = () => {
  return new Promise((resolve, reject) => {
    lineReader.eachLine(NOUNS_IN_PATH, (line, last) => {
      const noun = line.trim().toLowerCase()
      let numberString = ''
      try {
        numberString = `${getAlphabet(noun[0])}${getAlphabet(noun[noun.length - 1])}`
      } catch (err) {
        return
      }
      outStream.write([numberString, noun].join('\t') + '\n')
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
