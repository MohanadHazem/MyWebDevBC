var express 		= require('express'),
		app 				= express(),
 		bodyParser 	= require('body-parser'),
 		mongoose 		= require('mongoose'),
		Campground 	= require('./models/campground'),
		seedDB			= require('./seeds.js');

mongoose.connect('mongodb://localhost/yelp_camp', {useUnifiedTopology: true, useNewUrlParser: true, useFindAndModify: true});
app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');
seedDB();


app.get('/', function(req, res){
	res.render('landing');
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
	//find the campground with the provided ID
	Campground.findById(req.params.id).populate('comments').exec(function(err, foundCampground){
		if(err){
			console.log(err);
		} else {
			console.log(foundCampground);
			//render show template with that campground
			res.render('show', {campground: foundCampground});
		}
	});
});

app.listen(3000, process.env.IP, function(){
	console.log("YelpCamp server has started !!!");	   
});