const data = require('./server')

console.log(data.fileContent)

function fooBarify () {
  const wordCollection = {}
  const wordsRegex = /[A-Za-z\"'\-]+/gi
  const textData = data.match(wordsRegex)

  if (!data) {
    return console.log('null data')
  }
  textData.forEach(word => {
    // console.log(word);
    if (wordCollection.hasOwnProperty(word)) {
      wordCollection[word] = wordCollection[word] + 1
      // console.log("Add count");
    } else {
      Object.defineProperty(wordCollection, word, {
        value: 1,
        writable: true,
        enumerable: true
      })
      // console.log("Add property and count");
    }
  })

  const mostUsedWord = Object.keys(wordCollection).reduce((a, b) => wordCollection[b] > wordCollection[a] ? b : a)
  console.log(wordCollection, mostUsedWord)

  const outputRegexWord = `${mostUsedWord}`
  const re = new RegExp(outputRegexWord, 'gi')
  const output = data.replace(re, `foo${outputRegexWord}bar`)
  console.log(output)
  return output
}

module.exports = { fooBarify }
