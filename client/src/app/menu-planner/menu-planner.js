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
  const [isOpen, setIsOpen] = useState(false);
  const [dateToShow, setDateToShow] = useState(new Date());
  const [date, setDate] = useState(new Date());
  const [menus, setMenus] = useState([{
    date: '2022-05-07',
    breakfast: { title: 'Bacon Caramels', details: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec con' },
    lunch: {},
    dinner: {}
  },
  {
    date: '2022-05-02',
    breakfast: {},
    lunch: { title: 'Butternut Squash & Pear Soup: Real Convenience food', details: 'Recipe...' },
    dinner: {}
  }, {
    date: '2022-06-01',
    breakfast: {}
    , lunch: {},
    dinner: { title: 'Coconut Almond Cheesecake', details: 'Coconut almond cheesecake recipe' }
  }]);
  const [currMenu, setCurrMenu] = useState({});

  const [events, setEvents] = useState([
    {
      
      title: 'breakfast: Bacon Caramels',
      date: '2022-05-07'
    },
    {
      title: 'lunch: Butternut Squash & Pear Soup: Real Convenience food',
      date: '2022-05-02'
    },
    {
      title: 'dinner: Coconut Almond Cheesecake',
      date: '2022-06-01'
    }]);
  const editEvent = () => { };
  const handleDateClick = (info) => {

    setIsOpen(true);
    const selectedDateString = info.date.toString().slice(4, 15);
    setDateToShow(selectedDateString);

    const parsedDate = parseDate(selectedDateString);
    setDate(parsedDate);


    let m = menus.find(m => m.date === parsedDate);
    if (!m) {
      m = {
        date: '',
        breakfast: {},
        lunch: {},
        dinner: {}
      }
    }

    setCurrMenu(m);

  };
  const parseDate = (dateString) => {
    const monthString = dateString.slice(0, 3).trim();
    const day = dateString.slice(4, 6).trim();
    const year = dateString.slice(7, 11).trim();

    let month = '';
    if (monthString === 'Jan') {
      month = '01';
    } else if (monthString === 'Feb') {
      month = '02';
    } else if (monthString === 'Mar') {
      month = '03';
    } else if (monthString === 'Apr') {
      month = '04';
    } else if (monthString === 'May') {
      month = '05';
    } else if (monthString === 'Jun') {
      month = '06';
    } else if (monthString === 'Jul') {
      month = '07';
    } else if (monthString === 'Aug') {
      month = '08';
    } else if (monthString === 'Sep') {
      month = '09';
    } else if (monthString === 'Oct') {
      month = '10';
    } else if (monthString === 'Nov') {
      month = '11';
    } else if (monthString === 'Dec') {
      month = '12';
    }

    return `${year}-${month}-${day}`;

  }

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
            eventColor="purple"
            eventTimeFormat={{
              hour: "numeric",
              minute: "2-digit",
              meridiem: "short",
            }}

            events={events}
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
      {isOpen ? <PlannerModal onClose={() => setIsOpen(false)} 
      dateToShow={dateToShow} menu={currMenu} events={events} 
      setEvents={setEvents}
      date={date}/> : null}
    </>
  );
};
export default MenuPlanner;
