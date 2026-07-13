import "./LeaveCalendar.css";


function LeaveCalendar(){


return(

<div className="leave-calendar-card">


<h2>
Leave Calendar
</h2>


<div className="calendar">


{
[
"Sun",
"Mon",
"Tue",
"Wed",
"Thu",
"Fri",
"Sat"
].map(day=>(

<div className="day header">

{day}

</div>

))
}



{

Array.from({length:31},(_,i)=>(


<div

key={i}

className="day"

>

{i+1}

</div>


))

}


</div>


</div>


);


}


export default LeaveCalendar;