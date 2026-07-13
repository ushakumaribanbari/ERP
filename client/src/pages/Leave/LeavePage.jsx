import { useState, useEffect } from "react";

import {
    getLeaves,
    createLeave,
    approveLeave,
    rejectLeave,
    getLeaveBalances
} from "../../api/leaveApi";


import "./LeavePage.css";
import { useLeaves } from "../../context/LeaveContext";

import LeaveTypeManagement from "./components/LeaveTypeManagement";
import LeaveFilters from "./components/LeaveFilters";
import LeaveHeader from "./components/LeaveHeader";
import LeaveStats from "./components/LeaveStats";
import LeaveTable from "./components/LeaveTable";
import LeaveModal from "./components/LeaveModal";
import LeaveBalance from "./components/LeaveBalance";
import LeaveDetailsModal from "./components/LeaveDetailsModal";
import NotificationPanel from "./components/NotificationPanel";
import LeaveCalendar from "./components/LeaveCalendar";



function LeavePage(){

    const {
    leaveData,
    setLeaveData
} = useLeaves();

    const [openModal,setOpenModal] = useState(false);


    const [selectedLeave,setSelectedLeave] = useState(null);



    const [search,setSearch] = useState("");


    const [department,setDepartment] =
    useState("All Departments");


    const [status,setStatus] =
    useState("All Status");


    const [type,setType] =
    useState("All Leave Types");



    const [notifications,setNotifications] =
    useState([]);


    const [leaveBalances,setLeaveBalances] = useState([]);

    const [leaveTypes,setLeaveTypes] =
    useState([

        {
            id:1,
            name:"Casual Leave",
            days:12
        },

        {
            id:2,
            name:"Sick Leave",
            days:10
        },

        {
            id:3,
            name:"Paid Leave",
            days:15
        }

    ]);





    const [formData,setFormData] =
    useState({

        employee:"",
        type:"Casual Leave",
        from:"",
        to:"",
        days:"",
        reason:""

    });





    useEffect(()=>{

loadLeaves();

loadLeaveBalances();

},[]);





    const loadLeaves = async()=>{


        try{


            const response =
            await getLeaves();


            setLeaveData(response.data);


        }
        catch(error){

            console.log(error);

        }



    };



    const loadLeaveBalances = async()=>{


try{


const response = await getLeaveBalances();


setLeaveBalances(response.data);


}
catch(error){

console.log(
"Leave Balance Error:",
error
);

}


};





    const handleSaveLeave = async()=>{


        try{


            const newLeave = {


                employee:
                formData.employee,


                department:
                "General",


                type:
                formData.type,


                from:
                formData.from,


                to:
                formData.to,


                days:
                Number(formData.days),


                reason:
                formData.reason,


                status:
                "Pending",


                approvedBy:"",


                approvedDate:"",



                timeline:[

                    {
                        action:"Leave Applied",

                        date:
                        new Date().toLocaleString()

                    }

                ]


            };




            const response =
            await createLeave(newLeave);



           setLeaveData(prev => [
                ...prev,
                response.data
            ]);


            setOpenModal(false);



            setFormData({

                employee:"",
                type:"Casual Leave",
                from:"",
                to:"",
                days:"",
                reason:""

            });



        }

        catch(error){

            console.log(error);

        }


    };









    const handleApprove = async(id)=>{

        console.log("Approve clicked ID:", id);

        try{


            const response =
            await approveLeave(id);


            console.log("Approve response:", response.data);

            setLeaveData(

                leaveData.map(leave=>


                    leave._id === id

                    ?

                    response.data

                    :

                    leave


                )

            );





            setNotifications(prev=>[


                {

                    id:Date.now(),

                    message:
                    `${response.data.employee}'s leave approved`,

                    time:
                    new Date()
                    .toLocaleTimeString()

                },


                ...prev


            ]);



        }


        catch(error){

            console.log("Approve Error:", error.response || error);

        }



    };


    const handleReject = async(id)=>{

    try{

        const response = await rejectLeave(id);


        setLeaveData(

            leaveData.map(leave=>

                leave._id === id

                ?

                response.data

                :

                leave

            )

        );


        setNotifications(prev=>[

            {

                id:Date.now(),

                message:
                `${response.data.employee}'s leave was rejected`,

                time:
                new Date()
                .toLocaleTimeString()

            },

            ...prev

        ]);


    }

    catch(error){

        console.log("Reject Error:",error);

    }


};






    









    const filteredLeaves =
    leaveData.filter((leave)=>{



        const searchMatch =

        leave.employee
        .toLowerCase()
        .includes(
            search.toLowerCase()
        );




        const departmentMatch =

        department==="All Departments"

        ||

        leave.department===department;




        const statusMatch =

        status==="All Status"

        ||

        leave.status===status;





        const typeMatch =

        type==="All Leave Types"

        ||

        leave.type===type;





        return(

            searchMatch &&

            departmentMatch &&

            statusMatch &&

            typeMatch

        );


    });







    const resetFilters = ()=>{


        setSearch("");

        setDepartment(
            "All Departments"
        );


        setStatus(
            "All Status"
        );


        setType(
            "All Leave Types"
        );


    };









return(


<div className="leave-page">



<LeaveHeader

onApplyLeave={()=>setOpenModal(true)}

/>




<LeaveStats />





<LeaveFilters

search={search}

setSearch={setSearch}

department={department}

setDepartment={setDepartment}

status={status}

setStatus={setStatus}

type={type}

setType={setType}

onReset={resetFilters}

/>






<LeaveTable


leaveData={filteredLeaves}


onApprove={handleApprove}


onReject={handleReject}


onView={(leave)=>
setSelectedLeave(leave)
}


/>







<LeaveBalance

leaveBalances={leaveBalances}

/>







<LeaveTypeManagement

leaveTypes={leaveTypes}

setLeaveTypes={setLeaveTypes}

/>






<LeaveCalendar />






<LeaveModal


open={openModal}


onClose={()=>
setOpenModal(false)
}


formData={formData}


setFormData={setFormData}


onSave={handleSaveLeave}


leaveTypes={leaveTypes}


/>







<LeaveDetailsModal


open={
selectedLeave !== null
}


leave={selectedLeave}


onClose={()=>
setSelectedLeave(null)
}


/>







<NotificationPanel

notifications={notifications}

/>





</div>


);


}



export default LeavePage;