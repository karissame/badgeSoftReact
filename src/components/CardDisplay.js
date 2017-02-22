import React from "react";
import {Link} from 'react-router';


export default class CardDisplay extends React.Component {
  constructor(props) {
    super()

  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    console.log('Card Design Saved');
    event.preventDefault();
  }


  render() {
    return (
      <div>
        <div id="bd-wrapper" ng-controller="CanvasControls">
          <script src="jquery.js"></script>
          <script src="bootstrap.js"></script>
          <script src="paster.js"></script>
          <link rel="stylesheet" href="bootstrap.css"></link>
          <link rel="stylesheet" href="kitchensink.css"></link>
          <link href='http://fonts.googleapis.com/css?family=Plaster' rel='stylesheet' type='text/css'></link>
          <link href='http://fonts.googleapis.com/css?family=Engagement' rel='stylesheet' type='text/css'></link>
          <div style="position:relative;width:400px;height:650px;float:left;" id="canvas-wrapper">
            <div id="canvas-controls">
            </div>
            <output id="list"></output>
            <canvas id="canvas" width="384" height="610"></canvas>
            <div id="color-opacity-controls">
              <label for="opacity">Opacity: </label>
              <input value="100" type="range" bind-value-to="opacity"></input>
              <label for="color" style="margin-left:10px">Color: </label>
              <input type="color" style="width:40px" bind-value-to="fill"></input>
            </div>
          </div>


          <div id="commands" ng-click="maybeLoadShape($event)">

            <div class="tab-content">

              <div class="tab-pane active" id="simple-shapes">
                <p>Add <strong>simple shapes</strong> to canvas:</p>

                <button type="button" class="btn rect" ng-click="addRect()">Rectangle</button>
                <button type="button" class="btn circle" ng-click="addCircle()">Circle</button>
                <button type="button" class="btn triangle" ng-click="addTriangle()">Triangle</button>
                <button type="button" class="btn line" ng-click="addLine()">Line</button>
                <button type="button" class="btn polygon" ng-click="addPolygon()">Polygon</button>
                <br></br><p style="margin-top: 10px;"><b>Add Image or map:</b>
                <input type="file" id="imgLoader"></input></p>

                <b>Controls/Export:</b><br></br>
                <button class="btn btn-object-action" id="remove-selected" ng-click="removeSelected()">
                  Remove selected object/group
                </button>
                <button id="gradientify" class="btn btn-object-action" ng-click="gradientify()">Gradientify
                </button>
                <button id="shadowify" class="btn btn-object-action" ng-click="shadowify()">Shadowify</button>
                <br></br>
                <button id="send-backwards" class="btn btn-object-action" ng-click="sendBackwards()">Send
                  backwards
                </button>
                <button id="send-to-back" class="btn btn-object-action" ng-click="sendToBack()">Send to
                  back
                </button>
                <button id="bring-forward" class="btn btn-object-action" ng-click="bringForward()">Bring
                  forwards
                </button>
                <button id="bring-to-front" class="btn btn-object-action" ng-click="bringToFront()">Bring to
                  front
                </button>
                <div class="tab-pane" id="object-controls-pane">
                  <div style="margin-top: 10px;" id="global-controls">
                    <p>
                      Export canvas as:
                      <button class="btn btn-success" id="rasterize" ng-click="rasterize()">
                        Image
                      </button>
                      <button class="btn btn-success" id="rasterize-svg" ng-click="rasterizeSVG()">
                        SVG
                      </button>
                      <button class="btn btn-success" id="rasterize-json" ng-click="rasterizeJSON()">
                        JSON
                      </button>
                    </p>

                  </div>

                </div>

                <div style="float:left;margin-left: 10px;">
                  <p><b>Text/Label:</b>
                    <button class="btn" ng-click="addText()">Add text</button>
                  </p>
                  <textarea bind-value-to="text"></textarea><br></br>
                  <div id="text-controls-additional">
                    <button type="button" class="btn btn-object-action" ng-click="toggleBold()"
                            ng-class="{'btn-inverse': isBold()}">
                      Bold
                    </button>
                    <button type="button" class="btn btn-object-action" id="text-cmd-italic"
                            ng-click="toggleItalic()" ng-class="{'btn-inverse': isItalic()}">
                      Italic
                    </button>
                    <button type="button" class="btn btn-object-action" id="text-cmd-underline"
                            ng-click="toggleUnderline()" ng-class="{'btn-inverse': isUnderline()}">
                      Underline
                    </button>
                    <button type="button" class="btn btn-object-action" id="text-cmd-linethrough"
                            ng-click="toggleLinethrough()" ng-class="{'btn-inverse': isLinethrough()}">
                      Linethrough
                    </button>
                    <button type="button" class="btn btn-object-action" id="text-cmd-overline"
                            ng-click="toggleOverline()" ng-class="{'btn-inverse': isOverline()}">
                      Overline
                    </button>
                  </div>
                </div>
                <div id="text-wrapper"
                     style="margin-top: 5px; margin-left:10px; position:relative;float:right">
                  <div style="margin-left: 0px;" id="text-controls">
                    <label for="font-family" style="display:inline-block">Font family:</label>
                    <select id="font-family" class="btn-object-action" bind-value-to="fontFamily">
                      <option value="arial">Arial</option>
                      <option value="helvetica" selected>Helvetica</option>
                      <option value="myriad pro">Myriad Pro</option>
                      <option value="delicious">Delicious</option>
                      <option value="verdana">Verdana</option>
                      <option value="georgia">Georgia</option>
                      <option value="courier">Courier</option>
                      <option value="comic sans ms">Comic Sans MS</option>
                      <option value="impact">Impact</option>
                      <option value="monaco">Monaco</option>
                      <option value="optima">Optima</option>
                      <option value="hoefler text">Hoefler Text</option>
                      <option value="plaster">Plaster</option>
                      <option value="engagement">Engagement</option>
                    </select>
                    <br></br>
                    <label for="text-align" style="display:inline-block">Text align:</label>
                    <select id="text-align" class="btn-object-action" bind-value-to="textAlign">
                      <option>Left</option>
                      <option>Center</option>
                      <option>Right</option>
                      <option>Justify</option>
                    </select>
                    <div>
                      <label for="text-bg-color">Background color:</label>
                      <input type="color" value="" id="text-bg-color" size="10" class="btn-object-action"
                             bind-value-to="bgColor"></input>
                    </div>
                    <div>
                      <label for="text-lines-bg-color">Background text color:</label>
                      <input type="color" value="" id="text-lines-bg-color" size="10"
                             class="btn-object-action" bind-value-to="textBgColor"></input>
                    </div>
                    <div>
                      <label for="text-stroke-color">Stroke color:</label>
                      <input type="color" value="" id="text-stroke-color" class="btn-object-action"
                             bind-value-to="strokeColor"></input>
                    </div>
                    <div>
                      <label for="text-stroke-width">Stroke width:</label>
                      <input type="range" value="1" min="1" max="5" id="text-stroke-width"
                             class="btn-object-action" bind-value-to="strokeWidth"></input>
                    </div>
                    <div>
                      <label for="text-font-size">Font size:</label>
                      <input type="range" value="" min="1" max="120" step="1" id="text-font-size"
                             class="btn-object-action" bind-value-to="fontSize"></input>
                    </div>
                    <div>
                      <label for="text-line-height">Line height:</label>
                      <input type="range" value="" min="0" max="10" step="0.1" id="text-line-height"
                             class="btn-object-action" bind-value-to="lineHeight"></input>
                    </div>
                  </div>

                </div>


              </div>
            </div>

          </div>
        </div>
      </div>




    );
  };
};
