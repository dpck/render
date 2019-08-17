'use strict';
const C = /acit|ex(?:s|g|n|p|$)|rph|ows|mnc|ntw|ine[ch]|zoo|^ord/i;
let D = a => `${a}`.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;"), F = a => 40 < `${a}`.length || -1 != `${a}`.indexOf("\n") || -1 !== `${a}`.indexOf("<");
const G = {};
function I(a) {
  const b = {...a.attributes, children:a.children};
  a = a.nodeName.defaultProps;
  if (void 0 !== a) {
    for (let e in a) {
      void 0 === b[e] && (b[e] = a[e]);
    }
  }
  return b;
}
;const J = (a, b, {allAttributes:e, xml:k, c:t, sort:u, a:l} = {}) => {
  let z;
  const A = Object.keys(a);
  u && A.sort();
  return {f:A.map(d => {
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
      t && d.match(/^xlink:?./) && (d = d.toLowerCase().replace(/^xlink:?/, "xlink:"));
      if ("style" == d && f && "object" == typeof f) {
        {
          let m = "";
          for (var n in f) {
            let v = f[n];
            null != v && (m && (m += " "), m += G[n] || (G[n] = n.replace(/([A-Z])/g, "-$1").toLowerCase()), m += ": ", m += v, "number" == typeof v && !1 === C.test(n) && (m += "px"), m += ";");
          }
          f = m || void 0;
        }
      }
      if ("dangerouslySetInnerHTML" == d) {
        z = f && f.__html;
      } else {
        if ((f || 0 === f || "" === f) && "function" != typeof f) {
          if (!0 === f || "" === f) {
            if (f = d, !k) {
              return d;
            }
          }
          n = "";
          if ("value" == d) {
            if ("select" == b) {
              l = f;
              return;
            }
            "option" == b && l == f && (n = "selected ");
          }
          return `${n}${d}="${D(f)}"`;
        }
      }
    }
  }).filter(Boolean), b:z, a:l};
};
const K = [], L = /^(area|base|br|col|embed|hr|img|input|link|meta|param|source|track|wbr)$/, M = /^(a|abbr|acronym|audio|b|bdi|bdo|big|br|button|canvas|cite|code|data|datalist|del|dfn|em|embed|i|iframe|img|input|ins|kbd|label|map|mark|meter|noscript|object|output|picture|progress|q|ruby|s|samp|slot|small|span|strong|sub|sup|svg|template|textarea|time|u|tt|var|video|wbr)$/;
function N(a, b = {}, e = {}, k = !1, t = !1, u) {
  if (null == a || "boolean" == typeof a) {
    return "";
  }
  const {pretty:l = !1, shallow:z = !1, renderRootComponent:A = !1, shallowHighOrder:d = !1, sortAttributes:f, allAttributes:n, xml:m, initialPadding:v = 0, closeVoidTags:P = !1} = b;
  let {lineLength:B = 40} = b;
  B -= v;
  let {nodeName:c, attributes:Q = {}} = a;
  var g = ["textarea", "pre"].includes(c), p = " ".repeat(v);
  const w = "string" == typeof l ? l : `  ${p}`;
  if ("object" != typeof a && !c) {
    return D(a);
  }
  if ("function" == typeof c) {
    if (!z || !k && A) {
      return p = I(a), c.prototype && "function" == typeof c.prototype.render ? (g = new c(p, e), g._disable = g.__x = !0, g.props = p, g.context = e, c.getDerivedStateFromProps ? g.state = {...g.state, ...c.getDerivedStateFromProps(g.props, g.state)} : g.componentWillMount && g.componentWillMount(), p = g.render(g.props, g.state, g.context), g.getChildContext && (e = {...e, ...g.getChildContext()})) : p = c(p, e), N(p, b, e, d, t, u);
    }
    c = c.displayName || c !== Function && c.name || O(c);
  }
  let h = "";
  ({f:x, b:k, a:u} = J(Q, c, {allAttributes:n, xml:m, c:t, sort:f, a:u}));
  if (l) {
    let y = `<${c}`.length;
    h = x.reduce((q, E) => {
      const H = y + 1 + E.length;
      if (H > B) {
        return y = w.length, `${q}\n${w}${E}`;
      }
      y = H;
      return `${q} ${E}`;
    }, "");
  } else {
    h = x.length ? " " + x.join(" ") : "";
  }
  h = `<${c}${h}>`;
  if (`${c}`.match(/[\s\n\\/='"\0<>]/)) {
    throw h;
  }
  var x = `${c}`.match(L);
  P && x && (h = h.replace(/>$/, " />"));
  let r = [];
  if (k) {
    l && (F(k) || k.length + R(h) > B) && (k = "\n" + w + `${k}`.replace(/(\n+)/g, "$1" + (w || "\t"))), h += k;
  } else {
    if (a.children) {
      let y = l && h.includes("\n");
      r = a.children.map(q => {
        if (null != q && !1 !== q && (q = N(q, b, e, !0, "svg" == c ? !0 : "foreignObject" == c ? !1 : t, u))) {
          return l && q.length + R(h) > B && (y = !0), q;
        }
      }).filter(Boolean);
      if (l && y && !g) {
        for (a = r.length; a--;) {
          r[a] = "\n" + w + `${r[a]}`.replace(/(\n+)/g, "$1" + (w || "\t"));
        }
      }
    }
  }
  if (r.length) {
    h += r.join("");
  } else {
    if (m) {
      return h.substring(0, h.length - 1) + " />";
    }
  }
  x || (a = r[r.length - 1], `${c}`.match(M) && (a ? !/>$/.test(a) : 1) || g || !l || !h.includes("\n") || (h += `\n${p}`), h += `</${c}>`);
  return h;
}
function O(a) {
  var b = (Function.prototype.toString.call(a).match(/^\s*function\s+([^( ]+)/) || "")[1];
  if (!b) {
    b = -1;
    for (let e = K.length; e--;) {
      if (K[e] === a) {
        b = e;
        break;
      }
    }
    0 > b && (b = K.push(a) - 1);
    b = `UnnamedComponent${b}`;
  }
  return b;
}
const R = a => {
  a = a.split("\n");
  return a[a.length - 1].length;
};
module.exports = (a, b = {}, e = {}) => {
  const {addDoctype:k, pretty:t} = b;
  a = N(a, b, e);
  return k ? `<!doctype html>${t ? "\n" : ""}${a}` : a;
};


//# sourceMappingURL=render.js.map