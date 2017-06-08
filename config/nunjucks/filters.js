const nunjucks = require('nunjucks')
const {
  isArray,
  isPlainObject,
  isEmpty,
  pickBy,
  isNil,
} = require('lodash')

function isNotEmpty (value) {
  return !isNil(value) && !/^\s*$/.test(value) && !(isPlainObject(value) && isEmpty(value))
}

const filters = {
  stringify: JSON.stringify,

  highlight: (string, searchTerm) => {
    const regEx = new RegExp(`(${searchTerm})`, 'gi')

    return new nunjucks.runtime.SafeString(
      string.replace(regEx, '<span class="u-highlight">$1</span>')
    )
  },

  removeNilAndEmpty: (collection) => {
    if (isArray(collection)) {
      return collection.filter(isNotEmpty)
    }
    if (isPlainObject(collection)) {
      return pickBy(collection, isNotEmpty)
    }
    return collection
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
