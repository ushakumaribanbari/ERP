const Leave = require("../models/Leave");


// GET ALL LEAVES

exports.getLeaves = async(req,res)=>{

    try{

        const leaves = await Leave.find()
        .sort({
            createdAt:-1
        });


        res.status(200).json(leaves);


    }
    catch(error){

        res.status(500).json({

            message:error.message

        });

    }

};




// CREATE LEAVE

exports.createLeave = async(req,res)=>{

    try{

        const leave = new Leave({

            employee:req.body.employee,

            department:req.body.department,

            type:req.body.type,

            from:req.body.from,

            to:req.body.to,

            days:req.body.days,

            reason:req.body.reason,

            status:"Pending"

        });


        await leave.save();


        res.status(201).json(leave);


    }
    catch(error){

        res.status(500).json({

            message:error.message

        });

    }

};




// APPROVE LEAVE

exports.approveLeave = async(req,res)=>{


    try{


        const leave = await Leave.findByIdAndUpdate(

            req.params.id,

            {

                status:"Approved",

                approvedBy:"Administrator",

                approvedDate:new Date().toLocaleString()

            },

            {

                new:true

            }

        );



        if(!leave){

            return res.status(404).json({

                message:"Leave not found"

            });

        }



        res.status(200).json(leave);



    }

    catch(error){

        res.status(500).json({

            message:error.message

        });

    }


};





// REJECT LEAVE

exports.rejectLeave = async(req,res)=>{


    try{


        const leave = await Leave.findByIdAndUpdate(

            req.params.id,

            {

                status:"Rejected",

                approvedBy:"Administrator",

                approvedDate:new Date().toLocaleString()

            },

            {

                new:true

            }

        );



        if(!leave){

            return res.status(404).json({

                message:"Leave not found"

            });

        }



        res.status(200).json(leave);



    }

    catch(error){

        res.status(500).json({

            message:error.message

        });

    }


};