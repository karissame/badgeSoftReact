import React from "react";
import { Link } from 'react-router';
import CardDisplay from "./CardDisplay";



export default class Previewer extends React.Component {
    // var card = this.props.card;

    render() {
        // var canvas = new fabric.Canvas();

        // canvas.loadFromJSON('{"objects":[{"type":"rect","left":50,"top":50,"width":20,"height":20,"fill":"green","overlayFill":null,"stroke":null,"strokeWidth":1,"strokeDashArray":null,"scaleX":1,"scaleY":1,"angle":0,"flipX":false,"flipY":false,"opacity":1,"selectable":true,"hasControls":true,"hasBorders":true,"hasRotatingPoint":false,"transparentCorners":true,"perPixelTargetFind":false,"rx":0,"ry":0},{"type":"circle","left":100,"top":100,"width":100,"height":100,"fill":"red","overlayFill":null,"stroke":null,"strokeWidth":1,"strokeDashArray":null,"scaleX":1,"scaleY":1,"angle":0,"flipX":false,"flipY":false,"opacity":1,"selectable":true,"hasControls":true,"hasBorders":true,"hasRotatingPoint":false,"transparentCorners":true,"perPixelTargetFind":false,"radius":50}],"background":"rgba(0, 0, 0, 0)"}');

        return (

            <canvas id="canvas" width="384" height="610" top="0" left="0"></canvas>

        );
        // var card = {
        //     id:1,
        //     layoutObjects: [
        //         {
        //             id:1,
        //             style:{top:0,left:0,width:"100%",zIndex:0},
        //             element:<img src="https://old.protectionplussolutions.com/administrator/assets/badge_files/John_Luevano.PNG" width="100%" />,
        //             condition:'<<db.campaign>> == "VISTA"'
        //         },
        //         {
        //             id:2,
        //             style:{top:10,left:20,zIndex:1,color:"purple",fontSize:"24px"},
        //             element:<p>Sample Badge</p>
        //         },
        //         {
        //             id:3,
        //             style:{bottom:10,width:"100%",textAlign:"center",zIndex:2,color:"purple",fontSize:"16px"},
        //             element:<p>Made for --db.firstname+" "+db.lname--</p>
        //         }
        //     ]
        // };
        //     if (card.id) {
        //     return (
        //         <div id="preview">
        //         <CardDisplay card={card}/>
        //         <div className="spacer"></div>
        //         </div>
        //
        // );}
      }

}
