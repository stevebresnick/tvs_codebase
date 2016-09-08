var H5PEditor = H5PEditor || {};
var ns = H5PEditor;
var $allNicEditors;

  //<![CDATA[
        bkLib.onDomLoaded(function () {
            $allNicEditors = nicEditors;
        });
  //]]>


/**
 * Adds a html text field to the form.
 *
 * @param {type} parent
 * @param {type} field
 * @param {type} params
 * @param {type} setValue
 * @returns {undefined}
 */
ns.Html = function (parent, field, params, setValue) {
  this.field = field;
  this.value = params;
  this.setValue = setValue;
  this.tags = ns.$.merge(['br','font','h1','h2','h3','h4','h5','h6','div','font','span','table','tbody','tr','td'], (this.field.tags || this.defaultTags));
};
ns.Html.first = true;

ns.Html.prototype.defaultTags = ['strong', 'b', 'em', 'i', 'u', 'del', 'h1', 'h2', 'h3', 'a', 'ul', 'ol', 'li', 'table', 'hr', 'tr', 'td','th','div','blockquote','span','font'];

// This should probably be named "hasTag()" instead...
// And might be more efficient if this.tags.contains() were used?
ns.Html.prototype.inTags = function (value) {
  return (ns.$.inArray(value.toLowerCase(), this.tags) >= 0);
};

