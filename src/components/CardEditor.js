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
    var design="";
    var self = this;
    var userid = this.props.user.id;
    axios.post('/getColumns', {data: data})
      .then(function (response) {
        var columns = Object.keys(response.data.message);
        var designs = response.data.designs;
        console.log(designs);
        var designarr=[];
        designs.forEach(function(design) {
            designarr.push(design.designid);
        });
        console.log(designarr);
        var designid = designarr[0];
        if (self.state.columns) {
            var columnarr = JSON.stringify(self.state.columns);
            console.log("Columns already in state ");
            console.log(self.state.columns);
            console.log(self.state.designs);
            console.log(designid);
        } else {
          self.setState({columns: columns, designs:designs});
        }
        console.log('/kitchen/kitchensink.html?columns=',columnarr,'&userid=',userid,'&designid',designid,'&design=',design);
    });
    return (
      <div>
        <iframe id="kitchensinkiframe" className="kitchensink" src={'/kitchen/kitchensink.html?columns=' + columnarr + '&userid=' + userid + '&designid' + designid + '&design=' + design}/>

      </div>
    );
  };
};
