module.exports = ( ->
  if typeof window != 'undefined' and window.document
    less = require 'less'
    fs = require 'fs'
    mime = require 'mime'
    insertCSS = require 'insert-css'

    styles = fs.readFileSync 'lib/terminal.less', 'ascii', this
    interlace = fs.readFileSync 'lib/interlace.png', this
    external = fs.readFileSync 'lib/external.png', this
    interlace = 'url("data:' + mime.lookup('lib/interlace.png') + 'base64,' + new Buffer(interlacepng).toString('base64') + '")'
    styles = styles.replace 'dataurl("interlace.png")', interlace
    external = 'url("data:' + mime.lookup('lib/external.png') + 'base64,' + new Buffer(externalpng).toString('base64') + '")'
    styles = styles.replace 'dataurl("external.png")', external
    css = less.render styles, {compress: true}, this
    insertCSS css
    return require './lib/browser'
  else
    return require './lib/console'
)()
