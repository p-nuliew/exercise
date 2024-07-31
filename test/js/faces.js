function faces(data) {
  this.data = { show_menu: 0 };
  this.data = $.extend({}, this.data, data);

  //this.init();
}

faces.prototype.init = function () {
  var self = this;

  this.fit_ratio = {};
  this.scroll_delta = 0;
  this.face_parts_sizes = [34, 20.5, 21, 24.5];
  this.face_size = { width: 1140, height: 750 };
  this.face_parts_scroll_ratio = [1, 1, 1, 1];
  this.face_parts_sizes_calc = [];
  this.full_scroll_nr = 0;
  this.block_parts_nr = 0;
  this.scroll_pause = 100;
  this.scroll_timetout = null;
  this.scrolled = 0;
  this.scrolled_parts = 0;

  this.can_scroll = 1;
  this.mouse_scrolls = 0;
  this.first_scroll = 1;
  this.deltaY = 0;

  this.menu_shows_on_slidenr = 1;

  this.disabled = false;
  this.menu_active = false;

  this.autoscroll_timeout = null;

  /*
	750px
	33.73333  - 255px     255
	20.53333  - 153.75px  154
	21.46666  - 157.5     157
	24.53333  - 183.75    184
	*/

  this.d_faces_c = $('#faces_c');
  this.d_facesparts = $('#faces_c').find('.facepart');
  this.d_menu = $('#menu');

  this.d_facesparts_imgs = [];

  if (self.data.show_menu) self.activate_menu(1);

  for (var i = 0; i < this.d_facesparts.length; i++) {
    this.d_facesparts_imgs[i] = [];
    var imgs = $(this.d_facesparts[i]).find('img');

    $(imgs).bind('dragstart', function (event) {
      event.preventDefault();
    });

    for (var j = 0; j < imgs.length; j++) {
      this.d_facesparts_imgs[i][j] = imgs[j];
    }

    //this.d_facesparts_imgs[i] = $(this.d_facesparts[i]).find('img');
  }

  var imgs = $(this.d_facesparts[0]).find('img');
  this.block_parts_nr = imgs.length;

  this.calculate_sizes();
  this.resize_elements();
  this.resize_event();
  this.init_face_parts_click();

  if (!_frontpage && _mobile) return;

  setTimeout(function () {
    self.scroll_event();
    self.init_dscroll();
  }, 200);
};

faces.prototype.init_dscroll = function () {
  var self = this;

  this.d_scrolld = $('.scrolldown');

  this.d_scrolld.click(function () {
    self.full_scroll_nr++;
    self.scroll_face(0);
  });

  if (this.data.show_menu) return;

  this.d_scrolld.show();

  pulsate = function () {
    if (self.menu_active) return;

    self.d_scrolld.animate({ bottom: 20, avoidTransforms: true }, 500, 'easeInOutQuad', function () {
      $(this).animate({ bottom: 30, avoidTransforms: true }, 500, 'easeInOutQuad', pulsate);
    });
  };

  pulsate();
};

faces.prototype.disable = function () {
  this.disabled = true;
  this.d_faces_c.fadeOut();

  //var h = this.face_parts_sizes_calc[3];
  //this.d_facesparts.animate({bottom : "-="+h+"px" }, 800, 'easeInOutExpo' ) ;
};

faces.prototype.enable = function () {
  if (!this.disabled) return;

  this.disabled = false;
  this.d_faces_c.fadeIn(1500);

  //var h = this.face_parts_sizes_calc[3];
  //this.d_facesparts.animate({bottom : "-="+h+"px" }, 800, 'easeInOutExpo' ) ;
};

faces.prototype.init_face_parts_click = function () {
  var self = this;

  this.d_facesparts.click(function () {
    if (self.disabled) return;

    if (!self.can_scroll) return;

    clearTimeout(self.autoscroll_timeout);
    self.set_autoscroll_timeout();

    self.can_scroll = 0;
    var part_nr = $(this).attr('data-part') - 1;
    var last_slide = self.d_facesparts_imgs[0].length == self.full_scroll_nr + 1 ? 1 : 0;

    // paskutinis slide'as
    if (last_slide) {
      var par = $(self.d_facesparts_imgs[part_nr][0]).parent();
      var cloned = $(self.d_facesparts_imgs[part_nr][0]).clone();

      self.d_facesparts_imgs[part_nr][self.full_scroll_nr + 1] = cloned;
      cloned.css({ top: self.face_parts_sizes_calc[part_nr] });
      cloned.appendTo($(par));
    }

    var i = self.full_scroll_nr + 1;

    var img = self.d_facesparts_imgs[part_nr][i];

    $(img).animate({ top: 0 }, 500, function () {
      var par = $(this).parent();

      if (last_slide) {
        var img_first = self.d_facesparts_imgs[part_nr][0];
        $(img_first).remove();
        var img_shifted = self.d_facesparts_imgs[part_nr].shift();
      } else {
        var img_first = self.d_facesparts_imgs[part_nr][0];
        $(img_first).remove();

        $(img_first).css({ top: self.face_parts_sizes_calc[part_nr] });
        $(img_first).appendTo($(par));

        var img_shifted = self.d_facesparts_imgs[part_nr].shift();

        self.d_facesparts_imgs[part_nr].push(img_shifted);
      }

      self.can_scroll = 1;
    });
  });
};

