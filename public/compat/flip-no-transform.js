/*
  Transform-free flip() shim for BP3DJS legacy app.
  ------------------------------------------------
  Why: jquery.flip performs CSS 3D transforms which can break mouse/pointer math
  in WebGL viewers (cursor/raycast offset). This shim keeps the exact API used by
  /public/js/app.js while replacing the implementation with simple show/hide.

  It supports:
    $('.card').flip({trigger:'manual', axis:'x'});  // init (ignored)
    $('.card').flip(true);                         // show back
    $('.card').flip(false);                        // show front

  The shim toggles the 'is-flipped' class on the card element.
*/

(function () {
  function install($) {
    if (!$ || !$.fn) return;

    // Avoid double-install.
    if ($.fn.__acFlipNoTransformInstalled) return;
    $.fn.__acFlipNoTransformInstalled = true;

    function applyState($el, flipped) {
      $el.toggleClass('is-flipped', !!flipped);

      var $front = $el.find('> .front').first();
      var $back = $el.find('> .back').first();

      // Fallback: if direct children aren't used, try any .front/.back.
      if ($front.length === 0) $front = $el.find('.front').first();
      if ($back.length === 0) $back = $el.find('.back').first();

      if ($front.length) $front.css('display', flipped ? 'none' : 'block');
      if ($back.length) $back.css('display', flipped ? 'block' : 'none');
    }

    $.fn.flip = function (arg) {
      // Init call: $('.card').flip({trigger:'manual', axis:'x'})
      if (arg == null || (typeof arg === 'object' && arg !== true && arg !== false)) {
        return this.each(function () {
          var $el = $(this);
          $el.addClass('ac-noflip');
          // Ensure a deterministic initial state (front visible)
          applyState($el, false);
          $el.data('acFlipInited', true);
        });
      }

      // State call: $('.card').flip(true/false)
      if (typeof arg === 'boolean') {
        return this.each(function () {
          applyState($(this), arg);
        });
      }

      // Unknown args: no-op for compatibility
      return this;
    };
  }

  function wait() {
    var $ = window.jQuery;
    if ($ && $.fn) {
      install($);
      return;
    }
    setTimeout(wait, 30);
  }

  wait();
})();
