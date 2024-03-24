// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"node_modules/perfect-freehand/dist/esm/index.mjs":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
exports.getStroke = ae;
exports.getStrokeOutlinePoints = ce;
exports.getStrokePoints = me;
function $(e, t, u, x = h => h) {
  return e * x(.5 - t * (.5 - u));
}
function se(e) {
  return [-e[0], -e[1]];
}
function l(e, t) {
  return [e[0] + t[0], e[1] + t[1]];
}
function a(e, t) {
  return [e[0] - t[0], e[1] - t[1]];
}
function b(e, t) {
  return [e[0] * t, e[1] * t];
}
function he(e, t) {
  return [e[0] / t, e[1] / t];
}
function R(e) {
  return [e[1], -e[0]];
}
function B(e, t) {
  return e[0] * t[0] + e[1] * t[1];
}
function ue(e, t) {
  return e[0] === t[0] && e[1] === t[1];
}
function ge(e) {
  return Math.hypot(e[0], e[1]);
}
function de(e) {
  return e[0] * e[0] + e[1] * e[1];
}
function A(e, t) {
  return de(a(e, t));
}
function G(e) {
  return he(e, ge(e));
}
function ie(e, t) {
  return Math.hypot(e[1] - t[1], e[0] - t[0]);
}
function L(e, t, u) {
  let x = Math.sin(u),
    h = Math.cos(u),
    y = e[0] - t[0],
    n = e[1] - t[1],
    f = y * h - n * x,
    d = y * x + n * h;
  return [f + t[0], d + t[1]];
}
function K(e, t, u) {
  return l(e, b(a(t, e), u));
}
function ee(e, t, u) {
  return l(e, b(t, u));
}
var {
    min: C,
    PI: xe
  } = Math,
  pe = .275,
  V = xe + 1e-4;
