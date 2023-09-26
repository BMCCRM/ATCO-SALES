/*
 * jqModal - Minimalist Modaling with jQuery
 *   (http://dev.iceburg.net/jquery/jqModal/)
 *
 * Copyright (c) 2007,2008 Brice Burgess <bhb@iceburg.net>
 * Dual licensed under the MIT and GPL licenses:
 *   http://www.opensource.org/licenses/mit-license.php
 *   http://www.gnu.org/licenses/gpl.html
 * 
 * $oldVersion: 03/01/2009 +r14
 */
(function ($) {
    $old.fn.jqm = function (o) {
        var p = {
            overlay: 60,
            overlayClass: 'jqmOverlay',
            closeClass: 'jqmClose',
            trigger: '.jqModal',
            ajax: F,
            ajaxText: '',
            target: F,
            modal: F,
            toTop: F,
            onShow: F,
            onHide: F,
            onLoad: F
        };
        return this.each(function () {
            if (this._jqm) return H[this._jqm].c = $old.extend({}, H[this._jqm].c, o); s++; this._jqm = s;
            H[s] = { c: $old.extend(p, $old.jqm.params, o), a: F, w: $old(this).addClass('jqmID' + s), s: s };
            if (p.trigger) $old(this).jqmAddTrigger(p.trigger);
        });
    };

    $old.fn.jqmAddClose = function (e) { return hs(this, e, 'jqmHide'); };
    $old.fn.jqmAddTrigger = function (e) { return hs(this, e, 'jqmShow'); };
    $old.fn.jqmShow = function (t) { return this.each(function () { t = t || window.event; $old.jqm.open(this._jqm, t); }); };
    $old.fn.jqmHide = function (t) { return this.each(function () { t = t || window.event; $old.jqm.close(this._jqm, t) }); };

    $old.jqm = {
        hash: {},
        open: function (s, t) {
            var h = H[s], c = h.c, cc = '.' + c.closeClass, z = (parseInt(h.w.css('z-index'))), z = (z > 0) ? z : 3000, o = $old('<div></div>').css({ height: '100%', width: '100%', position: 'fixed', left: 0, top: 0, 'z-index': z - 1, opacity: c.overlay / 100 }); if (h.a) return F; h.t = t; h.a = true; h.w.css('z-index', z);
            if (c.modal) { if (!A[0]) L('bind'); A.push(s); }
            else if (c.overlay > 0) h.w.jqmAddClose(o);
            else o = F;

            h.o = (o) ? o.addClass(c.overlayClass).prependTo('body') : F;
            if (ie6) { $old('html,body').css({ height: '100%', width: '100%' }); if (o) { o = o.css({ position: 'absolute' })[0]; for (var y in { Top: 1, Left: 1 }) o.style.setExpression(y.toLowerCase(), "(_=(document.documentElement.scroll" + y + " || document.body.scroll" + y + "))+'px'"); } }

            if (c.ajax) {
                var r = c.target || h.w, u = c.ajax, r = (typeof r == 'string') ? $old(r, h.w) : $old(r), u = (u.substr(0, 1) == '@') ? $old(t).attr(u.substring(1)) : u;
                r.html(c.ajaxText).load(u, function () { if (c.onLoad) c.onLoad.call(this, h); if (cc) h.w.jqmAddClose($old(cc, h.w)); e(h); });
            }
            else if (cc) h.w.jqmAddClose($old(cc, h.w));

            if (c.toTop && h.o) h.w.before('<span id="jqmP' + h.w[0]._jqm + '"></span>').insertAfter(h.o);
            (c.onShow) ? c.onShow(h) : h.w.show(); e(h); return F;
        },
        close: function (s) {
            var h = H[s]; if (!h.a) return F; h.a = F;
            if (A[0]) { A.pop(); if (!A[0]) L('unbind'); }
            if (h.c.toTop && h.o) $old('#jqmP' + h.w[0]._jqm).after(h.w).remove();
            if (h.c.onHide) h.c.onHide(h); else { h.w.hide(); if (h.o) h.o.remove(); } return F;
        },
        params: {}
    };
    var s = 0, H = $old.jqm.hash, A = [], ie6 = $old.browser.msie && ($old.browser.version == "6.0"), F = false,
    i = $old('<iframe src="javascript:false;document.write(\'\');" class="jqm"></iframe>').css({ opacity: 0 }),
    e = function (h) { if (ie6) if (h.o) h.o.html('<p style="width:100%;height:100%"/>').prepend(i); else if (!$old('iframe.jqm', h.w)[0]) h.w.prepend(i); f(h); },
    f = function (h) { try { $old(':input:visible', h.w)[0].focus(); } catch (_) { } },
    L = function (t) { $old()[t]("keypress", m)[t]("keydown", m)[t]("mousedown", m); },
    m = function (e) { var h = H[A[A.length - 1]], r = (!$old(e.target).parents('.jqmID' + h.s)[0]); if (r) f(h); return !r; },
    hs = function (w, t, c) {
        return w.each(function () {
            var s = this._jqm; $old(t).each(function () {
                if (!this[c]) { this[c] = []; $old(this).click(function () { for (var i in { jqmShow: 1, jqmHide: 1 }) for (var s in this[i]) if (H[this[i][s]]) H[this[i][s]].w[i](this); return F; }); } this[c].push(s);
            });
        });
    };
})(jQuery);