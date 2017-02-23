/*************This was the card editor layer but no longer used*************/

import React from "react";
import { Link } from 'react-router';
import CardDisplay from "./CardDisplay";

export default class CardEditor extends React.Component {
    // var card = this.props.card;

    handleChange(event) {
      this.setState({value: event.target.value});
    }

    handleSubmit(event) {
      console.log('Card Design Saved');
      event.preventDefault();
    }
    render() {
        var card = {
            id:1,
            layoutObjects: [
                {
                    id:1,
                    style:{top:0,left:0,width:"100%",zIndex:0},
                    element:<img src="https://old.protectionplussolutions.com/administrator/assets/badge_files/John_Luevano.PNG" width="100%" />,
                    condition:'<<db.campaign>> == "VISTA"'
                },
                {
                    id:2,
                    style:{top:10,left:20,zIndex:1,color:"purple",fontSize:"24px"},
                    element:<p>Sample Badge</p>
                },
                {
                    id:3,
                    style:{bottom:10,width:"100%",textAlign:"center",zIndex:2,color:"purple",fontSize:"16px"},
                    element:<p>Made for --db.firstname+" "+db.lname--</p>
                }
            ]
        };
            if (card.id) {
            return (
                <div>
                <CardDisplay card={card}/>
                <button type="save" value="save" onClick={this.handleSubmit}/>
                </div>
        );} else {
            return (
            <div className="row">
              <div id="no-card" className="col-xs-8 col-xs-offset-2">
                  <h1>Please select a Card to edit first</h1>
              </div>
            </div>
        );
    }
      }

}

  // };

/*************/



  /*/// ****************** this is the example with the red square
>>>>>>> origin/master
// render() {
    //     return  (
    //     <div>
    //         <canvas class="card-wrapper" height="610px" width="384px" id="c"></canvas>
    //         <script src="/js/fabric.js"></script>
    //     </div>
    //     )
    //
    //
    // };


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
<<<<<<< HEAD
    //

=======
    //   }*/

  // };
