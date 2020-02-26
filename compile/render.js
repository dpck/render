'use strict';
const G = /acit|ex(?:s|g|n|p|$)|rph|ows|mnc|ntw|ine[ch]|zoo|^ord/i;
let H = a => `${a}`.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;"), K = a => 40 < `${a}`.length || -1 != `${a}`.indexOf("\n") || -1 !== `${a}`.indexOf("<");
const L = {};
function M(a) {
  const b = {...a.attributes, children:a.children};
  a = a.nodeName.defaultProps;
  if (void 0 !== a) {
    for (let e in a) {
      void 0 === b[e] && (b[e] = a[e]);
    }
  }
  return b;
}
;const O = (a, b, {allAttributes:e, xml:l, c:v, sort:x, a:m} = {}) => {
  let E;
  const F = Object.keys(a);
  x && F.sort();
  return {f:F.map(d => {
    var f = a[d];
    if ("children" != d && !d.match(/[\s\n\\/='"\0<>]/) && (e || !["key", "ref"].includes(d))) {
      if ("className" == d) {
        if (a.class) {
          return;
        }
        d = "class";
      } else {
        if ("htmlFor" == d) {
          if (a.for) {
            return;
          }
          d = "for";
        } else {
          if ("srcSet" == d) {
            if (a.srcset) {
              return;
            }
            d = "srcset";
          }
        }
      }
      v && d.match(/^xlink:?./) && (d = d.toLowerCase().replace(/^xlink:?/, "xlink:"));
      if ("style" == d && f && "object" == typeof f) {
        {
          let p = "";
          for (var q in f) {
            let y = f[q];
            null != y && (p && (p += " "), p += L[q] || (L[q] = q.replace(/([A-Z])/g, "-$1").toLowerCase()), p += ": ", p += y, "number" == typeof y && !1 === G.test(q) && (p += "px"), p += ";");
          }
          f = p || void 0;
        }
      }
      if ("dangerouslySetInnerHTML" == d) {
        E = f && f.__html;
      } else {
        if ((f || 0 === f || "" === f) && "function" != typeof f) {
          if (!0 === f || "" === f) {
            if (f = d, !l) {
              return d;
            }
          }
          q = "";
          if ("value" == d) {
            if ("select" == b) {
              m = f;
              return;
            }
            "option" == b && m == f && (q = "selected ");
          }
          return `${q}${d}="${H(f)}"`;
        }
      }
    }
  }).filter(Boolean), b:E, a:m};
};
const P = [], Q = /^(area|base|br|col|embed|hr|img|input|link|meta|param|source|track|wbr)$/, R = /^(a|abbr|acronym|audio|b|bdi|bdo|big|br|button|canvas|cite|code|data|datalist|del|dfn|em|embed|i|iframe|img|input|ins|kbd|label|map|mark|meter|noscript|object|output|picture|progress|q|ruby|s|samp|slot|small|span|strong|sub|sup|svg|template|textarea|time|u|tt|var|video|wbr)$/;
function S(a, b = {}, e = {}, l = !1, v = !1, x) {
  if (null == a || "boolean" == typeof a) {
    return "";
  }
  const {pretty:m = !1, shallow:E = !1, renderRootComponent:F = !1, shallowHighOrder:d = !1, sortAttributes:f, allAttributes:q, xml:p, initialPadding:y = 0, closeVoidTags:V = !1} = b;
  let {lineLength:C = 40} = b;
  C -= y;
  let {nodeName:c, attributes:W = {}} = a;
  var r = ["textarea", "pre"].includes(c);
  const N = " ".repeat(y), u = "string" == typeof m ? m : `  ${N}`;
  if ("object" != typeof a && !c) {
    return H(a);
  }
  if ("function" == typeof c) {
    if (!E || !l && F) {
      return r = M(a), c.prototype && "function" == typeof c.prototype.render ? (a = new c(r, e), a._disable = a.__x = !0, a.props = r, a.context = e, c.getDerivedStateFromProps ? a.state = {...a.state, ...c.getDerivedStateFromProps(a.props, a.state)} : a.componentWillMount && a.componentWillMount(), r = a.render(a.props, a.state, a.context), a.getChildContext && (e = {...e, ...a.getChildContext()})) : r = c(r, e), S(r, b, e, d, v, x);
    }
    c = c.displayName || c !== Function && c.name || T(c);
  }
  let g = "";
  ({f:z, b:l, a:x} = O(W, c, {allAttributes:q, xml:p, c:v, sort:f, a:x}));
  if (m) {
    let A = `<${c}`.length;
    g = z.reduce((D, h) => {
      const n = A + 1 + h.length;
      if (n > C) {
        return A = u.length, `${D}\n${u}${h}`;
      }
      A = n;
      return `${D} ${h}`;
    }, "");
  } else {
    g = z.length ? " " + z.join(" ") : "";
  }
  g = `<${c}${g}>`;
  if (`${c}`.match(/[\s\n\\/='"\0<>]/)) {
    throw g;
  }
  var z = `${c}`.match(Q);
  V && z && (g = g.replace(/>$/, " />"));
  let w = [];
  if (l) {
    !r && m && (K(l) || l.length + U(g) > C) && (l = "\n" + u + `${l}`.replace(/(\n+)/g, "$1" + (u || "\t"))), g += l;
  } else {
    if (a.children) {
      let A = m && g.includes("\n");
      const D = [];
      w = a.children.map((h, n) => {
        if (null != h && !1 !== h) {
          var t = S(h, b, e, !0, "svg" == c ? !0 : "foreignObject" == c ? !1 : v, x);
          if (t) {
            m && t.length + U(g) > C && (A = !0);
            if ("string" == typeof h.nodeName) {
              const k = t.replace(new RegExp(`</${h.nodeName}>$`), "");
              X(h.nodeName, k) && (D[n] = t.length);
            }
            return t;
          }
        }
      }).filter(Boolean);
      m && A && !r && (w = w.reduce((h, n, t) => {
        var k = (t = D[t - 1]) && /^<([\s\S]+?)>/.exec(n);
        k && ([, k] = k, k = !R.test(k));
        if (t && !k) {
          k = /[^<]*?(\s)/y;
          var B;
          let I = !0, J;
          for (; null !== (B = k.exec(n));) {
            const [Y] = B;
            [, J] = B;
            k.lastIndex + Y.length - 1 > C - (I ? t : 0) && (B = n.slice(0, k.lastIndex - 1), n = n.slice(k.lastIndex), I ? (h.push(B), I = !1) : h.push("\n" + u + `${B}`.replace(/(\n+)/g, "$1" + (u || "\t"))), k.lastIndex = 0);
          }
          J && h.push(J);
          h.push(n);
        } else {
          h.push("\n" + u + `${n}`.replace(/(\n+)/g, "$1" + (u || "\t")));
        }
        return h;
      }, []));
    }
  }
  if (w.length) {
    g += w.join("");
  } else {
    if (p) {
      return g.substring(0, g.length - 1) + " />";
    }
  }
  z || (!X(c, w[w.length - 1]) && !r && m && g.includes("\n") && (g += `\n${N}`), g += `</${c}>`);
  return g;
}
const X = (a, b) => `${a}`.match(R) && (b ? !/>$/.test(b) : !0);
function T(a) {
  var b = (Function.prototype.toString.call(a).match(/^\s*function\s+([^( ]+)/) || "")[1];
  if (!b) {
    b = -1;
    for (let e = P.length; e--;) {
      if (P[e] === a) {
        b = e;
        break;
      }
    }
    0 > b && (b = P.push(a) - 1);
    b = `UnnamedComponent${b}`;
  }
  return b;
}
const U = a => {
  a = a.split("\n");
  return a[a.length - 1].length;
};
module.exports = (a, b = {}, e = {}) => {
  const l = b.addDoctype, v = b.pretty;
  a = S(a, b, e);
  return l ? `<!doctype html>${v ? "\n" : ""}${a}` : a;
};


//# sourceMappingURL=render.js.map