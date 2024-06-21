import { applyArgs } from './utils/common.ts'

import type { GroupOptions } from './const/index.ts'

const defaultOptions: GroupOptions = {
  id: null,
  greedy: false
}

/**
* @class Group
*/
export class Group
{
  public options: GroupOptions
  readonly _notifications: Map<any, any>

  /**
  * @constructor
  * @param {Object} groupOptions
  */
  constructor(groupOptions: GroupOptions)
  {
    this.options = applyArgs(groupOptions, defaultOptions)

    if (!this.options.id) {
      throw new Error('Group id is required')
    }

    this._notifications = new Map()
  }

  /**
  * Adds new notification to the group
  * @param {Object} notification - instance of the notification
  */
  _addNotification(notification: NotificationOptions)
  {
    // @ts-expect-error property 'id' does not exist on type NotificationOptions
    this._notifications.set(notification.id, notification)
  }

  /**
  * Detects if group has a notification with id
  * @param {string} id - id of the notification
  * @returns {boolean} value
  */
  _hasNotification(id: string)
  {
    return this._notifications.has(id)
  }

  /**
  * Removes notification from the group
  * @param {string} id - id of the notification
  */
  _removeNotification(id: string)
  {
    this._notifications.delete(id)
  }

  /**
  * Returnes all notifications from the group
  * @returns {Map} list of notifications
  */
  _getNotifications(): Map<any, any>
  {
    return this._notifications
  }

  /**
  * Returnes count of notifications in the group
  * @returns {number}
  */
  _getLength()
  {
    return this._notifications.size
  }

  /**
  * Returnes if group is empty
  * @returns {boolean}
  */
  _isEmpty()
  {
    return this._getLength() === 0
  }
}
