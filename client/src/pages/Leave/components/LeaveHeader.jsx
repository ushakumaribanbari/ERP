import "./LeaveHeader.css";


function LeaveHeader({
    onApplyLeave
}){

return(

<div className="leave-header">


<div>
<h1>
Leave Management
</h1>

<p>
Manage employee leaves and approvals
</p>

</div>



<button
className="apply-leave-btn"
onClick={onApplyLeave}
>
+ Apply Leave
</button>


</div>

);

}


export default LeaveHeader;