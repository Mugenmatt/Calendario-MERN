import { createSlice } from "@reduxjs/toolkit";

export const uiSlice = createSlice({
    name: 'ui',
    initialState: {
        isDateModalOpen: false
    },
    reducers: {
        onOpenDateModal: (state) => {
            // state.isDateModalOpen = true; // Este también es valido porque lo permite redux TOOLKIT
            return {
                ...state,
                isDateModalOpen: true
            }
        },
        onCloseDateModal: (state) => {
            // state.isDateModalOpen = false; // Este también es valido porque lo permite redux TOOLKIT
            return {
                ...state,
                isDateModalOpen: false
            }
        },
    }
})

export const { onOpenDateModal, onCloseDateModal } = uiSlice.actions;