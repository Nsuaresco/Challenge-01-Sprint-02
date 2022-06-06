function addWords(){
    let letterIn = document.getElementById("inputWords").value;
    if(letterIn===""){
        issues("Introduce una palabra");
    }else{
        storage.forEach(word => {
            if(word==letterIn){
                repeated = true;
            }
        });
        if(!repeated){
            storage.push(letterIn);
            storageUsr.push(letterIn)
            memory=storage;
            localStorage.setItem('newWords', memory);
            localStorage.setItem('userWords',storageUsr);
            createOptions(letterIn);
            document.getElementById("optionsWords").className="visible";
            noIssue();
        }
        else{
            issues("palabra repetida, ingrese una palabra diferente por favor")
            repeated=false;
        }
        document.getElementById("inputWords").value="";
    }
    }
    

function createOptions(word){
    let words = document.getElementById("wordsList");
    let optn = document.createElement("option");
        optn.value=word;
        optn.textContent=word;
        optn.setAttribute('id',word);
        words.appendChild(optn);

}
function noIssue(){
    let notification = document.getElementById('notification'); 
    let notify = document.getElementById('notify');
    notify.classList.remove('invalid');
    notify.className='valid';
    notification.classList.add('unvisible');
    document.getElementById("notification").textContent="";
}

function issues(warning){
    notify.classList.remove('unvisible');
    notify.className='invalid';
    notification.classList.remove('unvisible');
    document.getElementById("notification").textContent=warning;
}
function erraseSelectedWord(){
    let letterVal=document.getElementById("wordsList").value;
    var newArray = storage.filter((word) => word != letterVal);
    storage=newArray; 
    localStorage.setItem('newWords', storage);
    newArray = storageUsr.filter((word) => word != letterVal);
    storageUsr = newArray;
    localStorage.setItem('userWords',storageUsr);
    
    deleteOptions(letterVal);
}

function deleteOptions(letterVal){
    let words = document.getElementById("wordsList");
    words.removeChild(words.children[letterVal]);
    if (!words.hasChildNodes()) {
        document.getElementById("optionsWords").className="unvisible";
    }
}  

function checkPattern(){
    let invalid2=new RegExp("]");
    let invalid=new RegExp("[¡['a-zÁ-ÿá-ÿ0-9 +"+'¿?¨_.,#!$%\^&\*;:{}=`´~()”“"/|°¬<>-'+"]");
    let messageValidation = document.getElementById('inputWords');
    messageValidation.value=messageValidation.value.toUpperCase();
    let notification = document.getElementById('notification'); 
    let message = messageValidation.value;
    let notify = document.getElementById('notify');
    if (invalid.test(message)||invalid2.test(message)) {
       issues("🛈 No se aceptan caractéres especiales ni números");
    }else{
        noIssue();
    }
    
}

function validateStorage(){
    if(localStorage.getItem("newWords")===null){
        storage=formArray(wordsPreset);
    }
    else if(localStorage.getItem("newWords")!==null){
        storage=formArray(localStorage.getItem("newWords"));
    }
}

function validateMemory(){
    if(localStorage.getItem("userWords")===null){
        document.getElementById("optionsWords").className="unvisible";

    }
    else if(localStorage.getItem("userWords")!==null){
        storageUsr=formArray(localStorage.getItem("userWords"));
        document.getElementById("optionsWords").className="visible";
    }
}

function deleteData(){
    localStorage.removeItem("newWords");
    localStorage.removeItem("userWords");
    storageUsr.forEach(word => deleteOptions(word));
    document.getElementById("optionsWords").className="unvisible";
}

function specialGame(){
    localStorage.setItem("unicWord",true);
    window.location.href = 'juego-ahorcado.html';
}
document.addEventListener('keypress', function(event) {
    if (event.code === 'Enter') {
        event.preventDefault();
        return false;
    }
});


document.getElementById('inputWords').addEventListener("keyup", function(event){
    if (event.code === 'Enter') {
        event.preventDefault();
        console.log(event.code);
        return false;
    }
    else{
        checkPattern();
        }
})

let storage=[];
let storageUsr=[];
let wordsPreset=localStorage.getItem("presaved");
let memory=[];
let repeated=false;
let save = document.querySelector("#add");
let del = document.querySelector("#delete");
let delSel = document.querySelector("#deleteSelection");
let spgame = document.querySelector("#personalized");
save.addEventListener('click',addWords);
del.addEventListener('click',deleteData);
delSel.addEventListener('click',erraseSelectedWord);
spgame.addEventListener('click',specialGame)
validateStorage();
validateMemory();
storageUsr.forEach(word =>createOptions(word));






