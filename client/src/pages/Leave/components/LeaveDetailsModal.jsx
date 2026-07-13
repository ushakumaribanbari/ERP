import "./LeaveDetailsModal.css";


function LeaveDetailsModal({
    open,
    onClose,
    leave
}){

    if(!open || !leave)
        return null;


    return (

        <div className="leave-modal-overlay">

            <div className="leave-details-modal">


                <div className="modal-header">

                    <h2>
                        Leave Details
                    </h2>


                    <button onClick={onClose}>
                        ✕
                    </button>

                </div>



                <div className="leave-details">


                    <p>
                        <b>Employee:</b>
                        {leave.employee}
                    </p>


                    <p>
                        <b>Department:</b>
                        {leave.department}
                    </p>


                    <p>
                        <b>Leave Type:</b>
                        {leave.type}
                    </p>


                    <p>
                        <b>Duration:</b>
                        {leave.from} → {leave.to}
                    </p>


                    <p>
                        <b>Total Days:</b>
                        {leave.days}
                    </p>


                    <p>
                        <b>Reason:</b>
                        {leave.reason}
                    </p>


                    <hr/>


                    <p>
    <b>Status:</b>

    <span
        className={
            leave.status === "Approved"
                ? "modal-status approved"
                :
            leave.status === "Rejected"
                ? "modal-status rejected"
                :
                "modal-status pending"
        }
    >
        {leave.status}
    </span>

</p>


                    <p>
                        <b>Approved By:</b>
                        {leave.approvedBy || "Pending"}
                    </p>

                    <hr/>

<h3>
    Leave Timeline
</h3>


<div className="timeline">

{
    leave.timeline?.map((item,index)=>(

        <div 
            className="timeline-item"
            key={index}
        >

            <div className="timeline-dot">
            </div>


            <div>

                <strong>
                    {item.action}
                </strong>

                <p>
                    {item.date}
                </p>

            </div>

        </div>

    ))
}

</div>


                    <p>
                        <b>Approved Date:</b>
                        {leave.approvedDate || "--"}
                    </p>



                </div>


            </div>

        </div>

    );

}


export default LeaveDetailsModal;