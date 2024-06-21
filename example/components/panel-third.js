import { templater } from '../demo.js'

export const PanelThird = templater(`
  <div class="panel panel-primary panel-third">
    <div class="panel-heading">Customization</div>

    <div class="row">
      <div class="col-md-6">
        <div class="panel-content-unit">
          <button type="button" class="btn btn-group btn-default" onclick="pushCustomNotif()">
            Add customized notification
          </button>
        </div>
      </div>

      <div class="col-md-6">
        <div class="panel-content-unit">
          <div class="cmd">
            <div class="cmd-tool-panel">
              <span>cmd</span>

              <div class="cmd-tool-panel-btns">
                <span class="cmd-pull-all-btn" onclick="pullCustomizedNotifs()">[X]</span>
              </div>
            </div>

            <div class="cmd-canvas">
              <div id="custom-notifications-container"></div>
              <span>&gt;</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
`)
