var canvas = new fabric.Canvas('c');
canvas.on('object:modified', function (e) {
   var obj = e.target;
    var rect = obj.getBoundingRect();

    if (rect.left < 0
        || rect.top < 0
        || rect.left + rect.width > canvas.getWidth()
        || rect.top + rect.height > canvas.getHeight()) {
        if (obj.getAngle() != obj.originalState.angle) {
            obj.setAngle(obj.originalState.angle);
        }
        else {
            obj.setTop(obj.originalState.top);
            obj.setLeft(obj.originalState.left);
            obj.setScaleX(obj.originalState.scaleX);
            obj.setScaleY(obj.originalState.scaleY);
        }
        obj.setCoords();
    }
    });

var rect = new fabric.Rect({
left: 50,
top: 50,
fill: 'red',
width: 100,
height: 100
});

canvas.add(rect);
