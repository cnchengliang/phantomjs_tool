/**
 * @license RequireJS order 1.0.5 Copyright (c) 2010-2011, The Dojo Foundation All Rights Reserved.
 * Available via the MIT or new BSD license.
 * see: http://github.com/jrburke/requirejs for details
 */
/*!
 * jQuery JavaScript Library v1.7.1
 * http://jquery.com/
 *
 * Copyright 2011, John Resig
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 *
 * Includes Sizzle.js
 * http://sizzlejs.com/
 * Copyright 2011, The Dojo Foundation
 * Released under the MIT, BSD, and GPL Licenses.
 *
 * Date: Mon Nov 21 21:11:03 2011 -0500
 */
/*!
 * Sizzle CSS Selector Engine
 *  Copyright 2011, The Dojo Foundation
 *  Released under the MIT, BSD, and GPL Licenses.
 *  More information: http://sizzlejs.com/
 */
/**
 * @license RequireJS text 1.0.2 Copyright (c) 2010-2011, The Dojo Foundation All Rights Reserved.
 * Available via the MIT or new BSD license.
 * see: http://github.com/jrburke/requirejs for details
 */
function test() {
    console.log("function.common.js");
}

function waitFor(testFx, test_args, onReady, ready_args, timeOutMillis, timeCheckMillis, timeOutFx) {
    var maxtimeOutMillis = timeOutMillis ? timeOutMillis : 1e4, timeCheckMillis = timeCheckMillis ? timeCheckMillis : 100, start = (new Date).getTime(), condition = !1, interval = null;
    interval = setInterval(function() {
        (new Date).getTime() - start < maxtimeOutMillis && !condition ? condition = typeof testFx == "string" ? eval(testFx) : testFx(test_args) != "null" : (condition ? typeof onReady == "string" ? eval(onReady) : onReady(ready_args) : (typeof timeOutFx != "undefined" && timeOutFx(), console.log("waitfor_timeout")), clearInterval(interval), interval = null);
    }, timeCheckMillis);
}

