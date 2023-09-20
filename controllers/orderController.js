const Order = require("../models/orderModel").Order
const Food = require("../models/foodModel").Food


module.exports.getAllOrder = async(req,res) => {

    try {

        const data = await Order.find().sort({createdAt: -1})
        if(data){
            res.json({data: data})
        } 
    } catch(err){
        res.json({erreur: err})
    }
}


module.exports.addOrder = async(req, res) => {

    const {customer_id, customer, address, total,  status, orderItems} = req.body
    
    
    try {
        const data = await Order.create({
            customer_id: customer_id, 
            customer: customer,
            address: address,
            total: total,
            status: status,
            orderItems: orderItems
        })
   
         
        if(data){
            res.json({data: data})
        }else {
            res.json({erreuuur : "erreur"})
        }
    }catch(err){
        console.error(err)
        res.json({err: err})
    }



}


module.exports.editOrderStatus = async(req,res) => {


    const status = {
        status : req.body.status,           
        
        
    }
    try {
        Order.findByIdAndUpdate(req.params.id, 
            {$inc : {status : 1}},
            {new : true},
            (err, docs) =>{
                if(!err) {
                
                res.json(docs)
                }
                else console.log("update err :" + err)
     
            })
        }catch(err){
            res.json({erreur: err})
        }
    }

    module.exports.getOrderByUserId = async(req,res) => {

        try{
            const data = await Order.find({customer_id: req.params.userId}).sort({ updatedAt: -1 })
            if(data){

                res.json({data: data})
            }
        }catch(err) {
            res.json({erreur: err})
        }
    }