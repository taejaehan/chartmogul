/**
 ** ------------------------------------------
 **    ╔═╗┬ ┬┌─┐┬─┐┌┬┐╔╦╗┌─┐┌─┐┬ ┬┬  
 **    ║  ├─┤├─┤├┬┘ │ ║║║│ ││ ┬│ ││  
 **    ╚═╝┴ ┴┴ ┴┴└─ ┴ ╩ ╩└─┘└─┘└─┘┴─┘
 ** ------------------------------------------
 **
 **    chartmogul-site v2.8.2
 **    https://chartmogul.com
 **    (c) 2017 ChartMogul - All Rights Reserved 
 **
 ** ------------------------------------------
 **/
jQuery(function(e) {
    var a = e("#modal-demo"),
        o = a.find("form"),
        t = o.find(".btn"),
        r = t.val();
    e(".js-modal-demo-trigger").on("click", function(e) {
        e.preventDefault(), a.modal()
    }), a.on("shown.bs.modal", function(a) {
        e("#email").focus(), o.parsley({
            trigger: "change"
        })
    }), a.on("hide.bs.modal", function(e) {
        o.parsley().destroy(), o.find(".form-group").removeClass("hide"), o.find(".alert").addClass("hide"), t.attr("value", r).removeAttr("data-dismiss").removeClass("disabled")
    });
    var n = !1,
        s = !1,
        d = e(".hero-addendum"),
        l = e(".section--pitch.first"),
        i = new TimelineMax,
        p = (new TimelineMax, new TimelineMax, new TimelineMax),
        c = new TimelineMax,
        h = {
            dollar: 1582124,
            percentage: 13.15
        },
        f = {
            dollar: 1429230,
            percentage: 4.94
        },
        m = {
            first: 97,
            second: 311,
            third: 722,
            fourth: 51,
            fifth: 26
        },
        u = e("#mrr .dollar"),
        U = e("#mrr .percentage"),
        P = (e("#cashflow-chart"), e("#cashflow-chart #worst"), e("#cashflow-chart #best"), e("#cashflow .dollar")),
        w = e("#cashflow .percentage"),
        g = e("#mrr-breakdown table tr:nth-child(1) td:last-child"),
        b = e("#mrr-breakdown table tr:nth-child(2) td:last-child"),
        L = e("#mrr-breakdown table tr:nth-child(3) td:last-child"),
        N = e("#mrr-breakdown table tr:nth-child(4) td:last-child"),
        v = e("#mrr-breakdown table tr:nth-child(5) td:last-child");

    function x() {
        u.html("$" + M(h.dollar))
    }

    function T(e) {
        e ? (U.css("color", "#13A3DF"), U.html("+ " + h.percentage.toFixed(2) + "%")) : (U.css("color", "#ff5081"), U.html("- " + h.percentage.toFixed(2) + "%"))
    }

    function M(e) {
        return e.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    }

    function O() {
        P.html("$" + M(f.dollar))
    }

    function k() {
        w.css("color", "#13A3DF"), w.html("+ " + f.percentage.toFixed(2) + "%")
    }

    function y(e) {
        0 == e ? g.html(m.first) : 1 == e ? b.html(m.second) : 2 == e ? L.html(m.third) : 3 == e ? N.html(m.fourth) : v.html(m.fifth)
    }
    e(window).on("load resize scroll", function() {
        e(this).scrollTop() > d.offset().top - 540 && 0 == n && (d.addClass("scrolled"), i.to(h, 0, {
            dollar: "1582124",
            roundProps: "dollar",
            onUpdate: x,
            ease: Linear.easeNone
        }, 0).to(h, 0, {
            percentage: "13.15",
            onUpdate: T,
            onUpdateParams: [!0],
            ease: Linear.easeNone
        }, 0).to(h, .5, {
            dollar: "-=15000",
            roundProps: "dollar",
            onUpdate: x,
            ease: Linear.easeNone
        }, .6).to(h, .5, {
            percentage: "5.45",
            onUpdate: T,
            onUpdateParams: [!1],
            ease: Linear.easeNone
        }, .6).to(h, .5, {
            dollar: "+=20000",
            roundProps: "dollar",
            onUpdate: x,
            ease: Linear.easeNone
        }, 1.2).to(h, .5, {
            percentage: "4.58",
            onUpdate: T,
            onUpdateParams: [!0],
            ease: Linear.easeNone
        }, 1.2).to(h, .5, {
            dollar: "+=30000",
            roundProps: "dollar",
            onUpdate: x,
            ease: Linear.easeNone
        }, 1.8).to(h, .5, {
            percentage: "10.25",
            onUpdate: T,
            onUpdateParams: [!0],
            ease: Linear.easeNone
        }, 1.8), p.to(f, 0, {
            dollar: "1429230",
            roundProps: "dollar",
            onUpdate: O,
            ease: Power2.easeOut
        }, 0).to(f, 0, {
            percentage: "4.94",
            onUpdate: k,
            ease: Linear.easeNone
        }, 0).to(f, 1, {
            dollar: "+=15000",
            roundProps: "dollar",
            onUpdate: O,
            ease: Power2.easeOut
        }, 1).to(f, 1, {
            percentage: "10.45",
            onUpdate: k,
            ease: Linear.easeNone
        }, 1), c.to(m, 0, {
            first: "97",
            onUpdate: y,
            onUpdateParams: [0],
            ease: Linear.easeNone
        }, 0).to(m, 1, {
            first: "+=40",
            roundProps: "first",
            onUpdate: y,
            onUpdateParams: [0],
            ease: Power2.easeOut
        }, 1).to(m, 0, {
            second: "311",
            onUpdate: y,
            onUpdateParams: [1],
            ease: Linear.easeNone
        }, 0).to(m, 1, {
            second: "+=40",
            roundProps: "second",
            onUpdate: y,
            onUpdateParams: [1],
            ease: Power2.easeOut
        }, 1).to(m, 0, {
            third: "722",
            onUpdate: y,
            onUpdateParams: [2],
            ease: Linear.easeNone
        }, 0).to(m, 1, {
            third: "-=50",
            roundProps: "third",
            onUpdate: y,
            onUpdateParams: [2],
            ease: Power2.easeOut
        }, 1).to(m, 0, {
            fourth: "51",
            onUpdate: y,
            onUpdateParams: [3],
            ease: Linear.easeNone
        }, 0).to(m, 1, {
            fourth: "-=30",
            roundProps: "fourth",
            onUpdate: y,
            onUpdateParams: [3],
            ease: Power2.easeOut
        }, 1).to(m, 0, {
            fifth: "26",
            onUpdate: y,
            onUpdateParams: [4],
            ease: Linear.easeNone
        }, 0).to(m, 1, {
            fifth: "+=50",
            roundProps: "fifth",
            onUpdate: y,
            onUpdateParams: [4],
            ease: Power2.easeOut
        }, 1), n = !0), e(this).scrollTop() > l.offset().top - 600 && 0 == s && (l.addClass("scrolled"), s = !0), 0 == e(this).scrollTop() && (n = !1, s = !1)
    })
}),
function(e) {
    e.fn.shuffle = function() {
        for (var e, a, o = this.length; o;) a = Math.floor(Math.random() * o--), e = this[o], this[o] = this[a], this[a] = e;
        return this
    }
}(jQuery);