faces.prototype.calculate_sizes = function () {
  this.c_w = $(window).width();
  this.c_h = $(window).height() - 65; // menu height

  size = fit_to_screen(this.face_size.width, this.face_size.height, this.c_w, this.c_h, 1);

  this.fit_ratio.width = this.face_size.width / size.width;
  this.fit_ratio.height = this.face_size.height / size.height;
};

faces.prototype.resize_elements = function () {
  var top;
  var self = this;

  for (var i = 0; i < this.d_facesparts.length; i++) {
    var block = this.d_facesparts[i];
    var imgs = $(block).find('img');

    for (l = 0; l < imgs.length; l++) {
      var img = imgs[l];

      var img_w = $(img).attr('data-width');
      var img_h = $(img).attr('data-height');

      img_w = img_w / self.fit_ratio.width;
      img_h = Math.ceil(img_h / self.fit_ratio.height);
      marl = (this.c_w - img_w) / 2;

      if (l == 0) top = 0;
      else top = img_h;

      $(img).css({ width: img_w, height: img_h, marginLeft: marl, top: top });
    }

    $(this.d_facesparts[i]).css({ height: img_h });
  }

  bottom = 0;
  for (var i = this.d_facesparts.length - 1; i > -1; i--) {
    $(this.d_facesparts[i]).css({ bottom: bottom });
    var h = $(this.d_facesparts[i]).height();
    bottom += h;

    this.face_parts_sizes_calc[i] = h;
  }

  this.block_min_h = Math.min.apply(null, this.face_parts_sizes_calc);

  for (var i = 0; i < this.face_parts_sizes_calc.length; i++) this.face_parts_scroll_ratio[i] = this.face_parts_sizes_calc[i] / this.block_min_h;

  var d_tmp = $(this.d_menu).find('nav');
  var menu_w = d_tmp.actual('outerWidth');

  d_tmp.css({ left: (this.d_menu.width() - menu_w) / 2 });

  if (this.disabled) this.disable();
};

//-------------------------------------------------------------------
faces.prototype.calculate_photo_size = function (w, h) {
  var new_size = this.fit_to_screen(w, h, this.gal_w, this.gal_h, false);
  mart = parseInt((this.gal_h - new_size.height) / 2);
  marl = parseInt((this.gal_w - new_size.width) / 2);
  return { w: new_size.width, h: new_size.height, mt: mart, ml: marl };
};

//-------------------------------------------------------------------
faces.prototype.scroll_event = function () {
  var self = this;
  var top, callback;

  $('html').bind('mousewheel', function (event, delta, deltaX, deltaY) {
    if (self.disabled) return;

    if (!self.can_scroll) return;

    self.stoped_scrolling = 0;

    //if (!self.can_scroll)
    //	return false;
    //self.can_scroll =0;

    clearTimeout(self.autoscroll_timeout);
    self.set_autoscroll_timeout();

    clearTimeout($.data(this, 'timer'));
    $.data(
      this,
      'timer',
      setTimeout(function () {
        //alert("Haven't scrolled in 250ms!");
        //do something
        //self.can_scroll = 1;
        self.can_scroll = 1;
      }, 250),
    );

    if (self.can_scroll) {
      self.can_scroll = 0;
      callback = null;

      // scrollinam zemyn
      if (deltaY < 0) {
        top = 0;

        // ne paskutinis elementas
        if (self.full_scroll_nr + 1 < self.d_facesparts_imgs[0].length) {
          self.full_scroll_nr++;
        }
        // paskutinis elementas
        else {
          callback = function () {
            self.scrolldown_arange_after();
          };
          self.scrolldown_arange_before();
        }

        self.scroll_face(top, callback);
      }
      // aukstyn
      else {
        top = self.block_min_h;

        // ne pirmas elementas
        if (self.full_scroll_nr > 0) {
          self.scroll_face(top);
          self.full_scroll_nr--;
        }
        // pirmas elementas
        else {
          callback = function () {
            for (var j = 0; j < self.d_facesparts.length; j++) {
              var k = self.d_facesparts_imgs[j].length - 1;
              $(self.d_facesparts_imgs[j][0]).css({ zIndex: '', top: 0 });
            }
            self.full_scroll_nr = self.d_facesparts_imgs[0].length - 1;
          };

          for (var j = 0; j < self.d_facesparts.length; j++) {
            for (var i = 0; i < self.d_facesparts_imgs[j].length; i++) {
              if (i == 0) $(self.d_facesparts_imgs[j][i]).css({ zIndex: 10 });

              $(self.d_facesparts_imgs[j][i]).css({ top: 0 });
            }
          }

          self.full_scroll_nr = 0;
          self.scroll_face(top, callback);
        }
      }
    }
  });
};

