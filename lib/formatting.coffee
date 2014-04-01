table = require './tables'
colors = require './colors'

formatting = {}
module.exports = formatting
if typeof module != 'undefined'
  mode = 'console'
else
  mode = 'browser'

formatting.table = table
for style in colors.styles
    formatting[style] = colors[style]

formatting.newline = formatting.n = ->
  if mode == 'console'
    return '\n'
  else if mode == 'browser'
    return '<br>'
  else
    return ''

formatting.link = formatting.href = formatting.a = (command, text) ->
  if not text and command.length == 1
    text = command[0]
  if mode == 'console'
    if command.length == 0 or command.length == 1 and command[0] == text
      return colors.underline text
    else
      return "#{text} [#{colors.underline command.join ' '}]"
  else if mode == 'browser'
    return "<a href='#!/#{command.join '/'}'>"
  else
    return ''

formatting.title = formatting.h1 = (text) -> colors.yellowBG '  ' + colors.redBG colors.bold "  #{text}  " + colors.yellowBG '  '
formatting.subtitle = formatting.h2 = (text) -> colors.bold colors.cyanBG colors.yellow "  #{text}  "
formatting.subsubtitle = formatting.h3 = (text) -> colors.inverse " #{text} "
formatting.italic = formatting.i = colors.italic
formatting.bold = formatting.b = colors.bold
