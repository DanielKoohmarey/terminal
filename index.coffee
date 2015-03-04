module.exports = (->
  if typeof window != 'undefined' and window.document
    return require './lib/browser'
  else
    return require './lib/console'
)()
