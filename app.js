const fs = require('fs');
const data = fs.readFileSync('lists.json');
const lists = JSON.parse(data);
console.log(lists);

const  express = require('express');
const app = express();

const server = app.listen(3000, listening);

function listening(){
	console.log('listening on port 3000');
}

app.get('/all', seeTasks);

function seeTasks(req, res){
	// var reply = JSON.stringify(lists, null, 2);
	res.send(lists);
}


app.get('/add/:task/:due', addTask);

// Handle that route
function addTask(req, res) {
  var task = req.params.task;
  var due = req.params.due;

  var reply;
  // Put it in the object
  lists[task] = due;

  // Let the request know it's all set
  var reply = {
    status: 'success',
    task: task,
    due: due
  }
  console.log('added: ' + JSON.stringify(reply));

  var json = JSON.stringify(lists);
  fs.writeFile('lists.json', json, finished);
  function finished(err) {
    console.log('Finished writing additional.json');
    // Don't send anything back until everything is done
    res.send(reply);
  }
}