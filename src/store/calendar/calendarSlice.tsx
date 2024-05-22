import { createSlice } from "@reduxjs/toolkit";
import { addHours } from "date-fns";

const tempEvent = {
    _id: new Date().getTime(),
    title: 'Mi cumpleaños',
    notes: '¡Cumplo 31!',
    start: new Date(),
    end: addHours(new Date(), 2),
    bgColor: '#fafafa',
    user: {
      _id: '123',
      name: 'Matías'
    }
  }

export const calendarSlice = createSlice({
    name: 'calendar',
    initialState: {
        events: [ tempEvent ],
        activeEvent: null
    },
    reducers: {
        onSetActiveEvent: (state, action) => {
            return {
                ...state,
                activeEvent: action.payload // Envia el evento activo(cliqueado)
            }
        },
        onAddNewEvent: (state, action) => {
            state.events.push(action.payload); // Inserta nuevo evento
            state.activeEvent = null; // Limpia evento activo
        },
        onUpdateEvent: (state, action) => {
            state.events = state.events.map(event => {
                if (event._id === action.payload._id) {
                    return action.payload;
                }
                return event;
            })
        },
        onDeleteEvent: (state) => {
            if(state.activeEvent) {
                state.events = state.events.filter( event => event._id !== state.activeEvent._id )
                state.activeEvent = null; // Limpia evento activo
            }
        },
    }
})

export const { onSetActiveEvent, onAddNewEvent, onUpdateEvent, onDeleteEvent } = calendarSlice.actions;