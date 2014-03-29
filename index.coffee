if typeof window != 'undefined' and window.document
  module.exports = require './lib/browser'
else
  module.exports = require './lib/console'
