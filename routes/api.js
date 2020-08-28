const express = require ('express');
const router = express.Router();
const Rest = require('../models/rest');

router.get('/all',(req,res)=>{
    Rest.find().then(result=>{
        res.json({result});
    }).catch(err=>{
        res.json(err);
    })
})

router.get('/restnt', function(req, res, next){
    Rest.geoNear(
        {type: 'Point', coordinates: [parseFloat(req.query.lng), parseFloat(req.query.lat)]},
        {maxDistance:100000,spherical: true}
    ).then(function(rest){
        res.send(rest);
    }).catch(next);
});

router.post('/add', function(req, res, next){
    /*Rest.create(req.body).then(function(rest){
        res.json({rest,numberofratings:rating.length});
    }).catch(next);*/
    const newrest = new Rest({
        name: req.body.name,
        description:req.body.description,
        rating:req.body.rating,
        geometry: req.body.geometry
    });
    newrest.save()
    .then(result=>{
        res.json({result});
}).catch(err=>{
    res.json(err);
})});

router.put('/rest/:id', function(req, res, next){
    Rest.findByIdAndUpdate({_id: req.params.id}, req.body).then(function(){
        Rest.findOne({_id: req.params.id}).then(function(rest){
            res.send(rest);
        });
    }).catch(next);
});

router.delete('/rest/:id', function(req, res, next){
    Rest.findByIdAndRemove({_id: req.params.id}).then(function(rest){
        res.send(rest);
    }).catch(next);
});



module.exports = router;
