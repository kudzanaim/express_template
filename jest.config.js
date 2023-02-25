/** @type {import('jest').Config} */
const {defaults} = require('jest-config')

const config = {
  verbose: true,
  moduleFileExtensions: [...defaults.moduleFileExtensions],
  testMatch: ['**/__tests__/*.js?(x)'],
}

module.exports = config