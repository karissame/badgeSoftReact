import React from "react";
import {Link} from 'react-router';
import axios from "axios";

export default class CardEditor extends React.Component {
  constructor(props) {
    super();
    this.state = {
        columns:''
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
          client:this.props.user.dbclient,
          dbtable:this.props.user.dbtable,
          connection:connection};
      var self = this;
      axios.post('/getColumns', {data:data})
      .then(function (response) {
          var columns = Object.keys(response.data.message);
          if (self.state.columns) {
            //   console.log("Columns already in state ");
            //   console.log(self.state.columns);
          } else {
              self.setState({columns:columns});
            //   console.log("Set state.columns as ");
            //   console.log(self.state.columns);
          }
      })
      var columnarr = JSON.stringify(self.state.columns);
      console.log(columnarr);
      return (
        <div>
          <iframe id="kitchensinkiframe" className="kitchensink" src={'/kitchen/kitchensink.html?columns='+columnarr}/>
        </div>
      );
  };
};
