const express = require ('express');
const router = express.Router();
const Restaurant = require('../models/api');

router.get('/all',(req,res)=>{
    Restaurant.find().then(result=>{
        res.json({result});
    }).catch(err=>{
        res.json(err);
    })
})

router.get('/restaurant', function(req, res, next){
   Restaurant.geoNear(
        {type: 'Point', coordinates: [parseFloat(req.query.lng), parseFloat(req.query.lat)]},
        {maxDistance: 100000, spherical: true}
    ).then(function(result){
        res.send(result);
    }).catch(next);
});

router.post('/add', function(req, res, next){
    /*Rest.create(req.body).then(function(rest){
        res.json({rest,numberofratings:rating.length});
    }).catch(next);*/
    const newrest = new Restaurant({
        name: req.body.name,
        rating: req.body.rating,
        description:req.body.description,
        geometry: req.body.geometry
    }).save()
    .then(result=>{
            res.json({restaurant:{
                name:result.name,
                description:result.description,
                overallrating: (result.overallrating*result.numberofrating+result.rating)/result.numberofrating+1,
                numberofrating: result.numberofrating+1
            }
            
        }).catch(err=>{
            res.json(err);
        })
})

})
router.put('/restaurant/:id', function(req, res, next){
    Restaurant.findByIdAndUpdate({_id: req.params.id}, req.body).then(function(){
        Restaurant.findOne({_id: req.params.id}).then(function(result){
            res.send(result);
        });
    }).catch(next);
});

router.delete('/restaurant/:id', function(req, res, next){
  const deleterest =  Restaurant.findById(req.params.id);
    if (deleterest) {
       deleterest.remove();
      res.send({ message: 'restaurant Deleted' });
    } else {
      res.send('Error in Deletion.');
    }
});

router.delete("/",function(req,res,next){
    Restaurant.remove().then(result=>{res.json({result:"database is empty"})}).catch(err=>{
        res.json(err);
    })
})

module.exports = router;

