import { PanelFirst  as c1 } from './components/panel-first.js'
import { PanelSecond as c2 } from './components/panel-second.js'
import { PanelThird  as c3 } from './components/panel-third.js'

const container = document.getElementById('app')

container && [
  c1, c2, c3
].forEach(container.appendChild.bind(container))
