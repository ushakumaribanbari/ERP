const express=require("express");

const router=express.Router();

const {
getLeaves,
createLeave,
approveLeave,
rejectLeave
}=require("../controllers/leaveController");


router.get(
"/",
getLeaves
);


router.post(
"/",
createLeave
);


router.put(
"/:id/approve",
approveLeave
);


router.put(
"/:id/reject",
rejectLeave
);


module.exports=router;