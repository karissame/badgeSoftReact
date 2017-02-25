import React from "react";
import {Link} from 'react-router';
import axios from "axios";

export default class CardEditor extends React.Component {
  constructor(props) {
    super();
    this.state = {
      columns: ''
    }
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    console.log('Card Design Saved');
    event.preventDefault();
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
    var columnarr=[];
    var designid="";
    var design='{"objects":[{"type":"rect","left":50,"top":50,"width":20,"height":20,"fill":"green","overlayFill":null,"stroke":null,"strokeWidth":1,"strokeDashArray":null,"scaleX":1,"scaleY":1,"angle":0,"flipX":false,"flipY":false,"opacity":1,"selectable":true,"hasControls":true,"hasBorders":true,"hasRotatingPoint":false,"transparentCorners":true,"perPixelTargetFind":false,"rx":0,"ry":0},{"type":"circle","left":100,"top":100,"width":100,"height":100,"fill":"red","overlayFill":null,"stroke":null,"strokeWidth":1,"strokeDashArray":null,"scaleX":1,"scaleY":1,"angle":0,"flipX":false,"flipY":false,"opacity":1,"selectable":true,"hasControls":true,"hasBorders":true,"hasRotatingPoint":false,"transparentCorners":true,"perPixelTargetFind":false,"radius":50}],"background":"rgba(0, 0, 0, 0)"}';
    var self = this;
    var userid = this.props.user.id;
    axios.post('/getColumns', {data: data})
      .then(function (response) {
        var columns = Object.keys(response.data.message);
        var designs = response.data.designs;
        // console.log(designs);
        var designarr=[];
        designs.forEach(function(design) {
            designarr.push(design.designid);
        });
        console.log(designarr);
        var designid = designarr[0];
        if (self.state.designs) {
            if (self.state.columns) {
            // var columnarr = JSON.stringify(self.state.columns);
                console.log("Columns already in state ");
                console.log(self.state.columns);
                console.log(self.state.designs);
                console.log(designid);
            }
            else {setState({columns:columns});}
        } else {
          self.setState({columns: columns, designs:designs});
        }
        console.log('/kitchen/kitchensink.html?columns=',JSON.stringify(self.state.columns),'&userid=',userid,'&designid',designid,'&design=',design);
    });
    return (
      <div>
        <iframe id="kitchensinkiframe" className="kitchensink" src={'/kitchen/kitchensink.html?columns=' + JSON.stringify(self.state.columns) + '&userid=' + userid + '&designid' + designid + '&design=' + design}/>

      </div>
    );
  };
};
