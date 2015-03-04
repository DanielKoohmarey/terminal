;(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var parseArgs;

parseArgs = require('./parseArgs.coffee');

module.exports = function(containerID, options) {
  var _background, _cmdLine, _cmdListeners, _container, _history, _historySet, _histpos, _histtemp, _inputLine, _output, _prompt, _terminal, addToHistory, defaults, historyHandler, inputTextClick, newCommandHandler, output, term;
  inputTextClick = function(e) {
    this.value = this.value;
  };
  historyHandler = function(e) {
    var _histpos, _histtemp;
    if (e.keyCode === 27) {
      this.value = "";
      e.stopPropagation();
      e.preventDefault();
    }
    if (_history.length && (e.keyCode === 38 || e.keyCode === 40)) {
      if (_history[_histpos]) {
        _history[_histpos] = this.value;
      } else {
        _histtemp = this.value;
      }
      if (e.keyCode === 38) {
        _histpos--;
        if (_histpos < 0) {
          _histpos = 0;
        }
      } else if (e.keyCode === 40) {
        _histpos++;
        if (_histpos > _history.length) {
          _histpos = _history.length;
        }
      }
      this.value = (_history[_histpos] ? _history[_histpos] : _histtemp);
      this.value = this.value;
    }
  };
  addToHistory = function(_history, newEntry) {
    var i;
    if (newEntry in _historySet) {
      i = _history.length - 1;
      while (i >= 0) {
        if (_history[i] === newEntry) {
          _history.splice(i, 1);
          break;
        }
        i--;
      }
    }
    _history.push(newEntry);
    _historySet[newEntry] = true;
  };
  newCommandHandler = function(e) {
    var _histpos, args, cmd, cmdline, i, input, line, listener, ref, response;
    if (e.keyCode !== 13) {
      return;
    }
    cmdline = this.value;
    if (cmdline) {
      addToHistory(_history, cmdline);
      localStorage["history"] = JSON.stringify(_history);
      localStorage["historySet"] = JSON.stringify(_historySet);
      _histpos = _history.length;
    }
    line = this.parentNode.parentNode.parentNode.parentNode.cloneNode(true);
    line.removeAttribute("id");
    line.classList.add("line");
    input = line.querySelector("input.cmdline");
    input.autofocus = false;
    input.readOnly = true;
    input.insertAdjacentHTML("beforebegin", input.value);
    input.parentNode.removeChild(input);
    _output.appendChild(line);
    _inputLine.classList.add("hidden");
    this.value = "";
    ref = parseArgs(cmdline), cmd = ref.cmd, args = ref.args, line = ref.line;
    args = args || [];
    i = 0;
    while (i < _cmdListeners.length) {
      listener = _cmdListeners[i];
      if (typeof listener === "function") {
        listener(args);
      }
      i++;
    }
    if (cmd) {
      if (options.execute) {
        response = options.execute(cmd, args, term);
      }
      if (!response) {
        response = cmd + ": command not found";
      }
      output(response);
    }
    _inputLine.classList.remove("hidden");
  };
  defaults = {
    welcome: "",
    prompt: "",
    separator: "&gt;",
    theme: "interlaced"
  };
  options = options || defaults;
  options.welcome = options.welcome || defaults.welcome;
  options.prompt = options.prompt || defaults.prompt;
  options.separator = options.separator || defaults.separator;
  options.theme = options.theme || defaults.theme;
  _history = (localStorage.history ? JSON.parse(localStorage.history) : []);
  _historySet = (localStorage.historySet ? JSON.parse(localStorage.historySet) : []);
  _histpos = _history.length;
  _histtemp = "";
  _terminal = document.getElementById(containerID);
  _terminal.classList.add("terminal");
  _terminal.classList.add("terminal-" + options.theme);
  _terminal.insertAdjacentHTML("beforeEnd", ["<div class=\"background\"><div class=\"interlace\"></div></div>", "<div class=\"container\">", "<output></output>", "<table class=\"input-line\">", "<tr><td nowrap><div class=\"prompt\">" + options.prompt + options.separator + "</div></td><td width=\"100%\"><input class=\"cmdline\" autofocus /></td></tr>", "</table>", "</div>"].join(""));
  _container = _terminal.querySelector(".container");
  _inputLine = _container.querySelector(".input-line");
  _cmdLine = _container.querySelector(".input-line .cmdline");
  _output = _container.querySelector("output");
  _prompt = _container.querySelector(".prompt");
  _background = document.querySelector(".background");
  _cmdListeners = [];
  _output.addEventListener("DOMSubtreeModified", (function(e) {
    setTimeout((function() {
      _cmdLine.scrollIntoView();
    }), 0);
  }), false);
  if (options.welcome) {
    output(options.welcome);
  }
  window.addEventListener("click", (function(e) {
    _cmdLine.focus();
  }), false);
  _output.addEventListener("click", (function(e) {
    e.stopPropagation();
  }), false);
  _cmdLine.addEventListener("click", inputTextClick, false);
  _inputLine.addEventListener("click", (function(e) {
    _cmdLine.focus();
  }), false);
  _cmdLine.addEventListener("keyup", historyHandler, false);
  _cmdLine.addEventListener("keydown", newCommandHandler, false);
  window.addEventListener("keyup", (function(e) {
    _cmdLine.focus();
    e.stopPropagation();
    e.preventDefault();
  }), false);
  this.processCommand = function(line) {
    var e;
    _cmdLine.value = line;
    e = new Event("keydown");
    e.keyCode = 13;
    newCommandHandler(e);
  };
  this.subscribe = function(callback) {
    _cmdListeners.push(callback);
  };
  this.clear = function() {
    _output.innerHTML = "";
    _cmdLine.value = "";
    _background.style.minHeight = "";
  };
  output = function(html) {
    var j, len, line, results;
    if (html.join) {
      results = [];
      for (j = 0, len = html.length; j < len; j++) {
        line = html[j];
        results.push(output(line));
      }
      return results;
    } else if (typeof html === 'string') {
      html = "<div class='line'>" + html + "</div>";
      _output.insertAdjacentHTML("beforeEnd", html);
      _cmdLine.scrollIntoView();
    }
  };
  this.output = output;
  this.format = this.f = require('./formatting.coffee');
  this.setPrompt = function(prompt) {
    _prompt.innerHTML = prompt + options.separator;
  };
  this.getPrompt = function() {
    return _prompt.innerHTML.replace(new RegExp(options.separator + "$"), "");
  };
  this.setTheme = function(theme) {
    _terminal.classList.remove("terminal-" + options.theme);
    options.theme = theme;
    _terminal.classList.add("terminal-" + options.theme);
  };
  this.getTheme = function() {
    return options.theme;
  };
  term = this;
  return term;
};



},{"./formatting.coffee":4,"./parseArgs.coffee":5}],2:[function(require,module,exports){
var bold, cyan, green, magenta, red, ref, white, yellow;

ref = require('./colors.coffee'), bold = ref.bold, white = ref.white, yellow = ref.yellow, magenta = ref.magenta, red = ref.red, cyan = ref.cyan, green = ref.green;

module.exports = function(opts) {
  var color, colors, defaultOpts, i, j, k, label, len, len1, m, maxlabel, mode, n, name, normalized, o, opt, output, ref1, ref2, ref3, ref4, scale, serien, series, space, tick, url, val, vals, values;
  defaultOpts = {
    _show_legend: true,
    _fill: true,
    _interpolate: 'cubic',
    _height: '300px',
    _style: 'dark'
  };
  for (opt in defaultOpts) {
    opts[opt] = opts[opt] || defaultOpts[opt];
  }
  if (typeof window !== 'undefined') {
    mode = 'browser';
    url = "//chartspree.io/bar.svg?";
    for (name in opts) {
      values = opts[name];
      url += name + "=" + (values.join(',')) + "&";
    }
    return "<object data='" + url + "' type='image/svg+xml'>";
  } else {
    mode = 'console';
    tick = '▇';
    series = {};
    for (name in opts) {
      vals = opts[name];
      if (name[0] !== '_') {
        series[name] = vals;
      }
    }
    maxlabel = 0;
    if ('_labels' in opts) {
      ref1 = opts._labels;
      for (j = 0, len = ref1.length; j < len; j++) {
        label = ref1[j];
        if (label.length > maxlabel) {
          maxlabel = label.length;
        }
      }
    }
    scale = (function() {
      var absMax, k, l, len1, relMax, val;
      absMax = opts._absolute_max || 70;
      if (maxlabel) {
        absMax -= maxlabel + 2;
      }
      relMax = 0;
      for (l in series) {
        vals = series[l];
        for (k = 0, len1 = vals.length; k < len1; k++) {
          val = vals[k];
          if (val > relMax) {
            relMax = val;
          }
        }
      }
      return function(val) {
        return parseInt((val / relMax) * absMax);
      };
    })();
    colors = [white, yellow, magenta, red, cyan, green];
    output = '\n';
    serien = 0;
    for (name in series) {
      values = series[name];
      color = colors[serien % colors.length];
      output += bold(name + ' ');
      output += '\n';
      i = 0;
      for (k = 0, len1 = values.length; k < len1; k++) {
        val = values[k];
        normalized = scale(val);
        if (maxlabel) {
          output += opts._labels[i];
          if (opts._labels[i].length) {
            for (space = m = ref2 = opts._labels[i].length, ref3 = maxlabel; ref2 <= ref3 ? m <= ref3 : m >= ref3; space = ref2 <= ref3 ? ++m : --m) {
              output += ' ';
            }
          }
        }
        for (n = o = 0, ref4 = normalized; 0 <= ref4 ? o <= ref4 : o >= ref4; n = 0 <= ref4 ? ++o : --o) {
          output += color(tick);
        }
        if (opts._show_legend) {
          output += ' ' + val;
        }
        output += '\n';
        i += 1;
      }
      serien += 1;
      output += '\n';
    }
    return output;
  }
};



},{"./colors.coffee":3}],3:[function(require,module,exports){
var colors, mode, style, styles, stylize;

colors = {};

module.exports = colors;

if (typeof window !== 'undefined') {
  mode = 'browser';
} else {
  mode = 'console';
}

styles = {
  'console': {
    'bold': ['\x1B[1m', '\x1B[22m'],
    'italic': ['\x1B[3m', '\x1B[23m'],
    'underline': ['\x1B[4m', '\x1B[24m'],
    'inverse': ['\x1B[7m', '\x1B[27m'],
    'strikethrough': ['\x1B[9m', '\x1B[29m'],
    'white': ['\x1B[37m', '\x1B[39m'],
    'grey': ['\x1B[90m', '\x1B[39m'],
    'black': ['\x1B[30m', '\x1B[39m'],
    'blue': ['\x1B[34m', '\x1B[39m'],
    'cyan': ['\x1B[36m', '\x1B[39m'],
    'green': ['\x1B[32m', '\x1B[39m'],
    'magenta': ['\x1B[35m', '\x1B[39m'],
    'red': ['\x1B[31m', '\x1B[39m'],
    'yellow': ['\x1B[33m', '\x1B[39m'],
    'whiteBG': ['\x1B[47m', '\x1B[49m'],
    'greyBG': ['\x1B[49;5;8m', '\x1B[49m'],
    'blackBG': ['\x1B[40m', '\x1B[49m'],
    'blueBG': ['\x1B[44m', '\x1B[49m'],
    'cyanBG': ['\x1B[46m', '\x1B[49m'],
    'greenBG': ['\x1B[42m', '\x1B[49m'],
    'magentaBG': ['\x1B[45m', '\x1B[49m'],
    'redBG': ['\x1B[41m', '\x1B[49m'],
    'yellowBG': ['\x1B[43m', '\x1B[49m']
  },
  'browser': {
    'bold': ['<b>', '</b>'],
    'italic': ['<i>', '</i>'],
    'underline': ['<u>', '</u>'],
    'inverse': ['<span style="background-color:black;color:white;">', '</span>'],
    'strikethrough': ['<del>', '</del>'],
    'white': ['<span style="color:white;">', '</span>'],
    'grey': ['<span style="color:gray;">', '</span>'],
    'black': ['<span style="color:black;">', '</span>'],
    'blue': ['<span style="color:blue;">', '</span>'],
    'cyan': ['<span style="color:cyan;">', '</span>'],
    'green': ['<span style="color:green;">', '</span>'],
    'magenta': ['<span style="color:magenta;">', '</span>'],
    'red': ['<span style="color:red;">', '</span>'],
    'yellow': ['<span style="color:yellow;">', '</span>'],
    'whiteBG': ['<span style="background-color:white;">', '</span>'],
    'greyBG': ['<span style="background-color:gray;">', '</span>'],
    'blackBG': ['<span style="background-color:black;">', '</span>'],
    'blueBG': ['<span style="background-color:blue;">', '</span>'],
    'cyanBG': ['<span style="background-color:cyan;">', '</span>'],
    'greenBG': ['<span style="background-color:green;">', '</span>'],
    'magentaBG': ['<span style="background-color:magenta;">', '</span>'],
    'redBG': ['<span style="background-color:red;">', '</span>'],
    'yellowBG': ['<span style="background-color:yellow;">', '</span>']
  }
};

colors.styles = Object.keys(styles.console);

stylize = function(style, str) {
  if (mode !== 'browser' && mode !== 'console') {
    return "" + str;
  }
  return styles[mode][style][0] + str + styles[mode][style][1];
};

for (style in styles.console) {
  colors[style] = stylize.bind(this, style);
}



},{}],4:[function(require,module,exports){
var charts, colors, formatting, i, len, mode, ref, style, tables;

tables = require('./tables.coffee');

charts = require('./charts.coffee');

colors = require('./colors.coffee');

formatting = {};

module.exports = formatting;

if (typeof window !== 'undefined') {
  mode = 'browser';
} else {
  mode = 'console';
}

ref = colors.styles;
for (i = 0, len = ref.length; i < len; i++) {
  style = ref[i];
  formatting[style] = colors[style];
}

formatting.table = tables;

formatting.chart = charts;

formatting.newline = formatting.n = function() {
  if (mode === 'console') {
    return '\n';
  } else if (mode === 'browser') {
    return '<br>';
  } else {
    return '';
  }
};

formatting.link = formatting.href = formatting.a = function(command, text) {
  if (!text && command.length === 1) {
    text = command[0];
  }
  if (mode === 'console') {
    if (command.length === 0 || command.length === 1 && command[0] === text) {
      return colors.underline(text);
    } else {
      return text + " [" + (colors.underline(command.join(' '))) + "]";
    }
  } else if (mode === 'browser') {
    return "<a href='#!/" + (command.join('/')) + "'>" + text + "</a>";
  } else {
    return '';
  }
};

formatting.title = formatting.h1 = function(text) {
  return colors.yellowBG('  ' + colors.redBG(colors.bold(("  " + text + "  ") + colors.yellowBG('  '))));
};

formatting.subtitle = formatting.h2 = function(text) {
  return colors.bold(colors.cyanBG(colors.yellow("  " + text + "  ")));
};

formatting.subsubtitle = formatting.h3 = function(text) {
  return colors.inverse(" " + text + " ");
};

formatting.italic = formatting.i = colors.italic;

formatting.bold = formatting.b = colors.bold;



},{"./charts.coffee":2,"./colors.coffee":3,"./tables.coffee":6}],5:[function(require,module,exports){
module.exports = function(line) {
  var arg, args, cmd, provArgs, realArgs;
  cmd = '';
  args = [];
  if (line && line.trim()) {
    provArgs = line.split(" ");
    realArgs = [];
    arg = "";
    provArgs.join(" ").split("").forEach(function(letter) {
      if (letter === " ") {
        if (arg.length) {
          if (arg[0] !== "\"" && arg[0] !== "'") {
            realArgs.push(arg);
            arg = "";
          } else {
            arg += letter;
          }
        }
      } else if (letter === "\"" || letter === "'") {
        if (arg.length && arg[0] === letter) {
          realArgs.push(arg.slice(1));
          arg = "";
        } else {
          arg += letter;
        }
      } else {
        arg += letter;
      }
    });
    realArgs.push(arg.trim());
    args = realArgs;
    args = args.filter(function(val, i) {
      return val;
    });
    cmd = args[0];
    args = args.splice(1);
  }
  return {
    cmd: cmd.trim(),
    args: args,
    line: line
  };
};



},{}],6:[function(require,module,exports){
var indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

module.exports = function(header, rows, opts) {
  var borderColor, buildLine, buildRow, col, colors, cols, defaultOpts, formatting, getSpacesBefore, headerColor, i, j, k, l, largest, len, len1, len2, len3, len4, len5, len6, m, n, ncols, numberColor, o, opt, output, p, q, rawRow, rawRows, ref, results, row, styledContent, styledRow, styledRows, styles, textColor;
  if (opts == null) {
    opts = {};
  }
  colors = require('./colors.coffee');
  formatting = require('./formatting.coffee');
  String.prototype.len = function() {
    return this.split()[0].replace(/<([^>]*)>/g, '').replace(/\[[^m]+m/g, '').length;
  };
  if (header && header.length) {
    rows.unshift(header);
    header = true;
  }
  defaultOpts = {
    kind: 'horizontal',
    borderColor: 'magenta',
    headerColor: 'bold',
    textColor: 'yellow',
    numberColor: 'cyan'
  };
  styles = {};
  for (opt in defaultOpts) {
    if (indexOf.call(opts, opt) < 0) {
      opts[opt] = defaultOpts[opt];
    }
    styles[opt] = colors[opts[opt]];
  }
  borderColor = styles.borderColor, headerColor = styles.headerColor, textColor = styles.textColor, numberColor = styles.numberColor;
  ncols = 0;
  for (j = 0, len = rows.length; j < len; j++) {
    row = rows[j];
    if (row.length > ncols) {
      ncols = row.length;
    }
  }
  cols = (function() {
    results = [];
    for (var k = 0, ref = ncols - 1; 0 <= ref ? k <= ref : k >= ref; 0 <= ref ? k++ : k--){ results.push(k); }
    return results;
  }).apply(this);
  styledRows = [];
  for (l = 0, len1 = rows.length; l < len1; l++) {
    row = rows[l];
    styledRows.push((function() {
      var len2, m, results1;
      results1 = [];
      for (m = 0, len2 = row.length; m < len2; m++) {
        col = row[m];
        results1.push('');
      }
      return results1;
    })());
  }
  rawRows = [];
  for (m = 0, len2 = rows.length; m < len2; m++) {
    row = rows[m];
    rawRows.push((function() {
      var len3, n, results1;
      results1 = [];
      for (n = 0, len3 = row.length; n < len3; n++) {
        col = row[n];
        results1.push(col);
      }
      return results1;
    })());
  }
  largest = {};
  for (n = 0, len3 = cols.length; n < len3; n++) {
    col = cols[n];
    for (i = o = 0, len4 = rows.length; o < len4; i = ++o) {
      row = rows[i];
      styledRow = styledRows[i];
      if (typeof row[col] === 'number' || /\d+,\d+/.exec(row[col])) {
        styledContent = numberColor(row[col]);
      } else if (typeof row[col] === 'string') {
        styledContent = textColor(row[col]);
      }
      styledRow[col] = styledContent;
      if (row[col]) {
        row[col] = "" + row[col];
      }
    }
    largest[col] = 0;
    for (p = 0, len5 = rows.length; p < len5; p++) {
      row = rows[p];
      if (row[col] && row[col].len() > largest[col]) {
        largest[col] = row[col].len();
      }
    }
  }
  buildLine = function(style) {
    var char, len6, line, q, r, ref1;
    if (style == null) {
      style = borderColor;
    }
    line = '';
    line += borderColor('+');
    for (q = 0, len6 = cols.length; q < len6; q++) {
      col = cols[q];
      line += style('-');
      for (char = r = 0, ref1 = largest[col]; 0 <= ref1 ? r <= ref1 : r >= ref1; char = 0 <= ref1 ? ++r : --r) {
        line += style('-');
      }
      line += borderColor('+');
    }
    line += formatting.newline();
    return line;
  };
  buildRow = function(row, styledRow, rawRow, defaultAlign) {
    var align, len6, line, q, spaces, spacesAfter, spacesBefore, stylize;
    if (defaultAlign == null) {
      defaultAlign = 'auto';
    }
    line = '';
    line += borderColor('|');
    for (q = 0, len6 = cols.length; q < len6; q++) {
      col = cols[q];
      line += ' ';
      if (defaultAlign === 'auto') {
        if (typeof rawRow[col] === 'number' || /\d+,\d+/.exec(rawRow[col])) {
          align = 'right';
        } else {
          align = 'left';
        }
      } else {
        align = defaultAlign;
      }
      spaces = largest[col];
      if (row.length - 1 >= col) {
        spaces -= row[col].len();
      }
      spacesBefore = getSpacesBefore(spaces, align);
      spacesAfter = spaces - spacesBefore;
      while (spacesBefore > 0) {
        line += ' ';
        spacesBefore--;
      }
      if (typeof styledRow === 'function') {
        stylize = styledRow;
        styledContent = stylize(row[col]);
      } else {
        styledContent = styledRow[col];
      }
      line += styledContent;
      while (spacesAfter > 0) {
        line += ' ';
        spacesAfter--;
      }
      line += borderColor(' |');
    }
    line += formatting.newline();
    return line;
  };
  getSpacesBefore = function(spacesLeft, align) {
    if (align === 'left') {
      return 0;
    } else if (align === 'right') {
      return spacesLeft;
    } else if (align === 'center') {
      if (spacesLeft % 2 === 0) {
        return spacesLeft / 2;
      } else {
        return (spacesLeft - 1) / 2;
      }
    }
  };
  output = '';
  output += buildLine();
  if (header) {
    output += buildRow(rows[0], headerColor, null, 'center');
    output += buildLine(headerColor);
    rows = rows.slice(1);
    styledRows = styledRows.slice(1);
    rawRows = rawRows.slice(1);
  }
  for (i = q = 0, len6 = rows.length; q < len6; i = ++q) {
    row = rows[i];
    styledRow = styledRows[i];
    rawRow = rawRows[i];
    output += buildRow(row, styledRow, rawRow);
    output += buildLine();
  }
  return output;
};



},{"./colors.coffee":3,"./formatting.coffee":4}]},{},[1])
//@ sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2ZpYXRqYWYvY29tcC90ZXJtaW5hbC9saWIvYnJvd3Nlci5jb2ZmZWUiLCIvaG9tZS9maWF0amFmL2NvbXAvdGVybWluYWwvbGliL2NoYXJ0cy5jb2ZmZWUiLCIvaG9tZS9maWF0amFmL2NvbXAvdGVybWluYWwvbGliL2NvbG9ycy5jb2ZmZWUiLCIvaG9tZS9maWF0amFmL2NvbXAvdGVybWluYWwvbGliL2Zvcm1hdHRpbmcuY29mZmVlIiwiL2hvbWUvZmlhdGphZi9jb21wL3Rlcm1pbmFsL2xpYi9wYXJzZUFyZ3MuY29mZmVlIiwiL2hvbWUvZmlhdGphZi9jb21wL3Rlcm1pbmFsL2xpYi90YWJsZXMuY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxJQUFBLFNBQUE7O0FBQUEsU0FBQSxHQUFZLE9BQUEsQ0FBUSxvQkFBUixDQUFaLENBQUE7O0FBQUEsTUFFTSxDQUFDLE9BQVAsR0FBaUIsU0FBQyxXQUFELEVBQWMsT0FBZCxHQUFBO0FBUWYsTUFBQSw4TkFBQTtBQUFBLEVBQUEsY0FBQSxHQUFpQixTQUFDLENBQUQsR0FBQTtBQUNmLElBQUEsSUFBQyxDQUFBLEtBQUQsR0FBUyxJQUFDLENBQUEsS0FBVixDQURlO0VBQUEsQ0FBakIsQ0FBQTtBQUFBLEVBR0EsY0FBQSxHQUFpQixTQUFDLENBQUQsR0FBQTtBQUdmLFFBQUEsbUJBQUE7QUFBQSxJQUFBLElBQUcsQ0FBQyxDQUFDLE9BQUYsS0FBYSxFQUFoQjtBQUNFLE1BQUEsSUFBQyxDQUFBLEtBQUQsR0FBUyxFQUFULENBQUE7QUFBQSxNQUNBLENBQUMsQ0FBQyxlQUFGLENBQUEsQ0FEQSxDQUFBO0FBQUEsTUFFQSxDQUFDLENBQUMsY0FBRixDQUFBLENBRkEsQ0FERjtLQUFBO0FBSUEsSUFBQSxJQUFHLFFBQVEsQ0FBQyxNQUFULElBQW9CLENBQUMsQ0FBQyxDQUFDLE9BQUYsS0FBYSxFQUFiLElBQW1CLENBQUMsQ0FBQyxPQUFGLEtBQWEsRUFBakMsQ0FBdkI7QUFDRSxN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YixLQUFrQixDQUFyQjtBQUNFLGVBQU8sVUFBQSxHQUFXLENBQWxCLENBREY7T0FBQSxNQUFBO0FBR0UsZUFBTyxDQUFDLFVBQUEsR0FBVyxDQUFaLENBQUEsR0FBZSxDQUF0QixDQUhGO09BREc7S0FMVztFQUFBLENBbEhsQixDQUFBO0FBQUEsRUE4SEEsTUFBQSxHQUFTLEVBOUhULENBQUE7QUFBQSxFQWlJQSxNQUFBLElBQVUsU0FBQSxDQUFBLENBaklWLENBQUE7QUFvSUEsRUFBQSxJQUFHLE1BQUg7QUFDRSxJQUFBLE1BQUEsSUFBVSxRQUFBLENBQVMsSUFBSyxDQUFBLENBQUEsQ0FBZCxFQUFrQixXQUFsQixFQUErQixJQUEvQixFQUFxQyxRQUFyQyxDQUFWLENBQUE7QUFBQSxJQUNBLE1BQUEsSUFBVSxTQUFBLENBQVUsV0FBVixDQURWLENBQUE7QUFBQSxJQUVBLElBQUEsR0FBTyxJQUFJLENBQUMsS0FBTCxDQUFXLENBQVgsQ0FGUCxDQUFBO0FBQUEsSUFHQSxVQUFBLEdBQWEsVUFBVSxDQUFDLEtBQVgsQ0FBaUIsQ0FBakIsQ0FIYixDQUFBO0FBQUEsSUFJQSxPQUFBLEdBQVUsT0FBTyxDQUFDLEtBQVIsQ0FBYyxDQUFkLENBSlYsQ0FERjtHQXBJQTtBQTRJQSxPQUFBLGdEQUFBO2tCQUFBO0FBQ0UsSUFBQSxTQUFBLEdBQVksVUFBVyxDQUFBLENBQUEsQ0FBdkIsQ0FBQTtBQUFBLElBQ0EsTUFBQSxHQUFTLE9BQVEsQ0FBQSxDQUFBLENBRGpCLENBQUE7QUFBQSxJQUVBLE1BQUEsSUFBVSxRQUFBLENBQVMsR0FBVCxFQUFjLFNBQWQsRUFBeUIsTUFBekIsQ0FGVixDQUFBO0FBQUEsSUFLQSxNQUFBLElBQVUsU0FBQSxDQUFBLENBTFYsQ0FERjtBQUFBLEdBNUlBO0FBb0pBLFNBQU8sTUFBUCxDQXhKZTtBQUFBLENBQWpCLENBQUEiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbInBhcnNlQXJncyA9IHJlcXVpcmUgJy4vcGFyc2VBcmdzLmNvZmZlZSdcblxubW9kdWxlLmV4cG9ydHMgPSAoY29udGFpbmVySUQsIG9wdGlvbnMpIC0+XG4gIFxuICAjIENyZWF0ZSB0ZXJtaW5hbCBhbmQgY2FjaGUgRE9NIG5vZGVzO1xuICAjIEhhY2tlcnkgdG8gcmVzaXplIHRoZSBpbnRlcmxhY2UgYmFja2dyb3VuZCBpbWFnZSBhcyB0aGUgY29udGFpbmVyIGdyb3dzLlxuICAjIFdvcmtzIGJlc3Qgd2l0aCB0aGUgc2Nyb2xsIGludG8gdmlldyB3cmFwcGVkIGluIGEgc2V0VGltZW91dC5cbiAgIyBBbHdheXMgZm9yY2UgdGV4dCBjdXJzb3IgdG8gZW5kIG9mIGlucHV0IGxpbmUuXG4gICMgSGFuZGxlIHVwL2Rvd24ga2V5IHByZXNzZXMgZm9yIHNoZWxsIGhpc3RvcnkgYW5kIGVudGVyIGZvciBuZXcgY29tbWFuZC5cblxuICBpbnB1dFRleHRDbGljayA9IChlKSAtPlxuICAgIEB2YWx1ZSA9IEB2YWx1ZVxuICAgIHJldHVyblxuICBoaXN0b3J5SGFuZGxlciA9IChlKSAtPlxuICAgIFxuICAgICMgQ2xlYXIgY29tbWFuZC1saW5lIG9uIEVzY2FwZSBrZXkuXG4gICAgaWYgZS5rZXlDb2RlIGlzIDI3XG4gICAgICBAdmFsdWUgPSBcIlwiXG4gICAgICBlLnN0b3BQcm9wYWdhdGlvbigpXG4gICAgICBlLnByZXZlbnREZWZhdWx0KClcbiAgICBpZiBfaGlzdG9yeS5sZW5ndGggYW5kIChlLmtleUNvZGUgaXMgMzggb3IgZS5rZXlDb2RlIGlzIDQwKVxuICAgICAgaWYgX2hpc3RvcnlbX2hpc3Rwb3NdXG4gICAgICAgIF9oaXN0b3J5W19oaXN0cG9zXSA9IEB2YWx1ZVxuICAgICAgZWxzZVxuICAgICAgICBfaGlzdHRlbXAgPSBAdmFsdWVcbiAgICAgIGlmIGUua2V5Q29kZSBpcyAzOFxuICAgICAgICBcbiAgICAgICAgIyBVcCBhcnJvdyBrZXkuXG4gICAgICAgIF9oaXN0cG9zLS1cbiAgICAgICAgX2hpc3Rwb3MgPSAwICBpZiBfaGlzdHBvcyA8IDBcbiAgICAgIGVsc2UgaWYgZS5rZXlDb2RlIGlzIDQwXG4gICAgICAgIFxuICAgICAgICAjIERvd24gYXJyb3cga2V5LlxuICAgICAgICBfaGlzdHBvcysrXG4gICAgICAgIF9oaXN0cG9zID0gX2hpc3RvcnkubGVuZ3RoICBpZiBfaGlzdHBvcyA+IF9oaXN0b3J5Lmxlbmd0aFxuICAgICAgQHZhbHVlID0gKGlmIF9oaXN0b3J5W19oaXN0cG9zXSB0aGVuIF9oaXN0b3J5W19oaXN0cG9zXSBlbHNlIF9oaXN0dGVtcClcbiAgICAgIFxuICAgICAgIyBNb3ZlIGN1cnNvciB0byBlbmQgb2YgaW5wdXQuXG4gICAgICBAdmFsdWUgPSBAdmFsdWVcbiAgICByZXR1cm5cblxuICBhZGRUb0hpc3RvcnkgPSAoX2hpc3RvcnksIG5ld0VudHJ5KSAtPlxuICAgIFxuICAgICMgUmVtb3ZlIHJlcGVhdGVkIGhpc3RvcnkgZW50cmllc1xuICAgIGlmIG5ld0VudHJ5IG9mIF9oaXN0b3J5U2V0XG4gICAgICBpID0gX2hpc3RvcnkubGVuZ3RoIC0gMVxuXG4gICAgICB3aGlsZSBpID49IDBcbiAgICAgICAgaWYgX2hpc3RvcnlbaV0gaXMgbmV3RW50cnlcbiAgICAgICAgICBfaGlzdG9yeS5zcGxpY2UgaSwgMVxuICAgICAgICAgIGJyZWFrXG4gICAgICAgIGktLVxuICAgIF9oaXN0b3J5LnB1c2ggbmV3RW50cnlcbiAgICBfaGlzdG9yeVNldFtuZXdFbnRyeV0gPSB0cnVlXG4gICAgcmV0dXJuXG5cbiAgbmV3Q29tbWFuZEhhbmRsZXIgPSAoZSkgLT5cbiAgICBcbiAgICAjIE9ubHkgaGFuZGxlIHRoZSBFbnRlciBrZXkuXG4gICAgcmV0dXJuICB1bmxlc3MgZS5rZXlDb2RlIGlzIDEzXG4gICAgY21kbGluZSA9IEB2YWx1ZVxuICAgIFxuICAgICMgU2F2ZSBzaGVsbCBoaXN0b3J5LlxuICAgIGlmIGNtZGxpbmVcbiAgICAgIGFkZFRvSGlzdG9yeSBfaGlzdG9yeSwgY21kbGluZVxuICAgICAgbG9jYWxTdG9yYWdlW1wiaGlzdG9yeVwiXSA9IEpTT04uc3RyaW5naWZ5KF9oaXN0b3J5KVxuICAgICAgbG9jYWxTdG9yYWdlW1wiaGlzdG9yeVNldFwiXSA9IEpTT04uc3RyaW5naWZ5KF9oaXN0b3J5U2V0KVxuICAgICAgX2hpc3Rwb3MgPSBfaGlzdG9yeS5sZW5ndGhcbiAgICBcbiAgICAjIER1cGxpY2F0ZSBjdXJyZW50IGlucHV0IGFuZCBhcHBlbmQgdG8gb3V0cHV0IHNlY3Rpb24uXG4gICAgbGluZSA9IEBwYXJlbnROb2RlLnBhcmVudE5vZGUucGFyZW50Tm9kZS5wYXJlbnROb2RlLmNsb25lTm9kZSh0cnVlKVxuICAgIGxpbmUucmVtb3ZlQXR0cmlidXRlIFwiaWRcIlxuICAgIGxpbmUuY2xhc3NMaXN0LmFkZCBcImxpbmVcIlxuICAgIGlucHV0ID0gbGluZS5xdWVyeVNlbGVjdG9yKFwiaW5wdXQuY21kbGluZVwiKVxuICAgIGlucHV0LmF1dG9mb2N1cyA9IGZhbHNlXG4gICAgaW5wdXQucmVhZE9ubHkgPSB0cnVlXG4gICAgaW5wdXQuaW5zZXJ0QWRqYWNlbnRIVE1MIFwiYmVmb3JlYmVnaW5cIiwgaW5wdXQudmFsdWVcbiAgICBpbnB1dC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkIGlucHV0XG4gICAgX291dHB1dC5hcHBlbmRDaGlsZCBsaW5lXG4gICAgXG4gICAgIyBIaWRlIGNvbW1hbmQgbGluZSB1bnRpbCB3ZSdyZSBkb25lIHByb2Nlc3NpbmcgaW5wdXQuXG4gICAgX2lucHV0TGluZS5jbGFzc0xpc3QuYWRkIFwiaGlkZGVuXCJcbiAgICBcbiAgICAjIENsZWFyL3NldHVwIGxpbmUgZm9yIG5leHQgaW5wdXQuXG4gICAgQHZhbHVlID0gXCJcIlxuICAgIFxuICAgIHtjbWQsIGFyZ3MsIGxpbmV9ID0gcGFyc2VBcmdzIGNtZGxpbmVcbiAgICBcbiAgICAjIE5vdGlmeSBldmVudCBsaXN0ZW5lcnNcbiAgICBhcmdzID0gYXJncyBvciBbXVxuICAgIGkgPSAwXG4gICAgd2hpbGUgaSA8IF9jbWRMaXN0ZW5lcnMubGVuZ3RoXG4gICAgICBsaXN0ZW5lciA9IF9jbWRMaXN0ZW5lcnNbaV1cbiAgICAgIGxpc3RlbmVyIGFyZ3MgIGlmIHR5cGVvZiBsaXN0ZW5lciBpcyBcImZ1bmN0aW9uXCJcbiAgICAgIGkrK1xuXG4gICAgaWYgY21kXG4gICAgICByZXNwb25zZSA9IG9wdGlvbnMuZXhlY3V0ZShjbWQsIGFyZ3MsIHRlcm0pIGlmIG9wdGlvbnMuZXhlY3V0ZVxuICAgICAgcmVzcG9uc2UgPSBjbWQgKyBcIjogY29tbWFuZCBub3QgZm91bmRcIiAgaWYgbm90IHJlc3BvbnNlXG4gICAgICBvdXRwdXQgcmVzcG9uc2VcbiAgICBcbiAgICAjIFNob3cgdGhlIGNvbW1hbmQgbGluZS5cbiAgICBfaW5wdXRMaW5lLmNsYXNzTGlzdC5yZW1vdmUgXCJoaWRkZW5cIlxuICAgIHJldHVyblxuXG4gIGRlZmF1bHRzID1cbiAgICB3ZWxjb21lOiBcIlwiXG4gICAgcHJvbXB0OiBcIlwiXG4gICAgc2VwYXJhdG9yOiBcIiZndDtcIlxuICAgIHRoZW1lOiBcImludGVybGFjZWRcIlxuXG4gIG9wdGlvbnMgPSBvcHRpb25zIG9yIGRlZmF1bHRzXG4gIG9wdGlvbnMud2VsY29tZSA9IG9wdGlvbnMud2VsY29tZSBvciBkZWZhdWx0cy53ZWxjb21lXG4gIG9wdGlvbnMucHJvbXB0ID0gb3B0aW9ucy5wcm9tcHQgb3IgZGVmYXVsdHMucHJvbXB0XG4gIG9wdGlvbnMuc2VwYXJhdG9yID0gb3B0aW9ucy5zZXBhcmF0b3Igb3IgZGVmYXVsdHMuc2VwYXJhdG9yXG4gIG9wdGlvbnMudGhlbWUgPSBvcHRpb25zLnRoZW1lIG9yIGRlZmF1bHRzLnRoZW1lXG5cbiAgX2hpc3RvcnkgPSAoaWYgbG9jYWxTdG9yYWdlLmhpc3RvcnkgdGhlbiBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5oaXN0b3J5KSBlbHNlIFtdKVxuICBfaGlzdG9yeVNldCA9IChpZiBsb2NhbFN0b3JhZ2UuaGlzdG9yeVNldCB0aGVuIEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmhpc3RvcnlTZXQpIGVsc2UgW10pXG4gIF9oaXN0cG9zID0gX2hpc3RvcnkubGVuZ3RoXG4gIF9oaXN0dGVtcCA9IFwiXCJcbiAgX3Rlcm1pbmFsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoY29udGFpbmVySUQpXG4gIF90ZXJtaW5hbC5jbGFzc0xpc3QuYWRkIFwidGVybWluYWxcIlxuICBfdGVybWluYWwuY2xhc3NMaXN0LmFkZCBcInRlcm1pbmFsLVwiICsgb3B0aW9ucy50aGVtZVxuICBfdGVybWluYWwuaW5zZXJ0QWRqYWNlbnRIVE1MIFwiYmVmb3JlRW5kXCIsIFtcbiAgICBcIjxkaXYgY2xhc3M9XFxcImJhY2tncm91bmRcXFwiPjxkaXYgY2xhc3M9XFxcImludGVybGFjZVxcXCI+PC9kaXY+PC9kaXY+XCJcbiAgICBcIjxkaXYgY2xhc3M9XFxcImNvbnRhaW5lclxcXCI+XCJcbiAgICBcIjxvdXRwdXQ+PC9vdXRwdXQ+XCJcbiAgICBcIjx0YWJsZSBjbGFzcz1cXFwiaW5wdXQtbGluZVxcXCI+XCJcbiAgICBcIjx0cj48dGQgbm93cmFwPjxkaXYgY2xhc3M9XFxcInByb21wdFxcXCI+XCIgKyBvcHRpb25zLnByb21wdCArIG9wdGlvbnMuc2VwYXJhdG9yICsgXCI8L2Rpdj48L3RkPjx0ZCB3aWR0aD1cXFwiMTAwJVxcXCI+PGlucHV0IGNsYXNzPVxcXCJjbWRsaW5lXFxcIiBhdXRvZm9jdXMgLz48L3RkPjwvdHI+XCJcbiAgICBcIjwvdGFibGU+XCJcbiAgICBcIjwvZGl2PlwiXG4gIF0uam9pbihcIlwiKVxuICBfY29udGFpbmVyID0gX3Rlcm1pbmFsLnF1ZXJ5U2VsZWN0b3IoXCIuY29udGFpbmVyXCIpXG4gIF9pbnB1dExpbmUgPSBfY29udGFpbmVyLnF1ZXJ5U2VsZWN0b3IoXCIuaW5wdXQtbGluZVwiKVxuICBfY21kTGluZSA9IF9jb250YWluZXIucXVlcnlTZWxlY3RvcihcIi5pbnB1dC1saW5lIC5jbWRsaW5lXCIpXG4gIF9vdXRwdXQgPSBfY29udGFpbmVyLnF1ZXJ5U2VsZWN0b3IoXCJvdXRwdXRcIilcbiAgX3Byb21wdCA9IF9jb250YWluZXIucXVlcnlTZWxlY3RvcihcIi5wcm9tcHRcIilcbiAgX2JhY2tncm91bmQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmJhY2tncm91bmRcIilcbiAgX2NtZExpc3RlbmVycyA9IFtdXG4gIF9vdXRwdXQuYWRkRXZlbnRMaXN0ZW5lciBcIkRPTVN1YnRyZWVNb2RpZmllZFwiLCAoKGUpIC0+XG4gICAgc2V0VGltZW91dCAoLT5cbiAgICAgIF9jbWRMaW5lLnNjcm9sbEludG9WaWV3KClcbiAgICAgIHJldHVyblxuICAgICksIDBcbiAgICByZXR1cm5cbiAgKSwgZmFsc2VcbiAgb3V0cHV0IG9wdGlvbnMud2VsY29tZSAgaWYgb3B0aW9ucy53ZWxjb21lXG4gIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyIFwiY2xpY2tcIiwgKChlKSAtPlxuICAgIF9jbWRMaW5lLmZvY3VzKClcbiAgICByZXR1cm5cbiAgKSwgZmFsc2VcbiAgX291dHB1dC5hZGRFdmVudExpc3RlbmVyIFwiY2xpY2tcIiwgKChlKSAtPlxuICAgIGUuc3RvcFByb3BhZ2F0aW9uKClcbiAgICByZXR1cm5cbiAgKSwgZmFsc2VcbiAgX2NtZExpbmUuYWRkRXZlbnRMaXN0ZW5lciBcImNsaWNrXCIsIGlucHV0VGV4dENsaWNrLCBmYWxzZVxuICBfaW5wdXRMaW5lLmFkZEV2ZW50TGlzdGVuZXIgXCJjbGlja1wiLCAoKGUpIC0+XG4gICAgX2NtZExpbmUuZm9jdXMoKVxuICAgIHJldHVyblxuICApLCBmYWxzZVxuICBfY21kTGluZS5hZGRFdmVudExpc3RlbmVyIFwia2V5dXBcIiwgaGlzdG9yeUhhbmRsZXIsIGZhbHNlXG4gIF9jbWRMaW5lLmFkZEV2ZW50TGlzdGVuZXIgXCJrZXlkb3duXCIsIG5ld0NvbW1hbmRIYW5kbGVyLCBmYWxzZVxuICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lciBcImtleXVwXCIsICgoZSkgLT5cbiAgICBfY21kTGluZS5mb2N1cygpXG4gICAgZS5zdG9wUHJvcGFnYXRpb24oKVxuICAgIGUucHJldmVudERlZmF1bHQoKVxuICAgIHJldHVyblxuICApLCBmYWxzZVxuXG4gIEBwcm9jZXNzQ29tbWFuZCA9IChsaW5lKSAtPlxuICAgIF9jbWRMaW5lLnZhbHVlID0gbGluZVxuICAgIGUgPSBuZXcgRXZlbnQoXCJrZXlkb3duXCIpXG4gICAgZS5rZXlDb2RlID0gMTNcbiAgICBuZXdDb21tYW5kSGFuZGxlciBlXG4gICAgcmV0dXJuXG5cbiAgQHN1YnNjcmliZSA9IChjYWxsYmFjaykgLT5cbiAgICBfY21kTGlzdGVuZXJzLnB1c2ggY2FsbGJhY2tcbiAgICByZXR1cm5cblxuICBAY2xlYXIgPSAtPlxuICAgIF9vdXRwdXQuaW5uZXJIVE1MID0gXCJcIlxuICAgIF9jbWRMaW5lLnZhbHVlID0gXCJcIlxuICAgIF9iYWNrZ3JvdW5kLnN0eWxlLm1pbkhlaWdodCA9IFwiXCJcbiAgICByZXR1cm5cblxuICBvdXRwdXQgPSAoaHRtbCkgLT5cbiAgICBpZiBodG1sLmpvaW5cbiAgICAgIG91dHB1dCBsaW5lIGZvciBsaW5lIGluIGh0bWxcbiAgICBlbHNlIGlmIHR5cGVvZiBodG1sID09ICdzdHJpbmcnXG4gICAgICBodG1sID0gXCI8ZGl2IGNsYXNzPSdsaW5lJz4je2h0bWx9PC9kaXY+XCJcbiAgICAgIF9vdXRwdXQuaW5zZXJ0QWRqYWNlbnRIVE1MIFwiYmVmb3JlRW5kXCIsIGh0bWxcbiAgICAgIF9jbWRMaW5lLnNjcm9sbEludG9WaWV3KClcbiAgICAgIHJldHVyblxuICBAb3V0cHV0ID0gb3V0cHV0XG5cbiAgQGZvcm1hdCA9IEBmID0gcmVxdWlyZSAnLi9mb3JtYXR0aW5nLmNvZmZlZSdcblxuICBAc2V0UHJvbXB0ID0gKHByb21wdCkgLT5cbiAgICBfcHJvbXB0LmlubmVySFRNTCA9IHByb21wdCArIG9wdGlvbnMuc2VwYXJhdG9yXG4gICAgcmV0dXJuXG5cbiAgQGdldFByb21wdCA9IC0+XG4gICAgX3Byb21wdC5pbm5lckhUTUwucmVwbGFjZSBuZXcgUmVnRXhwKG9wdGlvbnMuc2VwYXJhdG9yICsgXCIkXCIpLCBcIlwiXG5cbiAgQHNldFRoZW1lID0gKHRoZW1lKSAtPlxuICAgIF90ZXJtaW5hbC5jbGFzc0xpc3QucmVtb3ZlIFwidGVybWluYWwtXCIgKyBvcHRpb25zLnRoZW1lXG4gICAgb3B0aW9ucy50aGVtZSA9IHRoZW1lXG4gICAgX3Rlcm1pbmFsLmNsYXNzTGlzdC5hZGQgXCJ0ZXJtaW5hbC1cIiArIG9wdGlvbnMudGhlbWVcbiAgICByZXR1cm5cblxuICBAZ2V0VGhlbWUgPSAtPlxuICAgIG9wdGlvbnMudGhlbWVcblxuICB0ZXJtID0gdGhpc1xuICByZXR1cm4gdGVybVxuIiwiIyBtb2R1bGUgJ2NoYXJ0cydcblxue2JvbGQsIHdoaXRlLCB5ZWxsb3csIG1hZ2VudGEsIHJlZCwgY3lhbiwgZ3JlZW59ID0gcmVxdWlyZSAnLi9jb2xvcnMuY29mZmVlJ1xuXG5tb2R1bGUuZXhwb3J0cyA9IChvcHRzKSAtPlxuICBkZWZhdWx0T3B0cyA9XG4gICAgX3Nob3dfbGVnZW5kOiB0cnVlXG4gICAgX2ZpbGw6IHRydWVcbiAgICBfaW50ZXJwb2xhdGU6ICdjdWJpYydcbiAgICBfaGVpZ2h0OiAnMzAwcHgnXG4gICAgX3N0eWxlOiAnZGFyaydcbiAgZm9yIG9wdCBvZiBkZWZhdWx0T3B0c1xuICAgIG9wdHNbb3B0XSA9IG9wdHNbb3B0XSBvciBkZWZhdWx0T3B0c1tvcHRdXG5cbiAgaWYgdHlwZW9mIHdpbmRvdyAhPSAndW5kZWZpbmVkJ1xuICAgIG1vZGUgPSAnYnJvd3NlcidcbiAgICB1cmwgPSBcIi8vY2hhcnRzcHJlZS5pby9iYXIuc3ZnP1wiXG4gICAgdXJsICs9IFwiI3tuYW1lfT0je3ZhbHVlcy5qb2luICcsJ30mXCIgZm9yIG5hbWUsIHZhbHVlcyBvZiBvcHRzXG4gICAgcmV0dXJuIFwiPG9iamVjdCBkYXRhPScje3VybH0nIHR5cGU9J2ltYWdlL3N2Zyt4bWwnPlwiXG5cbiAgZWxzZVxuICAgIG1vZGUgPSAnY29uc29sZSdcbiAgICB0aWNrID0gJ+KWhydcbiAgICBzZXJpZXMgPSB7fVxuXG4gICAgIyBpZGVudGlmeSBzZXJpZXNcbiAgICBmb3IgbmFtZSwgdmFscyBvZiBvcHRzIHdoZW4gbmFtZVswXSAhPSAnXydcbiAgICAgIHNlcmllc1tuYW1lXSA9IHZhbHNcblxuICAgICMgaWRlbnRpZnkgbWF4aW11bSBsYWJlbCB3b3JkIGxlbmd0aFxuICAgIG1heGxhYmVsID0gMFxuICAgIGlmICdfbGFiZWxzJyBvZiBvcHRzXG4gICAgICBtYXhsYWJlbCA9IGxhYmVsLmxlbmd0aCBmb3IgbGFiZWwgaW4gb3B0cy5fbGFiZWxzIHdoZW4gbGFiZWwubGVuZ3RoID4gbWF4bGFiZWxcblxuICAgICMgYSBzY2FsZSBmdW5jdGlvbiBmb3IgdmFsdWUgbm9ybWFsaXphdGlvblxuICAgIHNjYWxlID0gKCAtPlxuICAgICAgYWJzTWF4ID0gb3B0cy5fYWJzb2x1dGVfbWF4IG9yIDcwXG4gICAgICBpZiBtYXhsYWJlbFxuICAgICAgICBhYnNNYXggLT0gKG1heGxhYmVsICsgMilcbiAgICAgIHJlbE1heCA9IDBcbiAgICAgIGZvciBsLCB2YWxzIG9mIHNlcmllc1xuICAgICAgICByZWxNYXggPSB2YWwgZm9yIHZhbCBpbiB2YWxzIHdoZW4gdmFsID4gcmVsTWF4XG4gICAgICByZXR1cm4gKHZhbCkgLT4gcGFyc2VJbnQoICh2YWwvcmVsTWF4KSAqIGFic01heCApXG4gICAgKSgpXG5cbiAgICAjIGNvbG9ycyBmb3Igc2VyaWVzXG4gICAgY29sb3JzID0gW3doaXRlLCB5ZWxsb3csIG1hZ2VudGEsIHJlZCwgY3lhbiwgZ3JlZW5dXG5cbiAgICAjIGdlbmVyYXRlIGNoYXJ0XG4gICAgb3V0cHV0ID0gJ1xcbidcbiAgICBzZXJpZW4gPSAwXG4gICAgZm9yIG5hbWUsIHZhbHVlcyBvZiBzZXJpZXNcbiAgICAgIGNvbG9yID0gY29sb3JzW3NlcmllbiAlIGNvbG9ycy5sZW5ndGhdXG4gICAgICBvdXRwdXQgKz0gYm9sZCBuYW1lICsgJyAnXG4gICAgICBvdXRwdXQgKz0gJ1xcbidcbiAgICAgIGkgPSAwXG4gICAgICBmb3IgdmFsIGluIHZhbHVlc1xuICAgICAgICBub3JtYWxpemVkID0gc2NhbGUgdmFsICMgbm9ybWFsaXplXG4gICAgICAgIGlmIG1heGxhYmVsXG4gICAgICAgICAgb3V0cHV0ICs9IG9wdHMuX2xhYmVsc1tpXVxuICAgICAgICAgIGlmIG9wdHMuX2xhYmVsc1tpXS5sZW5ndGhcbiAgICAgICAgICAgIG91dHB1dCArPSAnICcgZm9yIHNwYWNlIGluIFtvcHRzLl9sYWJlbHNbaV0ubGVuZ3RoLi5tYXhsYWJlbF1cbiAgICAgICAgb3V0cHV0ICs9IGNvbG9yIHRpY2sgZm9yIG4gaW4gWzAuLm5vcm1hbGl6ZWRdXG4gICAgICAgIG91dHB1dCArPSAnICcgKyB2YWwgaWYgb3B0cy5fc2hvd19sZWdlbmRcbiAgICAgICAgb3V0cHV0ICs9ICdcXG4nXG4gICAgICAgIGkgKz0gMVxuICAgICAgc2VyaWVuICs9IDFcbiAgICAgIG91dHB1dCArPSAnXFxuJ1xuICAgIHJldHVybiBvdXRwdXRcbiIsIiMgY29sb3JzLmpzXG4jIFxuIyBDb3B5cmlnaHQgKGMpIDIwMTBcbiMgXG4jIE1hcmFrIFNxdWlyZXNcbiMgQWxleGlzIFNlbGxpZXIgKGNsb3VkaGVhZClcbiMgXG4jIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcbiMgb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbFxuIyBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzXG4jIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGxcbiMgY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzXG4jIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG4jIFxuIyBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpblxuIyBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbiMgXG4jIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1JcbiMgSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG4jIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxuIyBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG4jIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG4jIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU5cbiMgVEhFIFNPRlRXQVJFLlxuXG5jb2xvcnMgPSB7fVxubW9kdWxlLmV4cG9ydHMgPSBjb2xvcnNcbmlmIHR5cGVvZiB3aW5kb3cgIT0gJ3VuZGVmaW5lZCdcbiAgbW9kZSA9ICdicm93c2VyJ1xuZWxzZVxuICBtb2RlID0gJ2NvbnNvbGUnXG5cbnN0eWxlcyA9XG4gICdjb25zb2xlJzpcbiAgICAnYm9sZCcgICAgICA6IFsnXFx4MUJbMW0nLCAgJ1xceDFCWzIybSddXG4gICAgJ2l0YWxpYycgICAgOiBbJ1xceDFCWzNtJywgICdcXHgxQlsyM20nXVxuICAgICd1bmRlcmxpbmUnIDogWydcXHgxQls0bScsICAnXFx4MUJbMjRtJ11cbiAgICAnaW52ZXJzZScgICA6IFsnXFx4MUJbN20nLCAgJ1xceDFCWzI3bSddXG4gICAgJ3N0cmlrZXRocm91Z2gnIDogWydcXHgxQls5bScsICAnXFx4MUJbMjltJ11cbiAgICAnd2hpdGUnICAgICA6IFsnXFx4MUJbMzdtJywgJ1xceDFCWzM5bSddXG4gICAgJ2dyZXknICAgICAgOiBbJ1xceDFCWzkwbScsICdcXHgxQlszOW0nXVxuICAgICdibGFjaycgICAgIDogWydcXHgxQlszMG0nLCAnXFx4MUJbMzltJ11cbiAgICAnYmx1ZScgICAgICA6IFsnXFx4MUJbMzRtJywgJ1xceDFCWzM5bSddXG4gICAgJ2N5YW4nICAgICAgOiBbJ1xceDFCWzM2bScsICdcXHgxQlszOW0nXVxuICAgICdncmVlbicgICAgIDogWydcXHgxQlszMm0nLCAnXFx4MUJbMzltJ11cbiAgICAnbWFnZW50YScgICA6IFsnXFx4MUJbMzVtJywgJ1xceDFCWzM5bSddXG4gICAgJ3JlZCcgICAgICAgOiBbJ1xceDFCWzMxbScsICdcXHgxQlszOW0nXVxuICAgICd5ZWxsb3cnICAgIDogWydcXHgxQlszM20nLCAnXFx4MUJbMzltJ11cbiAgICAnd2hpdGVCRycgICA6IFsnXFx4MUJbNDdtJywgJ1xceDFCWzQ5bSddXG4gICAgJ2dyZXlCRycgICAgOiBbJ1xceDFCWzQ5OzU7OG0nLCAnXFx4MUJbNDltJ11cbiAgICAnYmxhY2tCRycgICA6IFsnXFx4MUJbNDBtJywgJ1xceDFCWzQ5bSddXG4gICAgJ2JsdWVCRycgICAgOiBbJ1xceDFCWzQ0bScsICdcXHgxQls0OW0nXVxuICAgICdjeWFuQkcnICAgIDogWydcXHgxQls0Nm0nLCAnXFx4MUJbNDltJ11cbiAgICAnZ3JlZW5CRycgICA6IFsnXFx4MUJbNDJtJywgJ1xceDFCWzQ5bSddXG4gICAgJ21hZ2VudGFCRycgOiBbJ1xceDFCWzQ1bScsICdcXHgxQls0OW0nXVxuICAgICdyZWRCRycgICAgIDogWydcXHgxQls0MW0nLCAnXFx4MUJbNDltJ11cbiAgICAneWVsbG93QkcnICA6IFsnXFx4MUJbNDNtJywgJ1xceDFCWzQ5bSddXG4gICdicm93c2VyJzpcbiAgICAnYm9sZCcgICAgICA6IFsnPGI+JywgICc8L2I+J11cbiAgICAnaXRhbGljJyAgICA6IFsnPGk+JywgICc8L2k+J11cbiAgICAndW5kZXJsaW5lJyA6IFsnPHU+JywgICc8L3U+J11cbiAgICAnaW52ZXJzZScgICA6IFsnPHNwYW4gc3R5bGU9XCJiYWNrZ3JvdW5kLWNvbG9yOmJsYWNrO2NvbG9yOndoaXRlO1wiPicsICAnPC9zcGFuPiddXG4gICAgJ3N0cmlrZXRocm91Z2gnIDogWyc8ZGVsPicsICAnPC9kZWw+J11cbiAgICAnd2hpdGUnICAgICA6IFsnPHNwYW4gc3R5bGU9XCJjb2xvcjp3aGl0ZTtcIj4nLCAgICc8L3NwYW4+J11cbiAgICAnZ3JleScgICAgICA6IFsnPHNwYW4gc3R5bGU9XCJjb2xvcjpncmF5O1wiPicsICAgICc8L3NwYW4+J11cbiAgICAnYmxhY2snICAgICA6IFsnPHNwYW4gc3R5bGU9XCJjb2xvcjpibGFjaztcIj4nLCAgICc8L3NwYW4+J11cbiAgICAnYmx1ZScgICAgICA6IFsnPHNwYW4gc3R5bGU9XCJjb2xvcjpibHVlO1wiPicsICAgICc8L3NwYW4+J11cbiAgICAnY3lhbicgICAgICA6IFsnPHNwYW4gc3R5bGU9XCJjb2xvcjpjeWFuO1wiPicsICAgICc8L3NwYW4+J11cbiAgICAnZ3JlZW4nICAgICA6IFsnPHNwYW4gc3R5bGU9XCJjb2xvcjpncmVlbjtcIj4nLCAgICc8L3NwYW4+J11cbiAgICAnbWFnZW50YScgICA6IFsnPHNwYW4gc3R5bGU9XCJjb2xvcjptYWdlbnRhO1wiPicsICc8L3NwYW4+J11cbiAgICAncmVkJyAgICAgICA6IFsnPHNwYW4gc3R5bGU9XCJjb2xvcjpyZWQ7XCI+JywgICAgICc8L3NwYW4+J11cbiAgICAneWVsbG93JyAgICA6IFsnPHNwYW4gc3R5bGU9XCJjb2xvcjp5ZWxsb3c7XCI+JywgICc8L3NwYW4+J11cbiAgICAnd2hpdGVCRycgICA6IFsnPHNwYW4gc3R5bGU9XCJiYWNrZ3JvdW5kLWNvbG9yOndoaXRlO1wiPicsICAgJzwvc3Bhbj4nXVxuICAgICdncmV5QkcnICAgIDogWyc8c3BhbiBzdHlsZT1cImJhY2tncm91bmQtY29sb3I6Z3JheTtcIj4nLCAgICAnPC9zcGFuPiddXG4gICAgJ2JsYWNrQkcnICAgOiBbJzxzcGFuIHN0eWxlPVwiYmFja2dyb3VuZC1jb2xvcjpibGFjaztcIj4nLCAgICc8L3NwYW4+J11cbiAgICAnYmx1ZUJHJyAgICA6IFsnPHNwYW4gc3R5bGU9XCJiYWNrZ3JvdW5kLWNvbG9yOmJsdWU7XCI+JywgICAgJzwvc3Bhbj4nXVxuICAgICdjeWFuQkcnICAgIDogWyc8c3BhbiBzdHlsZT1cImJhY2tncm91bmQtY29sb3I6Y3lhbjtcIj4nLCAgICAnPC9zcGFuPiddXG4gICAgJ2dyZWVuQkcnICAgOiBbJzxzcGFuIHN0eWxlPVwiYmFja2dyb3VuZC1jb2xvcjpncmVlbjtcIj4nLCAgICc8L3NwYW4+J11cbiAgICAnbWFnZW50YUJHJyA6IFsnPHNwYW4gc3R5bGU9XCJiYWNrZ3JvdW5kLWNvbG9yOm1hZ2VudGE7XCI+JywgJzwvc3Bhbj4nXVxuICAgICdyZWRCRycgICAgIDogWyc8c3BhbiBzdHlsZT1cImJhY2tncm91bmQtY29sb3I6cmVkO1wiPicsICAgICAnPC9zcGFuPiddXG4gICAgJ3llbGxvd0JHJyAgOiBbJzxzcGFuIHN0eWxlPVwiYmFja2dyb3VuZC1jb2xvcjp5ZWxsb3c7XCI+JywgICc8L3NwYW4+J11cbmNvbG9ycy5zdHlsZXMgPSBPYmplY3Qua2V5cyBzdHlsZXMuY29uc29sZVxuXG5zdHlsaXplID0gKHN0eWxlLCBzdHIpIC0+XG4gIGlmIG1vZGUgbm90IGluIFsnYnJvd3NlcicsICdjb25zb2xlJ11cbiAgICByZXR1cm4gXCIje3N0cn1cIlxuXG4gIHJldHVybiBzdHlsZXNbbW9kZV1bc3R5bGVdWzBdICsgc3RyICsgc3R5bGVzW21vZGVdW3N0eWxlXVsxXVxuXG4jIHNpbXBsZSBmdW5jdGlvbnMgZm9yIHN0eWxpbmdcbmZvciBzdHlsZSBvZiBzdHlsZXMuY29uc29sZVxuICBjb2xvcnNbc3R5bGVdID0gc3R5bGl6ZS5iaW5kIEAsIHN0eWxlXG4iLCJ0YWJsZXMgPSByZXF1aXJlICcuL3RhYmxlcy5jb2ZmZWUnXG5jaGFydHMgPSByZXF1aXJlICcuL2NoYXJ0cy5jb2ZmZWUnXG5jb2xvcnMgPSByZXF1aXJlICcuL2NvbG9ycy5jb2ZmZWUnXG5cbmZvcm1hdHRpbmcgPSB7fVxubW9kdWxlLmV4cG9ydHMgPSBmb3JtYXR0aW5nXG5pZiB0eXBlb2Ygd2luZG93ICE9ICd1bmRlZmluZWQnXG4gIG1vZGUgPSAnYnJvd3NlcidcbmVsc2VcbiAgbW9kZSA9ICdjb25zb2xlJ1xuXG5mb3Igc3R5bGUgaW4gY29sb3JzLnN0eWxlc1xuICAgIGZvcm1hdHRpbmdbc3R5bGVdID0gY29sb3JzW3N0eWxlXVxuXG5mb3JtYXR0aW5nLnRhYmxlID0gdGFibGVzXG5mb3JtYXR0aW5nLmNoYXJ0ID0gY2hhcnRzXG5mb3JtYXR0aW5nLm5ld2xpbmUgPSBmb3JtYXR0aW5nLm4gPSAtPlxuICBpZiBtb2RlID09ICdjb25zb2xlJ1xuICAgIHJldHVybiAnXFxuJ1xuICBlbHNlIGlmIG1vZGUgPT0gJ2Jyb3dzZXInXG4gICAgcmV0dXJuICc8YnI+J1xuICBlbHNlXG4gICAgcmV0dXJuICcnXG5cbmZvcm1hdHRpbmcubGluayA9IGZvcm1hdHRpbmcuaHJlZiA9IGZvcm1hdHRpbmcuYSA9IChjb21tYW5kLCB0ZXh0KSAtPlxuICBpZiBub3QgdGV4dCBhbmQgY29tbWFuZC5sZW5ndGggPT0gMVxuICAgIHRleHQgPSBjb21tYW5kWzBdXG4gIGlmIG1vZGUgPT0gJ2NvbnNvbGUnXG4gICAgaWYgY29tbWFuZC5sZW5ndGggPT0gMCBvciBjb21tYW5kLmxlbmd0aCA9PSAxIGFuZCBjb21tYW5kWzBdID09IHRleHRcbiAgICAgIHJldHVybiBjb2xvcnMudW5kZXJsaW5lIHRleHRcbiAgICBlbHNlXG4gICAgICByZXR1cm4gXCIje3RleHR9IFsje2NvbG9ycy51bmRlcmxpbmUgY29tbWFuZC5qb2luICcgJ31dXCJcbiAgZWxzZSBpZiBtb2RlID09ICdicm93c2VyJ1xuICAgIHJldHVybiBcIjxhIGhyZWY9JyMhLyN7Y29tbWFuZC5qb2luICcvJ30nPiN7dGV4dH08L2E+XCJcbiAgZWxzZVxuICAgIHJldHVybiAnJ1xuXG5mb3JtYXR0aW5nLnRpdGxlID0gZm9ybWF0dGluZy5oMSA9ICh0ZXh0KSAtPiBjb2xvcnMueWVsbG93QkcgJyAgJyArIGNvbG9ycy5yZWRCRyBjb2xvcnMuYm9sZCBcIiAgI3t0ZXh0fSAgXCIgKyBjb2xvcnMueWVsbG93QkcgJyAgJ1xuZm9ybWF0dGluZy5zdWJ0aXRsZSA9IGZvcm1hdHRpbmcuaDIgPSAodGV4dCkgLT4gY29sb3JzLmJvbGQgY29sb3JzLmN5YW5CRyBjb2xvcnMueWVsbG93IFwiICAje3RleHR9ICBcIlxuZm9ybWF0dGluZy5zdWJzdWJ0aXRsZSA9IGZvcm1hdHRpbmcuaDMgPSAodGV4dCkgLT4gY29sb3JzLmludmVyc2UgXCIgI3t0ZXh0fSBcIlxuZm9ybWF0dGluZy5pdGFsaWMgPSBmb3JtYXR0aW5nLmkgPSBjb2xvcnMuaXRhbGljXG5mb3JtYXR0aW5nLmJvbGQgPSBmb3JtYXR0aW5nLmIgPSBjb2xvcnMuYm9sZFxuIiwibW9kdWxlLmV4cG9ydHMgPSAobGluZSkgLT5cbiAgY21kID0gJydcbiAgYXJncyA9IFtdXG4gICMgUGFyc2Ugb3V0IGNvbW1hbmQsIGFyZ3MsIGFuZCB0cmltIG9mZiB3aGl0ZXNwYWNlLlxuICBpZiBsaW5lIGFuZCBsaW5lLnRyaW0oKVxuICAgIHByb3ZBcmdzID0gbGluZS5zcGxpdChcIiBcIilcbiAgICBcbiAgICAjIFBhcnNlIHF1b3RlcyBbJ1wiXVxuICAgIHJlYWxBcmdzID0gW11cbiAgICBhcmcgPSBcIlwiXG4gICAgcHJvdkFyZ3Muam9pbihcIiBcIikuc3BsaXQoXCJcIikuZm9yRWFjaCAobGV0dGVyKSAtPlxuICAgICAgaWYgbGV0dGVyIGlzIFwiIFwiXG4gICAgICAgIGlmIGFyZy5sZW5ndGhcbiAgICAgICAgICBpZiBhcmdbMF0gaXNudCBcIlxcXCJcIiBhbmQgYXJnWzBdIGlzbnQgXCInXCJcbiAgICAgICAgICAgIHJlYWxBcmdzLnB1c2ggYXJnXG4gICAgICAgICAgICBhcmcgPSBcIlwiXG4gICAgICAgICAgZWxzZVxuICAgICAgICAgICAgYXJnICs9IGxldHRlclxuICAgICAgZWxzZSBpZiBsZXR0ZXIgaXMgXCJcXFwiXCIgb3IgbGV0dGVyIGlzIFwiJ1wiXG4gICAgICAgIGlmIGFyZy5sZW5ndGggYW5kIGFyZ1swXSBpcyBsZXR0ZXJcbiAgICAgICAgICByZWFsQXJncy5wdXNoIGFyZy5zbGljZSgxKVxuICAgICAgICAgIGFyZyA9IFwiXCJcbiAgICAgICAgZWxzZVxuICAgICAgICAgIGFyZyArPSBsZXR0ZXJcbiAgICAgIGVsc2VcbiAgICAgICAgYXJnICs9IGxldHRlclxuICAgICAgcmV0dXJuXG5cbiAgICByZWFsQXJncy5wdXNoIGFyZy50cmltKCkgIyBhZGQgd2hhdCBpcyBhdCB0aGUgZW5kXG4gICAgXG4gICAgIyBGaWx0ZXIgZW1wdHlcbiAgICBhcmdzID0gcmVhbEFyZ3NcbiAgICBhcmdzID0gYXJncy5maWx0ZXIgKHZhbCwgaSkgLT5cbiAgICAgIHZhbFxuXG4gICAgY21kID0gYXJnc1swXSAjIEdldCBjbWQuXG4gICAgYXJncyA9IGFyZ3Muc3BsaWNlKDEpICMgUmVtb3ZlIGNtZCBmcm9tIGFyZyBsaXN0LlxuXG4gIHJldHVybiB7XG4gICAgY21kOiBjbWQudHJpbSgpXG4gICAgYXJnczogYXJnc1xuICAgIGxpbmU6IGxpbmVcbiAgfVxuIiwiIyBtb2R1bGUgJ3RhYmxlcydcblxubW9kdWxlLmV4cG9ydHMgPSAoaGVhZGVyLCByb3dzLCBvcHRzPXt9KSAtPlxuICAjIGhlYWRlcjogW10gb3IgbnVsbFxuICAjIHJvd3M6IFtbXV1cblxuICBjb2xvcnMgPSByZXF1aXJlICcuL2NvbG9ycy5jb2ZmZWUnXG4gIGZvcm1hdHRpbmcgPSByZXF1aXJlICcuL2Zvcm1hdHRpbmcuY29mZmVlJ1xuICBTdHJpbmcucHJvdG90eXBlLmxlbiA9IC0+XG4gICAgQC5zcGxpdCgpWzBdLnJlcGxhY2UoLzwoW14+XSopPi9nLCAnJylcbiAgICAgICAgICAgICAgICAucmVwbGFjZSgvXFxbW15tXSttL2csICcnKS5sZW5ndGhcblxuICBpZiBoZWFkZXIgYW5kIGhlYWRlci5sZW5ndGhcbiAgICByb3dzLnVuc2hpZnQgaGVhZGVyICMgZXZlcnl0aGluZyBpcyBhIG5vcm1hbCByb3dcbiAgICBoZWFkZXIgPSB0cnVlXG5cbiAgIyBub3JtYWxpemUgb3B0c1xuICBkZWZhdWx0T3B0cyA9XG4gICAga2luZDogJ2hvcml6b250YWwnXG4gICAgYm9yZGVyQ29sb3I6ICdtYWdlbnRhJ1xuICAgIGhlYWRlckNvbG9yOiAnYm9sZCdcbiAgICB0ZXh0Q29sb3I6ICd5ZWxsb3cnXG4gICAgbnVtYmVyQ29sb3I6ICdjeWFuJ1xuICBzdHlsZXMgPSB7fVxuICBmb3Igb3B0IG9mIGRlZmF1bHRPcHRzXG4gICAgaWYgb3B0IG5vdCBpbiBvcHRzXG4gICAgICBvcHRzW29wdF0gPSBkZWZhdWx0T3B0c1tvcHRdXG4gICAgc3R5bGVzW29wdF0gPSBjb2xvcnNbb3B0c1tvcHRdXVxuICB7Ym9yZGVyQ29sb3IsIGhlYWRlckNvbG9yLCB0ZXh0Q29sb3IsIG51bWJlckNvbG9yfSA9IHN0eWxlc1xuXG4gICMgZ2V0IG51bWJlciBvZiBjb2xzXG4gIG5jb2xzID0gMFxuICBmb3Igcm93IGluIHJvd3NcbiAgICBuY29scyA9IHJvdy5sZW5ndGggaWYgcm93Lmxlbmd0aCA+IG5jb2xzXG5cbiAgY29scyA9IFswLi4obmNvbHMtMSldXG5cbiAgIyBrZWVwIGEgcGFyYWxsZWwgYXJyYXkgd2l0aCB0aGUgY29udGVudHMgc3R5bGVkXG4gIHN0eWxlZFJvd3MgPSBbXVxuICBmb3Igcm93IGluIHJvd3NcbiAgICBzdHlsZWRSb3dzLnB1c2ggKCcnIGZvciBjb2wgaW4gcm93KVxuXG4gICMga2VlcCBhIHBhcmFsbGVsIGFycmF5IHdpdGggdGhlIGNvbnRlbnRzIG5vbi1zdHJpbmdpZmllZFxuICByYXdSb3dzID0gW11cbiAgZm9yIHJvdyBpbiByb3dzXG4gICAgcmF3Um93cy5wdXNoIChjb2wgZm9yIGNvbCBpbiByb3cpXG5cbiAgbGFyZ2VzdCA9IHt9XG4gIGZvciBjb2wgaW4gY29sc1xuICAgIGZvciByb3csIGkgaW4gcm93c1xuICAgICAgIyBzdHlsZSBjb250ZW50IGFjY29yZGluZyB0byBpdHMgdHlwZVxuICAgICAgc3R5bGVkUm93ID0gc3R5bGVkUm93c1tpXVxuICAgICAgaWYgdHlwZW9mIHJvd1tjb2xdID09ICdudW1iZXInIG9yIC9cXGQrLFxcZCsvLmV4ZWMgcm93W2NvbF1cbiAgICAgICAgc3R5bGVkQ29udGVudCA9IG51bWJlckNvbG9yIHJvd1tjb2xdXG4gICAgICBlbHNlIGlmIHR5cGVvZiByb3dbY29sXSA9PSAnc3RyaW5nJ1xuICAgICAgICBzdHlsZWRDb250ZW50ID0gdGV4dENvbG9yIHJvd1tjb2xdXG4gICAgICBzdHlsZWRSb3dbY29sXSA9IHN0eWxlZENvbnRlbnRcblxuICAgICAgIyBzdHJpbmdpZnkgZXZlcnl0aGluZ1xuICAgICAgcm93W2NvbF0gPSBcIiN7cm93W2NvbF19XCIgaWYgcm93W2NvbF1cblxuICAgICMgZ2V0IGxhcmdlc3QgY29udGVudCBpbiBlYWNoIGNvbHVtblxuICAgIGxhcmdlc3RbY29sXSA9IDBcbiAgICBmb3Igcm93IGluIHJvd3NcbiAgICAgIGxhcmdlc3RbY29sXSA9IHJvd1tjb2xdLmxlbigpIGlmIHJvd1tjb2xdIGFuZCByb3dbY29sXS5sZW4oKSA+IGxhcmdlc3RbY29sXVxuXG4gICMgaGVscGVyIGZ1bmN0aW9uc1xuICBidWlsZExpbmUgPSAoc3R5bGU9Ym9yZGVyQ29sb3IpIC0+XG4gICAgbGluZSA9ICcnXG4gICAgbGluZSArPSBib3JkZXJDb2xvciAnKydcbiAgICBmb3IgY29sIGluIGNvbHNcbiAgICAgIGxpbmUgKz0gc3R5bGUgJy0nICMgcGFkZGluZyBsZWZ0XG4gICAgICBmb3IgY2hhciBpbiBbMC4ubGFyZ2VzdFtjb2xdXVxuICAgICAgICBsaW5lICs9IHN0eWxlICctJ1xuICAgICAgbGluZSArPSBib3JkZXJDb2xvciAnKycgIyBwYWRkaW5nIHJpZ2h0XG4gICAgbGluZSArPSBmb3JtYXR0aW5nLm5ld2xpbmUoKVxuICAgIHJldHVybiBsaW5lXG5cbiAgYnVpbGRSb3cgPSAocm93LCBzdHlsZWRSb3csIHJhd1JvdywgZGVmYXVsdEFsaWduPSdhdXRvJykgLT5cbiAgICBsaW5lID0gJydcbiAgICBsaW5lICs9IGJvcmRlckNvbG9yICd8J1xuICAgIGZvciBjb2wgaW4gY29sc1xuICAgICAgbGluZSArPSAnICcgIyBwYWRkaW5nIGxlZnRcblxuICAgICAgIyBkZWZpbmUgYWxpZ25tZW50XG4gICAgICBpZiBkZWZhdWx0QWxpZ24gPT0gJ2F1dG8nXG4gICAgICAgIGlmIHR5cGVvZiByYXdSb3dbY29sXSA9PSAnbnVtYmVyJyBvciAvXFxkKyxcXGQrLy5leGVjIHJhd1Jvd1tjb2xdXG4gICAgICAgICAgYWxpZ24gPSAncmlnaHQnXG4gICAgICAgIGVsc2VcbiAgICAgICAgICBhbGlnbiA9ICdsZWZ0J1xuICAgICAgZWxzZVxuICAgICAgICBhbGlnbiA9IGRlZmF1bHRBbGlnblxuXG4gICAgICBzcGFjZXMgPSBsYXJnZXN0W2NvbF1cbiAgICAgIHNwYWNlcyAtPSByb3dbY29sXS5sZW4oKSBpZiByb3cubGVuZ3RoLTEgPj0gY29sXG4gICAgICBzcGFjZXNCZWZvcmUgPSBnZXRTcGFjZXNCZWZvcmUgc3BhY2VzLCBhbGlnblxuICAgICAgc3BhY2VzQWZ0ZXIgPSBzcGFjZXMgLSBzcGFjZXNCZWZvcmVcblxuICAgICAgIyBzcGFjZXMgYmVmb3JlIHRoZSBjb250ZW50XG4gICAgICB3aGlsZSBzcGFjZXNCZWZvcmUgPiAwXG4gICAgICAgIGxpbmUgKz0gJyAnXG4gICAgICAgIHNwYWNlc0JlZm9yZS0tXG5cbiAgICAgICMgdGhlIGNvbnRlbnQgaXRzZWxmXG4gICAgICBpZiB0eXBlb2Ygc3R5bGVkUm93ID09ICdmdW5jdGlvbidcbiAgICAgICAgc3R5bGl6ZSA9IHN0eWxlZFJvd1xuICAgICAgICBzdHlsZWRDb250ZW50ID0gc3R5bGl6ZSByb3dbY29sXVxuICAgICAgZWxzZVxuICAgICAgICBzdHlsZWRDb250ZW50ID0gc3R5bGVkUm93W2NvbF1cbiAgICAgIGxpbmUgKz0gc3R5bGVkQ29udGVudFxuXG4gICAgICAjIHNwYWNlcyBhZnRlciB0aGUgY29udGVudFxuICAgICAgd2hpbGUgc3BhY2VzQWZ0ZXIgPiAwXG4gICAgICAgIGxpbmUgKz0gJyAnXG4gICAgICAgIHNwYWNlc0FmdGVyLS1cbiAgICAgICAgXG4gICAgICBsaW5lICs9IGJvcmRlckNvbG9yICcgfCcgIyBwYWRkaW5nIHJpZ2h0XG4gICAgbGluZSArPSBmb3JtYXR0aW5nLm5ld2xpbmUoKVxuICAgIHJldHVybiBsaW5lXG5cbiAgZ2V0U3BhY2VzQmVmb3JlID0gKHNwYWNlc0xlZnQsIGFsaWduKSAtPlxuICAgIGlmIGFsaWduID09ICdsZWZ0J1xuICAgICAgcmV0dXJuIDBcbiAgICBlbHNlIGlmIGFsaWduID09ICdyaWdodCdcbiAgICAgIHJldHVybiBzcGFjZXNMZWZ0XG4gICAgZWxzZSBpZiBhbGlnbiA9PSAnY2VudGVyJ1xuICAgICAgaWYgc3BhY2VzTGVmdCAlIDIgPT0gMCAjIGV2ZW5cbiAgICAgICAgcmV0dXJuIHNwYWNlc0xlZnQvMlxuICAgICAgZWxzZSAjIG9kZFxuICAgICAgICByZXR1cm4gKHNwYWNlc0xlZnQtMSkvMlxuXG4gICMgYnVpbGQgdGhlIHRhYmxlIGFzIGEgc3RyaW5nXG4gIG91dHB1dCA9ICcnXG5cbiAgIyB0b3AgbGluZVxuICBvdXRwdXQgKz0gYnVpbGRMaW5lKClcblxuICAjIGhlYWRlclxuICBpZiBoZWFkZXJcbiAgICBvdXRwdXQgKz0gYnVpbGRSb3cgcm93c1swXSwgaGVhZGVyQ29sb3IsIG51bGwsICdjZW50ZXInXG4gICAgb3V0cHV0ICs9IGJ1aWxkTGluZSBoZWFkZXJDb2xvclxuICAgIHJvd3MgPSByb3dzLnNsaWNlKDEpXG4gICAgc3R5bGVkUm93cyA9IHN0eWxlZFJvd3Muc2xpY2UoMSlcbiAgICByYXdSb3dzID0gcmF3Um93cy5zbGljZSgxKVxuXG4gICMgYm9keVxuICBmb3Igcm93LCBpIGluIHJvd3NcbiAgICBzdHlsZWRSb3cgPSBzdHlsZWRSb3dzW2ldXG4gICAgcmF3Um93ID0gcmF3Um93c1tpXVxuICAgIG91dHB1dCArPSBidWlsZFJvdyByb3csIHN0eWxlZFJvdywgcmF3Um93XG5cbiAgIyBjbG9zaW5nXG4gICAgb3V0cHV0ICs9IGJ1aWxkTGluZSgpXG5cbiAgcmV0dXJuIG91dHB1dFxuIl19
;