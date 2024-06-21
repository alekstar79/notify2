export const getElement = (query: string) => document.querySelector(query) as HTMLElement

export const getElementById = (id: string) => document.getElementById(id) as HTMLElement

export const removeClass = (el: HTMLElement, className: string) => {
  el && el.classList.remove(className)
}

export const addClass = (el: HTMLElement, className: string) => {
  el && (el.className = `${el.className} ${className}`)
}

export const getElementFromHtmlString = (htmlString: string): HTMLElement => {
  const div = document.createElement('div')

  div.innerHTML = htmlString.trim()

  return div.firstChild as HTMLElement
}

export const appendElementToContainer = (container: HTMLElement, el: HTMLElement | string) => {
  if (!container || !el) return

  if (typeof el === 'string') {
    container.insertAdjacentHTML('beforeend', el)
  } else {
    container.append(el)
  }
}

export const prependElementToContainer = (container: HTMLElement, el: HTMLElement | string) => {
  if (!container || !el) return

  if (typeof el === 'string') {
    container.insertAdjacentHTML('afterbegin', el)
  } else {
    container.prepend(el)
  }
}

export const removeElement = (el: HTMLElement) => {
  el && el.parentNode?.removeChild(el)
}

export const removeElementById = (id: string) => {
  const el = getElementById(id)
  el && removeElement(el)
}

export const addOnClick = (query: string, cb: () => void) => {
  const el = getElement(query)
  el && el.addEventListener('click', cb, false)
}
