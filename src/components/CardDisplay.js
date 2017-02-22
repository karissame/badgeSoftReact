import React from "react";
import { Link } from 'react-router';


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
        return  (
        <div>
            <canvas class="card-wrapper" height="610px" width="384px" id="c"></canvas>
            <script src="/js/fabric.js"></script>
        </div>
        )


    };


    // render() {
    //         if (this.props.card.id) {
    //             var objects = [];
    //             this.props.card.layoutObjects.forEach(function(object) {
    //                 objects.push(<div className="objects" id={object.id} style={object.style}>{object.element}</div>);
    //             });
    //         return (
    //           <div id={this.props.card.id} className="card-wrapper">
    //             {objects}
    //           </div>
    //     );}
    //   }



};