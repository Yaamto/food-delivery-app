const Category = require("../models/categoryModel").Category


module.exports.addCategory = async(req, res) => {

    

    try {
        const data = await Category.create({name: req.body.name})
        console.log(data)
        res.json({data: data})
    }catch(err){
        res.json({err: err})
    }
}

module.exports.allCategory = async(req,res) => {

    try{
        const data = await Category.find()
        if(data){
            res.json({data: data})
        }
    }catch(err){
        res.json({err:err})
    }
}

