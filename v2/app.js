var express 	= require('express'),
	app 		= express(),
 	bodyParser 	= require('body-parser'),
 	mongoose 	= require('mongoose');

mongoose.connect('mongodb://localhost/yelp_camp');
app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs')

//SCHEMA SETUP
var campgroundSchema = new mongoose.Schema({
	name: String,
	image: String,
	description: String
});

var Campground = mongoose.model('Campground', campgroundSchema);

// Campground.create(
// 	{
// 		name: 'Granite hill',
// 		image: 'https://images.unsplash.com/photo-1497900304864-273dfb3aae33?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
// 		description: 'A beautifull granite hill that is a change from the norm' 
// 	}, function(err, campground){
// 		if(err){
// 			console.log(err);
// 		} else{
// 			console.log('NEWLY CREATED CAMPGROUND: ');
// 			console.log(campground);
// 		}
// 	});

// var campgrounds = [
// 		{name: 'Salmon Creek', image: 'https://images.unsplash.com/photo-1476041800959-2f6bb412c8ce?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60'},
// 		{name: 'Granite hill', image: 'https://images.unsplash.com/photo-1497900304864-273dfb3aae33?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60'},
// 		{name: 'Mountain Goat rest', image: 'https://images.unsplash.com/photo-1517807289433-f0282e362596?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60'},
// 		{name: 'Salmon Creek', image: 'https://images.unsplash.com/photo-1476041800959-2f6bb412c8ce?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60'},
// 		{name: 'Granite hill', image: 'https://images.unsplash.com/photo-1497900304864-273dfb3aae33?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60'},
// 		{name: 'Mountain Goat rest', image: 'https://images.unsplash.com/photo-1517807289433-f0282e362596?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60'}
// 	];

app.get('/', function(req, res){
	res.render("landing");
});

//INDEX - shows all campgrounds
app.get('/campgrounds', function(req, res){
	//Get all campgrounds from db
	Campground.find({}, function(err, allCampgrounds){
		if(err){
			console.log(err);
		} else{
			res.render('index', {campgrounds: allCampgrounds});
		}
	});
});

//CREATE - add new campground to the DB
app.post('/campgrounds', function(req, res){
	//Get all campgrounds from DB
	var name = req.body.name;
	var image = req.body.image;
	var desc = req.body.description
	var newCampground = {name:name, image:image, description:desc}
	//create a new campground and save to DB
	Campground.create(newCampground, function(err, newlyCreated){
		if(err){
			console.log(err);
		} else{
			//redirect back to campgrounds page
			res.redirect('/campgrounds');
		}
	});
});

//NEW - displays a form to create a new campground
app.get('/campgrounds/new', function(req, res){
	res.render('new.ejs');
});

//SHOW - shows more info about one campground
app.get('/campgrounds/:id', function(req, res){
	//find the campground with the provided id
	Campground.findById(req.params.id, function(err, foundCampground){
		if(err){
			console.log(err);
		} else{
			//render show template with that campground
			res.render('show', {campground: foundCampground});
		}
	});
});

app.listen(3000, process.env.IP, function(){
	console.log("YelpCamp server has started !!!");	   
});