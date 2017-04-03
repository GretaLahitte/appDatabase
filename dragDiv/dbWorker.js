
onmessage = function(e) {
  console.log('WORKER: Message received from main script');
  var workerResult = 'Result: ' + e.data;
  console.log('WORKER: Posting message back to main script');
  postMessage(workerResult);
}
