import React from "react";
import {Link} from 'react-router';


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
    return (
      <div>
        <iframe id="kitchensinkiframe" className="kitchensink" src={`/kitchen/kitchensink.html`}/>
      </div>

    );
  };
};
