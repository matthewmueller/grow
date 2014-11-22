/**
 * Module Dependencies
 */

var Grow = require('../');
var css = require('css');

/**
 * Create example textarea
 */

var textarea = document.createElement('textarea');
css(textarea, { width: '500px', 'min-height': '100px' });
document.body.appendChild(textarea);
Grow(textarea);
