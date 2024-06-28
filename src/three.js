/**
 * Module dependencies.
 */
var path = require('path');
var fs = require('fs')
  , Image = require('canvas').Image
  , { JSDOM } = require('jsdom')
  , { window } = new JSDOM('<html><head></head><body></body></html>');

  var { document } = window;
  var self = global;
  

  const threeJsPath = path.join(__dirname, '..', 'include', 'three.js');
  const src = fs.readFileSync(threeJsPath, 'utf8');

  // console.log('src :>> ', src);

  // console.log('window :>> ', window);

/**
 * Monkey patch for Image#addEventListener.
 *
 * @param {String} type
 * @param {Function} listener
 * @param {Boolean} useCapture (will ignore)
 */

Image.prototype.addEventListener = function(type, listener, useCapture) {
  this['on' + type] = listener;
};

/**
 * Evaluate Three.js source code.
 */

eval('(function(window, document) {'
  + src.toString('utf-8').replace('var THREE', 'var THREE = window.THREE')
  + '})(window, document);'
);

// eval(`(function(window, document) {
//   ${src}
// })(window, document);`);

window.THREE.Image = Image;

/**
 * Expose `THREE`
 */

module.exports = window.THREE;
