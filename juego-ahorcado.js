const start=[[30,300], [90,300], [90,30], [175,30],[195,100], [175,120], [175, 135], [175, 135], [175, 190], [175, 190]];
const end=[[150,300],[90,30],[175,30],[175,80],[175,100], [175, 190], [150,180], [200, 180], [150,240],[200,240]];

function selectWord(){
  let index;
  let word;
  if(!unicW){
    index=Math.floor(Math.random()*words.length);
    word = words[index];
    console.log(words);
    words.splice(index,1);
    console.log(words)
    return word;
  }else{
    index=words.length-1;
    word = words[index];
    words.splice(index,1)
    console.log(words);
    unicW=false;
    return word;
  }

}
function drawMan(i) {
  if(tries<10){
    drawing.lineWidth = 4;
    drawing.strokeStyle = "#0A3871";
    drawing.beginPath();
      if (i==4){
        drawing.moveTo(start[i][0], start[i][1])
        drawing.arc(175,100,20,0,Math.PI*2,true);
      }else{
        drawing.moveTo(start[i][0], start[i][1]);
        drawing.lineTo(end[i][0],end[i][1]);
      }

    drawing.stroke();
  }
  else{
  message.textContent="Lo siento!\r\nHas perdido :("
    message.className="looser"
    stopp=true;
  }
}

function letterSpaces(){
  let spaces = document.getElementById("wordSpaces");
  let letters = document.getElementById("correctLetters");
  for (let i = 0; i < secret.length; i++) {
    let box = document.createElement("box");
    box.textContent="__";
    spaces.appendChild(box);
    let box2 = document.createElement("box");
    box2.setAttribute("id",i);
    box2.className='unvisible'
    box2.textContent=secret[i];
    letters.appendChild(box2);
  }

}
function check(event){
  
  document.getElementById("empty").value="";
  let wrong=new RegExp("[¡"+wrongLetters+"['Á-ÿá-ÿ +"+'¿?¨_.,#!$%\^&\*;:{}=`´~()”“"/|°¬<>-'+"]");
  if(!stopp && event.key!="Enter"){
  let regexp="["+secret+"]";
  let re = new RegExp(regexp);
  var keyboard = event.key.toString().toUpperCase(); 
        if (re.test(keyboard)) {
          let i = 0;
          while ( i <= secret.length) {
            var box = document.getElementById(i);
            if(secret[i] == keyboard){
              if (box.className!='visible'){
                winner++;
                box.className='visible'
              }             
              if (winner==secret.length){
               message.textContent="Felicidades!\r\nHas ganado :)"
               message.className="winner"
                stopp=true;
              }
            }
            i++
          }
        } else if(event.code=="Enter"){
            event.preventDefault();
        }
        else{
          if(!wrong.test(keyboard)){
            wrongLetters=wrongLetters+keyboard;
            drawMan(tries);
            tries++;
            let mistakes = document.getElementById("mistakes");
            let letter = document.createElement("p");
            letter.textContent=keyboard;
            mistakes.appendChild(letter);
            letter.setAttribute("class","mistakes");
          }
        }
  }
}
document.getElementById("empty").addEventListener('keyup', function(event) {
  check(event);
});
document.addEventListener('keyup', function(event) {
  check(event);
});

function ValidStor(){

    if(localStorage.getItem("unicWord")!==null){
      unicW=localStorage.getItem("unicWord");
      localStorage.removeItem("unicWord");
    }
    if(localStorage.getItem("newWords")===null){
    words=formArray(localStorage.getItem("presaved"));
    }
    if(localStorage.getItem("newWords")!==null){
    words=formArray(localStorage.getItem("newWords"));
    }
}

function deleteChilds(id){
  let element=document.getElementById(id);
  console.log(element);
  
  while (element.hasChildNodes()) {
    element.removeChild(element.firstChild);
  }
}

function play(){
  message.textContent="";
  stopp =false;
  wrongLetters="0-9Á-ÿ";
  tries = 0;
  winner=0;
  deleteChilds("wordSpaces")
  deleteChilds("correctLetters");
  deleteChilds("mistakes");
  secret = selectWord();
  letterSpaces();
  drawing.clearRect(0, 0, canvas.width, canvas.height);

}
  var canvas = document.getElementById('man');
  var drawing = canvas.getContext('2d');
  var words=[];
  let message=document.getElementById("message");
  let stopp=false;
  let wrongLetters="0-9Á-ÿ";
  var secret;
  var tries = 0;
  var winner=0;
  let unicW=false;
  document.getElementById("empty").focus();
  ValidStor();
  play();

  let newGame = document.querySelector("#newGame");
  newGame.addEventListener('click',play);