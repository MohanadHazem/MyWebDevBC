var mongoose = require('mongoose');
var Campground = require('./models/campground');
var Comment 	= require('./models/comment');

var data = [
	{
		name: 'Clouds rest',
		image: 'https://images.unsplash.com/photo-1476041800959-2f6bb412c8ce?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
		description: 'bla bla bla'
	},
	{
		name: 'Star gaze',
		image: 'https://images.unsplash.com/photo-1474984815137-e129646c7c9a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
		description: 'bla bla bla'
	},
	{
		name: 'Desert lake',
		image: 'https://images.unsplash.com/photo-1548062005-e50d06091399?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
		description: 'bla bla bla'
	}
]

function seedDB(){
	Campground.deleteMany({}, function(err){
		if(err){
			console.log(err);
		}
		console.log('Removed campgrounds!');
		//add a few campgrounds
		data.forEach(function(seed){
			Campground.create(seed, function(err, campground){
				if(err){
					console.log(err)
				} else {
						console.log('Added a campground!');
						//create a comment
						Comment.create(
							{
								text: 'This is a really cool place!',
								author: 'Homer'
							}, function(err, comment){
									if(err){
										console.log(err);
									} else {
										campground.comments.push(comment);
										campground.save();
										console.log('Created new comment!');
									}
							});
				}
			});
		});
	});
}

//add a few comments
Comment.create()

module.exports = seedDB;