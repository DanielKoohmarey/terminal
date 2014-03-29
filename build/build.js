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
    exec('./node_modules/.bin/coffee --compile --bare --output build/temp lib/console.coffee')
    exec('./node_modules/.bin/coffee --compile --bare --output build/temp lib/colors.coffee')
    exec('./node_modules/.bin/coffee --compile --bare --output build/temp lib/parseArgs.coffee')
    exec('./node_modules/.bin/coffee --compile --bare --output build/temp lib/tables.coffee')
    exec('./node_modules/.bin/coffee --compile --bare --output build/temp index.coffee')

    // Browserify
    exec('./node_modules/.bin/browserify build/temp/index.js --standalone terminal --outfile dist/terminal.js')
    console.log('x')
  })
  .par(function () {
    // Read in the less stylesheet.
    console.log('x')
    fs.readFile('lib/terminal.less', 'ascii', this);
    console.log('x')
  })
  .par(function () {
    // Read in 'interlace.png'.
    console.log('x')
    fs.readFile('lib/interlace.png', this);
    console.log('x')
  })
  .par(function () {
    // Read in 'external.png'.
    console.log('x')
    fs.readFile('lib/external.png', this);
    console.log('x')
  })
  .seq(function(styles, interlacepng, externalpng) {
    console.log(styles)
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