function getNodeDetail(a) {
    var b = a[0], c = a[1], d = a[2], e = a[3], f = "null", g = new XPathEvaluator, h = g.evaluate(b + c + d, document.documentElement, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
    return h && h.singleNodeValue && (e === "" ? f = h.singleNodeValue : f = h.singleNodeValue[e]), f;
}

function getNodeAttr(a) {
    var b = a[0], c = a[1], d = a[2], e = a[3], f = "null", g = new XPathEvaluator, h = g.evaluate(b + c + d, document.documentElement, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
    if (h && h.singleNodeValue) if (e === "") f = h.singleNodeValue; else for (var i = 0, j = h.singleNodeValue.attributes.length; i < j; i++) if (h.singleNodeValue.attributes[i]["nodeName"] == e) {
        f = h.singleNodeValue.attributes[i].nodeValue;
        break;
    }
    return f;
}

function getRows(a, b) {
    var c = a[0], d = a[1], e = a[2], f = [], g = document.evaluate(c, document.documentElement, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
    if (g) for (var h = 1, i = g.snapshotLength; h <= i; h++) {
        var j = [];
        for (var k = 0, l = d.length; k < l; k++) {
            if (strTrim(d[k], "g") != "") {
                var a = [ c, "[" + h + "]", strTrim(d[k], "g"), strTrim(e[k], "g") ], m = getNodeDetail(a);
                typeof m == "undefined" || m == "null" ? j[j.length] = getNodeAttr(a) : j[j.length] = m;
            } else {
                var n = strTrim(e[k], "g"), m = g.snapshotItem(h - 1)[n];
                typeof m == "undefined" ? j[j.length] = "null" : j[j.length] = m;
            }
            j[j.length - 1] = j[j.length - 1].replace(/[\r\t\n]/g, "");
        }
        f[f.length] = j, j = null;
    }
    typeof b != "undefined" && b(f);
}

function getRows_2(a, b) {
    var c = a[0], d = a[1], e = a[2], f = [];
    for (var g = 0, h = c.length; g < h; g++) {
        var i = [], a = [ strTrim(c[g], "g"), "[1]", strTrim(d[g], "g"), strTrim(e[g], "g") ], j = getNodeDetail(a);
        typeof j == "undefined" || j == "null" ? i[i.length] = getNodeAttr(a) : i[i.length] = j, i[i.length - 1] = i[i.length - 1].replace(/[\r\t\n]/g, ""), f[f.length] = i, i = null;
    }
    typeof b != "undefined" && b(f);
}

function getParam(a) {
    var b = "", c = "[\\?&]" + a + "=([^&#]*)", d = new RegExp(c), e = d.exec(window.location.href);
    return e != null && (b = unescape(e[1])), b;
}

function getParam2(a) {
    var b = "", c = "[/]" + a + "/([^/#]*)", d = new RegExp(c), e = d.exec(window.location.href);
    return e != null && (b = unescape(e[1])), b;
}

function strTrim(a, b) {
    var c;
    return c = a.replace(/(^\s+)|(\s+$)/g, ""), b.toLowerCase() == "g" && (c = c.replace(/\s/g, "")), c;
}

function isArray(a) {
    return toString.apply(a) === "[object Array]";
}

function isObject(a) {
    return toString.apply(a) === "[object Object]";
}

function clickit(a, b) {
    var c = getNodeDetail([ a, "", "", "" ]), d = !0;
    if (c != "null") {
        var e = document.createEvent("MouseEvents");
        e.initMouseEvent("click", !1, !1, window, 1, 0, 0, 0, 0, !1, !1, !1, !1, 0, null), c.dispatchEvent(e), d = !0;
    } else d = !1;
    b(d);
}

(function() {
    var a = myGlobalRequire.require, b = myGlobalRequire.requirejs, c = myGlobalRequire.define;
    (function() {
        function j(a) {
            var b = a.currentTarget || a.srcElement, c, d, h;
            if (a.type === "load" || e.test(b.readyState)) {
                d = b.getAttribute("data-requiremodule"), g[d] = !0;
                for (c = 0; h = f[c]; c++) if (g[h.name]) h.req([ h.name ], h.onLoad); else break;
                c > 0 && f.splice(0, c), setTimeout(function() {
                    b.parentNode.removeChild(b);
                }, 15);
            }
        }
        function k(b) {
            var c, d, e;
            b.setAttribute("data-orderloaded", "loaded");
            for (c = 0; e = i[c]; c++) {
                d = h[e];
                if (d && d.getAttribute("data-orderloaded") === "loaded") delete h[e], a.addScriptToDom(d); else break;
            }
            c > 0 && i.splice(0, c);
        }
        var b = typeof document != "undefined" && typeof window != "undefined" && document.createElement("script"), c = b && (b.async || window.opera && Object.prototype.toString.call(window.opera) === "[object Opera]" || "MozAppearance" in document.documentElement.style), d = b && b.readyState === "uninitialized", e = /^(complete|loaded)$/, f = [], g = {}, h = {}, i = [];
        b = null, myGlobalRequire.define("order", {
            version: "1.0.5",
            load: function(b, e, g, l) {
                var m = !!e.nameToUrl, n, o, p;
                if (!m) {
                    e([ b ], g);
                    return;
                }
                n = e.nameToUrl(b, null), a.s.skipAsync[n] = !0, c || l.isBuild ? e([ b ], g) : d ? (p = a.s.contexts._, !p.urlFetched[n] && !p.loaded[b] && (p.urlFetched[n] = !0, a.resourcesReady(!1), p.scriptCount += 1, o = a.attach(n, p, b, null, null, k), h[b] = o, i.push(b)), e([ b ], g)) : e.specified(b) ? e([ b ], g) : (f.push({
                    name: b,
                    req: e,
                    onLoad: g
                }), a.attach(n, null, b, j, "script/cache"));
            }
        });
    })();
})(), function(a, b) {
    function h(a) {
        var b = g[a] = {}, c, d;
        a = a.split(/\s+/);
        for (c = 0, d = a.length; c < d; c++) b[a[c]] = !0;
        return b;
    }
    function l(a, c, d) {
        if (d === b && a.nodeType === 1) {
            var e = "data-" + c.replace(k, "-$1").toLowerCase();
            d = a.getAttribute(e);
            if (typeof d == "string") {
                try {
                    d = d === "true" ? !0 : d === "false" ? !1 : d === "null" ? null : f.isNumeric(d) ? parseFloat(d) : j.test(d) ? f.parseJSON(d) : d;
                } catch (g) {}
                f.data(a, c, d);
            } else d = b;
        }
        return d;
    }
    function m(a) {
        for (var b in a) {
            if (b === "data" && f.isEmptyObject(a[b])) continue;
            if (b !== "toJSON") return !1;
        }
        return !0;
    }
    function n(a, b, c) {
        var d = b + "defer", e = b + "queue", g = b + "mark", h = f._data(a, d);
        h && (c === "queue" || !f._data(a, e)) && (c === "mark" || !f._data(a, g)) && setTimeout(function() {
            !f._data(a, e) && !f._data(a, g) && (f.removeData(a, d, !0), h.fire());
        }, 0);
    }
    function J() {
        return !1;
    }
    function K() {
        return !0;
    }
    function S(a) {
        return !a || !a.parentNode || a.parentNode.nodeType === 11;
    }
    function T(a, b, c) {
        b = b || 0;
        if (f.isFunction(b)) return f.grep(a, function(a, d) {
            var e = !!b.call(a, d, a);
            return e === c;
        });
        if (b.nodeType) return f.grep(a, function(a, d) {
            return a === b === c;
        });
        if (typeof b == "string") {
            var d = f.grep(a, function(a) {
                return a.nodeType === 1;
            });
            if (O.test(b)) return f.filter(b, d, !c);
            b = f.filter(b, d);
        }
        return f.grep(a, function(a, d) {
            return f.inArray(a, b) >= 0 === c;
        });
    }
    function U(a) {
        var b = V.split("|"), c = a.createDocumentFragment();
        if (c.createElement) while (b.length) c.createElement(b.pop());
        return c;
    }
    function bi(a, b) {
        return f.nodeName(a, "table") ? a.getElementsByTagName("tbody")[0] || a.appendChild(a.ownerDocument.createElement("tbody")) : a;
    }
    function bj(a, b) {
        if (b.nodeType !== 1 || !f.hasData(a)) return;
        var c, d, e, g = f._data(a), h = f._data(b, g), i = g.events;
        if (i) {
            delete h.handle, h.events = {};
            for (c in i) for (d = 0, e = i[c].length; d < e; d++) f.event.add(b, c + (i[c][d].namespace ? "." : "") + i[c][d].namespace, i[c][d], i[c][d].data);
        }
        h.data && (h.data = f.extend({}, h.data));
    }
    function bk(a, b) {
        var c;
        if (b.nodeType !== 1) return;
        b.clearAttributes && b.clearAttributes(), b.mergeAttributes && b.mergeAttributes(a), c = b.nodeName.toLowerCase();
        if (c === "object") b.outerHTML = a.outerHTML; else if (c !== "input" || a.type !== "checkbox" && a.type !== "radio") {
            if (c === "option") b.selected = a.defaultSelected; else if (c === "input" || c === "textarea") b.defaultValue = a.defaultValue;
        } else a.checked && (b.defaultChecked = b.checked = a.checked), b.value !== a.value && (b.value = a.value);
        b.removeAttribute(f.expando);
    }
    function bl(a) {
        return typeof a.getElementsByTagName != "undefined" ? a.getElementsByTagName("*") : typeof a.querySelectorAll != "undefined" ? a.querySelectorAll("*") : [];
    }
    function bm(a) {
        if (a.type === "checkbox" || a.type === "radio") a.defaultChecked = a.checked;
    }
    function bn(a) {
        var b = (a.nodeName || "").toLowerCase();
        b === "input" ? bm(a) : b !== "script" && typeof a.getElementsByTagName != "undefined" && f.grep(a.getElementsByTagName("input"), bm);
    }
    function bo(a) {
        var b = c.createElement("div");
        return bh.appendChild(b), b.innerHTML = a.outerHTML, b.firstChild;
    }
    function bp(a, b) {
        b.src ? f.ajax({
            url: b.src,
            async: !1,
            dataType: "script"
        }) : f.globalEval((b.text || b.textContent || b.innerHTML || "").replace(bf, "/*$0*/")), b.parentNode && b.parentNode.removeChild(b);
    }
    function bC(a, b, c) {
        var d = b === "width" ? a.offsetWidth : a.offsetHeight, e = b === "width" ? bx : by, g = 0, h = e.length;
        if (d > 0) {
            if (c !== "border") for (; g < h; g++) c || (d -= parseFloat(f.css(a, "padding" + e[g])) || 0), c === "margin" ? d += parseFloat(f.css(a, c + e[g])) || 0 : d -= parseFloat(f.css(a, "border" + e[g] + "Width")) || 0;
            return d + "px";
        }
        d = bz(a, b, b);
        if (d < 0 || d == null) d = a.style[b] || 0;
        d = parseFloat(d) || 0;
        if (c) for (; g < h; g++) d += parseFloat(f.css(a, "padding" + e[g])) || 0, c !== "padding" && (d += parseFloat(f.css(a, "border" + e[g] + "Width")) || 0), c === "margin" && (d += parseFloat(f.css(a, c + e[g])) || 0);
        return d + "px";
    }
    function bZ(a) {
        return function(b, c) {
            typeof b != "string" && (c = b, b = "*");
            if (f.isFunction(c)) {
                var d = b.toLowerCase().split(bP), e = 0, g = d.length, h, i, j;
                for (; e < g; e++) h = d[e], j = /^\+/.test(h), j && (h = h.substr(1) || "*"), i = a[h] = a[h] || [], i[j ? "unshift" : "push"](c);
            }
        };
    }
    function b$(a, c, d, e, f, g) {
        f = f || c.dataTypes[0], g = g || {}, g[f] = !0;
        var h = a[f], i = 0, j = h ? h.length : 0, k = a === bT, l;
        for (; i < j && (k || !l); i++) l = h[i](c, d, e), typeof l == "string" && (!k || g[l] ? l = b : (c.dataTypes.unshift(l), l = b$(a, c, d, e, l, g)));
        return (k || !l) && !g["*"] && (l = b$(a, c, d, e, "*", g)), l;
    }
    function b_(a, c) {
        var d, e, g = f.ajaxSettings.flatOptions || {};
        for (d in c) c[d] !== b && ((g[d] ? a : e || (e = {}))[d] = c[d]);
        e && f.extend(!0, a, e);
    }
    function ca(a, b, c, d) {
        if (f.isArray(b)) f.each(b, function(b, e) {
            c || bE.test(a) ? d(a, e) : ca(a + "[" + (typeof e == "object" || f.isArray(e) ? b : "") + "]", e, c, d);
        }); else if (!c && b != null && typeof b == "object") for (var e in b) ca(a + "[" + e + "]", b[e], c, d); else d(a, b);
    }
    function cb(a, c, d) {
        var e = a.contents, f = a.dataTypes, g = a.responseFields, h, i, j, k;
        for (i in g) i in d && (c[g[i]] = d[i]);
        while (f[0] === "*") f.shift(), h === b && (h = a.mimeType || c.getResponseHeader("content-type"));
        if (h) for (i in e) if (e[i] && e[i].test(h)) {
            f.unshift(i);
            break;
        }
        if (f[0] in d) j = f[0]; else {
            for (i in d) {
                if (!f[0] || a.converters[i + " " + f[0]]) {
                    j = i;
                    break;
                }
                k || (k = i);
            }
            j = j || k;
        }
        if (j) return j !== f[0] && f.unshift(j), d[j];
    }
    function cc(a, c) {
        a.dataFilter && (c = a.dataFilter(c, a.dataType));
        var d = a.dataTypes, e = {}, g, h, i = d.length, j, k = d[0], l, m, n, o, p;
        for (g = 1; g < i; g++) {
            if (g === 1) for (h in a.converters) typeof h == "string" && (e[h.toLowerCase()] = a.converters[h]);
            l = k, k = d[g];
            if (k === "*") k = l; else if (l !== "*" && l !== k) {
                m = l + " " + k, n = e[m] || e["* " + k];
                if (!n) {
                    p = b;
                    for (o in e) {
                        j = o.split(" ");
                        if (j[0] === l || j[0] === "*") {
                            p = e[j[1] + " " + k];
                            if (p) {
                                o = e[o], o === !0 ? n = p : p === !0 && (n = o);
                                break;
                            }
                        }
                    }
                }
                !n && !p && f.error("No conversion from " + m.replace(" ", " to ")), n !== !0 && (c = n ? n(c) : p(o(c)));
            }
        }
        return c;
    }
    function ci() {
        try {
            return new a.XMLHttpRequest;
        } catch (b) {}
    }
    function cj() {
        try {
            return new a.ActiveXObject("Microsoft.XMLHTTP");
        } catch (b) {}
    }
    function cs() {
        return setTimeout(ct, 0), cr = f.now();
    }
    function ct() {
        cr = b;
    }
    function cu(a, b) {
        var c = {};
        return f.each(cq.concat.apply([], cq.slice(0, b)), function() {
            c[this] = a;
        }), c;
    }
    function cv(a) {
        if (!ck[a]) {
            var b = c.body, d = f("<" + a + ">").appendTo(b), e = d.css("display");
            d.remove();
            if (e === "none" || e === "") {
                cl || (cl = c.createElement("iframe"), cl.frameBorder = cl.width = cl.height = 0), b.appendChild(cl);
                if (!cm || !cl.createElement) cm = (cl.contentWindow || cl.contentDocument).document, cm.write((c.compatMode === "CSS1Compat" ? "<!doctype html>" : "") + "<html><body>"), cm.close();
                d = cm.createElement(a), cm.body.appendChild(d), e = f.css(d, "display"), b.removeChild(cl);
            }
            ck[a] = e;
        }
        return ck[a];
    }
    function cy(a) {
        return f.isWindow(a) ? a : a.nodeType === 9 ? a.defaultView || a.parentWindow : !1;
    }
    var c = a.document, d = a.navigator, e = a.location, f = function() {
        function J() {
            if (e.isReady) return;
            try {
                c.documentElement.doScroll("left");
            } catch (a) {
                setTimeout(J, 1);
                return;
            }
            e.ready();
        }
        var e = function(a, b) {
            return new e.fn.init(a, b, h);
        }, f = a.jQuery, g = a.$, h, i = /^(?:[^#<]*(<[\w\W]+>)[^>]*$|#([\w\-]*)$)/, j = /\S/, k = /^\s+/, l = /\s+$/, m = /^<(\w+)\s*\/?>(?:<\/\1>)?$/, n = /^[\],:{}\s]*$/, o = /\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, p = /"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, q = /(?:^|:|,)(?:\s*\[)+/g, r = /(webkit)[ \/]([\w.]+)/, s = /(opera)(?:.*version)?[ \/]([\w.]+)/, t = /(msie) ([\w.]+)/, u = /(mozilla)(?:.*? rv:([\w.]+))?/, v = /-([a-z]|[0-9])/ig, w = /^-ms-/, x = function(a, b) {
            return (b + "").toUpperCase();
        }, y = d.userAgent, z, A, B, C = Object.prototype.toString, D = Object.prototype.hasOwnProperty, E = Array.prototype.push, F = Array.prototype.slice, G = String.prototype.trim, H = Array.prototype.indexOf, I = {};
        return e.fn = e.prototype = {
            constructor: e,
            init: function(a, d, f) {
                var g, h, j, k;
                if (!a) return this;
                if (a.nodeType) return this.context = this[0] = a, this.length = 1, this;
                if (a === "body" && !d && c.body) return this.context = c, this[0] = c.body, this.selector = a, this.length = 1, this;
                if (typeof a == "string") {
                    a.charAt(0) === "<" && a.charAt(a.length - 1) === ">" && a.length >= 3 ? g = [ null, a, null ] : g = i.exec(a);
                    if (g && (g[1] || !d)) {
                        if (g[1]) return d = d instanceof e ? d[0] : d, k = d ? d.ownerDocument || d : c, j = m.exec(a), j ? e.isPlainObject(d) ? (a = [ c.createElement(j[1]) ], e.fn.attr.call(a, d, !0)) : a = [ k.createElement(j[1]) ] : (j = e.buildFragment([ g[1] ], [ k ]), a = (j.cacheable ? e.clone(j.fragment) : j.fragment).childNodes), e.merge(this, a);
                        h = c.getElementById(g[2]);
                        if (h && h.parentNode) {
                            if (h.id !== g[2]) return f.find(a);
                            this.length = 1, this[0] = h;
                        }
                        return this.context = c, this.selector = a, this;
                    }
                    return !d || d.jquery ? (d || f).find(a) : this.constructor(d).find(a);
                }
                return e.isFunction(a) ? f.ready(a) : (a.selector !== b && (this.selector = a.selector, this.context = a.context), e.makeArray(a, this));
            },
            selector: "",
            jquery: "1.7.1",
            length: 0,
            size: function() {
                return this.length;
            },
            toArray: function() {
                return F.call(this, 0);
            },
            get: function(a) {
                return a == null ? this.toArray() : a < 0 ? this[this.length + a] : this[a];
            },
            pushStack: function(a, b, c) {
                var d = this.constructor();
                return e.isArray(a) ? E.apply(d, a) : e.merge(d, a), d.prevObject = this, d.context = this.context, b === "find" ? d.selector = this.selector + (this.selector ? " " : "") + c : b && (d.selector = this.selector + "." + b + "(" + c + ")"), d;
            },
            each: function(a, b) {
                return e.each(this, a, b);
            },
            ready: function(a) {
                return e.bindReady(), A.add(a), this;
            },
            eq: function(a) {
                return a = +a, a === -1 ? this.slice(a) : this.slice(a, a + 1);
            },
            first: function() {
                return this.eq(0);
            },
            last: function() {
                return this.eq(-1);
            },
            slice: function() {
                return this.pushStack(F.apply(this, arguments), "slice", F.call(arguments).join(","));
            },
            map: function(a) {
                return this.pushStack(e.map(this, function(b, c) {
                    return a.call(b, c, b);
                }));
            },
            end: function() {
                return this.prevObject || this.constructor(null);
            },
            push: E,
            sort: [].sort,
            splice: [].splice
        }, e.fn.init.prototype = e.fn, e.extend = e.fn.extend = function() {
            var a, c, d, f, g, h, i = arguments[0] || {}, j = 1, k = arguments.length, l = !1;
            typeof i == "boolean" && (l = i, i = arguments[1] || {}, j = 2), typeof i != "object" && !e.isFunction(i) && (i = {}), k === j && (i = this, --j);
            for (; j < k; j++) if ((a = arguments[j]) != null) for (c in a) {
                d = i[c], f = a[c];
                if (i === f) continue;
                l && f && (e.isPlainObject(f) || (g = e.isArray(f))) ? (g ? (g = !1, h = d && e.isArray(d) ? d : []) : h = d && e.isPlainObject(d) ? d : {}, i[c] = e.extend(l, h, f)) : f !== b && (i[c] = f);
            }
            return i;
        }, e.extend({
            noConflict: function(b) {
                return a.$ === e && (a.$ = g), b && a.jQuery === e && (a.jQuery = f), e;
            },
            isReady: !1,
            readyWait: 1,
            holdReady: function(a) {
                a ? e.readyWait++ : e.ready(!0);
            },
            ready: function(a) {
                if (a === !0 && !--e.readyWait || a !== !0 && !e.isReady) {
                    if (!c.body) return setTimeout(e.ready, 1);
                    e.isReady = !0;
                    if (a !== !0 && --e.readyWait > 0) return;
                    A.fireWith(c, [ e ]), e.fn.trigger && e(c).trigger("ready").off("ready");
                }
            },
            bindReady: function() {
                if (A) return;
                A = e.Callbacks("once memory");
                if (c.readyState === "complete") return setTimeout(e.ready, 1);
                if (c.addEventListener) c.addEventListener("DOMContentLoaded", B, !1), a.addEventListener("load", e.ready, !1); else if (c.attachEvent) {
                    c.attachEvent("onreadystatechange", B), a.attachEvent("onload", e.ready);
                    var b = !1;
                    try {
                        b = a.frameElement == null;
                    } catch (d) {}
                    c.documentElement.doScroll && b && J();
                }
            },
            isFunction: function(a) {
                return e.type(a) === "function";
            },
            isArray: Array.isArray || function(a) {
                return e.type(a) === "array";
            },
            isWindow: function(a) {
                return a && typeof a == "object" && "setInterval" in a;
            },
            isNumeric: function(a) {
                return !isNaN(parseFloat(a)) && isFinite(a);
            },
            type: function(a) {
                return a == null ? String(a) : I[C.call(a)] || "object";
            },
            isPlainObject: function(a) {
                if (!a || e.type(a) !== "object" || a.nodeType || e.isWindow(a)) return !1;
                try {
                    if (a.constructor && !D.call(a, "constructor") && !D.call(a.constructor.prototype, "isPrototypeOf")) return !1;
                } catch (c) {
                    return !1;
                }
                var d;
                for (d in a) ;
                return d === b || D.call(a, d);
            },
            isEmptyObject: function(a) {
                for (var b in a) return !1;
                return !0;
            },
            error: function(a) {
                throw new Error(a);
            },
            parseJSON: function(b) {
                if (typeof b != "string" || !b) return null;
                b = e.trim(b);
                if (a.JSON && a.JSON.parse) return a.JSON.parse(b);
                if (n.test(b.replace(o, "@").replace(p, "]").replace(q, ""))) return (new Function("return " + b))();
                e.error("Invalid JSON: " + b);
            },
            parseXML: function(c) {
                var d, f;
                try {
                    a.DOMParser ? (f = new DOMParser, d = f.parseFromString(c, "text/xml")) : (d = new ActiveXObject("Microsoft.XMLDOM"), d.async = "false", d.loadXML(c));
                } catch (g) {
                    d = b;
                }
                return (!d || !d.documentElement || d.getElementsByTagName("parsererror").length) && e.error("Invalid XML: " + c), d;
            },
            noop: function() {},
            globalEval: function(b) {
                b && j.test(b) && (a.execScript || function(b) {
                    a.eval.call(a, b);
                })(b);
            },
            camelCase: function(a) {
                return a.replace(w, "ms-").replace(v, x);
            },
            nodeName: function(a, b) {
                return a.nodeName && a.nodeName.toUpperCase() === b.toUpperCase();
            },
            each: function(a, c, d) {
                var f, g = 0, h = a.length, i = h === b || e.isFunction(a);
                if (d) {
                    if (i) {
                        for (f in a) if (c.apply(a[f], d) === !1) break;
                    } else for (; g < h; ) if (c.apply(a[g++], d) === !1) break;
                } else if (i) {
                    for (f in a) if (c.call(a[f], f, a[f]) === !1) break;
                } else for (; g < h; ) if (c.call(a[g], g, a[g++]) === !1) break;
                return a;
            },
            trim: G ? function(a) {
                return a == null ? "" : G.call(a);
            } : function(a) {
                return a == null ? "" : a.toString().replace(k, "").replace(l, "");
            },
            makeArray: function(a, b) {
                var c = b || [];
                if (a != null) {
                    var d = e.type(a);
                    a.length == null || d === "string" || d === "function" || d === "regexp" || e.isWindow(a) ? E.call(c, a) : e.merge(c, a);
                }
                return c;
            },
            inArray: function(a, b, c) {
                var d;
                if (b) {
                    if (H) return H.call(b, a, c);
                    d = b.length, c = c ? c < 0 ? Math.max(0, d + c) : c : 0;
                    for (; c < d; c++) if (c in b && b[c] === a) return c;
                }
                return -1;
            },
            merge: function(a, c) {
                var d = a.length, e = 0;
                if (typeof c.length == "number") for (var f = c.length; e < f; e++) a[d++] = c[e]; else while (c[e] !== b) a[d++] = c[e++];
                return a.length = d, a;
            },
            grep: function(a, b, c) {
                var d = [], e;
                c = !!c;
                for (var f = 0, g = a.length; f < g; f++) e = !!b(a[f], f), c !== e && d.push(a[f]);
                return d;
            },
            map: function(a, c, d) {
                var f, g, h = [], i = 0, j = a.length, k = a instanceof e || j !== b && typeof j == "number" && (j > 0 && a[0] && a[j - 1] || j === 0 || e.isArray(a));
                if (k) for (; i < j; i++) f = c(a[i], i, d), f != null && (h[h.length] = f); else for (g in a) f = c(a[g], g, d), f != null && (h[h.length] = f);
                return h.concat.apply([], h);
            },
            guid: 1,
            proxy: function(a, c) {
                if (typeof c == "string") {
                    var d = a[c];
                    c = a, a = d;
                }
                if (!e.isFunction(a)) return b;
                var f = F.call(arguments, 2), g = function() {
                    return a.apply(c, f.concat(F.call(arguments)));
                };
                return g.guid = a.guid = a.guid || g.guid || e.guid++, g;
            },
            access: function(a, c, d, f, g, h) {
                var i = a.length;
                if (typeof c == "object") {
                    for (var j in c) e.access(a, j, c[j], f, g, d);
                    return a;
                }
                if (d !== b) {
                    f = !h && f && e.isFunction(d);
                    for (var k = 0; k < i; k++) g(a[k], c, f ? d.call(a[k], k, g(a[k], c)) : d, h);
                    return a;
                }
                return i ? g(a[0], c) : b;
            },
            now: function() {
                return (new Date).getTime();
            },
            uaMatch: function(a) {
                a = a.toLowerCase();
                var b = r.exec(a) || s.exec(a) || t.exec(a) || a.indexOf("compatible") < 0 && u.exec(a) || [];
                return {
                    browser: b[1] || "",
                    version: b[2] || "0"
                };
            },
            sub: function() {
                function a(b, c) {
                    return new a.fn.init(b, c);
                }
                e.extend(!0, a, this), a.superclass = this, a.fn = a.prototype = this(), a.fn.constructor = a, a.sub = this.sub, a.fn.init = function(d, f) {
                    return f && f instanceof e && !(f instanceof a) && (f = a(f)), e.fn.init.call(this, d, f, b);
                }, a.fn.init.prototype = a.fn;
                var b = a(c);
                return a;
            },
            browser: {}
        }), e.each("Boolean Number String Function Array Date RegExp Object".split(" "), function(a, b) {
            I["[object " + b + "]"] = b.toLowerCase();
        }), z = e.uaMatch(y), z.browser && (e.browser[z.browser] = !0, e.browser.version = z.version), e.browser.webkit && (e.browser.safari = !0), j.test(" ") && (k = /^[\s\xA0]+/, l = /[\s\xA0]+$/), h = e(c), c.addEventListener ? B = function() {
            c.removeEventListener("DOMContentLoaded", B, !1), e.ready();
        } : c.attachEvent && (B = function() {
            c.readyState === "complete" && (c.detachEvent("onreadystatechange", B), e.ready());
        }), e;
    }(), g = {};
    f.Callbacks = function(a) {
        a = a ? g[a] || h(a) : {};
        var c = [], d = [], e, i, j, k, l, m = function(b) {
            var d, e, g, h, i;
            for (d = 0, e = b.length; d < e; d++) g = b[d], h = f.type(g), h === "array" ? m(g) : h === "function" && (!a.unique || !o.has(g)) && c.push(g);
        }, n = function(b, f) {
            f = f || [], e = !a.memory || [ b, f ], i = !0, l = j || 0, j = 0, k = c.length;
            for (; c && l < k; l++) if (c[l].apply(b, f) === !1 && a.stopOnFalse) {
                e = !0;
                break;
            }
            i = !1, c && (a.once ? e === !0 ? o.disable() : c = [] : d && d.length && (e = d.shift(), o.fireWith(e[0], e[1])));
        }, o = {
            add: function() {
                if (c) {
                    var a = c.length;
                    m(arguments), i ? k = c.length : e && e !== !0 && (j = a, n(e[0], e[1]));
                }
                return this;
            },
            remove: function() {
                if (c) {
                    var b = arguments, d = 0, e = b.length;
                    for (; d < e; d++) for (var f = 0; f < c.length; f++) if (b[d] === c[f]) {
                        i && f <= k && (k--, f <= l && l--), c.splice(f--, 1);
                        if (a.unique) break;
                    }
                }
                return this;
            },
            has: function(a) {
                if (c) {
                    var b = 0, d = c.length;
                    for (; b < d; b++) if (a === c[b]) return !0;
                }
                return !1;
            },
            empty: function() {
                return c = [], this;
            },
            disable: function() {
                return c = d = e = b, this;
            },
            disabled: function() {
                return !c;
            },
            lock: function() {
                return d = b, (!e || e === !0) && o.disable(), this;
            },
            locked: function() {
                return !d;
            },
            fireWith: function(b, c) {
                return d && (i ? a.once || d.push([ b, c ]) : (!a.once || !e) && n(b, c)), this;
            },
            fire: function() {
                return o.fireWith(this, arguments), this;
            },
            fired: function() {
                return !!e;
            }
        };
        return o;
    };
    var i = [].slice;
    f.extend({
        Deferred: function(a) {
            var b = f.Callbacks("once memory"), c = f.Callbacks("once memory"), d = f.Callbacks("memory"), e = "pending", g = {
                resolve: b,
                reject: c,
                notify: d
            }, h = {
                done: b.add,
                fail: c.add,
                progress: d.add,
                state: function() {
                    return e;
                },
                isResolved: b.fired,
                isRejected: c.fired,
                then: function(a, b, c) {
                    return i.done(a).fail(b).progress(c), this;
                },
                always: function() {
                    return i.done.apply(i, arguments).fail.apply(i, arguments), this;
                },
                pipe: function(a, b, c) {
                    return f.Deferred(function(d) {
                        f.each({
                            done: [ a, "resolve" ],
                            fail: [ b, "reject" ],
                            progress: [ c, "notify" ]
                        }, function(a, b) {
                            var c = b[0], e = b[1], g;
                            f.isFunction(c) ? i[a](function() {
                                g = c.apply(this, arguments), g && f.isFunction(g.promise) ? g.promise().then(d.resolve, d.reject, d.notify) : d[e + "With"](this === i ? d : this, [ g ]);
                            }) : i[a](d[e]);
                        });
                    }).promise();
                },
                promise: function(a) {
                    if (a == null) a = h; else for (var b in h) a[b] = h[b];
                    return a;
                }
            }, i = h.promise({}), j;
            for (j in g) i[j] = g[j].fire, i[j + "With"] = g[j].fireWith;
            return i.done(function() {
                e = "resolved";
            }, c.disable, d.lock).fail(function() {
                e = "rejected";
            }, b.disable, d.lock), a && a.call(i, i), i;
        },
        when: function(a) {
            function l(a) {
                return function(c) {
                    b[a] = arguments.length > 1 ? i.call(arguments, 0) : c, --g || j.resolveWith(j, b);
                };
            }
            function m(a) {
                return function(b) {
                    e[a] = arguments.length > 1 ? i.call(arguments, 0) : b, j.notifyWith(k, e);
                };
            }
            var b = i.call(arguments, 0), c = 0, d = b.length, e = new Array(d), g = d, h = d, j = d <= 1 && a && f.isFunction(a.promise) ? a : f.Deferred(), k = j.promise();
            if (d > 1) {
                for (; c < d; c++) b[c] && b[c].promise && f.isFunction(b[c].promise) ? b[c].promise().then(l(c), j.reject, m(c)) : --g;
                g || j.resolveWith(j, b);
            } else j !== a && j.resolveWith(j, d ? [ a ] : []);
            return k;
        }
    }), f.support = function() {
        var b, d, e, g, h, i, j, k, l, m, n, o, p, q = c.createElement("div"), r = c.documentElement;
        q.setAttribute("className", "t"), q.innerHTML = "   <link/><table></table><a href='/a' style='top:1px;float:left;opacity:.55;'>a</a><input type='checkbox'/>", d = q.getElementsByTagName("*"), e = q.getElementsByTagName("a")[0];
        if (!d || !d.length || !e) return {};
        g = c.createElement("select"), h = g.appendChild(c.createElement("option")), i = q.getElementsByTagName("input")[0], b = {
            leadingWhitespace: q.firstChild.nodeType === 3,
            tbody: !q.getElementsByTagName("tbody").length,
            htmlSerialize: !!q.getElementsByTagName("link").length,
            style: /top/.test(e.getAttribute("style")),
            hrefNormalized: e.getAttribute("href") === "/a",
            opacity: /^0.55/.test(e.style.opacity),
            cssFloat: !!e.style.cssFloat,
            checkOn: i.value === "on",
            optSelected: h.selected,
            getSetAttribute: q.className !== "t",
            enctype: !!c.createElement("form").enctype,
            html5Clone: c.createElement("nav").cloneNode(!0).outerHTML !== "<:nav></:nav>",
            submitBubbles: !0,
            changeBubbles: !0,
            focusinBubbles: !1,
            deleteExpando: !0,
            noCloneEvent: !0,
            inlineBlockNeedsLayout: !1,
            shrinkWrapBlocks: !1,
            reliableMarginRight: !0
        }, i.checked = !0, b.noCloneChecked = i.cloneNode(!0).checked, g.disabled = !0, b.optDisabled = !h.disabled;
        try {
            delete q.test;
        } catch (s) {
            b.deleteExpando = !1;
        }
        !q.addEventListener && q.attachEvent && q.fireEvent && (q.attachEvent("onclick", function() {
            b.noCloneEvent = !1;
        }), q.cloneNode(!0).fireEvent("onclick")), i = c.createElement("input"), i.value = "t", i.setAttribute("type", "radio"), b.radioValue = i.value === "t", i.setAttribute("checked", "checked"), q.appendChild(i), k = c.createDocumentFragment(), k.appendChild(q.lastChild), b.checkClone = k.cloneNode(!0).cloneNode(!0).lastChild.checked, b.appendChecked = i.checked, k.removeChild(i), k.appendChild(q), q.innerHTML = "", a.getComputedStyle && (j = c.createElement("div"), j.style.width = "0", j.style.marginRight = "0", q.style.width = "2px", q.appendChild(j), b.reliableMarginRight = (parseInt((a.getComputedStyle(j, null) || {
            marginRight: 0
        }).marginRight, 10) || 0) === 0);
        if (q.attachEvent) for (o in {
            submit: 1,
            change: 1,
            focusin: 1
        }) n = "on" + o, p = n in q, p || (q.setAttribute(n, "return;"), p = typeof q[n] == "function"), b[o + "Bubbles"] = p;
        return k.removeChild(q), k = g = h = j = q = i = null, f(function() {
            var a, d, e, g, h, i, j, k, m, n, o, r = c.getElementsByTagName("body")[0];
            if (!r) return;
            j = 1, k = "position:absolute;top:0;left:0;width:1px;height:1px;margin:0;", m = "visibility:hidden;border:0;", n = "style='" + k + "border:5px solid #000;padding:0;'", o = "<div " + n + "><div></div></div>" + "<table " + n + " cellpadding='0' cellspacing='0'>" + "<tr><td></td></tr></table>", a = c.createElement("div"), a.style.cssText = m + "width:0;height:0;position:static;top:0;margin-top:" + j + "px", r.insertBefore(a, r.firstChild), q = c.createElement("div"), a.appendChild(q), q.innerHTML = "<table><tr><td style='padding:0;border:0;display:none'></td><td>t</td></tr></table>", l = q.getElementsByTagName("td"), p = l[0].offsetHeight === 0, l[0].style.display = "", l[1].style.display = "none", b.reliableHiddenOffsets = p && l[0].offsetHeight === 0, q.innerHTML = "", q.style.width = q.style.paddingLeft = "1px", f.boxModel = b.boxModel = q.offsetWidth === 2, typeof q.style.zoom != "undefined" && (q.style.display = "inline", q.style.zoom = 1, b.inlineBlockNeedsLayout = q.offsetWidth === 2, q.style.display = "", q.innerHTML = "<div style='width:4px;'></div>", b.shrinkWrapBlocks = q.offsetWidth !== 2), q.style.cssText = k + m, q.innerHTML = o, d = q.firstChild, e = d.firstChild, h = d.nextSibling.firstChild.firstChild, i = {
                doesNotAddBorder: e.offsetTop !== 5,
                doesAddBorderForTableAndCells: h.offsetTop === 5
            }, e.style.position = "fixed", e.style.top = "20px", i.fixedPosition = e.offsetTop === 20 || e.offsetTop === 15, e.style.position = e.style.top = "", d.style.overflow = "hidden", d.style.position = "relative", i.subtractsBorderForOverflowNotVisible = e.offsetTop === -5, i.doesNotIncludeMarginInBodyOffset = r.offsetTop !== j, r.removeChild(a), q = a = null, f.extend(b, i);
        }), b;
    }();
    var j = /^(?:\{.*\}|\[.*\])$/, k = /([A-Z])/g;
    f.extend({
        cache: {},
        uuid: 0,
        expando: "jQuery" + (f.fn.jquery + Math.random()).replace(/\D/g, ""),
        noData: {
            embed: !0,
            object: "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000",
            applet: !0
        },
        hasData: function(a) {
            return a = a.nodeType ? f.cache[a[f.expando]] : a[f.expando], !!a && !m(a);
        },
        data: function(a, c, d, e) {
            if (!f.acceptData(a)) return;
            var g, h, i, j = f.expando, k = typeof c == "string", l = a.nodeType, m = l ? f.cache : a, n = l ? a[j] : a[j] && j, o = c === "events";
            if ((!n || !m[n] || !o && !e && !m[n].data) && k && d === b) return;
            n || (l ? a[j] = n = ++f.uuid : n = j), m[n] || (m[n] = {}, l || (m[n].toJSON = f.noop));
            if (typeof c == "object" || typeof c == "function") e ? m[n] = f.extend(m[n], c) : m[n].data = f.extend(m[n].data, c);
            return g = h = m[n], e || (h.data || (h.data = {}), h = h.data), d !== b && (h[f.camelCase(c)] = d), o && !h[c] ? g.events : (k ? (i = h[c], i == null && (i = h[f.camelCase(c)])) : i = h, i);
        },
        removeData: function(a, b, c) {
            if (!f.acceptData(a)) return;
            var d, e, g, h = f.expando, i = a.nodeType, j = i ? f.cache : a, k = i ? a[h] : h;
            if (!j[k]) return;
            if (b) {
                d = c ? j[k] : j[k].data;
                if (d) {
                    f.isArray(b) || (b in d ? b = [ b ] : (b = f.camelCase(b), b in d ? b = [ b ] : b = b.split(" ")));
                    for (e = 0, g = b.length; e < g; e++) delete d[b[e]];
                    if (!(c ? m : f.isEmptyObject)(d)) return;
                }
            }
            if (!c) {
                delete j[k].data;
                if (!m(j[k])) return;
            }
            f.support.deleteExpando || !j.setInterval ? delete j[k] : j[k] = null, i && (f.support.deleteExpando ? delete a[h] : a.removeAttribute ? a.removeAttribute(h) : a[h] = null);
        },
        _data: function(a, b, c) {
            return f.data(a, b, c, !0);
        },
        acceptData: function(a) {
            if (a.nodeName) {
                var b = f.noData[a.nodeName.toLowerCase()];
                if (b) return b !== !0 && a.getAttribute("classid") === b;
            }
            return !0;
        }
    }), f.fn.extend({
        data: function(a, c) {
            var d, e, g, h = null;
            if (typeof a == "undefined") {
                if (this.length) {
                    h = f.data(this[0]);
                    if (this[0].nodeType === 1 && !f._data(this[0], "parsedAttrs")) {
                        e = this[0].attributes;
                        for (var i = 0, j = e.length; i < j; i++) g = e[i].name, g.indexOf("data-") === 0 && (g = f.camelCase(g.substring(5)), l(this[0], g, h[g]));
                        f._data(this[0], "parsedAttrs", !0);
                    }
                }
                return h;
            }
            return typeof a == "object" ? this.each(function() {
                f.data(this, a);
            }) : (d = a.split("."), d[1] = d[1] ? "." + d[1] : "", c === b ? (h = this.triggerHandler("getData" + d[1] + "!", [ d[0] ]), h === b && this.length && (h = f.data(this[0], a), h = l(this[0], a, h)), h === b && d[1] ? this.data(d[0]) : h) : this.each(function() {
                var b = f(this), e = [ d[0], c ];
                b.triggerHandler("setData" + d[1] + "!", e), f.data(this, a, c), b.triggerHandler("changeData" + d[1] + "!", e);
            }));
        },
        removeData: function(a) {
            return this.each(function() {
                f.removeData(this, a);
            });
        }
    }), f.extend({
        _mark: function(a, b) {
            a && (b = (b || "fx") + "mark", f._data(a, b, (f._data(a, b) || 0) + 1));
        },
        _unmark: function(a, b, c) {
            a !== !0 && (c = b, b = a, a = !1);
            if (b) {
                c = c || "fx";
                var d = c + "mark", e = a ? 0 : (f._data(b, d) || 1) - 1;
                e ? f._data(b, d, e) : (f.removeData(b, d, !0), n(b, c, "mark"));
            }
        },
        queue: function(a, b, c) {
            var d;
            if (a) return b = (b || "fx") + "queue", d = f._data(a, b), c && (!d || f.isArray(c) ? d = f._data(a, b, f.makeArray(c)) : d.push(c)), d || [];
        },
        dequeue: function(a, b) {
            b = b || "fx";
            var c = f.queue(a, b), d = c.shift(), e = {};
            d === "inprogress" && (d = c.shift()), d && (b === "fx" && c.unshift("inprogress"), f._data(a, b + ".run", e), d.call(a, function() {
                f.dequeue(a, b);
            }, e)), c.length || (f.removeData(a, b + "queue " + b + ".run", !0), n(a, b, "queue"));
        }
    }), f.fn.extend({
        queue: function(a, c) {
            return typeof a != "string" && (c = a, a = "fx"), c === b ? f.queue(this[0], a) : this.each(function() {
                var b = f.queue(this, a, c);
                a === "fx" && b[0] !== "inprogress" && f.dequeue(this, a);
            });
        },
        dequeue: function(a) {
            return this.each(function() {
                f.dequeue(this, a);
            });
        },
        delay: function(a, b) {
            return a = f.fx ? f.fx.speeds[a] || a : a, b = b || "fx", this.queue(b, function(b, c) {
                var d = setTimeout(b, a);
                c.stop = function() {
                    clearTimeout(d);
                };
            });
        },
        clearQueue: function(a) {
            return this.queue(a || "fx", []);
        },
        promise: function(a, c) {
            function m() {
                --h || d.resolveWith(e, [ e ]);
            }
            typeof a != "string" && (c = a, a = b), a = a || "fx";
            var d = f.Deferred(), e = this, g = e.length, h = 1, i = a + "defer", j = a + "queue", k = a + "mark", l;
            while (g--) if (l = f.data(e[g], i, b, !0) || (f.data(e[g], j, b, !0) || f.data(e[g], k, b, !0)) && f.data(e[g], i, f.Callbacks("once memory"), !0)) h++, l.add(m);
            return m(), d.promise();
        }
    });
    var o = /[\n\t\r]/g, p = /\s+/, q = /\r/g, r = /^(?:button|input)$/i, s = /^(?:button|input|object|select|textarea)$/i, t = /^a(?:rea)?$/i, u = /^(?:autofocus|autoplay|async|checked|controls|defer|disabled|hidden|loop|multiple|open|readonly|required|scoped|selected)$/i, v = f.support.getSetAttribute, w, x, y;
    f.fn.extend({
        attr: function(a, b) {
            return f.access(this, a, b, !0, f.attr);
        },
        removeAttr: function(a) {
            return this.each(function() {
                f.removeAttr(this, a);
            });
        },
        prop: function(a, b) {
            return f.access(this, a, b, !0, f.prop);
        },
        removeProp: function(a) {
            return a = f.propFix[a] || a, this.each(function() {
                try {
                    this[a] = b, delete this[a];
                } catch (c) {}
            });
        },
        addClass: function(a) {
            var b, c, d, e, g, h, i;
            if (f.isFunction(a)) return this.each(function(b) {
                f(this).addClass(a.call(this, b, this.className));
            });
            if (a && typeof a == "string") {
                b = a.split(p);
                for (c = 0, d = this.length; c < d; c++) {
                    e = this[c];
                    if (e.nodeType === 1) if (!e.className && b.length === 1) e.className = a; else {
                        g = " " + e.className + " ";
                        for (h = 0, i = b.length; h < i; h++) ~g.indexOf(" " + b[h] + " ") || (g += b[h] + " ");
                        e.className = f.trim(g);
                    }
                }
            }
            return this;
        },
        removeClass: function(a) {
            var c, d, e, g, h, i, j;
            if (f.isFunction(a)) return this.each(function(b) {
                f(this).removeClass(a.call(this, b, this.className));
            });
            if (a && typeof a == "string" || a === b) {
                c = (a || "").split(p);
                for (d = 0, e = this.length; d < e; d++) {
                    g = this[d];
                    if (g.nodeType === 1 && g.className) if (a) {
                        h = (" " + g.className + " ").replace(o, " ");
                        for (i = 0, j = c.length; i < j; i++) h = h.replace(" " + c[i] + " ", " ");
                        g.className = f.trim(h);
                    } else g.className = "";
                }
            }
            return this;
        },
        toggleClass: function(a, b) {
            var c = typeof a, d = typeof b == "boolean";
            return f.isFunction(a) ? this.each(function(c) {
                f(this).toggleClass(a.call(this, c, this.className, b), b);
            }) : this.each(function() {
                if (c === "string") {
                    var e, g = 0, h = f(this), i = b, j = a.split(p);
                    while (e = j[g++]) i = d ? i : !h.hasClass(e), h[i ? "addClass" : "removeClass"](e);
                } else if (c === "undefined" || c === "boolean") this.className && f._data(this, "__className__", this.className), this.className = this.className || a === !1 ? "" : f._data(this, "__className__") || "";
            });
        },
        hasClass: function(a) {
            var b = " " + a + " ", c = 0, d = this.length;
            for (; c < d; c++) if (this[c].nodeType === 1 && (" " + this[c].className + " ").replace(o, " ").indexOf(b) > -1) return !0;
            return !1;
        },
        val: function(a) {
            var c, d, e, g = this[0];
            if (!arguments.length) {
                if (g) return c = f.valHooks[g.nodeName.toLowerCase()] || f.valHooks[g.type], c && "get" in c && (d = c.get(g, "value")) !== b ? d : (d = g.value, typeof d == "string" ? d.replace(q, "") : d == null ? "" : d);
                return;
            }
            return e = f.isFunction(a), this.each(function(d) {
                var g = f(this), h;
                if (this.nodeType !== 1) return;
                e ? h = a.call(this, d, g.val()) : h = a, h == null ? h = "" : typeof h == "number" ? h += "" : f.isArray(h) && (h = f.map(h, function(a) {
                    return a == null ? "" : a + "";
                })), c = f.valHooks[this.nodeName.toLowerCase()] || f.valHooks[this.type];
                if (!c || !("set" in c) || c.set(this, h, "value") === b) this.value = h;
            });
        }
    }), f.extend({
        valHooks: {
            option: {
                get: function(a) {
                    var b = a.attributes.value;
                    return !b || b.specified ? a.value : a.text;
                }
            },
            select: {
                get: function(a) {
                    var b, c, d, e, g = a.selectedIndex, h = [], i = a.options, j = a.type === "select-one";
                    if (g < 0) return null;
                    c = j ? g : 0, d = j ? g + 1 : i.length;
                    for (; c < d; c++) {
                        e = i[c];
                        if (e.selected && (f.support.optDisabled ? !e.disabled : e.getAttribute("disabled") === null) && (!e.parentNode.disabled || !f.nodeName(e.parentNode, "optgroup"))) {
                            b = f(e).val();
                            if (j) return b;
                            h.push(b);
                        }
                    }
                    return j && !h.length && i.length ? f(i[g]).val() : h;
                },
                set: function(a, b) {
                    var c = f.makeArray(b);
                    return f(a).find("option").each(function() {
                        this.selected = f.inArray(f(this).val(), c) >= 0;
                    }), c.length || (a.selectedIndex = -1), c;
                }
            }
        },
        attrFn: {
            val: !0,
            css: !0,
            html: !0,
            text: !0,
            data: !0,
            width: !0,
            height: !0,
            offset: !0
        },
        attr: function(a, c, d, e) {
            var g, h, i, j = a.nodeType;
            if (!a || j === 3 || j === 8 || j === 2) return;
            if (e && c in f.attrFn) return f(a)[c](d);
            if (typeof a.getAttribute == "undefined") return f.prop(a, c, d);
            i = j !== 1 || !f.isXMLDoc(a), i && (c = c.toLowerCase(), h = f.attrHooks[c] || (u.test(c) ? x : w));
            if (d !== b) {
                if (d === null) {
                    f.removeAttr(a, c);
                    return;
                }
                return h && "set" in h && i && (g = h.set(a, d, c)) !== b ? g : (a.setAttribute(c, "" + d), d);
            }
            return h && "get" in h && i && (g = h.get(a, c)) !== null ? g : (g = a.getAttribute(c), g === null ? b : g);
        },
        removeAttr: function(a, b) {
            var c, d, e, g, h = 0;
            if (b && a.nodeType === 1) {
                d = b.toLowerCase().split(p), g = d.length;
                for (; h < g; h++) e = d[h], e && (c = f.propFix[e] || e, f.attr(a, e, ""), a.removeAttribute(v ? e : c), u.test(e) && c in a && (a[c] = !1));
            }
        },
        attrHooks: {
            type: {
                set: function(a, b) {
                    if (r.test(a.nodeName) && a.parentNode) f.error("type property can't be changed"); else if (!f.support.radioValue && b === "radio" && f.nodeName(a, "input")) {
                        var c = a.value;
                        return a.setAttribute("type", b), c && (a.value = c), b;
                    }
                }
            },
            value: {
                get: function(a, b) {
                    return w && f.nodeName(a, "button") ? w.get(a, b) : b in a ? a.value : null;
                },
                set: function(a, b, c) {
                    if (w && f.nodeName(a, "button")) return w.set(a, b, c);
                    a.value = b;
                }
            }
        },
        propFix: {
            tabindex: "tabIndex",
            readonly: "readOnly",
            "for": "htmlFor",
            "class": "className",
            maxlength: "maxLength",
            cellspacing: "cellSpacing",
            cellpadding: "cellPadding",
            rowspan: "rowSpan",
            colspan: "colSpan",
            usemap: "useMap",
            frameborder: "frameBorder",
            contenteditable: "contentEditable"
        },
        prop: function(a, c, d) {
            var e, g, h, i = a.nodeType;
            if (!a || i === 3 || i === 8 || i === 2) return;
            return h = i !== 1 || !f.isXMLDoc(a), h && (c = f.propFix[c] || c, g = f.propHooks[c]), d !== b ? g && "set" in g && (e = g.set(a, d, c)) !== b ? e : a[c] = d : g && "get" in g && (e = g.get(a, c)) !== null ? e : a[c];
        },
        propHooks: {
            tabIndex: {
                get: function(a) {
                    var c = a.getAttributeNode("tabindex");
                    return c && c.specified ? parseInt(c.value, 10) : s.test(a.nodeName) || t.test(a.nodeName) && a.href ? 0 : b;
                }
            }
        }
    }), f.attrHooks.tabindex = f.propHooks.tabIndex, x = {
        get: function(a, c) {
            var d, e = f.prop(a, c);
            return e === !0 || typeof e != "boolean" && (d = a.getAttributeNode(c)) && d.nodeValue !== !1 ? c.toLowerCase() : b;
        },
        set: function(a, b, c) {
            var d;
            return b === !1 ? f.removeAttr(a, c) : (d = f.propFix[c] || c, d in a && (a[d] = !0), a.setAttribute(c, c.toLowerCase())), c;
        }
    }, v || (y = {
        name: !0,
        id: !0
    }, w = f.valHooks.button = {
        get: function(a, c) {
            var d;
            return d = a.getAttributeNode(c), d && (y[c] ? d.nodeValue !== "" : d.specified) ? d.nodeValue : b;
        },
        set: function(a, b, d) {
            var e = a.getAttributeNode(d);
            return e || (e = c.createAttribute(d), a.setAttributeNode(e)), e.nodeValue = b + "";
        }
    }, f.attrHooks.tabindex.set = w.set, f.each([ "width", "height" ], function(a, b) {
        f.attrHooks[b] = f.extend(f.attrHooks[b], {
            set: function(a, c) {
                if (c === "") return a.setAttribute(b, "auto"), c;
            }
        });
    }), f.attrHooks.contenteditable = {
        get: w.get,
        set: function(a, b, c) {
            b === "" && (b = "false"), w.set(a, b, c);
        }
    }), f.support.hrefNormalized || f.each([ "href", "src", "width", "height" ], function(a, c) {
        f.attrHooks[c] = f.extend(f.attrHooks[c], {
            get: function(a) {
                var d = a.getAttribute(c, 2);
                return d === null ? b : d;
            }
        });
    }), f.support.style || (f.attrHooks.style = {
        get: function(a) {
            return a.style.cssText.toLowerCase() || b;
        },
        set: function(a, b) {
            return a.style.cssText = "" + b;
        }
    }), f.support.optSelected || (f.propHooks.selected = f.extend(f.propHooks.selected, {
        get: function(a) {
            var b = a.parentNode;
            return b && (b.selectedIndex, b.parentNode && b.parentNode.selectedIndex), null;
        }
    })), f.support.enctype || (f.propFix.enctype = "encoding"), f.support.checkOn || f.each([ "radio", "checkbox" ], function() {
        f.valHooks[this] = {
            get: function(a) {
                return a.getAttribute("value") === null ? "on" : a.value;
            }
        };
    }), f.each([ "radio", "checkbox" ], function() {
        f.valHooks[this] = f.extend(f.valHooks[this], {
            set: function(a, b) {
                if (f.isArray(b)) return a.checked = f.inArray(f(a).val(), b) >= 0;
            }
        });
    });
    var z = /^(?:textarea|input|select)$/i, A = /^([^\.]*)?(?:\.(.+))?$/, B = /\bhover(\.\S+)?\b/, C = /^key/, D = /^(?:mouse|contextmenu)|click/, E = /^(?:focusinfocus|focusoutblur)$/, F = /^(\w*)(?:#([\w\-]+))?(?:\.([\w\-]+))?$/, G = function(a) {
        var b = F.exec(a);
        return b && (b[1] = (b[1] || "").toLowerCase(), b[3] = b[3] && new RegExp("(?:^|\\s)" + b[3] + "(?:\\s|$)")), b;
    }, H = function(a, b) {
        var c = a.attributes || {};
        return (!b[1] || a.nodeName.toLowerCase() === b[1]) && (!b[2] || (c.id || {}).value === b[2]) && (!b[3] || b[3].test((c["class"] || {}).value));
    }, I = function(a) {
        return f.event.special.hover ? a : a.replace(B, "mouseenter$1 mouseleave$1");
    };
    f.event = {
        add: function(a, c, d, e, g) {
            var h, i, j, k, l, m, n, o, p, q, r, s;
            if (a.nodeType === 3 || a.nodeType === 8 || !c || !d || !(h = f._data(a))) return;
            d.handler && (p = d, d = p.handler), d.guid || (d.guid = f.guid++), j = h.events, j || (h.events = j = {}), i = h.handle, i || (h.handle = i = function(a) {
                return typeof f == "undefined" || !!a && f.event.triggered === a.type ? b : f.event.dispatch.apply(i.elem, arguments);
            }, i.elem = a), c = f.trim(I(c)).split(" ");
            for (k = 0; k < c.length; k++) {
                l = A.exec(c[k]) || [], m = l[1], n = (l[2] || "").split(".").sort(), s = f.event.special[m] || {}, m = (g ? s.delegateType : s.bindType) || m, s = f.event.special[m] || {}, o = f.extend({
                    type: m,
                    origType: l[1],
                    data: e,
                    handler: d,
                    guid: d.guid,
                    selector: g,
                    quick: G(g),
                    namespace: n.join(".")
                }, p), r = j[m];
                if (!r) {
                    r = j[m] = [], r.delegateCount = 0;
                    if (!s.setup || s.setup.call(a, e, n, i) === !1) a.addEventListener ? a.addEventListener(m, i, !1) : a.attachEvent && a.attachEvent("on" + m, i);
                }
                s.add && (s.add.call(a, o), o.handler.guid || (o.handler.guid = d.guid)), g ? r.splice(r.delegateCount++, 0, o) : r.push(o), f.event.global[m] = !0;
            }
            a = null;
        },
        global: {},
        remove: function(a, b, c, d, e) {
            var g = f.hasData(a) && f._data(a), h, i, j, k, l, m, n, o, p, q, r, s;
            if (!g || !(o = g.events)) return;
            b = f.trim(I(b || "")).split(" ");
            for (h = 0; h < b.length; h++) {
                i = A.exec(b[h]) || [], j = k = i[1], l = i[2];
                if (!j) {
                    for (j in o) f.event.remove(a, j + b[h], c, d, !0);
                    continue;
                }
                p = f.event.special[j] || {}, j = (d ? p.delegateType : p.bindType) || j, r = o[j] || [], m = r.length, l = l ? new RegExp("(^|\\.)" + l.split(".").sort().join("\\.(?:.*\\.)?") + "(\\.|$)") : null;
                for (n = 0; n < r.length; n++) s = r[n], (e || k === s.origType) && (!c || c.guid === s.guid) && (!l || l.test(s.namespace)) && (!d || d === s.selector || d === "**" && s.selector) && (r.splice(n--, 1), s.selector && r.delegateCount--, p.remove && p.remove.call(a, s));
                r.length === 0 && m !== r.length && ((!p.teardown || p.teardown.call(a, l) === !1) && f.removeEvent(a, j, g.handle), delete o[j]);
            }
            f.isEmptyObject(o) && (q = g.handle, q && (q.elem = null), f.removeData(a, [ "events", "handle" ], !0));
        },
        customEvent: {
            getData: !0,
            setData: !0,
            changeData: !0
        },
        trigger: function(c, d, e, g) {
            if (!e || e.nodeType !== 3 && e.nodeType !== 8) {
                var h = c.type || c, i = [], j, k, l, m, n, o, p, q, r, s;
                if (E.test(h + f.event.triggered)) return;
                h.indexOf("!") >= 0 && (h = h.slice(0, -1), k = !0), h.indexOf(".") >= 0 && (i = h.split("."), h = i.shift(), i.sort());
                if ((!e || f.event.customEvent[h]) && !f.event.global[h]) return;
                c = typeof c == "object" ? c[f.expando] ? c : new f.Event(h, c) : new f.Event(h), c.type = h, c.isTrigger = !0, c.exclusive = k, c.namespace = i.join("."), c.namespace_re = c.namespace ? new RegExp("(^|\\.)" + i.join("\\.(?:.*\\.)?") + "(\\.|$)") : null, o = h.indexOf(":") < 0 ? "on" + h : "";
                if (!e) {
                    j = f.cache;
                    for (l in j) j[l].events && j[l].events[h] && f.event.trigger(c, d, j[l].handle.elem, !0);
                    return;
                }
                c.result = b, c.target || (c.target = e), d = d != null ? f.makeArray(d) : [], d.unshift(c), p = f.event.special[h] || {};
                if (p.trigger && p.trigger.apply(e, d) === !1) return;
                r = [ [ e, p.bindType || h ] ];
                if (!g && !p.noBubble && !f.isWindow(e)) {
                    s = p.delegateType || h, m = E.test(s + h) ? e : e.parentNode, n = null;
                    for (; m; m = m.parentNode) r.push([ m, s ]), n = m;
                    n && n === e.ownerDocument && r.push([ n.defaultView || n.parentWindow || a, s ]);
                }
                for (l = 0; l < r.length && !c.isPropagationStopped(); l++) m = r[l][0], c.type = r[l][1], q = (f._data(m, "events") || {})[c.type] && f._data(m, "handle"), q && q.apply(m, d), q = o && m[o], q && f.acceptData(m) && q.apply(m, d) === !1 && c.preventDefault();
                return c.type = h, !g && !c.isDefaultPrevented() && (!p._default || p._default.apply(e.ownerDocument, d) === !1) && (h !== "click" || !f.nodeName(e, "a")) && f.acceptData(e) && o && e[h] && (h !== "focus" && h !== "blur" || c.target.offsetWidth !== 0) && !f.isWindow(e) && (n = e[o], n && (e[o] = null), f.event.triggered = h, e[h](), f.event.triggered = b, n && (e[o] = n)), c.result;
            }
            return;
        },
        dispatch: function(c) {
            c = f.event.fix(c || a.event);
            var d = (f._data(this, "events") || {})[c.type] || [], e = d.delegateCount, g = [].slice.call(arguments, 0), h = !c.exclusive && !c.namespace, i = [], j, k, l, m, n, o, p, q, r, s, t;
            g[0] = c, c.delegateTarget = this;
            if (e && !c.target.disabled && (!c.button || c.type !== "click")) {
                m = f(this), m.context = this.ownerDocument || this;
                for (l = c.target; l != this; l = l.parentNode || this) {
                    o = {}, q = [], m[0] = l;
                    for (j = 0; j < e; j++) r = d[j], s = r.selector, o[s] === b && (o[s] = r.quick ? H(l, r.quick) : m.is(s)), o[s] && q.push(r);
                    q.length && i.push({
                        elem: l,
                        matches: q
                    });
                }
            }
            d.length > e && i.push({
                elem: this,
                matches: d.slice(e)
            });
            for (j = 0; j < i.length && !c.isPropagationStopped(); j++) {
                p = i[j], c.currentTarget = p.elem;
                for (k = 0; k < p.matches.length && !c.isImmediatePropagationStopped(); k++) {
                    r = p.matches[k];
                    if (h || !c.namespace && !r.namespace || c.namespace_re && c.namespace_re.test(r.namespace)) c.data = r.data, c.handleObj = r, n = ((f.event.special[r.origType] || {}).handle || r.handler).apply(p.elem, g), n !== b && (c.result = n, n === !1 && (c.preventDefault(), c.stopPropagation()));
                }
            }
            return c.result;
        },
        props: "attrChange attrName relatedNode srcElement altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),
        fixHooks: {},
        keyHooks: {
            props: "char charCode key keyCode".split(" "),
            filter: function(a, b) {
                return a.which == null && (a.which = b.charCode != null ? b.charCode : b.keyCode), a;
            }
        },
        mouseHooks: {
            props: "button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
            filter: function(a, d) {
                var e, f, g, h = d.button, i = d.fromElement;
                return a.pageX == null && d.clientX != null && (e = a.target.ownerDocument || c, f = e.documentElement, g = e.body, a.pageX = d.clientX + (f && f.scrollLeft || g && g.scrollLeft || 0) - (f && f.clientLeft || g && g.clientLeft || 0), a.pageY = d.clientY + (f && f.scrollTop || g && g.scrollTop || 0) - (f && f.clientTop || g && g.clientTop || 0)), !a.relatedTarget && i && (a.relatedTarget = i === a.target ? d.toElement : i), !a.which && h !== b && (a.which = h & 1 ? 1 : h & 2 ? 3 : h & 4 ? 2 : 0), a;
            }
        },
        fix: function(a) {
            if (a[f.expando]) return a;
            var d, e, g = a, h = f.event.fixHooks[a.type] || {}, i = h.props ? this.props.concat(h.props) : this.props;
            a = f.Event(g);
            for (d = i.length; d; ) e = i[--d], a[e] = g[e];
            return a.target || (a.target = g.srcElement || c), a.target.nodeType === 3 && (a.target = a.target.parentNode), a.metaKey === b && (a.metaKey = a.ctrlKey), h.filter ? h.filter(a, g) : a;
        },
        special: {
            ready: {
                setup: f.bindReady
            },
            load: {
                noBubble: !0
            },
            focus: {
                delegateType: "focusin"
            },
            blur: {
                delegateType: "focusout"
            },
            beforeunload: {
                setup: function(a, b, c) {
                    f.isWindow(this) && (this.onbeforeunload = c);
                },
                teardown: function(a, b) {
                    this.onbeforeunload === b && (this.onbeforeunload = null);
                }
            }
        },
        simulate: function(a, b, c, d) {
            var e = f.extend(new f.Event, c, {
                type: a,
                isSimulated: !0,
                originalEvent: {}
            });
            d ? f.event.trigger(e, null, b) : f.event.dispatch.call(b, e), e.isDefaultPrevented() && c.preventDefault();
        }
    }, f.event.handle = f.event.dispatch, f.removeEvent = c.removeEventListener ? function(a, b, c) {
        a.removeEventListener && a.removeEventListener(b, c, !1);
    } : function(a, b, c) {
        a.detachEvent && a.detachEvent("on" + b, c);
    }, f.Event = function(a, b) {
        if (this instanceof f.Event) a && a.type ? (this.originalEvent = a, this.type = a.type, this.isDefaultPrevented = a.defaultPrevented || a.returnValue === !1 || a.getPreventDefault && a.getPreventDefault() ? K : J) : this.type = a, b && f.extend(this, b), this.timeStamp = a && a.timeStamp || f.now(), this[f.expando] = !0; else return new f.Event(a, b);
    }, f.Event.prototype = {
        preventDefault: function() {
            this.isDefaultPrevented = K;
            var a = this.originalEvent;
            if (!a) return;
            a.preventDefault ? a.preventDefault() : a.returnValue = !1;
        },
        stopPropagation: function() {
            this.isPropagationStopped = K;
            var a = this.originalEvent;
            if (!a) return;
            a.stopPropagation && a.stopPropagation(), a.cancelBubble = !0;
        },
        stopImmediatePropagation: function() {
            this.isImmediatePropagationStopped = K, this.stopPropagation();
        },
        isDefaultPrevented: J,
        isPropagationStopped: J,
        isImmediatePropagationStopped: J
    }, f.each({
        mouseenter: "mouseover",
        mouseleave: "mouseout"
    }, function(a, b) {
        f.event.special[a] = {
            delegateType: b,
            bindType: b,
            handle: function(a) {
                var c = this, d = a.relatedTarget, e = a.handleObj, g = e.selector, h;
                if (!d || d !== c && !f.contains(c, d)) a.type = e.origType, h = e.handler.apply(this, arguments), a.type = b;
                return h;
            }
        };
    }), f.support.submitBubbles || (f.event.special.submit = {
        setup: function() {
            if (f.nodeName(this, "form")) return !1;
            f.event.add(this, "click._submit keypress._submit", function(a) {
                var c = a.target, d = f.nodeName(c, "input") || f.nodeName(c, "button") ? c.form : b;
                d && !d._submit_attached && (f.event.add(d, "submit._submit", function(a) {
                    this.parentNode && !a.isTrigger && f.event.simulate("submit", this.parentNode, a, !0);
                }), d._submit_attached = !0);
            });
        },
        teardown: function() {
            if (f.nodeName(this, "form")) return !1;
            f.event.remove(this, "._submit");
        }
    }), f.support.changeBubbles || (f.event.special.change = {
        setup: function() {
            if (z.test(this.nodeName)) {
                if (this.type === "checkbox" || this.type === "radio") f.event.add(this, "propertychange._change", function(a) {
                    a.originalEvent.propertyName === "checked" && (this._just_changed = !0);
                }), f.event.add(this, "click._change", function(a) {
                    this._just_changed && !a.isTrigger && (this._just_changed = !1, f.event.simulate("change", this, a, !0));
                });
                return !1;
            }
            f.event.add(this, "beforeactivate._change", function(a) {
                var b = a.target;
                z.test(b.nodeName) && !b._change_attached && (f.event.add(b, "change._change", function(a) {
                    this.parentNode && !a.isSimulated && !a.isTrigger && f.event.simulate("change", this.parentNode, a, !0);
                }), b._change_attached = !0);
            });
        },
        handle: function(a) {
            var b = a.target;
            if (this !== b || a.isSimulated || a.isTrigger || b.type !== "radio" && b.type !== "checkbox") return a.handleObj.handler.apply(this, arguments);
        },
        teardown: function() {
            return f.event.remove(this, "._change"), z.test(this.nodeName);
        }
    }), f.support.focusinBubbles || f.each({
        focus: "focusin",
        blur: "focusout"
    }, function(a, b) {
        var d = 0, e = function(a) {
            f.event.simulate(b, a.target, f.event.fix(a), !0);
        };
        f.event.special[b] = {
            setup: function() {
                d++ === 0 && c.addEventListener(a, e, !0);
            },
            teardown: function() {
                --d === 0 && c.removeEventListener(a, e, !0);
            }
        };
    }), f.fn.extend({
        on: function(a, c, d, e, g) {
            var h, i;
            if (typeof a == "object") {
                typeof c != "string" && (d = c, c = b);
                for (i in a) this.on(i, c, d, a[i], g);
                return this;
            }
            d == null && e == null ? (e = c, d = c = b) : e == null && (typeof c == "string" ? (e = d, d = b) : (e = d, d = c, c = b));
            if (e === !1) e = J; else if (!e) return this;
            return g === 1 && (h = e, e = function(a) {
                return f().off(a), h.apply(this, arguments);
            }, e.guid = h.guid || (h.guid = f.guid++)), this.each(function() {
                f.event.add(this, a, e, d, c);
            });
        },
        one: function(a, b, c, d) {
            return this.on.call(this, a, b, c, d, 1);
        },
        off: function(a, c, d) {
            if (a && a.preventDefault && a.handleObj) {
                var e = a.handleObj;
                return f(a.delegateTarget).off(e.namespace ? e.type + "." + e.namespace : e.type, e.selector, e.handler), this;
            }
            if (typeof a == "object") {
                for (var g in a) this.off(g, c, a[g]);
                return this;
            }
            if (c === !1 || typeof c == "function") d = c, c = b;
            return d === !1 && (d = J), this.each(function() {
                f.event.remove(this, a, d, c);
            });
        },
        bind: function(a, b, c) {
            return this.on(a, null, b, c);
        },
        unbind: function(a, b) {
            return this.off(a, null, b);
        },
        live: function(a, b, c) {
            return f(this.context).on(a, this.selector, b, c), this;
        },
        die: function(a, b) {
            return f(this.context).off(a, this.selector || "**", b), this;
        },
        delegate: function(a, b, c, d) {
            return this.on(b, a, c, d);
        },
        undelegate: function(a, b, c) {
            return arguments.length == 1 ? this.off(a, "**") : this.off(b, a, c);
        },
        trigger: function(a, b) {
            return this.each(function() {
                f.event.trigger(a, b, this);
            });
        },
        triggerHandler: function(a, b) {
            if (this[0]) return f.event.trigger(a, b, this[0], !0);
        },
        toggle: function(a) {
            var b = arguments, c = a.guid || f.guid++, d = 0, e = function(c) {
                var e = (f._data(this, "lastToggle" + a.guid) || 0) % d;
                return f._data(this, "lastToggle" + a.guid, e + 1), c.preventDefault(), b[e].apply(this, arguments) || !1;
            };
            e.guid = c;
            while (d < b.length) b[d++].guid = c;
            return this.click(e);
        },
        hover: function(a, b) {
            return this.mouseenter(a).mouseleave(b || a);
        }
    }), f.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "), function(a, b) {
        f.fn[b] = function(a, c) {
            return c == null && (c = a, a = null), arguments.length > 0 ? this.on(b, null, a, c) : this.trigger(b);
        }, f.attrFn && (f.attrFn[b] = !0), C.test(b) && (f.event.fixHooks[b] = f.event.keyHooks), D.test(b) && (f.event.fixHooks[b] = f.event.mouseHooks);
    }), function() {
        function w(a, b, c, e, f, g) {
            for (var h = 0, i = e.length; h < i; h++) {
                var j = e[h];
                if (j) {
                    var k = !1;
                    j = j[a];
                    while (j) {
                        if (j[d] === c) {
                            k = e[j.sizset];
                            break;
                        }
                        j.nodeType === 1 && !g && (j[d] = c, j.sizset = h);
                        if (j.nodeName.toLowerCase() === b) {
                            k = j;
                            break;
                        }
                        j = j[a];
                    }
                    e[h] = k;
                }
            }
        }
        function x(a, b, c, e, f, g) {
            for (var h = 0, i = e.length; h < i; h++) {
                var j = e[h];
                if (j) {
                    var k = !1;
                    j = j[a];
                    while (j) {
                        if (j[d] === c) {
                            k = e[j.sizset];
                            break;
                        }
                        if (j.nodeType === 1) {
                            g || (j[d] = c, j.sizset = h);
                            if (typeof b != "string") {
                                if (j === b) {
                                    k = !0;
                                    break;
                                }
                            } else if (m.filter(b, [ j ]).length > 0) {
                                k = j;
                                break;
                            }
                        }
                        j = j[a];
                    }
                    e[h] = k;
                }
            }
        }
        var a = /((?:\((?:\([^()]+\)|[^()]+)+\)|\[(?:\[[^\[\]]*\]|['"][^'"]*['"]|[^\[\]'"]+)+\]|\\.|[^ >+~,(\[\\]+)+|[>+~])(\s*,\s*)?((?:.|\r|\n)*)/g, d = "sizcache" + (Math.random() + "").replace(".", ""), e = 0, g = Object.prototype.toString, h = !1, i = !0, j = /\\/g, k = /\r\n/g, l = /\W/;
        [ 0, 0 ].sort(function() {
            return i = !1, 0;
        });
        var m = function(b, d, e, f) {
            e = e || [], d = d || c;
            var h = d;
            if (d.nodeType !== 1 && d.nodeType !== 9) return [];
            if (!b || typeof b != "string") return e;
            var i, j, k, l, n, q, r, t, u = !0, v = m.isXML(d), w = [], x = b;
            do {
                a.exec(""), i = a.exec(x);
                if (i) {
                    x = i[3], w.push(i[1]);
                    if (i[2]) {
                        l = i[3];
                        break;
                    }
                }
            } while (i);
            if (w.length > 1 && p.exec(b)) if (w.length === 2 && o.relative[w[0]]) j = y(w[0] + w[1], d, f); else {
                j = o.relative[w[0]] ? [ d ] : m(w.shift(), d);
                while (w.length) b = w.shift(), o.relative[b] && (b += w.shift()), j = y(b, j, f);
            } else {
                !f && w.length > 1 && d.nodeType === 9 && !v && o.match.ID.test(w[0]) && !o.match.ID.test(w[w.length - 1]) && (n = m.find(w.shift(), d, v), d = n.expr ? m.filter(n.expr, n.set)[0] : n.set[0]);
                if (d) {
                    n = f ? {
                        expr: w.pop(),
                        set: s(f)
                    } : m.find(w.pop(), w.length !== 1 || w[0] !== "~" && w[0] !== "+" || !d.parentNode ? d : d.parentNode, v), j = n.expr ? m.filter(n.expr, n.set) : n.set, w.length > 0 ? k = s(j) : u = !1;
                    while (w.length) q = w.pop(), r = q, o.relative[q] ? r = w.pop() : q = "", r == null && (r = d), o.relative[q](k, r, v);
                } else k = w = [];
            }
            k || (k = j), k || m.error(q || b);
            if (g.call(k) === "[object Array]") if (!u) e.push.apply(e, k); else if (d && d.nodeType === 1) for (t = 0; k[t] != null; t++) k[t] && (k[t] === !0 || k[t].nodeType === 1 && m.contains(d, k[t])) && e.push(j[t]); else for (t = 0; k[t] != null; t++) k[t] && k[t].nodeType === 1 && e.push(j[t]); else s(k, e);
            return l && (m(l, h, e, f), m.uniqueSort(e)), e;
        };
        m.uniqueSort = function(a) {
            if (u) {
                h = i, a.sort(u);
                if (h) for (var b = 1; b < a.length; b++) a[b] === a[b - 1] && a.splice(b--, 1);
            }
            return a;
        }, m.matches = function(a, b) {
            return m(a, null, null, b);
        }, m.matchesSelector = function(a, b) {
            return m(b, null, null, [ a ]).length > 0;
        }, m.find = function(a, b, c) {
            var d, e, f, g, h, i;
            if (!a) return [];
            for (e = 0, f = o.order.length; e < f; e++) {
                h = o.order[e];
                if (g = o.leftMatch[h].exec(a)) {
                    i = g[1], g.splice(1, 1);
                    if (i.substr(i.length - 1) !== "\\") {
                        g[1] = (g[1] || "").replace(j, ""), d = o.find[h](g, b, c);
                        if (d != null) {
                            a = a.replace(o.match[h], "");
                            break;
                        }
                    }
                }
            }
            return d || (d = typeof b.getElementsByTagName != "undefined" ? b.getElementsByTagName("*") : []), {
                set: d,
                expr: a
            };
        }, m.filter = function(a, c, d, e) {
            var f, g, h, i, j, k, l, n, p, q = a, r = [], s = c, t = c && c[0] && m.isXML(c[0]);
            while (a && c.length) {
                for (h in o.filter) if ((f = o.leftMatch[h].exec(a)) != null && f[2]) {
                    k = o.filter[h], l = f[1], g = !1, f.splice(1, 1);
                    if (l.substr(l.length - 1) === "\\") continue;
                    s === r && (r = []);
                    if (o.preFilter[h]) {
                        f = o.preFilter[h](f, s, d, r, e, t);
                        if (!f) g = i = !0; else if (f === !0) continue;
                    }
                    if (f) for (n = 0; (j = s[n]) != null; n++) j && (i = k(j, f, n, s), p = e ^ i, d && i != null ? p ? g = !0 : s[n] = !1 : p && (r.push(j), g = !0));
                    if (i !== b) {
                        d || (s = r), a = a.replace(o.match[h], "");
                        if (!g) return [];
                        break;
                    }
                }
                if (a === q) if (g == null) m.error(a); else break;
                q = a;
            }
            return s;
        }, m.error = function(a) {
            throw new Error("Syntax error, unrecognized expression: " + a);
        };
        var n = m.getText = function(a) {
            var b, c, d = a.nodeType, e = "";
            if (d) {
                if (d === 1 || d === 9) {
                    if (typeof a.textContent == "string") return a.textContent;
                    if (typeof a.innerText == "string") return a.innerText.replace(k, "");
                    for (a = a.firstChild; a; a = a.nextSibling) e += n(a);
                } else if (d === 3 || d === 4) return a.nodeValue;
            } else for (b = 0; c = a[b]; b++) c.nodeType !== 8 && (e += n(c));
            return e;
        }, o = m.selectors = {
            order: [ "ID", "NAME", "TAG" ],
            match: {
                ID: /#((?:[\w\u00c0-\uFFFF\-]|\\.)+)/,
                CLASS: /\.((?:[\w\u00c0-\uFFFF\-]|\\.)+)/,
                NAME: /\[name=['"]*((?:[\w\u00c0-\uFFFF\-]|\\.)+)['"]*\]/,
                ATTR: /\[\s*((?:[\w\u00c0-\uFFFF\-]|\\.)+)\s*(?:(\S?=)\s*(?:(['"])(.*?)\3|(#?(?:[\w\u00c0-\uFFFF\-]|\\.)*)|)|)\s*\]/,
                TAG: /^((?:[\w\u00c0-\uFFFF\*\-]|\\.)+)/,
                CHILD: /:(only|nth|last|first)-child(?:\(\s*(even|odd|(?:[+\-]?\d+|(?:[+\-]?\d*)?n\s*(?:[+\-]\s*\d+)?))\s*\))?/,
                POS: /:(nth|eq|gt|lt|first|last|even|odd)(?:\((\d*)\))?(?=[^\-]|$)/,
                PSEUDO: /:((?:[\w\u00c0-\uFFFF\-]|\\.)+)(?:\((['"]?)((?:\([^\)]+\)|[^\(\)]*)+)\2\))?/
            },
            leftMatch: {},
            attrMap: {
                "class": "className",
                "for": "htmlFor"
            },
            attrHandle: {
                href: function(a) {
                    return a.getAttribute("href");
                },
                type: function(a) {
                    return a.getAttribute("type");
                }
            },
            relative: {
                "+": function(a, b) {
                    var c = typeof b == "string", d = c && !l.test(b), e = c && !d;
                    d && (b = b.toLowerCase());
                    for (var f = 0, g = a.length, h; f < g; f++) if (h = a[f]) {
                        while ((h = h.previousSibling) && h.nodeType !== 1) ;
                        a[f] = e || h && h.nodeName.toLowerCase() === b ? h || !1 : h === b;
                    }
                    e && m.filter(b, a, !0);
                },
                ">": function(a, b) {
                    var c, d = typeof b == "string", e = 0, f = a.length;
                    if (d && !l.test(b)) {
                        b = b.toLowerCase();
                        for (; e < f; e++) {
                            c = a[e];
                            if (c) {
                                var g = c.parentNode;
                                a[e] = g.nodeName.toLowerCase() === b ? g : !1;
                            }
                        }
                    } else {
                        for (; e < f; e++) c = a[e], c && (a[e] = d ? c.parentNode : c.parentNode === b);
                        d && m.filter(b, a, !0);
                    }
                },
                "": function(a, b, c) {
                    var d, f = e++, g = x;
                    typeof b == "string" && !l.test(b) && (b = b.toLowerCase(), d = b, g = w), g("parentNode", b, f, a, d, c);
                },
                "~": function(a, b, c) {
                    var d, f = e++, g = x;
                    typeof b == "string" && !l.test(b) && (b = b.toLowerCase(), d = b, g = w), g("previousSibling", b, f, a, d, c);
                }
            },
            find: {
                ID: function(a, b, c) {
                    if (typeof b.getElementById != "undefined" && !c) {
                        var d = b.getElementById(a[1]);
                        return d && d.parentNode ? [ d ] : [];
                    }
                },
                NAME: function(a, b) {
                    if (typeof b.getElementsByName != "undefined") {
                        var c = [], d = b.getElementsByName(a[1]);
                        for (var e = 0, f = d.length; e < f; e++) d[e].getAttribute("name") === a[1] && c.push(d[e]);
                        return c.length === 0 ? null : c;
                    }
                },
                TAG: function(a, b) {
                    if (typeof b.getElementsByTagName != "undefined") return b.getElementsByTagName(a[1]);
                }
            },
            preFilter: {
                CLASS: function(a, b, c, d, e, f) {
                    a = " " + a[1].replace(j, "") + " ";
                    if (f) return a;
                    for (var g = 0, h; (h = b[g]) != null; g++) h && (e ^ (h.className && (" " + h.className + " ").replace(/[\t\n\r]/g, " ").indexOf(a) >= 0) ? c || d.push(h) : c && (b[g] = !1));
                    return !1;
                },
                ID: function(a) {
                    return a[1].replace(j, "");
                },
                TAG: function(a, b) {
                    return a[1].replace(j, "").toLowerCase();
                },
                CHILD: function(a) {
                    if (a[1] === "nth") {
                        a[2] || m.error(a[0]), a[2] = a[2].replace(/^\+|\s*/g, "");
                        var b = /(-?)(\d*)(?:n([+\-]?\d*))?/.exec(a[2] === "even" && "2n" || a[2] === "odd" && "2n+1" || !/\D/.test(a[2]) && "0n+" + a[2] || a[2]);
                        a[2] = b[1] + (b[2] || 1) - 0, a[3] = b[3] - 0;
                    } else a[2] && m.error(a[0]);
                    return a[0] = e++, a;
                },
                ATTR: function(a, b, c, d, e, f) {
                    var g = a[1] = a[1].replace(j, "");
                    return !f && o.attrMap[g] && (a[1] = o.attrMap[g]), a[4] = (a[4] || a[5] || "").replace(j, ""), a[2] === "~=" && (a[4] = " " + a[4] + " "), a;
                },
                PSEUDO: function(b, c, d, e, f) {
                    if (b[1] === "not") if ((a.exec(b[3]) || "").length > 1 || /^\w/.test(b[3])) b[3] = m(b[3], null, null, c); else {
                        var g = m.filter(b[3], c, d, !0 ^ f);
                        return d || e.push.apply(e, g), !1;
                    } else if (o.match.POS.test(b[0]) || o.match.CHILD.test(b[0])) return !0;
                    return b;
                },
                POS: function(a) {
                    return a.unshift(!0), a;
                }
            },
            filters: {
                enabled: function(a) {
                    return a.disabled === !1 && a.type !== "hidden";
                },
                disabled: function(a) {
                    return a.disabled === !0;
                },
                checked: function(a) {
                    return a.checked === !0;
                },
                selected: function(a) {
                    return a.parentNode && a.parentNode.selectedIndex, a.selected === !0;
                },
                parent: function(a) {
                    return !!a.firstChild;
                },
                empty: function(a) {
                    return !a.firstChild;
                },
                has: function(a, b, c) {
                    return !!m(c[3], a).length;
                },
                header: function(a) {
                    return /h\d/i.test(a.nodeName);
                },
                text: function(a) {
                    var b = a.getAttribute("type"), c = a.type;
                    return a.nodeName.toLowerCase() === "input" && "text" === c && (b === c || b === null);
                },
                radio: function(a) {
                    return a.nodeName.toLowerCase() === "input" && "radio" === a.type;
                },
                checkbox: function(a) {
                    return a.nodeName.toLowerCase() === "input" && "checkbox" === a.type;
                },
                file: function(a) {
                    return a.nodeName.toLowerCase() === "input" && "file" === a.type;
                },
                password: function(a) {
                    return a.nodeName.toLowerCase() === "input" && "password" === a.type;
                },
                submit: function(a) {
                    var b = a.nodeName.toLowerCase();
                    return (b === "input" || b === "button") && "submit" === a.type;
                },
                image: function(a) {
                    return a.nodeName.toLowerCase() === "input" && "image" === a.type;
                },
                reset: function(a) {
                    var b = a.nodeName.toLowerCase();
                    return (b === "input" || b === "button") && "reset" === a.type;
                },
                button: function(a) {
                    var b = a.nodeName.toLowerCase();
                    return b === "input" && "button" === a.type || b === "button";
                },
                input: function(a) {
                    return /input|select|textarea|button/i.test(a.nodeName);
                },
                focus: function(a) {
                    return a === a.ownerDocument.activeElement;
                }
            },
            setFilters: {
                first: function(a, b) {
                    return b === 0;
                },
                last: function(a, b, c, d) {
                    return b === d.length - 1;
                },
                even: function(a, b) {
                    return b % 2 === 0;
                },
                odd: function(a, b) {
                    return b % 2 === 1;
                },
                lt: function(a, b, c) {
                    return b < c[3] - 0;
                },
                gt: function(a, b, c) {
                    return b > c[3] - 0;
                },
                nth: function(a, b, c) {
                    return c[3] - 0 === b;
                },
                eq: function(a, b, c) {
                    return c[3] - 0 === b;
                }
            },
            filter: {
                PSEUDO: function(a, b, c, d) {
                    var e = b[1], f = o.filters[e];
                    if (f) return f(a, c, b, d);
                    if (e === "contains") return (a.textContent || a.innerText || n([ a ]) || "").indexOf(b[3]) >= 0;
                    if (e === "not") {
                        var g = b[3];
                        for (var h = 0, i = g.length; h < i; h++) if (g[h] === a) return !1;
                        return !0;
                    }
                    m.error(e);
                },
                CHILD: function(a, b) {
                    var c, e, f, g, h, i, j, k = b[1], l = a;
                    switch (k) {
                      case "only":
                      case "first":
                        while (l = l.previousSibling) if (l.nodeType === 1) return !1;
                        if (k === "first") return !0;
                        l = a;
                      case "last":
                        while (l = l.nextSibling) if (l.nodeType === 1) return !1;
                        return !0;
                      case "nth":
                        c = b[2], e = b[3];
                        if (c === 1 && e === 0) return !0;
                        f = b[0], g = a.parentNode;
                        if (g && (g[d] !== f || !a.nodeIndex)) {
                            i = 0;
                            for (l = g.firstChild; l; l = l.nextSibling) l.nodeType === 1 && (l.nodeIndex = ++i);
                            g[d] = f;
                        }
                        return j = a.nodeIndex - e, c === 0 ? j === 0 : j % c === 0 && j / c >= 0;
                    }
                },
                ID: function(a, b) {
                    return a.nodeType === 1 && a.getAttribute("id") === b;
                },
                TAG: function(a, b) {
                    return b === "*" && a.nodeType === 1 || !!a.nodeName && a.nodeName.toLowerCase() === b;
                },
                CLASS: function(a, b) {
                    return (" " + (a.className || a.getAttribute("class")) + " ").indexOf(b) > -1;
                },
                ATTR: function(a, b) {
                    var c = b[1], d = m.attr ? m.attr(a, c) : o.attrHandle[c] ? o.attrHandle[c](a) : a[c] != null ? a[c] : a.getAttribute(c), e = d + "", f = b[2], g = b[4];
                    return d == null ? f === "!=" : !f && m.attr ? d != null : f === "=" ? e === g : f === "*=" ? e.indexOf(g) >= 0 : f === "~=" ? (" " + e + " ").indexOf(g) >= 0 : g ? f === "!=" ? e !== g : f === "^=" ? e.indexOf(g) === 0 : f === "$=" ? e.substr(e.length - g.length) === g : f === "|=" ? e === g || e.substr(0, g.length + 1) === g + "-" : !1 : e && d !== !1;
                },
                POS: function(a, b, c, d) {
                    var e = b[2], f = o.setFilters[e];
                    if (f) return f(a, c, b, d);
                }
            }
        }, p = o.match.POS, q = function(a, b) {
            return "\\" + (b - 0 + 1);
        };
        for (var r in o.match) o.match[r] = new RegExp(o.match[r].source + /(?![^\[]*\])(?![^\(]*\))/.source), o.leftMatch[r] = new RegExp(/(^(?:.|\r|\n)*?)/.source + o.match[r].source.replace(/\\(\d+)/g, q));
        var s = function(a, b) {
            return a = Array.prototype.slice.call(a, 0), b ? (b.push.apply(b, a), b) : a;
        };
        try {
            Array.prototype.slice.call(c.documentElement.childNodes, 0)[0].nodeType;
        } catch (t) {
            s = function(a, b) {
                var c = 0, d = b || [];
                if (g.call(a) === "[object Array]") Array.prototype.push.apply(d, a); else if (typeof a.length == "number") for (var e = a.length; c < e; c++) d.push(a[c]); else for (; a[c]; c++) d.push(a[c]);
                return d;
            };
        }
        var u, v;
        c.documentElement.compareDocumentPosition ? u = function(a, b) {
            return a === b ? (h = !0, 0) : !a.compareDocumentPosition || !b.compareDocumentPosition ? a.compareDocumentPosition ? -1 : 1 : a.compareDocumentPosition(b) & 4 ? -1 : 1;
        } : (u = function(a, b) {
            if (a === b) return h = !0, 0;
            if (a.sourceIndex && b.sourceIndex) return a.sourceIndex - b.sourceIndex;
            var c, d, e = [], f = [], g = a.parentNode, i = b.parentNode, j = g;
            if (g === i) return v(a, b);
            if (!g) return -1;
            if (!i) return 1;
            while (j) e.unshift(j), j = j.parentNode;
            j = i;
            while (j) f.unshift(j), j = j.parentNode;
            c = e.length, d = f.length;
            for (var k = 0; k < c && k < d; k++) if (e[k] !== f[k]) return v(e[k], f[k]);
            return k === c ? v(a, f[k], -1) : v(e[k], b, 1);
        }, v = function(a, b, c) {
            if (a === b) return c;
            var d = a.nextSibling;
            while (d) {
                if (d === b) return -1;
                d = d.nextSibling;
            }
            return 1;
        }), function() {
            var a = c.createElement("div"), d = "script" + (new Date).getTime(), e = c.documentElement;
            a.innerHTML = "<a name='" + d + "'/>", e.insertBefore(a, e.firstChild), c.getElementById(d) && (o.find.ID = function(a, c, d) {
                if (typeof c.getElementById != "undefined" && !d) {
                    var e = c.getElementById(a[1]);
                    return e ? e.id === a[1] || typeof e.getAttributeNode != "undefined" && e.getAttributeNode("id").nodeValue === a[1] ? [ e ] : b : [];
                }
            }, o.filter.ID = function(a, b) {
                var c = typeof a.getAttributeNode != "undefined" && a.getAttributeNode("id");
                return a.nodeType === 1 && c && c.nodeValue === b;
            }), e.removeChild(a), e = a = null;
        }(), function() {
            var a = c.createElement("div");
            a.appendChild(c.createComment("")), a.getElementsByTagName("*").length > 0 && (o.find.TAG = function(a, b) {
                var c = b.getElementsByTagName(a[1]);
                if (a[1] === "*") {
                    var d = [];
                    for (var e = 0; c[e]; e++) c[e].nodeType === 1 && d.push(c[e]);
                    c = d;
                }
                return c;
            }), a.innerHTML = "<a href='#'></a>", a.firstChild && typeof a.firstChild.getAttribute != "undefined" && a.firstChild.getAttribute("href") !== "#" && (o.attrHandle.href = function(a) {
                return a.getAttribute("href", 2);
            }), a = null;
        }(), c.querySelectorAll && function() {
            var a = m, b = c.createElement("div"), d = "__sizzle__";
            b.innerHTML = "<p class='TEST'></p>";
            if (b.querySelectorAll && b.querySelectorAll(".TEST").length === 0) return;
            m = function(b, e, f, g) {
                e = e || c;
                if (!g && !m.isXML(e)) {
                    var h = /^(\w+$)|^\.([\w\-]+$)|^#([\w\-]+$)/.exec(b);
                    if (h && (e.nodeType === 1 || e.nodeType === 9)) {
                        if (h[1]) return s(e.getElementsByTagName(b), f);
                        if (h[2] && o.find.CLASS && e.getElementsByClassName) return s(e.getElementsByClassName(h[2]), f);
                    }
                    if (e.nodeType === 9) {
                        if (b === "body" && e.body) return s([ e.body ], f);
                        if (h && h[3]) {
                            var i = e.getElementById(h[3]);
                            if (!i || !i.parentNode) return s([], f);
                            if (i.id === h[3]) return s([ i ], f);
                        }
                        try {
                            return s(e.querySelectorAll(b), f);
                        } catch (j) {}
                    } else if (e.nodeType === 1 && e.nodeName.toLowerCase() !== "object") {
                        var k = e, l = e.getAttribute("id"), n = l || d, p = e.parentNode, q = /^\s*[+~]/.test(b);
                        l ? n = n.replace(/'/g, "\\$&") : e.setAttribute("id", n), q && p && (e = e.parentNode);
                        try {
                            if (!q || p) return s(e.querySelectorAll("[id='" + n + "'] " + b), f);
                        } catch (r) {} finally {
                            l || k.removeAttribute("id");
                        }
                    }
                }
                return a(b, e, f, g);
            };
            for (var e in a) m[e] = a[e];
            b = null;
        }(), function() {
            var a = c.documentElement, b = a.matchesSelector || a.mozMatchesSelector || a.webkitMatchesSelector || a.msMatchesSelector;
            if (b) {
                var d = !b.call(c.createElement("div"), "div"), e = !1;
                try {
                    b.call(c.documentElement, "[test!='']:sizzle");
                } catch (f) {
                    e = !0;
                }
                m.matchesSelector = function(a, c) {
                    c = c.replace(/\=\s*([^'"\]]*)\s*\]/g, "='$1']");
                    if (!m.isXML(a)) try {
                        if (e || !o.match.PSEUDO.test(c) && !/!=/.test(c)) {
                            var f = b.call(a, c);
                            if (f || !d || a.document && a.document.nodeType !== 11) return f;
                        }
                    } catch (g) {}
                    return m(c, null, null, [ a ]).length > 0;
                };
            }
        }(), function() {
            var a = c.createElement("div");
            a.innerHTML = "<div class='test e'></div><div class='test'></div>";
            if (!a.getElementsByClassName || a.getElementsByClassName("e").length === 0) return;
            a.lastChild.className = "e";
            if (a.getElementsByClassName("e").length === 1) return;
            o.order.splice(1, 0, "CLASS"), o.find.CLASS = function(a, b, c) {
                if (typeof b.getElementsByClassName != "undefined" && !c) return b.getElementsByClassName(a[1]);
            }, a = null;
        }(), c.documentElement.contains ? m.contains = function(a, b) {
            return a !== b && (a.contains ? a.contains(b) : !0);
        } : c.documentElement.compareDocumentPosition ? m.contains = function(a, b) {
            return !!(a.compareDocumentPosition(b) & 16);
        } : m.contains = function() {
            return !1;
        }, m.isXML = function(a) {
            var b = (a ? a.ownerDocument || a : 0).documentElement;
            return b ? b.nodeName !== "HTML" : !1;
        };
        var y = function(a, b, c) {
            var d, e = [], f = "", g = b.nodeType ? [ b ] : b;
            while (d = o.match.PSEUDO.exec(a)) f += d[0], a = a.replace(o.match.PSEUDO, "");
            a = o.relative[a] ? a + "*" : a;
            for (var h = 0, i = g.length; h < i; h++) m(a, g[h], e, c);
            return m.filter(f, e);
        };
        m.attr = f.attr, m.selectors.attrMap = {}, f.find = m, f.expr = m.selectors, f.expr[":"] = f.expr.filters, f.unique = m.uniqueSort, f.text = m.getText, f.isXMLDoc = m.isXML, f.contains = m.contains;
    }();
    var L = /Until$/, M = /^(?:parents|prevUntil|prevAll)/, N = /,/, O = /^.[^:#\[\.,]*$/, P = Array.prototype.slice, Q = f.expr.match.POS, R = {
        children: !0,
        contents: !0,
        next: !0,
        prev: !0
    };
    f.fn.extend({
        find: function(a) {
            var b = this, c, d;
            if (typeof a != "string") return f(a).filter(function() {
                for (c = 0, d = b.length; c < d; c++) if (f.contains(b[c], this)) return !0;
            });
            var e = this.pushStack("", "find", a), g, h, i;
            for (c = 0, d = this.length; c < d; c++) {
                g = e.length, f.find(a, this[c], e);
                if (c > 0) for (h = g; h < e.length; h++) for (i = 0; i < g; i++) if (e[i] === e[h]) {
                    e.splice(h--, 1);
                    break;
                }
            }
            return e;
        },
        has: function(a) {
            var b = f(a);
            return this.filter(function() {
                for (var a = 0, c = b.length; a < c; a++) if (f.contains(this, b[a])) return !0;
            });
        },
        not: function(a) {
            return this.pushStack(T(this, a, !1), "not", a);
        },
        filter: function(a) {
            return this.pushStack(T(this, a, !0), "filter", a);
        },
        is: function(a) {
            return !!a && (typeof a == "string" ? Q.test(a) ? f(a, this.context).index(this[0]) >= 0 : f.filter(a, this).length > 0 : this.filter(a).length > 0);
        },
        closest: function(a, b) {
            var c = [], d, e, g = this[0];
            if (f.isArray(a)) {
                var h = 1;
                while (g && g.ownerDocument && g !== b) {
                    for (d = 0; d < a.length; d++) f(g).is(a[d]) && c.push({
                        selector: a[d],
                        elem: g,
                        level: h
                    });
                    g = g.parentNode, h++;
                }
                return c;
            }
            var i = Q.test(a) || typeof a != "string" ? f(a, b || this.context) : 0;
            for (d = 0, e = this.length; d < e; d++) {
                g = this[d];
                while (g) {
                    if (i ? i.index(g) > -1 : f.find.matchesSelector(g, a)) {
                        c.push(g);
                        break;
                    }
                    g = g.parentNode;
                    if (!g || !g.ownerDocument || g === b || g.nodeType === 11) break;
                }
            }
            return c = c.length > 1 ? f.unique(c) : c, this.pushStack(c, "closest", a);
        },
        index: function(a) {
            return a ? typeof a == "string" ? f.inArray(this[0], f(a)) : f.inArray(a.jquery ? a[0] : a, this) : this[0] && this[0].parentNode ? this.prevAll().length : -1;
        },
        add: function(a, b) {
            var c = typeof a == "string" ? f(a, b) : f.makeArray(a && a.nodeType ? [ a ] : a), d = f.merge(this.get(), c);
            return this.pushStack(S(c[0]) || S(d[0]) ? d : f.unique(d));
        },
        andSelf: function() {
            return this.add(this.prevObject);
        }
    }), f.each({
        parent: function(a) {
            var b = a.parentNode;
            return b && b.nodeType !== 11 ? b : null;
        },
        parents: function(a) {
            return f.dir(a, "parentNode");
        },
        parentsUntil: function(a, b, c) {
            return f.dir(a, "parentNode", c);
        },
        next: function(a) {
            return f.nth(a, 2, "nextSibling");
        },
        prev: function(a) {
            return f.nth(a, 2, "previousSibling");
        },
        nextAll: function(a) {
            return f.dir(a, "nextSibling");
        },
        prevAll: function(a) {
            return f.dir(a, "previousSibling");
        },
        nextUntil: function(a, b, c) {
            return f.dir(a, "nextSibling", c);
        },
        prevUntil: function(a, b, c) {
            return f.dir(a, "previousSibling", c);
        },
        siblings: function(a) {
            return f.sibling(a.parentNode.firstChild, a);
        },
        children: function(a) {
            return f.sibling(a.firstChild);
        },
        contents: function(a) {
            return f.nodeName(a, "iframe") ? a.contentDocument || a.contentWindow.document : f.makeArray(a.childNodes);
        }
    }, function(a, b) {
        f.fn[a] = function(c, d) {
            var e = f.map(this, b, c);
            return L.test(a) || (d = c), d && typeof d == "string" && (e = f.filter(d, e)), e = this.length > 1 && !R[a] ? f.unique(e) : e, (this.length > 1 || N.test(d)) && M.test(a) && (e = e.reverse()), this.pushStack(e, a, P.call(arguments).join(","));
        };
    }), f.extend({
        filter: function(a, b, c) {
            return c && (a = ":not(" + a + ")"), b.length === 1 ? f.find.matchesSelector(b[0], a) ? [ b[0] ] : [] : f.find.matches(a, b);
        },
        dir: function(a, c, d) {
            var e = [], g = a[c];
            while (g && g.nodeType !== 9 && (d === b || g.nodeType !== 1 || !f(g).is(d))) g.nodeType === 1 && e.push(g), g = g[c];
            return e;
        },
        nth: function(a, b, c, d) {
            b = b || 1;
            var e = 0;
            for (; a; a = a[c]) if (a.nodeType === 1 && ++e === b) break;
            return a;
        },
        sibling: function(a, b) {
            var c = [];
            for (; a; a = a.nextSibling) a.nodeType === 1 && a !== b && c.push(a);
            return c;
        }
    });
    var V = "abbr|article|aside|audio|canvas|datalist|details|figcaption|figure|footer|header|hgroup|mark|meter|nav|output|progress|section|summary|time|video", W = / jQuery\d+="(?:\d+|null)"/g, X = /^\s+/, Y = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/ig, Z = /<([\w:]+)/, $ = /<tbody/i, _ = /<|&#?\w+;/, ba = /<(?:script|style)/i, bb = /<(?:script|object|embed|option|style)/i, bc = new RegExp("<(?:" + V + ")", "i"), bd = /checked\s*(?:[^=]|=\s*.checked.)/i, be = /\/(java|ecma)script/i, bf = /^\s*<!(?:\[CDATA\[|\-\-)/, bg = {
        option: [ 1, "<select multiple='multiple'>", "</select>" ],
        legend: [ 1, "<fieldset>", "</fieldset>" ],
        thead: [ 1, "<table>", "</table>" ],
        tr: [ 2, "<table><tbody>", "</tbody></table>" ],
        td: [ 3, "<table><tbody><tr>", "</tr></tbody></table>" ],
        col: [ 2, "<table><tbody></tbody><colgroup>", "</colgroup></table>" ],
        area: [ 1, "<map>", "</map>" ],
        _default: [ 0, "", "" ]
    }, bh = U(c);
    bg.optgroup = bg.option, bg.tbody = bg.tfoot = bg.colgroup = bg.caption = bg.thead, bg.th = bg.td, f.support.htmlSerialize || (bg._default = [ 1, "div<div>", "</div>" ]), f.fn.extend({
        text: function(a) {
            return f.isFunction(a) ? this.each(function(b) {
                var c = f(this);
                c.text(a.call(this, b, c.text()));
            }) : typeof a != "object" && a !== b ? this.empty().append((this[0] && this[0].ownerDocument || c).createTextNode(a)) : f.text(this);
        },
        wrapAll: function(a) {
            if (f.isFunction(a)) return this.each(function(b) {
                f(this).wrapAll(a.call(this, b));
            });
            if (this[0]) {
                var b = f(a, this[0].ownerDocument).eq(0).clone(!0);
                this[0].parentNode && b.insertBefore(this[0]), b.map(function() {
                    var a = this;
                    while (a.firstChild && a.firstChild.nodeType === 1) a = a.firstChild;
                    return a;
                }).append(this);
            }
            return this;
        },
        wrapInner: function(a) {
            return f.isFunction(a) ? this.each(function(b) {
                f(this).wrapInner(a.call(this, b));
            }) : this.each(function() {
                var b = f(this), c = b.contents();
                c.length ? c.wrapAll(a) : b.append(a);
            });
        },
        wrap: function(a) {
            var b = f.isFunction(a);
            return this.each(function(c) {
                f(this).wrapAll(b ? a.call(this, c) : a);
            });
        },
        unwrap: function() {
            return this.parent().each(function() {
                f.nodeName(this, "body") || f(this).replaceWith(this.childNodes);
            }).end();
        },
        append: function() {
            return this.domManip(arguments, !0, function(a) {
                this.nodeType === 1 && this.appendChild(a);
            });
        },
        prepend: function() {
            return this.domManip(arguments, !0, function(a) {
                this.nodeType === 1 && this.insertBefore(a, this.firstChild);
            });
        },
        before: function() {
            if (this[0] && this[0].parentNode) return this.domManip(arguments, !1, function(a) {
                this.parentNode.insertBefore(a, this);
            });
            if (arguments.length) {
                var a = f.clean(arguments);
                return a.push.apply(a, this.toArray()), this.pushStack(a, "before", arguments);
            }
        },
        after: function() {
            if (this[0] && this[0].parentNode) return this.domManip(arguments, !1, function(a) {
                this.parentNode.insertBefore(a, this.nextSibling);
            });
            if (arguments.length) {
                var a = this.pushStack(this, "after", arguments);
                return a.push.apply(a, f.clean(arguments)), a;
            }
        },
        remove: function(a, b) {
            for (var c = 0, d; (d = this[c]) != null; c++) if (!a || f.filter(a, [ d ]).length) !b && d.nodeType === 1 && (f.cleanData(d.getElementsByTagName("*")), f.cleanData([ d ])), d.parentNode && d.parentNode.removeChild(d);
            return this;
        },
        empty: function() {
            for (var a = 0, b; (b = this[a]) != null; a++) {
                b.nodeType === 1 && f.cleanData(b.getElementsByTagName("*"));
                while (b.firstChild) b.removeChild(b.firstChild);
            }
            return this;
        },
        clone: function(a, b) {
            return a = a == null ? !1 : a, b = b == null ? a : b, this.map(function() {
                return f.clone(this, a, b);
            });
        },
        html: function(a) {
            if (a === b) return this[0] && this[0].nodeType === 1 ? this[0].innerHTML.replace(W, "") : null;
            if (typeof a == "string" && !ba.test(a) && (f.support.leadingWhitespace || !X.test(a)) && !bg[(Z.exec(a) || [ "", "" ])[1].toLowerCase()]) {
                a = a.replace(Y, "<$1></$2>");
                try {
                    for (var c = 0, d = this.length; c < d; c++) this[c].nodeType === 1 && (f.cleanData(this[c].getElementsByTagName("*")), this[c].innerHTML = a);
                } catch (e) {
                    this.empty().append(a);
                }
            } else f.isFunction(a) ? this.each(function(b) {
                var c = f(this);
                c.html(a.call(this, b, c.html()));
            }) : this.empty().append(a);
            return this;
        },
        replaceWith: function(a) {
            return this[0] && this[0].parentNode ? f.isFunction(a) ? this.each(function(b) {
                var c = f(this), d = c.html();
                c.replaceWith(a.call(this, b, d));
            }) : (typeof a != "string" && (a = f(a).detach()), this.each(function() {
                var b = this.nextSibling, c = this.parentNode;
                f(this).remove(), b ? f(b).before(a) : f(c).append(a);
            })) : this.length ? this.pushStack(f(f.isFunction(a) ? a() : a), "replaceWith", a) : this;
        },
        detach: function(a) {
            return this.remove(a, !0);
        },
        domManip: function(a, c, d) {
            var e, g, h, i, j = a[0], k = [];
            if (!f.support.checkClone && arguments.length === 3 && typeof j == "string" && bd.test(j)) return this.each(function() {
                f(this).domManip(a, c, d, !0);
            });
            if (f.isFunction(j)) return this.each(function(e) {
                var g = f(this);
                a[0] = j.call(this, e, c ? g.html() : b), g.domManip(a, c, d);
            });
            if (this[0]) {
                i = j && j.parentNode, f.support.parentNode && i && i.nodeType === 11 && i.childNodes.length === this.length ? e = {
                    fragment: i
                } : e = f.buildFragment(a, this, k), h = e.fragment, h.childNodes.length === 1 ? g = h = h.firstChild : g = h.firstChild;
                if (g) {
                    c = c && f.nodeName(g, "tr");
                    for (var l = 0, m = this.length, n = m - 1; l < m; l++) d.call(c ? bi(this[l], g) : this[l], e.cacheable || m > 1 && l < n ? f.clone(h, !0, !0) : h);
                }
                k.length && f.each(k, bp);
            }
            return this;
        }
    }), f.buildFragment = function(a, b, d) {
        var e, g, h, i, j = a[0];
        return b && b[0] && (i = b[0].ownerDocument || b[0]), i.createDocumentFragment || (i = c), a.length === 1 && typeof j == "string" && j.length < 512 && i === c && j.charAt(0) === "<" && !bb.test(j) && (f.support.checkClone || !bd.test(j)) && (f.support.html5Clone || !bc.test(j)) && (g = !0, h = f.fragments[j], h && h !== 1 && (e = h)), e || (e = i.createDocumentFragment(), f.clean(a, i, e, d)), g && (f.fragments[j] = h ? e : 1), {
            fragment: e,
            cacheable: g
        };
    }, f.fragments = {}, f.each({
        appendTo: "append",
        prependTo: "prepend",
        insertBefore: "before",
        insertAfter: "after",
        replaceAll: "replaceWith"
    }, function(a, b) {
        f.fn[a] = function(c) {
            var d = [], e = f(c), g = this.length === 1 && this[0].parentNode;
            if (g && g.nodeType === 11 && g.childNodes.length === 1 && e.length === 1) return e[b](this[0]), this;
            for (var h = 0, i = e.length; h < i; h++) {
                var j = (h > 0 ? this.clone(!0) : this).get();
                f(e[h])[b](j), d = d.concat(j);
            }
            return this.pushStack(d, a, e.selector);
        };
    }), f.extend({
        clone: function(a, b, c) {
            var d, e, g, h = f.support.html5Clone || !bc.test("<" + a.nodeName) ? a.cloneNode(!0) : bo(a);
            if ((!f.support.noCloneEvent || !f.support.noCloneChecked) && (a.nodeType === 1 || a.nodeType === 11) && !f.isXMLDoc(a)) {
                bk(a, h), d = bl(a), e = bl(h);
                for (g = 0; d[g]; ++g) e[g] && bk(d[g], e[g]);
            }
            if (b) {
                bj(a, h);
                if (c) {
                    d = bl(a), e = bl(h);
                    for (g = 0; d[g]; ++g) bj(d[g], e[g]);
                }
            }
            return d = e = null, h;
        },
        clean: function(a, b, d, e) {
            var g;
            b = b || c, typeof b.createElement == "undefined" && (b = b.ownerDocument || b[0] && b[0].ownerDocument || c);
            var h = [], i;
            for (var j = 0, k; (k = a[j]) != null; j++) {
                typeof k == "number" && (k += "");
                if (!k) continue;
                if (typeof k == "string") if (!_.test(k)) k = b.createTextNode(k); else {
                    k = k.replace(Y, "<$1></$2>");
                    var l = (Z.exec(k) || [ "", "" ])[1].toLowerCase(), m = bg[l] || bg._default, n = m[0], o = b.createElement("div");
                    b === c ? bh.appendChild(o) : U(b).appendChild(o), o.innerHTML = m[1] + k + m[2];
                    while (n--) o = o.lastChild;
                    if (!f.support.tbody) {
                        var p = $.test(k), q = l === "table" && !p ? o.firstChild && o.firstChild.childNodes : m[1] === "<table>" && !p ? o.childNodes : [];
                        for (i = q.length - 1; i >= 0; --i) f.nodeName(q[i], "tbody") && !q[i].childNodes.length && q[i].parentNode.removeChild(q[i]);
                    }
                    !f.support.leadingWhitespace && X.test(k) && o.insertBefore(b.createTextNode(X.exec(k)[0]), o.firstChild), k = o.childNodes;
                }
                var r;
                if (!f.support.appendChecked) if (k[0] && typeof (r = k.length) == "number") for (i = 0; i < r; i++) bn(k[i]); else bn(k);
                k.nodeType ? h.push(k) : h = f.merge(h, k);
            }
            if (d) {
                g = function(a) {
                    return !a.type || be.test(a.type);
                };
                for (j = 0; h[j]; j++) if (e && f.nodeName(h[j], "script") && (!h[j].type || h[j].type.toLowerCase() === "text/javascript")) e.push(h[j].parentNode ? h[j].parentNode.removeChild(h[j]) : h[j]); else {
                    if (h[j].nodeType === 1) {
                        var s = f.grep(h[j].getElementsByTagName("script"), g);
                        h.splice.apply(h, [ j + 1, 0 ].concat(s));
                    }
                    d.appendChild(h[j]);
                }
            }
            return h;
        },
        cleanData: function(a) {
            var b, c, d = f.cache, e = f.event.special, g = f.support.deleteExpando;
            for (var h = 0, i; (i = a[h]) != null; h++) {
                if (i.nodeName && f.noData[i.nodeName.toLowerCase()]) continue;
                c = i[f.expando];
                if (c) {
                    b = d[c];
                    if (b && b.events) {
                        for (var j in b.events) e[j] ? f.event.remove(i, j) : f.removeEvent(i, j, b.handle);
                        b.handle && (b.handle.elem = null);
                    }
                    g ? delete i[f.expando] : i.removeAttribute && i.removeAttribute(f.expando), delete d[c];
                }
            }
        }
    });
    var bq = /alpha\([^)]*\)/i, br = /opacity=([^)]*)/, bs = /([A-Z]|^ms)/g, bt = /^-?\d+(?:px)?$/i, bu = /^-?\d/, bv = /^([\-+])=([\-+.\de]+)/, bw = {
        position: "absolute",
        visibility: "hidden",
        display: "block"
    }, bx = [ "Left", "Right" ], by = [ "Top", "Bottom" ], bz, bA, bB;
    f.fn.css = function(a, c) {
        return arguments.length === 2 && c === b ? this : f.access(this, a, c, !0, function(a, c, d) {
            return d !== b ? f.style(a, c, d) : f.css(a, c);
        });
    }, f.extend({
        cssHooks: {
            opacity: {
                get: function(a, b) {
                    if (b) {
                        var c = bz(a, "opacity", "opacity");
                        return c === "" ? "1" : c;
                    }
                    return a.style.opacity;
                }
            }
        },
        cssNumber: {
            fillOpacity: !0,
            fontWeight: !0,
            lineHeight: !0,
            opacity: !0,
            orphans: !0,
            widows: !0,
            zIndex: !0,
            zoom: !0
        },
        cssProps: {
            "float": f.support.cssFloat ? "cssFloat" : "styleFloat"
        },
        style: function(a, c, d, e) {
            if (!a || a.nodeType === 3 || a.nodeType === 8 || !a.style) return;
            var g, h, i = f.camelCase(c), j = a.style, k = f.cssHooks[i];
            c = f.cssProps[i] || i;
            if (d === b) return k && "get" in k && (g = k.get(a, !1, e)) !== b ? g : j[c];
            h = typeof d, h === "string" && (g = bv.exec(d)) && (d = +(g[1] + 1) * +g[2] + parseFloat(f.css(a, c)), h = "number");
            if (d == null || h === "number" && isNaN(d)) return;
            h === "number" && !f.cssNumber[i] && (d += "px");
            if (!k || !("set" in k) || (d = k.set(a, d)) !== b) try {
                j[c] = d;
            } catch (l) {}
        },
        css: function(a, c, d) {
            var e, g;
            c = f.camelCase(c), g = f.cssHooks[c], c = f.cssProps[c] || c, c === "cssFloat" && (c = "float");
            if (g && "get" in g && (e = g.get(a, !0, d)) !== b) return e;
            if (bz) return bz(a, c);
        },
        swap: function(a, b, c) {
            var d = {};
            for (var e in b) d[e] = a.style[e], a.style[e] = b[e];
            c.call(a);
            for (e in b) a.style[e] = d[e];
        }
    }), f.curCSS = f.css, f.each([ "height", "width" ], function(a, b) {
        f.cssHooks[b] = {
            get: function(a, c, d) {
                var e;
                if (c) return a.offsetWidth !== 0 ? bC(a, b, d) : (f.swap(a, bw, function() {
                    e = bC(a, b, d);
                }), e);
            },
            set: function(a, b) {
                if (!bt.test(b)) return b;
                b = parseFloat(b);
                if (b >= 0) return b + "px";
            }
        };
    }), f.support.opacity || (f.cssHooks.opacity = {
        get: function(a, b) {
            return br.test((b && a.currentStyle ? a.currentStyle.filter : a.style.filter) || "") ? parseFloat(RegExp.$1) / 100 + "" : b ? "1" : "";
        },
        set: function(a, b) {
            var c = a.style, d = a.currentStyle, e = f.isNumeric(b) ? "alpha(opacity=" + b * 100 + ")" : "", g = d && d.filter || c.filter || "";
            c.zoom = 1;
            if (b >= 1 && f.trim(g.replace(bq, "")) === "") {
                c.removeAttribute("filter");
                if (d && !d.filter) return;
            }
            c.filter = bq.test(g) ? g.replace(bq, e) : g + " " + e;
        }
    }), f(function() {
        f.support.reliableMarginRight || (f.cssHooks.marginRight = {
            get: function(a, b) {
                var c;
                return f.swap(a, {
                    display: "inline-block"
                }, function() {
                    b ? c = bz(a, "margin-right", "marginRight") : c = a.style.marginRight;
                }), c;
            }
        });
    }), c.defaultView && c.defaultView.getComputedStyle && (bA = function(a, b) {
        var c, d, e;
        return b = b.replace(bs, "-$1").toLowerCase(), (d = a.ownerDocument.defaultView) && (e = d.getComputedStyle(a, null)) && (c = e.getPropertyValue(b), c === "" && !f.contains(a.ownerDocument.documentElement, a) && (c = f.style(a, b))), c;
    }), c.documentElement.currentStyle && (bB = function(a, b) {
        var c, d, e, f = a.currentStyle && a.currentStyle[b], g = a.style;
        return f === null && g && (e = g[b]) && (f = e), !bt.test(f) && bu.test(f) && (c = g.left, d = a.runtimeStyle && a.runtimeStyle.left, d && (a.runtimeStyle.left = a.currentStyle.left), g.left = b === "fontSize" ? "1em" : f || 0, f = g.pixelLeft + "px", g.left = c, d && (a.runtimeStyle.left = d)), f === "" ? "auto" : f;
    }), bz = bA || bB, f.expr && f.expr.filters && (f.expr.filters.hidden = function(a) {
        var b = a.offsetWidth, c = a.offsetHeight;
        return b === 0 && c === 0 || !f.support.reliableHiddenOffsets && (a.style && a.style.display || f.css(a, "display")) === "none";
    }, f.expr.filters.visible = function(a) {
        return !f.expr.filters.hidden(a);
    });
    var bD = /%20/g, bE = /\[\]$/, bF = /\r?\n/g, bG = /#.*$/, bH = /^(.*?):[ \t]*([^\r\n]*)\r?$/mg, bI = /^(?:color|date|datetime|datetime-local|email|hidden|month|number|password|range|search|tel|text|time|url|week)$/i, bJ = /^(?:about|app|app\-storage|.+\-extension|file|res|widget):$/, bK = /^(?:GET|HEAD)$/, bL = /^\/\//, bM = /\?/, bN = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, bO = /^(?:select|textarea)/i, bP = /\s+/, bQ = /([?&])_=[^&]*/, bR = /^([\w\+\.\-]+:)(?:\/\/([^\/?#:]*)(?::(\d+))?)?/, bS = f.fn.load, bT = {}, bU = {}, bV, bW, bX = [ "*/" ] + [ "*" ];
    try {
        bV = e.href;
    } catch (bY) {
        bV = c.createElement("a"), bV.href = "", bV = bV.href;
    }
    bW = bR.exec(bV.toLowerCase()) || [], f.fn.extend({
        load: function(a, c, d) {
            if (typeof a != "string" && bS) return bS.apply(this, arguments);
            if (!this.length) return this;
            var e = a.indexOf(" ");
            if (e >= 0) {
                var g = a.slice(e, a.length);
                a = a.slice(0, e);
            }
            var h = "GET";
            c && (f.isFunction(c) ? (d = c, c = b) : typeof c == "object" && (c = f.param(c, f.ajaxSettings.traditional), h = "POST"));
            var i = this;
            return f.ajax({
                url: a,
                type: h,
                dataType: "html",
                data: c,
                complete: function(a, b, c) {
                    c = a.responseText, a.isResolved() && (a.done(function(a) {
                        c = a;
                    }), i.html(g ? f("<div>").append(c.replace(bN, "")).find(g) : c)), d && i.each(d, [ c, b, a ]);
                }
            }), this;
        },
        serialize: function() {
            return f.param(this.serializeArray());
        },
        serializeArray: function() {
            return this.map(function() {
                return this.elements ? f.makeArray(this.elements) : this;
            }).filter(function() {
                return this.name && !this.disabled && (this.checked || bO.test(this.nodeName) || bI.test(this.type));
            }).map(function(a, b) {
                var c = f(this).val();
                return c == null ? null : f.isArray(c) ? f.map(c, function(a, c) {
                    return {
                        name: b.name,
                        value: a.replace(bF, "\r\n")
                    };
                }) : {
                    name: b.name,
                    value: c.replace(bF, "\r\n")
                };
            }).get();
        }
    }), f.each("ajaxStart ajaxStop ajaxComplete ajaxError ajaxSuccess ajaxSend".split(" "), function(a, b) {
        f.fn[b] = function(a) {
            return this.on(b, a);
        };
    }), f.each([ "get", "post" ], function(a, c) {
        f[c] = function(a, d, e, g) {
            return f.isFunction(d) && (g = g || e, e = d, d = b), f.ajax({
                type: c,
                url: a,
                data: d,
                success: e,
                dataType: g
            });
        };
    }), f.extend({
        getScript: function(a, c) {
            return f.get(a, b, c, "script");
        },
        getJSON: function(a, b, c) {
            return f.get(a, b, c, "json");
        },
        ajaxSetup: function(a, b) {
            return b ? b_(a, f.ajaxSettings) : (b = a, a = f.ajaxSettings), b_(a, b), a;
        },
        ajaxSettings: {
            url: bV,
            isLocal: bJ.test(bW[1]),
            global: !0,
            type: "GET",
            contentType: "application/x-www-form-urlencoded",
            processData: !0,
            async: !0,
            accepts: {
                xml: "application/xml, text/xml",
                html: "text/html",
                text: "text/plain",
                json: "application/json, text/javascript",
                "*": bX
            },
            contents: {
                xml: /xml/,
                html: /html/,
                json: /json/
            },
            responseFields: {
                xml: "responseXML",
                text: "responseText"
            },
            converters: {
                "* text": a.String,
                "text html": !0,
                "text json": f.parseJSON,
                "text xml": f.parseXML
            },
            flatOptions: {
                context: !0,
                url: !0
            }
        },
        ajaxPrefilter: bZ(bT),
        ajaxTransport: bZ(bU),
        ajax: function(a, c) {
            function w(a, c, l, m) {
                if (s === 2) return;
                s = 2, q && clearTimeout(q), p = b, n = m || "", v.readyState = a > 0 ? 4 : 0;
                var o, r, u, w = c, x = l ? cb(d, v, l) : b, y, z;
                if (a >= 200 && a < 300 || a === 304) {
                    if (d.ifModified) {
                        if (y = v.getResponseHeader("Last-Modified")) f.lastModified[k] = y;
                        if (z = v.getResponseHeader("Etag")) f.etag[k] = z;
                    }
                    if (a === 304) w = "notmodified", o = !0; else try {
                        r = cc(d, x), w = "success", o = !0;
                    } catch (A) {
                        w = "parsererror", u = A;
                    }
                } else {
                    u = w;
                    if (!w || a) w = "error", a < 0 && (a = 0);
                }
                v.status = a, v.statusText = "" + (c || w), o ? h.resolveWith(e, [ r, w, v ]) : h.rejectWith(e, [ v, w, u ]), v.statusCode(j), j = b, t && g.trigger("ajax" + (o ? "Success" : "Error"), [ v, d, o ? r : u ]), i.fireWith(e, [ v, w ]), t && (g.trigger("ajaxComplete", [ v, d ]), --f.active || f.event.trigger("ajaxStop"));
            }
            typeof a == "object" && (c = a, a = b), c = c || {};
            var d = f.ajaxSetup({}, c), e = d.context || d, g = e !== d && (e.nodeType || e instanceof f) ? f(e) : f.event, h = f.Deferred(), i = f.Callbacks("once memory"), j = d.statusCode || {}, k, l = {}, m = {}, n, o, p, q, r, s = 0, t, u, v = {
                readyState: 0,
                setRequestHeader: function(a, b) {
                    if (!s) {
                        var c = a.toLowerCase();
                        a = m[c] = m[c] || a, l[a] = b;
                    }
                    return this;
                },
                getAllResponseHeaders: function() {
                    return s === 2 ? n : null;
                },
                getResponseHeader: function(a) {
                    var c;
                    if (s === 2) {
                        if (!o) {
                            o = {};
                            while (c = bH.exec(n)) o[c[1].toLowerCase()] = c[2];
                        }
                        c = o[a.toLowerCase()];
                    }
                    return c === b ? null : c;
                },
                overrideMimeType: function(a) {
                    return s || (d.mimeType = a), this;
                },
                abort: function(a) {
                    return a = a || "abort", p && p.abort(a), w(0, a), this;
                }
            };
            h.promise(v), v.success = v.done, v.error = v.fail, v.complete = i.add, v.statusCode = function(a) {
                if (a) {
                    var b;
                    if (s < 2) for (b in a) j[b] = [ j[b], a[b] ]; else b = a[v.status], v.then(b, b);
                }
                return this;
            }, d.url = ((a || d.url) + "").replace(bG, "").replace(bL, bW[1] + "//"), d.dataTypes = f.trim(d.dataType || "*").toLowerCase().split(bP), d.crossDomain == null && (r = bR.exec(d.url.toLowerCase()), d.crossDomain = !(!r || r[1] == bW[1] && r[2] == bW[2] && (r[3] || (r[1] === "http:" ? 80 : 443)) == (bW[3] || (bW[1] === "http:" ? 80 : 443)))), d.data && d.processData && typeof d.data != "string" && (d.data = f.param(d.data, d.traditional)), b$(bT, d, c, v);
            if (s === 2) return !1;
            t = d.global, d.type = d.type.toUpperCase(), d.hasContent = !bK.test(d.type), t && f.active++ === 0 && f.event.trigger("ajaxStart");
            if (!d.hasContent) {
                d.data && (d.url += (bM.test(d.url) ? "&" : "?") + d.data, delete d.data), k = d.url;
                if (d.cache === !1) {
                    var x = f.now(), y = d.url.replace(bQ, "$1_=" + x);
                    d.url = y + (y === d.url ? (bM.test(d.url) ? "&" : "?") + "_=" + x : "");
                }
            }
            (d.data && d.hasContent && d.contentType !== !1 || c.contentType) && v.setRequestHeader("Content-Type", d.contentType), d.ifModified && (k = k || d.url, f.lastModified[k] && v.setRequestHeader("If-Modified-Since", f.lastModified[k]), f.etag[k] && v.setRequestHeader("If-None-Match", f.etag[k])), v.setRequestHeader("Accept", d.dataTypes[0] && d.accepts[d.dataTypes[0]] ? d.accepts[d.dataTypes[0]] + (d.dataTypes[0] !== "*" ? ", " + bX + "; q=0.01" : "") : d.accepts["*"]);
            for (u in d.headers) v.setRequestHeader(u, d.headers[u]);
            if (!d.beforeSend || d.beforeSend.call(e, v, d) !== !1 && s !== 2) {
                for (u in {
                    success: 1,
                    error: 1,
                    complete: 1
                }) v[u](d[u]);
                p = b$(bU, d, c, v);
                if (!p) w(-1, "No Transport"); else {
                    v.readyState = 1, t && g.trigger("ajaxSend", [ v, d ]), d.async && d.timeout > 0 && (q = setTimeout(function() {
                        v.abort("timeout");
                    }, d.timeout));
                    try {
                        s = 1, p.send(l, w);
                    } catch (z) {
                        if (s < 2) w(-1, z); else throw z;
                    }
                }
                return v;
            }
            return v.abort(), !1;
        },
        param: function(a, c) {
            var d = [], e = function(a, b) {
                b = f.isFunction(b) ? b() : b, d[d.length] = encodeURIComponent(a) + "=" + encodeURIComponent(b);
            };
            c === b && (c = f.ajaxSettings.traditional);
            if (f.isArray(a) || a.jquery && !f.isPlainObject(a)) f.each(a, function() {
                e(this.name, this.value);
            }); else for (var g in a) ca(g, a[g], c, e);
            return d.join("&").replace(bD, "+");
        }
    }), f.extend({
        active: 0,
        lastModified: {},
        etag: {}
    });
    var cd = f.now(), ce = /(\=)\?(&|$)|\?\?/i;
    f.ajaxSetup({
        jsonp: "callback",
        jsonpCallback: function() {
            return f.expando + "_" + cd++;
        }
    }), f.ajaxPrefilter("json jsonp", function(b, c, d) {
        var e = b.contentType === "application/x-www-form-urlencoded" && typeof b.data == "string";
        if (b.dataTypes[0] === "jsonp" || b.jsonp !== !1 && (ce.test(b.url) || e && ce.test(b.data))) {
            var g, h = b.jsonpCallback = f.isFunction(b.jsonpCallback) ? b.jsonpCallback() : b.jsonpCallback, i = a[h], j = b.url, k = b.data, l = "$1" + h + "$2";
            return b.jsonp !== !1 && (j = j.replace(ce, l), b.url === j && (e && (k = k.replace(ce, l)), b.data === k && (j += (/\?/.test(j) ? "&" : "?") + b.jsonp + "=" + h))), b.url = j, b.data = k, a[h] = function(a) {
                g = [ a ];
            }, d.always(function() {
                a[h] = i, g && f.isFunction(i) && a[h](g[0]);
            }), b.converters["script json"] = function() {
                return g || f.error(h + " was not called"), g[0];
            }, b.dataTypes[0] = "json", "script";
        }
    }), f.ajaxSetup({
        accepts: {
            script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
        },
        contents: {
            script: /javascript|ecmascript/
        },
        converters: {
            "text script": function(a) {
                return f.globalEval(a), a;
            }
        }
    }), f.ajaxPrefilter("script", function(a) {
        a.cache === b && (a.cache = !1), a.crossDomain && (a.type = "GET", a.global = !1);
    }), f.ajaxTransport("script", function(a) {
        if (a.crossDomain) {
            var d, e = c.head || c.getElementsByTagName("head")[0] || c.documentElement;
            return {
                send: function(f, g) {
                    d = c.createElement("script"), d.async = "async", a.scriptCharset && (d.charset = a.scriptCharset), d.src = a.url, d.onload = d.onreadystatechange = function(a, c) {
                        if (c || !d.readyState || /loaded|complete/.test(d.readyState)) d.onload = d.onreadystatechange = null, e && d.parentNode && e.removeChild(d), d = b, c || g(200, "success");
                    }, e.insertBefore(d, e.firstChild);
                },
                abort: function() {
                    d && d.onload(0, 1);
                }
            };
        }
    });
    var cf = a.ActiveXObject ? function() {
        for (var a in ch) ch[a](0, 1);
    } : !1, cg = 0, ch;
    f.ajaxSettings.xhr = a.ActiveXObject ? function() {
        return !this.isLocal && ci() || cj();
    } : ci, function(a) {
        f.extend(f.support, {
            ajax: !!a,
            cors: !!a && "withCredentials" in a
        });
    }(f.ajaxSettings.xhr()), f.support.ajax && f.ajaxTransport(function(c) {
        if (!c.crossDomain || f.support.cors) {
            var d;
            return {
                send: function(e, g) {
                    var h = c.xhr(), i, j;
                    c.username ? h.open(c.type, c.url, c.async, c.username, c.password) : h.open(c.type, c.url, c.async);
                    if (c.xhrFields) for (j in c.xhrFields) h[j] = c.xhrFields[j];
                    c.mimeType && h.overrideMimeType && h.overrideMimeType(c.mimeType), !c.crossDomain && !e["X-Requested-With"] && (e["X-Requested-With"] = "XMLHttpRequest");
                    try {
                        for (j in e) h.setRequestHeader(j, e[j]);
                    } catch (k) {}
                    h.send(c.hasContent && c.data || null), d = function(a, e) {
                        var j, k, l, m, n;
                        try {
                            if (d && (e || h.readyState === 4)) {
                                d = b, i && (h.onreadystatechange = f.noop, cf && delete ch[i]);
                                if (e) h.readyState !== 4 && h.abort(); else {
                                    j = h.status, l = h.getAllResponseHeaders(), m = {}, n = h.responseXML, n && n.documentElement && (m.xml = n), m.text = h.responseText;
                                    try {
                                        k = h.statusText;
                                    } catch (o) {
                                        k = "";
                                    }
                                    !j && c.isLocal && !c.crossDomain ? j = m.text ? 200 : 404 : j === 1223 && (j = 204);
                                }
                            }
                        } catch (p) {
                            e || g(-1, p);
                        }
                        m && g(j, k, m, l);
                    }, !c.async || h.readyState === 4 ? d() : (i = ++cg, cf && (ch || (ch = {}, f(a).unload(cf)), ch[i] = d), h.onreadystatechange = d);
                },
                abort: function() {
                    d && d(0, 1);
                }
            };
        }
    });
    var ck = {}, cl, cm, cn = /^(?:toggle|show|hide)$/, co = /^([+\-]=)?([\d+.\-]+)([a-z%]*)$/i, cp, cq = [ [ "height", "marginTop", "marginBottom", "paddingTop", "paddingBottom" ], [ "width", "marginLeft", "marginRight", "paddingLeft", "paddingRight" ], [ "opacity" ] ], cr;
    f.fn.extend({
        show: function(a, b, c) {
            var d, e;
            if (a || a === 0) return this.animate(cu("show", 3), a, b, c);
            for (var g = 0, h = this.length; g < h; g++) d = this[g], d.style && (e = d.style.display, !f._data(d, "olddisplay") && e === "none" && (e = d.style.display = ""), e === "" && f.css(d, "display") === "none" && f._data(d, "olddisplay", cv(d.nodeName)));
            for (g = 0; g < h; g++) {
                d = this[g];
                if (d.style) {
                    e = d.style.display;
                    if (e === "" || e === "none") d.style.display = f._data(d, "olddisplay") || "";
                }
            }
            return this;
        },
        hide: function(a, b, c) {
            if (a || a === 0) return this.animate(cu("hide", 3), a, b, c);
            var d, e, g = 0, h = this.length;
            for (; g < h; g++) d = this[g], d.style && (e = f.css(d, "display"), e !== "none" && !f._data(d, "olddisplay") && f._data(d, "olddisplay", e));
            for (g = 0; g < h; g++) this[g].style && (this[g].style.display = "none");
            return this;
        },
        _toggle: f.fn.toggle,
        toggle: function(a, b, c) {
            var d = typeof a == "boolean";
            return f.isFunction(a) && f.isFunction(b) ? this._toggle.apply(this, arguments) : a == null || d ? this.each(function() {
                var b = d ? a : f(this).is(":hidden");
                f(this)[b ? "show" : "hide"]();
            }) : this.animate(cu("toggle", 3), a, b, c), this;
        },
        fadeTo: function(a, b, c, d) {
            return this.filter(":hidden").css("opacity", 0).show().end().animate({
                opacity: b
            }, a, c, d);
        },
        animate: function(a, b, c, d) {
            function g() {
                e.queue === !1 && f._mark(this);
                var b = f.extend({}, e), c = this.nodeType === 1, d = c && f(this).is(":hidden"), g, h, i, j, k, l, m, n, o;
                b.animatedProperties = {};
                for (i in a) {
                    g = f.camelCase(i), i !== g && (a[g] = a[i], delete a[i]), h = a[g], f.isArray(h) ? (b.animatedProperties[g] = h[1], h = a[g] = h[0]) : b.animatedProperties[g] = b.specialEasing && b.specialEasing[g] || b.easing || "swing";
                    if (h === "hide" && d || h === "show" && !d) return b.complete.call(this);
                    c && (g === "height" || g === "width") && (b.overflow = [ this.style.overflow, this.style.overflowX, this.style.overflowY ], f.css(this, "display") === "inline" && f.css(this, "float") === "none" && (!f.support.inlineBlockNeedsLayout || cv(this.nodeName) === "inline" ? this.style.display = "inline-block" : this.style.zoom = 1));
                }
                b.overflow != null && (this.style.overflow = "hidden");
                for (i in a) j = new f.fx(this, b, i), h = a[i], cn.test(h) ? (o = f._data(this, "toggle" + i) || (h === "toggle" ? d ? "show" : "hide" : 0), o ? (f._data(this, "toggle" + i, o === "show" ? "hide" : "show"), j[o]()) : j[h]()) : (k = co.exec(h), l = j.cur(), k ? (m = parseFloat(k[2]), n = k[3] || (f.cssNumber[i] ? "" : "px"), n !== "px" && (f.style(this, i, (m || 1) + n), l = (m || 1) / j.cur() * l, f.style(this, i, l + n)), k[1] && (m = (k[1] === "-=" ? -1 : 1) * m + l), j.custom(l, m, n)) : j.custom(l, h, ""));
                return !0;
            }
            var e = f.speed(b, c, d);
            return f.isEmptyObject(a) ? this.each(e.complete, [ !1 ]) : (a = f.extend({}, a), e.queue === !1 ? this.each(g) : this.queue(e.queue, g));
        },
        stop: function(a, c, d) {
            return typeof a != "string" && (d = c, c = a, a = b), c && a !== !1 && this.queue(a || "fx", []), this.each(function() {
                function h(a, b, c) {
                    var e = b[c];
                    f.removeData(a, c, !0), e.stop(d);
                }
                var b, c = !1, e = f.timers, g = f._data(this);
                d || f._unmark(!0, this);
                if (a == null) for (b in g) g[b] && g[b].stop && b.indexOf(".run") === b.length - 4 && h(this, g, b); else g[b = a + ".run"] && g[b].stop && h(this, g, b);
                for (b = e.length; b--; ) e[b].elem === this && (a == null || e[b].queue === a) && (d ? e[b](!0) : e[b].saveState(), c = !0, e.splice(b, 1));
                (!d || !c) && f.dequeue(this, a);
            });
        }
    }), f.each({
        slideDown: cu("show", 1),
        slideUp: cu("hide", 1),
        slideToggle: cu("toggle", 1),
        fadeIn: {
            opacity: "show"
        },
        fadeOut: {
            opacity: "hide"
        },
        fadeToggle: {
            opacity: "toggle"
        }
    }, function(a, b) {
        f.fn[a] = function(a, c, d) {
            return this.animate(b, a, c, d);
        };
    }), f.extend({
        speed: function(a, b, c) {
            var d = a && typeof a == "object" ? f.extend({}, a) : {
                complete: c || !c && b || f.isFunction(a) && a,
                duration: a,
                easing: c && b || b && !f.isFunction(b) && b
            };
            d.duration = f.fx.off ? 0 : typeof d.duration == "number" ? d.duration : d.duration in f.fx.speeds ? f.fx.speeds[d.duration] : f.fx.speeds._default;
            if (d.queue == null || d.queue === !0) d.queue = "fx";
            return d.old = d.complete, d.complete = function(a) {
                f.isFunction(d.old) && d.old.call(this), d.queue ? f.dequeue(this, d.queue) : a !== !1 && f._unmark(this);
            }, d;
        },
        easing: {
            linear: function(a, b, c, d) {
                return c + d * a;
            },
            swing: function(a, b, c, d) {
                return (-Math.cos(a * Math.PI) / 2 + .5) * d + c;
            }
        },
        timers: [],
        fx: function(a, b, c) {
            this.options = b, this.elem = a, this.prop = c, b.orig = b.orig || {};
        }
    }), f.fx.prototype = {
        update: function() {
            this.options.step && this.options.step.call(this.elem, this.now, this), (f.fx.step[this.prop] || f.fx.step._default)(this);
        },
        cur: function() {
            if (this.elem[this.prop] == null || !!this.elem.style && this.elem.style[this.prop] != null) {
                var a, b = f.css(this.elem, this.prop);
                return isNaN(a = parseFloat(b)) ? !b || b === "auto" ? 0 : b : a;
            }
            return this.elem[this.prop];
        },
        custom: function(a, c, d) {
            function h(a) {
                return e.step(a);
            }
            var e = this, g = f.fx;
            this.startTime = cr || cs(), this.end = c, this.now = this.start = a, this.pos = this.state = 0, this.unit = d || this.unit || (f.cssNumber[this.prop] ? "" : "px"), h.queue = this.options.queue, h.elem = this.elem, h.saveState = function() {
                e.options.hide && f._data(e.elem, "fxshow" + e.prop) === b && f._data(e.elem, "fxshow" + e.prop, e.start);
            }, h() && f.timers.push(h) && !cp && (cp = setInterval(g.tick, g.interval));
        },
        show: function() {
            var a = f._data(this.elem, "fxshow" + this.prop);
            this.options.orig[this.prop] = a || f.style(this.elem, this.prop), this.options.show = !0, a !== b ? this.custom(this.cur(), a) : this.custom(this.prop === "width" || this.prop === "height" ? 1 : 0, this.cur()), f(this.elem).show();
        },
        hide: function() {
            this.options.orig[this.prop] = f._data(this.elem, "fxshow" + this.prop) || f.style(this.elem, this.prop), this.options.hide = !0, this.custom(this.cur(), 0);
        },
        step: function(a) {
            var b, c, d, e = cr || cs(), g = !0, h = this.elem, i = this.options;
            if (a || e >= i.duration + this.startTime) {
                this.now = this.end, this.pos = this.state = 1, this.update(), i.animatedProperties[this.prop] = !0;
                for (b in i.animatedProperties) i.animatedProperties[b] !== !0 && (g = !1);
                if (g) {
                    i.overflow != null && !f.support.shrinkWrapBlocks && f.each([ "", "X", "Y" ], function(a, b) {
                        h.style["overflow" + b] = i.overflow[a];
                    }), i.hide && f(h).hide();
                    if (i.hide || i.show) for (b in i.animatedProperties) f.style(h, b, i.orig[b]), f.removeData(h, "fxshow" + b, !0), f.removeData(h, "toggle" + b, !0);
                    d = i.complete, d && (i.complete = !1, d.call(h));
                }
                return !1;
            }
            return i.duration == Infinity ? this.now = e : (c = e - this.startTime, this.state = c / i.duration, this.pos = f.easing[i.animatedProperties[this.prop]](this.state, c, 0, 1, i.duration), this.now = this.start + (this.end - this.start) * this.pos), this.update(), !0;
        }
    }, f.extend(f.fx, {
        tick: function() {
            var a, b = f.timers, c = 0;
            for (; c < b.length; c++) a = b[c], !a() && b[c] === a && b.splice(c--, 1);
            b.length || f.fx.stop();
        },
        interval: 13,
        stop: function() {
            clearInterval(cp), cp = null;
        },
        speeds: {
            slow: 600,
            fast: 200,
            _default: 400
        },
        step: {
            opacity: function(a) {
                f.style(a.elem, "opacity", a.now);
            },
            _default: function(a) {
                a.elem.style && a.elem.style[a.prop] != null ? a.elem.style[a.prop] = a.now + a.unit : a.elem[a.prop] = a.now;
            }
        }
    }), f.each([ "width", "height" ], function(a, b) {
        f.fx.step[b] = function(a) {
            f.style(a.elem, b, Math.max(0, a.now) + a.unit);
        };
    }), f.expr && f.expr.filters && (f.expr.filters.animated = function(a) {
        return f.grep(f.timers, function(b) {
            return a === b.elem;
        }).length;
    });
    var cw = /^t(?:able|d|h)$/i, cx = /^(?:body|html)$/i;
    "getBoundingClientRect" in c.documentElement ? f.fn.offset = function(a) {
        var b = this[0], c;
        if (a) return this.each(function(b) {
            f.offset.setOffset(this, a, b);
        });
        if (!b || !b.ownerDocument) return null;
        if (b === b.ownerDocument.body) return f.offset.bodyOffset(b);
        try {
            c = b.getBoundingClientRect();
        } catch (d) {}
        var e = b.ownerDocument, g = e.documentElement;
        if (!c || !f.contains(g, b)) return c ? {
            top: c.top,
            left: c.left
        } : {
            top: 0,
            left: 0
        };
        var h = e.body, i = cy(e), j = g.clientTop || h.clientTop || 0, k = g.clientLeft || h.clientLeft || 0, l = i.pageYOffset || f.support.boxModel && g.scrollTop || h.scrollTop, m = i.pageXOffset || f.support.boxModel && g.scrollLeft || h.scrollLeft, n = c.top + l - j, o = c.left + m - k;
        return {
            top: n,
            left: o
        };
    } : f.fn.offset = function(a) {
        var b = this[0];
        if (a) return this.each(function(b) {
            f.offset.setOffset(this, a, b);
        });
        if (!b || !b.ownerDocument) return null;
        if (b === b.ownerDocument.body) return f.offset.bodyOffset(b);
        var c, d = b.offsetParent, e = b, g = b.ownerDocument, h = g.documentElement, i = g.body, j = g.defaultView, k = j ? j.getComputedStyle(b, null) : b.currentStyle, l = b.offsetTop, m = b.offsetLeft;
        while ((b = b.parentNode) && b !== i && b !== h) {
            if (f.support.fixedPosition && k.position === "fixed") break;
            c = j ? j.getComputedStyle(b, null) : b.currentStyle, l -= b.scrollTop, m -= b.scrollLeft, b === d && (l += b.offsetTop, m += b.offsetLeft, f.support.doesNotAddBorder && (!f.support.doesAddBorderForTableAndCells || !cw.test(b.nodeName)) && (l += parseFloat(c.borderTopWidth) || 0, m += parseFloat(c.borderLeftWidth) || 0), e = d, d = b.offsetParent), f.support.subtractsBorderForOverflowNotVisible && c.overflow !== "visible" && (l += parseFloat(c.borderTopWidth) || 0, m += parseFloat(c.borderLeftWidth) || 0), k = c;
        }
        if (k.position === "relative" || k.position === "static") l += i.offsetTop, m += i.offsetLeft;
        return f.support.fixedPosition && k.position === "fixed" && (l += Math.max(h.scrollTop, i.scrollTop), m += Math.max(h.scrollLeft, i.scrollLeft)), {
            top: l,
            left: m
        };
    }, f.offset = {
        bodyOffset: function(a) {
            var b = a.offsetTop, c = a.offsetLeft;
            return f.support.doesNotIncludeMarginInBodyOffset && (b += parseFloat(f.css(a, "marginTop")) || 0, c += parseFloat(f.css(a, "marginLeft")) || 0), {
                top: b,
                left: c
            };
        },
        setOffset: function(a, b, c) {
            var d = f.css(a, "position");
            d === "static" && (a.style.position = "relative");
            var e = f(a), g = e.offset(), h = f.css(a, "top"), i = f.css(a, "left"), j = (d === "absolute" || d === "fixed") && f.inArray("auto", [ h, i ]) > -1, k = {}, l = {}, m, n;
            j ? (l = e.position(), m = l.top, n = l.left) : (m = parseFloat(h) || 0, n = parseFloat(i) || 0), f.isFunction(b) && (b = b.call(a, c, g)), b.top != null && (k.top = b.top - g.top + m), b.left != null && (k.left = b.left - g.left + n), "using" in b ? b.using.call(a, k) : e.css(k);
        }
    }, f.fn.extend({
        position: function() {
            if (!this[0]) return null;
            var a = this[0], b = this.offsetParent(), c = this.offset(), d = cx.test(b[0].nodeName) ? {
                top: 0,
                left: 0
            } : b.offset();
            return c.top -= parseFloat(f.css(a, "marginTop")) || 0, c.left -= parseFloat(f.css(a, "marginLeft")) || 0, d.top += parseFloat(f.css(b[0], "borderTopWidth")) || 0, d.left += parseFloat(f.css(b[0], "borderLeftWidth")) || 0, {
                top: c.top - d.top,
                left: c.left - d.left
            };
        },
        offsetParent: function() {
            return this.map(function() {
                var a = this.offsetParent || c.body;
                while (a && !cx.test(a.nodeName) && f.css(a, "position") === "static") a = a.offsetParent;
                return a;
            });
        }
    }), f.each([ "Left", "Top" ], function(a, c) {
        var d = "scroll" + c;
        f.fn[d] = function(c) {
            var e, g;
            return c === b ? (e = this[0], e ? (g = cy(e), g ? "pageXOffset" in g ? g[a ? "pageYOffset" : "pageXOffset"] : f.support.boxModel && g.document.documentElement[d] || g.document.body[d] : e[d]) : null) : this.each(function() {
                g = cy(this), g ? g.scrollTo(a ? f(g).scrollLeft() : c, a ? c : f(g).scrollTop()) : this[d] = c;
            });
        };
    }), f.each([ "Height", "Width" ], function(a, c) {
        var d = c.toLowerCase();
        f.fn["inner" + c] = function() {
            var a = this[0];
            return a ? a.style ? parseFloat(f.css(a, d, "padding")) : this[d]() : null;
        }, f.fn["outer" + c] = function(a) {
            var b = this[0];
            return b ? b.style ? parseFloat(f.css(b, d, a ? "margin" : "border")) : this[d]() : null;
        }, f.fn[d] = function(a) {
            var e = this[0];
            if (!e) return a == null ? null : this;
            if (f.isFunction(a)) return this.each(function(b) {
                var c = f(this);
                c[d](a.call(this, b, c[d]()));
            });
            if (f.isWindow(e)) {
                var g = e.document.documentElement["client" + c], h = e.document.body;
                return e.document.compatMode === "CSS1Compat" && g || h && h["client" + c] || g;
            }
            if (e.nodeType === 9) return Math.max(e.documentElement["client" + c], e.body["scroll" + c], e.documentElement["scroll" + c], e.body["offset" + c], e.documentElement["offset" + c]);
            if (a === b) {
                var i = f.css(e, d), j = parseFloat(i);
                return f.isNumeric(j) ? j : i;
            }
            return this.css(d, typeof a == "string" ? a : a + "px");
        };
    }), a.jQuery = a.$ = f, typeof myGlobalRequire.define == "function" && myGlobalRequire.define.amd && myGlobalRequire.define.amd.jQuery && myGlobalRequire.define("jquery", [], function() {
        return f;
    });
}(window), myGlobalRequire.define("libs/jquery/jquery", function() {}), function() {
    function A(a, b, c) {
        if (a === b) return a !== 0 || 1 / a == 1 / b;
        if (a == null || b == null) return a === b;
        a._chain && (a = a._wrapped), b._chain && (b = b._wrapped);
        if (a.isEqual && w.isFunction(a.isEqual)) return a.isEqual(b);
        if (b.isEqual && w.isFunction(b.isEqual)) return b.isEqual(a);
        var d = i.call(a);
        if (d != i.call(b)) return !1;
        switch (d) {
          case "[object String]":
            return a == String(b);
          case "[object Number]":
            return a != +a ? b != +b : a == 0 ? 1 / a == 1 / b : a == +b;
          case "[object Date]":
          case "[object Boolean]":
            return +a == +b;
          case "[object RegExp]":
            return a.source == b.source && a.global == b.global && a.multiline == b.multiline && a.ignoreCase == b.ignoreCase;
        }
        if (typeof a != "object" || typeof b != "object") return !1;
        var e = c.length;
        while (e--) if (c[e] == a) return !0;
        c.push(a);
        var f = 0, g = !0;
        if (d == "[object Array]") {
            f = a.length, g = f == b.length;
            if (g) while (f--) if (!(g = f in a == f in b && A(a[f], b[f], c))) break;
        } else {
            if ("constructor" in a != "constructor" in b || a.constructor != b.constructor) return !1;
            for (var h in a) if (w.has(a, h)) {
                f++;
                if (!(g = w.has(b, h) && A(a[h], b[h], c))) break;
            }
            if (g) {
                for (h in b) if (w.has(b, h) && !(f--)) break;
                g = !f;
            }
        }
        return c.pop(), g;
    }
    var a = this, b = a._, c = {}, d = Array.prototype, e = Object.prototype, f = Function.prototype, g = d.slice, h = d.unshift, i = e.toString, j = e.hasOwnProperty, k = d.forEach, l = d.map, m = d.reduce, n = d.reduceRight, o = d.filter, p = d.every, q = d.some, r = d.indexOf, s = d.lastIndexOf, t = Array.isArray, u = Object.keys, v = f.bind, w = function(a) {
        return new E(a);
    };
    typeof exports != "undefined" ? (typeof module != "undefined" && module.exports && (exports = module.exports = w), exports._ = w) : a._ = w, w.VERSION = "1.3.1";
    var x = w.each = w.forEach = function(a, b, d) {
        if (a == null) return;
        if (k && a.forEach === k) a.forEach(b, d); else if (a.length === +a.length) {
            for (var e = 0, f = a.length; e < f; e++) if (e in a && b.call(d, a[e], e, a) === c) return;
        } else for (var g in a) if (w.has(a, g) && b.call(d, a[g], g, a) === c) return;
    };
    w.map = w.collect = function(a, b, c) {
        var d = [];
        return a == null ? d : l && a.map === l ? a.map(b, c) : (x(a, function(a, e, f) {
            d[d.length] = b.call(c, a, e, f);
        }), a.length === +a.length && (d.length = a.length), d);
    }, w.reduce = w.foldl = w.inject = function(a, b, c, d) {
        var e = arguments.length > 2;
        a == null && (a = []);
        if (m && a.reduce === m) return d && (b = w.bind(b, d)), e ? a.reduce(b, c) : a.reduce(b);
        x(a, function(a, f, g) {
            e ? c = b.call(d, c, a, f, g) : (c = a, e = !0);
        });
        if (!e) throw new TypeError("Reduce of empty array with no initial value");
        return c;
    }, w.reduceRight = w.foldr = function(a, b, c, d) {
        var e = arguments.length > 2;
        a == null && (a = []);
        if (n && a.reduceRight === n) return d && (b = w.bind(b, d)), e ? a.reduceRight(b, c) : a.reduceRight(b);
        var f = w.toArray(a).reverse();
        return d && !e && (b = w.bind(b, d)), e ? w.reduce(f, b, c, d) : w.reduce(f, b);
    }, w.find = w.detect = function(a, b, c) {
        var d;
        return y(a, function(a, e, f) {
            if (b.call(c, a, e, f)) return d = a, !0;
        }), d;
    }, w.filter = w.select = function(a, b, c) {
        var d = [];
        return a == null ? d : o && a.filter === o ? a.filter(b, c) : (x(a, function(a, e, f) {
            b.call(c, a, e, f) && (d[d.length] = a);
        }), d);
    }, w.reject = function(a, b, c) {
        var d = [];
        return a == null ? d : (x(a, function(a, e, f) {
            b.call(c, a, e, f) || (d[d.length] = a);
        }), d);
    }, w.every = w.all = function(a, b, d) {
        var e = !0;
        return a == null ? e : p && a.every === p ? a.every(b, d) : (x(a, function(a, f, g) {
            if (!(e = e && b.call(d, a, f, g))) return c;
        }), e);
    };
    var y = w.some = w.any = function(a, b, d) {
        b || (b = w.identity);
        var e = !1;
        return a == null ? e : q && a.some === q ? a.some(b, d) : (x(a, function(a, f, g) {
            if (e || (e = b.call(d, a, f, g))) return c;
        }), !!e);
    };
    w.include = w.contains = function(a, b) {
        var c = !1;
        return a == null ? c : r && a.indexOf === r ? a.indexOf(b) != -1 : (c = y(a, function(a) {
            return a === b;
        }), c);
    }, w.invoke = function(a, b) {
        var c = g.call(arguments, 2);
        return w.map(a, function(a) {
            return (w.isFunction(b) ? b || a : a[b]).apply(a, c);
        });
    }, w.pluck = function(a, b) {
        return w.map(a, function(a) {
            return a[b];
        });
    }, w.max = function(a, b, c) {
        if (!b && w.isArray(a)) return Math.max.apply(Math, a);
        if (!b && w.isEmpty(a)) return -Infinity;
        var d = {
            computed: -Infinity
        };
        return x(a, function(a, e, f) {
            var g = b ? b.call(c, a, e, f) : a;
            g >= d.computed && (d = {
                value: a,
                computed: g
            });
        }), d.value;
    }, w.min = function(a, b, c) {
        if (!b && w.isArray(a)) return Math.min.apply(Math, a);
        if (!b && w.isEmpty(a)) return Infinity;
        var d = {
            computed: Infinity
        };
        return x(a, function(a, e, f) {
            var g = b ? b.call(c, a, e, f) : a;
            g < d.computed && (d = {
                value: a,
                computed: g
            });
        }), d.value;
    }, w.shuffle = function(a) {
        var b = [], c;
        return x(a, function(a, d, e) {
            d == 0 ? b[0] = a : (c = Math.floor(Math.random() * (d + 1)), b[d] = b[c], b[c] = a);
        }), b;
    }, w.sortBy = function(a, b, c) {
        return w.pluck(w.map(a, function(a, d, e) {
            return {
                value: a,
                criteria: b.call(c, a, d, e)
            };
        }).sort(function(a, b) {
            var c = a.criteria, d = b.criteria;
            return c < d ? -1 : c > d ? 1 : 0;
        }), "value");
    }, w.groupBy = function(a, b) {
        var c = {}, d = w.isFunction(b) ? b : function(a) {
            return a[b];
        };
        return x(a, function(a, b) {
            var e = d(a, b);
            (c[e] || (c[e] = [])).push(a);
        }), c;
    }, w.sortedIndex = function(a, b, c) {
        c || (c = w.identity);
        var d = 0, e = a.length;
        while (d < e) {
            var f = d + e >> 1;
            c(a[f]) < c(b) ? d = f + 1 : e = f;
        }
        return d;
    }, w.toArray = function(a) {
        return a ? a.toArray ? a.toArray() : w.isArray(a) ? g.call(a) : w.isArguments(a) ? g.call(a) : w.values(a) : [];
    }, w.size = function(a) {
        return w.toArray(a).length;
    }, w.first = w.head = function(a, b, c) {
        return b != null && !c ? g.call(a, 0, b) : a[0];
    }, w.initial = function(a, b, c) {
        return g.call(a, 0, a.length - (b == null || c ? 1 : b));
    }, w.last = function(a, b, c) {
        return b != null && !c ? g.call(a, Math.max(a.length - b, 0)) : a[a.length - 1];
    }, w.rest = w.tail = function(a, b, c) {
        return g.call(a, b == null || c ? 1 : b);
    }, w.compact = function(a) {
        return w.filter(a, function(a) {
            return !!a;
        });
    }, w.flatten = function(a, b) {
        return w.reduce(a, function(a, c) {
            return w.isArray(c) ? a.concat(b ? c : w.flatten(c)) : (a[a.length] = c, a);
        }, []);
    }, w.without = function(a) {
        return w.difference(a, g.call(arguments, 1));
    }, w.uniq = w.unique = function(a, b, c) {
        var d = c ? w.map(a, c) : a, e = [];
        return w.reduce(d, function(c, d, f) {
            if (0 == f || (b === !0 ? w.last(c) != d : !w.include(c, d))) c[c.length] = d, e[e.length] = a[f];
            return c;
        }, []), e;
    }, w.union = function() {
        return w.uniq(w.flatten(arguments, !0));
    }, w.intersection = w.intersect = function(a) {
        var b = g.call(arguments, 1);
        return w.filter(w.uniq(a), function(a) {
            return w.every(b, function(b) {
                return w.indexOf(b, a) >= 0;
            });
        });
    }, w.difference = function(a) {
        var b = w.flatten(g.call(arguments, 1));
        return w.filter(a, function(a) {
            return !w.include(b, a);
        });
    }, w.zip = function() {
        var a = g.call(arguments), b = w.max(w.pluck(a, "length")), c = new Array(b);
        for (var d = 0; d < b; d++) c[d] = w.pluck(a, "" + d);
        return c;
    }, w.indexOf = function(a, b, c) {
        if (a == null) return -1;
        var d, e;
        if (c) return d = w.sortedIndex(a, b), a[d] === b ? d : -1;
        if (r && a.indexOf === r) return a.indexOf(b);
        for (d = 0, e = a.length; d < e; d++) if (d in a && a[d] === b) return d;
        return -1;
    }, w.lastIndexOf = function(a, b) {
        if (a == null) return -1;
        if (s && a.lastIndexOf === s) return a.lastIndexOf(b);
        var c = a.length;
        while (c--) if (c in a && a[c] === b) return c;
        return -1;
    }, w.range = function(a, b, c) {
        arguments.length <= 1 && (b = a || 0, a = 0), c = arguments[2] || 1;
        var d = Math.max(Math.ceil((b - a) / c), 0), e = 0, f = new Array(d);
        while (e < d) f[e++] = a, a += c;
        return f;
    };
    var z = function() {};
    w.bind = function(b, c) {
        var d, e;
        if (b.bind === v && v) return v.apply(b, g.call(arguments, 1));
        if (!w.isFunction(b)) throw new TypeError;
        return e = g.call(arguments, 2), d = function() {
            if (this instanceof d) {
                z.prototype = b.prototype;
                var a = new z, f = b.apply(a, e.concat(g.call(arguments)));
                return Object(f) === f ? f : a;
            }
            return b.apply(c, e.concat(g.call(arguments)));
        };
    }, w.bindAll = function(a) {
        var b = g.call(arguments, 1);
        return b.length == 0 && (b = w.functions(a)), x(b, function(b) {
            a[b] = w.bind(a[b], a);
        }), a;
    }, w.memoize = function(a, b) {
        var c = {};
        return b || (b = w.identity), function() {
            var d = b.apply(this, arguments);
            return w.has(c, d) ? c[d] : c[d] = a.apply(this, arguments);
        };
    }, w.delay = function(a, b) {
        var c = g.call(arguments, 2);
        return setTimeout(function() {
            return a.apply(a, c);
        }, b);
    }, w.defer = function(a) {
        return w.delay.apply(w, [ a, 1 ].concat(g.call(arguments, 1)));
    }, w.throttle = function(a, b) {
        var c, d, e, f, g, h = w.debounce(function() {
            g = f = !1;
        }, b);
        return function() {
            c = this, d = arguments;
            var i = function() {
                e = null, g && a.apply(c, d), h();
            };
            e || (e = setTimeout(i, b)), f ? g = !0 : a.apply(c, d), h(), f = !0;
        };
    }, w.debounce = function(a, b) {
        var c;
        return function() {
            var d = this, e = arguments, f = function() {
                c = null, a.apply(d, e);
            };
            clearTimeout(c), c = setTimeout(f, b);
        };
    }, w.once = function(a) {
        var b = !1, c;
        return function() {
            return b ? c : (b = !0, c = a.apply(this, arguments));
        };
    }, w.wrap = function(a, b) {
        return function() {
            var c = [ a ].concat(g.call(arguments, 0));
            return b.apply(this, c);
        };
    }, w.compose = function() {
        var a = arguments;
        return function() {
            var b = arguments;
            for (var c = a.length - 1; c >= 0; c--) b = [ a[c].apply(this, b) ];
            return b[0];
        };
    }, w.after = function(a, b) {
        return a <= 0 ? b() : function() {
            if (--a < 1) return b.apply(this, arguments);
        };
    }, w.keys = u || function(a) {
        if (a !== Object(a)) throw new TypeError("Invalid object");
        var b = [];
        for (var c in a) w.has(a, c) && (b[b.length] = c);
        return b;
    }, w.values = function(a) {
        return w.map(a, w.identity);
    }, w.functions = w.methods = function(a) {
        var b = [];
        for (var c in a) w.isFunction(a[c]) && b.push(c);
        return b.sort();
    }, w.extend = function(a) {
        return x(g.call(arguments, 1), function(b) {
            for (var c in b) a[c] = b[c];
        }), a;
    }, w.defaults = function(a) {
        return x(g.call(arguments, 1), function(b) {
            for (var c in b) a[c] == null && (a[c] = b[c]);
        }), a;
    }, w.clone = function(a) {
        return w.isObject(a) ? w.isArray(a) ? a.slice() : w.extend({}, a) : a;
    }, w.tap = function(a, b) {
        return b(a), a;
    }, w.isEqual = function(a, b) {
        return A(a, b, []);
    }, w.isEmpty = function(a) {
        if (w.isArray(a) || w.isString(a)) return a.length === 0;
        for (var b in a) if (w.has(a, b)) return !1;
        return !0;
    }, w.isElement = function(a) {
        return !!a && a.nodeType == 1;
    }, w.isArray = t || function(a) {
        return i.call(a) == "[object Array]";
    }, w.isObject = function(a) {
        return a === Object(a);
    }, w.isArguments = function(a) {
        return i.call(a) == "[object Arguments]";
    }, w.isArguments(arguments) || (w.isArguments = function(a) {
        return !!a && !!w.has(a, "callee");
    }), w.isFunction = function(a) {
        return i.call(a) == "[object Function]";
    }, w.isString = function(a) {
        return i.call(a) == "[object String]";
    }, w.isNumber = function(a) {
        return i.call(a) == "[object Number]";
    }, w.isNaN = function(a) {
        return a !== a;
    }, w.isBoolean = function(a) {
        return a === !0 || a === !1 || i.call(a) == "[object Boolean]";
    }, w.isDate = function(a) {
        return i.call(a) == "[object Date]";
    }, w.isRegExp = function(a) {
        return i.call(a) == "[object RegExp]";
    }, w.isNull = function(a) {
        return a === null;
    }, w.isUndefined = function(a) {
        return a === void 0;
    }, w.has = function(a, b) {
        return j.call(a, b);
    }, w.noConflict = function() {
        return a._ = b, this;
    }, w.identity = function(a) {
        return a;
    }, w.times = function(a, b, c) {
        for (var d = 0; d < a; d++) b.call(c, d);
    }, w.escape = function(a) {
        return ("" + a).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#x27;").replace(/\//g, "&#x2F;");
    }, w.mixin = function(a) {
        x(w.functions(a), function(b) {
            G(b, w[b] = a[b]);
        });
    };
    var B = 0;
    w.uniqueId = function(a) {
        var b = B++;
        return a ? a + b : b;
    }, w.templateSettings = {
        evaluate: /<%([\s\S]+?)%>/g,
        interpolate: /<%=([\s\S]+?)%>/g,
        escape: /<%-([\s\S]+?)%>/g
    };
    var C = /.^/, D = function(a) {
        return a.replace(/\\\\/g, "\\").replace(/\\'/g, "'");
    };
    w.template = function(a, b) {
        var c = w.templateSettings, d = "var __p=[],print=function(){__p.push.apply(__p,arguments);};with(obj||{}){__p.push('" + a.replace(/\\/g, "\\\\").replace(/'/g, "\\'").replace(c.escape || C, function(a, b) {
            return "',_.escape(" + D(b) + "),'";
        }).replace(c.interpolate || C, function(a, b) {
            return "'," + D(b) + ",'";
        }).replace(c.evaluate || C, function(a, b) {
            return "');" + D(b).replace(/[\r\n\t]/g, " ") + ";__p.push('";
        }).replace(/\r/g, "\\r").replace(/\n/g, "\\n").replace(/\t/g, "\\t") + "');}return __p.join('');", e = new Function("obj", "_", d);
        return b ? e(b, w) : function(a) {
            return e.call(this, a, w);
        };
    }, w.chain = function(a) {
        return w(a).chain();
    };
    var E = function(a) {
        this._wrapped = a;
    };
    w.prototype = E.prototype;
    var F = function(a, b) {
        return b ? w(a).chain() : a;
    }, G = function(a, b) {
        E.prototype[a] = function() {
            var a = g.call(arguments);
            return h.call(a, this._wrapped), F(b.apply(w, a), this._chain);
        };
    };
    w.mixin(w), x([ "pop", "push", "reverse", "shift", "sort", "splice", "unshift" ], function(a) {
        var b = d[a];
        E.prototype[a] = function() {
            var c = this._wrapped;
            b.apply(c, arguments);
            var d = c.length;
            return (a == "shift" || a == "splice") && d === 0 && delete c[0], F(c, this._chain);
        };
    }), x([ "concat", "join", "slice" ], function(a) {
        var b = d[a];
        E.prototype[a] = function() {
            return F(b.apply(this._wrapped, arguments), this._chain);
        };
    }), E.prototype.chain = function() {
        return this._chain = !0, this;
    }, E.prototype.value = function() {
        return this._wrapped;
    };
}.call(this), myGlobalRequire.define("libs/underscore/underscore", function() {}), function() {
    var a = this, b = a.Backbone, c = Array.prototype.slice, d = Array.prototype.splice, e;
    typeof exports != "undefined" ? e = exports : e = a.Backbone = {}, e.VERSION = "0.9.1";
    var f = a._;
    !f && typeof require != "undefined" && (f = myGlobalRequire.require("underscore"));
    var g = a.jQuery || a.Zepto || a.ender;
    e.setDomLibrary = function(a) {
        g = a;
    }, e.noConflict = function() {
        return a.Backbone = b, this;
    }, e.emulateHTTP = !1, e.emulateJSON = !1, e.Events = {
        on: function(a, b, c) {
            var d;
            a = a.split(/\s+/);
            var e = this._callbacks || (this._callbacks = {});
            while (d = a.shift()) {
                var f = e[d] || (e[d] = {}), g = f.tail || (f.tail = f.next = {});
                g.callback = b, g.context = c, f.tail = g.next = {};
            }
            return this;
        },
        off: function(a, b, c) {
            var d, e, f;
            if (!a) delete this._callbacks; else if (e = this._callbacks) {
                a = a.split(/\s+/);
                while (d = a.shift()) {
                    f = e[d], delete e[d];
                    if (!b || !f) continue;
                    while ((f = f.next) && f.next) if (f.callback !== b || !!c && f.context !== c) this.on(d, f.callback, f.context); else continue;
                }
            }
            return this;
        },
        trigger: function(a) {
            var b, d, e, f, g, h, i;
            if (!(e = this._callbacks)) return this;
            h = e.all, (a = a.split(/\s+/)).push(null);
            while (b = a.shift()) {
                h && a.push({
                    next: h.next,
                    tail: h.tail,
                    event: b
                });
                if (!(d = e[b])) continue;
                a.push({
                    next: d.next,
                    tail: d.tail
                });
            }
            i = c.call(arguments, 1);
            while (d = a.pop()) {
                f = d.tail, g = d.event ? [ d.event ].concat(i) : i;
                while ((d = d.next) !== f) d.callback.apply(d.context || this, g);
            }
            return this;
        }
    }, e.Events.bind = e.Events.on, e.Events.unbind = e.Events.off, e.Model = function(a, b) {
        var c;
        a || (a = {}), b && b.parse && (a = this.parse(a));
        if (c = u(this, "defaults")) a = f.extend({}, c, a);
        b && b.collection && (this.collection = b.collection), this.attributes = {}, this._escapedAttributes = {}, this.cid = f.uniqueId("c");
        if (!this.set(a, {
            silent: !0
        })) throw new Error("Can't create an invalid model");
        delete this._changed, this._previousAttributes = f.clone(this.attributes), this.initialize.apply(this, arguments);
    }, f.extend(e.Model.prototype, e.Events, {
        idAttribute: "id",
        initialize: function() {},
        toJSON: function() {
            return f.clone(this.attributes);
        },
        get: function(a) {
            return this.attributes[a];
        },
        escape: function(a) {
            var b;
            if (b = this._escapedAttributes[a]) return b;
            var c = this.attributes[a];
            return this._escapedAttributes[a] = f.escape(c == null ? "" : "" + c);
        },
        has: function(a) {
            return this.attributes[a] != null;
        },
        set: function(a, b, c) {
            var d, g, h;
            f.isObject(a) || a == null ? (d = a, c = b) : (d = {}, d[a] = b), c || (c = {});
            if (!d) return this;
            d instanceof e.Model && (d = d.attributes);
            if (c.unset) for (g in d) d[g] = void 0;
            if (!this._validate(d, c)) return !1;
            this.idAttribute in d && (this.id = d[this.idAttribute]);
            var i = this.attributes, j = this._escapedAttributes, k = this._previousAttributes || {}, l = this._setting;
            this._changed || (this._changed = {}), this._setting = !0;
            for (g in d) {
                h = d[g], f.isEqual(i[g], h) || delete j[g], c.unset ? delete i[g] : i[g] = h, this._changing && !f.isEqual(this._changed[g], h) && (this.trigger("change:" + g, this, h, c), this._moreChanges = !0), delete this._changed[g];
                if (!f.isEqual(k[g], h) || f.has(i, g) != f.has(k, g)) this._changed[g] = h;
            }
            return l || (!c.silent && this.hasChanged() && this.change(c), this._setting = !1), this;
        },
        unset: function(a, b) {
            return (b || (b = {})).unset = !0, this.set(a, null, b);
        },
        clear: function(a) {
            return (a || (a = {})).unset = !0, this.set(f.clone(this.attributes), a);
        },
        fetch: function(a) {
            a = a ? f.clone(a) : {};
            var b = this, c = a.success;
            return a.success = function(d, e, f) {
                if (!b.set(b.parse(d, f), a)) return !1;
                c && c(b, d);
            }, a.error = e.wrapError(a.error, b, a), (this.sync || e.sync).call(this, "read", this, a);
        },
        save: function(a, b, c) {
            var d, g;
            f.isObject(a) || a == null ? (d = a, c = b) : (d = {}, d[a] = b), c = c ? f.clone(c) : {}, c.wait && (g = f.clone(this.attributes));
            var h = f.extend({}, c, {
                silent: !0
            });
            if (d && !this.set(d, c.wait ? h : c)) return !1;
            var i = this, j = c.success;
            c.success = function(a, b, e) {
                var g = i.parse(a, e);
                c.wait && (g = f.extend(d || {}, g));
                if (!i.set(g, c)) return !1;
                j ? j(i, a) : i.trigger("sync", i, a, c);
            }, c.error = e.wrapError(c.error, i, c);
            var k = this.isNew() ? "create" : "update", l = (this.sync || e.sync).call(this, k, this, c);
            return c.wait && this.set(g, h), l;
        },
        destroy: function(a) {
            a = a ? f.clone(a) : {};
            var b = this, c = a.success, d = function() {
                b.trigger("destroy", b, b.collection, a);
            };
            if (this.isNew()) return d();
            a.success = function(e) {
                a.wait && d(), c ? c(b, e) : b.trigger("sync", b, e, a);
            }, a.error = e.wrapError(a.error, b, a);
            var g = (this.sync || e.sync).call(this, "delete", this, a);
            return a.wait || d(), g;
        },
        url: function() {
            var a = u(this.collection, "url") || u(this, "urlRoot") || v();
            return this.isNew() ? a : a + (a.charAt(a.length - 1) == "/" ? "" : "/") + encodeURIComponent(this.id);
        },
        parse: function(a, b) {
            return a;
        },
        clone: function() {
            return new this.constructor(this.attributes);
        },
        isNew: function() {
            return this.id == null;
        },
        change: function(a) {
            if (this._changing || !this.hasChanged()) return this;
            this._changing = !0, this._moreChanges = !0;
            for (var b in this._changed) this.trigger("change:" + b, this, this._changed[b], a);
            while (this._moreChanges) this._moreChanges = !1, this.trigger("change", this, a);
            return this._previousAttributes = f.clone(this.attributes), delete this._changed, this._changing = !1, this;
        },
        hasChanged: function(a) {
            return arguments.length ? this._changed && f.has(this._changed, a) : !f.isEmpty(this._changed);
        },
        changedAttributes: function(a) {
            if (!a) return this.hasChanged() ? f.clone(this._changed) : !1;
            var b, c = !1, d = this._previousAttributes;
            for (var e in a) {
                if (f.isEqual(d[e], b = a[e])) continue;
                (c || (c = {}))[e] = b;
            }
            return c;
        },
        previous: function(a) {
            return !arguments.length || !this._previousAttributes ? null : this._previousAttributes[a];
        },
        previousAttributes: function() {
            return f.clone(this._previousAttributes);
        },
        isValid: function() {
            return !this.validate(this.attributes);
        },
        _validate: function(a, b) {
            if (b.silent || !this.validate) return !0;
            a = f.extend({}, this.attributes, a);
            var c = this.validate(a, b);
            return c ? (b && b.error ? b.error(this, c, b) : this.trigger("error", this, c, b), !1) : !0;
        }
    }), e.Collection = function(a, b) {
        b || (b = {}), b.comparator && (this.comparator = b.comparator), this._reset(), this.initialize.apply(this, arguments), a && this.reset(a, {
            silent: !0,
            parse: b.parse
        });
    }, f.extend(e.Collection.prototype, e.Events, {
        model: e.Model,
        initialize: function() {},
        toJSON: function() {
            return this.map(function(a) {
                return a.toJSON();
            });
        },
        add: function(a, b) {
            var c, e, g, h, i, j, k = {}, l = {};
            b || (b = {}), a = f.isArray(a) ? a.slice() : [ a ];
            for (c = 0, g = a.length; c < g; c++) {
                if (!(h = a[c] = this._prepareModel(a[c], b))) throw new Error("Can't add an invalid model to a collection");
                if (k[i = h.cid] || this._byCid[i] || (j = h.id) != null && (l[j] || this._byId[j])) throw new Error("Can't add the same model to a collection twice");
                k[i] = l[j] = h;
            }
            for (c = 0; c < g; c++) (h = a[c]).on("all", this._onModelEvent, this), this._byCid[h.cid] = h, h.id != null && (this._byId[h.id] = h);
            this.length += g, e = b.at != null ? b.at : this.models.length, d.apply(this.models, [ e, 0 ].concat(a)), this.comparator && this.sort({
                silent: !0
            });
            if (b.silent) return this;
            for (c = 0, g = this.models.length; c < g; c++) {
                if (!k[(h = this.models[c]).cid]) continue;
                b.index = c, h.trigger("add", h, this, b);
            }
            return this;
        },
        remove: function(a, b) {
            var c, d, e, g;
            b || (b = {}), a = f.isArray(a) ? a.slice() : [ a ];
            for (c = 0, d = a.length; c < d; c++) {
                g = this.getByCid(a[c]) || this.get(a[c]);
                if (!g) continue;
                delete this._byId[g.id], delete this._byCid[g.cid], e = this.indexOf(g), this.models.splice(e, 1), this.length--, b.silent || (b.index = e, g.trigger("remove", g, this, b)), this._removeReference(g);
            }
            return this;
        },
        get: function(a) {
            return a == null ? null : this._byId[a.id != null ? a.id : a];
        },
        getByCid: function(a) {
            return a && this._byCid[a.cid || a];
        },
        at: function(a) {
            return this.models[a];
        },
        sort: function(a) {
            a || (a = {});
            if (!this.comparator) throw new Error("Cannot sort a set without a comparator");
            var b = f.bind(this.comparator, this);
            return this.comparator.length == 1 ? this.models = this.sortBy(b) : this.models.sort(b), a.silent || this.trigger("reset", this, a), this;
        },
        pluck: function(a) {
            return f.map(this.models, function(b) {
                return b.get(a);
            });
        },
        reset: function(a, b) {
            a || (a = []), b || (b = {});
            for (var c = 0, d = this.models.length; c < d; c++) this._removeReference(this.models[c]);
            return this._reset(), this.add(a, {
                silent: !0,
                parse: b.parse
            }), b.silent || this.trigger("reset", this, b), this;
        },
        fetch: function(a) {
            a = a ? f.clone(a) : {}, a.parse === undefined && (a.parse = !0);
            var b = this, c = a.success;
            return a.success = function(d, e, f) {
                b[a.add ? "add" : "reset"](b.parse(d, f), a), c && c(b, d);
            }, a.error = e.wrapError(a.error, b, a), (this.sync || e.sync).call(this, "read", this, a);
        },
        create: function(a, b) {
            var c = this;
            b = b ? f.clone(b) : {}, a = this._prepareModel(a, b);
            if (!a) return !1;
            b.wait || c.add(a, b);
            var d = b.success;
            return b.success = function(e, f, g) {
                b.wait && c.add(e, b), d ? d(e, f) : e.trigger("sync", a, f, b);
            }, a.save(null, b), a;
        },
        parse: function(a, b) {
            return a;
        },
        chain: function() {
            return f(this.models).chain();
        },
        _reset: function(a) {
            this.length = 0, this.models = [], this._byId = {}, this._byCid = {};
        },
        _prepareModel: function(a, b) {
            if (a instanceof e.Model) a.collection || (a.collection = this); else {
                var c = a;
                b.collection = this, a = new this.model(c, b), a._validate(a.attributes, b) || (a = !1);
            }
            return a;
        },
        _removeReference: function(a) {
            this == a.collection && delete a.collection, a.off("all", this._onModelEvent, this);
        },
        _onModelEvent: function(a, b, c, d) {
            if (a != "add" && a != "remove" || c == this) a == "destroy" && this.remove(b, d), b && a === "change:" + b.idAttribute && (delete this._byId[b.previous(b.idAttribute)], this._byId[b.id] = b), this.trigger.apply(this, arguments); else return;
        }
    });
    var h = [ "forEach", "each", "map", "reduce", "reduceRight", "find", "detect", "filter", "select", "reject", "every", "all", "some", "any", "include", "contains", "invoke", "max", "min", "sortBy", "sortedIndex", "toArray", "size", "first", "initial", "rest", "last", "without", "indexOf", "shuffle", "lastIndexOf", "isEmpty", "groupBy" ];
    f.each(h, function(a) {
        e.Collection.prototype[a] = function() {
            return f[a].apply(f, [ this.models ].concat(f.toArray(arguments)));
        };
    }), e.Router = function(a) {
        a || (a = {}), a.routes && (this.routes = a.routes), this._bindRoutes(), this.initialize.apply(this, arguments);
    };
    var i = /:\w+/g, j = /\*\w+/g, k = /[-[\]{}()+?.,\\^$|#\s]/g;
    f.extend(e.Router.prototype, e.Events, {
        initialize: function() {},
        route: function(a, b, c) {
            return e.history || (e.history = new e.History), f.isRegExp(a) || (a = this._routeToRegExp(a)), c || (c = this[b]), e.history.route(a, f.bind(function(d) {
                var f = this._extractParameters(a, d);
                c && c.apply(this, f), this.trigger.apply(this, [ "route:" + b ].concat(f)), e.history.trigger("route", this, b, f);
            }, this)), this;
        },
        navigate: function(a, b) {
            e.history.navigate(a, b);
        },
        _bindRoutes: function() {
            if (!this.routes) return;
            var a = [];
            for (var b in this.routes) a.unshift([ b, this.routes[b] ]);
            for (var c = 0, d = a.length; c < d; c++) this.route(a[c][0], a[c][1], this[a[c][1]]);
        },
        _routeToRegExp: function(a) {
            return a = a.replace(k, "\\$&").replace(i, "([^/]+)").replace(j, "(.*?)"), new RegExp("^" + a + "$");
        },
        _extractParameters: function(a, b) {
            return a.exec(b).slice(1);
        }
    }), e.History = function() {
        this.handlers = [], f.bindAll(this, "checkUrl");
    };
    var l = /^[#\/]/, m = /msie [\w.]+/, n = !1;
    f.extend(e.History.prototype, e.Events, {
        interval: 50,
        getFragment: function(a, b) {
            if (a == null) if (this._hasPushState || b) {
                a = window.location.pathname;
                var c = window.location.search;
                c && (a += c);
            } else a = window.location.hash;
            return a = decodeURIComponent(a), a.indexOf(this.options.root) || (a = a.substr(this.options.root.length)), a.replace(l, "");
        },
        start: function(a) {
            if (n) throw new Error("Backbone.history has already been started");
            this.options = f.extend({}, {
                root: "/"
            }, this.options, a), this._wantsHashChange = this.options.hashChange !== !1, this._wantsPushState = !!this.options.pushState, this._hasPushState = !!(this.options.pushState && window.history && window.history.pushState);
            var b = this.getFragment(), c = document.documentMode, d = m.exec(navigator.userAgent.toLowerCase()) && (!c || c <= 7);
            d && (this.iframe = g('<iframe src="javascript:0" tabindex="-1" />').hide().appendTo("body")[0].contentWindow, this.navigate(b)), this._hasPushState ? g(window).bind("popstate", this.checkUrl) : this._wantsHashChange && "onhashchange" in window && !d ? g(window).bind("hashchange", this.checkUrl) : this._wantsHashChange && (this._checkUrlInterval = setInterval(this.checkUrl, this.interval)), this.fragment = b, n = !0;
            var e = window.location, h = e.pathname == this.options.root;
            if (this._wantsHashChange && this._wantsPushState && !this._hasPushState && !h) return this.fragment = this.getFragment(null, !0), window.location.replace(this.options.root + "#" + this.fragment), !0;
            this._wantsPushState && this._hasPushState && h && e.hash && (this.fragment = e.hash.replace(l, ""), window.history.replaceState({}, document.title, e.protocol + "//" + e.host + this.options.root + this.fragment));
            if (!this.options.silent) return this.loadUrl();
        },
        stop: function() {
            g(window).unbind("popstate", this.checkUrl).unbind("hashchange", this.checkUrl), clearInterval(this._checkUrlInterval), n = !1;
        },
        route: function(a, b) {
            this.handlers.unshift({
                route: a,
                callback: b
            });
        },
        checkUrl: function(a) {
            var b = this.getFragment();
            b == this.fragment && this.iframe && (b = this.getFragment(this.iframe.location.hash));
            if (b == this.fragment || b == decodeURIComponent(this.fragment)) return !1;
            this.iframe && this.navigate(b), this.loadUrl() || this.loadUrl(window.location.hash);
        },
        loadUrl: function(a) {
            var b = this.fragment = this.getFragment(a), c = f.any(this.handlers, function(a) {
                if (a.route.test(b)) return a.callback(b), !0;
            });
            return c;
        },
        navigate: function(a, b) {
            if (!n) return !1;
            if (!b || b === !0) b = {
                trigger: b
            };
            var c = (a || "").replace(l, "");
            if (this.fragment == c || this.fragment == decodeURIComponent(c)) return;
            this._hasPushState ? (c.indexOf(this.options.root) != 0 && (c = this.options.root + c), this.fragment = c, window.history[b.replace ? "replaceState" : "pushState"]({}, document.title, c)) : this._wantsHashChange ? (this.fragment = c, this._updateHash(window.location, c, b.replace), this.iframe && c != this.getFragment(this.iframe.location.hash) && (b.replace || this.iframe.document.open().close(), this._updateHash(this.iframe.location, c, b.replace))) : window.location.assign(this.options.root + a), b.trigger && this.loadUrl(a);
        },
        _updateHash: function(a, b, c) {
            c ? a.replace(a.toString().replace(/(javascript:|#).*$/, "") + "#" + b) : a.hash = b;
        }
    }), e.View = function(a) {
        this.cid = f.uniqueId("view"), this._configure(a || {}), this._ensureElement(), this.initialize.apply(this, arguments), this.delegateEvents();
    };
    var o = /^(\S+)\s*(.*)$/, p = [ "model", "collection", "el", "id", "attributes", "className", "tagName" ];
    f.extend(e.View.prototype, e.Events, {
        tagName: "div",
        $: function(a) {
            return this.$el.find(a);
        },
        initialize: function() {},
        render: function() {
            return this;
        },
        remove: function() {
            return this.$el.remove(), this;
        },
        make: function(a, b, c) {
            var d = document.createElement(a);
            return b && g(d).attr(b), c && g(d).html(c), d;
        },
        setElement: function(a, b) {
            return this.$el = g(a), this.el = this.$el[0], b !== !1 && this.delegateEvents(), this;
        },
        delegateEvents: function(a) {
            if (!a && !(a = u(this, "events"))) return;
            this.undelegateEvents();
            for (var b in a) {
                var c = a[b];
                f.isFunction(c) || (c = this[a[b]]);
                if (!c) throw new Error('Event "' + a[b] + '" does not exist');
                var d = b.match(o), e = d[1], g = d[2];
                c = f.bind(c, this), e += ".delegateEvents" + this.cid, g === "" ? this.$el.bind(e, c) : this.$el.delegate(g, e, c);
            }
        },
        undelegateEvents: function() {
            this.$el.unbind(".delegateEvents" + this.cid);
        },
        _configure: function(a) {
            this.options && (a = f.extend({}, this.options, a));
            for (var b = 0, c = p.length; b < c; b++) {
                var d = p[b];
                a[d] && (this[d] = a[d]);
            }
            this.options = a;
        },
        _ensureElement: function() {
            if (!this.el) {
                var a = u(this, "attributes") || {};
                this.id && (a.id = this.id), this.className && (a["class"] = this.className), this.setElement(this.make(this.tagName, a), !1);
            } else this.setElement(this.el, !1);
        }
    });
    var q = function(a, b) {
        var c = t(this, a, b);
        return c.extend = this.extend, c;
    };
    e.Model.extend = e.Collection.extend = e.Router.extend = e.View.extend = q;
    var r = {
        create: "POST",
        update: "PUT",
        "delete": "DELETE",
        read: "GET"
    };
    e.sync = function(a, b, c) {
        var d = r[a], h = {
            type: d,
            dataType: "json"
        };
        return c.url || (h.url = u(b, "url") || v()), !c.data && b && (a == "create" || a == "update") && (h.contentType = "application/json", h.data = JSON.stringify(b.toJSON())), e.emulateJSON && (h.contentType = "application/x-www-form-urlencoded", h.data = h.data ? {
            model: h.data
        } : {}), e.emulateHTTP && (d === "PUT" || d === "DELETE") && (e.emulateJSON && (h.data._method = d), h.type = "POST", h.beforeSend = function(a) {
            a.setRequestHeader("X-HTTP-Method-Override", d);
        }), h.type !== "GET" && !e.emulateJSON && (h.processData = !1), g.ajax(f.extend(h, c));
    }, e.wrapError = function(a, b, c) {
        return function(d, e) {
            e = d === b ? e : d, a ? a(b, e, c) : b.trigger("error", b, e, c);
        };
    };
    var s = function() {}, t = function(a, b, c) {
        var d;
        return b && b.hasOwnProperty("constructor") ? d = b.constructor : d = function() {
            a.apply(this, arguments);
        }, f.extend(d, a), s.prototype = a.prototype, d.prototype = new s, b && f.extend(d.prototype, b), c && f.extend(d, c), d.prototype.constructor = d, d.__super__ = a.prototype, d;
    }, u = function(a, b) {
        return !a || !a[b] ? null : f.isFunction(a[b]) ? a[b]() : a[b];
    }, v = function() {
        throw new Error('A "url" property or function must be specified');
    };
}.call(this), myGlobalRequire.define("libs/backbone/backbone", function() {}), myGlobalRequire.define("loader", [ "order!libs/jquery/jquery", "order!libs/underscore/underscore", "order!libs/backbone/backbone" ], function() {
    return {
        Backbone: Backbone.noConflict(),
        _: _.noConflict(),
        $: jQuery.noConflict()
    };
}), myGlobalRequire.define("jQuery", [ "loader" ], function(a) {
    return a.$;
}), myGlobalRequire.define("Underscore", [ "loader" ], function(a) {
    return a._;
}), myGlobalRequire.define("Backbone", [ "loader" ], function(a) {
    return a.Backbone;
}), myGlobalRequire.define("models/option", [ "Underscore", "Backbone" ], function(a, b) {
    var c = b.Model.extend({
        defaults: {
            default_data: "ok"
        },
        initialize: function() {},
        getOption: function(a) {
            var b = document.phantomjs_option;
            a(b);
        }
    });
    return new c;
}), function() {
    var a = [ "Msxml2.XMLHTTP", "Microsoft.XMLHTTP", "Msxml2.XMLHTTP.4.0" ], b = /^\s*<\?xml(\s)+version=[\'\"](\d)*.(\d)*[\'\"](\s)*\?>/im, c = /<body[^>]*>\s*([\s\S]+)\s*<\/body>/im, d = typeof location != "undefined" && location.href, e = d && location.protocol && location.protocol.replace(/\:/, ""), f = d && location.hostname, g = d && (location.port || undefined), h = [];
    myGlobalRequire.define("text", [], function() {
        var i, j, k;
        return typeof window != "undefined" && window.navigator && window.document ? j = function(a, b) {
            var c = i.createXhr();
            c.open("GET", a, !0), c.onreadystatechange = function(a) {
                c.readyState === 4 && b(c.responseText);
            }, c.send(null);
        } : typeof process != "undefined" && process.versions && !!process.versions.node ? (k = require.nodeRequire("fs"), j = function(a, b) {
            b(k.readFileSync(a, "utf8"));
        }) : typeof Packages != "undefined" && (j = function(a, b) {
            var c = "utf-8", d = new java.io.File(a), e = java.lang.System.getProperty("line.separator"), f = new java.io.BufferedReader(new java.io.InputStreamReader(new java.io.FileInputStream(d), c)), g, h, i = "";
            try {
                g = new java.lang.StringBuffer, h = f.readLine(), h && h.length() && h.charAt(0) === 65279 && (h = h.substring(1)), g.append(h);
                while ((h = f.readLine()) !== null) g.append(e), g.append(h);
                i = String(g.toString());
            } finally {
                f.close();
            }
            b(i);
        }), i = {
            version: "1.0.2",
            strip: function(a) {
                if (a) {
                    a = a.replace(b, "");
                    var d = a.match(c);
                    d && (a = d[1]);
                } else a = "";
                return a;
            },
            jsEscape: function(a) {
                return a.replace(/(['\\])/g, "\\$1").replace(/[\f]/g, "\\f").replace(/[\b]/g, "\\b").replace(/[\n]/g, "\\n").replace(/[\t]/g, "\\t").replace(/[\r]/g, "\\r");
            },
            createXhr: function() {
                var b, c, d;
                if (typeof XMLHttpRequest != "undefined") return new XMLHttpRequest;
                for (c = 0; c < 3; c++) {
                    d = a[c];
                    try {
                        b = new ActiveXObject(d);
                    } catch (e) {}
                    if (b) {
                        a = [ d ];
                        break;
                    }
                }
                if (!b) throw new Error("createXhr(): XMLHttpRequest not available");
                return b;
            },
            get: j,
            parseName: function(a) {
                var b = !1, c = a.indexOf("."), d = a.substring(0, c), e = a.substring(c + 1, a.length);
                return c = e.indexOf("!"), c !== -1 && (b = e.substring(c + 1, e.length), b = b === "strip", e = e.substring(0, c)), {
                    moduleName: d,
                    ext: e,
                    strip: b
                };
            },
            xdRegExp: /^((\w+)\:)?\/\/([^\/\\]+)/,
            useXhr: function(a, b, c, d) {
                var e = i.xdRegExp.exec(a), f, g, h;
                return e ? (f = e[2], g = e[3], g = g.split(":"), h = g[1], g = g[0], (!f || f === b) && (!g || g === c) && (!h && !g || h === d)) : !0;
            },
            finishLoad: function(a, b, c, d, e) {
                c = b ? i.strip(c) : c, e.isBuild && (h[a] = c), d(c);
            },
            load: function(a, b, c, h) {
                if (h.isBuild && !h.inlineText) {
                    c();
                    return;
                }
                var j = i.parseName(a), k = j.moduleName + "." + j.ext, l = b.toUrl(k), m = h && h.text && h.text.useXhr || i.useXhr;
                !d || m(l, e, f, g) ? i.get(l, function(b) {
                    i.finishLoad(a, j.strip, b, c, h);
                }) : b([ k ], function(a) {
                    i.finishLoad(j.moduleName + "." + j.ext, j.strip, a, c, h);
                });
            },
            write: function(a, b, c, d) {
                if (b in h) {
                    var e = i.jsEscape(h[b]);
                    c.asModule(a + "!" + b, "define(function () { return '" + e + "';});\n");
                }
            },
            writeFile: function(a, b, c, d, e) {
                var f = i.parseName(b), g = f.moduleName + "." + f.ext, h = c.toUrl(f.moduleName + "." + f.ext) + ".js";
                i.load(g, c, function(b) {
                    var c = function(a) {
                        return d(h, a);
                    };
                    c.asModule = function(a, b) {
                        return d.asModule(a, h, b);
                    }, i.write(a, g, c, e);
                }, e);
            }
        }, i;
    });
}(), myGlobalRequire.define("text!templates/test.html", [], function() {
    return '<div class="W_miniblog">\r\n<div id="pl_content_top">\r\n<!--顶部导航-->\r\n <div class="global_header">\r\n <div class="header clearfix">\r\n <div class="logo"><a href="/"></a></div>\r\n <ul class="list">\r\n <li><a tabindex="4" href="/go2simple" bpfilter="main" class="link" node-type="home">首页</a></li>\r\n <li node-type="plaza"><a tabindex="4" href="http://plaza.weibo.com?topnav=1&amp;wvr=3.6" class="link">广场<span class="W_arr_d"><em class="b1"></em><em class="b2"></em><em class="b3"></em></span> </a>\r\n <div class="layer_topmenu_list layer_topmenu_list_yy" style="width: 135px; display: none;" node-type="layerPlaza">\r\n <div class="func">\r\n <span><a href="/jx/pic.php?topnav=1&amp;wvr=3.6">微博精选</a></span>广场\r\n </div>\r\n <div node-type="plazaContent"></div>\r\n <div class="func func_up">\r\n <span><a href="http://plaza.weibo.com?topnav=1&amp;wvr=3.6" class="more">查看更多有趣内容</a></span>\r\n </div>\r\n </div>\r\n </li>\r\n \r\n <li node-type="group"><a tabindex="4" href="http://q.weibo.com?topnav=1&amp;wvr=3.6" class="link">微群<span class="W_arr_d"><em class="b1"></em><em class="b2"></em><em class="b3"></em></span></a>\r\n  <div node-type="layerGroup" style="width: 270px; display: none;" class="layer_topmenu_list layer_topmenu_list_yy">\r\n  <div class="func"><span><a class="more" href="http://q.weibo.com?topnav=1">发现微群</a></span>我的微群</div>\r\n  <div node-type="groupContent"></div>\r\n  <div class="func func_up"><span><a class="more" href="http://q.weibo.com/profile?topnav=1">管理/查看更多微群</a></span></div>\r\n  </div>\r\n </li>\r\n <li node-type="app"><a tabindex="4" href="/app?topnav=1&amp;wvr=3.6" class="link W_no_outline">应用<span class="W_arr_d"><em class="b1"></em><em class="b2"></em><em class="b3"></em></span></a>\r\n  <div class="layer_topmenu_list layer_topmenu_list_app" node-type="layerApp" style="position:absolute; top:33px; left:-329px;display:none;">\r\n  <div node-type="appContent" class="border clearfix">\r\n  </div>\r\n  </div>\r\n </li>\r\n <li node-type="game"><a tabindex="4" href="http://game.weibo.com?origin=2303&amp;topnav=1&amp;wvr=3.6" class="link W_no_outline">游戏<span class="W_arr_d"><em class="b1"></em><em class="b2"></em><em class="b3"></em></span></a>\r\n  <div style="display: none;" class="layer_topmenu_list layer_topmenu_list_yy" node-type="layerGame">\r\n  <div class="func"><span><a class="more" href="http://game.weibo.com/home/recommend/game?origin=2304">浏览热门游戏</a></span>常用游戏</div>\r\n  <div node-type="gameContent"></div>\r\n  <div class="func func_up"><span><a class="more" href="http://game.weibo.com/home/game/my?origin=2002 ">查看我的游戏</a></span></div>\r\n  </div>\r\n </li>\r\n </ul>\r\n <div class="search">\r\n  <input tabindex="4" title="搜索文本框" node-type="searchInput" type="text" class="input W_no_outline" value="" maxlength="40" name="132897012080017"><a tabindex="4" title="搜索按钮" href="javascript:void(0)" onclick="return false" class="btn" node-type="searchSubmit"></a>\r\n  <div class="W_layer_suggest" style="top: 27px; left: 0px; display: none; " node-type="searchSuggest">\r\n  <div node-type="basic"></div>\r\n  <div node-type="plus"></div>\r\n  </div>\r\n </div>\r\n <div class="right">\r\n <ul class="person">\r\n\t<li node-type="account">\r\n  <a tabindex="4" href="javascript:void(0)" class="link W_no_outline">帐号<span class="W_arr_d"><em class="b1"></em><em class="b2"></em><em class="b3"></em></span></a>\r\n  <div class="layer_topmenu_list" node-type="layerAccount" style="display:none">\r\n  <dl class="person_infos">\r\n <dt><img height="30" width="30" alt="go2simple" src="http://tp3.sinaimg.cn/1826787742/50/1290500808/1"></dt>\r\n <dd><a href="/go2simple/profile?topnav=1&amp;wvr=3.6">go2simple</a></dd>\r\n  </dl>\r\n  <ul>\r\n <li class="line"></li>\r\n <li><a href="http://account.weibo.com/settings/index?topnav"><img src="http://img.t.sinajs.cn/t4//style/images/common/transparent.gif" alt="帐号设置" class="ico_account" width="16" height="16">帐号设置</a></li>\r\n <li><a href="/home?skinId=setskin&amp;topnav=1&amp;wvr=3.6"><img src="http://img.t.sinajs.cn/t4//style/images/common/transparent.gif" alt="模板设置" class="ico_template" width="16" height="16">模板设置</a></li>\r\n\t<li><a href="http://account.weibo.com/settings/version?topnav"><img src="http://img.t.sinajs.cn/t4//style/images/common/transparent.gif" alt="版本选择" class="ico_versionchoice" width="16" height="16">版本选择</a></li>\r\n\t<li class="line"></li>\r\n <li><a href="http://credits.weibo.com?topnav=1&amp;wvr=3.6"><img src="http://img.t.sinajs.cn/t4//style/images/common/transparent.gif" alt="我的微币" class="ico_credits" width="16" height="16">我的微币</a></li>\r\n\t<li><a href="http://hao.weibo.com/show?entry=account&amp;wvr=3.6"><img src="http://img.t.sinajs.cn/t4//style/images/common/transparent.gif" alt="我的微号" class="ico_hao" width="16" height="16">我的微号</a></li>\r\n <li><a href="/tool?topnav=1&amp;wvr=3.6"><img src="http://img.t.sinajs.cn/t4//style/images/common/transparent.gif" alt="我的工具" class="ico_toolset" width="16" height="16">我的工具</a></li>\r\n <li class="line"></li>\r\n <li><a node-type="exit" href="http://weibo.com/logout.php?backurl=/">退出</a></li>\r\n  </ul>\r\n  </div>\r\n  </li>\r\n  \r\n  <li node-type="notice">\r\n  <a tabindex="4" href="javascript:void(0)" class="link W_no_outline">消息<span class="W_arr_d"><em class="b1"></em><em class="b2"></em><em class="b3"></em></span></a>\r\n  <div class="layer_topmenu_list" node-type="layerNotice" style="width:190px;display:none;">\r\n  <div node-type="noticeContent"><ul><!--tip start--><li><a target="_top" action-type="bp-link" action-data="hide=true" bpfilter="main" href="http://weibo.com/comment/inbox?f=1&amp;topnav=1&amp;wvr=3.6">查看评论</a></li><li><a target="_top" href="http://weibo.com/1826787742/fans?topnav=1&amp;wvr=3.6">查看粉丝</a></li><li><a target="_top" action-type="bp-link" action-data="hide=true" bpfilter="main" href="http://weibo.com/messages?topnav=1&amp;wvr=3.6">查看私信</a></li><li><a target="_top" action-type="bp-link" action-data="hide=true" bpfilter="main" href="http://weibo.com/at/weibo?topnav=1&amp;wvr=3.6">查看@我</a></li><li><a target="_top" href="http://q.weibo.com/message/proxJump.php?topnav=1&amp;wvr=3.6">查看群内消息</a></li><li><a target="_top" href="http://photo.weibo.com/messages/index?topnav=1&amp;wvr=3.6">查看相册消息</a></li><li><a target="_top" href="http://weibo.com/systemnotice?topnav=1&amp;wvr=3.6">查看通知</a></li><li><a target="_top" href="http://weibo.com/invite/recv.php?topnav=1&amp;wvr=3.6">查看邀请</a></li><!--tip end--></ul></div>\r\n  </div>\r\n  </li>\r\n\t<li node-type="find"><a tabindex="4" href="/f/find?topnav=1&amp;wvr=3.6" class="link">找人</a></li>\r\n  <li node-type="phone"><a tabindex="4" href="http://m.weibo.com/web/cellphone.php?topnav=1&amp;wvr=3.6" class="link">手机</a></li>\r\n  <li><a tabindex="4" href="/go2simple/profile?topnav=1&amp;wvr=3.6" class="link">go2simple</a></li>\r\n </ul>\r\n </div>\r\n <div class="layer_message_box" style="display:none;"><ul></ul><a class="W_close_color" href="javascript:void(0);" action-type="closeTip"></a></div></div>\r\n</div>\r\n<!--/顶部导航-->\r\n</div>\r\n<div class="W_main_narrow">\r\n<div class="W_main_narrow_bg clearfix">\r\n<div id="plc_profile"><div class="W_main_c" ucardconf="type=1">\r\n <div id="pl_content_hisPersonalInfo"><!--个人资料-->\r\n<div class="perAll_info clearfix">\r\n\t<div class="face"><img src="http://cdn.yeeyan.org/upload/image/2012/02/07203713_53994.jpg" alt="急诊科女超人于莺"></div>\r\n\t<div class="detail">\r\n\t<div class="name clearfix">\r\n\t\t<div class="left">\r\n\t\t急诊科女超人于莺<a target="_blank" href="http://weibo.com/verify"><img src="http://img.t.sinajs.cn/t4/style/images/common/transparent.gif" title="新浪个人认证 " alt="新浪个人认证 " class="approve"></a>\r\n\t\t<a href="javascript:void(0);" class="remark W_linkb" action-type="set">(设置备注)</a>\r\n\t\t</div>\r\n\t</div>\r\n\t<p>\r\n\t\t\r\n\t\t</p><p><a href="/yuying1974" class="online">http://weibo.com/yuying1974</a></p>\r\n\t<p></p>\r\n\t<p><img width="11" height="12" class="female" src="http://img.t.sinajs.cn/t4/style/images/common/transparent.gif" title="女">&nbsp;北京，东城区</p>\r\n\t\t<p>本微博的文字版权、故事内容已授权，其他人不可以盈利为目的转载、刊登、引用我的内容。特此声明。</p>\r\n\t\t<div class="concern clearfix">\r\n\t\t<div class="handle_btn" diss-data="wforce=1&amp;refer_sort=profile&amp;refer_flag=">\r\n\t\t\t<div class="W_addbtn_even" title="已关注"><img src="http://img.t.sinajs.cn/t4/style/images/common/transparent.gif" class="icon_add addbtn_d">已关注<span class="W_vline">|</span><a action-data="fnick=急诊科女超人于莺" class="W_linkb" href="javascript:void(0);" action-type="unfollow"><em>取消</em></a></div>\r\n\t\t \r\n\t\t</div>\r\n\t  <div class="handle_more">\r\n  \t<span>\r\n  \t  <a href="javascript:void(0);" action-type="inviteFollow">求关注</a><em class="W_vline">|</em>\r\n  \t<a href="javascript:void(0);" action-type="at">@她</a><em class="W_vline">|</em>\r\n  \t  \t<a href="javascript:void(0);" action-type="set_group">设置分组</a><em class="W_vline">|</em>\r\n  \t  \t</span>\r\n  \t<a href="javascript:void(0);" class="W_moredown">\r\n  \t<span class="txt" node-data="more">更多</span>\r\n  \t<span class="more"></span></a>\r\n  </div>\r\n  <ul class="handle_menu" style="display:none;">\r\n  \t  <li><a class="rec_friend" href="javascript:void(0);" action-type="recommend">推荐给朋友</a></li>\r\n\t  <li><a class="black_list" href="javascript:void(0);" action-type="block">加入黑名单</a></li>\r\n\t\t<li><a href="javascript:void(0);" class="watch" action-type="addQuietFollow" action-data="fuid=1745573472&amp;fname=急诊科女超人于莺&amp;action=add">\r\n\t\t悄悄关注</a>\r\n\t\t</li>\r\n  </ul>\r\n\t  \r\n\t  <!-- /悄悄关注气泡 -->\r\n\t</div>\r\n\t</div>\r\n\t<div class="clear"></div> \r\n</div>\r\n<!--/个人资料-->\r\n<!--加关注推荐层 -->\r\n<div node-type="suggestedFollows" class="suggested_follows" style="display: none;"></div>\r\n<!--/加关注推荐层 --></div>\r\n \t<div id="pl_content_profilerecommend"></div>\r\n \t<div class="custom_content_bg">\r\n \t<div id="pl_content_album"><div class="photos_list clearfix">\r\n\t<ul>\r\n\t\t<li><a href="http://photo.weibo.com/1745573472/talbum/detail/photo_id/3410826012498198" action-type="showDetail" action-data="uid=1745573472&amp;pid=3410826012498198&amp;is_status=1"><img src="http://ww2.sinaimg.cn/square/680b5660jw1dpux2eep0sj.jpg" alt=""><span class="commented"></span></a></li>\r\n\t\t<li><a href="http://photo.weibo.com/1745573472/talbum/detail/photo_id/3410752079135719" action-type="showDetail" action-data="uid=1745573472&amp;pid=3410752079135719&amp;is_status=1"><img src="http://ww1.sinaimg.cn/square/680b5660jw1dpuoklyv0jj.jpg" alt=""><span class="commented"></span></a></li>\r\n\t\t<li><a href="http://photo.weibo.com/1745573472/talbum/detail/photo_id/3410085587546903" action-type="showDetail" action-data="uid=1745573472&amp;pid=3410085587546903&amp;is_status=1"><img src="http://ww1.sinaimg.cn/square/680b5660jw1dpsk14mnxvj.jpg" alt=""><span class="commented"></span></a></li>\r\n\t\t<li><a href="http://photo.weibo.com/1745573472/talbum/detail/photo_id/3405071843214221" action-type="showDetail" action-data="uid=1745573472&amp;pid=3405071843214221&amp;is_status=1"><img src="http://ww4.sinaimg.cn/square/680b5660jw1dpck7l7g2zj.jpg" alt=""><span class="commented"></span></a></li>\r\n\t\t<li><a href="http://photo.weibo.com/1745573472/talbum/detail/photo_id/3404757979322221" action-type="showDetail" action-data="uid=1745573472&amp;pid=3404757979322221&amp;is_status=1"><img src="http://ww2.sinaimg.cn/square/680b5660jw1dpbk5w0xmzj.jpg" alt=""><span class="commented"></span></a></li>\r\n\t\t<li class="up_info">\r\n\t \t <a href="http://photo.weibo.com/1745573472/albums" class="morepics">更多图片</a>\r\n\t</li>\r\n\t</ul>\r\n</div>\r\n<div class="photo_big" node-type="albumContent" action-type="albumContent" style="display: none; ">\r\n\t<div node-type="albumDetail" class="bg">\r\n\t</div>\r\n\t<div class="arrow_up" node-type="arrow"></div>\r\n</div>\r\n</div>\r\n \t<div id="pl_content_hisFeed">\r\n\t<div class="newFilter W_texta">\r\n<div class="nfTagB clearfix">\r\n\t<ul>\r\n\t<li class="current W_texta"><span>微博</span></li>\r\n\t<li><a href="/u/1745573472/xinqing/">心情</a></li>\r\n\t\t<li><a href="/1745573472/info">她的资料</a></li>\r\n\t\t</ul>\r\n\t</div>\r\n<div node-type="feed_nav">\r\n<div class="minifTagB clearfix">\r\n<ul node-type="feedType">\r\n\t<li action-type="search_type" action-data="type=0" class="current"><span>全部</span></li>\r\n\t\r\n\t<li class="W_vline">|</li>\r\n\t<li action-type="search_type" action-data="type=1"><a href="/yuying1974?is_ori=1">原创</a></li>\r\n\t\r\n\t<li class="W_vline">|</li>\r\n\t<li action-type="search_type" action-data="type=2"><a href="/yuying1974?is_pic=1">图片</a></li>\r\n\t\r\n\t<li class="W_vline">|</li>\r\n\t<li action-type="search_type" action-data="type=3"><a href="/yuying1974?is_video=1">视频</a></li>\r\n\t\r\n\t<li class="W_vline">|</li>\r\n\t<li action-type="search_type" action-data="type=4"><a href="/yuying1974?is_music=1">音乐</a></li>\r\n\t\r\n\t<li class="W_vline">|</li>\r\n\t  <li action-type="search_type" action-data="type=5"><a href="/yuying1974?is_tag=1" action-data="uid=1745573472">标签</a></li>\r\n  \t\r\n\t\r\n</ul>\r\n\t\r\n<div class="search_input">\r\n<div class="sh_input">\r\n<form node-type="singleForm" action="" method="get"><input node-type="keyword" type="text" name="key_word" class="input" value="" placeholder="搜索她说的话"> <a action-type="search_key" href="javascript:void();" class="btn" onclick="return false;"></a></form>\r\n</div>\r\n<a action-type="search_adv" action-data="type=0" href="javascript:void();" onclick="return false;" class="gj_link">高级搜索</a></div>\r\n</div>\r\n\t\r\n<!--下面这段div出现时，替换掉上面的div-->\r\n<div class="nfBox" node-type="search" style="display: none;">\r\n<div class="nfBoxSim clearfix" style="display: none;">\r\n<div class="left"><a href="javascript:void();" class="current">全部</a><a href="javascript:void();">原创</a><a href="javascript:void();">图片</a><a href="javascript:void();">视频</a><a href="javascript:void();">音乐</a><a href="javascript:void();">私密</a></div>\r\n<div class="right">\r\n<div class="searchbg"><a href="javascript:void();" class="searchadv">高级搜索</a></div>\r\n</div>\r\n</div>\r\n<div class="senSear">\r\n<div class="title">\r\n<p class="left">高级搜索</p>\r\n<a action-type="search_adv" action-data="type=1" href="javascript:void();" onclick="return false;" class="right">关闭高级搜索</a></div>\r\n<form node-type="searchForm" action="" method="get">\r\n<dl class="s_type clearfix">\r\n\t<dt>类&nbsp;&nbsp;&nbsp;&nbsp;型：</dt>\r\n\t<dd><input type="checkbox" value="1" name="is_ori" id="is_ori" class="W_checkbox" checked="checked"><label for="is_ori">原创</label>\r\n\t<input type="checkbox" value="1" name="is_forward" id="is_forward" class="W_checkbox" checked="checked"><label for="is_forward">转发</label>\r\n\t<input type="checkbox" value="1" name="is_text" id="is_text" class="W_checkbox" checked="checked"><label for="is_text">纯文本</label>\r\n\t<input type="checkbox" value="1" name="is_pic" id="is_pic" class="W_checkbox" checked="checked"><label for="is_pic">含图片</label>\r\n\t<input type="checkbox" value="1" name="is_video" id="is_video" class="W_checkbox" checked="checked"><label for="is_video">含视频</label>\r\n\t<input type="checkbox" value="1" name="is_music" id="is_music" class="W_checkbox" checked="checked"><label for="is_music">含音乐</label>\r\n\t</dd>\r\n</dl>\r\n<dl class="s_type s_key clearfix">\r\n\t<dt>关键字：</dt>\r\n\t<dd><input node-type="keyword" type="text" value="" class="W_input iw1" id="key_word" placeholder="搜索她说的话" name="key_word" style="color: rgb(153, 153, 153);" maxlength="40"></dd>\r\n\t<dt>时&nbsp;&nbsp;&nbsp;&nbsp;间：</dt>\r\n\t<dd><input action-type="search_date" action-data="type=1" type="text" value="" class="W_input iw2" id="start_time" def="点击选择日期" name="start_time" style="color: rgb(153, 153, 153);" readonly="true"><span class="txt">到</span><input action-type="search_date" action-data="type=2" type="text" value="2012-02-11" def="点击选择日期" class="W_input iw2" id="end_time" name="end_time" style="color:\r\n\trgb(153, 153, 153);" readonly="true"></dd>\r\n</dl>\r\n<dl class="s_type s_btn clearfix">\r\n\t<dt>&nbsp;</dt>\r\n\t<dd><a action-type="search_button" action-data="" href="javascript:void();" onclick="return false;" class="W_btn_a" id="filter_adv_btn"><span>搜索</span></a><span node-type="advSearchErr" class="W_error"></span></dd>\r\n</dl>\r\n</form>\r\n</div>\r\n</div>\r\n<div class="nfBox userTabBox" node-type="feed_tag_list" style="display:none;">\r\n\t\t<div class="tabLine W_linesol"></div>\r\n\t\t<ul class="tag_show clearfix">\t\t\r\n\t\t<li node-type="feed_tag" tag_name="更正一下"><a href="javascript:void(0);" onclick="return false;" class="tag">\r\n\t\t<i class="W_texta" title="查看这个标签下的微博" action-type="feed_tag_active" action-data="tag_name=更正一下" url="/yuying1974?is_tag=1&amp;tag_name=%E6%9B%B4%E6%AD%A3%E4%B8%80%E4%B8%8B">更正一下</i>\r\n\t\t<span class="W_texta">(<i node-type="count">1</i>)</span></a>\r\n\t\t</li>\r\n\t\t<li node-type="feed_tag" tag_name="不是烂苹果"><a href="javascript:void(0);" onclick="return false;" class="tag">\r\n\t\t<i title="查看这个标签下的微博" action-type="feed_tag_active" action-data="tag_name=不是烂苹果" url="/yuying1974?is_tag=1&amp;tag_name=%E4%B8%8D%E6%98%AF%E7%83%82%E8%8B%B9%E6%9E%9C">不是烂苹果</i>\r\n\t\t<span class="W_texta">(<i node-type="count">1</i>)</span></a>\r\n\t\t</li>\r\n\t\t<li node-type="feed_tag" tag_name="应为蒜味"><a href="javascript:void(0);" onclick="return false;" class="tag">\r\n\t\t<i title="查看这个标签下的微博" action-type="feed_tag_active" action-data="tag_name=应为蒜味" url="/yuying1974?is_tag=1&amp;tag_name=%E5%BA%94%E4%B8%BA%E8%92%9C%E5%91%B3">应为蒜味</i>\r\n\t\t<span class="W_texta">(<i node-type="count">1</i>)</span></a>\r\n\t\t</li>\r\n\t\t<li node-type="feed_tag" tag_name="急煞心梗"><a href="javascript:void(0);" onclick="return false;" class="tag">\r\n\t\t<i title="查看这个标签下的微博" action-type="feed_tag_active" action-data="tag_name=急煞心梗" url="/yuying1974?is_tag=1&amp;tag_name=%E6%80%A5%E7%85%9E%E5%BF%83%E6%A2%97">急煞心梗</i>\r\n\t\t<span class="W_texta">(<i node-type="count">1</i>)</span></a>\r\n\t\t</li>\r\n\t\t<li node-type="feed_tag" tag_name="如梦令"><a href="javascript:void(0);" onclick="return false;" class="tag">\r\n\t\t<i title="查看这个标签下的微博" action-type="feed_tag_active" action-data="tag_name=如梦令" url="/yuying1974?is_tag=1&amp;tag_name=%E5%A6%82%E6%A2%A6%E4%BB%A4">如梦令</i>\r\n\t\t<span class="W_texta">(<i node-type="count">1</i>)</span></a>\r\n\t\t</li>\r\n\t</ul>\r\n</div>\r\n</div>\r\n</div><div class="feed_lists" node-type="feed_list">\t\t<dl action-type="feed_list_item" mid="3411989630153793" class="feed_list W_linecolor ">\r\n<dd class="content">\r\n\t<p node-type="feed_list_content">几年前冬天，一乞丐倒在马路上被警察送至我院。昏迷血压低心率快面色苍白。解开身上褴褛酸臭的衣服，所有人呆了，身上裹满了一层层的塑料袋和报纸，他是用这个来保暖。B超提示已是肝癌晚期，肝癌破裂出血。尽管积极输血，仍在两小时后死亡。看见躲在自助银行过夜的乞丐不要去驱赶他们，真的是冷！</p>\r\n\t\t\r\n\t  <div class="wTablist W_linkb W_textb" node-type="feed_list_tagList" style="display:none;">标签：\r\n    </div>\r\n  \t<p class="info W_linkb W_textb"><span>\t<a action-data="allowForward=1&amp;url=http://weibo.com/1745573472/y51U70E0x&amp;mid=3411989630153793&amp;name=急诊科女超人于莺&amp;uid=1745573472&amp;domain=yuying1974" action-type="feed_list_forward" href="javascript:void(0);">转发(7703)</a><i class="W_vline">|</i>\r\n\t\t<a action-type="feed_list_favorite" diss-data="fuid=1745573472" href="javascript:void(0);">收藏</a><i class="W_vline">|</i>\r\n\t<a action-type="feed_list_comment" href="javascript:void(0);">评论(2021)</a></span><a title="2012-02-11 20:59" node-type="feed_list_item_date" date="1328965182000" href="/1745573472/y51U70E0x" class="date">今天20:59</a> 来自<a target="_blank" href="http://m.weibo.com/web/cellphone.php#ipad" rel="nofollow">iPad客户端</a>\r\n\t\r\n\t</p>\r\n\t<div node-type="feed_list_repeat" class="repeat W_textc W_linecolor W_bgcolor" style="display:none;"></div>\r\n\t</dd>\r\n\t<dd class="clear"></dd>\r\n\t\t\r\n</dl><dl action-type="feed_list_item" mid="3411987238893577" class="feed_list W_linecolor ">\r\n<dd class="content">\r\n\t<p node-type="feed_list_content">树大招风，我仍是我，但在众人眼里，有各种形式的我。我从未说过我有多么纯洁清高伟大，也不曾说过我要显摆卖萌摆骚。我无组织无纪律，天马行空，口无遮拦，想哪儿说哪儿。但我信奉真实，哪怕是真实的卑鄙都好过道貌岸然。<a href="/n/%E9%BA%A6%E7%94%B0" usercard="name=麦田">@麦田</a>，你可以拿我来挑战你的道德底线，我只告诉你一句，真实是最有力的反击。</p>\r\n\t\t\r\n\t  <div class="wTablist W_linkb W_textb" node-type="feed_list_tagList" style="display:none;">标签：\r\n    </div>\r\n  \t<p class="info W_linkb W_textb"><span>\t<a action-data="allowForward=1&amp;url=http://weibo.com/1745573472/y51QfBjCN&amp;mid=3411987238893577&amp;name=急诊科女超人于莺&amp;uid=1745573472&amp;domain=yuying1974" action-type="feed_list_forward" href="javascript:void(0);">转发(737)</a><i class="W_vline">|</i>\r\n\t\t<a action-type="feed_list_favorite" diss-data="fuid=1745573472" href="javascript:void(0);">收藏</a><i class="W_vline">|</i>\r\n\t<a action-type="feed_list_comment" href="javascript:void(0);">评论(1505)</a></span><a title="2012-02-11 20:50" node-type="feed_list_item_date" date="1328964612000" href="/1745573472/y51QfBjCN" class="date">今天20:50</a> 来自<a target="_blank" href="http://itunes.apple.com/app/id448844548?mt=8" rel="nofollow">WeicoPro</a>\r\n\t\r\n\t</p>\r\n\t<div node-type="feed_list_repeat" class="repeat W_textc W_linecolor W_bgcolor" style="display:none;"></div>\r\n\t</dd>\r\n\t<dd class="clear"></dd>\r\n\t\t\r\n</dl><dl action-type="feed_list_item" mid="3411964682148736" class="feed_list W_linecolor ">\r\n<dd class="content">\r\n\t<p node-type="feed_list_content">护士call我，说一患者肚子疼要先看，在分诊台吵了好几次嫌前面排着五名患者太慢。患者见我过来马上挑出病历给我，我摆手拒绝，他张口就骂。这时，我见旁边一老大爷闭着眼脸色苍白，我直接拿起老大爷的病历本，经查，是消化道出血，血色素只剩8克。急诊定律：打蔫的患者绝对要引起重视！</p>\r\n\t\t\r\n\t  <div class="wTablist W_linkb W_textb" node-type="feed_list_tagList" style="display:none;">标签：\r\n    </div>\r\n  \t<p class="info W_linkb W_textb"><span>\t<a action-data="allowForward=1&amp;url=http://weibo.com/1745573472/y51fS90Z2&amp;mid=3411964682148736&amp;name=急诊科女超人于莺&amp;uid=1745573472&amp;domain=yuying1974" action-type="feed_list_forward" href="javascript:void(0);">转发(1244)</a><i class="W_vline">|</i>\r\n\t\t<a action-type="feed_list_favorite" diss-data="fuid=1745573472" href="javascript:void(0);">收藏</a><i class="W_vline">|</i>\r\n\t<a action-type="feed_list_comment" href="javascript:void(0);">评论(1117)</a></span><a title="2012-02-11 19:20" node-type="feed_list_item_date" date="1328959235000" href="/1745573472/y51fS90Z2" class="date">今天19:20</a> 来自<a target="_blank" href="http://m.weibo.com/web/cellphone.php#ipad" rel="nofollow">iPad客户端</a>\r\n\t\r\n\t</p>\r\n\t<div node-type="feed_list_repeat" class="repeat W_textc W_linecolor W_bgcolor" style="display:none;"></div>\r\n\t</dd>\r\n\t<dd class="clear"></dd>\r\n\t\t\r\n</dl><dl action-type="feed_list_item" mid="3411681486638235" class="feed_list W_linecolor ">\r\n<dd class="content">\r\n\t<p node-type="feed_list_content">回到家，先生阴阳怪气的说我的微博越来越低俗，还说今天他同事凑上来问他，知不知道那四个英文是什么意思。把他这个纯真的老党员羞的无地自容。说轻点吧，都是老同志了，得有点明辨是非的能力，要透过现象看本质。说重点吧，您是在试探我先生不懂英语呢，还是羡慕我先生有我这真情真性率真的老婆呢？</p>\r\n\t\t\r\n\t  <div class="wTablist W_linkb W_textb" node-type="feed_list_tagList" style="display:none;">标签：\r\n    </div>\r\n  \t<p class="info W_linkb W_textb"><span>\t<a action-data="allowForward=1&amp;url=http://weibo.com/1745573472/y4TT6rQUj&amp;mid=3411681486638235&amp;name=急诊科女超人于莺&amp;uid=1745573472&amp;domain=yuying1974" action-type="feed_list_forward" href="javascript:void(0);">转发(264)</a><i class="W_vline">|</i>\r\n\t\t<a action-type="feed_list_favorite" diss-data="fuid=1745573472" href="javascript:void(0);">收藏</a><i class="W_vline">|</i>\r\n\t<a action-type="feed_list_comment" href="javascript:void(0);">评论(743)</a></span><a title="2012-02-11 00:35" node-type="feed_list_item_date" date="1328891718000" href="/1745573472/y4TT6rQUj" class="date">今天00:35</a> 来自<a target="_blank" href="http://m.weibo.com/web/cellphone.php#ipad" rel="nofollow">iPad客户端</a>\r\n\t\r\n\t</p>\r\n\t<div node-type="feed_list_repeat" class="repeat W_textc W_linecolor W_bgcolor" style="display:none;"></div>\r\n\t</dd>\r\n\t<dd class="clear"></dd>\r\n\t\t\r\n</dl><dl action-type="feed_list_item" mid="3411538725906458" isforward="1" class="feed_list W_linecolor ">\r\n<dd class="content">\r\n\t<p node-type="feed_list_content">第一次到景仰的广播电台，当年娱乐活动贫乏的时候，一直听伍洲彤的零点乐话。93年那会儿闲的无聊，编了个凄惨绝伦的故事，企图引起关注，送首我喜欢的歌给我自己。结果没成功。估计那会儿装逼痕迹太重，那故事搁现在都够拍个超炫版的玉观音的。现实是如此鸡肋，不如跟着音乐摇头晃脑吧！</p>\r\n\t\r\n\t\t\t<dl class="comment W_textc W_linecolor W_bgcolor">\r\n\t\t<dd class="arrow W_bgcolor_arrow"><em class="W_arrline">◆</em><span>◆</span></dd>\r\n\t<dt node-type="feed_list_forwardContent">\r\n\t\t<a href="/wangdong" title="王东" usercard="id=1219019121" nick-name="王东">\r\n\t\t  @王东</a>\r\n\t\t<a target="_blank" href="http://weibo.com/verify"><img src="http://img.t.sinajs.cn/t4/style/images/common/transparent.gif" title="新浪个人认证 " alt="新浪个人认证 " class="approve"></a>：\r\n\t\t<em>2.10.今日<a class="a_topic" href="http://s.weibo.com/weibo/%25E5%258D%2588%25E5%2590%258E%25E5%25A4%25A7%25E9%2581%2593%25E4%25B8%259C">#午后大道东#</a>(3点-5点) ——今天我们请来了著名的<a href="/n/%E6%80%A5%E8%AF%8A%E7%A7%91%E5%A5%B3%E8%B6%85%E4%BA%BA%E4%BA%8E%E8%8E%BA" usercard="name=急诊科女超人于莺">@急诊科女超人于莺</a> 和大家聊一聊—— 互动话题：急诊室的故事……！！！欢迎发言。（语音互动：微信号是whddd974）——视频直播:<a title="http://vlive.rbc.cn/" href="http://t.cn/h5d7o" target="_blank" mt="url" action-type="feed_list_url">http://t.cn/h5d7o</a> ，在线直播:<a title="http://listen.rbc.cn/" href="http://t.cn/hcMW3" target="_blank" mt="url" action-type="feed_list_url">http://t.cn/hcMW3</a> 点击音乐广播。新浪微电台：<a title="http://radio.weibo.com/beijing/fm974?source=radioarea_lastlisten" href="http://t.cn/auYAh8" target="_blank" mt="url" action-type="feed_list_url">http://t.cn/auYAh8</a></em>\r\n\t\t</dt>\r\n\t\t<dd class="info W_linkb W_textb">\r\n\t<span>\r\n\t<a href="/1219019121/y4PXy0e80?type=repost">转发(207)</a>\r\n\t<i class="W_vline">|</i>\r\n\t\t<a href="/1219019121/y4PXy0e80">评论(194)</a>\r\n\t</span>\r\n\t<a class="date" href="/1219019121/y4PXy0e80" title="2012-02-10 14:35" date="1328855710000" node-type="feed_list_item_date">2月10日14:35</a> 来自<a target="_blank" href="http://weibo.com" rel="nofollow">新浪微博</a>\r\n</dd>\t\t    </dl>\r\n\t  <div class="wTablist W_linkb W_textb" node-type="feed_list_tagList" style="display:none;">标签：\r\n    </div>\r\n  \t<p class="info W_linkb W_textb"><span>\t<a action-data="allowForward=1&amp;rootmid=3411530480054312&amp;rootname=王东&amp;rootuid=1219019121&amp;rooturl=http://weibo.com/1219019121/y4PXy0e80&amp;url=http://weibo.com/1745573472/y4QaQoMxs&amp;mid=3411538725906458&amp;name=急诊科女超人于莺&amp;uid=1745573472&amp;domain=wangdong" action-type="feed_list_forward" href="javascript:void(0);">转发(150)</a><i class="W_vline">|</i>\r\n\t\t<a action-type="feed_list_favorite" diss-data="fuid=1745573472" href="javascript:void(0);">收藏</a><i class="W_vline">|</i>\r\n\t<a action-type="feed_list_comment" href="javascript:void(0);">评论(391)</a></span><a title="2012-02-10 15:07" node-type="feed_list_item_date" date="1328857678000" href="/1745573472/y4QaQoMxs" class="date">2月10日15:07</a> 来自<a target="_blank" href="http://itunes.apple.com/app/id448844548?mt=8" rel="nofollow">WeicoPro</a>\r\n\t\r\n\t</p>\r\n\t<div node-type="feed_list_repeat" class="repeat W_textc W_linecolor W_bgcolor" style="display:none;"></div>\r\n\t</dd>\r\n\t<dd class="clear"></dd>\r\n\t\t\r\n</dl><dl action-type="feed_list_item" mid="3411323180136292" class="feed_list W_linecolor ">\r\n<dd class="content">\r\n\t<p node-type="feed_list_content">当年我老师说我的性格适合去国外发展，老外欣赏我这样的女人。说的我春心荡漾，蠢蠢欲动。转念一想，和老外谈恋爱，开场白是nice to meet u，然后是I like U，接着只能上I love U。然后词穷，只会说fuck me。少了和中国男人调情的曲曲折折、欲语还休、欲盖弥彰、含沙射影，那多没劲！遂作罢！</p>\r\n\t\t\r\n\t  <div class="wTablist W_linkb W_textb" node-type="feed_list_tagList" style="display:none;">标签：\r\n    </div>\r\n  \t<p class="info W_linkb W_textb"><span>\t<a action-data="allowForward=1&amp;url=http://weibo.com/1745573472/y4Kzc0zsg&amp;mid=3411323180136292&amp;name=急诊科女超人于莺&amp;uid=1745573472&amp;domain=yuying1974" action-type="feed_list_forward" href="javascript:void(0);">转发(3347)</a><i class="W_vline">|</i>\r\n\t\t<a action-type="feed_list_favorite" diss-data="fuid=1745573472" href="javascript:void(0);">收藏</a><i class="W_vline">|</i>\r\n\t<a action-type="feed_list_comment" href="javascript:void(0);">评论(2032)</a></span><a title="2012-02-10 00:51" node-type="feed_list_item_date" date="1328806289000" href="/1745573472/y4Kzc0zsg" class="date">2月10日00:51</a> 来自<a target="_blank" href="http://weibo.com" rel="nofollow">新浪微博</a>\r\n\t\r\n\t</p>\r\n\t<div node-type="feed_list_repeat" class="repeat W_textc W_linecolor W_bgcolor" style="display:none;"></div>\r\n\t</dd>\r\n\t<dd class="clear"></dd>\r\n\t\t\r\n</dl><dl action-type="feed_list_item" mid="3411301252151313" class="feed_list W_linecolor ">\r\n<dd class="content">\r\n\t<p node-type="feed_list_content">隔壁对外宣称感情弥坚的夫妻俩打架，女方一气之下跑到妇联寻求庇护，并将自己丈夫不可示人的秘密统统告诉了妇联，惹来无数邻居围观，想知道确切内幕消息。一天后，双方父母出面把女人拉回家。闭门商量3日后，告诉邻居们，女方是因为痛经跑到妇联喂鸽子去了！</p>\r\n\t\t\r\n\t  <div class="wTablist W_linkb W_textb" node-type="feed_list_tagList" style="display:none;">标签：\r\n    </div>\r\n  \t<p class="info W_linkb W_textb"><span>\t<a action-data="allowForward=1&amp;url=http://weibo.com/1745573472/y4JZP91EB&amp;mid=3411301252151313&amp;name=急诊科女超人于莺&amp;uid=1745573472&amp;domain=yuying1974" action-type="feed_list_forward" href="javascript:void(0);">转发(18639)</a><i class="W_vline">|</i>\r\n\t\t<a action-type="feed_list_favorite" diss-data="fuid=1745573472" href="javascript:void(0);">收藏</a><i class="W_vline">|</i>\r\n\t<a action-type="feed_list_comment" href="javascript:void(0);">评论(4938)</a></span><a title="2012-02-09 23:24" node-type="feed_list_item_date" date="1328801060000" href="/1745573472/y4JZP91EB" class="date">2月9日23:24</a> 来自<a target="_blank" href="http://weibo.com" rel="nofollow">新浪微博</a>\r\n\t\r\n\t</p>\r\n\t<div node-type="feed_list_repeat" class="repeat W_textc W_linecolor W_bgcolor" style="display:none;"></div>\r\n\t</dd>\r\n\t<dd class="clear"></dd>\r\n\t\t\r\n</dl><dl action-type="feed_list_item" mid="3411297129064249" class="feed_list W_linecolor ">\r\n<dd class="content">\r\n\t<p node-type="feed_list_content">一患者，恶心、呕吐、腹泻来诊，正问诊，患者欲呕，伸手捂嘴，我赶紧递过去垃圾桶，只见患者长出一口气，抹抹嘴，叹道：咽回去了，怕吐脏你的诊室。顿觉胃里翻江倒海，亲，殊不知我也吃多了，正恶心呢！你真催吐啊！</p>\r\n\t\t\r\n\t  <div class="wTablist W_linkb W_textb" node-type="feed_list_tagList" style="display:none;">标签：\r\n    </div>\r\n  \t<p class="info W_linkb W_textb"><span>\t<a action-data="allowForward=1&amp;url=http://weibo.com/1745573472/y4JTaC21z&amp;mid=3411297129064249&amp;name=急诊科女超人于莺&amp;uid=1745573472&amp;domain=yuying1974" action-type="feed_list_forward" href="javascript:void(0);">转发(663)</a><i class="W_vline">|</i>\r\n\t\t<a action-type="feed_list_favorite" diss-data="fuid=1745573472" href="javascript:void(0);">收藏</a><i class="W_vline">|</i>\r\n\t<a action-type="feed_list_comment" href="javascript:void(0);">评论(633)</a></span><a title="2012-02-09 23:07" node-type="feed_list_item_date" date="1328800078000" href="/1745573472/y4JTaC21z" class="date">2月9日23:07</a> 来自<a target="_blank" href="http://weibo.com" rel="nofollow">新浪微博</a>\r\n\t\r\n\t</p>\r\n\t<div node-type="feed_list_repeat" class="repeat W_textc W_linecolor W_bgcolor" style="display:none;"></div>\r\n\t</dd>\r\n\t<dd class="clear"></dd>\r\n\t\t\r\n</dl><dl action-type="feed_list_item" mid="3411216770768926" class="feed_list W_linecolor ">\r\n<dd class="content">\r\n\t<p node-type="feed_list_content">你周围的人形形色色，有的是镇痛剂，能让你暂时缓解痛苦；有的是退烧药，在你热昏头的时候给你降温；有的是催吐药，平白无故的让你恶心；有的是内啡肽，让你飘飘然目眩神迷；有的是安定，让你焦躁的内心平静下来；有的是强心针，在你一潭死水的世界里激起千层浪。我现在要的是吗丁啉，上夜班又吃撑了…</p>\r\n\t\t\r\n\t  <div class="wTablist W_linkb W_textb" node-type="feed_list_tagList" style="display:none;">标签：\r\n    </div>\r\n  \t<p class="info W_linkb W_textb"><span>\t<a action-data="allowForward=1&amp;url=http://weibo.com/1745573472/y4HNz3e22&amp;mid=3411216770768926&amp;name=急诊科女超人于莺&amp;uid=1745573472&amp;domain=yuying1974" action-type="feed_list_forward" href="javascript:void(0);">转发(2478)</a><i class="W_vline">|</i>\r\n\t\t<a action-type="feed_list_favorite" diss-data="fuid=1745573472" href="javascript:void(0);">收藏</a><i class="W_vline">|</i>\r\n\t<a action-type="feed_list_comment" href="javascript:void(0);">评论(998)</a></span><a title="2012-02-09 17:48" node-type="feed_list_item_date" date="1328780918000" href="/1745573472/y4HNz3e22" class="date">2月9日17:48</a> 来自<a target="_blank" href="http://weibo.com" rel="nofollow">新浪微博</a>\r\n\t\r\n\t</p>\r\n\t<div node-type="feed_list_repeat" class="repeat W_textc W_linecolor W_bgcolor" style="display:none;"></div>\r\n\t</dd>\r\n\t<dd class="clear"></dd>\r\n\t\t\r\n</dl><dl action-type="feed_list_item" mid="3410857050348197" class="feed_list W_linecolor ">\r\n<dd class="content">\r\n\t<p node-type="feed_list_content">想起另一过敏——青霉素。120拉一老年女性狂奔而入，紫绀，心跳呼吸停止。诉在附近医院输青霉素过敏导致。喉镜下见喉头水肿呈透明球状，时间紧迫，气管切开已来不及，告诉家属肯定会伤及声带造成声音嘶哑后凭经验插入气管插管，4小时后患者转危为安，第二天脱机拔管，果然声嘶，但神志清楚命保住了。</p>\r\n\t\t\r\n\t  <div class="wTablist W_linkb W_textb" node-type="feed_list_tagList" style="display:none;">标签：\r\n    </div>\r\n  \t<p class="info W_linkb W_textb"><span>\t<a action-data="allowForward=1&amp;url=http://weibo.com/1745573472/y4yrn1sA5&amp;mid=3410857050348197&amp;name=急诊科女超人于莺&amp;uid=1745573472&amp;domain=yuying1974" action-type="feed_list_forward" href="javascript:void(0);">转发(496)</a><i class="W_vline">|</i>\r\n\t\t<a action-type="feed_list_favorite" diss-data="fuid=1745573472" href="javascript:void(0);">收藏</a><i class="W_vline">|</i>\r\n\t<a action-type="feed_list_comment" href="javascript:void(0);">评论(689)</a></span><a title="2012-02-08 17:59" node-type="feed_list_item_date" date="1328695155000" href="/1745573472/y4yrn1sA5" class="date">2月8日17:59</a> 来自<a target="_blank" href="http://weibo.com" rel="nofollow">新浪微博</a>\r\n\t\r\n\t</p>\r\n\t<div node-type="feed_list_repeat" class="repeat W_textc W_linecolor W_bgcolor" style="display:none;"></div>\r\n\t</dd>\r\n\t<dd class="clear"></dd>\r\n\t\t\r\n</dl><dl action-type="feed_list_item" mid="3410826012498198" class="feed_list W_linecolor ">\r\n<dd class="content">\r\n\t<p node-type="feed_list_content">和一好友共进晚餐，聊起当年考解剖，人体模型上插上小标签，用中英双语写出相对应的部位。我吹我基本上指哪儿打哪儿，没错过。朋友嗤之以鼻，拿出一张图片问我这是神马？我看了看说：羊心！从大小看，属羊。从一条条肌腱及腱索来看，属心内膜结构！朋友先赞叹不已，然后突然无语，看着一桌子菜没了食欲</p>\r\n\t\t\r\n<ul class="piclist" node-type="feed_list_media_prev">\r\n\t<li>\r\n\t\t<img class="bigcursor" src="http://ww2.sinaimg.cn/thumbnail/680b5660jw1dpux2eep0sj.jpg" alt="" action-type="feed_list_media_img"><img style="left: 39.5px; top: 52px; display: none;" src="http://img.t.sinajs.cn/t4/style/images/common/loading.gif" class="loading_gif">\r\n\t</li>\r\n\t</ul>\r\n\t<dl class="comment W_textc W_linecolor W_bgcolor" style="display: none;" node-type="feed_list_media_disp"></dl>\r\n\t\r\n\t  <div class="wTablist W_linkb W_textb" node-type="feed_list_tagList" style="display:none;">标签：\r\n    </div>\r\n  \t<p class="info W_linkb W_textb"><span>\t<a action-data="allowForward=1&amp;url=http://weibo.com/1745573472/y4xDjatTw&amp;mid=3410826012498198&amp;name=急诊科女超人于莺&amp;uid=1745573472&amp;domain=yuying1974&amp;pid=680b5660jw1dpux2eep0sj" action-type="feed_list_forward" href="javascript:void(0);">转发(568)</a><i class="W_vline">|</i>\r\n\t\t<a action-type="feed_list_favorite" diss-data="fuid=1745573472" href="javascript:void(0);">收藏</a><i class="W_vline">|</i>\r\n\t<a action-type="feed_list_comment" href="javascript:void(0);">评论(546)</a></span><a title="2012-02-08 15:55" node-type="feed_list_item_date" date="1328687754000" href="/1745573472/y4xDjatTw" class="date">2月8日15:55</a> 来自<a target="_blank" href="http://weibo.com" rel="nofollow">新浪微博</a>\r\n\t\r\n\t</p>\r\n\t<div node-type="feed_list_repeat" class="repeat W_textc W_linecolor W_bgcolor" style="display:none;"></div>\r\n\t</dd>\r\n\t<dd class="clear"></dd>\r\n\t\t\r\n</dl><dl action-type="feed_list_item" mid="3410792403328341" class="feed_list W_linecolor ">\r\n<dd class="content">\r\n\t<p node-type="feed_list_content">夜班，来一年轻女性，意识丧失低氧。同事说刚吃几口凉菜就说不舒服，趴倒在桌上。考虑吸毒、肺栓塞、中毒？都不支持。我随口问了句什么凉菜？答：莜面。突然想起BTV曾放过一短片，讲莜面过敏直接死亡的个例。按过敏性休克给予肾上腺素及激素治疗，十五分钟后转危为安。严重的过敏性休克会要命的！</p>\r\n\t\t\r\n\t  <div class="wTablist W_linkb W_textb" node-type="feed_list_tagList" style="display:none;">标签：\r\n    </div>\r\n  \t<p class="info W_linkb W_textb"><span>\t<a action-data="allowForward=1&amp;url=http://weibo.com/1745573472/y4wL6dXQV&amp;mid=3410792403328341&amp;name=急诊科女超人于莺&amp;uid=1745573472&amp;domain=yuying1974" action-type="feed_list_forward" href="javascript:void(0);">转发(6126)</a><i class="W_vline">|</i>\r\n\t\t<a action-type="feed_list_favorite" diss-data="fuid=1745573472" href="javascript:void(0);">收藏</a><i class="W_vline">|</i>\r\n\t<a action-type="feed_list_comment" href="javascript:void(0);">评论(3002)</a></span><a title="2012-02-08 13:42" node-type="feed_list_item_date" date="1328679739000" href="/1745573472/y4wL6dXQV" class="date">2月8日13:42</a> 来自<a target="_blank" href="http://weibo.com" rel="nofollow">新浪微博</a>\r\n\t\r\n\t</p>\r\n\t<div node-type="feed_list_repeat" class="repeat W_textc W_linecolor W_bgcolor" style="display:none;"></div>\r\n\t</dd>\r\n\t<dd class="clear"></dd>\r\n\t\t\r\n</dl><dl action-type="feed_list_item" mid="3410752079135719" class="feed_list W_linecolor ">\r\n<dd class="content">\r\n\t<p node-type="feed_list_content">朋友送来亲手绘制的扇子一把，这些年来，真正打动我内心的礼物不多，这个算是！刚毕业那会儿转急诊，一家属投诉说被蚊子咬了，要个说法。我拿风油精、电蚊香给他，他不要，要求赔偿。一护士淡定的拿出一把扇子，递给他说：你把蚊子扇我这边来，让它咬我，这样解气！家属看了看她，悻悻然走了…</p>\r\n\t\t\r\n<ul class="piclist" node-type="feed_list_media_prev">\r\n\t<li>\r\n\t\t<img class="bigcursor" src="http://ww1.sinaimg.cn/thumbnail/680b5660jw1dpuoklyv0jj.jpg" alt="" action-type="feed_list_media_img"><img style="left: 39.5px; top: 52px; display: none;" src="http://img.t.sinajs.cn/t4/style/images/common/loading.gif" class="loading_gif">\r\n\t</li>\r\n\t</ul>\r\n\t<dl class="comment W_textc W_linecolor W_bgcolor" style="display: none;" node-type="feed_list_media_disp"></dl>\r\n\t\r\n\t  <div class="wTablist W_linkb W_textb" node-type="feed_list_tagList" style="display:none;">标签：\r\n    </div>\r\n  \t<p class="info W_linkb W_textb"><span>\t<a action-data="allowForward=1&amp;url=http://weibo.com/1745573472/y4vI3CkCj&amp;mid=3410752079135719&amp;name=急诊科女超人于莺&amp;uid=1745573472&amp;domain=yuying1974&amp;pid=680b5660jw1dpuoklyv0jj" action-type="feed_list_forward" href="javascript:void(0);">转发(855)</a><i class="W_vline">|</i>\r\n\t\t<a action-type="feed_list_favorite" diss-data="fuid=1745573472" href="javascript:void(0);">收藏</a><i class="W_vline">|</i>\r\n\t<a action-type="feed_list_comment" href="javascript:void(0);">评论(661)</a></span><a title="2012-02-08 11:02" node-type="feed_list_item_date" date="1328670127000" href="/1745573472/y4vI3CkCj" class="date">2月8日11:02</a> 来自<a target="_blank" href="http://weibo.com" rel="nofollow">新浪微博</a>\r\n\t\r\n\t</p>\r\n\t<div node-type="feed_list_repeat" class="repeat W_textc W_linecolor W_bgcolor" style="display:none;"></div>\r\n\t</dd>\r\n\t<dd class="clear"></dd>\r\n\t\t\r\n</dl><dl action-type="feed_list_item" mid="3410416732397520" class="feed_list W_linecolor ">\r\n<dd class="content">\r\n\t<p node-type="feed_list_content">年轻时，爱=死去活来，为一个人不眠不休，不思茶饭，衣带渐宽终不悔，因为对方无意的一句话开始留起了长发，穿上了黑丝，明明喜欢听animal instinct，偏偏要去唱独上西楼。现在长大了，知道终会有一个男人喜欢我的米其林，知道管他外面狂风四起安坐于阳光下发呆也很美，知道一切不可刻意随意一些更好…</p>\r\n\t\t\r\n\t  <div class="wTablist W_linkb W_textb" node-type="feed_list_tagList" style="display:none;">标签：\r\n    </div>\r\n  \t<p class="info W_linkb W_textb"><span>\t<a action-data="allowForward=1&amp;url=http://weibo.com/1745573472/y4mZba3HG&amp;mid=3410416732397520&amp;name=急诊科女超人于莺&amp;uid=1745573472&amp;domain=yuying1974" action-type="feed_list_forward" href="javascript:void(0);">转发(1071)</a><i class="W_vline">|</i>\r\n\t\t<a action-type="feed_list_favorite" diss-data="fuid=1745573472" href="javascript:void(0);">收藏</a><i class="W_vline">|</i>\r\n\t<a action-type="feed_list_comment" href="javascript:void(0);">评论(597)</a></span><a title="2012-02-07 12:49" node-type="feed_list_item_date" date="1328590172000" href="/1745573472/y4mZba3HG" class="date">2月7日12:49</a> 来自<a target="_blank" href="http://weibo.com" rel="nofollow">新浪微博</a>\r\n\t\r\n\t</p>\r\n\t<div node-type="feed_list_repeat" class="repeat W_textc W_linecolor W_bgcolor" style="display:none;"></div>\r\n\t</dd>\r\n\t<dd class="clear"></dd>\r\n\t\t\r\n</dl><dl action-type="feed_list_item" mid="3410408733744004" class="feed_list W_linecolor ">\r\n<dd class="content">\r\n\t<p node-type="feed_list_content">什么是爱？曾有一孕2月妇女就诊，右侧乳房肿胀破溃流脓4个多月。起初乳房发现肿块坚决不去看病，丈夫抗议了几次，反对无效就听之任之。后怀孕，肿块疯长，逐渐溃烂像火山坑。经查，乳癌晚期已全身扩散，活不过半年。无语愤怒，为女人的愚昧固执，更为男人的懦弱无能！真爱一个人除了包容，更要负责啊！</p>\r\n\t\t\r\n\t  <div class="wTablist W_linkb W_textb" node-type="feed_list_tagList" style="display:none;">标签：\r\n    </div>\r\n  \t<p class="info W_linkb W_textb"><span>\t<a action-data="allowForward=1&amp;url=http://weibo.com/1745573472/y4mMhfHZa&amp;mid=3410408733744004&amp;name=急诊科女超人于莺&amp;uid=1745573472&amp;domain=yuying1974" action-type="feed_list_forward" href="javascript:void(0);">转发(1672)</a><i class="W_vline">|</i>\r\n\t\t<a action-type="feed_list_favorite" diss-data="fuid=1745573472" href="javascript:void(0);">收藏</a><i class="W_vline">|</i>\r\n\t<a action-type="feed_list_comment" href="javascript:void(0);">评论(982)</a></span><a title="2012-02-07 12:17" node-type="feed_list_item_date" date="1328588267000" href="/1745573472/y4mMhfHZa" class="date">2月7日12:17</a> 来自<a target="_blank" href="http://weibo.com" rel="nofollow">新浪微博</a>\r\n\t\r\n\t</p>\r\n\t<div node-type="feed_list_repeat" class="repeat W_textc W_linecolor W_bgcolor" style="display:none;"></div>\r\n\t</dd>\r\n\t<dd class="clear"></dd>\r\n\t\t\r\n</dl>\t<div node-type="lazyload" class="W_loading"><span>正在加载中，请稍候...</span></div>\t \r\n \r\n \r\n</div>\r\n</div>\t\r\n </div>\r\n \r\n</div>\r\n<div class="W_main_r">\r\n  <div id="pl_content_thirdModule"></div>\r\n <div id="pl_content_litePersonInfo">  <!--新浪认证-->\r\n  <div class="W_sina_vip">\r\n  <dl>\r\n\t  <dt><span title="北京协和医院急诊科主治医师 于莺"></span></dt>\r\n    <dd class="W_textb">\r\n\t\t<p>北京协和医院急诊科主治医师 于莺</p>\r\n  </dd>\r\n\t<dd class="settings">\r\n\t\t<span class="hover"><a href="javascript:void(0);" onclick="javascript:window.open(\'/reportspam?rid=1745573472&amp;type=999&amp;url=http%3A%2F%2Fweibo.com%2Fyuying1974\', \'newwindow\', \'height=700, width=550, toolbar =yes, menubar=no, scrollbars=no, resizable=yes, location=no, status=no\');">举报身份</a></span>&nbsp;&nbsp;<a href="/verify" target="_blank">申请认证»</a>\r\n\t</dd>\r\n    </dl>\r\n  </div>\r\n  <!--/新浪认证-->\r\n<!--个人信息统计-->\r\n<div class="W_rightModule">\r\n<ul class="user_atten clearfix ">\r\n  <li><a href="/1745573472/follow"><strong node-type="follow">942</strong><span>关注</span></a></li>\r\n  <li><a href="/1745573472/fans"><strong node-type="fans">532455</strong><span>粉丝</span></a></li>\r\n  <li class="W_no_border"><a href="/yuying1974"><strong node-type="weibo">744</strong><span>微博</span></a></li>\r\n</ul>\r\n</div>\r\n<!--/个人信息统计--></div>\r\n <div id="pl_content_medal" medalconf="uid=1745573472"><!--勋章-->\r\n\t<div class="W_rightModule">\r\n  <div class="declist">\r\n  \t  \t<p style="display:none;" class="count"><a href="http://badge.weibo.com/1745573472">全部勋章18枚</a></p>\r\n  \t <ul class="clearfix">\r\n  <li><a title="微身份" href="http://badge.weibo.com/1745573472?mid=433&amp;source=7"><img medalcard="433" src="http://img.t.sinajs.cn/t4/style/images/medal/433_s.gif?version=201112261811" width="24" height="24" title="微身份" alt="微身份"></a></li>\r\n    <li><a title="呼风唤雨" href="http://badge.weibo.com/1745573472?mid=2&amp;source=7"><img medalcard="2" src="http://img.t.sinajs.cn/t4/style/images/medal/2_s.gif?version=201112261811" width="24" height="24" title="呼风唤雨" alt="呼风唤雨"></a></li>\r\n    <li><a title="友声友色 " href="http://badge.weibo.com/1745573472?mid=425&amp;source=7"><img medalcard="425" src="http://img.t.sinajs.cn/t4/style/images/medal/425_s.gif?version=201112261811" width="24" height="24" title="友声友色 " alt="友声友色 "></a></li>\r\n    <li><a title="斗酒百篇" href="http://badge.weibo.com/1745573472?mid=107&amp;source=7"><img medalcard="107" src="http://img.t.sinajs.cn/t4/style/images/medal/107_s.gif?version=201112261811" width="24" height="24" title="斗酒百篇" alt="斗酒百篇"></a></li>\r\n    <li><a title="万人迷" href="http://badge.weibo.com/1745573472?mid=387&amp;source=7"><img medalcard="387" src="http://img.t.sinajs.cn/t4/style/images/medal/387_s.gif?version=201112261811" width="24" height="24" title="万人迷" alt="万人迷"></a></li>\r\n    <li><a title="移动微博" href="http://badge.weibo.com/1745573472?mid=17&amp;source=7"><img medalcard="17" src="http://img.t.sinajs.cn/t4/style/images/medal/17_s.gif?version=201112261811" width="24" height="24" title="移动微博" alt="移动微博"></a></li>\r\n    <li><a title="身份通" href="http://badge.weibo.com/1745573472?mid=348&amp;source=7"><img medalcard="348" src="http://img.t.sinajs.cn/t4/style/images/medal/348_s.gif?version=201112261811" width="24" height="24" title="身份通" alt="身份通"></a></li>\r\n    <li><a title="意气相投" href="http://badge.weibo.com/1745573472?mid=370&amp;source=7"><img medalcard="370" src="http://img.t.sinajs.cn/t4/style/images/medal/370_s.gif?version=201112261811" width="24" height="24" title="意气相投" alt="意气相投"></a></li>\r\n    <li><a title="舌战群儒" href="http://badge.weibo.com/1745573472?mid=101&amp;source=7"><img medalcard="101" src="http://img.t.sinajs.cn/t4/style/images/medal/101_s.gif?version=201112261811" width="24" height="24" title="舌战群儒" alt="舌战群儒"></a></li>\r\n    <li><a title="清澈微博" href="http://badge.weibo.com/1745573472?mid=375&amp;source=7"><img medalcard="375" src="http://img.t.sinajs.cn/t4/style/images/medal/375_s.gif?version=201112261811" width="24" height="24" title="清澈微博" alt="清澈微博"></a></li>\r\n    <li><a title="一言九顶" href="http://badge.weibo.com/1745573472?mid=299&amp;source=7"><img medalcard="299" src="http://img.t.sinajs.cn/t4/style/images/medal/299_s.gif?version=201112261811" width="24" height="24" title="一言九顶" alt="一言九顶"></a></li>\r\n    <li><a title="壁虎漫步" href="http://badge.weibo.com/1745573472?mid=344&amp;source=7"><img medalcard="344" src="http://img.t.sinajs.cn/t4/style/images/medal/344_s.gif?version=201112261811" width="24" height="24" title="壁虎漫步" alt="壁虎漫步"></a></li>\r\n    <li><a title="语惊四座" href="http://badge.weibo.com/1745573472?mid=98&amp;source=7"><img medalcard="98" src="http://img.t.sinajs.cn/t4/style/images/medal/98_s.gif?version=201112261811" width="24" height="24" title="语惊四座" alt="语惊四座"></a></li>\r\n    <li><a title="七步成诗" href="http://badge.weibo.com/1745573472?mid=1&amp;source=7"><img medalcard="1" src="http://img.t.sinajs.cn/t4/style/images/medal/1_s.gif?version=201112261811" width="24" height="24" title="七步成诗" alt="七步成诗"></a></li>\r\n    <li><a title="谈笑风生" href="http://badge.weibo.com/1745573472?mid=8&amp;source=7"><img medalcard="8" src="http://img.t.sinajs.cn/t4/style/images/medal/8_s.gif?version=201112261811" width="24" height="24" title="谈笑风生" alt="谈笑风生"></a></li>\r\n    <li><a title="如来神掌" href="http://badge.weibo.com/1745573472?mid=178&amp;source=7"><img medalcard="178" src="http://img.t.sinajs.cn/t4/style/images/medal/178_s.gif?version=201112261811" width="24" height="24" title="如来神掌" alt="如来神掌"></a></li>\r\n    <li><a title="三好学生" href="http://badge.weibo.com/1745573472?mid=330&amp;source=7"><img medalcard="330" src="http://img.t.sinajs.cn/t4/style/images/medal/330_s.gif?version=201112261811" width="24" height="24" title="三好学生" alt="三好学生"></a></li>\r\n    <li><a title="一举成名" href="http://badge.weibo.com/1745573472?mid=312&amp;source=7"><img medalcard="312" src="http://img.t.sinajs.cn/t4/style/images/medal/312_s.gif?version=201112261811" width="24" height="24" title="一举成名" alt="一举成名"></a></li>\r\n </ul>\r\n  </div>\r\n\t</div>\r\n<!--/勋章-->\r\n</div>\r\n <div id="pl_relation_recommendAttUsers"><div id="" class="W_rightModule">\r\n<div class="title">关注她的人同时关注了</div>\r\n<div node-type="interest_panel" exclude_uids="2160991527,2115176080,2300716454,2115302210,1663248180,2288577367">\r\n <ul class="face_name clearfix">\r\n \t <li><a href="/myladycarcar" class="per" title="MyLadyCarCar" suda-data="key=tblog_ptop_v4&amp;value=head_pic:uid_2160991527"><img src="http://tp4.sinaimg.cn/2160991527/50/5609297798/0" alt="" width="50" height="50" class="headpic" usercard="id=2160991527"><span class="name">MyLadyCa</span></a><a href="javascript:;" class="addlink W_linkb" suda-data="key=tblog_ptop_v4&amp;value=attention:uid_2160991527" action-type="followBtn" action-data="uid=2160991527&amp;fnick=MyLadyCarCar" diss-data="refer_sort=relation_recommend&amp;refer_flag=right_recommend">加关注</a></li>\r\n <li><a href="/2115176080" class="per" title="做饭很简单" suda-data="key=tblog_ptop_v4&amp;value=head_pic:uid_2115176080"><img src="http://tp1.sinaimg.cn/2115176080/50/5616492724/0" alt="" width="50" height="50" class="headpic" usercard="id=2115176080"><span class="name">做饭很简</span></a><a href="javascript:;" class="addlink W_linkb" suda-data="key=tblog_ptop_v4&amp;value=attention:uid_2115176080" action-type="followBtn" action-data="uid=2115176080&amp;fnick=做饭很简单" diss-data="refer_sort=relation_recommend&amp;refer_flag=right_recommend">加关注</a></li>\r\n <li><a href="/2300716454" class="per" title="经典丶微小说" suda-data="key=tblog_ptop_v4&amp;value=head_pic:uid_2300716454"><img src="http://tp3.sinaimg.cn/2300716454/50/5609095946/0" alt="" width="50" height="50" class="headpic" usercard="id=2300716454"><span class="name">经典丶微</span></a><a href="javascript:;" class="addlink W_linkb" suda-data="key=tblog_ptop_v4&amp;value=attention:uid_2300716454" action-type="followBtn" action-data="uid=2300716454&amp;fnick=经典丶微小说" diss-data="refer_sort=relation_recommend&amp;refer_flag=right_recommend">加关注</a></li>\r\n <li><a href="/2115302210" class="per" title="我是混搭女王" suda-data="key=tblog_ptop_v4&amp;value=head_pic:uid_2115302210"><img src="http://tp3.sinaimg.cn/2115302210/50/5611042103/1" alt="" width="50" height="50" class="headpic" usercard="id=2115302210"><span class="name">我是混搭</span></a><a href="javascript:;" class="addlink W_linkb" suda-data="key=tblog_ptop_v4&amp;value=attention:uid_2115302210" action-type="followBtn" action-data="uid=2115302210&amp;fnick=我是混搭女王" diss-data="refer_sort=relation_recommend&amp;refer_flag=right_recommend">加关注</a></li>\r\n <li><a href="/wsj2009" class="per" title="王思璟" suda-data="key=tblog_ptop_v4&amp;value=head_pic:uid_1663248180"><img src="http://tp1.sinaimg.cn/1663248180/50/5619280878/0" alt="" width="50" height="50" class="headpic" usercard="id=1663248180"><span class="name">王思璟</span></a><a href="javascript:;" class="addlink W_linkb" suda-data="key=tblog_ptop_v4&amp;value=attention:uid_1663248180" action-type="followBtn" action-data="uid=1663248180&amp;fnick=王思璟" diss-data="refer_sort=relation_recommend&amp;refer_flag=right_recommend">加关注</a></li>\r\n <li><a href="/2288577367" class="per" title="每天学点风水学" suda-data="key=tblog_ptop_v4&amp;value=head_pic:uid_2288577367"><img src="http://tp4.sinaimg.cn/2288577367/50/5611046346/0" alt="" width="50" height="50" class="headpic" usercard="id=2288577367"><span class="name">每天学点</span></a><a href="javascript:;" class="addlink W_linkb" suda-data="key=tblog_ptop_v4&amp;value=attention:uid_2288577367" action-type="followBtn" action-data="uid=2288577367&amp;fnick=每天学点风水学" diss-data="refer_sort=relation_recommend&amp;refer_flag=right_recommend">加关注</a></li>\r\n </ul>\r\n <div class="more"><a href="/f/like_uids?uid=1745573472" suda-data="key=tblog_ptop_v4&amp;value=more">更多»</a></div> \r\n</div>\r\n</div>\r\n</div>\r\n <div id="pl_content_chainFollowers" ucardconf="type=1"><div class="W_rightModule">\r\n<div class="title"><a href="/1745573472/fans?relate=second_follow">这些人也关注她</a><span class="ft12 CH W_textb">(39)</span></div>\r\n<ul class="face_name clearfix">\r\n\t<li><a href="/1706987705" class="per" title="六六"><img src="http://tp2.sinaimg.cn/1706987705/50/5623467215/0" alt="" width="50" height="50" class="headpic" usercard="id=1706987705"><span class="name" usercard="id=1706987705">六六</span></a></li>\r\n\t<li><a href="/1824118012" class="per" title="玮有我丁"><img src="http://tp1.sinaimg.cn/1824118012/50/5613104376/0" alt="" width="50" height="50" class="headpic" usercard="id=1824118012"><span class="name" usercard="id=1824118012">玮有我丁</span></a></li>\r\n\t<li><a href="/fenng" class="per" title="Fenng"><img src="http://tp2.sinaimg.cn/1577826897/50/5609854904/1" alt="" width="50" height="50" class="headpic" usercard="id=1577826897"><span class="name" usercard="id=1577826897">Fenng</span></a></li>\r\n\t<li><a href="/torock" class="per" title="孩子气的南瓜"><img src="http://tp4.sinaimg.cn/1654145491/50/5614745710/1" alt="" width="50" height="50" class="headpic" usercard="id=1654145491"><span class="name" usercard="id=1654145491">孩子气的南瓜</span></a></li>\r\n\t<li><a href="/charlesxue" class="per" title="薛蛮子"><img src="http://tp2.sinaimg.cn/1813080181/50/5615039894/1" alt="" width="50" height="50" class="headpic" usercard="id=1813080181"><span class="name" usercard="id=1813080181">薛蛮子</span></a></li>\r\n\t<li><a href="/yeka52" class="per" title="出版人周筠"><img src="http://tp4.sinaimg.cn/1648544895/50/5623065450/0" alt="" width="50" height="50" class="headpic" usercard="id=1648544895"><span class="name" usercard="id=1648544895">出版人周筠</span></a></li>\r\n\t<li><a href="/luke6" class="per" title="刘咚咚"><img src="http://tp4.sinaimg.cn/1571951631/50/5620269009/1" alt="" width="50" height="50" class="headpic" usercard="id=1571951631"><span class="name" usercard="id=1571951631">刘咚咚</span></a></li>\r\n\t<li><a href="/jakejones" class="per" title="作业本"><img src="http://tp1.sinaimg.cn/1220291284/50/1281879003/1" alt="" width="50" height="50" class="headpic" usercard="id=1220291284"><span class="name" usercard="id=1220291284">作业本</span></a></li>\r\n\t<li><a href="/kyle" class="per" title="但丁很淡定"><img src="http://tp3.sinaimg.cn/1648318634/50/5623840874/1" alt="" width="50" height="50" class="headpic" usercard="id=1648318634"><span class="name" usercard="id=1648318634">但丁很淡定</span></a></li>\r\n\t</ul>\r\n<div class="more"><a href="/1745573472/fans?relate=second_follow">更多»</a></div>\r\n</div>\r\n</div>\r\n <div id="pl_content_sameFriends" ucardconf="type=1"><div class="W_rightModule">\r\n<div class="title"><a href="/1745573472/follow?tag=1">我和她都关注了</a><span class="ft12 CH W_textb">(8)</span></div>\r\n<ul class="face_name clearfix">\r\n\t<li><a href="/jakejones" class="per" title="作业本"><img src="http://tp1.sinaimg.cn/1220291284/50/1281879003/1" alt="" width="50" height="50" class="headpic" usercard="id=1220291284"><span class="name" usercard="id=1220291284">作业本</span></a></li>\r\n\t<li><a href="/zhouhongyi" class="per" title="周鸿祎"><img src="http://tp2.sinaimg.cn/1708942053/50/1280730504/1" alt="" width="50" height="50" class="headpic" usercard="id=1708942053"><span class="name" usercard="id=1708942053">周鸿祎</span></a></li>\r\n\t<li><a href="/xiaomikeji" class="per" title="小米公司"><img src="http://tp2.sinaimg.cn/1771925961/50/5606639731/1" alt="" width="50" height="50" class="headpic" usercard="id=1771925961"><span class="name" usercard="id=1771925961">小米公司</span></a></li>\r\n\t<li><a href="/charlesxue" class="per" title="薛蛮子"><img src="http://tp2.sinaimg.cn/1813080181/50/5615039894/1" alt="" width="50" height="50" class="headpic" usercard="id=1813080181"><span class="name" usercard="id=1813080181">薛蛮子</span></a></li>\r\n\t<li><a href="/kaifulee" class="per" title="李开复"><img src="http://tp3.sinaimg.cn/1197161814/50/1290146312/1" alt="" width="50" height="50" class="headpic" usercard="id=1197161814"><span class="name" usercard="id=1197161814">李开复</span></a></li>\r\n\t<li><a href="/wangyuquan" class="per" title="王煜全"><img src="http://tp3.sinaimg.cn/1634074550/50/1279882628/1" alt="" width="50" height="50" class="headpic" usercard="id=1634074550"><span class="name" usercard="id=1634074550">王煜全</span></a></li>\r\n\t<li><a href="/1706987705" class="per" title="六六"><img src="http://tp2.sinaimg.cn/1706987705/50/5623467215/0" alt="" width="50" height="50" class="headpic" usercard="id=1706987705"><span class="name" usercard="id=1706987705">六六</span></a></li>\r\n\t<li><a href="/1443511045" class="per" title="韩仁均叔叔"><img src="http://tp2.sinaimg.cn/1443511045/50/5607963156/1" alt="" width="50" height="50" class="headpic" usercard="id=1443511045"><span class="name" usercard="id=1443511045">韩仁均叔叔</span></a></li>\r\n\t</ul>\r\n<div class="more"><a href="/1745573472/follow?tag=1">更多»</a></div>\r\n</div>\r\n</div>\r\n <div id="pl_content_userInfo"><div class="W_rightModule">\r\n<div class="title">个人资料</div>\r\n<ul class="topic_list clearfix W_textb">\r\n\t\t<li><span class="W_linkdot"></span><a href="http://s.weibo.com/user/&amp;type=work&amp;work=%E5%8C%97%E4%BA%AC%E5%8D%8F%E5%92%8C%E5%8C%BB%E9%99%A2">北京协和医院</a></li>\r\n\t\t<li><span class="W_linkdot"></span><a href="http://s.weibo.com/user/&amp;type=school&amp;school=%E4%B8%AD%E5%9B%BD%E5%8D%8F%E5%92%8C%E5%8C%BB%E7%A7%91%E5%A4%A7%E5%AD%A6">中国协和医科大学</a></li>\r\n\t</ul>\r\n<div class="more"><a href="/1745573472/info">更多</a></div>\r\n</div>\r\n</div>\r\n <div id="pl_content_hisTags"><div class="W_rightModule">\r\n<div class="title W_textb">她的标签<span class="ft12">(4)</span></div>\r\n  <div class="tags_list W_textb">\r\n  <span><a href="http://s.weibo.com/user/&amp;tag=%E4%B8%BA%E6%89%80%E6%AC%B2%E4%B8%BA" class="ft12 ft_b">为所欲为</a></span><span><a href="http://s.weibo.com/user/&amp;tag=%E5%A4%A9%E9%A9%AC%E8%A1%8C%E7%A9%BA" class="ft12">天马行空</a></span><span><a href="http://s.weibo.com/user/&amp;tag=%E6%97%A0%E7%BB%84%E7%BB%87" class="ft14">无组织</a></span><span><a href="http://s.weibo.com/user/&amp;tag=%E6%97%A0%E7%BA%AA%E5%BE%8B" class="ft14">无纪律</a></span></div>\r\n</div>\r\n</div>\r\n <div id="pl_common_thirdmodule_1003"><div class="W_rightModule">\r\n  <div class="W_other_app">\r\n  <div class="title"><a href="http://q.weibo.com/profile/1745573472?source=weiboprofile">她的微群</a><span class="ft12 CH W_textb">(1)</span></div><ul class="clearfix" style="width:180px;"><li style="float:left;width:50px;padding:0 10px 5px 0;text-align:center;"><a href="http://q.weibo.com/774954?source=weiboprofile" style="display: block; cursor: pointer;" title="ICU的随想"><img src="http://ww3.sinaimg.cn/thumb50/636c4f79tw1di97ot13xjj.jpg" alt="ICU的随想" width="50" height="50" style="display: block;"><span style="width: 50px; height: 21px; line-height: 21px; overflow: hidden; display: block; text-align: center;">ICU的随想</span></a></li></ul>\r\n  </div>\r\n</div>\r\n</div>\r\n <div id="pl_content_topic"><div class="W_rightModule">\r\n\t<div class="title">关注的话题<span class="ft12 W_textb">(<span node-type="count">0</span>)</span></div>\r\n\t<div class="topic_block">\r\n\t<ul></ul>\r\n\t\t<p node-type="empty_tip">她还没有关注任何话题</p>\r\n\t\t\r\n\t\t<div class="more"> </div>\r\n\t\r\n\t</div>\r\n</div>\r\n</div>\r\n <div id="pl_content_hisFans" ucardconf="type=1"><div class="W_rightModule ">\r\n<div class="title"><a href="/1745573472/fans">她的粉丝</a><span class="ft12 CH W_textb">(532435)</span></div>\r\n<ul class="face_name clearfix" ucardconf="type=0">\r\n\t<li><a href="/lb19700122" class="per" title="火风火"><img usercard="id=1117824063" title="火风火" src="http://tp4.sinaimg.cn/1117824063/50/1267068465/1" alt="" width="50" height="50" class="headpic"><span class="name" usercard="id=1117824063">火风火</span></a></li>\r\n\t<li><a href="/letingwang" class="per" title="LetingWang"><img usercard="id=1400676211" title="LetingWang" src="http://tp4.sinaimg.cn/1400676211/50/1300295946/0" alt="" width="50" height="50" class="headpic"><span class="name" usercard="id=1400676211">LetingWang</span></a></li>\r\n\t<li><a href="/ppcode" class="per" title="余小波"><img usercard="id=1685831707" title="余小波" src="http://tp4.sinaimg.cn/1685831707/50/1266463416/1" alt="" width="50" height="50" class="headpic"><span class="name" usercard="id=1685831707">余小波</span></a></li>\r\n\t<li><a href="/1742610972" class="per" title="啥都不知道2010"><img usercard="id=1742610972" title="啥都不知道2010" src="http://tp1.sinaimg.cn/1742610972/50/5615353945/1" alt="" width="50" height="50" class="headpic"><span class="name" usercard="id=1742610972">啥都不知道2010</span></a></li>\r\n\t<li><a href="/2560817650" class="per" title="骑大猪的瘦子"><img usercard="id=2560817650" title="骑大猪的瘦子" src="http://tp3.sinaimg.cn/2560817650/50/5620894609/1" alt="" width="50" height="50" class="headpic"><span class="name" usercard="id=2560817650">骑大猪的瘦子</span></a></li>\r\n\t<li><a href="/2152987717" class="per" title="穿裙子的小丸子"><img usercard="id=2152987717" title="穿裙子的小丸子" src="http://tp2.sinaimg.cn/2152987717/50/5611542904/0" alt="" width="50" height="50" class="headpic"><span class="name" usercard="id=2152987717">穿裙子的小丸子</span></a></li>\r\n\t<li><a href="/1981221253" class="per" title="Wing_鸿三少"><img usercard="id=1981221253" title="Wing_鸿三少" src="http://tp2.sinaimg.cn/1981221253/50/5622089607/1" alt="" width="50" height="50" class="headpic"><span class="name" usercard="id=1981221253">Wing_鸿三少</span></a></li>\r\n\t<li><a href="/1879813507" class="per" title="哈哈你不知道我是谁"><img usercard="id=1879813507" title="哈哈你不知道我是谁" src="http://tp4.sinaimg.cn/1879813507/50/1291864888/0" alt="" width="50" height="50" class="headpic"><span class="name" usercard="id=1879813507">哈哈你不知道我是谁</span></a></li>\r\n\t<li><a href="/1546510491" class="per" title="毛毛宝宝蛋蛋仔仔"><img usercard="id=1546510491" title="毛毛宝宝蛋蛋仔仔" src="http://tp4.sinaimg.cn/1546510491/50/5623240178/0" alt="" width="50" height="50" class="headpic"><span class="name" usercard="id=1546510491">毛毛宝宝蛋蛋仔仔</span></a></li>\r\n\t</ul>\r\n<div class="more"><a href="/1745573472/fans">更多»</a></div>\r\n</div>\r\n</div>\r\n <div id="ads_37" ucardconf="type=1"></div>\r\n <div id="pl_common_feedback"><!--意见反馈-->\r\n<div id="" class="W_rightModule W_no_border">\r\n  <div class="title">新浪微博意见反馈</div>\r\n  <ul class="topic_list clearfix">\r\n  <li>欢迎使用新浪微博并提出宝贵建议。请<a href="http://weibo.com/zt/s?k=9286">点击这里</a>提交微博意见反馈。</li>\r\n  </ul>\r\n <ul class="topic_list clearfix">\r\n \t<li><a href="http://help.weibo.com/faq">微博常见问题</a></li>\r\n </ul>\r\n  <ul class="topic_list clearfix">\r\n \t<li><a href="http://help.weibo.com">微博客服专区</a></li>\r\n </ul>\r\n <ul class="topic_list clearfix">\r\n \t<li><a href="http://news.sina.com.cn/c/2011-12-23/141623682749.shtml">《北京市微博客发展管理若干规定》</a></li>\r\n </ul>\r\n</div>\r\n<!--意见反馈-->\r\n</div>\r\n <div id="pl_content_hisOperationPlate"><div class="W_rightModule W_no_border">\r\n\t<div class="black"><a href="javascript:void(0);" action-type="block">加她进黑名单</a></div>\r\n\t<div class="report"><a href="javascript:void(0);" onclick="javascript:window.open(\'/reportspam?rid=1745573472&amp;type=3&amp;url=http%3A%2F%2Fweibo.com%2Fyuying1974\', \'newwindow\', \'height=700, width=550, toolbar =yes, menubar=no, scrollbars=no, resizable=yes, location=no, status=no\');">举报她</a></div>\r\n\t<div class="exposure"><a href="/pub/i/zt/wbpy" target="_blank">不实信息曝光</a></div>\r\n</div></div>\r\n </div>\r\n</div>\r\n</div>\r\n</div>\r\n<div id="pl_ad_backFill"></div>\r\n<div class="global_footer global_footer_narrow">\r\n<div class="clearfix">\r\n\t<dl class="list">\r\n\t<dt>找找感兴趣的人</dt>\r\n\t<dd><a href="http://weibo.com/pub/star ">名人堂</a>　<a href="http://weibo.com/pub/star/mediumlist.php ">媒体汇</a></dd>\r\n\t<dd><a href="http://weibo.com/pub/star/brandlist.php">品牌馆</a>　<a href="http://weibo.com/pub/star/governmenthall.php ">政务厅</a></dd>\r\n\t<dd><a href="http://weibo.com/pub/star/websitelist.php ">网站荟</a>　<a href="http://weibo.com/pub/star/schoollist.php ">校园</a> <a href="http://weibo.com/pub/star/agencylist.php ">机构</a></dd>\r\n\t<dd><a href="http://club.weibo.com">微博达人</a></dd>\r\n\t<dd><a href="http://weibo.com/f/find/guess ">猜你喜欢</a></dd>\r\n\t</dl>\r\n\t<dl class="list">\r\n\t<dt>精彩内容</dt>\r\n\t<dd><a href="http://weibo.com/pub/topic">微话题</a>　<a href="http://data.weibo.com/top">风云榜</a></dd>\r\n\t<dd><a href="http://talk.weibo.com">微访谈</a>　<a href="http://live.weibo.com">微直播</a></dd>\r\n\t<dd><a href="http://plaza.weibo.com">微博精选</a></dd>\r\n\t<dd><a href="http://weibo.com/pub/news ">随便看看</a></dd>\r\n\t<dd><a href="http://weibo.com/pub/city ">同城微博</a></dd>\t\r\n\t</dl>\r\n\t<dl class="list">\r\n\t<dt>热门应用</dt>\r\n\t<dd><a href="http://q.weibo.com">微群</a>　　<a href="http://game.weibo.com">游戏</a></dd>\r\n\t<dd><a href="http://photo.weibo.com">相册</a>　　<a href="http://music.weibo.com/t/index.php">微音乐</a></dd>\r\n\t<dd><a href="http://event.weibo.com">微活动</a>　<a href="http://vote.weibo.com">投票</a> \r\n\t</dd><dd><a href="http://radio.weibo.com">微电台</a>　<a href="http://screen.weibo.com/">大屏幕</a> \r\n\t</dd></dl>\r\n\t<dl class="list">\r\n\t<dt>手机玩微博</dt>\r\n\t<dd><a href="http://m.weibo.com/web/cellphone.php">手机WAP版</a></dd>\r\n\t<dd><a href="http://m.weibo.com/web/cellphone.php#msg">短信彩信发微博</a></dd>\r\n\t<dd><a href="http://m.weibo.com/web/cellphone.php#iphone">iPhone客户端</a></dd>\r\n\t<dd><a href="http://m.weibo.com/web/cellphone.php#android">Android客户端</a></dd>\r\n\t<dd><a href="http://m.weibo.com/web/cellphone.php#symbian">Symbian客户端</a></dd>\r\n\t</dl>\r\n\t<dl class="list list_right">\r\n\t<dt>认证&amp;合作</dt>\r\n\t<dd><a href="http://weibo.com/verify">申请认证</a></dd>\r\n\t<dd><a href="http://open.weibo.com/">开放平台</a></dd>\r\n\t<dd><a href="http://a.weibo.com/proc/productintro.php">企业微博</a></dd>\r\n\t<dd><a href="http://weibo.com/app/website">连接网站</a></dd>\r\n\t<dd><a href="http://weibo.com/static/logo">微博标识使用规范</a></dd>\r\n\t</dl>\r\n</div>\t<div class="other_link clearfix">\r\n\t<div class="help_link">\r\n\t\t<p><a href="http://help.weibo.com/?refer=didao" class="ico_service" target="__blank">微博帮助</a>　<a href="http://weibo.com/zt/s?k=9286" target="__blank">意见反馈</a>　<a href="http://open.weibo.com/" target="__blank">开放平台</a>　<a href="http://hr.weibo.com" target="__blank">微博招聘</a>　<a href="http://news.sina.com.cn/guide/" target="__blank">新浪网导航</a>　<a href="javascript:void(0);" onclick="javascript:window.open(\'/reportspam?type=4&amp;url=http%3A%2F%2Fweibo.com%2Fyuying1974\', \'newwindow\', \'height=700, width=550, toolbar =yes, menubar=no, scrollbars=no, resizable=yes, location=no, status=no\');">不良信息举报</a></p>\r\n\t\t<p>北京微梦创科网络技术有限公司 <a href="http://weibo.com/aj/static/jww.html" target="_blank">京网文[2011]0398-130号</a> <a href="http://www.miibeian.gov.cn" target="_blank">京ICP证100780号</a></p>\r\n\t</div>\r\n\t<div class="copy">\r\n\t\t<p class="W_linkb">\r\n\t\t<select id="pl_content_changeLanguage" class="htc_select"><option value="zh-cn" selected="">中文(简体)</option><option value="zh-tw">中文(繁体)</option></select>\r\n\t\t</p>\r\n\t\t<p>Copyright © 1996-2012 SINA</p>\r\n\t</div>\r\n\t</div>\r\n</div>\r\n<a href="javascript:;" id="base_scrollToTop" class="W_gotop" style="visibility: hidden; ">\r\n<span><em class="sj">♦</em><em class="fk">▐</em>返回顶部</span>\r\n</a> </div>\r\n';
}), myGlobalRequire.define("libs/function.common", function() {}), myGlobalRequire.define("views/taobao/comment", [ "jQuery", "Underscore", "Backbone", "text!templates/test.html", "libs/function.common" ], function(a, b, c, d) {
    var e = c.View.extend({
        el: a("#page"),
        opts: {
            user_id: "",
            url: "http://rate.taobao.com/member_rate.htm?rater=0&content=1&direction=0&identity=1&from=rate&isSeller=1&current_page=1&user_id=",
            page: 1
        },
        initialize: function() {},
        setOptions: function(b) {
            this.opts = a.extend({}, this.opts, b), this.opts.url += this.opts.user_id + "&page=";
        },
        getContent: function() {
            _this = this, a.ajax({
                url: _this.opts.url + _this.opts.page,
                type: "GET",
                async: !0,
                dataType: "html",
                timeout: 3e4,
                error: function() {
                    alert("timeout:>" + _this.opts.page), setTimeout(function() {
                        _this.getContent();
                    }, 1e4);
                },
                success: function(a) {
                    if (a.indexOf('"currentPageNum":' + _this.opts.page) != -1 || a.indexOf("currentPageNum") == -1) a.indexOf('"rateListDetail":[]') != -1 ? console.log("phantomjs_finished") : (a = a.replace("TB.rateList = ", "zmq_result"), console.log(a), _this.opts.page++, setTimeout(function() {
                        _this.getContent();
                    }, 1e3));
                }
            });
        },
        render: function() {}
    });
    return new e;
}), myGlobalRequire.define("views/taobao/jie", [ "jQuery", "Underscore", "Backbone", "text!templates/test.html", "libs/function.common" ], function(a, b, c, d) {
    var e = c.View.extend({
        el: a("#page"),
        opts: {},
        initialize: function() {},
        setOptions: function(b) {
            this.opts = a.extend({}, this.opts, b);
        },
        getContent: function() {
            var a = "//div[@id='wrap']/div[1][@class='shop']/div[1][@class='shop-show floatleft']/div[2][@class='shop-info']/p[3][@class='third-row']/span[1][@class='wp']", b = "//div[@id='wrap']/div[1][@class='shop']/div[1][@class='shop-show floatleft']/div[1][@class='shop-name']/h2[@class='floatleft dib']/a", c = [];
            c[c.length] = getNodeDetail([ a, "", "", "innerHTML" ]), c[c.length] = getNodeDetail([ b, "", "", "innerHTML" ]), c[c.length] = getNodeDetail([ b, "", "", "href" ]), console.log("file_result" + c.join(",")), c = null, alert("quit");
        },
        render: function() {}
    });
    return new e;
}), myGlobalRequire.define("views/cs8684/bus", [ "jQuery", "Underscore", "Backbone", "text!templates/test.html", "libs/function.common" ], function(a, b, c, d) {
    var e = c.View.extend({
        el: a("#page"),
        opts: {
            user_id: "",
            url: "",
            page: 1
        },
        initialize: function() {},
        setOptions: function(b) {
            this.opts = a.extend({}, this.opts, b);
        },
        getRoute: function() {
            _this = this, a.ajax({
                url: _this.opts.url,
                type: "POST",
                async: !0,
                dataType: "html",
                timeout: 3e3,
                error: function() {
                    alert("timeout:>" + _this.opts.page);
                },
                success: function(a) {
                    console.log(a);
                }
            });
        },
        getStation: function() {
            _this = this, a.ajax({
                url: _this.opts.url,
                type: "POST",
                async: !0,
                dataType: "html",
                timeout: 3e3,
                error: function() {
                    alert("timeout:>" + _this.opts.page);
                },
                success: function(a) {
                    console.log(a);
                }
            });
        },
        render: function() {}
    });
    return new e;
}), myGlobalRequire.define("text!templates/vote.html", [], function() {
    return '<form id="form1963" name="form1963" method="post" action="http://www.zgxhm.com/xiaolianbb_taobiao.asp">\r\n\t<input name="ID" type="hidden" value="1963">\r\n\t<input name="page" type="hidden" value="10">\r\n\t<input name="yname" type="hidden" value="">\r\n\t<input name="lie2" type="hidden" value="小红帽长沙星城国际幼儿园">\r\n\t<input name="file1" type="hidden" value="xiaolianbb_ll7">\r\n\t<input name="name1" type="hidden" value="">\t   \r\n\t <input type="submit" name="Submit" value="点击投票">  \r\n</form>\r\n';
}), myGlobalRequire.define("views/other/vote", [ "jQuery", "Underscore", "Backbone", "text!templates/vote.html", "libs/function.common" ], function(a, b, c, d) {
    var e = c.View.extend({
        el: a("#page"),
        opts: {
            user_id: "",
            url: "",
            page: 1
        },
        initialize: function() {},
        setOptions: function(b) {
            this.opts = a.extend({}, this.opts, b);
        },
        startVote: function() {
            a("form[name=form1963]").submit(), alert(a("body").text()), alert("timeout:>");
        },
        f5: function() {
            _this = this, a.ajax({
                url: _this.opts.url,
                type: "GET",
                async: !0,
                dataType: "html",
                timeout: 3e3,
                error: function() {
                    alert("timeout:>" + _this.opts.page), setTimeout(function() {
                        _this.f5();
                    }, 1e3);
                },
                success: function(a) {
                    _this.opts.page++, console.log(_this.opts.page), setTimeout(function() {
                        _this.f5();
                    }, 1e3);
                }
            });
        },
        render: function() {}
    });
    return new e;
}), myGlobalRequire.define("views/other/tool", [ "jQuery", "Underscore", "Backbone", "libs/function.common" ], function(a, b, c) {
    var d = c.View.extend({
        el: a("#page"),
        initialize: function() {},
        auto_get_content: function(a, b, c) {
            a = a.split(","), b = b.split(","), c = c.split(",");
            var d = function(a) {
                console.log(JSON.stringify({
                    sse_result: a
                })), alert("action_finished");
            };
            a.length == 1 ? getRows([ a, b, c ], d) : getRows_2([ a, b, c ], d);
        },
        auto_click: function(a) {
            var b = function(a) {
                a ? alert("action_finished") : alert("action_error");
            };
            clickit(a, b);
        }
    });
    return new d;
}), myGlobalRequire.define("router", [ "jQuery", "Underscore", "Backbone", "models/option", "views/taobao/comment", "views/taobao/jie", "views/cs8684/bus", "views/other/vote", "views/other/tool" ], function(a, b, c, d, e, f, g, h, i) {
    var j = function(a) {
        switch (a.route) {
          case "taobao.comment":
            e.setOptions({
                user_id: a.user_id,
                page: a.page
            }), e.getContent();
            break;
          case "taobao.jie":
            f.getContent();
            break;
          case "cs8684":
            g.getRoute();
            break;
          case "other.vote":
            h.setOptions({
                url: a.url
            }), h.startVote();
            break;
          case "other.f5":
            h.setOptions({
                url: a.url
            }), h.f5();
            break;
          case "other.tool":
            switch (a.action.action) {
              case "auto_get_content":
                i.auto_get_content(a.action.row_xpath, a.action.cols, a.action.attr);
                break;
              case "auto_click":
                i.auto_click(a.action.xpath);
            }
        }
    };
    a(window).bind("hashchange", function() {
        d.getOption(j);
    });
    var k = function() {
        d.getOption(j);
    };
    return {
        initialize: k
    };
}), myGlobalRequire.define("app", [ "jQuery", "Underscore", "Backbone", "router" ], function(a, b, c, d) {
    var e = function() {
        d.initialize();
    };
    return {
        initialize: e
    };
});

var cnf = {
    paths: {
        loader: "libs/loader",
        jQuery: "libs/jquery/loader",
        Underscore: "libs/underscore/loader",
        Backbone: "libs/backbone/loader",
        templates: "../templates"
    }
};

typeof require == "undefined" ? myGlobalRequire.require.config(cnf) : require.config(cnf), typeof requirejs == "undefined" ? requirejs = myGlobalRequire.requirejs : "", typeof require == "undefined" ? require = myGlobalRequire.require : "", typeof define == "undefined" ? define = myGlobalRequire.define : "", myGlobalRequire.require([ "app" ], function(a) {
    a.initialize();
}), myGlobalRequire.define("main", function() {});