import React from "react";
import {Link} from 'react-router';
import axios from "axios";

export default class CardEditor extends React.Component {
  constructor(props) {
    super();

  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    console.log('Card Design Saved');
    event.preventDefault();
  }


  render() {
      console.log("about to fetch columns");
      console.log(this.props.user);
      var connection = JSON.parse(this.props.user.connection);
      var data = {
          client:this.props.user.dbclient,
          dbtable:this.props.user.dbtable,
          connection:connection};
      var self = this;
      axios.post('/getColumns', {data:data})
      .then(function (response) {
          var columns = Object.keys(response.data.message);
          console.log(columns);
      })
    //   console.log("This is outside the then but before render");
    //   console.log(columns);
      return (
        <div>
          <iframe id="kitchensinkiframe" className="kitchensink" title={["id", "firstname", "lastname", "employeenumber", "email", "phone"]} src={`/kitchen/kitchensink.html`}/>
        </div>
      );
  };
};
