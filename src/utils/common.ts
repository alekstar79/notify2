import type { TemplateData } from '../const/index.ts'

interface OptionsObject {
  [key: string]: any;
}

interface T1 extends OptionsObject {}
interface U1 extends OptionsObject {}


const range = (start: number, end: number): number[] => [...Array(end - start).keys(), end - start].map(n => start + n)
const upper = range(65, 90)   // A-Z
const lower = range(97, 122)  // a-z
const digit = range(48, 57)   // 0-9

const all = upper.concat(lower).concat(digit)

export const generateId = (length = 15): string => {
  // return Math.random().toString(36).substring(2, 11) or npm package cuid
  let str = String.fromCharCode(lower[Math.floor(Math.random() * lower.length)])

  for (let i = 0; i < length; i++) {
    str += String.fromCharCode(all[Math.floor(Math.random() * all.length)])
  }

  return str
}

/* extends default config and returns extended one */
export function extendDefaults<T extends T1, U extends U1>(source: U, properties: T): (T | U) {
  const _source = { ...source }

  for (const property in properties) {
    if (Object.prototype.hasOwnProperty.call(properties, property)) {
      _source[property] = properties[property] as any
    }
  }

  return _source
}

/* return options if specified or default options otherwise */
export function applyArgs<T extends T1, U extends U1>(argum: T, defaults: U): (T | U)  {
  if (argum && typeof argum === 'object') {
    return extendDefaults(defaults, argum)
  } else {
    return defaults
  }
}

const replace = (str: string, find: string, by: string): string => str.replace(new RegExp(find, 'g'), by)

export const templater = ({
  id,
  title = '',
  message = '',
  type = '',
  content = ''
}: TemplateData): Function => (t: string): string => {
  let str = t ? t[0] : ''

  ;[
    { find: '{{id}}', by: id },
    { find: '{{title}}', by: title },
    { find: '{{message}}', by: message },
    { find: '{{type}}', by: type },
    { find: '{{content}}', by: content },
  ].forEach(({ find, by }) => {
    str = replace(str, find, by as string)
  })

  return str
}

export const getDefaultTemplate = (id: string, title: string = '', message: string = '', type: string) => {
  return templater({ id, title, message, type } as TemplateData)`
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
  </div>`
}

export const getCustomTemplate = (id: string, content: string) => {
  return templater({ id, content })`<div id='{{id}}'>{{content}}</div>`
}

export const getCloseButtonSelector = (id: string) => `#${id} .toast-close-btn`
