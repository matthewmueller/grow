/**
 * Module dependencies
 */

var $ = require('jquery'),
    event = require('event'),
    domify = require('domify');

/**
 * Attributes that affect height
 */

var attrs = ['width', 'font-size', 'font-family', 'font-weight', 'line-height', 'padding-top', 'padding-bottom'];

/**
 * Boilerplate text
 */

var boilerplate = 'Some boilerplate text';

/**
 * Export `Grow`
 */

module.exports = Grow;

/**
 * Initialize `Grow`
 *
 * @param {Element} el
 * @param {Object} options
 */

function Grow(el, options) {
  if(!(this instanceof Grow)) return new Grow(el, options);
  this.options = options || {};
  this.el = el;
  this.$el = $(el);
  this.shadow = domify(require('./template'))[0];
  this.$shadow = $(this.shadow);

  // remove resize
  this.$el.css('resize', 'none');

  // initial attributes
  this.height = this.$el.outerHeight();
  this.buffer = this.options.buffer || 20;

  // copy attributes
  for (var i = 0, len = attrs.length; i < len; i++) {
    this.$shadow.css(attrs[i], this.$el.css(attrs[i]));
  }

  event.bind(el, 'input', this.update.bind(this));
  document.body.appendChild(this.shadow);

  this.update();
}

/**
 * Update
 *
 * @return {Grow}
 * @api private
 */

Grow.prototype.update = function() {
  var val = entities(this.el.value),
      $shadow = this.$shadow,
      $el = this.$el;

  // Copy text over
  if(val) this.shadow.innerHTML = val;
  else this.shadow.innerHTML = boilerplate;

  var height = Math.max($shadow.outerHeight() + this.buffer, this.height);
  $el.height(height);

  return this;
};

/**
 * Convert string to proper entities
 *
 * @param {String} str
 * @return {String}
 * @api private
 */

function entities(str) {
  return str
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/&/g, '&amp;')
    .replace(/\n$/, '<br/>&nbsp;')
    .replace(/\n/g, '<br/>')
    .replace(/ {2,}/g, function(s){ return repeat('&nbsp;', s.length - 1) + ' '; });
}

/**
 * Replace a `str` `n` number of times
 *
 * @param {String} str
 * @param {Number} n
 * @api private
 */

function repeat(str, n) {
  var out = [];
  for (var i = 0; i < n; i++) out[out.length] = str;
  return out.join('');
}
