import FullCalendar from "@fullcalendar/react"; // must go before plugins
import dayGridPlugin, { DayGridView } from "@fullcalendar/daygrid"; // a plugin!
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";
import interactionPlugin from "@fullcalendar/interaction";
import Header from "../layout/header/header";
import './menu-planner-style.scss';
import React, { useState } from "react";
import PlannerModal from "./planner-modal/planner-modal";
const MenuPlanner = () => {
  const [modal, setModal] = useState(false);
  const editEvent = () => { };
  const handleDateClick = (info) => {
    console.log('modal')
    setModal(!modal);
    // alert('Clicked on: ' + info.dateStr);
    // // change the day's background color just for fun
    // info.dayEl.style.backgroundColor = 'red';
  };
  
  return (
    <>
      <Header />
      <div className="wrapper">
        <div>
          <FullCalendar
            plugins={[
              dayGridPlugin,
              timeGridPlugin,
              listPlugin,
              interactionPlugin,
            ]}
            initialView="dayGridMonth"
            dateClick={handleDateClick}
            eventColor="blue"
            eventTimeFormat={{
              hour: "numeric",
              minute: "2-digit",
              meridiem: "short",
            }}
            // events={[...]}
            events={[
              { // this object will be "parsed" into an Event Object
                title: 'The Title', // a property!
                date: '2022-05-10', // a property!
                end: '2022-05-13', // a property! ** see important note below about 'end' **
                url: 'google.com'
              },
              { title: 'event 2', date: '2022-05-02' }
            ]}
            eventClick={editEvent}
            headerToolbar={{
              left: "prev,next today",
              center: "title",
              right: "dayGridMonth,timeGridWeek,dayGridDay,listWeek",
            }}
            aspectRatio={1}
            height={600}
            dayMaxEvents={true}
          />
        </div>
      </div>
      {modal && <PlannerModal/>}

    </>
  );
};
export default MenuPlanner;
