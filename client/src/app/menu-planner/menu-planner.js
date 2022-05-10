import FullCalendar from "@fullcalendar/react"; // must go before plugins
import dayGridPlugin, { DayGridView } from "@fullcalendar/daygrid"; // a plugin!
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";
import interactionPlugin from "@fullcalendar/interaction";
import Header from "../layout/header/header";
import './menu-planner-style.scss';
const MenuPlanner = () => {
  const editEvent = () => {};
  const handleDateClick = (args) => {
      //modal pop up
    alert(args.dateStr);
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
    </>
  );
};
export default MenuPlanner;
