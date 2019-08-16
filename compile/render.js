'use strict';
const A = /acit|ex(?:s|g|n|p|$)|rph|ows|mnc|ntw|ine[ch]|zoo|^ord/i;
let B = a => `${a}`.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;"), D = a => 40 < `${a}`.length || -1 != `${a}`.indexOf("\n") || -1 !== `${a}`.indexOf("<");
const E = {};
function G(a) {
  const c = {...a.attributes, children:a.children};
  a = a.nodeName.defaultProps;
  if (void 0 !== a) {
    for (let e in a) {
      void 0 === c[e] && (c[e] = a[e]);
    }
  }
  return c;
}
;const H = (a, c, {allAttributes:e, xml:k, c:r, sort:u, a:l} = {}) => {
  let y;
  const z = Object.keys(a);
  u && z.sort();
  return {f:z.map(d => {
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
      r && d.match(/^xlink:?./) && (d = d.toLowerCase().replace(/^xlink:?/, "xlink:"));
      if ("style" == d && f && "object" == typeof f) {
        {
          let m = "";
          for (var n in f) {
            let t = f[n];
            null != t && (m && (m += " "), m += E[n] || (E[n] = n.replace(/([A-Z])/g, "-$1").toLowerCase()), m += ": ", m += t, "number" == typeof t && !1 === A.test(n) && (m += "px"), m += ";");
          }
          f = m || void 0;
        }
      }
      if ("dangerouslySetInnerHTML" == d) {
        y = f && f.__html;
      } else {
        if ((f || 0 === f || "" === f) && "function" != typeof f) {
          if (!0 === f || "" === f) {
            if (f = d, !k) {
              return d;
            }
          }
          n = "";
          if ("value" == d) {
            if ("select" == c) {
              l = f;
              return;
            }
            "option" == c && l == f && (n = "selected ");
          }
          return `${n}${d}="${B(f)}"`;
        }
      }
    }
  }).filter(Boolean), b:y, a:l};
};
const I = [], J = /^(area|base|br|col|embed|hr|img|input|link|meta|param|source|track|wbr)$/, K = /^(a|abbr|acronym|audio|b|bdi|bdo|big|br|button|canvas|cite|code|data|datalist|del|dfn|em|embed|i|iframe|img|input|ins|kbd|label|map|mark|meter|noscript|object|output|picture|progress|q|ruby|s|samp|slot|small|span|strong|sub|sup|svg|template|textarea|time|u|tt|var|video|wbr)$/;
function L(a, c = {}, e = {}, k = !1, r = !1, u) {
  if (null == a || "boolean" == typeof a) {
    return "";
  }
  const {pretty:l = !1, shallow:y = !1, renderRootComponent:z = !1, shallowHighOrder:d = !1, sortAttributes:f, allAttributes:n, xml:m, lineLength:t = 40, closeVoidTags:N = !1} = c;
  let {nodeName:b, attributes:O = {}} = a;
  var g = ["textarea", "pre"].includes(b);
  const v = "string" == typeof l ? l : "  ";
  if ("object" != typeof a && !b) {
    return B(a);
  }
  if ("function" == typeof b) {
    if (!y || !k && z) {
      return a = G(a), b.prototype && "function" == typeof b.prototype.render ? (g = new b(a, e), g._disable = g.__x = !0, g.props = a, g.context = e, b.getDerivedStateFromProps ? g.state = {...g.state, ...b.getDerivedStateFromProps(g.props, g.state)} : g.componentWillMount && g.componentWillMount(), a = g.render(g.props, g.state, g.context), g.getChildContext && (e = {...e, ...g.getChildContext()})) : a = b(a, e), L(a, c, e, d, r, u);
    }
    b = b.displayName || b !== Function && b.name || M(b);
  }
  let h = "";
  ({f:w, b:k, a:u} = H(O, b, {allAttributes:n, xml:m, c:r, sort:f, a:u}));
  if (l) {
    let x = `<${b}`.length;
    h = w.reduce((p, C) => {
      const F = x + 1 + C.length;
      if (F > t) {
        return x = v.length, `${p}\n${v}${C}`;
      }
      x = F;
      return `${p} ${C}`;
    }, "");
  } else {
    h = w.length ? " " + w.join(" ") : "";
  }
  h = `<${b}${h}>`;
  if (`${b}`.match(/[\s\n\\/='"\0<>]/)) {
    throw h;
  }
  var w = `${b}`.match(J);
  N && w && (h = h.replace(/>$/, " />"));
  let q = [];
  if (k) {
    l && (D(k) || k.length + P(h) > t) && (k = "\n" + v + `${k}`.replace(/(\n+)/g, "$1" + (v || "\t"))), h += k;
  } else {
    if (a.children) {
      let x = l && h.includes("\n");
      q = a.children.map(p => {
        if (null != p && !1 !== p && (p = L(p, c, e, !0, "svg" == b ? !0 : "foreignObject" == b ? !1 : r, u))) {
          return l && p.length + P(h) > t && (x = !0), p;
        }
      }).filter(Boolean);
      if (l && x && !g) {
        for (a = q.length; a--;) {
          q[a] = "\n" + v + `${q[a]}`.replace(/(\n+)/g, "$1" + (v || "\t"));
        }
      }
    }
  }
  if (q.length) {
    h += q.join("");
  } else {
    if (m) {
      return h.substring(0, h.length - 1) + " />";
    }
  }
  w || (a = q[q.length - 1], `${b}`.match(K) && (a ? !/>$/.test(a) : 1) || g || !l || !h.includes("\n") || (h += "\n"), h += `</${b}>`);
  return h;
}
function M(a) {
  var c = (Function.prototype.toString.call(a).match(/^\s*function\s+([^( ]+)/) || "")[1];
  if (!c) {
    c = -1;
    for (let e = I.length; e--;) {
      if (I[e] === a) {
        c = e;
        break;
      }
    }
    0 > c && (c = I.push(a) - 1);
    c = `UnnamedComponent${c}`;
  }
  return c;
}
const P = a => {
  a = a.split("\n");
  return a[a.length - 1].length;
};
module.exports = (a, c = {}, e = {}) => {
  const {addDoctype:k, pretty:r} = c;
  a = L(a, c, e);
  return k ? `<!doctype html>${r ? "\n" : ""}${a}` : a;
};


//# sourceMappingURL=render.js.map