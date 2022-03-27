const Food = require("../models/foodModel").Food;

module.exports.getAllFood = async(req,res) => {

    try {

        const data = await Food.find().sort({ updatedAt: -1 }).populate("category")
        if(data){
            res.json({data: data})
        } 
    } catch(err){
        res.json({erreur: err})
    }
}

module.exports.singleFood = async(req, res) => {

    try {
        const data = await Food.find({_id: req.params.id})
        if(data){
            res.json(data)
        }
    } catch(err){
        res.json({erreur : err})
    }
}

module.exports.addFood = async(req, res) => {

    const {name, description, price, category} = req.body


    try {
        let data = await Food.create({
            name: name,
            description: description,
            price: price,
            category: category
    
        })

        data = await data.populate("category")
        
        if(data){
            res.json({data: data})
        }
    } catch(err){
        res.json({erreur: err})
    }
    
}


module.exports.deleteFood = async(req, res) => {

    const {id} = req.params
    try {
        const data = await Food.findByIdAndDelete({_id: id})

            if(data){
                res.json({deleted : data})
            }

    }catch(err){
        res.json({erreur: err})
    }
}

module.exports.editFood = async(req, res) => {

    const {name, description, price} = req.body

    const food = {
        name: name,
        description: description,
        price: price
    }
    try {

        Food.findByIdAndUpdate(req.params.id, 
            {$set : food},
            {new : true},
            (err, docs) =>{
                if(!err) {
                
                res.json({food: docs})
                }
                else console.log("update err :" + err)
     
            })
            
    }catch(err){
        res.json({err: err})
    }
    }

    module.exports.getByCategory = async(req, res) => {

        try{
            const data = await Food.find({category: req.params.id})
            if(data){
                res.json({data: data})
            }
        }catch(err){
            res.json({err: err})
        }
    }