//-------------------------------------------------------------------
faces.prototype.scrolldown_arange_before = function () {
  var self = this;

  for (var j = 0; j < self.d_facesparts.length; j++) {
    for (var i = 0; i < self.full_scroll_nr; i++) {
      if (i == 0) $(self.d_facesparts_imgs[j][i]).css({ zIndex: 10 });

      $(self.d_facesparts_imgs[j][i]).css({ top: self.block_min_h * self.face_parts_scroll_ratio[j] });
    }
  }

  self.full_scroll_nr = 0;
};

//-------------------------------------------------------------------
faces.prototype.scrolldown_arange_after = function () {
  var self = this;

  for (var j = 0; j < self.d_facesparts.length; j++) {
    var k = self.d_facesparts_imgs[j].length - 1;

    $(self.d_facesparts_imgs[j][k]).css({ top: self.block_min_h * self.face_parts_scroll_ratio[j] });
    $(self.d_facesparts_imgs[j][0]).css('z-index', '');
  }
  self.full_scroll_nr = 0;
};

//-------------------------------------------------------------------
faces.prototype.scroll_to = function (nr) {
  var self = this;

  if (nr - 1 == self.full_scroll_nr) return;

  if (nr > this.full_scroll_nr) {
    this.full_scroll_nr = nr - 1;
    this.scroll_face(0);
  } else {
    for (var j = 0; j < this.d_facesparts.length; j++) {
      for (var i = nr; i < this.full_scroll_nr; i++) {
        $(this.d_facesparts_imgs[j][i]).css({ top: self.block_min_h * this.face_parts_scroll_ratio[j] });
      }
    }

    this.scroll_face(self.block_min_h);
    this.full_scroll_nr = nr;
  }
};

//-------------------------------------------------------------------
faces.prototype.scroll_face = function (top, callback, autoscroll) {
  var self = this;
  this.scrolled_parts = 0;
  var new_top;

  self.can_scroll = 0;

  var speed = 500;

  for (var i = this.d_facesparts.length - 1; i >= 0; i--) {
    var img = this.d_facesparts_imgs[i][this.full_scroll_nr];
    new_top = top * this.face_parts_scroll_ratio[i];

    if (autoscroll != undefined) var time = (this.d_facesparts.length - i) * 600;
    else var time = 0;

    self.scroll_face_part(img, new_top, callback, time);
  }
};

//-------------------------------------------------------------------
faces.prototype.scroll_face_part = function (img, new_top, callback, timeout) {
  var self = this;

  setTimeout(function () {
    $(img).animate({ top: new_top }, 500, function () {
      self.scrolled_parts++;

      // suvaziavo visos dalys
      if (self.scrolled_parts == self.d_facesparts.length) {
        if (callback) callback();

        self.can_scroll = 1;

        // auto scrollas iki paskutinio slide'o
        if (self.full_scroll_nr >= self.menu_shows_on_slidenr && !self.menu_active) {
          self.activate_menu();
        }
      }
    });
  }, timeout);
};

//-------------------------------------------------------------------
faces.prototype.autoscroll_face = function (top, callback) {
  var self = this;

  if (this.disabled) return;

  if (self.can_scroll) {
    // ne paskutinis elementas
    if (self.full_scroll_nr + 1 < self.d_facesparts_imgs[0].length) {
      self.full_scroll_nr++;
    }
    // paskutinis elementas
    else {
      callback = function () {
        self.scrolldown_arange_after();
      };
      self.scrolldown_arange_before();
    }

    self.scroll_face(0, callback, true);
  }

  self.set_autoscroll_timeout();
};

//-------------------------------------------------------------------
faces.prototype.set_autoscroll_timeout = function () {
  var self = this;
  this.autoscroll_timeout = setTimeout(function () {
    self.autoscroll_face();
  }, 7000);
};

//-------------------------------------------------------------------
faces.prototype.activate_menu = function (no_animation) {
  var self = this;
  self.menu_active = true;

  if (no_animation != undefined) {
    self.d_menu.css({ display: 'block' });
    return;
  } else {
    setTimeout(function () {
      self.d_menu.css({ opacity: 0, display: 'block' });
      self.d_menu.animate({ opacity: 1, avoidTransforms: true }, 500);
    }, 100);
  }

  self.d_scrolld.animate({ opacity: 0, avoidTransforms: true }, 500, function () {
    $(this).hide();
  });

  jQuery.ajax({
    cache: false,
    url: url_participate + '/set_menu_visible',
    success: function (data) {},
  });
};

//-------------------------------------------------------------------
faces.prototype.resize_event = function () {
  var self = this;

  var rtime = new Date(1, 1, 2000, 12, 00, 00);
  var timeout = false;
  var delta = 200;

  $(window).resize(function () {
    rtime = new Date();
    if (timeout === false) {
      timeout = true;
      setTimeout(resizeend, delta);
    }
  });

  function resizeend() {
    if (new Date() - rtime < delta) {
      setTimeout(resizeend, delta);
    } else {
      timeout = false;
      self.calculate_sizes();
      self.resize_elements();

      window.scrollTo(0, self.scroll_pause / 100);
    }
  }
};
