import { createSlice } from "@reduxjs/toolkit";
import CardType from "../Types/CardType";

const initState = {
    title: <string>"",
    access: <number>0,
    cards: <CardType[]>[]
}

const editableModuleSlice = createSlice({
    name: 'editableModule',
    initialState: initState,
    reducers: {
        setTitle(state, action) {
            state.title = action.payload;
        },
        setAccess(state, action) {
            state.access = action.payload;
        },
        addCard(state, action) {
            let id: number = action.payload.id;

            for(const card of state.cards)
                if (card.id === id)
                    return;

            state.cards.push(action.payload);
        },
        updateCard(state, action) {
            let id: number = action.payload.id;

            for(let card of state.cards) {
                if (card.id === id) {
                    card.term = action.payload.term;
                    card.definition = action.payload.definition;
                }
            }
        },
        removeCard(state, action) {
            let id: number = action.payload;

            state.cards = state.cards.filter(card => card.id !== id);
        },
        reset(state) {
            state.title = initState.title;
            state.access = initState.access;
            state.cards = initState.cards;
        }
    }
});

export const {setTitle, setAccess, addCard, updateCard, removeCard, reset} = editableModuleSlice.actions;

export default editableModuleSlice.reducer;