ns.Html.prototype.createToolbar = function () {
  var basicstyles = [];
  var paragraph = [];
  var formats = [];
  var inserts = [];
  var toolbar = [];

  // Basic styles
  if (this.inTags("strong") || this.inTags("b")) {
    basicstyles.push('Bold');
    // Might make "strong" duplicated in the tag lists. Which doesn't really
    // matter.
    this.tags.push("strong");
    this.tags.push("bold");
  }
  if (this.inTags("em") || this.inTags("i")) {
    basicstyles.push('Italic');
    // Might make "em" duplicated in the tag lists. Which again
    // doesn't really matter.
    this.tags.push("em");
    this.tags.push("italic");
  }
  if (this.inTags("u")) basicstyles.push('Underline');
  if (this.inTags("strike") || this.inTags("del") || this.inTags("s")) {
    basicstyles.push('Strike');
    // Might make "strike" or "del" or both duplicated in the tag lists. Which
    // again doesn't really matter.
    this.tags.push("strike");
    this.tags.push("del");
    this.tags.push("s");
    this.tags.push("underline");
  }
  if (this.inTags("sub")) basicstyles.push("Subscript");
  if (this.inTags("sup")) basicstyles.push("Superscript");
  if (basicstyles.length > 0) {
    basicstyles.push("-");
    basicstyles.push("RemoveFormat");
    toolbar.push({
      name: 'basicstyles',
      items: basicstyles
    });
  }

  // Alignment is added to all wysiwygs
  toolbar.push({
    name: "justify",
    items: ["JustifyLeft", "JustifyCenter", "JustifyRight"]
  });

  // Paragraph styles
  if (this.inTags("ul")) {
    paragraph.push("BulletedList");
    this.tags.push("li");
  }
  if (this.inTags("ol")) {
    paragraph.push("NumberedList");
    this.tags.push("li");
  }
  if (this.inTags("blockquote")) paragraph.push("Blockquote");
  if (paragraph.length > 0) {
    toolbar.push(paragraph);
  }

  // Links.
  if (this.inTags("a")) {
    var items = ["Link", "Unlink"];
    if (this.inTags("anchor")) {
      items.push("Anchor");
    }
    toolbar.push({
      name: "links",
      items: items
    });
  }

  // Inserts
  if (this.inTags("img")) inserts.push("Image");
  if (this.inTags("table")) {
    inserts.push("Table");
    ns.$.merge(this.tags, ["tr", "td", "th", "colgroup", "thead", "tbody", "tfoot"]);
  }
  if (this.inTags("hr")) inserts.push("HorizontalRule");
  if (inserts.length > 0) {
    toolbar.push({
      name: "insert",
      items: inserts
    });
  }

  // Create wrapper for text styling options
  var styles = {
    name: "styles",
    items: []
  };
  var colors = {
    name: "colors",
    items: []
  };

  // Add format group if formatters in tags (h1, h2, etc). Formats use their
  // own format_tags to filter available formats.
//debugger;
  if (this.inTags("h1")) formats.push("h1");
  if (this.inTags("h2")) formats.push("h2");
  if (this.inTags("h3")) formats.push("h3");
  if (this.inTags("h4")) formats.push("h4");
  if (this.inTags("h5")) formats.push("h5");
  if (this.inTags("h6")) formats.push("h6");
  if (this.inTags("address")) formats.push("address");
  if (this.inTags("pre")) formats.push("pre");
  if (formats.length > 0 || this.inTags('p') || this.inTags('div')) {
    formats.push("p");   // If the formats are shown, always have a paragraph..
    this.tags.push("p");
    styles.items.push('Format');
  }

  var ret = {
    toolbar: toolbar
  };

  if (this.field.font !== undefined) {
    this.tags.push('span');

    /**
     * Help set specified values for property.
     *
     * @private
     * @param {Array} values list
     * @param {string} prop Property
     * @param {string} [defProp] Default property name
     */
    var setValues = function (values, prop, defProp) {
      ret[prop] = '';
      for (var i = 0; i < values.length; i++) {
        var val = values[i];
        if (val.label && val.css) {
          // Add label and CSS
          ret[prop] += val.label + '/' + val.css + ';';

          // Check if default value
          if (defProp && val.default) {
            ret[defProp] = val.label;
          }
        }
      }
    };

    /**
     * @private
     * @param {Array} values
     * @returns {string}
     */
    var getColors = function (values) {
      var colors = '';
      for (var i = 0; i < values.length; i++) {
        var val = values[i];
        if (val.label && val.css) {
          var css = val.css.match(/^#?([a-f0-9]{3}[a-f0-9]{3}?)$/i);
          if (!css) {
            continue;
          }

          // Add label and CSS
          if (colors) {
            colors += ',';
          }
          colors += val.label + '/' + css[1];
        }
      }
      return colors;
    };

    if (this.field.font.family) {
      // Font family chooser
      styles.items.push('Font');

      if (this.field.font.family instanceof Array) {
        // Use specified families
        setValues(this.field.font.family, 'font_names', 'font_defaultLabel');
      }
    }

    if (this.field.font.size) {
      // Font size chooser
      styles.items.push('FontSize');

      ret.fontSize_sizes = '';
      if (this.field.font.size instanceof Array) {
        // Use specified sizes
        setValues(this.field.font.size, 'fontSize_sizes', 'fontSize_defaultLabel');
      }
      else {
        ret.fontSize_defaultLabel = '100%';

        // Standard font size that is used. (= 100%)
        var defaultFont = 16;

        // Standard font sizes that is available.
        var defaultAvailable = [8, 9, 10, 11, 12, 14, 16, 18, 20, 22, 24, 26, 28, 36, 48, 72];
        for (var i = 0; i < defaultAvailable.length; i++) {
          // Calculate percentage of standard font size. This enables scaling
          // in content types without rounding errors across browsers.
          var em = defaultAvailable[i] / 16;
          ret.fontSize_sizes += (em * 100) + '%/' + em + 'em;';
        }

      }

    }

    if (this.field.font.color) {
      // Text color chooser
      colors.items.push('TextColor');

      if (this.field.font.color instanceof Array) {
        ret.colorButton_colors = getColors(this.field.font.color);
        ret.colorButton_enableMore = false;
      }
    }

    if (this.field.font.background) {
      // Text background color chooser
      colors.items.push('BGColor');

      if (this.field.font.background instanceof Array) {
        ret.colorButton_colors = getColors(this.field.font.color);
        ret.colorButton_enableMore = false;
      }
    }
  }

  // Add the text styling options
  if (styles.items.length) {
    toolbar.push(styles);
  }
  if (colors.items.length) {
    toolbar.push(colors);
  }

  // Set format_tags if not empty
  if (formats.length) {
    ret.format_tags = formats.join(';');
  }

  // Enable selection of enterMode in module semantics.
  if (this.field.enterMode === 'p' || formats.length > 0) {
    this.tags.push('p');
    ret.enterMode = "<p>";
  } else {
    // Default to DIV, not allowing BR at all.
    this.tags.push('div');
    ret.enterMode = "<div>";
  }

  return ret;
};

/**
 * Append field to wrapper.
 *
 * @param {type} $wrapper
 * @returns {undefined}
 */
ns.Html.prototype.appendTo = function ($wrapper) {
  var that = this;

  this.$item = ns.$(ns.createItem(this.field.type, this.createHtml(), this.field.description)).appendTo($wrapper);

  this.$input = this.$item.children('.nicEditor');
  this.$errors = this.$item.children('.h5p-errors');

    var theButtonList = {buttonList : ['save','bold','italic','underline','left','center','right','justify','ol','ul','fontSize','fontFamily','fontFormat','indent','outdent','image','upload','link','unlink','forecolor','bgcolor']};
    
    if (this.tags.indexOf("strong") === -1) { theButtonList.buttonList.splice(theButtonList.buttonList.indexOf("bold"),1);}
    if (this.tags.indexOf("em") === -1) { theButtonList.buttonList.splice(theButtonList.buttonList.indexOf("italic"),1);}
    if (this.tags.indexOf("u") === -1) { theButtonList.buttonList.splice(theButtonList.buttonList.indexOf("underline"),1);}
    
    if (this.tags.indexOf("ul") === -1) { theButtonList.buttonList.splice(theButtonList.buttonList.indexOf("ol"),1);}
    if (this.tags.indexOf("ol") === -1) { theButtonList.buttonList.splice(theButtonList.buttonList.indexOf("ul"),1);}
    
    if (this.tags.indexOf("a") === -1) { theButtonList.buttonList.splice(theButtonList.buttonList.indexOf("link"),1);theButtonList.buttonList.splice(theButtonList.buttonList.indexOf("unlink"),1);}
    
    if (this.tags.indexOf("blockquote") === -1) { theButtonList.buttonList.splice(theButtonList.buttonList.indexOf("indent"),1);theButtonList.buttonList.splice(theButtonList.buttonList.indexOf("outdent"),1);}
    
    theButtonList.buttonList.splice(theButtonList.buttonList.indexOf("image"),1);
    theButtonList.buttonList.splice(theButtonList.buttonList.indexOf("upload"),1);

  new nicEditor(theButtonList).panelInstance(this.$input[0]);
};

/**
 * Create HTML for the HTML field.
 */
ns.Html.prototype.createHtml = function () {
  var html = '';
  if (this.field.label !== undefined) {
    html += '<label class="h5peditor-label">' + this.field.label + '</label>';
  }

  html += '<textarea class="nicEditor" tabindex="0" contenteditable="true">';

  if (this.value !== undefined) {
    html += this.value;
  }
  else if (this.field.placeholder !== undefined) {
    html += '<span class="h5peditor-nicEditor-placeholder">' + this.field.placeholder + '</span>';
  }

  html += '</textarea>';

  return html;
};

/**
 * Validate the current text field.
 */
ns.Html.prototype.validate = function () {
  var that = this;
  if (that.$errors.children().length) {
    that.$errors.empty();
  }

  // Get contents from editor
  var value = this.$input.parent().find(".nicEdit-main")[0].innerHTML.replace("<b>","<strong>").replace("</b>","</strong>").replace("<i>","<em>").replace("</i>","</em>");
  var textValue = this.$input.parent().find(".nicEdit-main")[0].innerText;
  

  var $value = ns.$('<div>' + value + '</div>');
  

  // Check if we have any text at all.
  if (!this.field.optional && !textValue.length) {
        this.$errors.append(ns.createError(this.field.label + ' is required and must have some text in it.'));
  }

  // Verify HTML tags.  Removes tags not in allowed tags.  Will replace with
  // the tag's content.  So if we get an unallowed container, the contents
  // will remain, without the container.

  //debugger;
  $value.find('*').each(function () {
    //debugger;
    if (! that.inTags(this.tagName.toLowerCase())) {
      //debugger;
      ns.$(this).replaceWith(ns.$(this).contents());
    }
  });
  
  value = $value.html();

  // Display errors and bail if set.
  if (that.$errors.children().length) {
    return false;
  }
  
  
  value = value.replace("<b>","<strong>").replace("</b>","</strong>").replace("<i>","<em>").replace("</i>","</em>");

  this.value = value;
  this.setValue(this.field, value);
  this.$input.change(); // Trigger change event.

  return value;
};

/**
 * Destroy H5PEditor existing CK instance. If it exists.
 */
ns.Html.removeWysiwyg = function () {
  if (ns.Html.current !== undefined) {
    try {
      ns.Html.current.nicEditor.destroy();
    }
    catch (e) {
      // No-op, just stop error from propagating. This usually occurs if
      // the CKEditor DOM has been removed together with other DOM data.
    }
    ns.Html.current = undefined;
  }
};

/**
 * Remove this item.
 */
ns.Html.prototype.remove = function () {
  this.$item.remove();
};

ns.widgets.html = ns.Html;
