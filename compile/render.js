'use strict';
const A = /acit|ex(?:s|g|n|p|$)|rph|ows|mnc|ntw|ine[ch]|zoo|^ord/i;
let B = a => `${a}`.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;"), D = a => 40 < `${a}`.length || -1 != `${a}`.indexOf("\n") || -1 !== `${a}`.indexOf("<");
const E = {};
function G(a) {
  const b = {...a.attributes, children:a.children};
  a = a.nodeName.defaultProps;
  if (void 0 !== a) {
    for (let e in a) {
      void 0 === b[e] && (b[e] = a[e]);
    }
  }
  return b;
}
;const H = (a, b, {allAttributes:e, xml:k, c:q, sort:t, a:l} = {}) => {
  let y;
  const z = Object.keys(a);
  t && z.sort();
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
      q && d.match(/^xlink:?./) && (d = d.toLowerCase().replace(/^xlink:?/, "xlink:"));
      if ("style" == d && f && "object" == typeof f) {
        {
          let m = "";
          for (var n in f) {
            let r = f[n];
            null != r && (m && (m += " "), m += E[n] || (E[n] = n.replace(/([A-Z])/g, "-$1").toLowerCase()), m += ": ", m += r, "number" == typeof r && !1 === A.test(n) && (m += "px"), m += ";");
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
            if ("select" == b) {
              l = f;
              return;
            }
            "option" == b && l == f && (n = "selected ");
          }
          return `${n}${d}="${B(f)}"`;
        }
      }
    }
  }).filter(Boolean), b:y, a:l};
};
const I = [], J = /^(area|base|br|col|embed|hr|img|input|link|meta|param|source|track|wbr)$/;
function K(a, b = {}, e = {}, k = !1, q = !1, t) {
  if (null == a || "boolean" == typeof a) {
    return "";
  }
  const {pretty:l = !1, shallow:y = !1, renderRootComponent:z = !1, shallowHighOrder:d = !1, sortAttributes:f, allAttributes:n, xml:m, lineLength:r = 40, closeVoidTags:M = !1} = b;
  let {nodeName:c, attributes:N = {}} = a;
  var g = ["textarea", "pre"].includes(c);
  const u = "string" == typeof l ? l : "  ";
  if ("object" != typeof a && !c) {
    return B(a);
  }
  if ("function" == typeof c) {
    if (!y || !k && z) {
      return a = G(a), c.prototype && "function" == typeof c.prototype.render ? (g = new c(a, e), g._disable = g.__x = !0, g.props = a, g.context = e, c.getDerivedStateFromProps ? g.state = {...g.state, ...c.getDerivedStateFromProps(g.props, g.state)} : g.componentWillMount && g.componentWillMount(), a = g.render(g.props, g.state, g.context), g.getChildContext && (e = {...e, ...g.getChildContext()})) : a = c(a, e), K(a, b, e, d, q, t);
    }
    c = c.displayName || c !== Function && c.name || L(c);
  }
  let h = "";
  ({f:v, b:k, a:t} = H(N, c, {allAttributes:n, xml:m, c:q, sort:f, a:t}));
  if (l) {
    let w = `<${c}`.length;
    h = v.reduce((p, C) => {
      const F = w + 1 + C.length;
      if (F > r) {
        return w = u.length, `${p}\n${u}${C}`;
      }
      w = F;
      return `${p} ${C}`;
    }, "");
  } else {
    h = v.length ? " " + v.join(" ") : "";
  }
  h = `<${c}${h}>`;
  if (`${c}`.match(/[\s\n\\/='"\0<>]/)) {
    throw h;
  }
  var v = `${c}`.match(J);
  M && v && (h = h.replace(/>$/, " />"));
  let x = [];
  if (k) {
    l && (D(k) || k.length + O(h) > r) && (k = "\n" + u + `${k}`.replace(/(\n+)/g, "$1" + (u || "\t"))), h += k;
  } else {
    if (a.children) {
      let w = l && ~h.indexOf("\n");
      x = a.children.map(p => {
        if (null != p && !1 !== p && (p = K(p, b, e, !0, "svg" == c ? !0 : "foreignObject" == c ? !1 : q, t))) {
          return l && p.length + O(h) > r && (w = !0), p;
        }
      }).filter(Boolean);
      if (l && w && !g) {
        for (a = x.length; a--;) {
          x[a] = "\n" + u + `${x[a]}`.replace(/(\n+)/g, "$1" + (u || "\t"));
        }
      }
    }
  }
  if (x.length) {
    h += x.join("");
  } else {
    if (m) {
      return h.substring(0, h.length - 1) + " />";
    }
  }
  v || (!g && l && ~h.indexOf("\n") && (h += "\n"), h += `</${c}>`);
  return h;
}
function L(a) {
  var b = (Function.prototype.toString.call(a).match(/^\s*function\s+([^( ]+)/) || "")[1];
  if (!b) {
    b = -1;
    for (let e = I.length; e--;) {
      if (I[e] === a) {
        b = e;
        break;
      }
    }
    0 > b && (b = I.push(a) - 1);
    b = `UnnamedComponent${b}`;
  }
  return b;
}
const O = a => {
  a = a.split("\n");
  return a[a.length - 1].length;
};
module.exports = (a, b = {}, e = {}) => {
  const {addDoctype:k, pretty:q} = b;
  a = K(a, b, e);
  return k ? `<!doctype html>${q ? "\n" : ""}${a}` : a;
};


//# sourceMappingURL=render.js.map