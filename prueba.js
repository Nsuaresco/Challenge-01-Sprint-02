const start=[[30,300], [90,300], [90,30], [175,30],[195,100], [175,120], [175, 135], [175, 135], [175, 190], [175, 190]];
const end=[[150,300],[90,30],[175,30],[175,80],[175,100], [175, 190], [150,180], [200, 180], [150,240],[200,240]];

function draw() {
    var canvas = document.getElementById('man');
    if (canvas.getContext){
      var drawing = canvas.getContext('2d');
      drawing.lineWidth = 4;
      drawing.beginPath();
      drawing.moveTo(30,300);
      drawing.lineTo(150,300);
      drawing.moveTo(90,300);
      drawing.lineTo(90, 30); 
      drawing.moveTo(90,30);     
      drawing.lineTo(175, 30);
      drawing.moveTo(175,30);
      drawing.lineTo(175, 80);
      drawing.moveTo(195,100);
      drawing.arc(175,100,20,0,Math.PI*2,true); // Círculo externo
      drawing.moveTo(175,120);
      drawing.lineTo(175, 190);
      drawing.moveTo(175, 135);
      drawing.lineTo(150, 180);
      drawing.moveTo(175, 135);
      drawing.lineTo(200, 180);
      drawing.moveTo(175, 190);
      drawing.lineTo(150, 240);
      drawing.moveTo(175, 190);
      drawing.lineTo(200, 240);
      drawing.strokeStyle = "#0A3871";
      drawing.stroke();
    }
  }

  setInterval(draw,200);