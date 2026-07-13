import "./LeaveTable.css";


function LeaveTable({
    leaveData,
    onApprove,
    onReject,
    onView
}) {


const statusClass=(status)=>{

    if(status==="Approved")
        return "approved";

    if(status==="Rejected")
        return "rejected";

    return "pending";

};


return(

<div className="leave-table-card">


<div className="table-header">

<h2>
Leave Requests
</h2>

<p>
Showing {leaveData.length} requests
</p>

</div>


<table>


<thead>

<tr>

<th>Employee</th>
<th>Department</th>
<th>Leave Type</th>
<th>From</th>
<th>To</th>
<th>Days</th>
<th>Status</th>
<th>Actions</th>


</tr>

</thead>



<tbody>


{
leaveData.map((leave)=>(


<tr key={leave.id}>


<td>{leave.employee}</td>

<td>{leave.department}</td>

<td>{leave.type}</td>

<td>{leave.from}</td>

<td>{leave.to}</td>

<td>{leave.days}</td>


<td>

<span className={statusClass(leave.status)}>

{leave.status}

</span>

</td>


<td className="actions">

    <button
        className="view-btn"
        onClick={() => onView(leave)}
    >
        View
    </button>


    {
        leave.status === "Pending" && (

            <>

                <button
                className="approve-btn"
                onClick={()=>{

                console.log("Approve clicked ID:",leave._id);

                onApprove(leave._id);

                }}
                >
                Approve
                </button>


                <button
                    className="reject-btn"
                    onClick={() => {

                    console.log("Reject clicked ID:", leave._id);

                    onReject(leave._id);

                    }}
                    >
                    Reject
                </button>

            </>

        )
    }


    {
        leave.status !== "Pending" && (

            <span className="completed-action">
                {leave.status}
            </span>

        )
    }

</td>


</tr>


))
}


</tbody>


</table>


</div>

);


}


export default LeaveTable;