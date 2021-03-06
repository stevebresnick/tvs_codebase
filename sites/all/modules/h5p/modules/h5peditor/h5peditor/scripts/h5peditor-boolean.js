var H5PEditor = H5PEditor || {};
var ns = H5PEditor;

/**
 * Creates a boolean field for the editor.
 *
 * @param {mixed} parent
 * @param {object} field
 * @param {mixed} params
 * @param {function} setValue
 * @returns {ns.Boolean}
 */
ns.Boolean = function (parent, field, params, setValue) {
  if (params === undefined) {
    this.value = false;
    setValue(field, this.value);
  }
  else {
    this.value = params;
  }

  this.field = field;
  this.setValue = setValue;
};

/**
 * Create HTML for the boolean field.
 */
ns.Boolean.prototype.createHtml = function () {
  var styles = "";
  if ((typeof(this.field) !== "undefined") && (typeof(this.field.hide) !== "undefined") && (this.field.hide)) {
      styles = " style='display:none;' ";
  }
    
  var input = '<input type="checkbox"';
  if (this.value !== undefined && this.value) {
    input += ' checked="checked"' + styles;
  }
  input += '/>';

  var html = '<label class="h5peditor-label" ' + styles + '>' + input;
  if (this.field.label !== 0) {
    html += this.field.label === undefined ? this.field.name : this.field.label;
  }
  html += '</label>';

  return ns.createItem(this.field.type, html, this.field.description);
};

/**
 * "Validate" the current boolean field.
 */
ns.Boolean.prototype.validate = function () {
  return true;
};

/**
 * Append the boolean field to the given wrapper.
 *
 * @param {jQuery} $wrapper
 * @returns {undefined}
 */
ns.Boolean.prototype.appendTo = function ($wrapper) {
  var that = this;

  this.$item = ns.$(this.createHtml()).appendTo($wrapper);
  this.$input = this.$item.children('label').children('input');
  this.$errors = this.$item.children('.h5p-errors');

  this.$input.change(function () {
    // Validate
    that.value = that.$input.is(':checked') ? true : false;
    that.setValue(that.field, that.value);
  });
};

/**
 * Remove this item.
 */
ns.Boolean.prototype.remove = function () {
  this.$item.remove();
};

// Tell the editor what widget we are.
ns.widgets['boolean'] = ns.Boolean;