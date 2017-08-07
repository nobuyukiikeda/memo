window.console || (window.console = {
    log: function (e) {}
});
var HUE     = HUE || {},
    $html   = $("html"),
    $window = $(window);
if ($html.hasClass("pc")) {
    HUE.loadcomp     = !1,
    HUE.supportvideo = $html.hasClass("video")
        ? !0
        : !1,
    HUE.supportvideo && (HUE.video = [], $("video").each(function () {
        this.pause(),
        HUE
            .video
            .push(this)
    })),
    function () {
        var e = setInterval(function () {
            $window.scrollTop(0)
        }, 10);
        window.onload = function () {
            $html.hasClass("cssanimations")
                ? $(".css-loading").on(
                    "webkitAnimationIteration animationiteration",
                    function () {
                        t()
                    }
                )
                : t()
        };
        var t = function () {
                $(".css-loading ").removeClass("css-loading"),
                $(".logotitle").removeClass("css-fadein");
                var e = {
                        top: "75px"
                    },
                    t = {
                        complete: function () {
                            $(".loding-block").velocity(o, i)
                        },
                        delay   : 500,
                        duration: 600,
                        easing  : "easeInOutQuad"
                    },
                    o = {
                        opacity: 0
                    },
                    i = {
                        complete: function () {
                            n()
                        },
                        display : "none",
                        duration: 800,
                        easing  : "ease"
                    };
                $(".product-logo").velocity(e, t)
            },
            n = function () {
                var t = {
                        opacity: 1,
                        top    : "-=60px"
                    },
                    n = {
                        opacity: 1
                    },
                    o = {
                        complete: function () {},
                        duration: 800,
                        easing  : "ease"
                    },
                    i = {
                        complete: function () {},
                        delay   : 600,
                        duration: 800,
                        easing  : "ease"
                    },
                    s = {
                        complete: function () {
                            clearTimeout(e),
                            HUE.loadcomp = !0,
                            curr_obj     = new SCREEN(0),
                            curr_obj.init(),
                            $(".js-navigation-btn").addClass("disp")
                        },
                        delay   : 1200,
                        duration: 800,
                        easing  : "ease"
                    };
                $(".js-onload-event1").velocity(t, o),
                $(".js-onload-event2").velocity(t, i),
                $(".js-onload-event3").velocity(n, s)
            }
    }(),
    function () {
        var e = $(".js-fit-screen"),
            t = $(".js-fixedscroll"),
            n = 1920 / 1080,
            o = 1.8,
            i = $(".section-bg").find("video"),
            s = $(".section-bg").find(".bg-image"),
            a = $("body"),
            r = $(".section"),
            l = ($(".js-navigation-btn"), $(".js-scroll-disp-in")),
            c = $(".contents"),
            u = !1,
            v = function () {
                HUE.w_width    = $window.width(),
                HUE.w_height   = $window.height(),
                HUE.scroll_num = $window.scrollTop()
            },
            f = function () {
                e.css({
                    height: HUE.w_height + "px"
                });
                var t = $(".js-set-sameheight"),
                    n = [];
                t.removeAttr("style"),
                t.each(function () {
                    var e = $(this);
                    n.push(e.height())
                });
                var o = Math
                    .max
                    .apply(null, n);
                t.css({
                    height: o + "px"
                });
                var i = $(".column-title").width() <= 478
                    ? "100%"
                    : 478;
                $(".column-img").css({width: i})
            },
            d = function () {
                HUE.fit_screen_offset = [],
                e.each(function () {
                    var e = $(this);
                    HUE
                        .fit_screen_offset
                        .push(e.offset().top)
                })
            },
            h = function () {
                var e = -Math.floor($window.scrollLeft());
                t.css("left", e + "px")
            },
            m = function () {
                var e = HUE.w_width / HUE.w_height;
                e >= n
                    ? i
                        .removeAttr("style")
                        .removeClass("height-fit")
                        .addClass("width-fit")
                    : i
                        .removeAttr("style")
                        .removeClass("width-fit")
                        .addClass("height-fit")
            },
            p = function () {
                var e = HUE.w_width / HUE.w_height;
                if (e >= o) {
                    var t = HUE.w_width / o * -1 + HUE.w_height;
                    s
                        .removeClass("height-fit")
                        .addClass("width-fit")
                        .css({
                            marginTop: t + "px"
                        })
                } else 
                    s
                        .removeAttr("style")
                        .removeClass("width-fit")
                        .addClass("height-fit")
                };
        $window
            .on("resize", function () {
                v(),
                f(),
                h(),
                d(),
                HUE.supportvideo
                    ? m()
                    : p()
            })
            .trigger("resize");
        var _ = function () {
                HUE.section_offset = [],
                r.each(function () {
                    var e = $(this);
                    HUE
                        .section_offset
                        .push(Math.floor(e.offset().top))
                })
            },
            g = function () {
                for (var e = HUE.section_offset.concat(), t = 0; t < e.length; t++) 
                    if (e[t] - HUE.scroll_num > 0) {
                        var n = 0 === t
                            ? 0
                            : t - 1;
                        a
                            .removeClass()
                            .addClass("curr_" + n),
                        n >= 6
                            ? $html.addClass("scroll-block")
                            : $html.removeClass("scroll-block");
                        break
                    }
                },
            y = function () {
                var e = 200;
                l.each(function () {
                    var t = $(this),
                        n = 200,
                        o = t
                            .offset()
                            .top,
                        i = HUE.scroll_num + HUE.w_height - o - n;
                    if (i > 0 && !t.hasClass("disp")) {
                        t.addClass("disp");
                        for (var s = t.find(".js-scroll-block"), a = 0; a < s.length; a++) 
                            !function () {
                                var t = a;
                                setTimeout(function () {
                                    s
                                        .eq(t)
                                        .addClass("disp")
                                }, e * t)
                            }
                        ()
                    }
                })
            };
        $window
            .on("scroll mousewheel", function (e) {
                v(),
                _(),
                h(),
                g(),
                HUE.loadcomp && $html.hasClass("csstransitions") && y()
            })
            .trigger("scroll"),
        $(document).on("mousewheel", function (e) {
            e.deltaY;
            !$html.hasClass("scroll-block") || c.hasClass("blur")
                ? (e.preventDefault(), e.returnValue = !1)
                : u = !0
        }),
        $html.keydown(function (e) {
            switch (e.keyCode) {
                case 39:
                case 37:
                case 38:
                case 40:
                    e.preventDefault()
            }
        })
    }();
    var navscroll_flag;
    !function () {
        var e,
            t = $(".js-navigation-btn"),
            n = $(".js-navigation-area"),
            o = $(".contents"),
            i = !1,
            s = function () {
                i = !0,
                t.addClass("active"),
                n.addClass("active"),
                o.addClass("blur"),
                n.css({height: "100%"})
            },
            a = function () {
                i = !1,
                t.removeClass("active"),
                o.removeClass("blur"),
                n.removeClass("active"),
                setTimeout(function () {
                    n.css({height: "0%"})
                }, 300)
            };
        t.on("click", function () {
            i
                ? a()
                : s()
        }),
        n.on("click", function () {
            a()
        }),
        $(".js-scroll-nav").on("click", function () {
            navscroll_flag = !0,
            a();
            var t = parseInt($(this).attr("data-to"));
            if (curr_obj_num !== t && !e) {
                var n = ".section" + t,
                    o = $(n);
                e = !0;
                var i = {
                    complete: function () {
                        setTimeout(function () {
                            e              = !1,
                            navscroll_flag = !1,
                            upflag         = !1
                        }, 500)
                    },
                    duration: 800,
                    easing  : "easeInOutQuad"
                };
                o.velocity("scroll", i)
            }
        })
    }();
    var curr_obj     = null,
        curr_obj_num = 0,
        SCREEN       = function (e) {
            this.num                       = e,
            this.$target                   = $(".js-fit-screen"),
            this.$curr_target              = $(".js-fit-screen" + this.num),
            this.$prev_target              = 0 !== this.num
                ? $(".js-fit-screen" + (
                    this.num - 1
                ))
                : null,
            this.$next_target              = $(
                this.num !== this.$target.length - 1
                    ? ".js-fit-screen" + (
                        this.num + 1
                    )
                    : ".section6"
            ),
            this.state                     = 0,
            this.$event_elem_beforecurrent = null,
            this.$event_elem               = this
                .$curr_target
                .find(".js-fit-screen-innerevent"),
            this.$event_length             = this.$event_elem.length,
            this.$event_elem_posi          = 50,
            this.move_flag                 = !1,
            this.$start_event_fadeinout    = this
                .$curr_target
                .find(".js-screen-startevent.fade-inout"),
            this.$start_event_fadein       = this
                .$curr_target
                .find(".js-screen-startevent.fade-in")
        };
    SCREEN.prototype.init                 = function () {
        var e = this;
        e.num < 6
            ? (e.setEventElemPosition(), e.startTitleMoiton())
            : e.move_flag = !1,
        HUE.supportvideo && e.num < 5 && HUE
            .video[e.num]
            .play(),
        $("body").on("mousewheel.individual", function (t) {
            if (!$(".contents").hasClass("blur") && !e.move_flag) {
                var n = -1 * t.deltaY < 0
                    ? -1
                    : 1;
                if (e.state = e.state + n, e.num >= 6 && 0 > n) {
                    var o = $(".section5"),
                        i = o
                            .offset()
                            .top;
                    i >= HUE.scroll_num
                } else {
                    if (e.num >= 6) 
                        return;
                    if (e.state === e.$event_length + 1) 
                        null !== e.$next_target
                            ? e.nextScreen()
                            : e.state = 0;
                    else if (-1 === e.state || 0 === e.state) 
                        null !== e.$prev_target
                            ? e.prevScreen()
                            : e.state = 0;
                    else {
                        var s = e
                            .$event_elem
                            .eq(e.state - 1);
                        n > 0
                            ? e.eventFuncIn(s)
                            : e.eventFuncOut(s)
                    }
                }
            }
        }),
        $window.on("resize.individual", function (t) {
            var n = HUE.w_height * e.num;
            $window.scrollTop(n)
        })
    },
    SCREEN.prototype.setEventElemPosition = function () {
        if (this.$event_length) {
            var e = parseInt(this.$event_elem.css("top"));
            this
                .$event_elem
                .css({
                    top: this.$event_elem_posi + e + "px"
                })
        }
    },
    SCREEN.prototype.startTitleMoiton     = function () {
        var e = this;
        if (!e.$start_event_fadein.length) 
            return void(e.move_flag = !1);
        if (e.move_flag = !0, e.$start_event_fadeinout.length) {
            var t = {
                    opacity: 1
                },
                n = {
                    complete: function () {},
                    duration: 800
                },
                o = {
                    complete: function () {}
                };
            e
                .$start_event_fadeinout
                .velocity("stop", !0)
                .velocity(t, n)
                .velocity("reverse", o),
            e.startSubTitleMoiton(1600)
        } else 
            e.startSubTitleMoiton(0)
    },
    SCREEN.prototype.startSubTitleMoiton  = function (e) {
        var t = this,
            n = {
                opacity: 1
            },
            o = {
                begin   : function (e) {
                    $(e).addClass("disp")
                },
                complete: function () {
                    var e = t
                        .$event_elem
                        .eq(0);
                    e.length
                        ? (t.state = 1, t.eventFuncIn(e))
                        : t.move_flag = !1
                },
                delay   : e,
                duration: 600,
                easing  : "easeInOutQuad"
            };
        t
            .$start_event_fadein
            .velocity("stop", !0)
            .velocity(n, o)
    },
    SCREEN.prototype.resetState           = function () {
        if (
            $("body").off("mousewheel.individual"),
            $(window).off("resize.individual"),
            this.state                     = 0,
            this.$start_event_fadeinout.velocity("stop", !0),
            this.$start_event_fadeinout.removeAttr("style"),
            this.$start_event_fadein.velocity("stop", !0),
            this.$start_event_fadein.removeAttr("style"),
            this.$event_elem.velocity("stop", !0),
            this.$event_elem.removeAttr("style"),
            this.$event_elem_beforecurrent = null,
            this.$start_event_fadein.removeClass("disp"),
            $(".js-fit-screen-innerevent").css({opacity: 0}),
            HUE.supportvideo
        ) 
            for (var e = 0; e < HUE.video.length; e++) 
                HUE
                    .video[e]
                    .pause()
        },
    SCREEN.prototype.prevScreen           = function (e) {
        var t = this;
        t.move_flag = !0;
        var n = {
            complete: function () {},
            duration: 800,
            easing  : "easeInOutQuad"
        };
        t
            .$prev_target
            .velocity("scroll", n)
    },
    SCREEN.prototype.nextScreen           = function () {
        var e = this;
        e.move_flag = !0;
        var t = {
            complete: function () {
                setTimeout(function () {
                    $(document).off("mousewheel.delay")
                }, 400)
            },
            duration: 800,
            easing  : "easeInOutQuad"
        };
        5 === e.num && $(document).on("mousewheel.delay", function (e) {
            e.preventDefault(),
            e.returnValue = !1
        }),
        e
            .$next_target
            .velocity("scroll", t)
    },
    SCREEN.prototype.eventFuncIn          = function (e) {
        var t = this;
        t.move_flag = !0;
        var n = {
                opacity: 1,
                top    : "-=" + t.$event_elem_posi + "px"
            },
            o = {
                complete: function () {
                    setTimeout(function () {
                        t.move_flag = !1
                    }, 1e3),
                    t.$event_elem_beforecurrent = e
                },
                duration: 600,
                easing  : "easeInOutQuad"
            };
        if (
            e.velocity("stop", !0).velocity(n, o),
            null !== t.$event_elem_beforecurrent
        ) {
            var i = {
                    opacity: 0,
                    top    : "-=" + t.$event_elem_posi + "px"
                },
                s = {
                    complete: function () {},
                    duration: 600,
                    easing  : "easeInOutQuad"
                };
            t
                .$event_elem_beforecurrent
                .velocity("stop")
                .velocity(i, s)
        }
    },
    SCREEN.prototype.eventFuncOut         = function (e) {
        var t = this;
        t.move_flag = !0;
        var n = {
                opacity: 0,
                top    : "+=" + t.$event_elem_posi + "px"
            },
            o = {
                complete: function () {
                    setTimeout(function () {
                        t.move_flag = !1
                    }, 1e3)
                },
                duration: 600,
                easing  : "easeInOutQuad"
            };
        if (t.$event_elem_beforecurrent.velocity("stop").velocity(n, o), 0 === t.state) 
            return void(t.$event_elem_beforecurrent = null);
        var i = {
                opacity: 1,
                top    : "+=" + t.$event_elem_posi + "px"
            },
            s = {
                complete: function () {
                    t.$event_elem_beforecurrent = e
                },
                duration: 600,
                easing  : "easeInOutQuad"
            };
        e
            .velocity("stop")
            .velocity(i, s)
    },
    function () {
        function e() {
            if (HUE.loadcomp) {
                if (curr_obj.num === curr_obj_num) 
                    return void t();
                curr_obj && curr_obj.resetState(),
                curr_obj = new SCREEN(curr_obj_num),
                curr_obj.init(),
                t()
            }
        }
        function t() {
            for (var e = 0; e < i.length; e++) 
                i[e] = Math.abs(i[e] - HUE.scroll_num);
            if (o = $.inArray(Math.min.apply(null, i), i), !(o > 5)) {
                var t = {
                        duration: 0
                    },
                    n = $(".js-fit-screen" + o),
                    s = Math.round(n.offset().top);
                s !== HUE.scroll_num && n.velocity("scroll", t)
            }
        }
        var n,
            o,
            i,
            s;
        $(window).on("scroll", function (t) {
            var o;
            i = HUE
                .section_offset
                .concat();
            for (var a = 0; a < i.length; a++) 
                if (i[a] - HUE.scroll_num > 0) {
                    o = 0 === a
                        ? 0
                        : a - 1;
                    break
                }
            if (
                curr_obj_num = o,
                curr_obj_num >= 6 && (curr_obj_num = 6),
                6 === s && 5 === curr_obj_num && !navscroll_flag
            ) {
                var r = $(".js-fit-screen5"),
                    l = r
                        .offset()
                        .top;
                l >= HUE.scroll_num && $window.scrollTop(l);
                var c = {
                    complete: function () {
                        curr_obj = new SCREEN(curr_obj_num),
                        curr_obj.init()
                    },
                    delay   : 500,
                    duration: 800,
                    easing  : "easeInOutQuad"
                };
                curr_obj && curr_obj.resetState(),
                r.velocity("scroll", c)
            }
            s = curr_obj_num,
            clearTimeout(n),
            n = setTimeout(function () {
                e()
            }, 400)
        })
    }(),
    function () {
        $(".js-hover-action-draw").each(function () {
            var e = $(this),
                t = '<span class="line line-top"></span><span class="line line-right"></span><span ' +
                        'class="line line-bottom"></span><span class="line line-left"></span>';
            e.append(t);
            var n = e.find(".line-top"),
                o = e.find(".line-right"),
                i = e.find(".line-bottom"),
                s = e.find(".line-left");
            e.on("mouseenter", function () {
                n
                    .velocity("stop", !0)
                    .velocity({
                        width: "100%"
                    }, {
                        begin   : function (e) {
                            n.css({width: "0%"}),
                            o.css({height: "0%"})
                        },
                        complete: function () {},
                        duration: 300
                    })
            }),
            e.on("mouseenter", function () {
                i
                    .velocity("stop", !0)
                    .velocity({
                        width: "100%"
                    }, {
                        begin   : function (e) {
                            i.css({width: "0%"}),
                            s.css({height: "0%"})
                        },
                        complete: function () {},
                        duration: 300
                    })
            }),
            e.on("mouseenter", function () {
                o
                    .velocity("stop", !0)
                    .velocity({
                        height: "100%"
                    }, {
                        complete: function () {},
                        delay   : 300,
                        duration: 300
                    })
            }),
            e.on("mouseenter", function () {
                s
                    .velocity("stop", !0)
                    .velocity({
                        height: "100%"
                    }, {
                        complete: function () {},
                        delay   : 300,
                        duration: 300
                    })
            })
        })
    }(),
    function () {
        $(".js-hover-action-rotate").each(function () {
            var e = $(this),
                t = '<span class="hexagon"></span>';
            e.append(t);
            var n = e.find(".hexagon");
            e.on("mouseenter", function () {
                n
                    .velocity("stop", !0)
                    .velocity({
                        rotateY: "180deg"
                    }, {
                        begin   : function (e) {},
                        complete: function () {
                            n
                                .velocity("stop", !0)
                                .velocity({
                                    rotateY: "0deg"
                                }, {duration: 0})
                        },
                        duration: 400
                    })
            })
        })
    }()
}
$("html").hasClass("sp") && ($(".section-bg").remove(), function () {
    var e,
        t = $(window),
        n = $(".js-navigation-btn"),
        o = $(".js-navigation-area"),
        i = $(".contents");
    n.on("click", function () {
        e = e
            ? !1
            : !0,
        e
            ? (
                n.addClass("active"),
                o.css({height: "100%"}),
                i.addClass("blur"),
                o.addClass("active")
            )
            : (
                n.removeClass("active"),
                o.removeClass("active"),
                i.removeClass("blur"),
                setTimeout(function () {
                    o.css({height: "0%"})
                }, 300)
            )
    }),
    $(".js-scroll-nav").on("click", function () {
        n.removeClass("active"),
        i.removeClass("blur"),
        o.removeClass("active"),
        e = !1,
        setTimeout(function () {
            o.css({height: "0%"})
        }, 300);
        var t = parseInt($(this).attr("data-to")),
            s = ".section" + t,
            a = $(s);
        a.velocity("scroll", {
            complete: function () {},
            duration: 1e3,
            easing  : "easeOutQuint"
        })
    });
    var s,
        a = $("body"),
        r = $(".section");
    t.on("scroll", function (e) {
        s = t.scrollTop();
        var n = [];
        r.each(function () {
            var e = $(this);
            n.push(Math.floor(e.offset().top))
        });
        for (var o = 0; o < n.length; o++) 
            if (n[o] - s > 0) {
                var i = 0 === o
                    ? 0
                    : o - 1;
                a
                    .removeClass()
                    .addClass("curr_" + i);
                break
            }
        }),
    $(function () {
        var e = $(".js-fit-screen0"),
            t = window.innerHeight;
        e.css({
            height: t + "px"
        });
        var n = e.find(".table-inner"),
            o = n.height() + 200;
        if (o > t) {
            var i = t / o;
            n.velocity({
                scaleX: i,
                scaleY: i
            }, 0)
        }
    })
}());