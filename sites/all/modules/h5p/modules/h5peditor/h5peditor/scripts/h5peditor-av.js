var H5PEditor = H5PEditor || {};

/**
 * Audio/Video module.
 * Makes it possible to add audio or video through file uploads and urls.
 *
 */
H5PEditor.widgets.video = H5PEditor.widgets.audio = H5PEditor.AV = (function ($) {

  /**
   * Constructor.
   *
   * @param {mixed} parent
   * @param {object} field
   * @param {mixed} params
   * @param {function} setValue
   * @returns {_L3.C}
   */
  function C(parent, field, params, setValue) {
    this.parent = parent;
    this.field = field;
    this.params = params;
    this.setValue = setValue;
    this.changes = [];
      
    parent.thisfileObject = this;

    if (params !== undefined && params[0] !== undefined) {
      this.setCopyright(params[0].copyright);
    }
  }
    

  /**
   * Append widget to given wrapper.
   *
   * @param {jQuery} $wrapper
   */
  C.prototype.appendTo = function ($wrapper) {
    var self = this;

    // Add iframe for uploads.
    H5PEditor.File.addIframe();

    var label = '';
    if (this.field.label !== 0) {
      label = '<span class="h5peditor-label">' + (this.field.label === undefined ? this.field.name : this.field.label) + '</span>';
    }

    var includeCopyright = true;
    var html = H5PEditor.createItem(this.field.type, label + '<div class="file">' + C.createAdd(this.field.type) + '</div>', this.field.description);
      
    if (this.parent.field.showEditorCopyright != false){
        html = H5PEditor.createItem(this.field.type, label + '<div class="file">' + C.createAdd(this.field.type) + '</div><a class="h5p-copyright-button" href="#">' + ns.t('core', 'editCopyright') + '</a><div class="h5p-editor-dialog"><a href="#" class="h5p-close" title="' + ns.t('core', 'close') + '"></a></div>', this.field.description);
    }
      
    var $container = $(html).appendTo($wrapper);
    var $file = $container.children('.file');
    this.$add = $file.children('.h5p-add-file').click(function () {
      self.$addDialog.addClass('h5p-open');
    });
    this.$addDialog = this.$add.next();
    var $url = this.$addDialog.find('.h5p-file-url');
    this.$addDialog.find('.h5p-cancel').click(function () {
      self.updateIndex = undefined;
      $url.val('');
      self.$addDialog.removeClass('h5p-open');
    });
    this.$addDialog.find('.h5p-file-upload').click(function () {
      self.uploadFile();
    });
    this.$addDialog.find('.h5p-insert').click(function () {
      self.useUrl($url.val().trim());
      self.$addDialog.removeClass('h5p-open');
      $url.val('');
    });
    this.$addDialog.find('.h5p-file-from-dam').click(function () {
        parent.thisfileObject = self;
        nodeId = H5PEditor.contentId;
        if (self.parent.currentLibrary !== undefined) {
            if (self.parent.currentLibrary.indexOf("H5P.Video") === 0) {
                parent.document.getElementById("approvedDamContentFrame").src = "/sites/all/libraries/tvs/get_dam_content.php?typ=vid&r=" + Math.random().toString(36).substring(7) + "&nid=" + nodeId;
            }
            else {
                parent.document.getElementById("approvedDamContentFrame").src = "/sites/all/libraries/tvs/get_dam_content.php?typ=aud&r=" + Math.random().toString(36).substring(7) + "&nid=" + nodeId;
            }
        }
        else if (self.parent.library !== undefined) {
            if (self.parent.library.indexOf("video") > -1) {
                parent.document.getElementById("approvedDamContentFrame").src = "/sites/all/libraries/tvs/get_dam_content.php?typ=vid&r=" + Math.random().toString(36).substring(7) + "&nid=" + nodeId;
            }
            else {
                parent.document.getElementById("approvedDamContentFrame").src = "/sites/all/libraries/tvs/get_dam_content.php?typ=aud&r=" + Math.random().toString(36).substring(7) + "&nid=" + nodeId;
            }
        }
        
        
        parent.document.getElementById('approvedContent').style.display='block';
        self.updateIndex = undefined;
        $url.val('');
        self.$addDialog.removeClass('h5p-open');
    });

    this.$errors = $container.children('.h5p-errors');

    if (this.params !== undefined) {
      for (var i = 0; i < this.params.length; i++) {
        this.addFile(i);
        if (typeof(this.$add) !== "undefined") {
            this.$add.hide();
        }
      }
    }

    var $dialog = $container.find('.h5p-editor-dialog');
    $container.find('.h5p-copyright-button').add($dialog.find('.h5p-close')).click(function () {
      $dialog.toggleClass('h5p-open');
      return false;
    });

    var group = new H5PEditor.widgets.group(self, H5PEditor.copyrightSemantics, self.copyright, function (field, value) {
      self.setCopyright(value);
    });
    group.appendTo($dialog);
    group.expand();
    group.$group.find('.title').remove();
    this.children = [group];
  };
    
  C.prototype.showDAMFiles = function () {
      //JFM
      this.$addDialog.removeClass('h5p-open');
      this.$uploading = $('<div class="h5peditor-uploading h5p-throbber">' + H5PEditor.t('core', 'uploading') + '</div>').insertAfter(that.$add.hide());
      
      try {
        var getDAMVideos = "/sites/all/libraries/tvs/get_my_dam_files.php";

        H5P.jQuery.ajax({ 
            type: "GET",
            url: getDAMVideos,
            success: function(data){

                },
            error: function(data) {
                }
            });
        }
        catch (error) {
            this.$errors.append(H5PEditor.createError(error));
        }  
      
      //END JFM
  }
  
  C.prototype.addDAMFile = function (videoPath,videoExt,width,height) {
        var that = this;

        var file = {
            path: videoPath,
            mime: "video/" + videoExt,
            copyright: that.copyright
        };
      
        if (videoExt === "mp3") {
            file = {
                path: videoPath,
                mime: "audio/mpeg",
                copyright: that.copyright
            };
        }

        that.params = [];
        var index = 0;
        that.params[index] = file;
        that.addFile(index);
      
        that.setValue(that.field, that.params);

        for (var i = 0; i < that.changes.length; i++) {
          that.changes[i](file);
        }

        if (that.$uploading !== undefined && that.$uploading.length !== 0) {
            that.$uploading.remove();
        }
      
        parent.document.getElementById("approvedDamContentFrame").src = "";
      };
  /**
   * Add file icon with actions.
   *
   * @param {Number} index
   */
  C.prototype.addFile = function (index) {
    var that = this;
    var file = this.params[index];

    if (that.updateIndex !== undefined) {
      this.$add.parent().children(':eq(' + index + ')').find('.h5p-type').attr('title', file.mime).text(file.mime.split('/')[1]);
      this.updateIndex = undefined;
      return;
    }

    var $fileHtml = '<div class="h5p-thumbnail"><video style="max-width:100%" controls src="' + H5P.getPath(file.path,H5PEditor.contentId) + '" /><img style="width: 16px;position: absolute;right: -20px;" src="/sites/default/files/images/trash.svg" class="h5p-remove"></div>';
    if (file.mime.toLowerCase().indexOf("youtube") > -1) {
        
        var iFrameSrc = '<iframe frameborder="0" allowfullscreen width="100%" src="';
        if (file.path.toLowerCase().indexOf("watch") > -1) {
            iFrameSrc += file.path.replace("watch?v=","embed/");
        }
        else if (file.path.toLowerCase().indexOf("youtu.be/") > -1) {
            iFrameSrc += file.path.replace("youtu.be/","youtube.com/embed/");
        }
        
        iFrameSrc += '"></iframe>';
        
        $fileHtml = '<div class="h5p-thumbnail">' + iFrameSrc + '<img style="width: 16px;position: absolute;right: -20px;" src="/sites/default/files/images/trash.svg" class="h5p-remove"></div>';
    }

      
    //Updated by Avneet Chadha on June 6,2016
    var $file = $($fileHtml)


      .insertBefore(this.$add)
      .click(function () {
        if (!that.$add.is(':visible')) {
          return; // Do not allow editing of file while uploading
        }
        that.$addDialog.addClass('h5p-open').find('.h5p-file-url').val(that.params[index].path);
        that.updateIndex = index;
      })
      .children('.h5p-remove')
        .click(function () {
          if (!confirm(H5PEditor.t('core', 'confirmRemoval', {':type': 'file'}))) {
            return false;
          }

          // Remove from params.
          if (that.params.length === 1) {
            delete that.params;
            that.setValue(that.field);
          }
          else {
            that.params.splice(index, 1);
          }

          $file.remove();

          for (var i = 0; i < that.changes.length; i++) {
            that.changes[i]();
          }
          that.$add.show();
          return false;
        })
        .end();
      
      if (that.$add.siblings().length > 1) {that.$add.hide();}
  };

  /**
   * Start a new upload.
   *
   * @returns {unresolved}
   */
  C.prototype.uploadFile = function () {
    var that = this;

    if (H5PEditor.File.$file === 0) {
      return; // Wait for our turn :)
    }

    this.$errors.html('');

    H5PEditor.File.changeCallback = function () {
      that.$addDialog.removeClass('h5p-open');
      that.$uploading = $('<div class="h5peditor-uploading h5p-throbber">' + H5PEditor.t('core', 'uploading') + '</div>').insertAfter(that.$add.hide());
    };

    H5PEditor.File.callback = function (err, result) {
      try {
        if (err) {
          throw err;
        }

        if (true) {
            var nodeId = 0;
            if (H5P.instances.length > 0) {
                nodeId = H5P.instances[0].contentId;
            }
            else {
                nodeId = H5PEditor.contentId;
                if (nodeId === undefined) { nodeId = 0;}
            }
            var convertVideoInDamJSON = { 
                filePath: result.path,
                tvsNode: nodeId
            }

            var convertVideoInDAMUrl = "/sites/all/libraries/tvs/post_to_dam.php";
            
            if (that.$uploading !== undefined && that.$uploading.length !== 0) {
                that.$uploading.remove();
                that.$uploading = $('<div class="h5peditor-uploading h5p-throbber">' + H5PEditor.t('core', 'damProcessing') + '</div>').insertAfter(that.$add.hide());
            }

            H5P.jQuery.ajax({ 
                type: "POST",
                data: convertVideoInDamJSON,
                dataType: "json",
                url: convertVideoInDAMUrl,
                success: function(data){
                        if (that.params === undefined) {
                          that.params = [];
                          that.setValue(that.field, that.params);
                        }

                        var file = {
                          path: result.path,
                          mime: result.mime,
                          copyright: that.copyright,
                          damId: data.toString()
                        };

                        var index = (that.updateIndex !== undefined ? that.updateIndex : that.params.length);
                        that.params[index] = file;
                        that.addFile(index);

                        for (var i = 0; i < that.changes.length; i++) {
                          that.changes[i](file);
                        }

                        if (that.$uploading !== undefined && that.$uploading.length !== 0) {
                            that.$uploading.remove();
                        }
                    },
                error: function(data) {
                        if (that.params === undefined) {
                          that.params = [];
                          that.setValue(that.field, that.params);
                        }

                        var file = {
                          path: result.path,
                          mime: result.mime,
                          copyright: that.copyright
                        };

                        var index = (that.updateIndex !== undefined ? that.updateIndex : that.params.length);
                        that.params[index] = file;
                        that.addFile(index);

                        for (var i = 0; i < that.changes.length; i++) {
                          that.changes[i](file);
                        }

                        if (that.$uploading !== undefined && that.$uploading.length !== 0) {
                            that.$uploading.remove();
                        }
                    }
                });
            }
        }
        catch (error) {
            that.$errors.append(H5PEditor.createError(error));
        }        
    };
      
    

    if (this.field.mimes !== undefined) {
      var mimes = '';
      for (var i = 0; i < this.field.mimes.length; i++) {
        if (mimes !== '') {
          mimes += ',';
        }
        mimes += this.field.mimes[i];
      }
      H5PEditor.File.$file.attr('accept', mimes);
    }
    else if (this.field.type === 'audio') {
      H5PEditor.File.$file.attr('accept', 'audio/mpeg,audio/x-wav,audio/ogg');
    }
    else if (this.field.type === 'video') {
      H5PEditor.File.$file.attr('accept', 'video/mp4,video/webm,video/ogg');
    }

    H5PEditor.File.$field.val(JSON.stringify(this.field));
    H5PEditor.File.$file.click();
  };

  C.prototype.useUrl = function (url) {
    if (this.params === undefined) {
      this.params = [];
      this.setValue(this.field, this.params);
    }

    var mime;
    var matches = url.match(/\.(webm|mp4|ogv|m4a|mp3|ogg|oga|wav)/i);
    if (matches !== null) {
      mime = matches[matches.length - 1];
    }
    else {
      // Try to find a provider
      for (var i = 0; i < C.providers.length; i++) {
        if (C.providers[i].regexp.test(url)) {
          mime = C.providers[i].name;
          break;
        }
      }
    }

    var file = {
      path: url,
      mime: this.field.type + '/' + (mime ? mime : 'unknown'),
      copyright: this.copyright
    };
    var index = (this.updateIndex !== undefined ? this.updateIndex : this.params.length);
    this.params[index] = file;
    this.addFile(index);

    for (var i = 0; i < this.changes.length; i++) {
      this.changes[i](file);
    }
  };

  /**
   * Validate the field/widget.
   *
   * @returns {Boolean}
   */
  C.prototype.validate = function () {
    return true;
  };

  /**
   * Remove this field/widget.
   */
  C.prototype.remove = function () {
    // TODO: Check what happens when removed during upload.
    this.$errors.parent().remove();
  };

  /**
   * Sync copyright between all video files.
   *
   * @returns {undefined}
   */
  C.prototype.setCopyright = function (value) {
    this.copyright = value;
    if (this.params !== undefined) {
      for (var i = 0; i < this.params.length; i++) {
        this.params[i].copyright = value;
      }
    }
  };

  /**
   * Collect functions to execute once the tree is complete.
   *
   * @param {function} ready
   * @returns {undefined}
   */
  C.prototype.ready = function (ready) {
    if (this.passReadies) {
      this.parent.ready(ready);
    }
    else {
      ready();
    }
  };

  /**
   * HTML for add button.
   *
   * @returns {String}
   */
  C.createAdd = function (type) {
    
    var youtubeHtml = "";
    if (type.toLowerCase() === "video") {
        youtubeHtml = '<div class="h5p-or"><span>or</span></div><div class="h5p-dialog-box"><input type="text" placeholder="Type in file url (YouTube is supported for videos)" class="h5p-file-url h5peditor-text"/></div>';
    }
      
    var html = '<div role="button" tabindex="1" class="h5p-add-file" title="' + H5PEditor.t('core', 'addFile') + '"></div><div class="h5p-add-dialog"><div class="h5p-dialog-box"><button class="h5p-file-upload">Upload new file</button></div><div class="h5p-or"><span>or</span></div><div class="h5p-dialog-box"><button class="h5p-file-from-dam">Select file from library</button></div>' + youtubeHtml + '<div class="h5p-buttons"><button class="h5p-insert">Insert</button><button class="h5p-cancel">Cancel</button></div></div>';
      
    if (localStorage.getItem("tvs_primary_app").toLowerCase() === "direct") {
        html = '<div role="button" tabindex="1" class="h5p-add-file" title="' + H5PEditor.t('core', 'addFile') + '"></div><div class="h5p-add-dialog"><div class="h5p-dialog-box"><button class="h5p-file-upload">Upload new file</button></div>' + youtubeHtml + '<div class="h5p-buttons"><button class="h5p-insert">Insert</button><button class="h5p-cancel">Cancel</button></div></div>';
    }
      
      
    return html;
  };

  /**
   * Providers incase mime type is unknown.
   * @public
   */
  C.providers = [{
    name: 'YouTube',
    regexp: /^https?:\/\/(youtu.be|(www.)?youtube.com)\//i
  }];

  return C;
})(H5P.jQuery);
