'use strict';
const C = /acit|ex(?:s|g|n|p|$)|rph|ows|mnc|ntw|ine[ch]|zoo|^ord/i;
let D = a => `${a}`.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;"), F = a => 40 < `${a}`.length || -1 != `${a}`.indexOf("\n") || -1 !== `${a}`.indexOf("<");
const G = {};
function I(a) {
  const b = {...a.attributes, children:a.children};
  a = a.nodeName.defaultProps;
  if (void 0 !== a) {
    for (let f in a) {
      void 0 === b[f] && (b[f] = a[f]);
    }
  }
  return b;
}
;const J = (a, b, {allAttributes:f, xml:k, c:t, sort:u, a:l} = {}) => {
  let z;
  const A = Object.keys(a);
  u && A.sort();
  return {f:A.map(d => {
    var g = a[d];
    if ("children" != d && !d.match(/[\s\n\\/='"\0<>]/) && (f || !["key", "ref"].includes(d))) {
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
      if ("style" == d && g && "object" == typeof g) {
        {
          let m = "";
          for (var n in g) {
            let v = g[n];
            null != v && (m && (m += " "), m += G[n] || (G[n] = n.replace(/([A-Z])/g, "-$1").toLowerCase()), m += ": ", m += v, "number" == typeof v && !1 === C.test(n) && (m += "px"), m += ";");
          }
          g = m || void 0;
        }
      }
      if ("dangerouslySetInnerHTML" == d) {
        z = g && g.__html;
      } else {
        if ((g || 0 === g || "" === g) && "function" != typeof g) {
          if (!0 === g || "" === g) {
            if (g = d, !k) {
              return d;
            }
          }
          n = "";
          if ("value" == d) {
            if ("select" == b) {
              l = g;
              return;
            }
            "option" == b && l == g && (n = "selected ");
          }
          return `${n}${d}="${D(g)}"`;
        }
      }
    }
  }).filter(Boolean), b:z, a:l};
};
const K = [], L = /^(area|base|br|col|embed|hr|img|input|link|meta|param|source|track|wbr)$/, M = /^(a|abbr|acronym|audio|b|bdi|bdo|big|br|button|canvas|cite|code|data|datalist|del|dfn|em|embed|i|iframe|img|input|ins|kbd|label|map|mark|meter|noscript|object|output|picture|progress|q|ruby|s|samp|slot|small|span|strong|sub|sup|svg|template|textarea|time|u|tt|var|video|wbr)$/;
function N(a, b = {}, f = {}, k = !1, t = !1, u) {
  if (null == a || "boolean" == typeof a) {
    return "";
  }
  const {pretty:l = !1, shallow:z = !1, renderRootComponent:A = !1, shallowHighOrder:d = !1, sortAttributes:g, allAttributes:n, xml:m, initialPadding:v = 0, closeVoidTags:P = !1} = b;
  let {lineLength:B = 40} = b;
  B -= v;
  let {nodeName:c, attributes:Q = {}} = a;
  var e = ["textarea", "pre"].includes(c), p = " ".repeat(v);
  const w = "string" == typeof l ? l : `  ${p}`;
  if ("object" != typeof a && !c) {
    return D(a);
  }
  if ("function" == typeof c) {
    if (!z || !k && A) {
      return p = I(a), c.prototype && "function" == typeof c.prototype.render ? (e = new c(p, f), e._disable = e.__x = !0, e.props = p, e.context = f, c.getDerivedStateFromProps ? e.state = {...e.state, ...c.getDerivedStateFromProps(e.props, e.state)} : e.componentWillMount && e.componentWillMount(), p = e.render(e.props, e.state, e.context), e.getChildContext && (f = {...f, ...e.getChildContext()})) : p = c(p, f), N(p, b, f, d, t, u);
    }
    c = c.displayName || c !== Function && c.name || O(c);
  }
  let h = "";
  ({f:x, b:k, a:u} = J(Q, c, {allAttributes:n, xml:m, c:t, sort:g, a:u}));
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
    !e && l && (F(k) || k.length + R(h) > B) && (k = "\n" + w + `${k}`.replace(/(\n+)/g, "$1" + (w || "\t"))), h += k;
  } else {
    if (a.children) {
      let y = l && h.includes("\n");
      r = a.children.map(q => {
        if (null != q && !1 !== q && (q = N(q, b, f, !0, "svg" == c ? !0 : "foreignObject" == c ? !1 : t, u))) {
          return l && q.length + R(h) > B && (y = !0), q;
        }
      }).filter(Boolean);
      if (l && y && !e) {
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
  x || (a = r[r.length - 1], `${c}`.match(M) && (a ? !/>$/.test(a) : 1) || e || !l || !h.includes("\n") || (h += `\n${p}`), h += `</${c}>`);
  return h;
}
function O(a) {
  var b = (Function.prototype.toString.call(a).match(/^\s*function\s+([^( ]+)/) || "")[1];
  if (!b) {
    b = -1;
    for (let f = K.length; f--;) {
      if (K[f] === a) {
        b = f;
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
module.exports = (a, b = {}, f = {}) => {
  const {addDoctype:k, pretty:t} = b;
  a = N(a, b, f);
  return k ? `<!doctype html>${t ? "\n" : ""}${a}` : a;
};


//# sourceMappingURL=render.js.map