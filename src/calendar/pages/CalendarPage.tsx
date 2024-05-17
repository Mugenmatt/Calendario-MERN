import { CalendarEvent, Navbar, CalendarModal } from ".."
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import esES from 'date-fns/locale/es';
import { addHours, parse, startOfWeek, getDay, format } from 'date-fns';
import { useState } from "react";

interface EventProps {
  title: string;
  notes: string;
  start: Date;
  end: Date;
  bgColor: string;
  user: {id: string; name: string}
}


const getMessagesES = () => {
  return {
    allDay: 'Todo el día',
    previous: '<',
    next: '>',
    today: 'Hoy',
    month: 'Mes',
    week: 'Semana',
    day: 'Día',
    agenda: 'Agenda',
    date: 'Fecha',
    time: 'Hora',
    event: 'Evento',
    noEventsInRange: 'No hay eventos en este rango',
    showMore: (total: string) => `+ Ver más (${total})`
  }
}

const locales = {
  'es': esES,
}

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
})

const events = [{
  title: 'Mi cumpleaños',
  notes: '¡Cumplo 31!',
  start: new Date(),
  end: addHours(new Date(), 2),
  bgColor: '#fafafa',
  user: {
    id: '123',
    name: 'Matías'
  }
}]

export const CalendarPage = () => {

  const [lastView, setLastView] = useState( localStorage.getItem('lastView' || 'week') )

  const eventStyleGetter = ( event: EventProps, start: Date, end: Date, isSelected: boolean ) => {
    // console.log(event, start, end, isSelected);

    const style = {
      backgroundColor: '#347CF7',
      opacity: 0.8,
      borderRadius: '0px',
      color: 'white'
    }

    return style;
  }

  
  const onDoubleClick = (event) => {
    console.log({doubleClick: event});
  }

  const onSelect = (event) => {
    console.log({click: event});
  }

  const onViewChanged = (event) => {
    console.log({viewChanged: event});
    localStorage.setItem('lastView', event)
    setLastView(event)
  }

  return (
    <>
      <Navbar />
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 'calc( 100vh - 80px )' }}
        culture="es"
        messages={ getMessagesES() }
        eventPropGetter={ eventStyleGetter }
        components={{
          event: CalendarEvent,
        }}
        onDoubleClickEvent={ onDoubleClick } // Doble click en el evento
        onSelectEvent={ onSelect } // 
        onView={ onViewChanged } // mes dia agenda
        defaultView={ 'agenda' } // vista inicial
      />
      <CalendarModal />
    </>
  )
}

