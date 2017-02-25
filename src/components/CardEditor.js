import React from "react";
import {Link} from 'react-router';
import axios from "axios";

export default class CardEditor extends React.Component {
  constructor(props) {
    super();
    this.state = {
      columns: '',
      designid:'',
      designs:[]
    }

  this.changeDesign.bind(this);
  this.populateSelect.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    console.log('Card Design Saved');
    event.preventDefault();
  }

  populateSelect(event) {
  console.log("Attemptimg to populate select");
  let designs = this.state.designs;
  console.log("designs in state are: ",designs);
  var select = event;
  console.log("Event that triggered this function is ",select);
  // for (var i = 0; i<=designs.length ; i++) {
  //     var opt = document.createElement('option');
  //     opt.value = i.designid;
  //     opt.innerHTML = i.designid;
  //     select.appendChild(opt);
  //   }
}

changeDesign(event) {
    //   this.setState({designid: event.target.value});
    console.log("A design has been chosen. Here is the event");
    console.log(event);
  }


  render() {
    //   console.log("about to fetch columns");
    //   console.log(this.props.user);
    var connection = JSON.parse(this.props.user.connection);
    var data = {
      client: this.props.user.dbclient,
      dbtable: this.props.user.dbtable,
      connection: connection,
      userid:this.props.user.id
    };
    var designid="";
    var design='{"objects":[{"type":"rect","left":50,"top":50,"width":20,"height":20,"fill":"green","overlayFill":null,"stroke":null,"strokeWidth":1,"strokeDashArray":null,"scaleX":1,"scaleY":1,"angle":0,"flipX":false,"flipY":false,"opacity":1,"selectable":true,"hasControls":true,"hasBorders":true,"hasRotatingPoint":false,"transparentCorners":true,"perPixelTargetFind":false,"rx":0,"ry":0},{"type":"circle","left":100,"top":100,"width":100,"height":100,"fill":"red","overlayFill":null,"stroke":null,"strokeWidth":1,"strokeDashArray":null,"scaleX":1,"scaleY":1,"angle":0,"flipX":false,"flipY":false,"opacity":1,"selectable":true,"hasControls":true,"hasBorders":true,"hasRotatingPoint":false,"transparentCorners":true,"perPixelTargetFind":false,"radius":50}],"background":"rgba(0, 0, 0, 0)"}';
    var self = this;
    var userid = this.props.user.id;
    var designid = 0;
    axios.post('/getColumns', {data: data})
      .then(function (response) {
        var columns = Object.keys(response.data.message);
        var designs = response.data.designs;
        console.log("Designs received from callback",designs);
        if (self.state.designs[0]) {
            if (self.state.columns) {
            // var columnarr = JSON.stringify(self.state.columns);
                console.log("Columns and design already in state ");
                console.log("columns are",self.state.columns);
                console.log("designs are",self.state.designs);
                console.log(designid);
            }
            else {self.setState({columns:columns});}
        } else {
          self.setState({columns: columns, designs:designs});
        }
        // console.log('/kitchen/kitchensink.html?columns=',JSON.stringify(self.state.columns),'&userid=',userid,'&designid',designid,'&design=',design);
    });
    if (self.state.designid) {
    return (
      <div>
        <iframe id="kitchensinkiframe" className="kitchensink" src={'/kitchen/kitchensink.html?columns=' + JSON.stringify(self.state.columns) + '&userid=' + userid + '&designid' + designid + '&design=' + design}/>

      </div>
  );} else {
      return(
          <div className="row">
            <div id="profile" className="col-xs-8 col-xs-offset-2">
            <select id="designPicker"  onChange={this.changeDesign()} onLoad={this.populateSelect()}>
              <option value="">Select a Design to Edit</option>
              <option value='1'>Create New</option>
            </select>
            </div>
          </div>
      )
  }
  };
};
