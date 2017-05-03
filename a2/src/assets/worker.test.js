onmessage = function(evt){
    console.log("youhou, something to do....");
    var base = JSON.parse(evt.data);
    console.log(base)
    postMessage("some SQL datas....");
}