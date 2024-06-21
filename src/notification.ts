import { generateId, getDefaultTemplate, getCustomTemplate, getCloseButtonSelector } from './utils/common.ts'

import {
  getElement,
  addOnClick,
  getElementFromHtmlString,
  prependElementToContainer,
  appendElementToContainer,
  removeElementById,
  getElementById,
  removeClass,
  addClass
} from './utils/domUtils.ts'

import type { NotificationOptions } from './const/index.ts'
import { ADD_ELEMENT_MODE } from './const/index.ts'

export interface ToastNotification {
  id: string;
  options: NotificationOptions;
  onBeforeRemove: (n: ToastNotification) => void;
  remove: () => void;
}

const FADE_MS: number = 500
const fns = {
  [ADD_ELEMENT_MODE.PUSH]: appendElementToContainer,
  [ADD_ELEMENT_MODE.UNSHIFT]: prependElementToContainer
}

/**
* @class Notification
*/
export class Notification implements ToastNotification
{
  public id: string
  public options: NotificationOptions
  public onBeforeRemove: (n) => void

  /**
   * @constructor
   * @param {Object} options
   */
  constructor(options: NotificationOptions)
  {
    this.id = generateId()
    this.options = options
    this.onBeforeRemove = n => {
      console.info(`Notification id ${n.id} will be deleted`)
    }
  }

  remove()
  {
    typeof this.onBeforeRemove === 'function' && this.onBeforeRemove(this)

    const el = getElementById(this.id)

    removeClass(el, 'show')

    window.setTimeout(() => {
      removeElementById(this.id)
    }, FADE_MS)
  }

  /**
   * Appends notification element to specified container
   * @param {Object} options - Options of the appending
   */
  _addToContainer(options: any)
  {
    this.onBeforeRemove = options.onBeforeRemove

    const template =
      typeof this.options.template == 'function'
        ? getCustomTemplate(
          this.id,
          this.options.template({
            title: this.options.title,
            message: this.options.message,
          })
        )
        : getDefaultTemplate(
          this.id,
          this.options.title as string,
          this.options.message as string,
          this.options.type as string
        )

    const el = getElementFromHtmlString(template)
    addClass(el, `toast-${this.options.animation}`)

    fns[options.mode](getElement(`#${options.moduleId}`), el)
    window.setTimeout(() => {
      addClass(el, 'show')
    }, 10)

    const setCloseConditions = () => {
      addOnClick(getCloseButtonSelector(this.id), () => {
        this.remove()
      })

      this.options.closeInMS &&
      window.setTimeout(() => {
        this.remove()
      }, this.options.closeInMS)
    }

    setCloseConditions()
  }
}
