import { useDispatch, useSelector } from "react-redux";
import { onAddNewEvent, onDeleteEvent, onSetActiveEvent, onUpdateEvent } from "../store";

export const useCalendarStore = () => {

    const { events, activeEvent } = useSelector(state => state.calendar);
    const dispatch = useDispatch();

    const setActiveEvent = ( calendarEvent ) => {
        dispatch(onSetActiveEvent(calendarEvent));
    }

    const startSavingEvent = async ( calendarEvent ) => {

        if(calendarEvent._id) {
            // Actualizando (Editar)
            dispatch(onUpdateEvent({ ...calendarEvent })); // Se manda como spread para mandar un nuevo objeto
        } else {
            // Creando (Nuevo)
            dispatch(onAddNewEvent({ ...calendarEvent, _id: new Date().getTime() }));
        }
    }

    const startDeletingEvent = async () => {
        dispatch(onDeleteEvent())
    }

    return {
        // Propiedades
        events,
        activeEvent,
        hasEventSelected: !!activeEvent, // boolean: negacion de activeEvent. Si activeEvent null = false, objeto = true
        // Métodos
        setActiveEvent,
        startSavingEvent,
        startDeletingEvent,
    }
}
