import { templater } from '../demo.js'

export const PanelSecond = templater(`
  <div class="panel panel-primary panel-second">
    <div class="panel-heading">Direction of notification show</div>

    <div class="row">
      <div class="col-md-6">
        <div class="panel-content-unit">
          <p>Let notifications occur from top</p>

          <button type="button" class="btn btn-group btn-success" onclick="addSuccessNotifFromTopDir()">
            Add "Success" notification
          </button>

          <button type="button" class="btn btn-group btn-default" onclick="addTimeoutNotifFromTopDir()">
            Add notification with timeout
          </button>

          <div id="notifications-from-top" class="notifications-container"></div>
        </div>
      </div>

      <div class="col-md-6">
        <div class="panel-content-unit">
          <p>Let notifications occur from bottom</p>

          <button type="button" class="btn btn-group btn-success" onclick="addSuccessNotifFromBottomDir()">
            Add "Success" notification
          </button>

          <button type="button" class="btn btn-group btn-default" onclick="addTimeoutNotifFromBottomDir()">
            Add notification with timeout
          </button>

          <div
            id="notifications-from-bottom"
            class="notifications-container notifications-container-from-bottom"
          ></div>
        </div>
      </div>
    </div>
  </div>
`)
