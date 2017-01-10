"use strict";

! function(a) {
    "function" == typeof define && define.amd ? define(["jquery"], a) : a(jQuery);
}(function(a) {
    function b(a) {
        m.Plugins[a].initialized || (m.Plugins[a].methods._setup.call(document), m.Plugins[a].initialized = !0);
    }

    function c(a, b, c, d) {
        var e, f = {
            raw: {}
        };
        d = d || {};
        for (e in d) d.hasOwnProperty(e) && ("classes" === a ? (f.raw[d[e]] = b + "-" + d[e],
            f[d[e]] = "." + b + "-" + d[e]) : (f.raw[e] = d[e], f[e] = d[e] + "." + b));
        for (e in c) c.hasOwnProperty(e) && ("classes" === a ? (f.raw[e] = c[e].replace(/{ns}/g, b),
            f[e] = c[e].replace(/{ns}/g, "." + b)) : (f.raw[e] = c[e].replace(/.{ns}/g, ""),
            f[e] = c[e].replace(/{ns}/g, b)));
        return f;
    }

    function d() {
        var a, b = {
                WebkitTransition: "webkitTransitionEnd",
                MozTransition: "transitionend",
                OTransition: "otransitionend",
                transition: "transitionend"
            },
            c = ["transition", "-webkit-transition"],
            d = {
                transform: "transform",
                MozTransform: "-moz-transform",
                OTransform: "-o-transform",
                msTransform: "-ms-transform",
                webkitTransform: "-webkit-transform"
            },
            e = "transitionend",
            f = "",
            g = "",
            h = document.createElement("div");
        for (a in b)
            if (b.hasOwnProperty(a) && a in h.style) {
                e = b[a], m.support.transition = !0;
                break;
            }
        p.transitionEnd = e + ".{ns}";
        for (a in c)
            if (c.hasOwnProperty(a) && c[a] in h.style) {
                f = c[a];
                break;
            }
        m.transition = f;
        for (a in d)
            if (d.hasOwnProperty(a) && d[a] in h.style) {
                m.support.transform = !0, g = d[a];
                break;
            }
        m.transform = g;
    }

    function e() {
        m.windowWidth = m.$window.width(), m.windowHeight = m.$window.height(), q = l.startTimer(q, r, f);
    }

    function f() {
        for (var a in m.ResizeHandlers) m.ResizeHandlers.hasOwnProperty(a) && m.ResizeHandlers[a].callback.call(window, m.windowWidth, m.windowHeight);
    }

    function g() {
        if (m.support.raf) {
            m.window.requestAnimationFrame(g);
            for (var a in m.RAFHandlers) m.RAFHandlers.hasOwnProperty(a) && m.RAFHandlers[a].callback.call(window);
        }
    }

    function h(a, b) {
        return parseInt(a.priority) - parseInt(b.priority);
    }
    var i = "undefined" != typeof window ? window : this,
        j = i.document,
        k = function() {
            this.Version = "1.3.0", this.Plugins = {}, this.DontConflict = !1, this.Conflicts = {
                    fn: {}
                }, this.ResizeHandlers = [], this.RAFHandlers = [], this.window = i, this.$window = a(i),
                this.document = j, this.$document = a(j), this.$body = null, this.windowWidth = 0,
                this.windowHeight = 0, this.fallbackWidth = 1024, this.fallbackHeight = 768, this.userAgent = window.navigator.userAgent || window.navigator.vendor || window.opera,
                this.isFirefox = /Firefox/i.test(this.userAgent), this.isChrome = /Chrome/i.test(this.userAgent),
                this.isSafari = /Safari/i.test(this.userAgent) && !this.isChrome, this.isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(this.userAgent),
                this.isIEMobile = /IEMobile/i.test(this.userAgent), this.isFirefoxMobile = this.isFirefox && this.isMobile,
                this.transform = null, this.transition = null, this.support = {
                    file: !!(window.File && window.FileList && window.FileReader),
                    history: !!(window.history && window.history.pushState && window.history.replaceState),
                    matchMedia: !(!window.matchMedia && !window.msMatchMedia),
                    pointer: !!window.PointerEvent,
                    raf: !(!window.requestAnimationFrame || !window.cancelAnimationFrame),
                    touch: !!("ontouchstart" in window || window.DocumentTouch && document instanceof window.DocumentTouch),
                    transition: !1,
                    transform: !1
                };
        },
        l = {
            killEvent: function(a, b) {
                try {
                    a.preventDefault(), a.stopPropagation(), b && a.stopImmediatePropagation();
                } catch (a) {}
            },
            startTimer: function(a, b, c, d) {
                return l.clearTimer(a), d ? setInterval(c, b) : setTimeout(c, b);
            },
            clearTimer: function(a, b) {
                a && (b ? clearInterval(a) : clearTimeout(a), a = null);
            },
            sortAsc: function(a, b) {
                return parseInt(a, 10) - parseInt(b, 10);
            },
            sortDesc: function(a, b) {
                return parseInt(b, 10) - parseInt(a, 10);
            },
            decodeEntities: function(a) {
                var b = m.document.createElement("textarea");
                return b.innerHTML = a, b.value;
            },
            parseQueryString: function(a) {
                for (var b = {}, c = a.slice(a.indexOf("?") + 1).split("&"), d = 0; d < c.length; d++) {
                    var e = c[d].split("=");
                    b[e[0]] = e[1];
                }
                return b;
            }
        },
        m = new k(),
        n = a.Deferred(),
        o = {
            base: "{ns}",
            element: "{ns}-element"
        },
        p = {
            namespace: ".{ns}",
            beforeUnload: "beforeunload.{ns}",
            blur: "blur.{ns}",
            change: "change.{ns}",
            click: "click.{ns}",
            dblClick: "dblclick.{ns}",
            drag: "drag.{ns}",
            dragEnd: "dragend.{ns}",
            dragEnter: "dragenter.{ns}",
            dragLeave: "dragleave.{ns}",
            dragOver: "dragover.{ns}",
            dragStart: "dragstart.{ns}",
            drop: "drop.{ns}",
            error: "error.{ns}",
            focus: "focus.{ns}",
            focusIn: "focusin.{ns}",
            focusOut: "focusout.{ns}",
            input: "input.{ns}",
            keyDown: "keydown.{ns}",
            keyPress: "keypress.{ns}",
            keyUp: "keyup.{ns}",
            load: "load.{ns}",
            mouseDown: "mousedown.{ns}",
            mouseEnter: "mouseenter.{ns}",
            mouseLeave: "mouseleave.{ns}",
            mouseMove: "mousemove.{ns}",
            mouseOut: "mouseout.{ns}",
            mouseOver: "mouseover.{ns}",
            mouseUp: "mouseup.{ns}",
            panStart: "panstart.{ns}",
            pan: "pan.{ns}",
            panEnd: "panend.{ns}",
            resize: "resize.{ns}",
            scaleStart: "scalestart.{ns}",
            scaleEnd: "scaleend.{ns}",
            scale: "scale.{ns}",
            scroll: "scroll.{ns}",
            select: "select.{ns}",
            swipe: "swipe.{ns}",
            touchCancel: "touchcancel.{ns}",
            touchEnd: "touchend.{ns}",
            touchLeave: "touchleave.{ns}",
            touchMove: "touchmove.{ns}",
            touchStart: "touchstart.{ns}"
        };
    k.prototype.NoConflict = function() {
        m.DontConflict = !0;
        for (var b in m.Plugins) m.Plugins.hasOwnProperty(b) && (a[b] = m.Conflicts[b],
            a.fn[b] = m.Conflicts.fn[b]);
    }, k.prototype.Plugin = function(d, e) {
        return m.Plugins[d] = function(b, d) {
            function e(c) {
                var e, f, h, i = "object" === a.type(c),
                    j = this,
                    k = a();
                for (c = a.extend(!0, {}, d.defaults || {}, i ? c : {}), f = 0, h = j.length; f < h; f++)
                    if (e = j.eq(f), !g(e)) {
                        var l = "__" + d.guid++,
                            m = d.classes.raw.base + l,
                            n = e.data(b + "-options"),
                            o = a.extend(!0, {
                                $el: e,
                                guid: l,
                                rawGuid: m,
                                dotGuid: "." + m
                            }, c, "object" === a.type(n) ? n : {});
                        e.addClass(d.classes.raw.element).data(r, o), d.methods._construct.apply(e, [o].concat(Array.prototype.slice.call(arguments, i ? 1 : 0))),
                            k = k.add(e);
                    }
                for (f = 0, h = k.length; f < h; f++) e = k.eq(f), d.methods._postConstruct.apply(e, [g(e)]);
                return j;
            }

            function f(a) {
                d.functions.iterate.apply(this, [d.methods._destruct].concat(Array.prototype.slice.call(arguments, 1))),
                    this.removeClass(d.classes.raw.element).removeData(r);
            }

            function g(a) {
                return a.data(r);
            }

            function i(b) {
                if (this instanceof a) {
                    var c = d.methods[b];
                    return "object" !== a.type(b) && b ? c && 0 !== b.indexOf("_") ? d.functions.iterate.apply(this, [c].concat(Array.prototype.slice.call(arguments, 1))) : this : e.apply(this, arguments);
                }
            }

            function j(b) {
                var c = d.utilities[b] || d.utilities._initialize || !1;
                if (c) return c.apply(window, Array.prototype.slice.call(arguments, "object" === a.type(b) ? 0 : 1));
            }

            function k(b) {
                d.defaults = a.extend(!0, d.defaults, b || {});
            }

            function n(b) {
                for (var c = this, d = 0, e = c.length; d < e; d++) {
                    var f = c.eq(d),
                        h = g(f) || {};
                    "undefined" !== a.type(h.$el) && b.apply(f, [h].concat(Array.prototype.slice.call(arguments, 1)));
                }
                return c;
            }
            var q = "fs-" + b,
                r = "fs" + b.replace(/(^|\s)([a-z])/g, function(a, b, c) {
                    return b + c.toUpperCase();
                });
            return d.initialized = !1, d.priority = d.priority || 10, d.classes = c("classes", q, o, d.classes),
                d.events = c("events", b, p, d.events), d.functions = a.extend({
                    getData: g,
                    iterate: n
                }, l, d.functions), d.methods = a.extend(!0, {
                    _setup: a.noop,
                    _construct: a.noop,
                    _postConstruct: a.noop,
                    _destruct: a.noop,
                    _resize: !1,
                    destroy: f
                }, d.methods), d.utilities = a.extend(!0, {
                    _initialize: !1,
                    _delegate: !1,
                    defaults: k
                }, d.utilities), d.widget && (m.Conflicts.fn[b] = a.fn[b], a.fn[r] = i, m.DontConflict || (a.fn[b] = a.fn[r])),
                m.Conflicts[b] = a[b], a[r] = d.utilities._delegate || j, m.DontConflict || (a[b] = a[r]),
                d.namespace = b, d.namespaceClean = r, d.guid = 0, d.methods._resize && (m.ResizeHandlers.push({
                    namespace: b,
                    priority: d.priority,
                    callback: d.methods._resize
                }), m.ResizeHandlers.sort(h)), d.methods._raf && (m.RAFHandlers.push({
                    namespace: b,
                    priority: d.priority,
                    callback: d.methods._raf
                }), m.RAFHandlers.sort(h)), d;
        }(d, e), n.then(function() {
            b(d);
        }), m.Plugins[d];
    };
    var q = null,
        r = 20;
    return m.$window.on("resize.fs", e), e(), g(), a(function() {
            m.$body = a("body"), n.resolve(), m.support.nativeMatchMedia = m.support.matchMedia && !a("html").hasClass("no-matchmedia");
        }), p.clickTouchStart = p.click + " " + p.touchStart, d(), window.Formstone = m,
        m;
}),
function(a) {
    function b(a) {
        return new RegExp("(^|\\s+)" + a + "(\\s+|$)");
    }

    function c(a, b) {
        var c = d(a, b) ? f : e;
        c(a, b);
    }
    var d, e, f;
    "classList" in document.documentElement ? (d = function(a, b) {
        return a.classList.contains(b);
    }, e = function(a, b) {
        a.classList.add(b);
    }, f = function(a, b) {
        a.classList.remove(b);
    }) : (d = function(a, c) {
        return b(c).test(a.className);
    }, e = function(a, b) {
        d(a, b) || (a.className = a.className + " " + b);
    }, f = function(a, c) {
        a.className = a.className.replace(b(c), " ");
    });
    var g = {
        hasClass: d,
        addClass: e,
        removeClass: f,
        toggleClass: c,
        has: d,
        add: e,
        remove: f,
        toggle: c
    };
    "function" == typeof define && define.amd ? define(g) : "object" == typeof exports ? module.exports = g : a.classie = g;
}(window);

var cbpAnimatedHeader = function() {
    function a() {
        window.addEventListener("scroll", function(a) {
            f || (f = !0, setTimeout(b, 250));
        }, !1);
    }

    function b() {
        var a = c();
        a >= g ? classie.remove(e, "navbar-expanded") : classie.add(e, "navbar-expanded"),
            f = !1;
    }

    function c() {
        return window.pageYOffset || d.scrollTop;
    }
    var d = document.documentElement,
        e = document.querySelector(".navbar-fixed-top"),
        f = !1,
        g = 200;
    a();
}();

