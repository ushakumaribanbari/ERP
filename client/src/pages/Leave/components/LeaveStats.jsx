import "./LeaveStats.css";


function LeaveStats(){

    const stats = [

        {
            title:"Pending Requests",
            count:12,
            color:"orange"
        },

        {
            title:"Approved Leaves",
            count:45,
            color:"green"
        },

        {
            title:"Rejected Leaves",
            count:3,
            color:"red"
        },

        {
            title:"Employees On Leave",
            count:8,
            color:"blue"
        }

    ];


    return(

        <div className="leave-stats">


            {
                stats.map((item)=>(

                    <div
                        className={`leave-card ${item.color}`}
                        key={item.title}
                    >

                        <h3>
                            {item.title}
                        </h3>


                        <h1>
                            {item.count}
                        </h1>


                        <p>
                            Employees
                        </p>


                    </div>

                ))
            }


        </div>

    );

}


export default LeaveStats;