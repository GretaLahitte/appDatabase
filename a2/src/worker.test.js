onmessage = function(evt){
    console.log("youhou, something to do....");
    console.log(evt);
    postMessage("some SQL datas....");
}