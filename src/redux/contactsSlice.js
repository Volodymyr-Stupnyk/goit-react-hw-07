import { createSlice, createSelector } from "@reduxjs/toolkit";
import { fetchContact, addContact, deleteContact } from "./contactsOps";
import { selectFiltersName } from "./filtersSlice";

const contactsSlice = createSlice({
    name: 'contacts',
    initialState: {
        items: [],
        loading: false,
        error: null,
    },
    extraReducers: builder => {
        builder
            .addCase(fetchContact.pending, handlePending)
            .addCase(fetchContact.rejected, handleRejected)
            .addCase(fetchContact.fulfilled, (state, action) => ({
                ...state,
                items: action.payload,
                loading: false,
            }))
            .addCase(addContact.pending, handlePending)
            .addCase(addContact.rejected, handleRejected)
            .addCase(addContact.fulfilled, (state, action) => ({
                ...state,
                items: [...state.items, action.payload],
                loading: false,
            }))
            .addCase(deleteContact.pending, handlePending)
            .addCase(deleteContact.rejected, handleRejected)
            .addCase(deleteContact.fulfilled, (state, action) => ({
                ...state,
                items: state.items.filter(item => item.id !== action.payload),
                loading: false,
            }));
    },
});

export default contactsSlice.reducer;
const selectContacts = state => state.contacts.items;
export const selectLoading = state => state.contacts.loading;
export const selectError = state => state.contacts.error;
export const selectFilteredContacts = createSelector(
    [selectContacts, selectFiltersName],
    (contacts, search) =>
        Array.isArray(contacts) ?
            contacts.filter(contact =>
                contact.name.toLowerCase().includes(search.toLowerCase())
            )
            : []
);
const handlePending = state => ({ ...state, loading: true, error: null });
const handleRejected = (state, action) => ({
    ...state,
    loading: false,
    error: action.payload,
});