! function(a) {
    "function" == typeof define && define.amd ? define(["jquery", "./core", "./transition"], a) : a(jQuery, Formstone);
}(function(a, b) {
    function c() {
        e(), G.on("scroll", e);
    }

    function d() {
        E.iterate.call(I, v), E.iterate.call(J, x), E.iterate.call(J, y);
    }

    function e() {
        H = G.scrollTop() + b.windowHeight, H < 0 && (H = 0), E.iterate.call(J, y);
    }

    function f() {
        I = a(B.base), J = a(B.lazy), E.iterate.call(J, x);
    }

    function g(b) {
        b.youTubeGuid = 0, b.$container = a('<div class="' + C.container + '"></div>').appendTo(this),
            b.thisClasses = [C.base, b.customClass], b.visible = !0, b.lazy && (b.visible = !1,
                b.thisClasses.push(C.lazy)), this.addClass(b.thisClasses.join(" ")), f(), b.lazy ? (x(b),
                y(b)) : i(b);
    }

    function h(a) {
        a.$container.remove(), this.removeClass(a.thisClasses.join(" ")).off(D.namespace),
            f();
    }

    function i(a) {
        if (a.visible) {
            var b = a.source;
            a.source = null, j(a, b, !0);
        }
    }

    function j(b, c, d) {
        if (c !== b.source && b.visible) {
            if (b.source = c, b.responsive = !1, b.isYouTube = !1, "object" === a.type(c) && "string" === a.type(c.video)) {
                var e = c.video.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/ ]{11})/i);
                e && e.length >= 1 && (b.isYouTube = !0, b.videoId = e[1]);
            }
            var f = !b.isYouTube && "object" === a.type(c) && (c.hasOwnProperty("mp4") || c.hasOwnProperty("ogg") || c.hasOwnProperty("webm"));
            if (b.video = b.isYouTube || f, b.playing = !1, b.isYouTube) b.playerReady = !1,
                b.posterLoaded = !1, n(b, c, d);
            else if ("object" === a.type(c) && c.hasOwnProperty("poster")) m(b, c, d);
            else {
                var g = c;
                if ("object" === a.type(c)) {
                    var h, i = [],
                        j = [];
                    for (h in c) c.hasOwnProperty(h) && j.push(h);
                    j.sort(E.sortAsc);
                    for (h in j) j.hasOwnProperty(h) && i.push({
                        width: parseInt(j[h]),
                        url: c[j[h]],
                        mq: F.matchMedia("(min-width: " + parseInt(j[h]) + "px)")
                    });
                    b.responsive = !0, b.sources = i, g = k(b);
                }
                l(b, g, !1, d);
            }
        } else b.$el.trigger(D.loaded);
    }

    function k(a) {
        var c = a.source;
        if (a.responsive) {
            c = a.sources[0].url;
            for (var d in a.sources) a.sources.hasOwnProperty(d) && (b.support.nativeMatchMedia ? a.sources[d].mq.matches && (c = a.sources[d].url) : a.sources[d].width < b.fallbackWidth && (c = a.sources[d].url));
        }
        return c;
    }

    function l(b, c, d, e) {
        var f = [C.media, C.image, e !== !0 ? C.animated : ""].join(" "),
            g = a('<div class="' + f + '" aria-hidden="true"><img alt=""></div>'),
            h = g.find("img"),
            i = c;
        h.one(D.load, function() {
                K && g.addClass(C.native).css({
                    backgroundImage: "url('" + i + "')"
                }), g.fsTransition({
                    property: "opacity"
                }, function() {
                    d || o(b);
                }).css({
                    opacity: 1
                }), w(b), d && !e || b.$el.trigger(D.loaded);
            }).one(D.error, b, p).attr("src", i), b.responsive && g.addClass(C.responsive),
            b.$container.append(g), (h[0].complete || 4 === h[0].readyState) && h.trigger(D.load),
            b.currentSource = i;
    }

    function m(c, d, e) {
        if (c.source && c.source.poster && (l(c, c.source.poster, !0, !0), e = !1), !b.isMobile) {
            var f = [C.media, C.video, e !== !0 ? C.animated : ""].join(" "),
                g = '<div class="' + f + '" aria-hidden="true">';
            g += "<video", c.loop && (g += " loop"), c.mute && (g += " muted"), g += ">", c.source.webm && (g += '<source src="' + c.source.webm + '" type="video/webm" />'),
                c.source.mp4 && (g += '<source src="' + c.source.mp4 + '" type="video/mp4" />'),
                c.source.ogg && (g += '<source src="' + c.source.ogg + '" type="video/ogg" />'),
                g += "</video>", g += "</div>";
            var h = a(g),
                i = h.find("video");
            i.one(D.loadedMetaData, function(a) {
                h.fsTransition({
                    property: "opacity"
                }, function() {
                    o(c);
                }).css({
                    opacity: 1
                }), w(c), c.$el.trigger(D.loaded), c.autoPlay && s(c);
            }), c.$container.append(h);
        }
    }

    function n(c, d, e) {
        if (!c.videoId) {
            var f = d.match(/^.*(?:youtu.be\/|v\/|e\/|u\/\w+\/|embed\/|v=)([^#\&\?]*).*/);
            c.videoId = f[1];
        }
        if (c.posterLoaded || (c.source.poster || (c.source.poster = "//img.youtube.com/vi/" + c.videoId + "/0.jpg"),
                c.posterLoaded = !0, l(c, c.source.poster, !0, e), e = !1), !b.isMobile)
            if (a("script[src*='youtube.com/iframe_api']").length || a("head").append('<script src="//www.youtube.com/iframe_api"></script>'),
                L) {
                var g = c.guid + "_" + c.youTubeGuid++,
                    h = [C.media, C.embed, e !== !0 ? C.animated : ""].join(" "),
                    i = '<div class="' + h + '" aria-hidden="true">';
                i += '<div id="' + g + '"></div>', i += "</div>";
                var j = a(i),
                    k = a.extend(!0, {}, {
                        controls: 0,
                        rel: 0,
                        showinfo: 0,
                        wmode: "transparent",
                        enablejsapi: 1,
                        version: 3,
                        playerapiid: g,
                        loop: c.loop ? 1 : 0,
                        autoplay: 1,
                        origin: F.location.protocol + "//" + F.location.host
                    }, c.youtubeOptions);
                k.autoplay = 1, c.$container.append(j), c.player && (c.oldPlayer = c.player, c.player = null),
                    c.player = new F.YT.Player(g, {
                        videoId: c.videoId,
                        playerVars: k,
                        events: {
                            onReady: function(a) {
                                c.playerReady = !0, c.mute && c.player.mute(), c.autoPlay || c.player.pauseVideo();
                            },
                            onStateChange: function(a) {
                                c.playing || a.data !== F.YT.PlayerState.PLAYING ? c.loop && c.playing && a.data === F.YT.PlayerState.ENDED && c.player.playVideo() : (c.playing = !0,
                                    j.fsTransition({
                                        property: "opacity"
                                    }, function() {
                                        o(c);
                                    }).css({
                                        opacity: 1
                                    }), w(c), c.$el.trigger(D.loaded)), c.$el.find(B.embed).addClass(C.ready);
                            },
                            onPlaybackQualityChange: function(a) {},
                            onPlaybackRateChange: function(a) {},
                            onError: function(a) {
                                p({
                                    data: c
                                });
                            },
                            onApiChange: function(a) {}
                        }
                    }), w(c);
            } else M.push({
                data: c,
                source: d
            });
    }

    function o(a) {
        var b = a.$container.find(B.media);
        b.length >= 1 && (b.not(":last").remove(), a.oldPlayer = null);
    }

    function p(a) {
        var b = a.data;
        b.$el.trigger(D.error);
    }

    function q(a) {
        var b = a.$container.find(B.media);
        b.length >= 1 && b.fsTransition({
            property: "opacity"
        }, function() {
            b.remove(), delete a.source;
        }).css({
            opacity: 0
        });
    }

    function r(a) {
        if (a.video && a.playing) {
            if (a.isYouTube) a.playerReady ? a.player.pauseVideo() : a.autoPlay = !1;
            else {
                var b = a.$container.find("video");
                b.length && b[0].pause();
            }
            a.playing = !1;
        }
    }

    function s(a) {
        if (a.video && !a.playing)
            if (a.isYouTube) a.playerReady ? a.player.playVideo() : a.autoPlay = !0;
            else {
                var b = a.$container.find("video");
                b.length && b[0].play(), a.playing = !0;
            }
    }

    function t(a) {
        if (a.video)
            if (a.isYouTube && a.playerReady) a.player.mute();
            else {
                var b = a.$container.find("video");
                b.length && (b[0].muted = !0);
            }
        a.mute = !0;
    }

    function u(a) {
        if (a.video) {
            if (a.isYouTube && a.playerReady) a.player.unMute();
            else {
                var b = a.$container.find("video");
                b.length && (b[0].muted = !1);
            }
            a.playing = !0;
        }
        a.mute = !1;
    }

    function v(a) {
        if (a.visible)
            if (a.responsive) {
                var b = k(a);
                b !== a.currentSource ? l(a, b, !1, !0) : w(a);
            } else w(a);
    }

    function w(a) {
        for (var b = a.$container.find(B.media), c = 0, d = b.length; c < d; c++) {
            var e = b.eq(c),
                f = a.isYouTube ? "iframe" : e.find("video").length ? "video" : "img",
                g = e.find(f);
            if (g.length && ("img" !== f || !K)) {
                var h = a.$el.outerWidth(),
                    i = a.$el.outerHeight(),
                    j = z(a, g);
                a.width = j.width, a.height = j.height, a.left = 0, a.top = 0;
                var k = a.isYouTube ? a.embedRatio : a.width / a.height;
                a.height = i, a.width = a.height * k, a.width < h && (a.width = h, a.height = a.width / k),
                    a.left = -(a.width - h) / 2, a.top = -(a.height - i) / 2, e.css({
                        height: a.height,
                        width: a.width,
                        left: a.left,
                        top: a.top
                    });
            }
        }
    }

    function x(a) {
        a.scrollTop = a.$el.offset().top;
    }

    function y(a) {
        !a.visible && a.scrollTop < H + a.lazyEdge && (a.visible = !0, i(a));
    }

    function z(b, c) {
        if (b.isYouTube) return {
            height: 500,
            width: 500 / b.embedRatio
        };
        if (c.is("img")) {
            var d = c[0];
            if ("undefined" !== a.type(d.naturalHeight)) return {
                height: d.naturalHeight,
                width: d.naturalWidth
            };
            var e = new Image();
            return e.src = d.src, {
                height: e.height,
                width: e.width
            };
        }
        return {
            height: c[0].videoHeight,
            width: c[0].videoWidth
        };
    }
    var A = b.Plugin("background", {
            widget: !0,
            defaults: {
                autoPlay: !0,
                customClass: "",
                embedRatio: 1.777777,
                lazy: !1,
                lazyEdge: 100,
                loop: !0,
                mute: !0,
                source: null,
                youtubeOptions: {}
            },
            classes: ["container", "media", "animated", "responsive", "native", "fixed", "ready", "lazy"],
            events: {
                loaded: "loaded",
                ready: "ready",
                loadedMetaData: "loadedmetadata"
            },
            methods: {
                _setup: c,
                _construct: g,
                _destruct: h,
                _resize: d,
                play: s,
                pause: r,
                mute: t,
                unmute: u,
                resize: w,
                load: j,
                unload: q
            }
        }),
        B = A.classes,
        C = B.raw,
        D = A.events,
        E = A.functions,
        F = b.window,
        G = b.$window,
        H = 0,
        I = [],
        J = [],
        K = "backgroundSize" in b.document.documentElement.style,
        L = !1,
        M = [];
    F.onYouTubeIframeAPIReady = function() {
        L = !0;
        for (var a in M) M.hasOwnProperty(a) && n(M[a].data, M[a].source);
        M = [];
    };
}), "function" != typeof Object.create && (Object.create = function(a) {
        function b() {}
        return b.prototype = a, new b();
    }),
    function(a, b, c) {
        var d = {
            init: function(b, c) {
                var d = this;
                d.$elem = a(c), d.options = a.extend({}, a.fn.owlCarousel.options, d.$elem.data(), b),
                    d.userOptions = b, d.loadContent();
            },
            loadContent: function() {
                function b(a) {
                    var b, c = "";
                    if ("function" == typeof d.options.jsonSuccess) d.options.jsonSuccess.apply(this, [a]);
                    else {
                        for (b in a.owl) a.owl.hasOwnProperty(b) && (c += a.owl[b].item);
                        d.$elem.html(c);
                    }
                    d.logIn();
                }
                var c, d = this;
                "function" == typeof d.options.beforeInit && d.options.beforeInit.apply(this, [d.$elem]),
                    "string" == typeof d.options.jsonPath ? (c = d.options.jsonPath, a.getJSON(c, b)) : d.logIn();
            },
            logIn: function() {
                var a = this;
                a.$elem.data("owl-originalStyles", a.$elem.attr("style")).data("owl-originalClasses", a.$elem.attr("class")),
                    a.$elem.css({
                        opacity: 0
                    }), a.orignalItems = a.options.items, a.checkBrowser(), a.wrapperWidth = 0, a.checkVisible = null,
                    a.setVars();
            },
            setVars: function() {
                var a = this;
                return 0 !== a.$elem.children().length && (a.baseClass(), a.eventTypes(), a.$userItems = a.$elem.children(),
                    a.itemsAmount = a.$userItems.length, a.wrapItems(), a.$owlItems = a.$elem.find(".owl-item"),
                    a.$owlWrapper = a.$elem.find(".owl-wrapper"), a.playDirection = "next", a.prevItem = 0,
                    a.prevArr = [0], a.currentItem = 0, a.customEvents(), void a.onStartup());
            },
            onStartup: function() {
                var a = this;
                a.updateItems(), a.calculateAll(), a.buildControls(), a.updateControls(), a.response(),
                    a.moveEvents(), a.stopOnHover(), a.owlStatus(), a.options.transitionStyle !== !1 && a.transitionTypes(a.options.transitionStyle),
                    a.options.autoPlay === !0 && (a.options.autoPlay = 5e3), a.play(), a.$elem.find(".owl-wrapper").css("display", "block"),
                    a.$elem.is(":visible") ? a.$elem.css("opacity", 1) : a.watchVisibility(), a.onstartup = !1,
                    a.eachMoveUpdate(), "function" == typeof a.options.afterInit && a.options.afterInit.apply(this, [a.$elem]);
            },
            eachMoveUpdate: function() {
                var a = this;
                a.options.lazyLoad === !0 && a.lazyLoad(), a.options.autoHeight === !0 && a.autoHeight(),
                    a.onVisibleItems(), "function" == typeof a.options.afterAction && a.options.afterAction.apply(this, [a.$elem]);
            },
            updateVars: function() {
                var a = this;
                "function" == typeof a.options.beforeUpdate && a.options.beforeUpdate.apply(this, [a.$elem]),
                    a.watchVisibility(), a.updateItems(), a.calculateAll(), a.updatePosition(), a.updateControls(),
                    a.eachMoveUpdate(), "function" == typeof a.options.afterUpdate && a.options.afterUpdate.apply(this, [a.$elem]);
            },
            reload: function() {
                var a = this;
                b.setTimeout(function() {
                    a.updateVars();
                }, 0);
            },
            watchVisibility: function() {
                var a = this;
                return a.$elem.is(":visible") === !1 && (a.$elem.css({
                    opacity: 0
                }), b.clearInterval(a.autoPlayInterval), b.clearInterval(a.checkVisible), void(a.checkVisible = b.setInterval(function() {
                    a.$elem.is(":visible") && (a.reload(), a.$elem.animate({
                        opacity: 1
                    }, 200), b.clearInterval(a.checkVisible));
                }, 500)));
            },
            wrapItems: function() {
                var a = this;
                a.$userItems.wrapAll('<div class="owl-wrapper">').wrap('<div class="owl-item"></div>'),
                    a.$elem.find(".owl-wrapper").wrap('<div class="owl-wrapper-outer">'), a.wrapperOuter = a.$elem.find(".owl-wrapper-outer"),
                    a.$elem.css("display", "block");
            },
            baseClass: function() {
                var a = this,
                    b = a.$elem.hasClass(a.options.baseClass),
                    c = a.$elem.hasClass(a.options.theme);
                b || a.$elem.addClass(a.options.baseClass), c || a.$elem.addClass(a.options.theme);
            },
            updateItems: function() {
                var b, c, d = this;
                if (d.options.responsive === !1) return !1;
                if (d.options.singleItem === !0) return d.options.items = d.orignalItems = 1, d.options.itemsCustom = !1,
                    d.options.itemsDesktop = !1, d.options.itemsDesktopSmall = !1, d.options.itemsTablet = !1,
                    d.options.itemsTabletSmall = !1, d.options.itemsMobile = !1, !1;
                if (b = a(d.options.responsiveBaseWidth).width(), b > (d.options.itemsDesktop[0] || d.orignalItems) && (d.options.items = d.orignalItems),
                    d.options.itemsCustom !== !1)
                    for (d.options.itemsCustom.sort(function(a, b) {
                            return a[0] - b[0];
                        }), c = 0; c < d.options.itemsCustom.length; c += 1) d.options.itemsCustom[c][0] <= b && (d.options.items = d.options.itemsCustom[c][1]);
                else b <= d.options.itemsDesktop[0] && d.options.itemsDesktop !== !1 && (d.options.items = d.options.itemsDesktop[1]),
                    b <= d.options.itemsDesktopSmall[0] && d.options.itemsDesktopSmall !== !1 && (d.options.items = d.options.itemsDesktopSmall[1]),
                    b <= d.options.itemsTablet[0] && d.options.itemsTablet !== !1 && (d.options.items = d.options.itemsTablet[1]),
                    b <= d.options.itemsTabletSmall[0] && d.options.itemsTabletSmall !== !1 && (d.options.items = d.options.itemsTabletSmall[1]),
                    b <= d.options.itemsMobile[0] && d.options.itemsMobile !== !1 && (d.options.items = d.options.itemsMobile[1]);
                d.options.items > d.itemsAmount && d.options.itemsScaleUp === !0 && (d.options.items = d.itemsAmount);
            },
            response: function() {
                var c, d, e = this;
                return e.options.responsive === !0 && (d = a(b).width(), e.resizer = function() {
                    a(b).width() !== d && (e.options.autoPlay !== !1 && b.clearInterval(e.autoPlayInterval),
                        b.clearTimeout(c), c = b.setTimeout(function() {
                            d = a(b).width(), e.updateVars();
                        }, e.options.responsiveRefreshRate));
                }, void a(b).resize(e.resizer));
            },
            updatePosition: function() {
                var a = this;
                a.jumpTo(a.currentItem), a.options.autoPlay !== !1 && a.checkAp();
            },
            appendItemsSizes: function() {
                var b = this,
                    c = 0,
                    d = b.itemsAmount - b.options.items;
                b.$owlItems.each(function(e) {
                    var f = a(this);
                    f.css({
                            width: b.itemWidth
                        }).data("owl-item", Number(e)), e % b.options.items !== 0 && e !== d || e > d || (c += 1),
                        f.data("owl-roundPages", c);
                });
            },
            appendWrapperSizes: function() {
                var a = this,
                    b = a.$owlItems.length * a.itemWidth;
                a.$owlWrapper.css({
                    width: 2 * b,
                    left: 0
                }), a.appendItemsSizes();
            },
            calculateAll: function() {
                var a = this;
                a.calculateWidth(), a.appendWrapperSizes(), a.loops(), a.max();
            },
            calculateWidth: function() {
                var a = this;
                a.itemWidth = Math.round(a.$elem.width() / a.options.items);
            },
            max: function() {
                var a = this,
                    b = (a.itemsAmount * a.itemWidth - a.options.items * a.itemWidth) * -1;
                return a.options.items > a.itemsAmount ? (a.maximumItem = 0, b = 0, a.maximumPixels = 0) : (a.maximumItem = a.itemsAmount - a.options.items,
                    a.maximumPixels = b), b;
            },
            min: function() {
                return 0;
            },
            loops: function() {
                var b, c, d, e = this,
                    f = 0,
                    g = 0;
                for (e.positionsInArray = [0], e.pagesInArray = [], b = 0; b < e.itemsAmount; b += 1) g += e.itemWidth,
                    e.positionsInArray.push(-g), e.options.scrollPerPage === !0 && (c = a(e.$owlItems[b]),
                        d = c.data("owl-roundPages"), d !== f && (e.pagesInArray[f] = e.positionsInArray[b],
                            f = d));
            },
            buildControls: function() {
                var b = this;
                b.options.navigation !== !0 && b.options.pagination !== !0 || (b.owlControls = a('<div class="owl-controls"/>').toggleClass("clickable", !b.browser.isTouch).appendTo(b.$elem)),
                    b.options.pagination === !0 && b.buildPagination(), b.options.navigation === !0 && b.buildButtons();
            },
            buildButtons: function() {
                var b = this,
                    c = a('<div class="owl-buttons"/>');
                b.owlControls.append(c), b.buttonPrev = a("<div/>", {
                    "class": "owl-prev",
                    html: b.options.navigationText[0] || ""
                }), b.buttonNext = a("<div/>", {
                    "class": "owl-next",
                    html: b.options.navigationText[1] || ""
                }), c.append(b.buttonPrev).append(b.buttonNext), c.on("touchstart.owlControls mousedown.owlControls", 'div[class^="owl"]', function(a) {
                    a.preventDefault();
                }), c.on("touchend.owlControls mouseup.owlControls", 'div[class^="owl"]', function(c) {
                    c.preventDefault(), a(this).hasClass("owl-next") ? b.next() : b.prev();
                });
            },
            buildPagination: function() {
                var b = this;
                b.paginationWrapper = a('<div class="owl-pagination"/>'), b.owlControls.append(b.paginationWrapper),
                    b.paginationWrapper.on("touchend.owlControls mouseup.owlControls", ".owl-page", function(c) {
                        c.preventDefault(), Number(a(this).data("owl-page")) !== b.currentItem && b.goTo(Number(a(this).data("owl-page")), !0);
                    });
            },
            updatePagination: function() {
                var b, c, d, e, f, g, h = this;
                if (h.options.pagination === !1) return !1;
                for (h.paginationWrapper.html(""), b = 0, c = h.itemsAmount - h.itemsAmount % h.options.items,
                    e = 0; e < h.itemsAmount; e += 1) e % h.options.items === 0 && (b += 1, c === e && (d = h.itemsAmount - h.options.items),
                    f = a("<div/>", {
                        "class": "owl-page"
                    }), g = a("<span></span>", {
                        text: h.options.paginationNumbers === !0 ? b : "",
                        "class": h.options.paginationNumbers === !0 ? "owl-numbers" : ""
                    }), f.append(g), f.data("owl-page", c === e ? d : e), f.data("owl-roundPages", b),
                    h.paginationWrapper.append(f));
                h.checkPagination();
            },
            checkPagination: function() {
                var b = this;
                return b.options.pagination !== !1 && void b.paginationWrapper.find(".owl-page").each(function() {
                    a(this).data("owl-roundPages") === a(b.$owlItems[b.currentItem]).data("owl-roundPages") && (b.paginationWrapper.find(".owl-page").removeClass("active"),
                        a(this).addClass("active"));
                });
            },
            checkNavigation: function() {
                var a = this;
                return a.options.navigation !== !1 && void(a.options.rewindNav === !1 && (0 === a.currentItem && 0 === a.maximumItem ? (a.buttonPrev.addClass("disabled"),
                    a.buttonNext.addClass("disabled")) : 0 === a.currentItem && 0 !== a.maximumItem ? (a.buttonPrev.addClass("disabled"),
                    a.buttonNext.removeClass("disabled")) : a.currentItem === a.maximumItem ? (a.buttonPrev.removeClass("disabled"),
                    a.buttonNext.addClass("disabled")) : 0 !== a.currentItem && a.currentItem !== a.maximumItem && (a.buttonPrev.removeClass("disabled"),
                    a.buttonNext.removeClass("disabled"))));
            },
            updateControls: function() {
                var a = this;
                a.updatePagination(), a.checkNavigation(), a.owlControls && (a.options.items >= a.itemsAmount ? a.owlControls.hide() : a.owlControls.show());
            },
            destroyControls: function() {
                var a = this;
                a.owlControls && a.owlControls.remove();
            },
            next: function(a) {
                var b = this;
                if (b.isTransition) return !1;
                if (b.currentItem += b.options.scrollPerPage === !0 ? b.options.items : 1, b.currentItem > b.maximumItem + (b.options.scrollPerPage === !0 ? b.options.items - 1 : 0)) {
                    if (b.options.rewindNav !== !0) return b.currentItem = b.maximumItem, !1;
                    b.currentItem = 0, a = "rewind";
                }
                b.goTo(b.currentItem, a);
            },
            prev: function(a) {
                var b = this;
                if (b.isTransition) return !1;
                if (b.options.scrollPerPage === !0 && b.currentItem > 0 && b.currentItem < b.options.items ? b.currentItem = 0 : b.currentItem -= b.options.scrollPerPage === !0 ? b.options.items : 1,
                    b.currentItem < 0) {
                    if (b.options.rewindNav !== !0) return b.currentItem = 0, !1;
                    b.currentItem = b.maximumItem, a = "rewind";
                }
                b.goTo(b.currentItem, a);
            },
            goTo: function(a, c, d) {
                var e, f = this;
                return !f.isTransition && ("function" == typeof f.options.beforeMove && f.options.beforeMove.apply(this, [f.$elem]),
                    a >= f.maximumItem ? a = f.maximumItem : a <= 0 && (a = 0), f.currentItem = f.owl.currentItem = a,
                    f.options.transitionStyle !== !1 && "drag" !== d && 1 === f.options.items && f.browser.support3d === !0 ? (f.swapSpeed(0),
                        f.browser.support3d === !0 ? f.transition3d(f.positionsInArray[a]) : f.css2slide(f.positionsInArray[a], 1),
                        f.afterGo(), f.singleItemTransition(), !1) : (e = f.positionsInArray[a], f.browser.support3d === !0 ? (f.isCss3Finish = !1,
                            c === !0 ? (f.swapSpeed("paginationSpeed"), b.setTimeout(function() {
                                f.isCss3Finish = !0;
                            }, f.options.paginationSpeed)) : "rewind" === c ? (f.swapSpeed(f.options.rewindSpeed),
                                b.setTimeout(function() {
                                    f.isCss3Finish = !0;
                                }, f.options.rewindSpeed)) : (f.swapSpeed("slideSpeed"), b.setTimeout(function() {
                                f.isCss3Finish = !0;
                            }, f.options.slideSpeed)), f.transition3d(e)) : c === !0 ? f.css2slide(e, f.options.paginationSpeed) : "rewind" === c ? f.css2slide(e, f.options.rewindSpeed) : f.css2slide(e, f.options.slideSpeed),
                        void f.afterGo()));
            },
            jumpTo: function(a) {
                var b = this;
                "function" == typeof b.options.beforeMove && b.options.beforeMove.apply(this, [b.$elem]),
                    a >= b.maximumItem || a === -1 ? a = b.maximumItem : a <= 0 && (a = 0), b.swapSpeed(0),
                    b.browser.support3d === !0 ? b.transition3d(b.positionsInArray[a]) : b.css2slide(b.positionsInArray[a], 1),
                    b.currentItem = b.owl.currentItem = a, b.afterGo();
            },
            afterGo: function() {
                var a = this;
                a.prevArr.push(a.currentItem), a.prevItem = a.owl.prevItem = a.prevArr[a.prevArr.length - 2],
                    a.prevArr.shift(0), a.prevItem !== a.currentItem && (a.checkPagination(), a.checkNavigation(),
                        a.eachMoveUpdate(), a.options.autoPlay !== !1 && a.checkAp()), "function" == typeof a.options.afterMove && a.prevItem !== a.currentItem && a.options.afterMove.apply(this, [a.$elem]);
            },
            stop: function() {
                var a = this;
                a.apStatus = "stop", b.clearInterval(a.autoPlayInterval);
            },
            checkAp: function() {
                var a = this;
                "stop" !== a.apStatus && a.play();
            },
            play: function() {
                var a = this;
                return a.apStatus = "play", a.options.autoPlay !== !1 && (b.clearInterval(a.autoPlayInterval),
                    void(a.autoPlayInterval = b.setInterval(function() {
                        a.next(!0);
                    }, a.options.autoPlay)));
            },
            swapSpeed: function(a) {
                var b = this;
                "slideSpeed" === a ? b.$owlWrapper.css(b.addCssSpeed(b.options.slideSpeed)) : "paginationSpeed" === a ? b.$owlWrapper.css(b.addCssSpeed(b.options.paginationSpeed)) : "string" != typeof a && b.$owlWrapper.css(b.addCssSpeed(a));
            },
            addCssSpeed: function(a) {
                return {
                    "-webkit-transition": "all " + a + "ms ease",
                    "-moz-transition": "all " + a + "ms ease",
                    "-o-transition": "all " + a + "ms ease",
                    transition: "all " + a + "ms ease"
                };
            },
            removeTransition: function() {
                return {
                    "-webkit-transition": "",
                    "-moz-transition": "",
                    "-o-transition": "",
                    transition: ""
                };
            },
            doTranslate: function(a) {
                return {
                    "-webkit-transform": "translate3d(" + a + "px, 0px, 0px)",
                    "-moz-transform": "translate3d(" + a + "px, 0px, 0px)",
                    "-o-transform": "translate3d(" + a + "px, 0px, 0px)",
                    "-ms-transform": "translate3d(" + a + "px, 0px, 0px)",
                    transform: "translate3d(" + a + "px, 0px,0px)"
                };
            },
            transition3d: function(a) {
                var b = this;
                b.$owlWrapper.css(b.doTranslate(a));
            },
            css2move: function(a) {
                var b = this;
                b.$owlWrapper.css({
                    left: a
                });
            },
            css2slide: function(a, b) {
                var c = this;
                c.isCssFinish = !1, c.$owlWrapper.stop(!0, !0).animate({
                    left: a
                }, {
                    duration: b || c.options.slideSpeed,
                    complete: function() {
                        c.isCssFinish = !0;
                    }
                });
            },
            checkBrowser: function() {
                var a, d, e, f, g = this,
                    h = "translate3d(0px, 0px, 0px)",
                    i = c.createElement("div");
                i.style.cssText = "  -moz-transform:" + h + "; -ms-transform:" + h + "; -o-transform:" + h + "; -webkit-transform:" + h + "; transform:" + h,
                    a = /translate3d\(0px, 0px, 0px\)/g, d = i.style.cssText.match(a), e = null !== d && 1 === d.length,
                    f = "ontouchstart" in b || b.navigator.msMaxTouchPoints, g.browser = {
                        support3d: e,
                        isTouch: f
                    };
            },
            moveEvents: function() {
                var a = this;
                a.options.mouseDrag === !1 && a.options.touchDrag === !1 || (a.gestures(), a.disabledEvents());
            },
            eventTypes: function() {
                var a = this,
                    b = ["s", "e", "x"];
                a.ev_types = {}, a.options.mouseDrag === !0 && a.options.touchDrag === !0 ? b = ["touchstart.owl mousedown.owl", "touchmove.owl mousemove.owl", "touchend.owl touchcancel.owl mouseup.owl"] : a.options.mouseDrag === !1 && a.options.touchDrag === !0 ? b = ["touchstart.owl", "touchmove.owl", "touchend.owl touchcancel.owl"] : a.options.mouseDrag === !0 && a.options.touchDrag === !1 && (b = ["mousedown.owl", "mousemove.owl", "mouseup.owl"]),
                    a.ev_types.start = b[0], a.ev_types.move = b[1], a.ev_types.end = b[2];
            },
            disabledEvents: function() {
                var b = this;
                b.$elem.on("dragstart.owl", function(a) {
                    a.preventDefault();
                }), b.$elem.on("mousedown.disableTextSelect", function(b) {
                    return a(b.target).is("input, textarea, select, option");
                });
            },
            gestures: function() {
                function d(a) {
                    if (void 0 !== a.touches) return {
                        x: a.touches[0].pageX,
                        y: a.touches[0].pageY
                    };
                    if (void 0 === a.touches) {
                        if (void 0 !== a.pageX) return {
                            x: a.pageX,
                            y: a.pageY
                        };
                        if (void 0 === a.pageX) return {
                            x: a.clientX,
                            y: a.clientY
                        };
                    }
                }

                function e(b) {
                    "on" === b ? (a(c).on(i.ev_types.move, g), a(c).on(i.ev_types.end, h)) : "off" === b && (a(c).off(i.ev_types.move),
                        a(c).off(i.ev_types.end));
                }

                function f(c) {
                    var f, g = c.originalEvent || c || b.event;
                    if (3 === g.which) return !1;
                    if (!(i.itemsAmount <= i.options.items)) {
                        if (i.isCssFinish === !1 && !i.options.dragBeforeAnimFinish) return !1;
                        if (i.isCss3Finish === !1 && !i.options.dragBeforeAnimFinish) return !1;
                        i.options.autoPlay !== !1 && b.clearInterval(i.autoPlayInterval), i.browser.isTouch === !0 || i.$owlWrapper.hasClass("grabbing") || i.$owlWrapper.addClass("grabbing"),
                            i.newPosX = 0, i.newRelativeX = 0, a(this).css(i.removeTransition()), f = a(this).position(),
                            j.relativePos = f.left, j.offsetX = d(g).x - f.left, j.offsetY = d(g).y - f.top,
                            e("on"), j.sliding = !1, j.targetElement = g.target || g.srcElement;
                    }
                }

                function g(e) {
                    var f, g, h = e.originalEvent || e || b.event;
                    i.newPosX = d(h).x - j.offsetX, i.newPosY = d(h).y - j.offsetY, i.newRelativeX = i.newPosX - j.relativePos,
                        "function" == typeof i.options.startDragging && j.dragging !== !0 && 0 !== i.newRelativeX && (j.dragging = !0,
                            i.options.startDragging.apply(i, [i.$elem])), (i.newRelativeX > 8 || i.newRelativeX < -8) && i.browser.isTouch === !0 && (void 0 !== h.preventDefault ? h.preventDefault() : h.returnValue = !1,
                            j.sliding = !0), (i.newPosY > 10 || i.newPosY < -10) && j.sliding === !1 && a(c).off("touchmove.owl"),
                        f = function() {
                            return i.newRelativeX / 5;
                        }, g = function() {
                            return i.maximumPixels + i.newRelativeX / 5;
                        }, i.newPosX = Math.max(Math.min(i.newPosX, f()), g()), i.browser.support3d === !0 ? i.transition3d(i.newPosX) : i.css2move(i.newPosX);
                }

                function h(c) {
                    var d, f, g, h = c.originalEvent || c || b.event;
                    h.target = h.target || h.srcElement, j.dragging = !1, i.browser.isTouch !== !0 && i.$owlWrapper.removeClass("grabbing"),
                        i.newRelativeX < 0 ? i.dragDirection = i.owl.dragDirection = "left" : i.dragDirection = i.owl.dragDirection = "right",
                        0 !== i.newRelativeX && (d = i.getNewPosition(), i.goTo(d, !1, "drag"), j.targetElement === h.target && i.browser.isTouch !== !0 && (a(h.target).on("click.disable", function(b) {
                            b.stopImmediatePropagation(), b.stopPropagation(), b.preventDefault(), a(b.target).off("click.disable");
                        }), f = a._data(h.target, "events").click, g = f.pop(), f.splice(0, 0, g))), e("off");
                }
                var i = this,
                    j = {
                        offsetX: 0,
                        offsetY: 0,
                        baseElWidth: 0,
                        relativePos: 0,
                        position: null,
                        minSwipe: null,
                        maxSwipe: null,
                        sliding: null,
                        dargging: null,
                        targetElement: null
                    };
                i.isCssFinish = !0, i.$elem.on(i.ev_types.start, ".owl-wrapper", f);
            },
            getNewPosition: function() {
                var a = this,
                    b = a.closestItem();
                return b > a.maximumItem ? (a.currentItem = a.maximumItem, b = a.maximumItem) : a.newPosX >= 0 && (b = 0,
                    a.currentItem = 0), b;
            },
            closestItem: function() {
                var b = this,
                    c = b.options.scrollPerPage === !0 ? b.pagesInArray : b.positionsInArray,
                    d = b.newPosX,
                    e = null;
                return a.each(c, function(f, g) {
                    d - b.itemWidth / 20 > c[f + 1] && d - b.itemWidth / 20 < g && "left" === b.moveDirection() ? (e = g,
                        b.options.scrollPerPage === !0 ? b.currentItem = a.inArray(e, b.positionsInArray) : b.currentItem = f) : d + b.itemWidth / 20 < g && d + b.itemWidth / 20 > (c[f + 1] || c[f] - b.itemWidth) && "right" === b.moveDirection() && (b.options.scrollPerPage === !0 ? (e = c[f + 1] || c[c.length - 1],
                        b.currentItem = a.inArray(e, b.positionsInArray)) : (e = c[f + 1], b.currentItem = f + 1));
                }), b.currentItem;
            },
            moveDirection: function() {
                var a, b = this;
                return b.newRelativeX < 0 ? (a = "right", b.playDirection = "next") : (a = "left",
                    b.playDirection = "prev"), a;
            },
            customEvents: function() {
                var a = this;
                a.$elem.on("owl.next", function() {
                    a.next();
                }), a.$elem.on("owl.prev", function() {
                    a.prev();
                }), a.$elem.on("owl.play", function(b, c) {
                    a.options.autoPlay = c, a.play(), a.hoverStatus = "play";
                }), a.$elem.on("owl.stop", function() {
                    a.stop(), a.hoverStatus = "stop";
                }), a.$elem.on("owl.goTo", function(b, c) {
                    a.goTo(c);
                }), a.$elem.on("owl.jumpTo", function(b, c) {
                    a.jumpTo(c);
                });
            },
            stopOnHover: function() {
                var a = this;
                a.options.stopOnHover === !0 && a.browser.isTouch !== !0 && a.options.autoPlay !== !1 && (a.$elem.on("mouseover", function() {
                    a.stop();
                }), a.$elem.on("mouseout", function() {
                    "stop" !== a.hoverStatus && a.play();
                }));
            },
            lazyLoad: function() {
                var b, c, d, e, f, g = this;
                if (g.options.lazyLoad === !1) return !1;
                for (b = 0; b < g.itemsAmount; b += 1) c = a(g.$owlItems[b]), "loaded" !== c.data("owl-loaded") && (d = c.data("owl-item"),
                    e = c.find(".lazyOwl"), "string" == typeof e.data("src") ? (void 0 === c.data("owl-loaded") && (e.hide(),
                            c.addClass("loading").data("owl-loaded", "checked")), f = g.options.lazyFollow !== !0 || d >= g.currentItem,
                        f && d < g.currentItem + g.options.items && e.length && g.lazyPreload(c, e)) : c.data("owl-loaded", "loaded"));
            },
            lazyPreload: function(a, c) {
                function d() {
                    a.data("owl-loaded", "loaded").removeClass("loading"), c.removeAttr("data-src"),
                        "fade" === g.options.lazyEffect ? c.fadeIn(400) : c.show(), "function" == typeof g.options.afterLazyLoad && g.options.afterLazyLoad.apply(this, [g.$elem]);
                }

                function e() {
                    h += 1, g.completeImg(c.get(0)) || f === !0 ? d() : h <= 100 ? b.setTimeout(e, 100) : d();
                }
                var f, g = this,
                    h = 0;
                "DIV" === c.prop("tagName") ? (c.css("background-image", "url(" + c.data("src") + ")"),
                    f = !0) : c[0].src = c.data("src"), e();
            },
            autoHeight: function() {
                function c() {
                    var c = a(f.$owlItems[f.currentItem]).height();
                    f.wrapperOuter.css("height", c + "px"), f.wrapperOuter.hasClass("autoHeight") || b.setTimeout(function() {
                        f.wrapperOuter.addClass("autoHeight");
                    }, 0);
                }

                function d() {
                    e += 1, f.completeImg(g.get(0)) ? c() : e <= 100 ? b.setTimeout(d, 100) : f.wrapperOuter.css("height", "");
                }
                var e, f = this,
                    g = a(f.$owlItems[f.currentItem]).find("img");
                void 0 !== g.get(0) ? (e = 0, d()) : c();
            },
            completeImg: function(a) {
                var b;
                return !!a.complete && (b = typeof a.naturalWidth, "undefined" === b || 0 !== a.naturalWidth);
            },
            onVisibleItems: function() {
                var b, c = this;
                for (c.options.addClassActive === !0 && c.$owlItems.removeClass("active"), c.visibleItems = [],
                    b = c.currentItem; b < c.currentItem + c.options.items; b += 1) c.visibleItems.push(b),
                    c.options.addClassActive === !0 && a(c.$owlItems[b]).addClass("active");
                c.owl.visibleItems = c.visibleItems;
            },
            transitionTypes: function(a) {
                var b = this;
                b.outClass = "owl-" + a + "-out", b.inClass = "owl-" + a + "-in";
            },
            singleItemTransition: function() {
                function a(a) {
                    return {
                        position: "relative",
                        left: a + "px"
                    };
                }
                var b = this,
                    c = b.outClass,
                    d = b.inClass,
                    e = b.$owlItems.eq(b.currentItem),
                    f = b.$owlItems.eq(b.prevItem),
                    g = Math.abs(b.positionsInArray[b.currentItem]) + b.positionsInArray[b.prevItem],
                    h = Math.abs(b.positionsInArray[b.currentItem]) + b.itemWidth / 2,
                    i = "webkitAnimationEnd oAnimationEnd MSAnimationEnd animationend";
                b.isTransition = !0, b.$owlWrapper.addClass("owl-origin").css({
                    "-webkit-transform-origin": h + "px",
                    "-moz-perspective-origin": h + "px",
                    "perspective-origin": h + "px"
                }), f.css(a(g, 10)).addClass(c).on(i, function() {
                    b.endPrev = !0, f.off(i), b.clearTransStyle(f, c);
                }), e.addClass(d).on(i, function() {
                    b.endCurrent = !0, e.off(i), b.clearTransStyle(e, d);
                });
            },
            clearTransStyle: function(a, b) {
                var c = this;
                a.css({
                    position: "",
                    left: ""
                }).removeClass(b), c.endPrev && c.endCurrent && (c.$owlWrapper.removeClass("owl-origin"),
                    c.endPrev = !1, c.endCurrent = !1, c.isTransition = !1);
            },
            owlStatus: function() {
                var a = this;
                a.owl = {
                    userOptions: a.userOptions,
                    baseElement: a.$elem,
                    userItems: a.$userItems,
                    owlItems: a.$owlItems,
                    currentItem: a.currentItem,
                    prevItem: a.prevItem,
                    visibleItems: a.visibleItems,
                    isTouch: a.browser.isTouch,
                    browser: a.browser,
                    dragDirection: a.dragDirection
                };
            },
            clearEvents: function() {
                var d = this;
                d.$elem.off(".owl owl mousedown.disableTextSelect"), a(c).off(".owl owl"), a(b).off("resize", d.resizer);
            },
            unWrap: function() {
                var a = this;
                0 !== a.$elem.children().length && (a.$owlWrapper.unwrap(), a.$userItems.unwrap().unwrap(),
                    a.owlControls && a.owlControls.remove()), a.clearEvents(), a.$elem.attr("style", a.$elem.data("owl-originalStyles") || "").attr("class", a.$elem.data("owl-originalClasses"));
            },
            destroy: function() {
                var a = this;
                a.stop(), b.clearInterval(a.checkVisible), a.unWrap(), a.$elem.removeData();
            },
            reinit: function(b) {
                var c = this,
                    d = a.extend({}, c.userOptions, b);
                c.unWrap(), c.init(d, c.$elem);
            },
            addItem: function(a, b) {
                var c, d = this;
                return !!a && (0 === d.$elem.children().length ? (d.$elem.append(a), d.setVars(), !1) : (d.unWrap(), c = void 0 === b || b === -1 ? -1 : b, c >= d.$userItems.length || c === -1 ? d.$userItems.eq(-1).after(a) : d.$userItems.eq(c).before(a),
                    void d.setVars()));
            },
            removeItem: function(a) {
                var b, c = this;
                return 0 !== c.$elem.children().length && (b = void 0 === a || a === -1 ? -1 : a,
                    c.unWrap(), c.$userItems.eq(b).remove(), void c.setVars());
            }
        };
        a.fn.owlCarousel = function(b) {
            return this.each(function() {
                if (a(this).data("owl-init") === !0) return !1;
                a(this).data("owl-init", !0);
                var c = Object.create(d);
                c.init(b, this), a.data(this, "owlCarousel", c);
            });
        }, a.fn.owlCarousel.options = {
            items: 5,
            itemsCustom: !1,
            itemsDesktop: [1199, 4],
            itemsDesktopSmall: [979, 3],
            itemsTablet: [768, 2],
            itemsTabletSmall: !1,
            itemsMobile: [479, 1],
            singleItem: !1,
            itemsScaleUp: !1,
            slideSpeed: 200,
            paginationSpeed: 800,
            rewindSpeed: 1e3,
            autoPlay: !1,
            stopOnHover: !1,
            navigation: !1,
            navigationText: ["prev", "next"],
            rewindNav: !0,
            scrollPerPage: !1,
            pagination: !0,
            paginationNumbers: !1,
            responsive: !0,
            responsiveRefreshRate: 200,
            responsiveBaseWidth: b,
            baseClass: "owl-carousel",
            theme: "owl-theme",
            lazyLoad: !1,
            lazyFollow: !0,
            lazyEffect: "fade",
            autoHeight: !1,
            jsonPath: !1,
            jsonSuccess: !1,
            dragBeforeAnimFinish: !0,
            mouseDrag: !0,
            touchDrag: !0,
            addClassActive: !1,
            transitionStyle: !1,
            beforeUpdate: !1,
            afterUpdate: !1,
            beforeInit: !1,
            afterInit: !1,
            beforeMove: !1,
            afterMove: !1,
            afterAction: !1,
            startDragging: !1,
            afterLazyLoad: !1
        };
    }(jQuery, window, document), jQuery.easing.jswing = jQuery.easing.swing, jQuery.extend(jQuery.easing, {
        def: "easeOutQuad",
        swing: function(a, b, c, d, e) {
            return jQuery.easing[jQuery.easing.def](a, b, c, d, e);
        },
        easeInQuad: function(a, b, c, d, e) {
            return d * (b /= e) * b + c;
        },
        easeOutQuad: function(a, b, c, d, e) {
            return -d * (b /= e) * (b - 2) + c;
        },
        easeInOutQuad: function(a, b, c, d, e) {
            return (b /= e / 2) < 1 ? d / 2 * b * b + c : -d / 2 * (--b * (b - 2) - 1) + c;
        },
        easeInCubic: function(a, b, c, d, e) {
            return d * (b /= e) * b * b + c;
        },
        easeOutCubic: function(a, b, c, d, e) {
            return d * ((b = b / e - 1) * b * b + 1) + c;
        },
        easeInOutCubic: function(a, b, c, d, e) {
            return (b /= e / 2) < 1 ? d / 2 * b * b * b + c : d / 2 * ((b -= 2) * b * b + 2) + c;
        },
        easeInQuart: function(a, b, c, d, e) {
            return d * (b /= e) * b * b * b + c;
        },
        easeOutQuart: function(a, b, c, d, e) {
            return -d * ((b = b / e - 1) * b * b * b - 1) + c;
        },
        easeInOutQuart: function(a, b, c, d, e) {
            return (b /= e / 2) < 1 ? d / 2 * b * b * b * b + c : -d / 2 * ((b -= 2) * b * b * b - 2) + c;
        },
        easeInQuint: function(a, b, c, d, e) {
            return d * (b /= e) * b * b * b * b + c;
        },
        easeOutQuint: function(a, b, c, d, e) {
            return d * ((b = b / e - 1) * b * b * b * b + 1) + c;
        },
        easeInOutQuint: function(a, b, c, d, e) {
            return (b /= e / 2) < 1 ? d / 2 * b * b * b * b * b + c : d / 2 * ((b -= 2) * b * b * b * b + 2) + c;
        },
        easeInSine: function(a, b, c, d, e) {
            return -d * Math.cos(b / e * (Math.PI / 2)) + d + c;
        },
        easeOutSine: function(a, b, c, d, e) {
            return d * Math.sin(b / e * (Math.PI / 2)) + c;
        },
        easeInOutSine: function(a, b, c, d, e) {
            return -d / 2 * (Math.cos(Math.PI * b / e) - 1) + c;
        },
        easeInExpo: function(a, b, c, d, e) {
            return 0 == b ? c : d * Math.pow(2, 10 * (b / e - 1)) + c;
        },
        easeOutExpo: function(a, b, c, d, e) {
            return b == e ? c + d : d * (-Math.pow(2, -10 * b / e) + 1) + c;
        },
        easeInOutExpo: function(a, b, c, d, e) {
            return 0 == b ? c : b == e ? c + d : (b /= e / 2) < 1 ? d / 2 * Math.pow(2, 10 * (b - 1)) + c : d / 2 * (-Math.pow(2, -10 * --b) + 2) + c;
        },
        easeInCirc: function(a, b, c, d, e) {
            return -d * (Math.sqrt(1 - (b /= e) * b) - 1) + c;
        },
        easeOutCirc: function(a, b, c, d, e) {
            return d * Math.sqrt(1 - (b = b / e - 1) * b) + c;
        },
        easeInOutCirc: function(a, b, c, d, e) {
            return (b /= e / 2) < 1 ? -d / 2 * (Math.sqrt(1 - b * b) - 1) + c : d / 2 * (Math.sqrt(1 - (b -= 2) * b) + 1) + c;
        },
        easeInElastic: function(a, b, c, d, e) {
            var f = 1.70158,
                g = 0,
                h = d;
            if (0 == b) return c;
            if (1 == (b /= e)) return c + d;
            if (g || (g = .3 * e), h < Math.abs(d)) {
                h = d;
                var f = g / 4;
            } else var f = g / (2 * Math.PI) * Math.asin(d / h);
            return -(h * Math.pow(2, 10 * (b -= 1)) * Math.sin(2 * (b * e - f) * Math.PI / g)) + c;
        },
        easeOutElastic: function(a, b, c, d, e) {
            var f = 1.70158,
                g = 0,
                h = d;
            if (0 == b) return c;
            if (1 == (b /= e)) return c + d;
            if (g || (g = .3 * e), h < Math.abs(d)) {
                h = d;
                var f = g / 4;
            } else var f = g / (2 * Math.PI) * Math.asin(d / h);
            return h * Math.pow(2, -10 * b) * Math.sin(2 * (b * e - f) * Math.PI / g) + d + c;
        },
        easeInOutElastic: function(a, b, c, d, e) {
            var f = 1.70158,
                g = 0,
                h = d;
            if (0 == b) return c;
            if (2 == (b /= e / 2)) return c + d;
            if (g || (g = .3 * e * 1.5), h < Math.abs(d)) {
                h = d;
                var f = g / 4;
            } else var f = g / (2 * Math.PI) * Math.asin(d / h);
            return b < 1 ? -.5 * h * Math.pow(2, 10 * (b -= 1)) * Math.sin(2 * (b * e - f) * Math.PI / g) + c : h * Math.pow(2, -10 * (b -= 1)) * Math.sin(2 * (b * e - f) * Math.PI / g) * .5 + d + c;
        },
        easeInBack: function(a, b, c, d, e, f) {
            return void 0 == f && (f = 1.70158), d * (b /= e) * b * ((f + 1) * b - f) + c;
        },
        easeOutBack: function(a, b, c, d, e, f) {
            return void 0 == f && (f = 1.70158), d * ((b = b / e - 1) * b * ((f + 1) * b + f) + 1) + c;
        },
        easeInOutBack: function(a, b, c, d, e, f) {
            return void 0 == f && (f = 1.70158), (b /= e / 2) < 1 ? d / 2 * b * b * (((f *= 1.525) + 1) * b - f) + c : d / 2 * ((b -= 2) * b * (((f *= 1.525) + 1) * b + f) + 2) + c;
        },
        easeInBounce: function(a, b, c, d, e) {
            return d - jQuery.easing.easeOutBounce(a, e - b, 0, d, e) + c;
        },
        easeOutBounce: function(a, b, c, d, e) {
            return (b /= e) < 1 / 2.75 ? 7.5625 * d * b * b + c : b < 2 / 2.75 ? d * (7.5625 * (b -= 1.5 / 2.75) * b + .75) + c : b < 2.5 / 2.75 ? d * (7.5625 * (b -= 2.25 / 2.75) * b + .9375) + c : d * (7.5625 * (b -= 2.625 / 2.75) * b + .984375) + c;
        },
        easeInOutBounce: function(a, b, c, d, e) {
            return b < e / 2 ? .5 * jQuery.easing.easeInBounce(a, 2 * b, 0, d, e) + c : .5 * jQuery.easing.easeOutBounce(a, 2 * b - e, 0, d, e) + .5 * d + c;
        }
    }),
    function(a) {
        "function" == typeof define && define.amd ? define(["jquery"], a) : a("object" == typeof exports ? require("jquery") : window.jQuery || window.Zepto);
    }(function(a) {
        var b, c, d, e, f, g, h = "Close",
            i = "BeforeClose",
            j = "AfterClose",
            k = "BeforeAppend",
            l = "MarkupParse",
            m = "Open",
            n = "Change",
            o = "mfp",
            p = "." + o,
            q = "mfp-ready",
            r = "mfp-removing",
            s = "mfp-prevent-close",
            t = function() {},
            u = !!window.jQuery,
            v = a(window),
            w = function(a, c) {
                b.ev.on(o + a + p, c);
            },
            x = function(b, c, d, e) {
                var f = document.createElement("div");
                return f.className = "mfp-" + b, d && (f.innerHTML = d), e ? c && c.appendChild(f) : (f = a(f),
                    c && f.appendTo(c)), f;
            },
            y = function(c, d) {
                b.ev.triggerHandler(o + c, d), b.st.callbacks && (c = c.charAt(0).toLowerCase() + c.slice(1),
                    b.st.callbacks[c] && b.st.callbacks[c].apply(b, a.isArray(d) ? d : [d]));
            },
            z = function(c) {
                return c === g && b.currTemplate.closeBtn || (b.currTemplate.closeBtn = a(b.st.closeMarkup.replace("%title%", b.st.tClose)),
                    g = c), b.currTemplate.closeBtn;
            },
            A = function() {
                a.magnificPopup.instance || (b = new t(), b.init(), a.magnificPopup.instance = b);
            },
            B = function() {
                var a = document.createElement("p").style,
                    b = ["ms", "O", "Moz", "Webkit"];
                if (void 0 !== a.transition) return !0;
                for (; b.length;)
                    if (b.pop() + "Transition" in a) return !0;
                return !1;
            };
        t.prototype = {
            constructor: t,
            init: function() {
                var c = navigator.appVersion;
                b.isLowIE = b.isIE8 = document.all && !document.addEventListener, b.isAndroid = /android/gi.test(c),
                    b.isIOS = /iphone|ipad|ipod/gi.test(c), b.supportsTransition = B(), b.probablyMobile = b.isAndroid || b.isIOS || /(Opera Mini)|Kindle|webOS|BlackBerry|(Opera Mobi)|(Windows Phone)|IEMobile/i.test(navigator.userAgent),
                    d = a(document), b.popupsCache = {};
            },
            open: function(c) {
                var e;
                if (c.isObj === !1) {
                    b.items = c.items.toArray(), b.index = 0;
                    var g, h = c.items;
                    for (e = 0; e < h.length; e++)
                        if (g = h[e], g.parsed && (g = g.el[0]), g === c.el[0]) {
                            b.index = e;
                            break;
                        }
                } else b.items = a.isArray(c.items) ? c.items : [c.items], b.index = c.index || 0;
                if (b.isOpen) return void b.updateItemHTML();
                b.types = [], f = "", c.mainEl && c.mainEl.length ? b.ev = c.mainEl.eq(0) : b.ev = d,
                    c.key ? (b.popupsCache[c.key] || (b.popupsCache[c.key] = {}), b.currTemplate = b.popupsCache[c.key]) : b.currTemplate = {},
                    b.st = a.extend(!0, {}, a.magnificPopup.defaults, c), b.fixedContentPos = "auto" === b.st.fixedContentPos ? !b.probablyMobile : b.st.fixedContentPos,
                    b.st.modal && (b.st.closeOnContentClick = !1, b.st.closeOnBgClick = !1, b.st.showCloseBtn = !1,
                        b.st.enableEscapeKey = !1), b.bgOverlay || (b.bgOverlay = x("bg").on("click" + p, function() {
                        b.close();
                    }), b.wrap = x("wrap").attr("tabindex", -1).on("click" + p, function(a) {
                        b._checkIfClose(a.target) && b.close();
                    }), b.container = x("container", b.wrap)), b.contentContainer = x("content"), b.st.preloader && (b.preloader = x("preloader", b.container, b.st.tLoading));
                var i = a.magnificPopup.modules;
                for (e = 0; e < i.length; e++) {
                    var j = i[e];
                    j = j.charAt(0).toUpperCase() + j.slice(1), b["init" + j].call(b);
                }
                y("BeforeOpen"), b.st.showCloseBtn && (b.st.closeBtnInside ? (w(l, function(a, b, c, d) {
                        c.close_replaceWith = z(d.type);
                    }), f += " mfp-close-btn-in") : b.wrap.append(z())), b.st.alignTop && (f += " mfp-align-top"),
                    b.fixedContentPos ? b.wrap.css({
                        overflow: b.st.overflowY,
                        overflowX: "hidden",
                        overflowY: b.st.overflowY
                    }) : b.wrap.css({
                        top: v.scrollTop(),
                        position: "absolute"
                    }), (b.st.fixedBgPos === !1 || "auto" === b.st.fixedBgPos && !b.fixedContentPos) && b.bgOverlay.css({
                        height: d.height(),
                        position: "absolute"
                    }), b.st.enableEscapeKey && d.on("keyup" + p, function(a) {
                        27 === a.keyCode && b.close();
                    }), v.on("resize" + p, function() {
                        b.updateSize();
                    }), b.st.closeOnContentClick || (f += " mfp-auto-cursor"), f && b.wrap.addClass(f);
                var k = b.wH = v.height(),
                    n = {};
                if (b.fixedContentPos && b._hasScrollBar(k)) {
                    var o = b._getScrollbarSize();
                    o && (n.marginRight = o);
                }
                b.fixedContentPos && (b.isIE7 ? a("body, html").css("overflow", "hidden") : n.overflow = "hidden");
                var r = b.st.mainClass;
                return b.isIE7 && (r += " mfp-ie7"), r && b._addClassToMFP(r), b.updateItemHTML(),
                    y("BuildControls"), a("html").css(n), b.bgOverlay.add(b.wrap).prependTo(b.st.prependTo || a(document.body)),
                    b._lastFocusedEl = document.activeElement, setTimeout(function() {
                        b.content ? (b._addClassToMFP(q), b._setFocus()) : b.bgOverlay.addClass(q), d.on("focusin" + p, b._onFocusIn);
                    }, 16), b.isOpen = !0, b.updateSize(k), y(m), c;
            },
            close: function() {
                b.isOpen && (y(i), b.isOpen = !1, b.st.removalDelay && !b.isLowIE && b.supportsTransition ? (b._addClassToMFP(r),
                    setTimeout(function() {
                        b._close();
                    }, b.st.removalDelay)) : b._close());
            },
            _close: function() {
                y(h);
                var c = r + " " + q + " ";
                if (b.bgOverlay.detach(), b.wrap.detach(), b.container.empty(), b.st.mainClass && (c += b.st.mainClass + " "),
                    b._removeClassFromMFP(c), b.fixedContentPos) {
                    var e = {
                        marginRight: ""
                    };
                    b.isIE7 ? a("body, html").css("overflow", "") : e.overflow = "", a("html").css(e);
                }
                d.off("keyup" + p + " focusin" + p), b.ev.off(p), b.wrap.attr("class", "mfp-wrap").removeAttr("style"),
                    b.bgOverlay.attr("class", "mfp-bg"), b.container.attr("class", "mfp-container"), !b.st.showCloseBtn || b.st.closeBtnInside && b.currTemplate[b.currItem.type] !== !0 || b.currTemplate.closeBtn && b.currTemplate.closeBtn.detach(),
                    b.st.autoFocusLast && b._lastFocusedEl && a(b._lastFocusedEl).focus(), b.currItem = null,
                    b.content = null, b.currTemplate = null, b.prevHeight = 0, y(j);
            },
            updateSize: function(a) {
                if (b.isIOS) {
                    var c = document.documentElement.clientWidth / window.innerWidth,
                        d = window.innerHeight * c;
                    b.wrap.css("height", d), b.wH = d;
                } else b.wH = a || v.height();
                b.fixedContentPos || b.wrap.css("height", b.wH), y("Resize");
            },
            updateItemHTML: function() {
                var c = b.items[b.index];
                b.contentContainer.detach(), b.content && b.content.detach(), c.parsed || (c = b.parseEl(b.index));
                var d = c.type;
                if (y("BeforeChange", [b.currItem ? b.currItem.type : "", d]), b.currItem = c, !b.currTemplate[d]) {
                    var f = !!b.st[d] && b.st[d].markup;
                    y("FirstMarkupParse", f), f ? b.currTemplate[d] = a(f) : b.currTemplate[d] = !0;
                }
                e && e !== c.type && b.container.removeClass("mfp-" + e + "-holder");
                var g = b["get" + d.charAt(0).toUpperCase() + d.slice(1)](c, b.currTemplate[d]);
                b.appendContent(g, d), c.preloaded = !0, y(n, c), e = c.type, b.container.prepend(b.contentContainer),
                    y("AfterChange");
            },
            appendContent: function(a, c) {
                b.content = a, a ? b.st.showCloseBtn && b.st.closeBtnInside && b.currTemplate[c] === !0 ? b.content.find(".mfp-close").length || b.content.append(z()) : b.content = a : b.content = "",
                    y(k), b.container.addClass("mfp-" + c + "-holder"), b.contentContainer.append(b.content);
            },
            parseEl: function(c) {
                var d, e = b.items[c];
                if (e.tagName ? e = {
                        el: a(e)
                    } : (d = e.type, e = {
                        data: e,
                        src: e.src
                    }), e.el) {
                    for (var f = b.types, g = 0; g < f.length; g++)
                        if (e.el.hasClass("mfp-" + f[g])) {
                            d = f[g];
                            break;
                        }
                    e.src = e.el.attr("data-mfp-src"), e.src || (e.src = e.el.attr("href"));
                }
                return e.type = d || b.st.type || "inline", e.index = c, e.parsed = !0, b.items[c] = e,
                    y("ElementParse", e), b.items[c];
            },
            addGroup: function(a, c) {
                var d = function(d) {
                    d.mfpEl = this, b._openClick(d, a, c);
                };
                c || (c = {});
                var e = "click.magnificPopup";
                c.mainEl = a, c.items ? (c.isObj = !0, a.off(e).on(e, d)) : (c.isObj = !1, c.delegate ? a.off(e).on(e, c.delegate, d) : (c.items = a,
                    a.off(e).on(e, d)));
            },
            _openClick: function(c, d, e) {
                var f = void 0 !== e.midClick ? e.midClick : a.magnificPopup.defaults.midClick;
                if (f || !(2 === c.which || c.ctrlKey || c.metaKey || c.altKey || c.shiftKey)) {
                    var g = void 0 !== e.disableOn ? e.disableOn : a.magnificPopup.defaults.disableOn;
                    if (g)
                        if (a.isFunction(g)) {
                            if (!g.call(b)) return !0;
                        } else if (v.width() < g) return !0;
                    c.type && (c.preventDefault(), b.isOpen && c.stopPropagation()), e.el = a(c.mfpEl),
                        e.delegate && (e.items = d.find(e.delegate)), b.open(e);
                }
            },
            updateStatus: function(a, d) {
                if (b.preloader) {
                    c !== a && b.container.removeClass("mfp-s-" + c), d || "loading" !== a || (d = b.st.tLoading);
                    var e = {
                        status: a,
                        text: d
                    };
                    y("UpdateStatus", e), a = e.status, d = e.text, b.preloader.html(d), b.preloader.find("a").on("click", function(a) {
                        a.stopImmediatePropagation();
                    }), b.container.addClass("mfp-s-" + a), c = a;
                }
            },
            _checkIfClose: function(c) {
                if (!a(c).hasClass(s)) {
                    var d = b.st.closeOnContentClick,
                        e = b.st.closeOnBgClick;
                    if (d && e) return !0;
                    if (!b.content || a(c).hasClass("mfp-close") || b.preloader && c === b.preloader[0]) return !0;
                    if (c === b.content[0] || a.contains(b.content[0], c)) {
                        if (d) return !0;
                    } else if (e && a.contains(document, c)) return !0;
                    return !1;
                }
            },
            _addClassToMFP: function(a) {
                b.bgOverlay.addClass(a), b.wrap.addClass(a);
            },
            _removeClassFromMFP: function(a) {
                this.bgOverlay.removeClass(a), b.wrap.removeClass(a);
            },
            _hasScrollBar: function(a) {
                return (b.isIE7 ? d.height() : document.body.scrollHeight) > (a || v.height());
            },
            _setFocus: function() {
                (b.st.focus ? b.content.find(b.st.focus).eq(0) : b.wrap).focus();
            },
            _onFocusIn: function(c) {
                if (c.target !== b.wrap[0] && !a.contains(b.wrap[0], c.target)) return b._setFocus(), !1;
            },
            _parseMarkup: function(b, c, d) {
                var e;
                d.data && (c = a.extend(d.data, c)), y(l, [b, c, d]), a.each(c, function(c, d) {
                    if (void 0 === d || d === !1) return !0;
                    if (e = c.split("_"), e.length > 1) {
                        var f = b.find(p + "-" + e[0]);
                        if (f.length > 0) {
                            var g = e[1];
                            "replaceWith" === g ? f[0] !== d[0] && f.replaceWith(d) : "img" === g ? f.is("img") ? f.attr("src", d) : f.replaceWith(a("<img>").attr("src", d).attr("class", f.attr("class"))) : f.attr(e[1], d);
                        }
                    } else b.find(p + "-" + c).html(d);
                });
            },
            _getScrollbarSize: function() {
                if (void 0 === b.scrollbarSize) {
                    var a = document.createElement("div");
                    a.style.cssText = "width: 99px; height: 99px; overflow: scroll; position: absolute; top: -9999px;",
                        document.body.appendChild(a), b.scrollbarSize = a.offsetWidth - a.clientWidth, document.body.removeChild(a);
                }
                return b.scrollbarSize;
            }
        }, a.magnificPopup = {
            instance: null,
            proto: t.prototype,
            modules: [],
            open: function(b, c) {
                return A(), b = b ? a.extend(!0, {}, b) : {}, b.isObj = !0, b.index = c || 0, this.instance.open(b);
            },
            close: function() {
                return a.magnificPopup.instance && a.magnificPopup.instance.close();
            },
            registerModule: function(b, c) {
                c.options && (a.magnificPopup.defaults[b] = c.options), a.extend(this.proto, c.proto),
                    this.modules.push(b);
            },
            defaults: {
                disableOn: 0,
                key: null,
                midClick: !1,
                mainClass: "",
                preloader: !0,
                focus: "",
                closeOnContentClick: !1,
                closeOnBgClick: !0,
                closeBtnInside: !0,
                showCloseBtn: !0,
                enableEscapeKey: !0,
                modal: !1,
                alignTop: !1,
                removalDelay: 0,
                prependTo: null,
                fixedContentPos: "auto",
                fixedBgPos: "auto",
                overflowY: "auto",
                closeMarkup: '<button title="%title%" type="button" class="mfp-close">&#215;</button>',
                tClose: "Close (Esc)",
                tLoading: "Loading...",
                autoFocusLast: !0
            }
        }, a.fn.magnificPopup = function(c) {
            A();
            var d = a(this);
            if ("string" == typeof c)
                if ("open" === c) {
                    var e, f = u ? d.data("magnificPopup") : d[0].magnificPopup,
                        g = parseInt(arguments[1], 10) || 0;
                    f.items ? e = f.items[g] : (e = d, f.delegate && (e = e.find(f.delegate)), e = e.eq(g)),
                        b._openClick({
                            mfpEl: e
                        }, d, f);
                } else b.isOpen && b[c].apply(b, Array.prototype.slice.call(arguments, 1));
            else c = a.extend(!0, {}, c),
                u ? d.data("magnificPopup", c) : d[0].magnificPopup = c, b.addGroup(d, c);
            return d;
        };
        var C, D, E, F = "inline",
            G = function() {
                E && (D.after(E.addClass(C)).detach(), E = null);
            };
        a.magnificPopup.registerModule(F, {
            options: {
                hiddenClass: "hide",
                markup: "",
                tNotFound: "Content not found"
            },
            proto: {
                initInline: function() {
                    b.types.push(F), w(h + "." + F, function() {
                        G();
                    });
                },
                getInline: function(c, d) {
                    if (G(), c.src) {
                        var e = b.st.inline,
                            f = a(c.src);
                        if (f.length) {
                            var g = f[0].parentNode;
                            g && g.tagName && (D || (C = e.hiddenClass, D = x(C), C = "mfp-" + C), E = f.after(D).detach().removeClass(C)),
                                b.updateStatus("ready");
                        } else b.updateStatus("error", e.tNotFound), f = a("<div>");
                        return c.inlineElement = f, f;
                    }
                    return b.updateStatus("ready"), b._parseMarkup(d, {}, c), d;
                }
            }
        });
        var H, I = "ajax",
            J = function() {
                H && a(document.body).removeClass(H);
            },
            K = function() {
                J(), b.req && b.req.abort();
            };
        a.magnificPopup.registerModule(I, {
            options: {
                settings: null,
                cursor: "mfp-ajax-cur",
                tError: '<a href="%url%">The content</a> could not be loaded.'
            },
            proto: {
                initAjax: function() {
                    b.types.push(I), H = b.st.ajax.cursor, w(h + "." + I, K), w("BeforeChange." + I, K);
                },
                getAjax: function(c) {
                    H && a(document.body).addClass(H), b.updateStatus("loading");
                    var d = a.extend({
                        url: c.src,
                        success: function(d, e, f) {
                            var g = {
                                data: d,
                                xhr: f
                            };
                            y("ParseAjax", g), b.appendContent(a(g.data), I), c.finished = !0, J(), b._setFocus(),
                                setTimeout(function() {
                                    b.wrap.addClass(q);
                                }, 16), b.updateStatus("ready"), y("AjaxContentAdded");
                        },
                        error: function() {
                            J(), c.finished = c.loadError = !0, b.updateStatus("error", b.st.ajax.tError.replace("%url%", c.src));
                        }
                    }, b.st.ajax.settings);
                    return b.req = a.ajax(d), "";
                }
            }
        });
        var L, M = function(c) {
            if (c.data && void 0 !== c.data.title) return c.data.title;
            var d = b.st.image.titleSrc;
            if (d) {
                if (a.isFunction(d)) return d.call(b, c);
                if (c.el) return c.el.attr(d) || "";
            }
            return "";
        };
        a.magnificPopup.registerModule("image", {
            options: {
                markup: '<div class="mfp-figure"><div class="mfp-close"></div><figure><div class="mfp-img"></div><figcaption><div class="mfp-bottom-bar"><div class="mfp-title"></div><div class="mfp-counter"></div></div></figcaption></figure></div>',
                cursor: "mfp-zoom-out-cur",
                titleSrc: "title",
                verticalFit: !0,
                tError: '<a href="%url%">The image</a> could not be loaded.'
            },
            proto: {
                initImage: function() {
                    var c = b.st.image,
                        d = ".image";
                    b.types.push("image"), w(m + d, function() {
                        "image" === b.currItem.type && c.cursor && a(document.body).addClass(c.cursor);
                    }), w(h + d, function() {
                        c.cursor && a(document.body).removeClass(c.cursor), v.off("resize" + p);
                    }), w("Resize" + d, b.resizeImage), b.isLowIE && w("AfterChange", b.resizeImage);
                },
                resizeImage: function() {
                    var a = b.currItem;
                    if (a && a.img && b.st.image.verticalFit) {
                        var c = 0;
                        b.isLowIE && (c = parseInt(a.img.css("padding-top"), 10) + parseInt(a.img.css("padding-bottom"), 10)),
                            a.img.css("max-height", b.wH - c);
                    }
                },
                _onImageHasSize: function(a) {
                    a.img && (a.hasSize = !0, L && clearInterval(L), a.isCheckingImgSize = !1, y("ImageHasSize", a),
                        a.imgHidden && (b.content && b.content.removeClass("mfp-loading"), a.imgHidden = !1));
                },
                findImageSize: function(a) {
                    var c = 0,
                        d = a.img[0],
                        e = function(f) {
                            L && clearInterval(L), L = setInterval(function() {
                                return d.naturalWidth > 0 ? void b._onImageHasSize(a) : (c > 200 && clearInterval(L),
                                    c++, void(3 === c ? e(10) : 40 === c ? e(50) : 100 === c && e(500)));
                            }, f);
                        };
                    e(1);
                },
                getImage: function(c, d) {
                    var e = 0,
                        f = function() {
                            c && (c.img[0].complete ? (c.img.off(".mfploader"), c === b.currItem && (b._onImageHasSize(c),
                                b.updateStatus("ready")), c.hasSize = !0, c.loaded = !0, y("ImageLoadComplete")) : (e++,
                                e < 200 ? setTimeout(f, 100) : g()));
                        },
                        g = function() {
                            c && (c.img.off(".mfploader"), c === b.currItem && (b._onImageHasSize(c), b.updateStatus("error", h.tError.replace("%url%", c.src))),
                                c.hasSize = !0, c.loaded = !0, c.loadError = !0);
                        },
                        h = b.st.image,
                        i = d.find(".mfp-img");
                    if (i.length) {
                        var j = document.createElement("img");
                        j.className = "mfp-img", c.el && c.el.find("img").length && (j.alt = c.el.find("img").attr("alt")),
                            c.img = a(j).on("load.mfploader", f).on("error.mfploader", g), j.src = c.src, i.is("img") && (c.img = c.img.clone()),
                            j = c.img[0], j.naturalWidth > 0 ? c.hasSize = !0 : j.width || (c.hasSize = !1);
                    }
                    return b._parseMarkup(d, {
                        title: M(c),
                        img_replaceWith: c.img
                    }, c), b.resizeImage(), c.hasSize ? (L && clearInterval(L), c.loadError ? (d.addClass("mfp-loading"),
                        b.updateStatus("error", h.tError.replace("%url%", c.src))) : (d.removeClass("mfp-loading"),
                        b.updateStatus("ready")), d) : (b.updateStatus("loading"), c.loading = !0, c.hasSize || (c.imgHidden = !0,
                        d.addClass("mfp-loading"), b.findImageSize(c)), d);
                }
            }
        });
        var N, O = function() {
            return void 0 === N && (N = void 0 !== document.createElement("p").style.MozTransform),
                N;
        };
        a.magnificPopup.registerModule("zoom", {
            options: {
                enabled: !1,
                easing: "ease-in-out",
                duration: 300,
                opener: function(a) {
                    return a.is("img") ? a : a.find("img");
                }
            },
            proto: {
                initZoom: function() {
                    var a, c = b.st.zoom,
                        d = ".zoom";
                    if (c.enabled && b.supportsTransition) {
                        var e, f, g = c.duration,
                            j = function(a) {
                                var b = a.clone().removeAttr("style").removeAttr("class").addClass("mfp-animated-image"),
                                    d = "all " + c.duration / 1e3 + "s " + c.easing,
                                    e = {
                                        position: "fixed",
                                        zIndex: 9999,
                                        left: 0,
                                        top: 0,
                                        "-webkit-backface-visibility": "hidden"
                                    },
                                    f = "transition";
                                return e["-webkit-" + f] = e["-moz-" + f] = e["-o-" + f] = e[f] = d, b.css(e), b;
                            },
                            k = function() {
                                b.content.css("visibility", "visible");
                            };
                        w("BuildControls" + d, function() {
                            if (b._allowZoom()) {
                                if (clearTimeout(e), b.content.css("visibility", "hidden"), a = b._getItemToZoom(), !a) return void k();
                                f = j(a), f.css(b._getOffset()), b.wrap.append(f), e = setTimeout(function() {
                                    f.css(b._getOffset(!0)), e = setTimeout(function() {
                                        k(), setTimeout(function() {
                                            f.remove(), a = f = null, y("ZoomAnimationEnded");
                                        }, 16);
                                    }, g);
                                }, 16);
                            }
                        }), w(i + d, function() {
                            if (b._allowZoom()) {
                                if (clearTimeout(e), b.st.removalDelay = g, !a) {
                                    if (a = b._getItemToZoom(), !a) return;
                                    f = j(a);
                                }
                                f.css(b._getOffset(!0)), b.wrap.append(f), b.content.css("visibility", "hidden"),
                                    setTimeout(function() {
                                        f.css(b._getOffset());
                                    }, 16);
                            }
                        }), w(h + d, function() {
                            b._allowZoom() && (k(), f && f.remove(), a = null);
                        });
                    }
                },
                _allowZoom: function() {
                    return "image" === b.currItem.type;
                },
                _getItemToZoom: function() {
                    return !!b.currItem.hasSize && b.currItem.img;
                },
                _getOffset: function(c) {
                    var d;
                    d = c ? b.currItem.img : b.st.zoom.opener(b.currItem.el || b.currItem);
                    var e = d.offset(),
                        f = parseInt(d.css("padding-top"), 10),
                        g = parseInt(d.css("padding-bottom"), 10);
                    e.top -= a(window).scrollTop() - f;
                    var h = {
                        width: d.width(),
                        height: (u ? d.innerHeight() : d[0].offsetHeight) - g - f
                    };
                    return O() ? h["-moz-transform"] = h.transform = "translate(" + e.left + "px," + e.top + "px)" : (h.left = e.left,
                        h.top = e.top), h;
                }
            }
        });
        var P = "iframe",
            Q = "//about:blank",
            R = function(a) {
                if (b.currTemplate[P]) {
                    var c = b.currTemplate[P].find("iframe");
                    c.length && (a || (c[0].src = Q), b.isIE8 && c.css("display", a ? "block" : "none"));
                }
            };
        a.magnificPopup.registerModule(P, {
            options: {
                markup: '<div class="mfp-iframe-scaler"><div class="mfp-close"></div><iframe class="mfp-iframe" src="//about:blank" frameborder="0" allowfullscreen></iframe></div>',
                srcAction: "iframe_src",
                patterns: {
                    youtube: {
                        index: "youtube.com",
                        id: "v=",
                        src: "//www.youtube.com/embed/%id%?autoplay=1"
                    },
                    vimeo: {
                        index: "vimeo.com/",
                        id: "/",
                        src: "//player.vimeo.com/video/%id%?autoplay=1"
                    },
                    gmaps: {
                        index: "//maps.google.",
                        src: "%id%&output=embed"
                    }
                }
            },
            proto: {
                initIframe: function() {
                    b.types.push(P), w("BeforeChange", function(a, b, c) {
                        b !== c && (b === P ? R() : c === P && R(!0));
                    }), w(h + "." + P, function() {
                        R();
                    });
                },
                getIframe: function(c, d) {
                    var e = c.src,
                        f = b.st.iframe;
                    a.each(f.patterns, function() {
                        if (e.indexOf(this.index) > -1) return this.id && (e = "string" == typeof this.id ? e.substr(e.lastIndexOf(this.id) + this.id.length, e.length) : this.id.call(this, e)),
                            e = this.src.replace("%id%", e), !1;
                    });
                    var g = {};
                    return f.srcAction && (g[f.srcAction] = e), b._parseMarkup(d, g, c), b.updateStatus("ready"),
                        d;
                }
            }
        });
        var S = function(a) {
                var c = b.items.length;
                return a > c - 1 ? a - c : a < 0 ? c + a : a;
            },
            T = function(a, b, c) {
                return a.replace(/%curr%/gi, b + 1).replace(/%total%/gi, c);
            };
        a.magnificPopup.registerModule("gallery", {
            options: {
                enabled: !1,
                arrowMarkup: '<button title="%title%" type="button" class="mfp-arrow mfp-arrow-%dir%"></button>',
                preload: [0, 2],
                navigateByImgClick: !0,
                arrows: !0,
                tPrev: "Previous (Left arrow key)",
                tNext: "Next (Right arrow key)",
                tCounter: "%curr% of %total%"
            },
            proto: {
                initGallery: function() {
                    var c = b.st.gallery,
                        e = ".mfp-gallery";
                    return b.direction = !0, !(!c || !c.enabled) && (f += " mfp-gallery", w(m + e, function() {
                        c.navigateByImgClick && b.wrap.on("click" + e, ".mfp-img", function() {
                            if (b.items.length > 1) return b.next(), !1;
                        }), d.on("keydown" + e, function(a) {
                            37 === a.keyCode ? b.prev() : 39 === a.keyCode && b.next();
                        });
                    }), w("UpdateStatus" + e, function(a, c) {
                        c.text && (c.text = T(c.text, b.currItem.index, b.items.length));
                    }), w(l + e, function(a, d, e, f) {
                        var g = b.items.length;
                        e.counter = g > 1 ? T(c.tCounter, f.index, g) : "";
                    }), w("BuildControls" + e, function() {
                        if (b.items.length > 1 && c.arrows && !b.arrowLeft) {
                            var d = c.arrowMarkup,
                                e = b.arrowLeft = a(d.replace(/%title%/gi, c.tPrev).replace(/%dir%/gi, "left")).addClass(s),
                                f = b.arrowRight = a(d.replace(/%title%/gi, c.tNext).replace(/%dir%/gi, "right")).addClass(s);
                            e.click(function() {
                                b.prev();
                            }), f.click(function() {
                                b.next();
                            }), b.container.append(e.add(f));
                        }
                    }), w(n + e, function() {
                        b._preloadTimeout && clearTimeout(b._preloadTimeout), b._preloadTimeout = setTimeout(function() {
                            b.preloadNearbyImages(), b._preloadTimeout = null;
                        }, 16);
                    }), void w(h + e, function() {
                        d.off(e), b.wrap.off("click" + e), b.arrowRight = b.arrowLeft = null;
                    }));
                },
                next: function() {
                    b.direction = !0, b.index = S(b.index + 1), b.updateItemHTML();
                },
                prev: function() {
                    b.direction = !1, b.index = S(b.index - 1), b.updateItemHTML();
                },
                goTo: function(a) {
                    b.direction = a >= b.index, b.index = a, b.updateItemHTML();
                },
                preloadNearbyImages: function() {
                    var a, c = b.st.gallery.preload,
                        d = Math.min(c[0], b.items.length),
                        e = Math.min(c[1], b.items.length);
                    for (a = 1; a <= (b.direction ? e : d); a++) b._preloadItem(b.index + a);
                    for (a = 1; a <= (b.direction ? d : e); a++) b._preloadItem(b.index - a);
                },
                _preloadItem: function(c) {
                    if (c = S(c), !b.items[c].preloaded) {
                        var d = b.items[c];
                        d.parsed || (d = b.parseEl(c)), y("LazyLoad", d), "image" === d.type && (d.img = a('<img class="mfp-img" />').on("load.mfploader", function() {
                            d.hasSize = !0;
                        }).on("error.mfploader", function() {
                            d.hasSize = !0, d.loadError = !0, y("LazyLoadError", d);
                        }).attr("src", d.src)), d.preloaded = !0;
                    }
                }
            }
        });
        var U = "retina";
        a.magnificPopup.registerModule(U, {
            options: {
                replaceSrc: function(a) {
                    return a.src.replace(/\.\w+$/, function(a) {
                        return "@2x" + a;
                    });
                },
                ratio: 1
            },
            proto: {
                initRetina: function() {
                    if (window.devicePixelRatio > 1) {
                        var a = b.st.retina,
                            c = a.ratio;
                        c = isNaN(c) ? c() : c, c > 1 && (w("ImageHasSize." + U, function(a, b) {
                            b.img.css({
                                "max-width": b.img[0].naturalWidth / c,
                                width: "100%"
                            });
                        }), w("ElementParse." + U, function(b, d) {
                            d.src = a.replaceSrc(d, c);
                        }));
                    }
                }
            }
        }), A();
    }),
    function() {
        var a, b, c, d, e, f = function(a, b) {
                return function() {
                    return a.apply(b, arguments);
                };
            },
            g = [].indexOf || function(a) {
                for (var b = 0, c = this.length; b < c; b++)
                    if (b in this && this[b] === a) return b;
                return -1;
            };
        b = function() {
            function a() {}
            return a.prototype.extend = function(a, b) {
                var c, d;
                for (c in b) d = b[c], null == a[c] && (a[c] = d);
                return a;
            }, a.prototype.isMobile = function(a) {
                return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(a);
            }, a.prototype.createEvent = function(a, b, c, d) {
                var e;
                return null == b && (b = !1), null == c && (c = !1), null == d && (d = null), null != document.createEvent ? (e = document.createEvent("CustomEvent"),
                    e.initCustomEvent(a, b, c, d)) : null != document.createEventObject ? (e = document.createEventObject(),
                    e.eventType = a) : e.eventName = a, e;
            }, a.prototype.emitEvent = function(a, b) {
                return null != a.dispatchEvent ? a.dispatchEvent(b) : b in (null != a) ? a[b]() : "on" + b in (null != a) ? a["on" + b]() : void 0;
            }, a.prototype.addEvent = function(a, b, c) {
                return null != a.addEventListener ? a.addEventListener(b, c, !1) : null != a.attachEvent ? a.attachEvent("on" + b, c) : a[b] = c;
            }, a.prototype.removeEvent = function(a, b, c) {
                return null != a.removeEventListener ? a.removeEventListener(b, c, !1) : null != a.detachEvent ? a.detachEvent("on" + b, c) : delete a[b];
            }, a.prototype.innerHeight = function() {
                return "innerHeight" in window ? window.innerHeight : document.documentElement.clientHeight;
            }, a;
        }(), c = this.WeakMap || this.MozWeakMap || (c = function() {
            function a() {
                this.keys = [], this.values = [];
            }
            return a.prototype.get = function(a) {
                var b, c, d, e, f;
                for (f = this.keys, b = d = 0, e = f.length; d < e; b = ++d)
                    if (c = f[b], c === a) return this.values[b];
            }, a.prototype.set = function(a, b) {
                var c, d, e, f, g;
                for (g = this.keys, c = e = 0, f = g.length; e < f; c = ++e)
                    if (d = g[c], d === a) return void(this.values[c] = b);
                return this.keys.push(a), this.values.push(b);
            }, a;
        }()), a = this.MutationObserver || this.WebkitMutationObserver || this.MozMutationObserver || (a = function() {
            function a() {
                "undefined" != typeof console && null !== console && console.warn("MutationObserver is not supported by your browser."),
                    "undefined" != typeof console && null !== console && console.warn("WOW.js cannot detect dom mutations, please call .sync() after loading new content.");
            }
            return a.notSupported = !0, a.prototype.observe = function() {}, a;
        }()), d = this.getComputedStyle || function(a, b) {
            return this.getPropertyValue = function(b) {
                var c;
                return "float" === b && (b = "styleFloat"), e.test(b) && b.replace(e, function(a, b) {
                    return b.toUpperCase();
                }), (null != (c = a.currentStyle) ? c[b] : void 0) || null;
            }, this;
        }, e = /(\-([a-z]){1})/g, this.WOW = function() {
            function e(a) {
                null == a && (a = {}), this.scrollCallback = f(this.scrollCallback, this), this.scrollHandler = f(this.scrollHandler, this),
                    this.resetAnimation = f(this.resetAnimation, this), this.start = f(this.start, this),
                    this.scrolled = !0, this.config = this.util().extend(a, this.defaults), this.animationNameCache = new c(),
                    this.wowEvent = this.util().createEvent(this.config.boxClass);
            }
            return e.prototype.defaults = {
                boxClass: "wow",
                animateClass: "animated",
                offset: 0,
                mobile: !0,
                live: !0,
                callback: null
            }, e.prototype.init = function() {
                var a;
                return this.element = window.document.documentElement, "interactive" === (a = document.readyState) || "complete" === a ? this.start() : this.util().addEvent(document, "DOMContentLoaded", this.start),
                    this.finished = [];
            }, e.prototype.start = function() {
                var b, c, d, e;
                if (this.stopped = !1, this.boxes = function() {
                        var a, c, d, e;
                        for (d = this.element.querySelectorAll("." + this.config.boxClass), e = [], a = 0,
                            c = d.length; a < c; a++) b = d[a], e.push(b);
                        return e;
                    }.call(this), this.all = function() {
                        var a, c, d, e;
                        for (d = this.boxes, e = [], a = 0, c = d.length; a < c; a++) b = d[a], e.push(b);
                        return e;
                    }.call(this), this.boxes.length)
                    if (this.disabled()) this.resetStyle();
                    else
                        for (e = this.boxes,
                            c = 0, d = e.length; c < d; c++) b = e[c], this.applyStyle(b, !0);
                if (this.disabled() || (this.util().addEvent(window, "scroll", this.scrollHandler),
                        this.util().addEvent(window, "resize", this.scrollHandler), this.interval = setInterval(this.scrollCallback, 50)),
                    this.config.live) return new a(function(a) {
                    return function(b) {
                        var c, d, e, f, g;
                        for (g = [], c = 0, d = b.length; c < d; c++) f = b[c], g.push(function() {
                            var a, b, c, d;
                            for (c = f.addedNodes || [], d = [], a = 0, b = c.length; a < b; a++) e = c[a],
                                d.push(this.doSync(e));
                            return d;
                        }.call(a));
                        return g;
                    };
                }(this)).observe(document.body, {
                    childList: !0,
                    subtree: !0
                });
            }, e.prototype.stop = function() {
                if (this.stopped = !0, this.util().removeEvent(window, "scroll", this.scrollHandler),
                    this.util().removeEvent(window, "resize", this.scrollHandler), null != this.interval) return clearInterval(this.interval);
            }, e.prototype.sync = function(b) {
                if (a.notSupported) return this.doSync(this.element);
            }, e.prototype.doSync = function(a) {
                var b, c, d, e, f;
                if (null == a && (a = this.element), 1 === a.nodeType) {
                    for (a = a.parentNode || a, e = a.querySelectorAll("." + this.config.boxClass),
                        f = [], c = 0, d = e.length; c < d; c++) b = e[c], g.call(this.all, b) < 0 ? (this.boxes.push(b),
                        this.all.push(b), this.stopped || this.disabled() ? this.resetStyle() : this.applyStyle(b, !0),
                        f.push(this.scrolled = !0)) : f.push(void 0);
                    return f;
                }
            }, e.prototype.show = function(a) {
                return this.applyStyle(a), a.className = a.className + " " + this.config.animateClass,
                    null != this.config.callback && this.config.callback(a), this.util().emitEvent(a, this.wowEvent),
                    this.util().addEvent(a, "animationend", this.resetAnimation), this.util().addEvent(a, "oanimationend", this.resetAnimation),
                    this.util().addEvent(a, "webkitAnimationEnd", this.resetAnimation), this.util().addEvent(a, "MSAnimationEnd", this.resetAnimation),
                    a;
            }, e.prototype.applyStyle = function(a, b) {
                var c, d, e;
                return d = a.getAttribute("data-wow-duration"), c = a.getAttribute("data-wow-delay"),
                    e = a.getAttribute("data-wow-iteration"), this.animate(function(f) {
                        return function() {
                            return f.customStyle(a, b, d, c, e);
                        };
                    }(this));
            }, e.prototype.animate = function() {
                return "requestAnimationFrame" in window ? function(a) {
                    return window.requestAnimationFrame(a);
                } : function(a) {
                    return a();
                };
            }(), e.prototype.resetStyle = function() {
                var a, b, c, d, e;
                for (d = this.boxes, e = [], b = 0, c = d.length; b < c; b++) a = d[b], e.push(a.style.visibility = "visible");
                return e;
            }, e.prototype.resetAnimation = function(a) {
                var b;
                if (a.type.toLowerCase().indexOf("animationend") >= 0) return b = a.target || a.srcElement,
                    b.className = b.className.replace(this.config.animateClass, "").trim();
            }, e.prototype.customStyle = function(a, b, c, d, e) {
                return b && this.cacheAnimationName(a), a.style.visibility = b ? "hidden" : "visible",
                    c && this.vendorSet(a.style, {
                        animationDuration: c
                    }), d && this.vendorSet(a.style, {
                        animationDelay: d
                    }), e && this.vendorSet(a.style, {
                        animationIterationCount: e
                    }), this.vendorSet(a.style, {
                        animationName: b ? "none" : this.cachedAnimationName(a)
                    }), a;
            }, e.prototype.vendors = ["moz", "webkit"], e.prototype.vendorSet = function(a, b) {
                var c, d, e, f;
                d = [];
                for (c in b) e = b[c], a["" + c] = e, d.push(function() {
                    var b, d, g, h;
                    for (g = this.vendors, h = [], b = 0, d = g.length; b < d; b++) f = g[b], h.push(a["" + f + c.charAt(0).toUpperCase() + c.substr(1)] = e);
                    return h;
                }.call(this));
                return d;
            }, e.prototype.vendorCSS = function(a, b) {
                var c, e, f, g, h, i;
                for (h = d(a), g = h.getPropertyCSSValue(b), f = this.vendors, c = 0, e = f.length; c < e; c++) i = f[c],
                    g = g || h.getPropertyCSSValue("-" + i + "-" + b);
                return g;
            }, e.prototype.animationName = function(a) {
                var b;
                try {
                    b = this.vendorCSS(a, "animation-name").cssText;
                } catch (c) {
                    b = d(a).getPropertyValue("animation-name");
                }
                return "none" === b ? "" : b;
            }, e.prototype.cacheAnimationName = function(a) {
                return this.animationNameCache.set(a, this.animationName(a));
            }, e.prototype.cachedAnimationName = function(a) {
                return this.animationNameCache.get(a);
            }, e.prototype.scrollHandler = function() {
                return this.scrolled = !0;
            }, e.prototype.scrollCallback = function() {
                var a;
                if (this.scrolled && (this.scrolled = !1, this.boxes = function() {
                        var b, c, d, e;
                        for (d = this.boxes, e = [], b = 0, c = d.length; b < c; b++) a = d[b], a && (this.isVisible(a) ? this.show(a) : e.push(a));
                        return e;
                    }.call(this), !this.boxes.length && !this.config.live)) return this.stop();
            }, e.prototype.offsetTop = function(a) {
                for (var b; void 0 === a.offsetTop;) a = a.parentNode;
                for (b = a.offsetTop; a = a.offsetParent;) b += a.offsetTop;
                return b;
            }, e.prototype.isVisible = function(a) {
                var b, c, d, e, f;
                return c = a.getAttribute("data-wow-offset") || this.config.offset, f = window.pageYOffset,
                    e = f + Math.min(this.element.clientHeight, this.util().innerHeight()) - c, d = this.offsetTop(a),
                    b = d + a.clientHeight, d <= e && b >= f;
            }, e.prototype.util = function() {
                return null != this._util ? this._util : this._util = new b();
            }, e.prototype.disabled = function() {
                return !this.config.mobile && this.util().isMobile(navigator.userAgent);
            }, e;
        }();
    }.call(this), $(function() {
        $("#contactForm input,#contactForm textarea").jqBootstrapValidation({
            preventSubmit: !0,
            submitError: function(a, b, c) {},
            submitSuccess: function(a, b) {
                b.preventDefault();
                var c = $("input#name").val(),
                    d = $("input#email").val(),
                    e = $("input#phone").val(),
                    f = $("textarea#message").val(),
                    g = c;
                g.indexOf(" ") >= 0 && (g = c.split(" ").slice(0, -1).join(" ")), $.ajax({
                    url: "./mail/contact_me.php",
                    type: "POST",
                    data: {
                        name: c,
                        phone: e,
                        email: d,
                        message: f
                    },
                    cache: !1,
                    success: function() {
                        $("#success").html("<div class='alert alert-success'>"), $("#success > .alert-success").html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;").append("</button>"),
                            $("#success > .alert-success").append("<strong>Your message has been sent. </strong>"),
                            $("#success > .alert-success").append("</div>"), $("#contactForm").trigger("reset");
                    },
                    error: function() {
                        $("#success").html("<div class='alert alert-danger'>"), $("#success > .alert-danger").html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;").append("</button>"),
                            $("#success > .alert-danger").append("<strong>Sorry " + g + ", it seems that my mail server is not responding. Please try again later!"),
                            $("#success > .alert-danger").append("</div>"), $("#contactForm").trigger("reset");
                    }
                });
            },
            filter: function() {
                return $(this).is(":visible");
            }
        }), $('a[data-toggle="tab"]').click(function(a) {
            a.preventDefault(), $(this).tab("show");
        });
    }), $("#name").focus(function() {
        $("#success").html("");
    }),
    function(a) {
        function b(a) {
            return new RegExp("^" + a + "$");
        }

        function c(a, b) {
            for (var c = Array.prototype.slice.call(arguments).splice(2), d = a.split("."), e = d.pop(), f = 0; f < d.length; f++) b = b[d[f]];
            return b[e].apply(this, c);
        }
        var d = [],
            e = {
                options: {
                    prependExistingHelpBlock: !1,
                    sniffHtml: !0,
                    preventSubmit: !0,
                    submitError: !1,
                    submitSuccess: !1,
                    semanticallyStrict: !1,
                    autoAdd: {
                        helpBlocks: !0
                    },
                    filter: function() {
                        return !0;
                    }
                },
                methods: {
                    init: function(b) {
                        var c = a.extend(!0, {}, e);
                        c.options = a.extend(!0, c.options, b);
                        var h = this,
                            i = a.unique(h.map(function() {
                                return a(this).parents("form")[0];
                            }).toArray());
                        return a(i).bind("submit", function(b) {
                            var d = a(this),
                                e = 0,
                                f = d.find("input,textarea,select").not("[type=submit],[type=image]").filter(c.options.filter);
                            f.trigger("submit.validation").trigger("validationLostFocus.validation"), f.each(function(b, c) {
                                var d = a(c),
                                    f = d.parents(".control-group").first();
                                f.hasClass("warning") && (f.removeClass("warning").addClass("error"), e++);
                            }), f.trigger("validationLostFocus.validation"), e ? (c.options.preventSubmit && b.preventDefault(),
                                d.addClass("error"), a.isFunction(c.options.submitError) && c.options.submitError(d, b, f.jqBootstrapValidation("collectErrors", !0))) : (d.removeClass("error"),
                                a.isFunction(c.options.submitSuccess) && c.options.submitSuccess(d, b));
                        }), this.each(function() {
                            var b = a(this),
                                e = b.parents(".control-group").first(),
                                h = e.find(".help-block").first(),
                                i = b.parents("form").first(),
                                j = [];
                            if (!h.length && c.options.autoAdd && c.options.autoAdd.helpBlocks && (h = a('<div class="help-block" />'),
                                    e.find(".controls").append(h), d.push(h[0])), c.options.sniffHtml) {
                                var k = "";
                                if (void 0 !== b.attr("pattern") && (k = "Not in the expected format<!-- data-validation-pattern-message to override -->",
                                        b.data("validationPatternMessage") && (k = b.data("validationPatternMessage")),
                                        b.data("validationPatternMessage", k), b.data("validationPatternRegex", b.attr("pattern"))),
                                    void 0 !== b.attr("max") || void 0 !== b.attr("aria-valuemax")) {
                                    var l = void 0 !== b.attr("max") ? b.attr("max") : b.attr("aria-valuemax");
                                    k = "Too high: Maximum of '" + l + "'<!-- data-validation-max-message to override -->",
                                        b.data("validationMaxMessage") && (k = b.data("validationMaxMessage")), b.data("validationMaxMessage", k),
                                        b.data("validationMaxMax", l);
                                }
                                if (void 0 !== b.attr("min") || void 0 !== b.attr("aria-valuemin")) {
                                    var m = void 0 !== b.attr("min") ? b.attr("min") : b.attr("aria-valuemin");
                                    k = "Too low: Minimum of '" + m + "'<!-- data-validation-min-message to override -->",
                                        b.data("validationMinMessage") && (k = b.data("validationMinMessage")), b.data("validationMinMessage", k),
                                        b.data("validationMinMin", m);
                                }
                                void 0 !== b.attr("maxlength") && (k = "Too long: Maximum of '" + b.attr("maxlength") + "' characters<!-- data-validation-maxlength-message to override -->",
                                        b.data("validationMaxlengthMessage") && (k = b.data("validationMaxlengthMessage")),
                                        b.data("validationMaxlengthMessage", k), b.data("validationMaxlengthMaxlength", b.attr("maxlength"))),
                                    void 0 !== b.attr("minlength") && (k = "Too short: Minimum of '" + b.attr("minlength") + "' characters<!-- data-validation-minlength-message to override -->",
                                        b.data("validationMinlengthMessage") && (k = b.data("validationMinlengthMessage")),
                                        b.data("validationMinlengthMessage", k), b.data("validationMinlengthMinlength", b.attr("minlength"))),
                                    void 0 === b.attr("required") && void 0 === b.attr("aria-required") || (k = c.builtInValidators.required.message,
                                        b.data("validationRequiredMessage") && (k = b.data("validationRequiredMessage")),
                                        b.data("validationRequiredMessage", k)), void 0 !== b.attr("type") && "number" === b.attr("type").toLowerCase() && (k = c.builtInValidators.number.message,
                                        b.data("validationNumberMessage") && (k = b.data("validationNumberMessage")), b.data("validationNumberMessage", k)),
                                    void 0 !== b.attr("type") && "email" === b.attr("type").toLowerCase() && (k = "Not a valid email address<!-- data-validator-validemail-message to override -->",
                                        b.data("validationValidemailMessage") ? k = b.data("validationValidemailMessage") : b.data("validationEmailMessage") && (k = b.data("validationEmailMessage")),
                                        b.data("validationValidemailMessage", k)), void 0 !== b.attr("minchecked") && (k = "Not enough options checked; Minimum of '" + b.attr("minchecked") + "' required<!-- data-validation-minchecked-message to override -->",
                                        b.data("validationMincheckedMessage") && (k = b.data("validationMincheckedMessage")),
                                        b.data("validationMincheckedMessage", k), b.data("validationMincheckedMinchecked", b.attr("minchecked"))),
                                    void 0 !== b.attr("maxchecked") && (k = "Too many options checked; Maximum of '" + b.attr("maxchecked") + "' required<!-- data-validation-maxchecked-message to override -->",
                                        b.data("validationMaxcheckedMessage") && (k = b.data("validationMaxcheckedMessage")),
                                        b.data("validationMaxcheckedMessage", k), b.data("validationMaxcheckedMaxchecked", b.attr("maxchecked")));
                            }
                            void 0 !== b.data("validation") && (j = b.data("validation").split(",")), a.each(b.data(), function(a, b) {
                                var c = a.replace(/([A-Z])/g, ",$1").split(",");
                                "validation" === c[0] && c[1] && j.push(c[1]);
                            });
                            var n = j,
                                o = [];
                            do a.each(j, function(a, b) {
                                j[a] = f(b);
                            }), j = a.unique(j), o = [], a.each(n, function(d, e) {
                                if (void 0 !== b.data("validation" + e + "Shortcut")) a.each(b.data("validation" + e + "Shortcut").split(","), function(a, b) {
                                    o.push(b);
                                });
                                else if (c.builtInValidators[e.toLowerCase()]) {
                                    var g = c.builtInValidators[e.toLowerCase()];
                                    "shortcut" === g.type.toLowerCase() && a.each(g.shortcut.split(","), function(a, b) {
                                        b = f(b), o.push(b), j.push(b);
                                    });
                                }
                            }), n = o; while (n.length > 0);
                            var p = {};
                            a.each(j, function(d, e) {
                                    var g = b.data("validation" + e + "Message"),
                                        h = void 0 !== g,
                                        i = !1;
                                    if (g = g ? g : "'" + e + "' validation failed <!-- Add attribute 'data-validation-" + e.toLowerCase() + "-message' to input to change this message -->",
                                        a.each(c.validatorTypes, function(c, d) {
                                            void 0 === p[c] && (p[c] = []), i || void 0 === b.data("validation" + e + f(d.name)) || (p[c].push(a.extend(!0, {
                                                name: f(d.name),
                                                message: g
                                            }, d.init(b, e))), i = !0);
                                        }), !i && c.builtInValidators[e.toLowerCase()]) {
                                        var j = a.extend(!0, {}, c.builtInValidators[e.toLowerCase()]);
                                        h && (j.message = g);
                                        var k = j.type.toLowerCase();
                                        "shortcut" === k ? i = !0 : a.each(c.validatorTypes, function(c, d) {
                                            void 0 === p[c] && (p[c] = []), i || k !== c.toLowerCase() || (b.data("validation" + e + f(d.name), j[d.name.toLowerCase()]),
                                                p[k].push(a.extend(j, d.init(b, e))), i = !0);
                                        });
                                    }
                                    i || a.error("Cannot find validation info for '" + e + "'");
                                }), h.data("original-contents", h.data("original-contents") ? h.data("original-contents") : h.html()),
                                h.data("original-role", h.data("original-role") ? h.data("original-role") : h.attr("role")),
                                e.data("original-classes", e.data("original-clases") ? e.data("original-classes") : e.attr("class")),
                                b.data("original-aria-invalid", b.data("original-aria-invalid") ? b.data("original-aria-invalid") : b.attr("aria-invalid")),
                                b.bind("validation.validation", function(d, e) {
                                    var f = g(b),
                                        h = [];
                                    return a.each(p, function(d, g) {
                                        (f || f.length || e && e.includeEmpty || c.validatorTypes[d].blockSubmit && e && e.submitting) && a.each(g, function(a, e) {
                                            c.validatorTypes[d].validate(b, f, e) && h.push(e.message);
                                        });
                                    }), h;
                                }), b.bind("getValidators.validation", function() {
                                    return p;
                                }), b.bind("submit.validation", function() {
                                    return b.triggerHandler("change.validation", {
                                        submitting: !0
                                    });
                                }), b.bind(["keyup", "focus", "blur", "click", "keydown", "keypress", "change"].join(".validation ") + ".validation", function(d, f) {
                                    var j = g(b),
                                        k = [];
                                    e.find("input,textarea,select").each(function(c, d) {
                                            var e = k.length;
                                            if (a.each(a(d).triggerHandler("validation.validation", f), function(a, b) {
                                                    k.push(b);
                                                }), k.length > e) a(d).attr("aria-invalid", "true");
                                            else {
                                                var g = b.data("original-aria-invalid");
                                                a(d).attr("aria-invalid", void 0 !== g && g);
                                            }
                                        }), i.find("input,select,textarea").not(b).not('[name="' + b.attr("name") + '"]').trigger("validationLostFocus.validation"),
                                        k = a.unique(k.sort()), k.length ? (e.removeClass("success error").addClass("warning"),
                                            c.options.semanticallyStrict && 1 === k.length ? h.html(k[0] + (c.options.prependExistingHelpBlock ? h.data("original-contents") : "")) : h.html('<ul role="alert"><li>' + k.join("</li><li>") + "</li></ul>" + (c.options.prependExistingHelpBlock ? h.data("original-contents") : ""))) : (e.removeClass("warning error success"),
                                            j.length > 0 && e.addClass("success"), h.html(h.data("original-contents"))), "blur" === d.type && e.removeClass("success");
                                }), b.bind("validationLostFocus.validation", function() {
                                    e.removeClass("success");
                                });
                        });
                    },
                    destroy: function() {
                        return this.each(function() {
                            var b = a(this),
                                c = b.parents(".control-group").first(),
                                e = c.find(".help-block").first();
                            b.unbind(".validation"), e.html(e.data("original-contents")), c.attr("class", c.data("original-classes")),
                                b.attr("aria-invalid", b.data("original-aria-invalid")), e.attr("role", b.data("original-role")),
                                d.indexOf(e[0]) > -1 && e.remove();
                        });
                    },
                    collectErrors: function(b) {
                        var c = {};
                        return this.each(function(b, d) {
                            var e = a(d),
                                f = e.attr("name"),
                                g = e.triggerHandler("validation.validation", {
                                    includeEmpty: !0
                                });
                            c[f] = a.extend(!0, g, c[f]);
                        }), a.each(c, function(a, b) {
                            0 === b.length && delete c[a];
                        }), c;
                    },
                    hasErrors: function() {
                        var b = [];
                        return this.each(function(c, d) {
                            b = b.concat(a(d).triggerHandler("getValidators.validation") ? a(d).triggerHandler("validation.validation", {
                                submitting: !0
                            }) : []);
                        }), b.length > 0;
                    },
                    override: function(b) {
                        e = a.extend(!0, e, b);
                    }
                },
                validatorTypes: {
                    callback: {
                        name: "callback",
                        init: function(a, b) {
                            return {
                                validatorName: b,
                                callback: a.data("validation" + b + "Callback"),
                                lastValue: a.val(),
                                lastValid: !0,
                                lastFinished: !0
                            };
                        },
                        validate: function(a, b, d) {
                            if (d.lastValue === b && d.lastFinished) return !d.lastValid;
                            if (d.lastFinished === !0) {
                                d.lastValue = b, d.lastValid = !0, d.lastFinished = !1;
                                var e = d,
                                    f = a;
                                c(d.callback, window, a, b, function(a) {
                                    e.lastValue === a.value && (e.lastValid = a.valid, a.message && (e.message = a.message),
                                        e.lastFinished = !0, f.data("validation" + e.validatorName + "Message", e.message),
                                        setTimeout(function() {
                                            f.trigger("change.validation");
                                        }, 1));
                                });
                            }
                            return !1;
                        }
                    },
                    ajax: {
                        name: "ajax",
                        init: function(a, b) {
                            return {
                                validatorName: b,
                                url: a.data("validation" + b + "Ajax"),
                                lastValue: a.val(),
                                lastValid: !0,
                                lastFinished: !0
                            };
                        },
                        validate: function(b, c, d) {
                            return "" + d.lastValue == "" + c && d.lastFinished === !0 ? d.lastValid === !1 : (d.lastFinished === !0 && (d.lastValue = c,
                                d.lastValid = !0, d.lastFinished = !1, a.ajax({
                                    url: d.url,
                                    data: "value=" + c + "&field=" + b.attr("name"),
                                    dataType: "json",
                                    success: function(a) {
                                        "" + d.lastValue == "" + a.value && (d.lastValid = !!a.valid, a.message && (d.message = a.message),
                                            d.lastFinished = !0, b.data("validation" + d.validatorName + "Message", d.message),
                                            setTimeout(function() {
                                                b.trigger("change.validation");
                                            }, 1));
                                    },
                                    failure: function() {
                                        d.lastValid = !0, d.message = "ajax call failed", d.lastFinished = !0, b.data("validation" + d.validatorName + "Message", d.message),
                                            setTimeout(function() {
                                                b.trigger("change.validation");
                                            }, 1);
                                    }
                                })), !1);
                        }
                    },
                    regex: {
                        name: "regex",
                        init: function(a, c) {
                            return {
                                regex: b(a.data("validation" + c + "Regex"))
                            };
                        },
                        validate: function(a, b, c) {
                            return !c.regex.test(b) && !c.negative || c.regex.test(b) && c.negative;
                        }
                    },
                    required: {
                        name: "required",
                        init: function(a, b) {
                            return {};
                        },
                        validate: function(a, b, c) {
                            return !(0 !== b.length || c.negative) || !!(b.length > 0 && c.negative);
                        },
                        blockSubmit: !0
                    },
                    match: {
                        name: "match",
                        init: function(a, b) {
                            var c = a.parents("form").first().find('[name="' + a.data("validation" + b + "Match") + '"]').first();
                            return c.bind("validation.validation", function() {
                                a.trigger("change.validation", {
                                    submitting: !0
                                });
                            }), {
                                element: c
                            };
                        },
                        validate: function(a, b, c) {
                            return b !== c.element.val() && !c.negative || b === c.element.val() && c.negative;
                        },
                        blockSubmit: !0
                    },
                    max: {
                        name: "max",
                        init: function(a, b) {
                            return {
                                max: a.data("validation" + b + "Max")
                            };
                        },
                        validate: function(a, b, c) {
                            return parseFloat(b, 10) > parseFloat(c.max, 10) && !c.negative || parseFloat(b, 10) <= parseFloat(c.max, 10) && c.negative;
                        }
                    },
                    min: {
                        name: "min",
                        init: function(a, b) {
                            return {
                                min: a.data("validation" + b + "Min")
                            };
                        },
                        validate: function(a, b, c) {
                            return parseFloat(b) < parseFloat(c.min) && !c.negative || parseFloat(b) >= parseFloat(c.min) && c.negative;
                        }
                    },
                    maxlength: {
                        name: "maxlength",
                        init: function(a, b) {
                            return {
                                maxlength: a.data("validation" + b + "Maxlength")
                            };
                        },
                        validate: function(a, b, c) {
                            return b.length > c.maxlength && !c.negative || b.length <= c.maxlength && c.negative;
                        }
                    },
                    minlength: {
                        name: "minlength",
                        init: function(a, b) {
                            return {
                                minlength: a.data("validation" + b + "Minlength")
                            };
                        },
                        validate: function(a, b, c) {
                            return b.length < c.minlength && !c.negative || b.length >= c.minlength && c.negative;
                        }
                    },
                    maxchecked: {
                        name: "maxchecked",
                        init: function(a, b) {
                            var c = a.parents("form").first().find('[name="' + a.attr("name") + '"]');
                            return c.bind("click.validation", function() {
                                a.trigger("change.validation", {
                                    includeEmpty: !0
                                });
                            }), {
                                maxchecked: a.data("validation" + b + "Maxchecked"),
                                elements: c
                            };
                        },
                        validate: function(a, b, c) {
                            return c.elements.filter(":checked").length > c.maxchecked && !c.negative || c.elements.filter(":checked").length <= c.maxchecked && c.negative;
                        },
                        blockSubmit: !0
                    },
                    minchecked: {
                        name: "minchecked",
                        init: function(a, b) {
                            var c = a.parents("form").first().find('[name="' + a.attr("name") + '"]');
                            return c.bind("click.validation", function() {
                                a.trigger("change.validation", {
                                    includeEmpty: !0
                                });
                            }), {
                                minchecked: a.data("validation" + b + "Minchecked"),
                                elements: c
                            };
                        },
                        validate: function(a, b, c) {
                            return c.elements.filter(":checked").length < c.minchecked && !c.negative || c.elements.filter(":checked").length >= c.minchecked && c.negative;
                        },
                        blockSubmit: !0
                    }
                },
                builtInValidators: {
                    email: {
                        name: "Email",
                        type: "shortcut",
                        shortcut: "validemail"
                    },
                    validemail: {
                        name: "Validemail",
                        type: "regex",
                        regex: "[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,4}",
                        message: "Not a valid email address<!-- data-validator-validemail-message to override -->"
                    },
                    passwordagain: {
                        name: "Passwordagain",
                        type: "match",
                        match: "password",
                        message: "Does not match the given password<!-- data-validator-paswordagain-message to override -->"
                    },
                    positive: {
                        name: "Positive",
                        type: "shortcut",
                        shortcut: "number,positivenumber"
                    },
                    negative: {
                        name: "Negative",
                        type: "shortcut",
                        shortcut: "number,negativenumber"
                    },
                    number: {
                        name: "Number",
                        type: "regex",
                        regex: "([+-]?\\d+(\\.\\d*)?([eE][+-]?[0-9]+)?)?",
                        message: "Must be a number<!-- data-validator-number-message to override -->"
                    },
                    integer: {
                        name: "Integer",
                        type: "regex",
                        regex: "[+-]?\\d+",
                        message: "No decimal places allowed<!-- data-validator-integer-message to override -->"
                    },
                    positivenumber: {
                        name: "Positivenumber",
                        type: "min",
                        min: 0,
                        message: "Must be a positive number<!-- data-validator-positivenumber-message to override -->"
                    },
                    negativenumber: {
                        name: "Negativenumber",
                        type: "max",
                        max: 0,
                        message: "Must be a negative number<!-- data-validator-negativenumber-message to override -->"
                    },
                    required: {
                        name: "Required",
                        type: "required",
                        message: "This is required<!-- data-validator-required-message to override -->"
                    },
                    checkone: {
                        name: "Checkone",
                        type: "minchecked",
                        minchecked: 1,
                        message: "Check at least one option<!-- data-validation-checkone-message to override -->"
                    }
                }
            },
            f = function(a) {
                return a.toLowerCase().replace(/(^|\s)([a-z])/g, function(a, b, c) {
                    return b + c.toUpperCase();
                });
            },
            g = function(b) {
                var c = b.val(),
                    d = b.attr("type");
                return "checkbox" === d && (c = b.is(":checked") ? c : ""), "radio" === d && (c = a('input[name="' + b.attr("name") + '"]:checked').length > 0 ? c : ""),
                    c;
            };
        a.fn.jqBootstrapValidation = function(b) {
            return e.methods[b] ? e.methods[b].apply(this, Array.prototype.slice.call(arguments, 1)) : "object" != typeof b && b ? (a.error("Method " + b + " does not exist on jQuery.jqBootstrapValidation"),
                null) : e.methods.init.apply(this, arguments);
        }, a.jqBootstrapValidation = function(b) {
            a(":input").not("[type=image],[type=submit]").jqBootstrapValidation.apply(this, arguments);
        };
    }(jQuery), ! function(a) {
        "function" == typeof define && define.amd ? define(["jquery", "./core"], a) : a(jQuery, Formstone);
    }(function(a, b) {
        function c(b) {
            b = b || {};
            for (var c in t) t.hasOwnProperty(c) && (l[c] = b[c] ? a.merge(b[c], l[c]) : l[c]);
            l = a.extend(l, b), l.minWidth.sort(p.sortDesc), l.maxWidth.sort(p.sortAsc), l.minHeight.sort(p.sortDesc),
                l.maxHeight.sort(p.sortAsc);
            for (var d in t)
                if (t.hasOwnProperty(d)) {
                    s[d] = {};
                    for (var e in l[d])
                        if (l[d].hasOwnProperty(e)) {
                            var f = window.matchMedia("(" + t[d] + ": " + (l[d][e] === 1 / 0 ? 1e5 : l[d][e]) + l.unit + ")");
                            f.addListener(g), s[d][l[d][e]] = f;
                        }
                }
            g();
        }

        function d(a, b, c) {
            var d = o.matchMedia(b),
                e = i(d.media);
            r[e] || (r[e] = {
                mq: d,
                active: !0,
                enter: {},
                leave: {}
            }, r[e].mq.addListener(h));
            for (var f in c) c.hasOwnProperty(f) && r[e].hasOwnProperty(f) && (r[e][f][a] = c[f]);
            var g = r[e],
                j = d.matches;
            j && g[m.enter].hasOwnProperty(a) ? (g[m.enter][a].apply(d), g.active = !0) : !j && g[m.leave].hasOwnProperty(a) && (g[m.leave][a].apply(d),
                g.active = !1);
        }

        function e(a, b) {
            if (a)
                if (b) {
                    var c = i(b);
                    r[c] && (r[c].enter[a] && delete r[c].enter[a], r[c].leave[a] && delete r[c].leave[a]);
                } else
                    for (var d in r) r.hasOwnProperty(d) && (r[d].enter[a] && delete r[d].enter[a],
                        r[d].leave[a] && delete r[d].leave[a]);
        }

        function f() {
            q = {
                unit: l.unit
            };
            for (var a in t)
                if (t.hasOwnProperty(a))
                    for (var c in s[a])
                        if (s[a].hasOwnProperty(c)) {
                            var d = "Infinity" === c ? 1 / 0 : parseInt(c, 10),
                                e = t[a].indexOf("width") > -1 ? b.fallbackWidth : b.fallbackHeight,
                                f = a.indexOf("max") > -1;
                            b.support.nativeMatchMedia ? s[a][c].matches && (f ? (!q[a] || d < q[a]) && (q[a] = d) : (!q[a] || d > q[a]) && (q[a] = d)) : f ? !q[a] && d > e && (q[a] = d) : (!q[a] && 0 !== q[a] || d > q[a] && d < e) && (q[a] = d);
                        }
        }

        function g() {
            f(), n.trigger(m.mqChange, [q]);
        }

        function h(a) {
            var b = i(a.media),
                c = r[b],
                d = a.matches,
                e = d ? m.enter : m.leave;
            if (c && (c.active || !c.active && d)) {
                for (var f in c[e]) c[e].hasOwnProperty(f) && c[e][f].apply(c.mq);
                c.active = !0;
            }
        }

        function i(a) {
            return a.replace(/[^a-z0-9\s]/gi, "").replace(/[_\s]/g, "").replace(/^\s+|\s+$/g, "");
        }

        function j() {
            return q;
        }
        var k = b.Plugin("mediaquery", {
                utilities: {
                    _initialize: c,
                    state: j,
                    bind: d,
                    unbind: e
                },
                events: {
                    mqChange: "mqchange"
                }
            }),
            l = {
                minWidth: [0],
                maxWidth: [1 / 0],
                minHeight: [0],
                maxHeight: [1 / 0],
                unit: "px"
            },
            m = a.extend(k.events, {
                enter: "enter",
                leave: "leave"
            }),
            n = b.$window,
            o = n[0],
            p = k.functions,
            q = null,
            r = [],
            s = {},
            t = {
                minWidth: "min-width",
                maxWidth: "max-width",
                minHeight: "min-height",
                maxHeight: "max-height"
            };
    });

var isPhoneDevice = "ontouchstart" in document.documentElement;

$(document).ready(function() {
        isPhoneDevice || (wow = new WOW({
            offset: 50
        }), wow.init());
    }),
    function(a) {
        a("a.page-scroll").bind("click", function(b) {
            var c = a(this);
            a("html, body").stop().animate({
                scrollTop: a(c.attr("href")).offset().top - 50
            }, 1250, "easeInOutExpo"), b.preventDefault();
        }), a("body").on("input propertychange", ".floating-label-form-group", function(b) {
            a(this).toggleClass("floating-label-form-group-with-value", !!a(b.target).val());
        }).on("focus", ".floating-label-form-group", function() {
            a(this).addClass("floating-label-form-group-with-focus");
        }).on("blur", ".floating-label-form-group", function() {
            a(this).removeClass("floating-label-form-group-with-focus");
        }), a(".navbar-collapse ul li a").click(function() {
            a(".navbar-toggle:visible").click();
        }), a(".portfolio-carousel").owlCarousel({
            singleItem: !0,
            navigation: !0,
            pagination: !1,
            navigationText: ["<i class='fa fa-angle-left'></i>", "<i class='fa fa-angle-right'></i>"],
            autoHeight: !0,
            mouseDrag: !1,
            touchDrag: !1,
            transitionStyle: "fadeUp"
        }), a(".portfolio-gallery").owlCarousel({
            items: 3
        }), a(".gallery-link").magnificPopup({
            type: "image",
            gallery: {
                enabled: !0
            },
            image: {
                titleSrc: "title"
            }
        }), a("body").scrollspy({
            target: ".navbar-fixed-top",
            offset: 51
        });
    }(jQuery);

var jsheader = $("#js_header");

jsheader.attr("style", "background-image: url('img/tiergarten.jpg');");

var item1 = $("#js_item1");

item1.attr("style", "background-image: url('img/tiergarten.jpg');");

var item2 = $("#item2");

item2.attr("style", "background-image: url('img/boys.jpg');");

var item3 = $("#item3");

item3.attr("style", "background-image: url('img/together.jpg');");

var item4 = $("#item4");

item4.attr("style", "background-image: url('img/ls.png');");

var foot = $("#footer");

foot.attr("style", "background-image: url('img/modal2.jpg');");
