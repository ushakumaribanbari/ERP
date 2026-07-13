import "./UpcomingEvents.css";

const events = [

    {
        title:"Team Meeting",
        date:"8 July • 10:00 AM"
    },

    {
        title:"Payroll Processing",
        date:"10 July"
    },

    {
        title:"Inventory Audit",
        date:"12 July"
    },

    {
        title:"Monthly Report",
        date:"15 July"
    }

];

function UpcomingEvents(){

    return(

        <div className="events-card">

            <h2>Upcoming Events</h2>

            <div className="events-list">

                {events.map((event,index)=>(

                    <div
                        key={index}
                        className="event-item"
                    >

                        <div className="event-circle"></div>

                        <div>

                            <h4>{event.title}</h4>

                            <p>{event.date}</p>

                        </div>

                    </div>

                ))}

            </div>

        </div>

    );

}

export default UpcomingEvents;