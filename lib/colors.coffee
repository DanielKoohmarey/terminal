# colors.js
# 
# Copyright (c) 2010
# 
# Marak Squires
# Alexis Sellier (cloudhead)
# 
# Permission is hereby granted, free of charge, to any person obtaining a copy
# of this software and associated documentation files (the "Software"), to deal
# in the Software without restriction, including without limitation the rights
# to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
# copies of the Software, and to permit persons to whom the Software is
# furnished to do so, subject to the following conditions:
# 
# The above copyright notice and this permission notice shall be included in
# all copies or substantial portions of the Software.
# 
# THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
# IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
# FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
# AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
# LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
# OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
# THE SOFTWARE.

colors = {}
module.exports = colors
if typeof window != 'undefined'
  mode = 'browser'
else
  mode = 'console'

styles =
  'console':
    'bold'      : ['\x1B[1m',  '\x1B[22m']
    'italic'    : ['\x1B[3m',  '\x1B[23m']
    'underline' : ['\x1B[4m',  '\x1B[24m']
    'inverse'   : ['\x1B[7m',  '\x1B[27m']
    'strikethrough' : ['\x1B[9m',  '\x1B[29m']
    'white'     : ['\x1B[37m', '\x1B[39m']
    'grey'      : ['\x1B[90m', '\x1B[39m']
    'black'     : ['\x1B[30m', '\x1B[39m']
    'blue'      : ['\x1B[34m', '\x1B[39m']
    'cyan'      : ['\x1B[36m', '\x1B[39m']
    'green'     : ['\x1B[32m', '\x1B[39m']
    'magenta'   : ['\x1B[35m', '\x1B[39m']
    'red'       : ['\x1B[31m', '\x1B[39m']
    'yellow'    : ['\x1B[33m', '\x1B[39m']
    'whiteBG'   : ['\x1B[47m', '\x1B[49m']
    'greyBG'    : ['\x1B[49;5;8m', '\x1B[49m']
    'blackBG'   : ['\x1B[40m', '\x1B[49m']
    'blueBG'    : ['\x1B[44m', '\x1B[49m']
    'cyanBG'    : ['\x1B[46m', '\x1B[49m']
    'greenBG'   : ['\x1B[42m', '\x1B[49m']
    'magentaBG' : ['\x1B[45m', '\x1B[49m']
    'redBG'     : ['\x1B[41m', '\x1B[49m']
    'yellowBG'  : ['\x1B[43m', '\x1B[49m']
  'browser':
    'bold'      : ['<b>',  '</b>']
    'italic'    : ['<i>',  '</i>']
    'underline' : ['<u>',  '</u>']
    'inverse'   : ['<span style="background-color:black;color:white;">',  '</span>']
    'strikethrough' : ['<del>',  '</del>']
    'white'     : ['<span style="color:white;">',   '</span>']
    'grey'      : ['<span style="color:gray;">',    '</span>']
    'black'     : ['<span style="color:black;">',   '</span>']
    'blue'      : ['<span style="color:blue;">',    '</span>']
    'cyan'      : ['<span style="color:cyan;">',    '</span>']
    'green'     : ['<span style="color:green;">',   '</span>']
    'magenta'   : ['<span style="color:magenta;">', '</span>']
    'red'       : ['<span style="color:red;">',     '</span>']
    'yellow'    : ['<span style="color:yellow;">',  '</span>']
    'whiteBG'   : ['<span style="background-color:white;">',   '</span>']
    'greyBG'    : ['<span style="background-color:gray;">',    '</span>']
    'blackBG'   : ['<span style="background-color:black;">',   '</span>']
    'blueBG'    : ['<span style="background-color:blue;">',    '</span>']
    'cyanBG'    : ['<span style="background-color:cyan;">',    '</span>']
    'greenBG'   : ['<span style="background-color:green;">',   '</span>']
    'magentaBG' : ['<span style="background-color:magenta;">', '</span>']
    'redBG'     : ['<span style="background-color:red;">',     '</span>']
    'yellowBG'  : ['<span style="background-color:yellow;">',  '</span>']
colors.styles = Object.keys styles.console

stylize = (style, str) ->
  if mode not in ['browser', 'console']
    return "#{str}"

  return styles[mode][style][0] + str + styles[mode][style][1]

# simple functions for styling
for style of styles.console
  colors[style] = stylize.bind @, style
