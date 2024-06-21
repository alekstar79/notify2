import { CONSOLE_STYLE_GREEN, CONSOLE_STYLE_RED, Notify } from './lib.js'

let myNotifier, notifToRemove, dirFromBottomMNModule, dirFromTopMNModule, customizedNotifsModule

const createdLlog = (created) => console.log(
  `%cGroup id 'test' was ${created ? '' : 'not '}created`,
  created ? CONSOLE_STYLE_GREEN : CONSOLE_STYLE_RED
)

const countChangeLog = (container, n) => console.log(
  `%cNumber of notifs [${container}]: ${n}`,
  CONSOLE_STYLE_GREEN
)

export function addNotificationToDefaultGroup()
{
  myNotifier?.pushNotification({
    title: 'Default Group notification',
    type: 'info',
  })
}

export function removeNotificationsFromDefaultGroup()
{
  myNotifier?.removeNotifications('default')
}

export function addTestGroup()
{
  createdLlog(!!myNotifier?.createEmptyGroup({ id: 'test' }))
}

export function addTestNotification()
{
  myNotifier?.pushNotification({
    title: 'Test Group notification',
    type: 'success',
    groupId: 'test',
  })
}

export function removeTestGroup()
{
  myNotifier?.removeNotifications('test')
}

export function addNotifToGreedyGroup()
{
  myNotifier?.pushNotification({
    title: 'Greedy Group notification',
    type: 'warning',
    groupId: 'greedy',
  })
}

export function removeGreedyGroup()
{
  myNotifier?.removeNotifications('greedy')
}

export function addSuccessNotif()
{
  myNotifier?.pushNotification({
    title: 'Success',
    message: 'Notification',
    type: 'success',
  })
}

export function addInfoNotification()
{
  myNotifier?.pushNotification({
    title: 'Info',
    message: 'Notification',
    type: 'info',
  })
}

export function addWarningNotif()
{
  myNotifier?.pushNotification({
    title: 'Warning',
    message: 'Notification',
    type: 'warning',
  })
}

export function addErrorNotif()
{
  myNotifier?.pushNotification({
    title: 'Error',
    message: 'Notification',
    type: 'error',
  })
}

export function addTimeoutNotif()
{
  myNotifier?.pushNotification({
    closeInMS: 2000,
    title: 'Info',
    message: 'Notification with Timeout',
    type: 'info',
  })
}


export function removeAll()
{
  myNotifier?.removeNotifications()
}


export function addInfoNotificationToRemove()
{
  notifToRemove = myNotifier?.pushNotification({
    title: 'Add notification',
    message: 'to remove it',
    type: 'info',
  })
}

export function removeSpecificNotif()
{
  notifToRemove?.remove()
}


/* DEMONSTRAING THE DIRECTIONS */
export function addSuccessNotifFromTopDir()
{
  dirFromTopMNModule?.unshiftNotification({
    message: 'Success',
    type: 'success'
  })
}

export function addTimeoutNotifFromTopDir()
{
  dirFromTopMNModule?.unshiftNotification({
    closeInMS: 2000,
    message: 'Info',
    type: 'info'
  })
}

export function addSuccessNotifFromBottomDir()
{
  dirFromBottomMNModule?.pushNotification({
    message: 'Success',
    type: 'success'
  })
}

export function addTimeoutNotifFromBottomDir()
{
  dirFromBottomMNModule?.pushNotification({
    closeInMS: 2000,
    message: 'Info',
    type: 'info'
  })
}


export function pushCustomNotif()
{
  customizedNotifsModule.pushNotification({
    title: 'Hey',
    message: "I'm a custom notification",
    template: ({ title, message }) => `
      <div class='custom-notification'>
        <span>${title}</span>
        <span>${message}</span>
        <span class='mn-close-btn custom-close-btn'>[x]</span>
      </div>
    `
  })
}

export function pullCustomizedNotifs()
{
  customizedNotifsModule.removeNotifications()
}

const fns = {
  'addNotificationToDefaultGroup()': addNotificationToDefaultGroup,
  'removeNotificationsFromDefaultGroup()': removeNotificationsFromDefaultGroup,
  'addTestGroup()': addTestGroup,
  'addTestNotification()': addTestNotification,
  'removeTestGroup()': removeTestGroup,
  'addNotifToGreedyGroup()': addNotifToGreedyGroup,
  'removeGreedyGroup()': removeGreedyGroup,
  'addSuccessNotif()': addSuccessNotif,
  'addInfoNotification()': addInfoNotification,
  'addWarningNotif()': addWarningNotif,
  'addErrorNotif()': addErrorNotif,
  'addTimeoutNotif()': addTimeoutNotif,
  'removeAll()': removeAll,
  'addInfoNotificationToRemove()': addInfoNotificationToRemove,
  'removeSpecificNotif()': removeSpecificNotif,
  'addSuccessNotifFromTopDir()': addSuccessNotifFromTopDir,
  'addTimeoutNotifFromTopDir()': addTimeoutNotifFromTopDir,
  'addSuccessNotifFromBottomDir()': addSuccessNotifFromBottomDir,
  'addTimeoutNotifFromBottomDir()': addTimeoutNotifFromBottomDir,
  'pushCustomNotif()': pushCustomNotif
}

export function templater(content)
{
  const container = document.createElement('div')

  container.innerHTML = content.trim()

  container.firstElementChild.querySelectorAll('button')
    .forEach(btn => {
      const attr = btn.getAttribute('onclick')

      btn.removeAttribute('onclick')
      btn.addEventListener('click', fns[attr])
    })

  return container.firstElementChild
}


document.onreadystatechange || (document.onreadystatechange = () => {
  if (document.readyState !== 'complete') return

  myNotifier = new Notify({
    container: '#notifications',
    onNotificationsCountChange: function(number) {
      countChangeLog(this.container, number)
    }
  })

  dirFromTopMNModule = new Notify({
    container: '#notifications-from-top',
    onNotificationsCountChange: function(number) {
      countChangeLog(this.container, number)
    }
  })

  dirFromBottomMNModule = new Notify({
    container: '#notifications-from-bottom',
    onNotificationsCountChange: function(number) {
      countChangeLog(this.container, number)
    }
  })

  customizedNotifsModule = new Notify({
    container: '#custom-notifications-container',
    onNotificationsCountChange: function(number) {
      countChangeLog(this.container, number)
    }
  })

  myNotifier.createEmptyGroup({
    id: 'greedy',
    greedy: true
  })

  myNotifier.pushNotification({
    title: 'Hello!',
    message: 'and Welcome ;)',
    type: 'info',
    closeInMS: 5000
  })

  myNotifier.pushNotification({
    message: 'Click buttons to add/remove the notifications',
    type: 'success',
    closeInMS: 7000
  })
})
