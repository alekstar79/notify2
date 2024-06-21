import { templater } from '../demo.js'

export const PanelFirst = templater(`
  <div class="panel panel-primary panel-first">
    <div class="panel-heading">Basic examples</div>

    <div class="row">
      <div class="col-md-8">
        <div class="panel-content-unit">
          <p>Notifications of default group</p>

          <button type="button" class="btn btn-group btn-default" onclick="addNotificationToDefaultGroup()">
            Add notification to default group
          </button>
          <button type="button" class="btn btn-group btn-default" onclick="removeNotificationsFromDefaultGroup()">
            Remove notifications from default group
          </button>

          <p>.. and of custom group (i.e. group with id 'test')</p>

          <button type="button" class="btn btn-group btn-default" onclick="addTestGroup()">
            Add 'test' group
          </button>
          <button type="button" class="btn btn-group btn-default" onclick="addTestNotification()">
            Add notification to 'test' group
          </button>
          <button type="button" class="btn btn-group btn-default" onclick="removeTestGroup()">
            Remove notifications from 'test' group
          </button>

          <p>
            'greedy' group notifications (only one notification can be added to greedy group)
          </p>

          <button type="button" class="btn btn-group btn-default" onclick="addNotifToGreedyGroup()">
            Add notification to 'greedy' group
          </button>
          <button type="button" class="btn btn-group btn-default" onclick="removeGreedyGroup()">
            Remove notifications from 'greedy' group
          </button>

          <p>Notifications with different types</p>

          <button type="button" class="btn btn-group btn-success" onclick="addSuccessNotif()">
            Add Success notification
          </button>
          <button type="button" class="btn btn-group btn-info" onclick="addInfoNotification()">
            Add Info notification
          </button>
          <button type="button" class="btn btn-group btn-warning" onclick="addWarningNotif()">
            Add Warning notification
          </button>
          <button type="button" class="btn btn-group btn-danger" onclick="addErrorNotif()">
            Add Error notification
          </button>

          <p>Notifications with different timeouts</p>

          <button type="button" class="btn btn-group btn-default" onclick="addTimeoutNotif()">
            Add notification with timeout
          </button>

          <p>Removing notification</p>

          <button type="button" class="btn btn-group btn-default" onclick="removeAll()">
            Remove all notifications
          </button>
          <button type="button" class="btn btn-group btn-info" onclick="addInfoNotificationToRemove()">
            Add notification to remove
          </button>
          <button type="button" class="btn btn-group btn-default" onclick="removeSpecificNotif()">
            Remove specific notification
          </button>
        </div>
      </div>

      <div class="col-md-4">
        <div class="panel-content-unit">
          <div id="notifications" class="notifications-container"></div>
        </div>
      </div>
    </div>
  </div>
`)
