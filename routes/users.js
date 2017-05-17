var express = require('express');
var User = require('../controller/user');
var router = express.Router();

router.route('/')

	.get(function(req,res,next){
		res.status(200).json(User.getAll());
	})

	.post(function(req,res,next){

		try{
			User.post(req.body);
			res.status(200).json({message: 'user created successfully'});
		}catch(e){
			res.status(406).json({message: e});
		}
	});

router.route('/:user_id')
	
	.all(function(req,res,next){
		req.params.user_id = parseInt(req.params.user_id);
		if(isNaN(req.params.user_id)){
			throw "Id is not a number "+typeof req.params.user_id;
		}
		next();
	})

	.get(function(req,res,next){
		res.status(200).json(User.get(req.params.user_id));
	})

	.put(function(req,res,next){
		try{

			if(!User.save(req.params.user_id,req.body)){
				res.status(404).json({message: 'user not found'});
			}else{
				res.status(200).json({message: 'user updated successfully'});
			}
			
		}catch(e){
			res.status(406).json({message: e});
		}
	})

	.delete(function(req,res,next){
		if(!User.delete(req.params.user_id)){
			res.status(404).json({message: 'user not found'});
		}else{
			res.status(200).json({message: 'user deleted successfully'});
		}
	});

module.exports = router;