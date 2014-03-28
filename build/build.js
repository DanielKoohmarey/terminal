// Dependencies
var exec = require('child_process').exec;
var fs = require('fs-extra');
var less = require('less');
var mime = require('mime');
var seq = require('seq');

// Do the build.
seq()
  .seq(function () {
    // Compile coffee-script
    exec('./node_modules/.bin/coffee --compile --bare --output build/temp lib/browser.coffee')
    exec('./node_modules/.bin/coffee --compile --bare --output build/temp lib/node.coffee')
    exec('./node_modules/.bin/coffee --compile --bare --output build/temp lib/colors.coffee')
    exec('./node_modules/.bin/coffee --compile --bare --output build/temp lib/tables.coffee')

    // Browserify
    exec('./node_modules/.bin/browserify build/temp/browser.js --standalone terminal --outfile dist/browser.js')
    exec('./node_modules/.bin/browserify build/temp/node.js --standalone terminal --outfile dist/node.js')
  })
  .par(function () {
    // Read in the less stylesheet.
    fs.readFile('lib/terminal.less', 'ascii', this);
  })
  .par(function () {
    // Read in 'interlace.png'.
    fs.readFile('lib/interlace.png', this);
  })
  .par(function () {
    // Read in 'external.png'.
    fs.readFile('lib/external.png', this);
  })
  .seq(function(styles, interlacepng, externalpng) {
    // Convert to string.
    styles = '' + styles;

    // Embed interlace.png
    var interlace = 'url("data:' + mime.lookup('lib/interlace.png') + ';base64,' + new Buffer(interlacepng).toString('base64') + '")';
    styles = styles.replace('dataurl("interlace.png")', interlace);

    // Embed external.png
    var external = 'url("data:' + mime.lookup('lib/external.png') + ';base64,' + new Buffer(externalpng).toString('base64') + '")';
    styles = styles.replace('dataurl("external.png")', external);

    // Minify the stylesheet.
    less.render(styles, {compress: true}, this);
  })
  .seq(function(css) {
    // Write out the minified CSS.
    fs.writeFile('dist/terminal.min.css', css);
  });
