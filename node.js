;(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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



},{"./colors.coffee":2}],2:[function(require,module,exports){
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



},{}],3:[function(require,module,exports){
var process=require("__browserify_process");var parseArgs;

parseArgs = require('./parseArgs.coffee');

module.exports = function(containerID, options) {
  var defaults, mainLoop, prompt, term;
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
  this.subscribe = function(callback) {};
  this.processCommand = function(line) {
    var args, cmd, ref, response;
    ref = parseArgs(line), cmd = ref.cmd, args = ref.args, line = ref.line;
    if (cmd) {
      if (options.execute) {
        response = options.execute(cmd, args, term);
      }
      if (!response) {
        response = cmd + ": command not found";
      }
      return output(response);
    }
  };
  this.output = (function(_this) {
    return function(str) {
      var i, len, line;
      if (str && str.join) {
        for (i = 0, len = str.length; i < len; i++) {
          line = str[i];
          _this.output(line);
        }
      } else {
        console.log(str);
      }
      return null;
    };
  })(this);
  this.format = this.f = require('./formatting.coffee');
  prompt = function(callback) {
    var stdin, stdout;
    stdin = process.stdin;
    stdout = process.stdout;
    stdin.resume();
    stdout.write('> ');
    return stdin.once('data', (function(_this) {
      return function(data) {
        var line;
        line = data.toString();
        _this.processCommand(line);
        return callback();
      };
    })(this));
  };
  mainLoop = function() {
    return prompt(function() {
      return mainLoop();
    });
  };
  mainLoop();
  term = this;
  return term;
};



},{"./formatting.coffee":4,"./parseArgs.coffee":5,"__browserify_process":7}],4:[function(require,module,exports){
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



},{"./charts.coffee":1,"./colors.coffee":2,"./tables.coffee":6}],5:[function(require,module,exports){
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



},{"./colors.coffee":2,"./formatting.coffee":4}],7:[function(require,module,exports){
// shim for using process in browser

var process = module.exports = {};

process.nextTick = (function () {
    var canSetImmediate = typeof window !== 'undefined'
    && window.setImmediate;
    var canPost = typeof window !== 'undefined'
    && window.postMessage && window.addEventListener
    ;

    if (canSetImmediate) {
        return function (f) { return window.setImmediate(f) };
    }

    if (canPost) {
        var queue = [];
        window.addEventListener('message', function (ev) {
            var source = ev.source;
            if ((source === window || source === null) && ev.data === 'process-tick') {
                ev.stopPropagation();
                if (queue.length > 0) {
                    var fn = queue.shift();
                    fn();
                }
            }
        }, true);

        return function nextTick(fn) {
            queue.push(fn);
            window.postMessage('process-tick', '*');
        };
    }

    return function nextTick(fn) {
        setTimeout(fn, 0);
    };
})();

process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];

process.binding = function (name) {
    throw new Error('process.binding is not supported');
}

// TODO(shtylman)
process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};

},{}]},{},[3])
//@ sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2ZpYXRqYWYvY29tcC90ZXJtaW5hbC9saWIvY2hhcnRzLmNvZmZlZSIsIi9ob21lL2ZpYXRqYWYvY29tcC90ZXJtaW5hbC9saWIvY29sb3JzLmNvZmZlZSIsIi9ob21lL2ZpYXRqYWYvY29tcC90ZXJtaW5hbC9saWIvY29uc29sZS5jb2ZmZWUiLCIvaG9tZS9maWF0amFmL2NvbXAvdGVybWluYWwvbGliL2Zvcm1hdHRpbmcuY29mZmVlIiwiL2hvbWUvZmlhdGphZi9jb21wL3Rlcm1pbmFsL2xpYi9wYXJzZUFyZ3MuY29mZmVlIiwiL2hvbWUvZmlhdGphZi9jb21wL3Rlcm1pbmFsL2xpYi90YWJsZXMuY29mZmVlIiwiL2hvbWUvZmlhdGphZi9jb21wL3Rlcm1pbmFsL25vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9pbnNlcnQtbW9kdWxlLWdsb2JhbHMvbm9kZV9tb2R1bGVzL3Byb2Nlc3MvYnJvd3Nlci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBRUEsSUFBQSxtREFBQTs7QUFBQSxNQUFtRCxPQUFBLENBQVEsaUJBQVIsQ0FBbkQsRUFBQyxXQUFBLElBQUQsRUFBTyxZQUFBLEtBQVAsRUFBYyxhQUFBLE1BQWQsRUFBc0IsY0FBQSxPQUF0QixFQUErQixVQUFBLEdBQS9CLEVBQW9DLFdBQUEsSUFBcEMsRUFBMEMsWUFBQSxLQUExQyxDQUFBOztBQUFBLE1BRU0sQ0FBQyxPQUFQLEdBQWlCLFNBQUMsSUFBRCxHQUFBO0FBQ2YsTUFBQSxpTUFBQTtBQUFBLEVBQUEsV0FBQSxHQUNFO0FBQUEsSUFBQSxZQUFBLEVBQWMsSUFBZDtBQUFBLElBQ0EsS0FBQSxFQUFPLElBRFA7QUFBQSxJQUVBLFlBQUEsRUFBYyxPQUZkO0FBQUEsSUFHQSxPQUFBLEVBQVMsT0FIVDtBQUFBLElBSUEsTUFBQSxFQUFRLE1BSlI7R0FERixDQUFBO0FBTUEsT0FBQSxrQkFBQSxHQUFBO0FBQ0UsSUFBQSxJQUFLLENBQUEsR0FBQSxDQUFMLEdB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O0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIiMgbW9kdWxlICdjaGFydHMnXG5cbntib2xkLCB3aGl0ZSwgeWVsbG93LCBtYWdlbnRhLCByZWQsIGN5YW4sIGdyZWVufSA9IHJlcXVpcmUgJy4vY29sb3JzLmNvZmZlZSdcblxubW9kdWxlLmV4cG9ydHMgPSAob3B0cykgLT5cbiAgZGVmYXVsdE9wdHMgPVxuICAgIF9zaG93X2xlZ2VuZDogdHJ1ZVxuICAgIF9maWxsOiB0cnVlXG4gICAgX2ludGVycG9sYXRlOiAnY3ViaWMnXG4gICAgX2hlaWdodDogJzMwMHB4J1xuICAgIF9zdHlsZTogJ2RhcmsnXG4gIGZvciBvcHQgb2YgZGVmYXVsdE9wdHNcbiAgICBvcHRzW29wdF0gPSBvcHRzW29wdF0gb3IgZGVmYXVsdE9wdHNbb3B0XVxuXG4gIGlmIHR5cGVvZiB3aW5kb3cgIT0gJ3VuZGVmaW5lZCdcbiAgICBtb2RlID0gJ2Jyb3dzZXInXG4gICAgdXJsID0gXCIvL2NoYXJ0c3ByZWUuaW8vYmFyLnN2Zz9cIlxuICAgIHVybCArPSBcIiN7bmFtZX09I3t2YWx1ZXMuam9pbiAnLCd9JlwiIGZvciBuYW1lLCB2YWx1ZXMgb2Ygb3B0c1xuICAgIHJldHVybiBcIjxvYmplY3QgZGF0YT0nI3t1cmx9JyB0eXBlPSdpbWFnZS9zdmcreG1sJz5cIlxuXG4gIGVsc2VcbiAgICBtb2RlID0gJ2NvbnNvbGUnXG4gICAgdGljayA9ICfilocnXG4gICAgc2VyaWVzID0ge31cblxuICAgICMgaWRlbnRpZnkgc2VyaWVzXG4gICAgZm9yIG5hbWUsIHZhbHMgb2Ygb3B0cyB3aGVuIG5hbWVbMF0gIT0gJ18nXG4gICAgICBzZXJpZXNbbmFtZV0gPSB2YWxzXG5cbiAgICAjIGlkZW50aWZ5IG1heGltdW0gbGFiZWwgd29yZCBsZW5ndGhcbiAgICBtYXhsYWJlbCA9IDBcbiAgICBpZiAnX2xhYmVscycgb2Ygb3B0c1xuICAgICAgbWF4bGFiZWwgPSBsYWJlbC5sZW5ndGggZm9yIGxhYmVsIGluIG9wdHMuX2xhYmVscyB3aGVuIGxhYmVsLmxlbmd0aCA+IG1heGxhYmVsXG5cbiAgICAjIGEgc2NhbGUgZnVuY3Rpb24gZm9yIHZhbHVlIG5vcm1hbGl6YXRpb25cbiAgICBzY2FsZSA9ICggLT5cbiAgICAgIGFic01heCA9IG9wdHMuX2Fic29sdXRlX21heCBvciA3MFxuICAgICAgaWYgbWF4bGFiZWxcbiAgICAgICAgYWJzTWF4IC09IChtYXhsYWJlbCArIDIpXG4gICAgICByZWxNYXggPSAwXG4gICAgICBmb3IgbCwgdmFscyBvZiBzZXJpZXNcbiAgICAgICAgcmVsTWF4ID0gdmFsIGZvciB2YWwgaW4gdmFscyB3aGVuIHZhbCA+IHJlbE1heFxuICAgICAgcmV0dXJuICh2YWwpIC0+IHBhcnNlSW50KCAodmFsL3JlbE1heCkgKiBhYnNNYXggKVxuICAgICkoKVxuXG4gICAgIyBjb2xvcnMgZm9yIHNlcmllc1xuICAgIGNvbG9ycyA9IFt3aGl0ZSwgeWVsbG93LCBtYWdlbnRhLCByZWQsIGN5YW4sIGdyZWVuXVxuXG4gICAgIyBnZW5lcmF0ZSBjaGFydFxuICAgIG91dHB1dCA9ICdcXG4nXG4gICAgc2VyaWVuID0gMFxuICAgIGZvciBuYW1lLCB2YWx1ZXMgb2Ygc2VyaWVzXG4gICAgICBjb2xvciA9IGNvbG9yc1tzZXJpZW4gJSBjb2xvcnMubGVuZ3RoXVxuICAgICAgb3V0cHV0ICs9IGJvbGQgbmFtZSArICcgJ1xuICAgICAgb3V0cHV0ICs9ICdcXG4nXG4gICAgICBpID0gMFxuICAgICAgZm9yIHZhbCBpbiB2YWx1ZXNcbiAgICAgICAgbm9ybWFsaXplZCA9IHNjYWxlIHZhbCAjIG5vcm1hbGl6ZVxuICAgICAgICBpZiBtYXhsYWJlbFxuICAgICAgICAgIG91dHB1dCArPSBvcHRzLl9sYWJlbHNbaV1cbiAgICAgICAgICBpZiBvcHRzLl9sYWJlbHNbaV0ubGVuZ3RoXG4gICAgICAgICAgICBvdXRwdXQgKz0gJyAnIGZvciBzcGFjZSBpbiBbb3B0cy5fbGFiZWxzW2ldLmxlbmd0aC4ubWF4bGFiZWxdXG4gICAgICAgIG91dHB1dCArPSBjb2xvciB0aWNrIGZvciBuIGluIFswLi5ub3JtYWxpemVkXVxuICAgICAgICBvdXRwdXQgKz0gJyAnICsgdmFsIGlmIG9wdHMuX3Nob3dfbGVnZW5kXG4gICAgICAgIG91dHB1dCArPSAnXFxuJ1xuICAgICAgICBpICs9IDFcbiAgICAgIHNlcmllbiArPSAxXG4gICAgICBvdXRwdXQgKz0gJ1xcbidcbiAgICByZXR1cm4gb3V0cHV0XG4iLCIjIGNvbG9ycy5qc1xuIyBcbiMgQ29weXJpZ2h0IChjKSAyMDEwXG4jIFxuIyBNYXJhayBTcXVpcmVzXG4jIEFsZXhpcyBTZWxsaWVyIChjbG91ZGhlYWQpXG4jIFxuIyBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XG4jIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvIGRlYWxcbiMgaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0c1xuIyB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsXG4jIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpc1xuIyBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuIyBcbiMgVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWQgaW5cbiMgYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4jIFxuIyBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG4jIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuIyBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbiMgQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuIyBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxuIyBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXG4jIFRIRSBTT0ZUV0FSRS5cblxuY29sb3JzID0ge31cbm1vZHVsZS5leHBvcnRzID0gY29sb3JzXG5pZiB0eXBlb2Ygd2luZG93ICE9ICd1bmRlZmluZWQnXG4gIG1vZGUgPSAnYnJvd3NlcidcbmVsc2VcbiAgbW9kZSA9ICdjb25zb2xlJ1xuXG5zdHlsZXMgPVxuICAnY29uc29sZSc6XG4gICAgJ2JvbGQnICAgICAgOiBbJ1xceDFCWzFtJywgICdcXHgxQlsyMm0nXVxuICAgICdpdGFsaWMnICAgIDogWydcXHgxQlszbScsICAnXFx4MUJbMjNtJ11cbiAgICAndW5kZXJsaW5lJyA6IFsnXFx4MUJbNG0nLCAgJ1xceDFCWzI0bSddXG4gICAgJ2ludmVyc2UnICAgOiBbJ1xceDFCWzdtJywgICdcXHgxQlsyN20nXVxuICAgICdzdHJpa2V0aHJvdWdoJyA6IFsnXFx4MUJbOW0nLCAgJ1xceDFCWzI5bSddXG4gICAgJ3doaXRlJyAgICAgOiBbJ1xceDFCWzM3bScsICdcXHgxQlszOW0nXVxuICAgICdncmV5JyAgICAgIDogWydcXHgxQls5MG0nLCAnXFx4MUJbMzltJ11cbiAgICAnYmxhY2snICAgICA6IFsnXFx4MUJbMzBtJywgJ1xceDFCWzM5bSddXG4gICAgJ2JsdWUnICAgICAgOiBbJ1xceDFCWzM0bScsICdcXHgxQlszOW0nXVxuICAgICdjeWFuJyAgICAgIDogWydcXHgxQlszNm0nLCAnXFx4MUJbMzltJ11cbiAgICAnZ3JlZW4nICAgICA6IFsnXFx4MUJbMzJtJywgJ1xceDFCWzM5bSddXG4gICAgJ21hZ2VudGEnICAgOiBbJ1xceDFCWzM1bScsICdcXHgxQlszOW0nXVxuICAgICdyZWQnICAgICAgIDogWydcXHgxQlszMW0nLCAnXFx4MUJbMzltJ11cbiAgICAneWVsbG93JyAgICA6IFsnXFx4MUJbMzNtJywgJ1xceDFCWzM5bSddXG4gICAgJ3doaXRlQkcnICAgOiBbJ1xceDFCWzQ3bScsICdcXHgxQls0OW0nXVxuICAgICdncmV5QkcnICAgIDogWydcXHgxQls0OTs1OzhtJywgJ1xceDFCWzQ5bSddXG4gICAgJ2JsYWNrQkcnICAgOiBbJ1xceDFCWzQwbScsICdcXHgxQls0OW0nXVxuICAgICdibHVlQkcnICAgIDogWydcXHgxQls0NG0nLCAnXFx4MUJbNDltJ11cbiAgICAnY3lhbkJHJyAgICA6IFsnXFx4MUJbNDZtJywgJ1xceDFCWzQ5bSddXG4gICAgJ2dyZWVuQkcnICAgOiBbJ1xceDFCWzQybScsICdcXHgxQls0OW0nXVxuICAgICdtYWdlbnRhQkcnIDogWydcXHgxQls0NW0nLCAnXFx4MUJbNDltJ11cbiAgICAncmVkQkcnICAgICA6IFsnXFx4MUJbNDFtJywgJ1xceDFCWzQ5bSddXG4gICAgJ3llbGxvd0JHJyAgOiBbJ1xceDFCWzQzbScsICdcXHgxQls0OW0nXVxuICAnYnJvd3Nlcic6XG4gICAgJ2JvbGQnICAgICAgOiBbJzxiPicsICAnPC9iPiddXG4gICAgJ2l0YWxpYycgICAgOiBbJzxpPicsICAnPC9pPiddXG4gICAgJ3VuZGVybGluZScgOiBbJzx1PicsICAnPC91PiddXG4gICAgJ2ludmVyc2UnICAgOiBbJzxzcGFuIHN0eWxlPVwiYmFja2dyb3VuZC1jb2xvcjpibGFjaztjb2xvcjp3aGl0ZTtcIj4nLCAgJzwvc3Bhbj4nXVxuICAgICdzdHJpa2V0aHJvdWdoJyA6IFsnPGRlbD4nLCAgJzwvZGVsPiddXG4gICAgJ3doaXRlJyAgICAgOiBbJzxzcGFuIHN0eWxlPVwiY29sb3I6d2hpdGU7XCI+JywgICAnPC9zcGFuPiddXG4gICAgJ2dyZXknICAgICAgOiBbJzxzcGFuIHN0eWxlPVwiY29sb3I6Z3JheTtcIj4nLCAgICAnPC9zcGFuPiddXG4gICAgJ2JsYWNrJyAgICAgOiBbJzxzcGFuIHN0eWxlPVwiY29sb3I6YmxhY2s7XCI+JywgICAnPC9zcGFuPiddXG4gICAgJ2JsdWUnICAgICAgOiBbJzxzcGFuIHN0eWxlPVwiY29sb3I6Ymx1ZTtcIj4nLCAgICAnPC9zcGFuPiddXG4gICAgJ2N5YW4nICAgICAgOiBbJzxzcGFuIHN0eWxlPVwiY29sb3I6Y3lhbjtcIj4nLCAgICAnPC9zcGFuPiddXG4gICAgJ2dyZWVuJyAgICAgOiBbJzxzcGFuIHN0eWxlPVwiY29sb3I6Z3JlZW47XCI+JywgICAnPC9zcGFuPiddXG4gICAgJ21hZ2VudGEnICAgOiBbJzxzcGFuIHN0eWxlPVwiY29sb3I6bWFnZW50YTtcIj4nLCAnPC9zcGFuPiddXG4gICAgJ3JlZCcgICAgICAgOiBbJzxzcGFuIHN0eWxlPVwiY29sb3I6cmVkO1wiPicsICAgICAnPC9zcGFuPiddXG4gICAgJ3llbGxvdycgICAgOiBbJzxzcGFuIHN0eWxlPVwiY29sb3I6eWVsbG93O1wiPicsICAnPC9zcGFuPiddXG4gICAgJ3doaXRlQkcnICAgOiBbJzxzcGFuIHN0eWxlPVwiYmFja2dyb3VuZC1jb2xvcjp3aGl0ZTtcIj4nLCAgICc8L3NwYW4+J11cbiAgICAnZ3JleUJHJyAgICA6IFsnPHNwYW4gc3R5bGU9XCJiYWNrZ3JvdW5kLWNvbG9yOmdyYXk7XCI+JywgICAgJzwvc3Bhbj4nXVxuICAgICdibGFja0JHJyAgIDogWyc8c3BhbiBzdHlsZT1cImJhY2tncm91bmQtY29sb3I6YmxhY2s7XCI+JywgICAnPC9zcGFuPiddXG4gICAgJ2JsdWVCRycgICAgOiBbJzxzcGFuIHN0eWxlPVwiYmFja2dyb3VuZC1jb2xvcjpibHVlO1wiPicsICAgICc8L3NwYW4+J11cbiAgICAnY3lhbkJHJyAgICA6IFsnPHNwYW4gc3R5bGU9XCJiYWNrZ3JvdW5kLWNvbG9yOmN5YW47XCI+JywgICAgJzwvc3Bhbj4nXVxuICAgICdncmVlbkJHJyAgIDogWyc8c3BhbiBzdHlsZT1cImJhY2tncm91bmQtY29sb3I6Z3JlZW47XCI+JywgICAnPC9zcGFuPiddXG4gICAgJ21hZ2VudGFCRycgOiBbJzxzcGFuIHN0eWxlPVwiYmFja2dyb3VuZC1jb2xvcjptYWdlbnRhO1wiPicsICc8L3NwYW4+J11cbiAgICAncmVkQkcnICAgICA6IFsnPHNwYW4gc3R5bGU9XCJiYWNrZ3JvdW5kLWNvbG9yOnJlZDtcIj4nLCAgICAgJzwvc3Bhbj4nXVxuICAgICd5ZWxsb3dCRycgIDogWyc8c3BhbiBzdHlsZT1cImJhY2tncm91bmQtY29sb3I6eWVsbG93O1wiPicsICAnPC9zcGFuPiddXG5jb2xvcnMuc3R5bGVzID0gT2JqZWN0LmtleXMgc3R5bGVzLmNvbnNvbGVcblxuc3R5bGl6ZSA9IChzdHlsZSwgc3RyKSAtPlxuICBpZiBtb2RlIG5vdCBpbiBbJ2Jyb3dzZXInLCAnY29uc29sZSddXG4gICAgcmV0dXJuIFwiI3tzdHJ9XCJcblxuICByZXR1cm4gc3R5bGVzW21vZGVdW3N0eWxlXVswXSArIHN0ciArIHN0eWxlc1ttb2RlXVtzdHlsZV1bMV1cblxuIyBzaW1wbGUgZnVuY3Rpb25zIGZvciBzdHlsaW5nXG5mb3Igc3R5bGUgb2Ygc3R5bGVzLmNvbnNvbGVcbiAgY29sb3JzW3N0eWxlXSA9IHN0eWxpemUuYmluZCBALCBzdHlsZVxuIiwicGFyc2VBcmdzID0gcmVxdWlyZSAnLi9wYXJzZUFyZ3MuY29mZmVlJ1xuXG5tb2R1bGUuZXhwb3J0cyA9IChjb250YWluZXJJRCwgb3B0aW9ucykgLT5cbiAgZGVmYXVsdHMgPVxuICAgIHdlbGNvbWU6IFwiXCJcbiAgICBwcm9tcHQ6IFwiXCJcbiAgICBzZXBhcmF0b3I6IFwiJmd0O1wiXG4gICAgdGhlbWU6IFwiaW50ZXJsYWNlZFwiXG5cbiAgb3B0aW9ucyA9IG9wdGlvbnMgb3IgZGVmYXVsdHNcbiAgb3B0aW9ucy53ZWxjb21lID0gb3B0aW9ucy53ZWxjb21lIG9yIGRlZmF1bHRzLndlbGNvbWVcbiAgb3B0aW9ucy5wcm9tcHQgPSBvcHRpb25zLnByb21wdCBvciBkZWZhdWx0cy5wcm9tcHRcbiAgb3B0aW9ucy5zZXBhcmF0b3IgPSBvcHRpb25zLnNlcGFyYXRvciBvciBkZWZhdWx0cy5zZXBhcmF0b3JcbiAgb3B0aW9ucy50aGVtZSA9IG9wdGlvbnMudGhlbWUgb3IgZGVmYXVsdHMudGhlbWVcblxuICBAc3Vic2NyaWJlID0gKGNhbGxiYWNrKSAtPlxuICAgIHJldHVyblxuXG4gIEBwcm9jZXNzQ29tbWFuZCA9IChsaW5lKSAtPlxuICAgIHtjbWQsIGFyZ3MsIGxpbmV9ID0gcGFyc2VBcmdzIGxpbmVcbiAgICBpZiBjbWRcbiAgICAgIHJlc3BvbnNlID0gb3B0aW9ucy5leGVjdXRlKGNtZCwgYXJncywgdGVybSkgaWYgb3B0aW9ucy5leGVjdXRlXG4gICAgICByZXNwb25zZSA9IGNtZCArIFwiOiBjb21tYW5kIG5vdCBmb3VuZFwiICBpZiBub3QgcmVzcG9uc2VcbiAgICAgIG91dHB1dCByZXNwb25zZVxuXG4gIEBvdXRwdXQgPSAoc3RyKSA9PlxuICAgIGlmIHN0ciBhbmQgc3RyLmpvaW5cbiAgICAgIEBvdXRwdXQgbGluZSBmb3IgbGluZSBpbiBzdHJcbiAgICBlbHNlXG4gICAgICBjb25zb2xlLmxvZyBzdHJcbiAgICByZXR1cm4gbnVsbFxuXG4gIEBmb3JtYXQgPSBAZiA9IHJlcXVpcmUgJy4vZm9ybWF0dGluZy5jb2ZmZWUnXG5cbiAgcHJvbXB0ID0gKGNhbGxiYWNrKSAtPlxuICAgIHN0ZGluID0gcHJvY2Vzcy5zdGRpblxuICAgIHN0ZG91dCA9IHByb2Nlc3Muc3Rkb3V0XG5cbiAgICBzdGRpbi5yZXN1bWUoKVxuICAgIHN0ZG91dC53cml0ZSAnPiAnXG4gIFxuICAgIHN0ZGluLm9uY2UgJ2RhdGEnLCAoZGF0YSkgPT5cbiAgICAgIGxpbmUgPSBkYXRhLnRvU3RyaW5nKClcbiAgICAgIEBwcm9jZXNzQ29tbWFuZCBsaW5lXG4gICAgICBjYWxsYmFjaygpXG5cbiAgbWFpbkxvb3AgPSAtPlxuICAgIHByb21wdCAtPlxuICAgICAgbWFpbkxvb3AoKVxuXG4gIG1haW5Mb29wKClcblxuICB0ZXJtID0gdGhpc1xuICByZXR1cm4gdGVybVxuIiwidGFibGVzID0gcmVxdWlyZSAnLi90YWJsZXMuY29mZmVlJ1xuY2hhcnRzID0gcmVxdWlyZSAnLi9jaGFydHMuY29mZmVlJ1xuY29sb3JzID0gcmVxdWlyZSAnLi9jb2xvcnMuY29mZmVlJ1xuXG5mb3JtYXR0aW5nID0ge31cbm1vZHVsZS5leHBvcnRzID0gZm9ybWF0dGluZ1xuaWYgdHlwZW9mIHdpbmRvdyAhPSAndW5kZWZpbmVkJ1xuICBtb2RlID0gJ2Jyb3dzZXInXG5lbHNlXG4gIG1vZGUgPSAnY29uc29sZSdcblxuZm9yIHN0eWxlIGluIGNvbG9ycy5zdHlsZXNcbiAgICBmb3JtYXR0aW5nW3N0eWxlXSA9IGNvbG9yc1tzdHlsZV1cblxuZm9ybWF0dGluZy50YWJsZSA9IHRhYmxlc1xuZm9ybWF0dGluZy5jaGFydCA9IGNoYXJ0c1xuZm9ybWF0dGluZy5uZXdsaW5lID0gZm9ybWF0dGluZy5uID0gLT5cbiAgaWYgbW9kZSA9PSAnY29uc29sZSdcbiAgICByZXR1cm4gJ1xcbidcbiAgZWxzZSBpZiBtb2RlID09ICdicm93c2VyJ1xuICAgIHJldHVybiAnPGJyPidcbiAgZWxzZVxuICAgIHJldHVybiAnJ1xuXG5mb3JtYXR0aW5nLmxpbmsgPSBmb3JtYXR0aW5nLmhyZWYgPSBmb3JtYXR0aW5nLmEgPSAoY29tbWFuZCwgdGV4dCkgLT5cbiAgaWYgbm90IHRleHQgYW5kIGNvbW1hbmQubGVuZ3RoID09IDFcbiAgICB0ZXh0ID0gY29tbWFuZFswXVxuICBpZiBtb2RlID09ICdjb25zb2xlJ1xuICAgIGlmIGNvbW1hbmQubGVuZ3RoID09IDAgb3IgY29tbWFuZC5sZW5ndGggPT0gMSBhbmQgY29tbWFuZFswXSA9PSB0ZXh0XG4gICAgICByZXR1cm4gY29sb3JzLnVuZGVybGluZSB0ZXh0XG4gICAgZWxzZVxuICAgICAgcmV0dXJuIFwiI3t0ZXh0fSBbI3tjb2xvcnMudW5kZXJsaW5lIGNvbW1hbmQuam9pbiAnICd9XVwiXG4gIGVsc2UgaWYgbW9kZSA9PSAnYnJvd3NlcidcbiAgICByZXR1cm4gXCI8YSBocmVmPScjIS8je2NvbW1hbmQuam9pbiAnLyd9Jz4je3RleHR9PC9hPlwiXG4gIGVsc2VcbiAgICByZXR1cm4gJydcblxuZm9ybWF0dGluZy50aXRsZSA9IGZvcm1hdHRpbmcuaDEgPSAodGV4dCkgLT4gY29sb3JzLnllbGxvd0JHICcgICcgKyBjb2xvcnMucmVkQkcgY29sb3JzLmJvbGQgXCIgICN7dGV4dH0gIFwiICsgY29sb3JzLnllbGxvd0JHICcgICdcbmZvcm1hdHRpbmcuc3VidGl0bGUgPSBmb3JtYXR0aW5nLmgyID0gKHRleHQpIC0+IGNvbG9ycy5ib2xkIGNvbG9ycy5jeWFuQkcgY29sb3JzLnllbGxvdyBcIiAgI3t0ZXh0fSAgXCJcbmZvcm1hdHRpbmcuc3Vic3VidGl0bGUgPSBmb3JtYXR0aW5nLmgzID0gKHRleHQpIC0+IGNvbG9ycy5pbnZlcnNlIFwiICN7dGV4dH0gXCJcbmZvcm1hdHRpbmcuaXRhbGljID0gZm9ybWF0dGluZy5pID0gY29sb3JzLml0YWxpY1xuZm9ybWF0dGluZy5ib2xkID0gZm9ybWF0dGluZy5iID0gY29sb3JzLmJvbGRcbiIsIm1vZHVsZS5leHBvcnRzID0gKGxpbmUpIC0+XG4gIGNtZCA9ICcnXG4gIGFyZ3MgPSBbXVxuICAjIFBhcnNlIG91dCBjb21tYW5kLCBhcmdzLCBhbmQgdHJpbSBvZmYgd2hpdGVzcGFjZS5cbiAgaWYgbGluZSBhbmQgbGluZS50cmltKClcbiAgICBwcm92QXJncyA9IGxpbmUuc3BsaXQoXCIgXCIpXG4gICAgXG4gICAgIyBQYXJzZSBxdW90ZXMgWydcIl1cbiAgICByZWFsQXJncyA9IFtdXG4gICAgYXJnID0gXCJcIlxuICAgIHByb3ZBcmdzLmpvaW4oXCIgXCIpLnNwbGl0KFwiXCIpLmZvckVhY2ggKGxldHRlcikgLT5cbiAgICAgIGlmIGxldHRlciBpcyBcIiBcIlxuICAgICAgICBpZiBhcmcubGVuZ3RoXG4gICAgICAgICAgaWYgYXJnWzBdIGlzbnQgXCJcXFwiXCIgYW5kIGFyZ1swXSBpc250IFwiJ1wiXG4gICAgICAgICAgICByZWFsQXJncy5wdXNoIGFyZ1xuICAgICAgICAgICAgYXJnID0gXCJcIlxuICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgIGFyZyArPSBsZXR0ZXJcbiAgICAgIGVsc2UgaWYgbGV0dGVyIGlzIFwiXFxcIlwiIG9yIGxldHRlciBpcyBcIidcIlxuICAgICAgICBpZiBhcmcubGVuZ3RoIGFuZCBhcmdbMF0gaXMgbGV0dGVyXG4gICAgICAgICAgcmVhbEFyZ3MucHVzaCBhcmcuc2xpY2UoMSlcbiAgICAgICAgICBhcmcgPSBcIlwiXG4gICAgICAgIGVsc2VcbiAgICAgICAgICBhcmcgKz0gbGV0dGVyXG4gICAgICBlbHNlXG4gICAgICAgIGFyZyArPSBsZXR0ZXJcbiAgICAgIHJldHVyblxuXG4gICAgcmVhbEFyZ3MucHVzaCBhcmcudHJpbSgpICMgYWRkIHdoYXQgaXMgYXQgdGhlIGVuZFxuICAgIFxuICAgICMgRmlsdGVyIGVtcHR5XG4gICAgYXJncyA9IHJlYWxBcmdzXG4gICAgYXJncyA9IGFyZ3MuZmlsdGVyICh2YWwsIGkpIC0+XG4gICAgICB2YWxcblxuICAgIGNtZCA9IGFyZ3NbMF0gIyBHZXQgY21kLlxuICAgIGFyZ3MgPSBhcmdzLnNwbGljZSgxKSAjIFJlbW92ZSBjbWQgZnJvbSBhcmcgbGlzdC5cblxuICByZXR1cm4ge1xuICAgIGNtZDogY21kLnRyaW0oKVxuICAgIGFyZ3M6IGFyZ3NcbiAgICBsaW5lOiBsaW5lXG4gIH1cbiIsIiMgbW9kdWxlICd0YWJsZXMnXG5cbm1vZHVsZS5leHBvcnRzID0gKGhlYWRlciwgcm93cywgb3B0cz17fSkgLT5cbiAgIyBoZWFkZXI6IFtdIG9yIG51bGxcbiAgIyByb3dzOiBbW11dXG5cbiAgY29sb3JzID0gcmVxdWlyZSAnLi9jb2xvcnMuY29mZmVlJ1xuICBmb3JtYXR0aW5nID0gcmVxdWlyZSAnLi9mb3JtYXR0aW5nLmNvZmZlZSdcbiAgU3RyaW5nLnByb3RvdHlwZS5sZW4gPSAtPlxuICAgIEAuc3BsaXQoKVswXS5yZXBsYWNlKC88KFtePl0qKT4vZywgJycpXG4gICAgICAgICAgICAgICAgLnJlcGxhY2UoL1xcW1tebV0rbS9nLCAnJykubGVuZ3RoXG5cbiAgaWYgaGVhZGVyIGFuZCBoZWFkZXIubGVuZ3RoXG4gICAgcm93cy51bnNoaWZ0IGhlYWRlciAjIGV2ZXJ5dGhpbmcgaXMgYSBub3JtYWwgcm93XG4gICAgaGVhZGVyID0gdHJ1ZVxuXG4gICMgbm9ybWFsaXplIG9wdHNcbiAgZGVmYXVsdE9wdHMgPVxuICAgIGtpbmQ6ICdob3Jpem9udGFsJ1xuICAgIGJvcmRlckNvbG9yOiAnbWFnZW50YSdcbiAgICBoZWFkZXJDb2xvcjogJ2JvbGQnXG4gICAgdGV4dENvbG9yOiAneWVsbG93J1xuICAgIG51bWJlckNvbG9yOiAnY3lhbidcbiAgc3R5bGVzID0ge31cbiAgZm9yIG9wdCBvZiBkZWZhdWx0T3B0c1xuICAgIGlmIG9wdCBub3QgaW4gb3B0c1xuICAgICAgb3B0c1tvcHRdID0gZGVmYXVsdE9wdHNbb3B0XVxuICAgIHN0eWxlc1tvcHRdID0gY29sb3JzW29wdHNbb3B0XV1cbiAge2JvcmRlckNvbG9yLCBoZWFkZXJDb2xvciwgdGV4dENvbG9yLCBudW1iZXJDb2xvcn0gPSBzdHlsZXNcblxuICAjIGdldCBudW1iZXIgb2YgY29sc1xuICBuY29scyA9IDBcbiAgZm9yIHJvdyBpbiByb3dzXG4gICAgbmNvbHMgPSByb3cubGVuZ3RoIGlmIHJvdy5sZW5ndGggPiBuY29sc1xuXG4gIGNvbHMgPSBbMC4uKG5jb2xzLTEpXVxuXG4gICMga2VlcCBhIHBhcmFsbGVsIGFycmF5IHdpdGggdGhlIGNvbnRlbnRzIHN0eWxlZFxuICBzdHlsZWRSb3dzID0gW11cbiAgZm9yIHJvdyBpbiByb3dzXG4gICAgc3R5bGVkUm93cy5wdXNoICgnJyBmb3IgY29sIGluIHJvdylcblxuICAjIGtlZXAgYSBwYXJhbGxlbCBhcnJheSB3aXRoIHRoZSBjb250ZW50cyBub24tc3RyaW5naWZpZWRcbiAgcmF3Um93cyA9IFtdXG4gIGZvciByb3cgaW4gcm93c1xuICAgIHJhd1Jvd3MucHVzaCAoY29sIGZvciBjb2wgaW4gcm93KVxuXG4gIGxhcmdlc3QgPSB7fVxuICBmb3IgY29sIGluIGNvbHNcbiAgICBmb3Igcm93LCBpIGluIHJvd3NcbiAgICAgICMgc3R5bGUgY29udGVudCBhY2NvcmRpbmcgdG8gaXRzIHR5cGVcbiAgICAgIHN0eWxlZFJvdyA9IHN0eWxlZFJvd3NbaV1cbiAgICAgIGlmIHR5cGVvZiByb3dbY29sXSA9PSAnbnVtYmVyJyBvciAvXFxkKyxcXGQrLy5leGVjIHJvd1tjb2xdXG4gICAgICAgIHN0eWxlZENvbnRlbnQgPSBudW1iZXJDb2xvciByb3dbY29sXVxuICAgICAgZWxzZSBpZiB0eXBlb2Ygcm93W2NvbF0gPT0gJ3N0cmluZydcbiAgICAgICAgc3R5bGVkQ29udGVudCA9IHRleHRDb2xvciByb3dbY29sXVxuICAgICAgc3R5bGVkUm93W2NvbF0gPSBzdHlsZWRDb250ZW50XG5cbiAgICAgICMgc3RyaW5naWZ5IGV2ZXJ5dGhpbmdcbiAgICAgIHJvd1tjb2xdID0gXCIje3Jvd1tjb2xdfVwiIGlmIHJvd1tjb2xdXG5cbiAgICAjIGdldCBsYXJnZXN0IGNvbnRlbnQgaW4gZWFjaCBjb2x1bW5cbiAgICBsYXJnZXN0W2NvbF0gPSAwXG4gICAgZm9yIHJvdyBpbiByb3dzXG4gICAgICBsYXJnZXN0W2NvbF0gPSByb3dbY29sXS5sZW4oKSBpZiByb3dbY29sXSBhbmQgcm93W2NvbF0ubGVuKCkgPiBsYXJnZXN0W2NvbF1cblxuICAjIGhlbHBlciBmdW5jdGlvbnNcbiAgYnVpbGRMaW5lID0gKHN0eWxlPWJvcmRlckNvbG9yKSAtPlxuICAgIGxpbmUgPSAnJ1xuICAgIGxpbmUgKz0gYm9yZGVyQ29sb3IgJysnXG4gICAgZm9yIGNvbCBpbiBjb2xzXG4gICAgICBsaW5lICs9IHN0eWxlICctJyAjIHBhZGRpbmcgbGVmdFxuICAgICAgZm9yIGNoYXIgaW4gWzAuLmxhcmdlc3RbY29sXV1cbiAgICAgICAgbGluZSArPSBzdHlsZSAnLSdcbiAgICAgIGxpbmUgKz0gYm9yZGVyQ29sb3IgJysnICMgcGFkZGluZyByaWdodFxuICAgIGxpbmUgKz0gZm9ybWF0dGluZy5uZXdsaW5lKClcbiAgICByZXR1cm4gbGluZVxuXG4gIGJ1aWxkUm93ID0gKHJvdywgc3R5bGVkUm93LCByYXdSb3csIGRlZmF1bHRBbGlnbj0nYXV0bycpIC0+XG4gICAgbGluZSA9ICcnXG4gICAgbGluZSArPSBib3JkZXJDb2xvciAnfCdcbiAgICBmb3IgY29sIGluIGNvbHNcbiAgICAgIGxpbmUgKz0gJyAnICMgcGFkZGluZyBsZWZ0XG5cbiAgICAgICMgZGVmaW5lIGFsaWdubWVudFxuICAgICAgaWYgZGVmYXVsdEFsaWduID09ICdhdXRvJ1xuICAgICAgICBpZiB0eXBlb2YgcmF3Um93W2NvbF0gPT0gJ251bWJlcicgb3IgL1xcZCssXFxkKy8uZXhlYyByYXdSb3dbY29sXVxuICAgICAgICAgIGFsaWduID0gJ3JpZ2h0J1xuICAgICAgICBlbHNlXG4gICAgICAgICAgYWxpZ24gPSAnbGVmdCdcbiAgICAgIGVsc2VcbiAgICAgICAgYWxpZ24gPSBkZWZhdWx0QWxpZ25cblxuICAgICAgc3BhY2VzID0gbGFyZ2VzdFtjb2xdXG4gICAgICBzcGFjZXMgLT0gcm93W2NvbF0ubGVuKCkgaWYgcm93Lmxlbmd0aC0xID49IGNvbFxuICAgICAgc3BhY2VzQmVmb3JlID0gZ2V0U3BhY2VzQmVmb3JlIHNwYWNlcywgYWxpZ25cbiAgICAgIHNwYWNlc0FmdGVyID0gc3BhY2VzIC0gc3BhY2VzQmVmb3JlXG5cbiAgICAgICMgc3BhY2VzIGJlZm9yZSB0aGUgY29udGVudFxuICAgICAgd2hpbGUgc3BhY2VzQmVmb3JlID4gMFxuICAgICAgICBsaW5lICs9ICcgJ1xuICAgICAgICBzcGFjZXNCZWZvcmUtLVxuXG4gICAgICAjIHRoZSBjb250ZW50IGl0c2VsZlxuICAgICAgaWYgdHlwZW9mIHN0eWxlZFJvdyA9PSAnZnVuY3Rpb24nXG4gICAgICAgIHN0eWxpemUgPSBzdHlsZWRSb3dcbiAgICAgICAgc3R5bGVkQ29udGVudCA9IHN0eWxpemUgcm93W2NvbF1cbiAgICAgIGVsc2VcbiAgICAgICAgc3R5bGVkQ29udGVudCA9IHN0eWxlZFJvd1tjb2xdXG4gICAgICBsaW5lICs9IHN0eWxlZENvbnRlbnRcblxuICAgICAgIyBzcGFjZXMgYWZ0ZXIgdGhlIGNvbnRlbnRcbiAgICAgIHdoaWxlIHNwYWNlc0FmdGVyID4gMFxuICAgICAgICBsaW5lICs9ICcgJ1xuICAgICAgICBzcGFjZXNBZnRlci0tXG4gICAgICAgIFxuICAgICAgbGluZSArPSBib3JkZXJDb2xvciAnIHwnICMgcGFkZGluZyByaWdodFxuICAgIGxpbmUgKz0gZm9ybWF0dGluZy5uZXdsaW5lKClcbiAgICByZXR1cm4gbGluZVxuXG4gIGdldFNwYWNlc0JlZm9yZSA9IChzcGFjZXNMZWZ0LCBhbGlnbikgLT5cbiAgICBpZiBhbGlnbiA9PSAnbGVmdCdcbiAgICAgIHJldHVybiAwXG4gICAgZWxzZSBpZiBhbGlnbiA9PSAncmlnaHQnXG4gICAgICByZXR1cm4gc3BhY2VzTGVmdFxuICAgIGVsc2UgaWYgYWxpZ24gPT0gJ2NlbnRlcidcbiAgICAgIGlmIHNwYWNlc0xlZnQgJSAyID09IDAgIyBldmVuXG4gICAgICAgIHJldHVybiBzcGFjZXNMZWZ0LzJcbiAgICAgIGVsc2UgIyBvZGRcbiAgICAgICAgcmV0dXJuIChzcGFjZXNMZWZ0LTEpLzJcblxuICAjIGJ1aWxkIHRoZSB0YWJsZSBhcyBhIHN0cmluZ1xuICBvdXRwdXQgPSAnJ1xuXG4gICMgdG9wIGxpbmVcbiAgb3V0cHV0ICs9IGJ1aWxkTGluZSgpXG5cbiAgIyBoZWFkZXJcbiAgaWYgaGVhZGVyXG4gICAgb3V0cHV0ICs9IGJ1aWxkUm93IHJvd3NbMF0sIGhlYWRlckNvbG9yLCBudWxsLCAnY2VudGVyJ1xuICAgIG91dHB1dCArPSBidWlsZExpbmUgaGVhZGVyQ29sb3JcbiAgICByb3dzID0gcm93cy5zbGljZSgxKVxuICAgIHN0eWxlZFJvd3MgPSBzdHlsZWRSb3dzLnNsaWNlKDEpXG4gICAgcmF3Um93cyA9IHJhd1Jvd3Muc2xpY2UoMSlcblxuICAjIGJvZHlcbiAgZm9yIHJvdywgaSBpbiByb3dzXG4gICAgc3R5bGVkUm93ID0gc3R5bGVkUm93c1tpXVxuICAgIHJhd1JvdyA9IHJhd1Jvd3NbaV1cbiAgICBvdXRwdXQgKz0gYnVpbGRSb3cgcm93LCBzdHlsZWRSb3csIHJhd1Jvd1xuXG4gICMgY2xvc2luZ1xuICAgIG91dHB1dCArPSBidWlsZExpbmUoKVxuXG4gIHJldHVybiBvdXRwdXRcbiIsIi8vIHNoaW0gZm9yIHVzaW5nIHByb2Nlc3MgaW4gYnJvd3NlclxuXG52YXIgcHJvY2VzcyA9IG1vZHVsZS5leHBvcnRzID0ge307XG5cbnByb2Nlc3MubmV4dFRpY2sgPSAoZnVuY3Rpb24gKCkge1xuICAgIHZhciBjYW5TZXRJbW1lZGlhdGUgPSB0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJ1xuICAgICYmIHdpbmRvdy5zZXRJbW1lZGlhdGU7XG4gICAgdmFyIGNhblBvc3QgPSB0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJ1xuICAgICYmIHdpbmRvdy5wb3N0TWVzc2FnZSAmJiB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lclxuICAgIDtcblxuICAgIGlmIChjYW5TZXRJbW1lZGlhdGUpIHtcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIChmKSB7IHJldHVybiB3aW5kb3cuc2V0SW1tZWRpYXRlKGYpIH07XG4gICAgfVxuXG4gICAgaWYgKGNhblBvc3QpIHtcbiAgICAgICAgdmFyIHF1ZXVlID0gW107XG4gICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdtZXNzYWdlJywgZnVuY3Rpb24gKGV2KSB7XG4gICAgICAgICAgICB2YXIgc291cmNlID0gZXYuc291cmNlO1xuICAgICAgICAgICAgaWYgKChzb3VyY2UgPT09IHdpbmRvdyB8fCBzb3VyY2UgPT09IG51bGwpICYmIGV2LmRhdGEgPT09ICdwcm9jZXNzLXRpY2snKSB7XG4gICAgICAgICAgICAgICAgZXYuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgICAgICAgICAgaWYgKHF1ZXVlLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGZuID0gcXVldWUuc2hpZnQoKTtcbiAgICAgICAgICAgICAgICAgICAgZm4oKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sIHRydWUpO1xuXG4gICAgICAgIHJldHVybiBmdW5jdGlvbiBuZXh0VGljayhmbikge1xuICAgICAgICAgICAgcXVldWUucHVzaChmbik7XG4gICAgICAgICAgICB3aW5kb3cucG9zdE1lc3NhZ2UoJ3Byb2Nlc3MtdGljaycsICcqJyk7XG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgcmV0dXJuIGZ1bmN0aW9uIG5leHRUaWNrKGZuKSB7XG4gICAgICAgIHNldFRpbWVvdXQoZm4sIDApO1xuICAgIH07XG59KSgpO1xuXG5wcm9jZXNzLnRpdGxlID0gJ2Jyb3dzZXInO1xucHJvY2Vzcy5icm93c2VyID0gdHJ1ZTtcbnByb2Nlc3MuZW52ID0ge307XG5wcm9jZXNzLmFyZ3YgPSBbXTtcblxucHJvY2Vzcy5iaW5kaW5nID0gZnVuY3Rpb24gKG5hbWUpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3Byb2Nlc3MuYmluZGluZyBpcyBub3Qgc3VwcG9ydGVkJyk7XG59XG5cbi8vIFRPRE8oc2h0eWxtYW4pXG5wcm9jZXNzLmN3ZCA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuICcvJyB9O1xucHJvY2Vzcy5jaGRpciA9IGZ1bmN0aW9uIChkaXIpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3Byb2Nlc3MuY2hkaXIgaXMgbm90IHN1cHBvcnRlZCcpO1xufTtcbiJdfQ==
;