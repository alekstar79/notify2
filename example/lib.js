var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
const t = (t2, o2) => [...Array(o2 - t2).keys(), o2 - t2].map((o3) => t2 + o3), o = t(65, 90), i = t(97, 122), n = t(48, 57), e = o.concat(i).concat(n), s = (t2 = 15) => {
  let o2 = String.fromCharCode(i[Math.floor(Math.random() * i.length)]);
  for (let i2 = 0; i2 < t2; i2++) o2 += String.fromCharCode(e[Math.floor(Math.random() * e.length)]);
  return o2;
};
function a(t2, o2) {
  return t2 && "object" == typeof t2 ? function(t3, o3) {
    const i2 = { ...t3 };
    for (const t4 in o3) Object.prototype.hasOwnProperty.call(o3, t4) && (i2[t4] = o3[t4]);
    return i2;
  }(o2, t2) : o2;
}
const r = ({ id: t2, title: o2 = "", message: i2 = "", type: n2 = "", content: e2 = "" }) => (s2) => {
  let a2 = s2 ? s2[0] : "";
  return [{ find: "{{id}}", by: t2 }, { find: "{{title}}", by: o2 }, { find: "{{message}}", by: i2 }, { find: "{{type}}", by: n2 }, { find: "{{content}}", by: e2 }].forEach(({ find: t3, by: o3 }) => {
    a2 = ((t4, o4, i3) => t4.replace(new RegExp(o4, "g"), i3))(a2, t3, o3);
  }), a2;
}, c = { id: null, greedy: false };
class d {
  constructor(t2) {
    __publicField(this, "options");
    __publicField(this, "_notifications");
    if (this.options = a(t2, c), !this.options.id) throw new Error("Group id is required");
    this._notifications = /* @__PURE__ */ new Map();
  }
  _addNotification(t2) {
    this._notifications.set(t2.id, t2);
  }
  _hasNotification(t2) {
    return this._notifications.has(t2);
  }
  _removeNotification(t2) {
    this._notifications.delete(t2);
  }
  _getNotifications() {
    return this._notifications;
  }
  _getLength() {
    return this._notifications.size;
  }
  _isEmpty() {
    return 0 === this._getLength();
  }
}
const h = (t2) => document.querySelector(t2), f = (t2) => document.getElementById(t2), p = (t2, o2) => {
  t2 && (t2.className = `${t2.className} ${o2}`);
}, u = (t2, o2) => {
  t2 && o2 && ("string" == typeof o2 ? t2.insertAdjacentHTML("beforeend", o2) : t2.append(o2));
}, m = { UNSHIFT: "unshift", PUSH: "push" }, l = "text-shadow: #a0f9fa 0 0 2px; font-family: monospace; font-size: 1.2em;", g = "text-shadow: #fe3c3c 0 0 2px; font-family: monospace; font-size: 1.2em;", y = 100, v = { INFO: "info" }, N = { [m.PUSH]: u, [m.UNSHIFT]: (t2, o2) => {
  t2 && o2 && ("string" == typeof o2 ? t2.insertAdjacentHTML("afterbegin", o2) : t2.prepend(o2));
} };
class _ {
  constructor(t2) {
    __publicField(this, "id");
    __publicField(this, "options");
    __publicField(this, "onBeforeRemove");
    this.id = s(), this.options = t2, this.onBeforeRemove = (t3) => {
      console.info(`Notification id ${t3.id} will be deleted`);
    };
  }
  remove() {
    "function" == typeof this.onBeforeRemove && this.onBeforeRemove(this);
    ((t2, o2) => {
      t2 && t2.classList.remove(o2);
    })(f(this.id), "show"), window.setTimeout(() => {
      ((t2) => {
        const o2 = f(t2);
        o2 && ((t3) => {
          var _a;
          t3 && ((_a = t3.parentNode) == null ? void 0 : _a.removeChild(t3));
        })(o2);
      })(this.id);
    }, 500);
  }
  _addToContainer(t2) {
    this.onBeforeRemove = t2.onBeforeRemove;
    var o2, i2;
    const n2 = ((t3) => {
      const o3 = document.createElement("div");
      return o3.innerHTML = t3.trim(), o3.firstChild;
    })("function" == typeof this.options.template ? (o2 = this.id, i2 = this.options.template({ title: this.options.title, message: this.options.message }), r({ id: o2, content: i2 })`<div id='{{id}}'>{{content}}</div>`) : ((t3, o3 = "", i3 = "", n3) => r({ id: t3, title: o3, message: i3, type: n3 })`
  <div
    class="toast-notification"
    id='{{id}}'
  >
    <div class="toast-notification-inner toast-notification-inner-{{type}}">
      <button
        type='button'
        class='toast-close-btn toast-close'>
        <span>&times;</span>
      </button>
      <div class="toast-notification-content">
        <i class="toast-icon toast-icon-{{type}}"></i>
        <span><strong>{{title}}</strong> {{message}}</span>
      </div>
    </div>
  </div>`)(this.id, this.options.title, this.options.message, this.options.type));
    p(n2, `toast-${this.options.animation}`), N[t2.mode](h(`#${t2.moduleId}`), n2), window.setTimeout(() => {
      p(n2, "show");
    }, 10);
    (() => {
      ((t3, o3) => {
        const i3 = h(t3);
        i3 && i3.addEventListener("click", o3, false);
      })(((t3) => `#${t3} .toast-close-btn`)(this.id), () => {
        this.remove();
      }), this.options.closeInMS && window.setTimeout(() => {
        this.remove();
      }, this.options.closeInMS);
    })();
  }
}
const w = { title: "", message: "", groupId: "default", closeInMS: null, animation: "fade", type: v.INFO, template: null, mode: m.PUSH }, C = { container: null, onNotificationsCountChange: () => {
} };
class I {
  constructor(t2) {
    __publicField(this, "options");
    __publicField(this, "notificationsCount");
    __publicField(this, "groups");
    __publicField(this, "id");
    this.options = a(t2, C), this.notificationsCount = 0, this.groups = /* @__PURE__ */ new Map(), this.id = s();
    const o2 = this.options.container ? h(this.options.container) : null;
    if (!o2) throw new Error(`Container with id '${this.options.container}' is not found`);
    u(o2, `<div id='${this.id}' class='toast-module-container'></div>`);
  }
  _setNotificationsCount(t2) {
    this.notificationsCount = Math.max(t2, 0), "function" == typeof this.options.onNotificationsCountChange && this.options.onNotificationsCountChange(this.notificationsCount);
  }
  createEmptyGroup(t2) {
    return !this.groups.has(t2.id) && (this.groups.set(t2.id, new d(t2)), true);
  }
  _removeGroupNotifications(t2, o2 = 0) {
    if (!this.groups.has(t2)) throw new Error(`Group with id ${t2} does not exist`);
    let i2 = o2;
    this.groups.get(t2)._getNotifications().forEach((t3) => {
      window.setTimeout(() => {
        t3.remove();
      }, 100 * i2), i2++;
    });
  }
  removeNotifications(t2) {
    if (t2) this._removeGroupNotifications(t2);
    else {
      let t3 = 0;
      this.groups.forEach((o2, i2) => {
        this._removeGroupNotifications(i2, t3), t3 += this.groups.get(i2)._getLength();
      });
    }
  }
  _onBeforeRemove(t2) {
    const o2 = this.groups.get(t2.options.groupId);
    o2._hasNotification(t2.id) && o2._removeNotification(t2.id), this._setNotificationsCount(this.notificationsCount - 1);
  }
  _createNotification(t2) {
    this._setNotificationsCount(this.notificationsCount + 1);
    const o2 = new _(t2);
    return o2._addToContainer({ moduleId: this.id, mode: t2.mode, onBeforeRemove: (t3) => this._onBeforeRemove(t3) }), this.groups.get(t2.groupId)._addNotification(o2), o2;
  }
  _addNotification(t2) {
    const o2 = a(t2, w);
    this.createEmptyGroup({ id: o2.groupId });
    const i2 = this.groups.get(o2.groupId);
    if (i2.options.greedy && !i2._isEmpty()) throw new Error(`Greedy group id '${i2.options.id}' is not empty`);
    const n2 = this._createNotification(o2);
    var e2, s2;
    return e2 = i2.options.id, s2 = n2.id, console.log(`%cGroupId: "${e2}" notificationId: "${s2}"`, l), n2;
  }
  pushNotification(t2) {
    return this._addNotification({ ...t2, mode: m.PUSH });
  }
  unshiftNotification(t2) {
    return this._addNotification({ ...t2, mode: m.UNSHIFT });
  }
}
export {
  m as ADD_ELEMENT_MODE,
  l as CONSOLE_STYLE_GREEN,
  g as CONSOLE_STYLE_RED,
  v as ICONS,
  I as Notify,
  y as REMOVE_NOTIFICATION_DELAY_MS
};
