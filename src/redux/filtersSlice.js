import { createSlice } from "@reduxjs/toolkit";

const filtersSlice = createSlice({
    name: 'filters',
    initialState: {
        name: '',
    },
    reducers: {
        changeFilter: (state, action) => {
            state.name = action.payload;
            return state;
        },
    },
});

export const { changeFilter } = filtersSlice.actions;
export default filtersSlice.reducer;
export const selectFiltersName = state => state.filters.name;