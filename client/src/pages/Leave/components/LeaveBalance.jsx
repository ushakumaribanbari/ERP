import "./LeaveBalance.css";


function LeaveBalance({
    leaveBalances = []
}){


return(

<div className="leave-balance-card">


<h2>
Employee Leave Balance
</h2>


<div className="balance-grid">


{

leaveBalances.map((emp)=>(


<div 
className="balance-item" 
key={emp.employee}
>


<h3>
{emp.employee}
</h3>


<p>
Casual Leave:

<span>
{emp.casual} days
</span>

</p>


<p>
Sick Leave:

<span>
{emp.sick} days
</span>

</p>


<p>
Paid Leave:

<span>
{emp.paid} days
</span>

</p>


</div>


))


}


</div>


</div>

);


}


export default LeaveBalance;