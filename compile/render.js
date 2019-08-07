'use strict';
const y = /acit|ex(?:s|g|n|p|$)|rph|ows|mnc|ntw|ine[ch]|zoo|^ord/i;
let z = a => `${a}`.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;"), C = a => 40 < `${a}`.length || -1 != `${a}`.indexOf("\n") || -1 !== `${a}`.indexOf("<");
const D = {};
function F(a) {
  const b = {...a.attributes, children:a.children};
  a = a.nodeName.defaultProps;
  if (void 0 !== a) {
    for (let e in a) {
      void 0 === b[e] && (b[e] = a[e]);
    }
  }
  return b;
}
;const G = (a, {allAttributes:b, xml:e, b:k, sort:q} = {}) => {
  let l;
  const x = Object.keys(a);
  q && x.sort();
  return {c:x.map(d => {
    var h = a[d];
    if ("children" != d && !d.match(/[\s\n\\/='"\0<>]/) && (b || !["key", "ref"].includes(d))) {
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
      k && d.match(/^xlink:?./) && (d = d.toLowerCase().replace(/^xlink:?/, "xlink:"));
      if ("style" == d && h && "object" == typeof h) {
        {
          let m = "";
          for (let p in h) {
            let r = h[p];
            null != r && (m && (m += " "), m += D[p] || (D[p] = p.replace(/([A-Z])/g, "-$1").toLowerCase()), m += ": ", m += r, "number" == typeof r && !1 === y.test(p) && (m += "px"), m += ";");
          }
          h = m || void 0;
        }
      }
      if ("dangerouslySetInnerHTML" == d) {
        l = h && h.__html;
      } else {
        if ((h || 0 === h || "" === h) && "function" != typeof h) {
          if (!0 === h || "" === h) {
            if (h = d, !e) {
              return d;
            }
          }
          return `${d}="${z(h)}"`;
        }
      }
    }
  }).filter(Boolean), a:l};
};
const H = [], I = /^(area|base|br|col|embed|hr|img|input|link|meta|param|source|track|wbr)$/;
function J(a, b = {}, e = {}, k = !1, q = !1) {
  if (null == a || "boolean" == typeof a) {
    return "";
  }
  const {pretty:l = !1, shallow:x = !1, renderRootComponent:d = !1, shallowHighOrder:h = !1, sortAttributes:m, allAttributes:p, xml:r, lineLength:A = 40, closeVoidTags:L = !1} = b;
  let {nodeName:c, attributes:M = {}} = a;
  var f = ["textarea", "pre"].includes(c);
  const t = "string" == typeof l ? l : "  ";
  if ("object" != typeof a && !c) {
    return z(a);
  }
  if ("function" == typeof c) {
    if (!x || !k && d) {
      return a = F(a), c.prototype && "function" == typeof c.prototype.render ? (f = new c(a, e), f._disable = f.__x = !0, f.props = a, f.context = e, c.getDerivedStateFromProps ? f.state = {...f.state, ...c.getDerivedStateFromProps(f.props, f.state)} : f.componentWillMount && f.componentWillMount(), a = f.render(f.props, f.state, f.context), f.getChildContext && (e = {...e, ...f.getChildContext()})) : a = c(a, e), J(a, b, e, h);
    }
    c = c.displayName || c !== Function && c.name || K(c);
  }
  let g = "";
  ({c:u, a:k} = G(M, {allAttributes:p, xml:r, b:q, sort:m}));
  if (l) {
    let v = `<${c}`.length;
    g = u.reduce((n, B) => {
      const E = v + 1 + B.length;
      if (E > A) {
        return v = t.length, `${n}\n${t}${B}`;
      }
      v = E;
      return `${n} ${B}`;
    }, "");
  } else {
    g = u.length ? " " + u.join(" ") : "";
  }
  g = `<${c}${g}>`;
  if (`${c}`.match(/[\s\n\\/='"\0<>]/)) {
    throw g;
  }
  var u = `${c}`.match(I);
  L && u && (g = g.replace(/>$/, " />"));
  let w = [];
  if (k) {
    l && (C(k) || k.length + N(g) > A) && (k = "\n" + t + `${k}`.replace(/(\n+)/g, "$1" + (t || "\t"))), g += k;
  } else {
    if (a.children) {
      let v = l && ~g.indexOf("\n");
      w = a.children.map(n => {
        if (null != n && !1 !== n && (n = J(n, b, e, !0, "svg" == c ? !0 : "foreignObject" == c ? !1 : q))) {
          return l && n.length + N(g) > A && (v = !0), n;
        }
      }).filter(Boolean);
      if (l && v && !f) {
        for (a = w.length; a--;) {
          w[a] = "\n" + t + `${w[a]}`.replace(/(\n+)/g, "$1" + (t || "\t"));
        }
      }
    }
  }
  if (w.length) {
    g += w.join("");
  } else {
    if (r) {
      return g.substring(0, g.length - 1) + " />";
    }
  }
  u || (!f && l && ~g.indexOf("\n") && (g += "\n"), g += `</${c}>`);
  return g;
}
function K(a) {
  var b = (Function.prototype.toString.call(a).match(/^\s*function\s+([^( ]+)/) || "")[1];
  if (!b) {
    b = -1;
    for (let e = H.length; e--;) {
      if (H[e] === a) {
        b = e;
        break;
      }
    }
    0 > b && (b = H.push(a) - 1);
    b = `UnnamedComponent${b}`;
  }
  return b;
}
const N = a => {
  a = a.split("\n");
  return a[a.length - 1].length;
};
module.exports = (a, b = {}, e = {}) => {
  const {addDoctype:k, pretty:q} = b;
  a = J(a, b, e);
  return k ? `<!doctype html>${q ? "\n" : ""}${a}` : a;
};


//# sourceMappingURL=render.js.map