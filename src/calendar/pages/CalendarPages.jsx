import { Calendar } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css'
import { useState } from 'react';
import { Navbar, CalendarEvent, CalendarModal } from "../"
import { getMessagesEs, localizer } from '../../helpers';
import { useCalendarStore, useUiStore } from '../../hooks';


export const CalendarPages = () => {

    const { openDateModal } = useUiStore();
    const { events, setActiveEvent } = useCalendarStore();

    const [lastView, setLastView] = useState(localStorage.getItem('lastView') || 'week')

    const eventsStyleGetter = (event, start, end, isSelected) => {
        const style = {
            bacgroundColor: '#347CF7',
            boderRadius: '0px',
            opacity: 0.8,
            color: 'white'
        }

        return {
            style
        }


    }
    const onDoubleClick = (event) => {
        // console.log({ doubleClick: event });
        openDateModal();

    }

    const onSelect = (event) => {
        // console.log({ click: event });
        setActiveEvent(event);
    }

    const onViewChanged = (event) => {
        localStorage.setItem('lastView', event)
        setLastView(event)
    }
    return (
        <>
            <Navbar />
            <Calendar
                culture='es'
                localizer={localizer}
                events={events}
                defaultView={lastView}
                startAccessor="start"
                endAccessor="end"
                style={{ height: '80vh' }}
                messages={getMessagesEs()}
                eventPropGetter={eventsStyleGetter}
                onDoubleClickEvent={onDoubleClick}
                onSelectEvent={onSelect}
                onView={onViewChanged}
                components={{
                    event: CalendarEvent
                }}

            />
            <CalendarModal />
        </>
    )
}
