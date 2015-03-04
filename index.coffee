module.exports = (->
  if typeof window != 'undefined' and window.document
    return require './lib/browser.coffee'
  else
    return require './lib/console.coffee'
)()
