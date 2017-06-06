const nunjucks = require('nunjucks')
const filters = {
  stringify: JSON.stringify,

  highlight: (string, searchTerm) => {
    const regEx = new RegExp(`(${searchTerm})`, 'gi')

    return new nunjucks.runtime.SafeString(
      string.replace(regEx, '<span class="results-highlight">$1</span>')
    )
  },

  removeFalsey: (array) => {
    return array.filter(item => item)
  },

  pluralise: (string, count, pluralisedWord) => {
    if (count !== 1) {
      if (pluralisedWord) {
        string = pluralisedWord
      } else {
        string += 's'
      }
    }

    return string
  },

  formatNumber: (number, locales = 'en-GB') => {
    return number.toLocaleString(locales)
  },
}

module.exports = filters