function formArray(prearray){
    let array=[];
    let formWord= new String()
    for (let i = 0; i < prearray.length; i++) {
        if (prearray[i]==","){
            array.push(formWord);
            formWord="";
        }
        formWord=formWord+prearray[i];
        if (formWord==","){
            formWord="";
        }
        if(i==(prearray.length-1)){
            array.push(formWord);
        }
    }
    return array;
}
