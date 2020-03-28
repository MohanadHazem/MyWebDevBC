var express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs')

var campgrounds = [
		{name: 'Salmon Creek', image: 'https://images.unsplash.com/photo-1476041800959-2f6bb412c8ce?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60'},
		{name: 'Granite hill', image: 'https://images.unsplash.com/photo-1497900304864-273dfb3aae33?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60'},
		{name: 'Mountain Goat rest', image: 'https://images.unsplash.com/photo-1517807289433-f0282e362596?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60'},
		{name: 'Salmon Creek', image: 'https://images.unsplash.com/photo-1476041800959-2f6bb412c8ce?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60'},
		{name: 'Granite hill', image: 'https://images.unsplash.com/photo-1497900304864-273dfb3aae33?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60'},
		{name: 'Mountain Goat rest', image: 'https://images.unsplash.com/photo-1517807289433-f0282e362596?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60'}
	];

app.get('/', function(req, res){
	res.render("landing");
});

app.get('/campgrounds', function(req, res){
	res.render('campgrounds', {campgrounds: campgrounds});
});

app.post('/campgrounds', function(req, res){
	//Get data from form and add to campgrounds array
	var name = req.body.name;
	var image = req.body.image;
	var newCampground = {name:name, image:image}
	campgrounds.push(newCampground);
	//redirect back to campgrounds page
	res.redirect('/campgrounds');
});

app.get('/campgrounds/new', function(req, res){
	res.render('new.ejs');
});

app.listen(3000, process.env.IP, function(){
	console.log("YelpCamp server has started !!!");	   
});