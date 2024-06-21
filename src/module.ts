import { Group } from './group.ts'
import { Notification, ToastNotification } from './notification.ts'
import { appendElementToContainer, getElement } from './utils/domUtils.ts'
import { applyArgs, generateId } from './utils/common.ts'
import { CONSOLE_STYLE_GREEN } from './const/index.ts'

import { ADD_ELEMENT_MODE, ICONS, REMOVE_NOTIFICATION_DELAY_MS } from './const/index.ts'
import type { NotificationOptions, GroupOptions } from './const/index.ts'

interface ModuleOptions {
  onNotificationsCountChange: (c: number) => void;
  container: string | null;
}

export interface NotifyModule {
  options: ModuleOptions;
  notificationsCount: number;
  groups: Map<any, any>;
  id: string;

  pushNotification: (no: NotificationOptions) => ToastNotification;
  unshiftNotification: (no: NotificationOptions) => ToastNotification;
  removeNotifications: (id?: string) => void;
  createEmptyGroup: (go: GroupOptions) => boolean;
}

const defaultNotificationOptions: NotificationOptions = {
  title: '',
  message: '',
  groupId: 'default',
  closeInMS: null,
  animation: 'fade',  // 'fade' | 'swing' | 'rotate' | 'slide'
  type: ICONS.INFO,   // 'info' | 'warning' | 'error' | 'success'
  template: null ,    // (title, message) => "<span>" + title + "</span>"
  mode: ADD_ELEMENT_MODE.PUSH
}

const defaultModuleOptions: ModuleOptions = {
  container: null, // required
  onNotificationsCountChange: () => {}
}

const log = (gid, nid) => console.log(
  `%cGroupId: "${gid}" notificationId: "${nid}"`,
  CONSOLE_STYLE_GREEN
)

/**
* @class Module
*/
export class Module implements NotifyModule
{
  public options: ModuleOptions
  public notificationsCount: number
  public groups: Map<any, any>
  public id: string

  /**
  * @constructor
  * @param {Object} moduleOptions
  */
  constructor(moduleOptions: typeof defaultModuleOptions)
  {
    this.options = applyArgs(moduleOptions, defaultModuleOptions)
    this.notificationsCount = 0
    this.groups = new Map()
    this.id = generateId()

    // append module container to the specified container
    const el = this.options.container
      ? getElement(this.options.container)
      : null

    if (!el) {
      throw new Error(
        `Container with id '${this.options.container}' is not found`
      )
    }

    appendElementToContainer(el, `<div id='${this.id}' class='toast-module-container'></div>`)
  }

  _setNotificationsCount(count: number)
  {
    this.notificationsCount = Math.max(count, 0)

    if (typeof this.options.onNotificationsCountChange === 'function') {
      this.options.onNotificationsCountChange(this.notificationsCount)
    }
  }

  /**
  * Creates an empty group
  * @param {Object} groupOptions - Options of the group
  * @returns {boolean} value of result
  */
  createEmptyGroup(groupOptions: GroupOptions)
  {
    if (this.groups.has(groupOptions.id)) return false

    this.groups.set(groupOptions.id, new Group(groupOptions))

    return true
  }

  _removeGroupNotifications(id: string, notificationStartIndex = 0)
  {
    if (!this.groups.has(id)) {
      throw new Error(`Group with id ${id} does not exist`)
    }

    let index = notificationStartIndex

    this.groups
      .get(id)
      ._getNotifications()
      .forEach((notification: any) => {
        window.setTimeout(() => {
          notification.remove()
        }, index * REMOVE_NOTIFICATION_DELAY_MS)

        index++
      })
  }

  /**
  * Pulls notifications
  * @param {string} id - id of the group, if not specified removes all notifications
  */
  removeNotifications(id?: string)
  {
    if (id) {
      this._removeGroupNotifications(id)
    } else {
      let notificationStartIndex = 0

      this.groups.forEach((_, groupId) => {
        this._removeGroupNotifications(groupId, notificationStartIndex)
        notificationStartIndex += this.groups.get(groupId)._getLength()
      })
    }
  }

  _onBeforeRemove(notification: { id: string, options: any })
  {
    const group = this.groups.get(notification.options.groupId)

    if (group._hasNotification(notification.id)) {
      group._removeNotification(notification.id)
    }

    this._setNotificationsCount(this.notificationsCount - 1)
  }

  _createNotification(options: NotificationOptions)
  {
    this._setNotificationsCount(this.notificationsCount + 1)

    const notification = new Notification(options)

    notification._addToContainer({
      moduleId: this.id,
      mode: options.mode,
      onBeforeRemove: (n: { id: string, options: any }) => this._onBeforeRemove(n)
    })

    this.groups.get(options.groupId)._addNotification(notification)

    return notification
  }

  _addNotification(options: NotificationOptions)
  {
    const _options = applyArgs(options, defaultNotificationOptions)

    this.createEmptyGroup({ id: _options.groupId })
    const group = this.groups.get(_options.groupId)

    if (group.options.greedy && !group._isEmpty()) {
      throw new Error(`Greedy group id '${group.options.id}' is not empty`)
    }

    const notification = this._createNotification(_options)

    log(group.options.id, notification.id)

    return notification
  }

  /**
  * Pushes the new notification
  * @param {Object} options - Options of the notification
  * @returns {Object} notif instance
  */
  pushNotification(options: NotificationOptions)
  {
    return this._addNotification({ ...options, mode: ADD_ELEMENT_MODE.PUSH })
  }

  unshiftNotification(options: NotificationOptions)
  {
    return this._addNotification({ ...options, mode: ADD_ELEMENT_MODE.UNSHIFT })
  }
}