function ce(e, t = {}) {
  let {
      size: u = 16,
      smoothing: x = .5,
      thinning: h = .5,
      simulatePressure: y = !0,
      easing: n = r => r,
      start: f = {},
      end: d = {},
      last: D = !1
    } = t,
    {
      cap: S = !0,
      easing: j = r => r * (2 - r)
    } = f,
    {
      cap: q = !0,
      easing: c = r => --r * r * r + 1
    } = d;
  if (e.length === 0 || u <= 0) return [];
  let p = e[e.length - 1].runningLength,
    g = f.taper === !1 ? 0 : f.taper === !0 ? Math.max(u, p) : f.taper,
    T = d.taper === !1 ? 0 : d.taper === !0 ? Math.max(u, p) : d.taper,
    te = Math.pow(u * x, 2),
    _ = [],
    M = [],
    H = e.slice(0, 10).reduce((r, i) => {
      let o = i.pressure;
      if (y) {
        let s = C(1, i.distance / u),
          W = C(1, 1 - s);
        o = C(1, r + (W - r) * (s * pe));
      }
      return (r + o) / 2;
    }, e[0].pressure),
    m = $(u, h, e[e.length - 1].pressure, n),
    U,
    X = e[0].vector,
    z = e[0].point,
    F = z,
    O = z,
    E = F,
    J = !1;
  for (let r = 0; r < e.length; r++) {
    let {
        pressure: i
      } = e[r],
      {
        point: o,
        vector: s,
        distance: W,
        runningLength: I
      } = e[r];
    if (r < e.length - 1 && p - I < 3) continue;
    if (h) {
      if (y) {
        let v = C(1, W / u),
          Z = C(1, 1 - v);
        i = C(1, H + (Z - H) * (v * pe));
      }
      m = $(u, h, i, n);
    } else m = u / 2;
    U === void 0 && (U = m);
    let le = I < g ? j(I / g) : 1,
      fe = p - I < T ? c((p - I) / T) : 1;
    m = Math.max(.01, m * Math.min(le, fe));
    let re = (r < e.length - 1 ? e[r + 1] : e[r]).vector,
      Y = r < e.length - 1 ? B(s, re) : 1,
      be = B(s, X) < 0 && !J,
      ne = Y !== null && Y < 0;
    if (be || ne) {
      let v = b(R(X), m);
      for (let Z = 1 / 13, w = 0; w <= 1; w += Z) O = L(a(o, v), o, V * w), _.push(O), E = L(l(o, v), o, V * -w), M.push(E);
      z = O, F = E, ne && (J = !0);
      continue;
    }
    if (J = !1, r === e.length - 1) {
      let v = b(R(s), m);
      _.push(a(o, v)), M.push(l(o, v));
      continue;
    }
    let oe = b(R(K(re, s, Y)), m);
    O = a(o, oe), (r <= 1 || A(z, O) > te) && (_.push(O), z = O), E = l(o, oe), (r <= 1 || A(F, E) > te) && (M.push(E), F = E), H = i, X = s;
  }
  let P = e[0].point.slice(0, 2),
    k = e.length > 1 ? e[e.length - 1].point.slice(0, 2) : l(e[0].point, [1, 1]),
    Q = [],
    N = [];
  if (e.length === 1) {
    if (!(g || T) || D) {
      let r = ee(P, G(R(a(P, k))), -(U || m)),
        i = [];
      for (let o = 1 / 13, s = o; s <= 1; s += o) i.push(L(r, P, V * 2 * s));
      return i;
    }
  } else {
    if (!(g || T && e.length === 1)) if (S) for (let i = 1 / 13, o = i; o <= 1; o += i) {
      let s = L(M[0], P, V * o);
      Q.push(s);
    } else {
      let i = a(_[0], M[0]),
        o = b(i, .5),
        s = b(i, .51);
      Q.push(a(P, o), a(P, s), l(P, s), l(P, o));
    }
    let r = R(se(e[e.length - 1].vector));
    if (T || g && e.length === 1) N.push(k);else if (q) {
      let i = ee(k, r, m);
      for (let o = 1 / 29, s = o; s < 1; s += o) N.push(L(i, k, V * 3 * s));
    } else N.push(l(k, b(r, m)), l(k, b(r, m * .99)), a(k, b(r, m * .99)), a(k, b(r, m)));
  }
  return _.concat(N, M.reverse(), Q);
}
function me(e, t = {}) {
  var q;
  let {
    streamline: u = .5,
    size: x = 16,
    last: h = !1
  } = t;
  if (e.length === 0) return [];
  let y = .15 + (1 - u) * .85,
    n = Array.isArray(e[0]) ? e : e.map(({
      x: c,
      y: p,
      pressure: g = .5
    }) => [c, p, g]);
  if (n.length === 2) {
    let c = n[1];
    n = n.slice(0, -1);
    for (let p = 1; p < 5; p++) n.push(K(n[0], c, p / 4));
  }
  n.length === 1 && (n = [...n, [...l(n[0], [1, 1]), ...n[0].slice(2)]]);
  let f = [{
      point: [n[0][0], n[0][1]],
      pressure: n[0][2] >= 0 ? n[0][2] : .25,
      vector: [1, 1],
      distance: 0,
      runningLength: 0
    }],
    d = !1,
    D = 0,
    S = f[0],
    j = n.length - 1;
  for (let c = 1; c < n.length; c++) {
    let p = h && c === j ? n[c].slice(0, 2) : K(S.point, n[c], y);
    if (ue(S.point, p)) continue;
    let g = ie(p, S.point);
    if (D += g, c < j && !d) {
      if (D < x) continue;
      d = !0;
    }
    S = {
      point: p,
      pressure: n[c][2] >= 0 ? n[c][2] : .5,
      vector: G(a(S.point, p)),
      distance: g,
      runningLength: D
    }, f.push(S);
  }
  return f[0].vector = ((q = f[1]) == null ? void 0 : q.vector) || [0, 0], f;
}
function ae(e, t = {}) {
  return ce(me(e, t), t);
}
var _e = exports.default = ae;
},{}],"script.js":[function(require,module,exports) {
"use strict";

var _perfectFreehand = require("perfect-freehand");
var canvas = document.getElementById('drawingCanvas');
var ctx = canvas.getContext('2d');

// Adjusting for device pixel ratio
var dpr = window.devicePixelRatio || 1;
canvas.width = window.innerWidth * dpr;
canvas.height = window.innerHeight * dpr;
canvas.style.width = window.innerWidth + 'px';
canvas.style.height = window.innerHeight + 'px';
ctx.scale(dpr, dpr);
var painting = false;
function startPosition(e) {
  painting = true;
  canvas.setPointerCapture(e.pointerId); // Capture pointer events for this canvas
  ctx.beginPath(); // Begin a new path

  // Adjusted calculation for starting coordinates
  var rect = canvas.getBoundingClientRect();
  var x = (e.clientX - rect.left) * (canvas.width / rect.width / dpr);
  var y = (e.clientY - rect.top) * (canvas.height / rect.height / dpr);
  ctx.moveTo(x, y); // Move to the starting point without drawing a line
}
function draw(e) {
  if (!painting) return;
  var rect = canvas.getBoundingClientRect();
  var x = (e.clientX - rect.left) * (canvas.width / rect.width / dpr);
  var y = (e.clientY - rect.top) * (canvas.height / rect.height / dpr);

  // Default line width for mouse, adjusted by pressure for pen
  console.log('Pressure:', e.pressure);
  var baseLineWidth = 5; // Base line width
  ctx.lineWidth = e.pointerType === 'pen' ? baseLineWidth * e.pressure : baseLineWidth;
  ctx.lineCap = 'round';
  ctx.lineTo(x, y); // Draw a line to the new position
  ctx.stroke();
  ctx.beginPath(); // Begin a new path to avoid connecting dots directly
  ctx.moveTo(x, y); // Move to this position to start the next line
}
function finishedPosition(e) {
  canvas.releasePointerCapture(e.pointerId); // Release pointer capture
  painting = false;
  ctx.beginPath(); // Prepare for a new path the next time the user draws
}
canvas.addEventListener('pointerdown', startPosition);
canvas.addEventListener('pointermove', draw);
canvas.addEventListener('pointerup', finishedPosition);
canvas.addEventListener('pointerleave', finishedPosition); // Optional, to handle the pen leaving the canvas
},{"perfect-freehand":"node_modules/perfect-freehand/dist/esm/index.mjs"}],"node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;
function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}
module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "52132" + '/');
  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);
    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);
          if (didAccept) {
            handled = true;
          }
        }
      });

      // Enable HMR for CSS by default.
      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });
      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }
    if (data.type === 'reload') {
      ws.close();
      ws.onclose = function () {
        location.reload();
      };
    }
    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }
    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}
function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);
  if (overlay) {
    overlay.remove();
  }
}
function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID;

  // html encode message and stack trace
  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}
function getParents(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return [];
  }
  var parents = [];
  var k, d, dep;
  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];
      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }
  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }
  return parents;
}
function hmrApply(bundle, asset) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }
  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}
function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }
  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }
  if (checkedAssets[id]) {
    return;
  }
  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);
  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }
  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}
function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};
  if (cached) {
    cached.hot.data = bundle.hotData;
  }
  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }
  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];
  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });
    return true;
  }
}
},{}]},{},["node_modules/parcel-bundler/src/builtins/hmr-runtime.js","script.js"], null)
//# sourceMappingURL=/script.75da7f30.js.map