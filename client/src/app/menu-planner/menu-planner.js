/* eslint-disable dot-notation */
/* eslint-disable no-plusplus */
/* eslint-disable no-restricted-syntax */
import React, { useState } from 'react';
import FullCalendar from '@fullcalendar/react'; // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid'; // a plugin!
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import interactionPlugin from '@fullcalendar/interaction';
import Header from '../layout/header/header';
import './menu-planner-style.scss';
import PlannerModal from './planner-modal/planner-modal';

function MenuPlanner() {
  const [isOpen, setIsOpen] = useState(false);
  const [dateToShow, setDateToShow] = useState(new Date());
  const [date, setDate] = useState(new Date());
  const [currentMenu, setcurrentMenu] = useState({});
  const [menus, setMenus] = useState([
    {
      date: '2022-05-07',
      breakfast: { title: 'Bacon Caramels', details: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec con' },
      lunch: {},
      dinner: {},
    },
  ]);
  const [events, setEvents] = useState([
    {
      id: 1,
      title: 'breakfast: Bacon Caramels',
      date: '2022-05-07',
    }]);

  const editEvent = (/* info */) => {
    // const clickedEvent = info.event;
    // console.log(clickedEvent['_def']);
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
  };
  const handleDateClick = (info) => {
    setIsOpen(true);
    const selectedDateString = info.date.toString().slice(4, 15);
    setDateToShow(selectedDateString);

    const parsedDate = parseDate(selectedDateString);
    setDate(parsedDate);

    let menu = menus.find((meal) => meal.date === parsedDate);
    if (!menu) {
      menu = {
        date: parsedDate,
        breakfast: {},
        lunch: {},
        dinner: {},
      };
    }
    setcurrentMenu(menu);
  };
  const modifyEvents = (meals) => {
    const currentEvents = events;
    for (let i = 0; i < events.length; i++) {
      const event = events[i];
      if (event.date === meals.date) {
        currentEvents.splice(i, 1);
        i--;
      }
    }
    for (const [key, value] of Object.entries(meals)) {
      if (key !== 'date' && Object.keys(value).length !== 0) {
        const eventToPush = {
          id: value.id,
          title: `${key} : ${value.title}`,
          date: meals.date,
        };
        currentEvents.push(eventToPush);
      }
    }
    setEvents([...currentEvents]);
  };
  const onClose = (meals, deletedMealsIds) => {
    setIsOpen(false);
    const currentMenus = menus;
    const menuItemIndex = menus.findIndex((meal) => meal.date === meals.date);
    if (menuItemIndex === -1) {
      currentMenus.push(meals);
    } else {
      currentMenus[menuItemIndex] = meals;
    }
    setMenus([...currentMenus]);
    modifyEvents(meals, deletedMealsIds);
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
            eventColor="purple"
            eventTimeFormat={{
              hour: 'numeric',
              minute: '2-digit',
              meridiem: 'short',
            }}
            events={events}
            eventClick={editEvent}
            headerToolbar={{
              left: 'prev,next today',
              center: 'title',
              right: 'dayGridMonth,timeGridWeek,dayGridDay,listWeek',
            }}
            aspectRatio={1}
            height={600}
          />
        </div>
      </div>
      {isOpen
        && (
          <PlannerModal
            onClose={onClose}
            dateToShow={dateToShow}
            menu={currentMenu}
            events={events}
            setEvents={setEvents}
            date={date}
          />
        )}
    </>
  );
}

export default MenuPlanner;
