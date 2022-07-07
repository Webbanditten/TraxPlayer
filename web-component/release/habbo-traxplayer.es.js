var __defProp2 = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp2(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a2, b2) => {
  for (var prop in b2 || (b2 = {}))
    if (__hasOwnProp.call(b2, prop))
      __defNormalProp(a2, prop, b2[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b2)) {
      if (__propIsEnum.call(b2, prop))
        __defNormalProp(a2, prop, b2[prop]);
    }
  return a2;
};
var __spreadProps = (a2, b2) => __defProps(a2, __getOwnPropDescs(b2));
var __async = (__this, __arguments, generator) => {
  return new Promise((resolve, reject) => {
    var fulfilled = (value) => {
      try {
        step(generator.next(value));
      } catch (e2) {
        reject(e2);
      }
    };
    var rejected = (value) => {
      try {
        step(generator.throw(value));
      } catch (e2) {
        reject(e2);
      }
    };
    var step = (x2) => x2.done ? resolve(x2.value) : Promise.resolve(x2.value).then(fulfilled, rejected);
    step((generator = generator.apply(__this, __arguments)).next());
  });
};
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t$2 = window.ShadowRoot && (window.ShadyCSS === void 0 || window.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, e$3 = Symbol(), n$5 = /* @__PURE__ */ new WeakMap();
class s$3 {
  constructor(t2, n2, s2) {
    if (this._$cssResult$ = true, s2 !== e$3)
      throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t2, this.t = n2;
  }
  get styleSheet() {
    let e2 = this.o;
    const s2 = this.t;
    if (t$2 && e2 === void 0) {
      const t2 = s2 !== void 0 && s2.length === 1;
      t2 && (e2 = n$5.get(s2)), e2 === void 0 && ((this.o = e2 = new CSSStyleSheet()).replaceSync(this.cssText), t2 && n$5.set(s2, e2));
    }
    return e2;
  }
  toString() {
    return this.cssText;
  }
}
const o$3 = (t2) => new s$3(typeof t2 == "string" ? t2 : t2 + "", void 0, e$3), r$2 = (t2, ...n2) => {
  const o2 = t2.length === 1 ? t2[0] : n2.reduce((e2, n3, s2) => e2 + ((t3) => {
    if (t3._$cssResult$ === true)
      return t3.cssText;
    if (typeof t3 == "number")
      return t3;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + t3 + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(n3) + t2[s2 + 1], t2[0]);
  return new s$3(o2, t2, e$3);
}, i$2 = (e2, n2) => {
  t$2 ? e2.adoptedStyleSheets = n2.map((t2) => t2 instanceof CSSStyleSheet ? t2 : t2.styleSheet) : n2.forEach((t2) => {
    const n3 = document.createElement("style"), s2 = window.litNonce;
    s2 !== void 0 && n3.setAttribute("nonce", s2), n3.textContent = t2.cssText, e2.appendChild(n3);
  });
}, S$1 = t$2 ? (t2) => t2 : (t2) => t2 instanceof CSSStyleSheet ? ((t3) => {
  let e2 = "";
  for (const n2 of t3.cssRules)
    e2 += n2.cssText;
  return o$3(e2);
})(t2) : t2;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var s$2;
const e$2 = window.trustedTypes, r$1 = e$2 ? e$2.emptyScript : "", h$1 = window.reactiveElementPolyfillSupport, o$2 = { toAttribute(t2, i2) {
  switch (i2) {
    case Boolean:
      t2 = t2 ? r$1 : null;
      break;
    case Object:
    case Array:
      t2 = t2 == null ? t2 : JSON.stringify(t2);
  }
  return t2;
}, fromAttribute(t2, i2) {
  let s2 = t2;
  switch (i2) {
    case Boolean:
      s2 = t2 !== null;
      break;
    case Number:
      s2 = t2 === null ? null : Number(t2);
      break;
    case Object:
    case Array:
      try {
        s2 = JSON.parse(t2);
      } catch (t3) {
        s2 = null;
      }
  }
  return s2;
} }, n$4 = (t2, i2) => i2 !== t2 && (i2 == i2 || t2 == t2), l$2 = { attribute: true, type: String, converter: o$2, reflect: false, hasChanged: n$4 };
class a$1 extends HTMLElement {
  constructor() {
    super(), this._$Ei = /* @__PURE__ */ new Map(), this.isUpdatePending = false, this.hasUpdated = false, this._$El = null, this.u();
  }
  static addInitializer(t2) {
    var i2;
    (i2 = this.h) !== null && i2 !== void 0 || (this.h = []), this.h.push(t2);
  }
  static get observedAttributes() {
    this.finalize();
    const t2 = [];
    return this.elementProperties.forEach((i2, s2) => {
      const e2 = this._$Ep(s2, i2);
      e2 !== void 0 && (this._$Ev.set(e2, s2), t2.push(e2));
    }), t2;
  }
  static createProperty(t2, i2 = l$2) {
    if (i2.state && (i2.attribute = false), this.finalize(), this.elementProperties.set(t2, i2), !i2.noAccessor && !this.prototype.hasOwnProperty(t2)) {
      const s2 = typeof t2 == "symbol" ? Symbol() : "__" + t2, e2 = this.getPropertyDescriptor(t2, s2, i2);
      e2 !== void 0 && Object.defineProperty(this.prototype, t2, e2);
    }
  }
  static getPropertyDescriptor(t2, i2, s2) {
    return { get() {
      return this[i2];
    }, set(e2) {
      const r2 = this[t2];
      this[i2] = e2, this.requestUpdate(t2, r2, s2);
    }, configurable: true, enumerable: true };
  }
  static getPropertyOptions(t2) {
    return this.elementProperties.get(t2) || l$2;
  }
  static finalize() {
    if (this.hasOwnProperty("finalized"))
      return false;
    this.finalized = true;
    const t2 = Object.getPrototypeOf(this);
    if (t2.finalize(), this.elementProperties = new Map(t2.elementProperties), this._$Ev = /* @__PURE__ */ new Map(), this.hasOwnProperty("properties")) {
      const t3 = this.properties, i2 = [...Object.getOwnPropertyNames(t3), ...Object.getOwnPropertySymbols(t3)];
      for (const s2 of i2)
        this.createProperty(s2, t3[s2]);
    }
    return this.elementStyles = this.finalizeStyles(this.styles), true;
  }
  static finalizeStyles(i2) {
    const s2 = [];
    if (Array.isArray(i2)) {
      const e2 = new Set(i2.flat(1 / 0).reverse());
      for (const i3 of e2)
        s2.unshift(S$1(i3));
    } else
      i2 !== void 0 && s2.push(S$1(i2));
    return s2;
  }
  static _$Ep(t2, i2) {
    const s2 = i2.attribute;
    return s2 === false ? void 0 : typeof s2 == "string" ? s2 : typeof t2 == "string" ? t2.toLowerCase() : void 0;
  }
  u() {
    var t2;
    this._$E_ = new Promise((t3) => this.enableUpdating = t3), this._$AL = /* @__PURE__ */ new Map(), this._$Eg(), this.requestUpdate(), (t2 = this.constructor.h) === null || t2 === void 0 || t2.forEach((t3) => t3(this));
  }
  addController(t2) {
    var i2, s2;
    ((i2 = this._$ES) !== null && i2 !== void 0 ? i2 : this._$ES = []).push(t2), this.renderRoot !== void 0 && this.isConnected && ((s2 = t2.hostConnected) === null || s2 === void 0 || s2.call(t2));
  }
  removeController(t2) {
    var i2;
    (i2 = this._$ES) === null || i2 === void 0 || i2.splice(this._$ES.indexOf(t2) >>> 0, 1);
  }
  _$Eg() {
    this.constructor.elementProperties.forEach((t2, i2) => {
      this.hasOwnProperty(i2) && (this._$Ei.set(i2, this[i2]), delete this[i2]);
    });
  }
  createRenderRoot() {
    var t2;
    const s2 = (t2 = this.shadowRoot) !== null && t2 !== void 0 ? t2 : this.attachShadow(this.constructor.shadowRootOptions);
    return i$2(s2, this.constructor.elementStyles), s2;
  }
  connectedCallback() {
    var t2;
    this.renderRoot === void 0 && (this.renderRoot = this.createRenderRoot()), this.enableUpdating(true), (t2 = this._$ES) === null || t2 === void 0 || t2.forEach((t3) => {
      var i2;
      return (i2 = t3.hostConnected) === null || i2 === void 0 ? void 0 : i2.call(t3);
    });
  }
  enableUpdating(t2) {
  }
  disconnectedCallback() {
    var t2;
    (t2 = this._$ES) === null || t2 === void 0 || t2.forEach((t3) => {
      var i2;
      return (i2 = t3.hostDisconnected) === null || i2 === void 0 ? void 0 : i2.call(t3);
    });
  }
  attributeChangedCallback(t2, i2, s2) {
    this._$AK(t2, s2);
  }
  _$EO(t2, i2, s2 = l$2) {
    var e2, r2;
    const h2 = this.constructor._$Ep(t2, s2);
    if (h2 !== void 0 && s2.reflect === true) {
      const n2 = ((r2 = (e2 = s2.converter) === null || e2 === void 0 ? void 0 : e2.toAttribute) !== null && r2 !== void 0 ? r2 : o$2.toAttribute)(i2, s2.type);
      this._$El = t2, n2 == null ? this.removeAttribute(h2) : this.setAttribute(h2, n2), this._$El = null;
    }
  }
  _$AK(t2, i2) {
    var s2, e2;
    const r2 = this.constructor, h2 = r2._$Ev.get(t2);
    if (h2 !== void 0 && this._$El !== h2) {
      const t3 = r2.getPropertyOptions(h2), n2 = t3.converter, l2 = (e2 = (s2 = n2 == null ? void 0 : n2.fromAttribute) !== null && s2 !== void 0 ? s2 : typeof n2 == "function" ? n2 : null) !== null && e2 !== void 0 ? e2 : o$2.fromAttribute;
      this._$El = h2, this[h2] = l2(i2, t3.type), this._$El = null;
    }
  }
  requestUpdate(t2, i2, s2) {
    let e2 = true;
    t2 !== void 0 && (((s2 = s2 || this.constructor.getPropertyOptions(t2)).hasChanged || n$4)(this[t2], i2) ? (this._$AL.has(t2) || this._$AL.set(t2, i2), s2.reflect === true && this._$El !== t2 && (this._$EC === void 0 && (this._$EC = /* @__PURE__ */ new Map()), this._$EC.set(t2, s2))) : e2 = false), !this.isUpdatePending && e2 && (this._$E_ = this._$Ej());
  }
  _$Ej() {
    return __async(this, null, function* () {
      this.isUpdatePending = true;
      try {
        yield this._$E_;
      } catch (t3) {
        Promise.reject(t3);
      }
      const t2 = this.scheduleUpdate();
      return t2 != null && (yield t2), !this.isUpdatePending;
    });
  }
  scheduleUpdate() {
    return this.performUpdate();
  }
  performUpdate() {
    var t2;
    if (!this.isUpdatePending)
      return;
    this.hasUpdated, this._$Ei && (this._$Ei.forEach((t3, i3) => this[i3] = t3), this._$Ei = void 0);
    let i2 = false;
    const s2 = this._$AL;
    try {
      i2 = this.shouldUpdate(s2), i2 ? (this.willUpdate(s2), (t2 = this._$ES) === null || t2 === void 0 || t2.forEach((t3) => {
        var i3;
        return (i3 = t3.hostUpdate) === null || i3 === void 0 ? void 0 : i3.call(t3);
      }), this.update(s2)) : this._$Ek();
    } catch (t3) {
      throw i2 = false, this._$Ek(), t3;
    }
    i2 && this._$AE(s2);
  }
  willUpdate(t2) {
  }
  _$AE(t2) {
    var i2;
    (i2 = this._$ES) === null || i2 === void 0 || i2.forEach((t3) => {
      var i3;
      return (i3 = t3.hostUpdated) === null || i3 === void 0 ? void 0 : i3.call(t3);
    }), this.hasUpdated || (this.hasUpdated = true, this.firstUpdated(t2)), this.updated(t2);
  }
  _$Ek() {
    this._$AL = /* @__PURE__ */ new Map(), this.isUpdatePending = false;
  }
  get updateComplete() {
    return this.getUpdateComplete();
  }
  getUpdateComplete() {
    return this._$E_;
  }
  shouldUpdate(t2) {
    return true;
  }
  update(t2) {
    this._$EC !== void 0 && (this._$EC.forEach((t3, i2) => this._$EO(i2, this[i2], t3)), this._$EC = void 0), this._$Ek();
  }
  updated(t2) {
  }
  firstUpdated(t2) {
  }
}
a$1.finalized = true, a$1.elementProperties = /* @__PURE__ */ new Map(), a$1.elementStyles = [], a$1.shadowRootOptions = { mode: "open" }, h$1 == null || h$1({ ReactiveElement: a$1 }), ((s$2 = globalThis.reactiveElementVersions) !== null && s$2 !== void 0 ? s$2 : globalThis.reactiveElementVersions = []).push("1.3.3");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var t$1;
const i$1 = globalThis.trustedTypes, s$1 = i$1 ? i$1.createPolicy("lit-html", { createHTML: (t2) => t2 }) : void 0, e$1 = `lit$${(Math.random() + "").slice(9)}$`, o$1 = "?" + e$1, n$3 = `<${o$1}>`, l$1 = document, h = (t2 = "") => l$1.createComment(t2), r = (t2) => t2 === null || typeof t2 != "object" && typeof t2 != "function", d = Array.isArray, u = (t2) => {
  var i2;
  return d(t2) || typeof ((i2 = t2) === null || i2 === void 0 ? void 0 : i2[Symbol.iterator]) == "function";
}, c = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, v = /-->/g, a = />/g, f = />|[ 	\n\r](?:([^\s"'>=/]+)([ 	\n\r]*=[ 	\n\r]*(?:[^ 	\n\r"'`<>=]|("|')|))|$)/g, _ = /'/g, m = /"/g, g = /^(?:script|style|textarea|title)$/i, p = (t2) => (i2, ...s2) => ({ _$litType$: t2, strings: i2, values: s2 }), $ = p(1), b = Symbol.for("lit-noChange"), w = Symbol.for("lit-nothing"), T = /* @__PURE__ */ new WeakMap(), x = (t2, i2, s2) => {
  var e2, o2;
  const n2 = (e2 = s2 == null ? void 0 : s2.renderBefore) !== null && e2 !== void 0 ? e2 : i2;
  let l2 = n2._$litPart$;
  if (l2 === void 0) {
    const t3 = (o2 = s2 == null ? void 0 : s2.renderBefore) !== null && o2 !== void 0 ? o2 : null;
    n2._$litPart$ = l2 = new N(i2.insertBefore(h(), t3), t3, void 0, s2 != null ? s2 : {});
  }
  return l2._$AI(t2), l2;
}, A = l$1.createTreeWalker(l$1, 129, null, false), C = (t2, i2) => {
  const o2 = t2.length - 1, l2 = [];
  let h2, r2 = i2 === 2 ? "<svg>" : "", d2 = c;
  for (let i3 = 0; i3 < o2; i3++) {
    const s2 = t2[i3];
    let o3, u3, p2 = -1, $2 = 0;
    for (; $2 < s2.length && (d2.lastIndex = $2, u3 = d2.exec(s2), u3 !== null); )
      $2 = d2.lastIndex, d2 === c ? u3[1] === "!--" ? d2 = v : u3[1] !== void 0 ? d2 = a : u3[2] !== void 0 ? (g.test(u3[2]) && (h2 = RegExp("</" + u3[2], "g")), d2 = f) : u3[3] !== void 0 && (d2 = f) : d2 === f ? u3[0] === ">" ? (d2 = h2 != null ? h2 : c, p2 = -1) : u3[1] === void 0 ? p2 = -2 : (p2 = d2.lastIndex - u3[2].length, o3 = u3[1], d2 = u3[3] === void 0 ? f : u3[3] === '"' ? m : _) : d2 === m || d2 === _ ? d2 = f : d2 === v || d2 === a ? d2 = c : (d2 = f, h2 = void 0);
    const y = d2 === f && t2[i3 + 1].startsWith("/>") ? " " : "";
    r2 += d2 === c ? s2 + n$3 : p2 >= 0 ? (l2.push(o3), s2.slice(0, p2) + "$lit$" + s2.slice(p2) + e$1 + y) : s2 + e$1 + (p2 === -2 ? (l2.push(void 0), i3) : y);
  }
  const u2 = r2 + (t2[o2] || "<?>") + (i2 === 2 ? "</svg>" : "");
  if (!Array.isArray(t2) || !t2.hasOwnProperty("raw"))
    throw Error("invalid template strings array");
  return [s$1 !== void 0 ? s$1.createHTML(u2) : u2, l2];
};
class E {
  constructor({ strings: t2, _$litType$: s2 }, n2) {
    let l2;
    this.parts = [];
    let r2 = 0, d2 = 0;
    const u2 = t2.length - 1, c2 = this.parts, [v2, a2] = C(t2, s2);
    if (this.el = E.createElement(v2, n2), A.currentNode = this.el.content, s2 === 2) {
      const t3 = this.el.content, i2 = t3.firstChild;
      i2.remove(), t3.append(...i2.childNodes);
    }
    for (; (l2 = A.nextNode()) !== null && c2.length < u2; ) {
      if (l2.nodeType === 1) {
        if (l2.hasAttributes()) {
          const t3 = [];
          for (const i2 of l2.getAttributeNames())
            if (i2.endsWith("$lit$") || i2.startsWith(e$1)) {
              const s3 = a2[d2++];
              if (t3.push(i2), s3 !== void 0) {
                const t4 = l2.getAttribute(s3.toLowerCase() + "$lit$").split(e$1), i3 = /([.?@])?(.*)/.exec(s3);
                c2.push({ type: 1, index: r2, name: i3[2], strings: t4, ctor: i3[1] === "." ? M : i3[1] === "?" ? H : i3[1] === "@" ? I : S });
              } else
                c2.push({ type: 6, index: r2 });
            }
          for (const i2 of t3)
            l2.removeAttribute(i2);
        }
        if (g.test(l2.tagName)) {
          const t3 = l2.textContent.split(e$1), s3 = t3.length - 1;
          if (s3 > 0) {
            l2.textContent = i$1 ? i$1.emptyScript : "";
            for (let i2 = 0; i2 < s3; i2++)
              l2.append(t3[i2], h()), A.nextNode(), c2.push({ type: 2, index: ++r2 });
            l2.append(t3[s3], h());
          }
        }
      } else if (l2.nodeType === 8)
        if (l2.data === o$1)
          c2.push({ type: 2, index: r2 });
        else {
          let t3 = -1;
          for (; (t3 = l2.data.indexOf(e$1, t3 + 1)) !== -1; )
            c2.push({ type: 7, index: r2 }), t3 += e$1.length - 1;
        }
      r2++;
    }
  }
  static createElement(t2, i2) {
    const s2 = l$1.createElement("template");
    return s2.innerHTML = t2, s2;
  }
}
function P(t2, i2, s2 = t2, e2) {
  var o2, n2, l2, h2;
  if (i2 === b)
    return i2;
  let d2 = e2 !== void 0 ? (o2 = s2._$Cl) === null || o2 === void 0 ? void 0 : o2[e2] : s2._$Cu;
  const u2 = r(i2) ? void 0 : i2._$litDirective$;
  return (d2 == null ? void 0 : d2.constructor) !== u2 && ((n2 = d2 == null ? void 0 : d2._$AO) === null || n2 === void 0 || n2.call(d2, false), u2 === void 0 ? d2 = void 0 : (d2 = new u2(t2), d2._$AT(t2, s2, e2)), e2 !== void 0 ? ((l2 = (h2 = s2)._$Cl) !== null && l2 !== void 0 ? l2 : h2._$Cl = [])[e2] = d2 : s2._$Cu = d2), d2 !== void 0 && (i2 = P(t2, d2._$AS(t2, i2.values), d2, e2)), i2;
}
class V {
  constructor(t2, i2) {
    this.v = [], this._$AN = void 0, this._$AD = t2, this._$AM = i2;
  }
  get parentNode() {
    return this._$AM.parentNode;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  p(t2) {
    var i2;
    const { el: { content: s2 }, parts: e2 } = this._$AD, o2 = ((i2 = t2 == null ? void 0 : t2.creationScope) !== null && i2 !== void 0 ? i2 : l$1).importNode(s2, true);
    A.currentNode = o2;
    let n2 = A.nextNode(), h2 = 0, r2 = 0, d2 = e2[0];
    for (; d2 !== void 0; ) {
      if (h2 === d2.index) {
        let i3;
        d2.type === 2 ? i3 = new N(n2, n2.nextSibling, this, t2) : d2.type === 1 ? i3 = new d2.ctor(n2, d2.name, d2.strings, this, t2) : d2.type === 6 && (i3 = new L(n2, this, t2)), this.v.push(i3), d2 = e2[++r2];
      }
      h2 !== (d2 == null ? void 0 : d2.index) && (n2 = A.nextNode(), h2++);
    }
    return o2;
  }
  m(t2) {
    let i2 = 0;
    for (const s2 of this.v)
      s2 !== void 0 && (s2.strings !== void 0 ? (s2._$AI(t2, s2, i2), i2 += s2.strings.length - 2) : s2._$AI(t2[i2])), i2++;
  }
}
class N {
  constructor(t2, i2, s2, e2) {
    var o2;
    this.type = 2, this._$AH = w, this._$AN = void 0, this._$AA = t2, this._$AB = i2, this._$AM = s2, this.options = e2, this._$Cg = (o2 = e2 == null ? void 0 : e2.isConnected) === null || o2 === void 0 || o2;
  }
  get _$AU() {
    var t2, i2;
    return (i2 = (t2 = this._$AM) === null || t2 === void 0 ? void 0 : t2._$AU) !== null && i2 !== void 0 ? i2 : this._$Cg;
  }
  get parentNode() {
    let t2 = this._$AA.parentNode;
    const i2 = this._$AM;
    return i2 !== void 0 && t2.nodeType === 11 && (t2 = i2.parentNode), t2;
  }
  get startNode() {
    return this._$AA;
  }
  get endNode() {
    return this._$AB;
  }
  _$AI(t2, i2 = this) {
    t2 = P(this, t2, i2), r(t2) ? t2 === w || t2 == null || t2 === "" ? (this._$AH !== w && this._$AR(), this._$AH = w) : t2 !== this._$AH && t2 !== b && this.$(t2) : t2._$litType$ !== void 0 ? this.T(t2) : t2.nodeType !== void 0 ? this.k(t2) : u(t2) ? this.S(t2) : this.$(t2);
  }
  M(t2, i2 = this._$AB) {
    return this._$AA.parentNode.insertBefore(t2, i2);
  }
  k(t2) {
    this._$AH !== t2 && (this._$AR(), this._$AH = this.M(t2));
  }
  $(t2) {
    this._$AH !== w && r(this._$AH) ? this._$AA.nextSibling.data = t2 : this.k(l$1.createTextNode(t2)), this._$AH = t2;
  }
  T(t2) {
    var i2;
    const { values: s2, _$litType$: e2 } = t2, o2 = typeof e2 == "number" ? this._$AC(t2) : (e2.el === void 0 && (e2.el = E.createElement(e2.h, this.options)), e2);
    if (((i2 = this._$AH) === null || i2 === void 0 ? void 0 : i2._$AD) === o2)
      this._$AH.m(s2);
    else {
      const t3 = new V(o2, this), i3 = t3.p(this.options);
      t3.m(s2), this.k(i3), this._$AH = t3;
    }
  }
  _$AC(t2) {
    let i2 = T.get(t2.strings);
    return i2 === void 0 && T.set(t2.strings, i2 = new E(t2)), i2;
  }
  S(t2) {
    d(this._$AH) || (this._$AH = [], this._$AR());
    const i2 = this._$AH;
    let s2, e2 = 0;
    for (const o2 of t2)
      e2 === i2.length ? i2.push(s2 = new N(this.M(h()), this.M(h()), this, this.options)) : s2 = i2[e2], s2._$AI(o2), e2++;
    e2 < i2.length && (this._$AR(s2 && s2._$AB.nextSibling, e2), i2.length = e2);
  }
  _$AR(t2 = this._$AA.nextSibling, i2) {
    var s2;
    for ((s2 = this._$AP) === null || s2 === void 0 || s2.call(this, false, true, i2); t2 && t2 !== this._$AB; ) {
      const i3 = t2.nextSibling;
      t2.remove(), t2 = i3;
    }
  }
  setConnected(t2) {
    var i2;
    this._$AM === void 0 && (this._$Cg = t2, (i2 = this._$AP) === null || i2 === void 0 || i2.call(this, t2));
  }
}
class S {
  constructor(t2, i2, s2, e2, o2) {
    this.type = 1, this._$AH = w, this._$AN = void 0, this.element = t2, this.name = i2, this._$AM = e2, this.options = o2, s2.length > 2 || s2[0] !== "" || s2[1] !== "" ? (this._$AH = Array(s2.length - 1).fill(new String()), this.strings = s2) : this._$AH = w;
  }
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t2, i2 = this, s2, e2) {
    const o2 = this.strings;
    let n2 = false;
    if (o2 === void 0)
      t2 = P(this, t2, i2, 0), n2 = !r(t2) || t2 !== this._$AH && t2 !== b, n2 && (this._$AH = t2);
    else {
      const e3 = t2;
      let l2, h2;
      for (t2 = o2[0], l2 = 0; l2 < o2.length - 1; l2++)
        h2 = P(this, e3[s2 + l2], i2, l2), h2 === b && (h2 = this._$AH[l2]), n2 || (n2 = !r(h2) || h2 !== this._$AH[l2]), h2 === w ? t2 = w : t2 !== w && (t2 += (h2 != null ? h2 : "") + o2[l2 + 1]), this._$AH[l2] = h2;
    }
    n2 && !e2 && this.C(t2);
  }
  C(t2) {
    t2 === w ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t2 != null ? t2 : "");
  }
}
class M extends S {
  constructor() {
    super(...arguments), this.type = 3;
  }
  C(t2) {
    this.element[this.name] = t2 === w ? void 0 : t2;
  }
}
const k = i$1 ? i$1.emptyScript : "";
class H extends S {
  constructor() {
    super(...arguments), this.type = 4;
  }
  C(t2) {
    t2 && t2 !== w ? this.element.setAttribute(this.name, k) : this.element.removeAttribute(this.name);
  }
}
class I extends S {
  constructor(t2, i2, s2, e2, o2) {
    super(t2, i2, s2, e2, o2), this.type = 5;
  }
  _$AI(t2, i2 = this) {
    var s2;
    if ((t2 = (s2 = P(this, t2, i2, 0)) !== null && s2 !== void 0 ? s2 : w) === b)
      return;
    const e2 = this._$AH, o2 = t2 === w && e2 !== w || t2.capture !== e2.capture || t2.once !== e2.once || t2.passive !== e2.passive, n2 = t2 !== w && (e2 === w || o2);
    o2 && this.element.removeEventListener(this.name, this, e2), n2 && this.element.addEventListener(this.name, this, t2), this._$AH = t2;
  }
  handleEvent(t2) {
    var i2, s2;
    typeof this._$AH == "function" ? this._$AH.call((s2 = (i2 = this.options) === null || i2 === void 0 ? void 0 : i2.host) !== null && s2 !== void 0 ? s2 : this.element, t2) : this._$AH.handleEvent(t2);
  }
}
class L {
  constructor(t2, i2, s2) {
    this.element = t2, this.type = 6, this._$AN = void 0, this._$AM = i2, this.options = s2;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t2) {
    P(this, t2);
  }
}
const z = window.litHtmlPolyfillSupport;
z == null || z(E, N), ((t$1 = globalThis.litHtmlVersions) !== null && t$1 !== void 0 ? t$1 : globalThis.litHtmlVersions = []).push("2.2.6");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var l, o;
class s extends a$1 {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    var t2, e2;
    const i2 = super.createRenderRoot();
    return (t2 = (e2 = this.renderOptions).renderBefore) !== null && t2 !== void 0 || (e2.renderBefore = i2.firstChild), i2;
  }
  update(t2) {
    const i2 = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t2), this._$Do = x(i2, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    var t2;
    super.connectedCallback(), (t2 = this._$Do) === null || t2 === void 0 || t2.setConnected(true);
  }
  disconnectedCallback() {
    var t2;
    super.disconnectedCallback(), (t2 = this._$Do) === null || t2 === void 0 || t2.setConnected(false);
  }
  render() {
    return b;
  }
}
s.finalized = true, s._$litElement$ = true, (l = globalThis.litElementHydrateSupport) === null || l === void 0 || l.call(globalThis, { LitElement: s });
const n$2 = globalThis.litElementPolyfillSupport;
n$2 == null || n$2({ LitElement: s });
((o = globalThis.litElementVersions) !== null && o !== void 0 ? o : globalThis.litElementVersions = []).push("3.2.1");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const n$1 = (n2) => (e2) => typeof e2 == "function" ? ((n3, e3) => (window.customElements.define(n3, e3), e3))(n2, e2) : ((n3, e3) => {
  const { kind: t2, elements: i2 } = e3;
  return { kind: t2, elements: i2, finisher(e4) {
    window.customElements.define(n3, e4);
  } };
})(n2, e2);
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const i = (i2, e2) => e2.kind === "method" && e2.descriptor && !("value" in e2.descriptor) ? __spreadProps(__spreadValues({}, e2), { finisher(n2) {
  n2.createProperty(e2.key, i2);
} }) : { kind: "field", key: Symbol(), placement: "own", descriptor: {}, originalKey: e2.key, initializer() {
  typeof e2.initializer == "function" && (this[e2.key] = e2.initializer.call(this));
}, finisher(n2) {
  n2.createProperty(e2.key, i2);
} };
function e(e2) {
  return (n2, t2) => t2 !== void 0 ? ((i2, e3, n3) => {
    e3.constructor.createProperty(n3, i2);
  })(e2, n2, t2) : i(e2, n2);
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function t(t2) {
  return e(__spreadProps(__spreadValues({}, t2), { state: true }));
}
/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var n;
((n = window.HTMLSlotElement) === null || n === void 0 ? void 0 : n.prototype.assignedElements) != null ? (o2, n2) => o2.assignedElements(n2) : (o2, n2) => o2.assignedNodes(n2).filter((o3) => o3.nodeType === Node.ELEMENT_NODE);
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
console.warn("The main 'lit-element' module entrypoint is deprecated. Please update your imports to use the 'lit' package: 'lit' and 'lit/decorators.ts' or import from 'lit-element/lit-element.ts'. See https://lit.dev/msg/deprecated-import-path for more information.");
const styles = r$2`
  #trax-player .volumecontainer {
    position: relative;
    display: inline-block;
    left: 46px;
    width: 62px;
    top: 6px;
  }

  /* The slider itself */

  #trax-player .volume {
    -webkit-appearance: none;
    appearance: none;
    width: 62px;
    top: -4px;
    background: transparent;
    outline: none;
    width: 62px;
    height: 8px;
    background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAD4AAAAICAYAAACh4kz0AAAAPklEQVR42mNgQID/IwSjgP8lZQUjAiN7Hl1w2GJ0z8M5HR0ThzVG9iuGxzdt2jRsMVaPj8SkPmILtxFZnQEAq8le3YS5TpkAAAAASUVORK5CYII=);
    background-repeat: no-repeat;
  }

  /* The slider handle (use -webkit- (Chrome, Opera, Safari, Edge) and -moz- (Firefox) to override default look) */

  #trax-player .volume::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 8px;
    height: 12px;
    border: 0;
    background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAMCAYAAABfnvydAAAAPElEQVR42mNggID/ODBEsqNjIlYMUwTmbNq0CYVGUQASBAFkGoRJVwAyFkaTrgCvIwn6gqhwwKcAb1ADAKKb0PBPhOk5AAAAAElFTkSuQmCC);
    cursor: pointer;
  }

  #trax-player .volume::-moz-range-thumb {
    width: 8px;
    height: 12px;
    border: 0;
    background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAMCAYAAABfnvydAAAAPElEQVR42mNggID/ODBEsqNjIlYMUwTmbNq0CYVGUQASBAFkGoRJVwAyFkaTrgCvIwn6gqhwwKcAb1ADAKKb0PBPhOk5AAAAAElFTkSuQmCC);
    cursor: pointer;
  }

  #trax-player {
    width: 209px;
    position: relative;
    text-align: left;
    margin-bottom: 10px;
    font-smooth: never;
    -webkit-font-smoothing: subpixel-antialiased;
    image-rendering: optimizeSpeed;
    image-rendering: -moz-crisp-edges;
    image-rendering: -o-crisp-edges;
    image-rendering: -webkit-optimize-contrast;
    image-rendering: pixelated;
    image-rendering: optimize-contrast;
    -ms-interpolation-mode: nearest-neighbor;
  }

  #trax-player .display {
    background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAANEAAAAjCAYAAAAKYO/9AAAAoElEQVR42u3dsQ2AIBRFUUa2MNYOYm3hEA7gUlhDvgbRwuKQnAbq2/JSKk8GmoQnj9MANIhCqh+BC1FIxeWyzcCNKCQBQWdIIgIRwY8j2o8VqIgIRAQiAhGBiEQEIgIRgYhARCICEYGIQEQgIhGBiEBEICIQkYhARCAiEBGISEQgIvhVRMDDf+eEBP1/cVuFgJerEPaJ4IN9Ikt50LmUdwJw/+GiroXQ8QAAAABJRU5ErkJggg==);
    height: 35px;
    background-repeat: no-repeat;
    font-family: Verdana, Geneva, Tahoma, sans-serif;
    font-size: 10px;
    color: #000;
  }

  #trax-player .display-inner {
    padding-left: 7px;
    padding-right: 9px;
    padding-top: 4px;
  }

  #trax-player .time {
    float: right;
    margin-top: -13px;
  }

  #trax-player .time .length {
    color: #9eac82;
    padding-left: 6px;
  }

  #trax-player .loading {
    background-image: url(data:image/gif;base64,R0lGODlhPwASAPMAAAAAAAAAABMVESYoIUdMPmNpVnyEbJCafqKsja+6mbjEob7KpgAAAAAAAAAAAAAAACH5BAkKAAAAIf8LTkVUU0NBUEUyLjADAQAAACwAAAAAPwASAAAEszCERau9VqmV0kLIchyLYSxFsRDEMgyLICwSPdV4ANRYf2kcD0hEMqFULBdMZmvmbACfdEqtVncTq3a7lWC54HDPKy6bKV9rlsJr2rI3Nntd9bapazhNrr/F6Wo6XHl8EnF7f4lcaXUVfXyQj3uBjHg8l4WScIBTZGefi3egoxd2nKSknqirF19PT0wvKy0pJScjHyEdC0Bhpk5+TbEwSbVGuEO7vWBeAM7P0NHS09TV1tQRACH5BAkKAAAALAAAAAA/ABIAAASzMIQl6ax16c37VsqSJAuCLMexGMZSFAtBLMOwCIIFYFdveUAPSEQyoVQsF0xGs+F0wah0SqXuJtWsViu5br9gYDdMLmu8Vawm87NgL+u1mtplT9VvSjzvg2/HXBt8En5wfW1ZaHSCe416hXqRdAGKdxmXe5h5iJMAZp9flaCjHXVzpKhQqascXk81MTMvKy0pJScjC0NgPD88rjmwTLNJtka5u1+9y5QAzs/Q0dLT1NXW1BEAIfkECQoAAAAsAAAAAD8AEgAABLAwhCXprPhqu7r/4KcoS5IsCLIcx2IYS1EAGVffW6iDY3mmq9YrNtsZj8hkkjZROp9PAoEJrVp1UsB1y+0ABAJns1MhNyVnCtn8HAy+YeU4TV9vLlW39jm3o9VqeBgcTwBuYh51gXaAeIBJYIYDYmWVfopnY5ACe12ehVKfokYSAKGjqB+lqawgADIuMCwoKiYLPVY4Nne8rwWxQbQ+tyS5vLvIGQDLzM3Oz9DR0tPSEQAh+QQJCgAAACwAAAAAPwASAAAErZCQNcYSYoWg+e7gJ3rkYp5oiirKkiSARFlYWI52/ql8yrqwnnBILBYBhYJxyWwiEEhlc0pVPQHVrNYEMBiWnNMO1Al7TOaw8XDofo1qswY9n9/qTDaWGadvRH52Z2NGAGxgYoF2gXJyRl6GB2A7lH6VjoREkFucUwBPnaFCSZ8IoqcppKirKQAvCz9UOLM3tSA1FQsSrgmwLbK2tDoluBa7AMjJysvMzc7P0M4RACH5BAkKAAAALAAAAAA/ABIAAASyEKF1zjJmlbIIWcOwCMISBCZ6puzqqvAiz7QMSJSFaZwHiqRW7CUsrmpIAHLJbDqfT0AiAa1ar8kpdsttKrvg8AKgUFhRsyMrhVbJ2ugr2VyNt01vPH6o337PaXknLoJ7bmpVf3WBe4WNd3dVZYpQg2+RMJB5a5IKlGKgUJ+hpDVTo6Wpp6msS6g0RLFDsyxBIR0fGxcZFQsSr2m0skYxtiI+uju9vwDNzs/Q0dLT1NXTEQA7);
    background-position: center;
    width: 100%;
    top: 10px;
    background-repeat: no-repeat;
    height: 18px;
    position: absolute;
  }

  #trax-player .volumecontainer .volume-indicator {
    width: 62px;
    height: 9px;
    background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAD4AAAAJCAYAAABqvp9RAAAAcElEQVR42mNgGHrgPxompA5dDKfiwe7J/x0dE8EYj3vxyf8nJoQGoydxeRyuF488Cvs/gRAabJ7E6TGYOJ4U8R/F49gMH8SeJMfj/2ntcXp4knoxTmZSHyhPUi2PE1O4DSZPUr1UZyDV44NIjOR6HADFOoBhugUZaAAAAABJRU5ErkJggg==);
    background-repeat: no-repeat;
  }

  #trax-player .volumecontainer .volume-indicator-filled {
    width: 62px;
    height: 9px;
    position: relative;
    overflow: hidden;
  }

  #trax-player .volumecontainer .volume-indicator-filled-bg {
    height: 9px;
    width: 62px;
    position: absolute;
    background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAD4AAAAJCAYAAABqvp9RAAAAaElEQVR42tWVWwoAIAgEvf+lt6+CBB+F1bYQhFo0Zibyn6BGFKdtZjA7JLqc83p+ZDLECGmBj7WOf5ojyBAbpAmm5ZQ6zM2JIXfAcRr8BmTdjW+W+ivIsjeeaW5MkOVdXVbBiWzL/3gDO9LtITnoaoIAAAAASUVORK5CYII=);
    background-repeat: no-repeat;
    background-size: 62px 9px;
  }

  #trax-player .music-activity {
    background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAZCAYAAABzVH1EAAAAbklEQVR42mNgQID/QxSjgP8lZQVDEiN7Bl1wyGB0z8A5QdXu/9WjxWjGLi91/p8XqYKXXeqm/T9XSopo9qhHRj0y6pFRj4x6ZHB4ZNhUiEMZD88YGc3sox4Z9cioR0Y9MuqRkd5EGTajKMNiXAsANqlsTHMjdyUAAAAASUVORK5CYII=);
    width: 50px;
    height: 25px;
    float: right;
    position: relative;
    top: 6px;
  }

  #trax-player .music-activity.playing {
    background: url(data:image/gif;base64,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);
  }

  #trax-player .control button {
    background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAAZCAYAAADE6YVjAAAAvklEQVR42mNgQAX/qYixgv8lZQVUw9gsQpekCGOzCEXw9u37/9EBSIwUjM0iDAs2bdpEEe7omPgf2VwUS9AtgHmfZpaA+Lat6mBMqmUkWeK7RR+MSbWMLEtItYxkSypeh8IxsZbhtQSUuvBZQqxlVLEE2SJ0y8i2BD1ucGGyLSEGU+wTYg0HYZDhVLMEl+FkRzwphlNkCbGGk2UJqYaTbAlMISmGk2wJTeoTmABIAaWYqCqYFnU83VorNG13AQCkIxDhwZjMKgAAAABJRU5ErkJggg==);
    width: 25px;
    font-size: 0px;
    border: 0px;
    margin-top: 6px;
    cursor: pointer;
    height: 25px;
  }

  #trax-player .control {
    float: left;
    position: relative;
  }

  #trax-player .control button.playing {
    background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAAZCAYAAADE6YVjAAAAmklEQVR42mNgQAX/qYixgv8lZQVUw9gsQpekCGOzCEXw9u37/9EBSIwUjM0iDAs2bdpEEe7omPgf2VwUS6hhAcmWkBIPZFkC4nsnJBCNkS0iyZLk+nqiMUWWTF2zhiAmyRJQ6hrellA1TrBZQvWIH7WEIktokuORLYEpJBaD1JNsCc1KYZpbAhMAKaAUE1UF06KOp1trhabtLgCZHhIhlzCPLwAAAABJRU5ErkJggg==);
  }
`;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __decorateClass = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc(target, key) : target;
  for (var i2 = decorators.length - 1, decorator; i2 >= 0; i2--)
    if (decorator = decorators[i2])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result)
    __defProp(target, key, result);
  return result;
};
let TraxPlayer = class extends s {
  constructor() {
    super();
    this.songUrl = "";
    this.sampleUrl = "";
    this._volume = 0.5;
    this._title = "";
    this._author = "";
    this._samples = new Array();
    this._tracks = new Array();
    this._traxLengthInSeconds = 0;
    this._traxLengthAsText = "";
    this._ready = false;
    this._playing = false;
    this._timeInSeconds = 0;
    this._timeAsText = "";
    this._position = 0;
    this._time = 0;
    this._ticker = 0;
    for (var i2 = 0; i2 < 4; i2++) {
      this._tracks.push({
        player: new Audio(),
        timeLeft: 0,
        blocks: 0,
        sample: 0,
        playlist: []
      });
    }
  }
  render() {
    return $`
      <div class="trax-player" id="trax-player">
        <div class="display">
          ${!this._ready ? $`<div class="loading"></div>` : ""}
          <div class="display-inner">
            <div class="title">${this._ready ? this._title : ""}</div>
            <div class="author">${this._ready ? this._author : ""}</div>
            <div class="time">
              ${this._playing ? this._timeAsText : ""}
              <span class="length"
                >${this._ready ? this._traxLengthAsText : ""}</span
              >
            </div>
          </div>
        </div>
        <div class="control">
          <button
            class="play-btn ${this._playing ? "playing" : ""}"
            @click=${this._play}
          >
            Play
          </button>
        </div>
        <div class="volumecontainer">
          <div class="volume-indicator">
            <div
              class="volume-indicator-filled"
              style="width: ${62 * this._volume + "px"}"
            >
              <div class="volume-indicator-filled-bg"></div>
            </div>
          </div>
          <input
            type="range"
            min="0"
            max="100"
            .value=${this._volume * 100}
            class="volume"
            @input="${this._setVolume}"
          />
        </div>
        <div class="music-activity ${this._playing ? "playing" : ""}"></div>
      </div>
    `;
  }
  firstUpdated() {
    return __async(this, null, function* () {
      yield new Promise((r2) => setTimeout(r2, 0));
      yield this._preload();
    });
  }
  _fetchSong() {
    return __async(this, null, function* () {
      var song = "status=0&name=Too lost in the lido&author=Patrick&track1=317,4;408,7;0,1;410,16;413,4;406,4;410,8;412,4&track2=0,2;321,2;443,22;91,2;317,8;443,8;412,2;0,2&track3=0,3;320,2;0,7;414,4;445,4;412,2;323,2;412,4;96,2;412,2;414,4;445,7;448,1;317,4&track4=0,3;324,2;0,6;448,1;0,6;96,2;322,4;96,2;99,2;322,4;412,2;0,2;322,2;96,2;322,2;0,1;324,2;0,3";
      var urlSearchParams = new URLSearchParams("?" + song);
      var track1 = urlSearchParams.get("track1");
      var track2 = urlSearchParams.get("track2");
      var track3 = urlSearchParams.get("track3");
      var track4 = urlSearchParams.get("track4");
      this._title = urlSearchParams.get("name");
      this._author = urlSearchParams.get("author");
      return new Promise((resolve) => {
        resolve([
          this._getTrack(track1),
          this._getTrack(track2),
          this._getTrack(track3),
          this._getTrack(track4)
        ]);
      });
    });
  }
  _getTrack(sample) {
    let track = new Array();
    sample.split(";").forEach((sample2) => {
      const samplePiece = sample2.split(",")[0];
      const blocks = sample2.split(",")[1];
      track.push({ blocks: parseInt(blocks), piece: parseInt(samplePiece) });
    });
    return track;
  }
  _getUniqueSamples(tracks) {
    var flags = new Array();
    var output = new Array();
    for (var t2 = 0; t2 < tracks.length; t2++) {
      for (var i2 = 0; i2 < tracks[t2].length; i2++) {
        if (flags[tracks[t2][i2].piece])
          continue;
        flags[tracks[t2][i2].piece] = true;
        output.push(tracks[t2][i2]);
      }
    }
    return output;
  }
  _getSampleLength(duration) {
    console.log(duration);
    var result = duration * 1e3;
    if (result < 2100) {
      return 1;
    }
    if (result < 4100) {
      return 2;
    }
    if (result < 6100) {
      return 3;
    }
    return 4;
  }
  _getSampleUrl(sampleId) {
    return this.sampleUrl + "sound_machine_sample_" + sampleId + ".mp3";
  }
  _getDuration(sample) {
    return __async(this, null, function* () {
      var _self = this;
      return new Promise(function(resolve) {
        var audio = new Audio();
        audio.addEventListener("loadedmetadata", function() {
          resolve({
            sampleLength: _self._getSampleLength(audio.duration),
            sample,
            audioObj: audio,
            src: audio.src
          });
        });
        audio.src = _self._getSampleUrl(sample.piece);
      });
    });
  }
  _preload() {
    return __async(this, null, function* () {
      console.log(`SongUrl: ${this.songUrl}, sampleUrl: ${this.sampleUrl}`);
      var _self = this;
      try {
        var tracks = yield this._fetchSong();
        console.log("Song loaded, loading samples");
        console.log("TRACKS");
        console.log(tracks);
        var uniqueSamples = this._getUniqueSamples(tracks).map(function(sample) {
          return _self._getDuration(sample);
        });
        Promise.all(uniqueSamples).then(function(richSamples) {
          console.log(richSamples);
          for (var i2 = 0; i2 < richSamples.length; i2++) {
            _self._samples[richSamples[i2].sample.piece] = richSamples[i2];
          }
          console.log("All samples loaded");
          for (var i2 = 0; i2 < tracks.length; i2++) {
            var actualTrack = [];
            for (var t2 = 0; t2 < tracks[i2].length; t2++) {
              if (!_self._samples[tracks[i2][t2].piece]) {
                console.log("NOT FOUND: " + tracks[i2][t2].piece);
              }
              var repeat = tracks[i2][t2].blocks / _self._samples[tracks[i2][t2].piece].sampleLength;
              for (var x2 = 0; x2 < repeat; x2++) {
                actualTrack.push(tracks[i2][t2].piece);
                for (var l2 = 0; l2 < _self._samples[tracks[i2][t2].piece].sampleLength - 1; l2++) {
                  actualTrack.push("0");
                }
              }
            }
            _self._tracks[i2].playlist = actualTrack;
          }
          _self._calculatePlaytime();
          _self._onReady();
        });
      } catch (err) {
        console.log("Failed during preload", err);
      }
    });
  }
  _onReady() {
    this._ready = true;
  }
  _setVolume(e2) {
    console.log(e2.target.value);
    this._volume = parseInt(e2.target.value) / 100;
    for (var i2 = 0; i2 < this._tracks.length; i2++) {
      this._tracks[i2].player.volume = this._volume;
    }
    this._samples.forEach((sample) => {
      sample.audioObj.volume = this._volume;
    });
  }
  _calculatePlaytime() {
    var longestTrack = this._tracks[0].playlist;
    for (var t2 = 0; t2 < this._tracks.length; t2++) {
      console.log(this._tracks[t2].playlist.length);
      if (this._tracks[t2].playlist.length > longestTrack.length) {
        longestTrack = this._tracks[t2].playlist;
      }
    }
    var traxLengthInSeconds = longestTrack.length * 2;
    this._traxLengthInSeconds = traxLengthInSeconds;
    this._traxLengthAsText = this._secondsToString(traxLengthInSeconds);
    this._timeAsText = this._secondsToString(0);
  }
  _setPlayTime() {
    this._timeAsText = this._secondsToString(this._timeInSeconds);
  }
  _secondsToString(seconds) {
    var d2 = Number(seconds);
    var m2 = Math.floor(d2 % 3600 / 60);
    var s2 = Math.floor(d2 % 3600 % 60);
    var str = "0" + m2 + ":";
    if (s2 < 10) {
      str += "0";
    }
    str += "" + s2;
    return str;
  }
  _setTime() {
    this._timeInSeconds = this._timeInSeconds + 1;
    if (this._timeInSeconds > this._traxLengthInSeconds) {
      this._playing = false;
      this._resetPlayer();
      this._play();
    } else {
      this._setPlayTime();
    }
  }
  _tick() {
    if (this._playing) {
      for (let i2 = 0; i2 < this._tracks.length; i2++) {
        this._playNextBeat(i2);
      }
      this._position = this._position + 1;
    }
  }
  _playNextBeat(track) {
    if (this._samples[this._tracks[track].playlist[this._position]]) {
      this._tracks[track].player = this._samples[this._tracks[track].playlist[this._position]].audioObj;
      this._tracks[track].timeLeft = this._samples[this._tracks[track].playlist[this._position]].sampleLength;
      this._tracks[track].blocks = this._tracks[track].playlist[this._position].blocks;
      this._tracks[track].sample = this._tracks[track].playlist[this._position];
      if (this._tracks[track].sample != 0) {
        console.log("TRACK " + track + " PLAYING: " + this._tracks[track].playlist[this._position]);
        this._tracks[track].player.currentTime = 0;
        this._tracks[track].player.volume = this._volume;
        this._tracks[track].player.play();
      }
    }
  }
  _resetPlayer() {
    clearInterval(this._ticker);
    clearInterval(this._time);
    this._timeInSeconds = 0;
    this._setPlayTime();
    for (var i2 = 0; i2 < this._tracks.length; i2++) {
      this._tracks[i2].player.pause();
    }
    this._samples.forEach((sample) => {
      sample.audioObj.pause();
    });
  }
  _play() {
    const _self = this;
    this._playing = !this._playing;
    if (this._playing) {
      this._position = 0;
      this._tick();
      this._ticker = setInterval(function() {
        _self._tick();
      }.bind(this), 2e3);
      this._time = setInterval(function() {
        _self._setTime();
      }.bind(this), 1e3);
    } else {
      this._resetPlayer();
    }
  }
};
TraxPlayer.styles = styles;
__decorateClass([
  e({ type: String })
], TraxPlayer.prototype, "songUrl", 2);
__decorateClass([
  e({ type: String })
], TraxPlayer.prototype, "sampleUrl", 2);
__decorateClass([
  t()
], TraxPlayer.prototype, "_volume", 2);
__decorateClass([
  t()
], TraxPlayer.prototype, "_title", 2);
__decorateClass([
  t()
], TraxPlayer.prototype, "_author", 2);
__decorateClass([
  t()
], TraxPlayer.prototype, "_samples", 2);
__decorateClass([
  t()
], TraxPlayer.prototype, "_tracks", 2);
__decorateClass([
  t()
], TraxPlayer.prototype, "_traxLengthInSeconds", 2);
__decorateClass([
  t()
], TraxPlayer.prototype, "_traxLengthAsText", 2);
__decorateClass([
  t()
], TraxPlayer.prototype, "_ready", 2);
__decorateClass([
  t()
], TraxPlayer.prototype, "_playing", 2);
__decorateClass([
  t()
], TraxPlayer.prototype, "_timeInSeconds", 2);
__decorateClass([
  t()
], TraxPlayer.prototype, "_timeAsText", 2);
__decorateClass([
  t()
], TraxPlayer.prototype, "_position", 2);
__decorateClass([
  t()
], TraxPlayer.prototype, "_time", 2);
__decorateClass([
  t()
], TraxPlayer.prototype, "_ticker", 2);
TraxPlayer = __decorateClass([
  n$1("habbo-traxplayer")
], TraxPlayer);
