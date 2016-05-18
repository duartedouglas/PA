var express = require('express'),
    bodyParser = require('body-parser'),
    compression = require('compression'),
    students = require('./server/students'),
    courses = require('./server/courses'),
    enrollments = require('./server/enrollments'),
    teachers = require('./server/teachers'),
    periods = require('./server/periods'),
    sqlinit = require('./server/sqlinit'),
    app = express();

app.set('port', process.env.PORT || 5000);

app.use(bodyParser.json());
app.use(compression());

app.use('/', express.static(__dirname + '/www'));

app.get('/students', students.findAll);
// app.get('/students/:id', students.findById);
// app.get('/students/:id/enrollments', enrollments.findByStudent);
// app.post('/students', students.createItem);
// app.put('/students', students.updateItem);
// app.delete('/students/:id', students.deleteItem);


app.use(function(err, req, res, next) {
    console.error(err.stack);
    res.status(500).send(err);
});

app.listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});