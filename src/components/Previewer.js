import React from "react";
import { Link } from 'react-router';
import CardDisplay from "./CardDisplay";

export default class Previewer extends React.Component {
    // var card = this.props.card;

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
                <div id="preview">
                <CardDisplay card={card}/>
                <div className="spacer"></div>
                </div>

        );}
      }

}
