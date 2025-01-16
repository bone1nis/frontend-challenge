import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from ".";

import { ICat } from "../types/types";


export const fetchCats = createAsyncThunk<ICat[], number | undefined>(
    "cats/fetchCats",
    async (value = 20) => {
        let data;

        try {
            const response = await fetch(`https://api.thecatapi.com/v1/images/search?limit=${value}&api_key=live_xZleH3vcw7GdeK3M3k5rgc4P49RMgyM5ZF59otRlTbRyM2qDwu5DL0Qs8ypFmH2I`);

            if (!response.ok) {
                throw new Error(`Could not fetch, status: ${response.status}`);
            }

            data = await response.json();
        } catch(e: unknown) {
            if (e instanceof Error) {
                throw new Error(`HTTP request failed: ${e.message}`);
            } else {
                throw new Error(`Failed`);
            }
        }

        return data;
    }
);

interface initialState {
    catsList: ICat[],
    likedCatsList: ICat[],
    filterActive: string,
    loadingStatus: string
}

const initialState: initialState = {
    catsList: [],
    likedCatsList: [],
    filterActive: "all",
    loadingStatus: "idle"
}


const catsSlice = createSlice({
    name: "fruits",
    initialState: initialState,
    reducers: {
        catAdd: (state, action: PayloadAction<ICat>) => {
            state.catsList.push(action.payload)
        },
        setCats: (state, action: PayloadAction<ICat[]>) => {
            state.catsList = [...action.payload]
        },
        toggleLiked: (state, action: PayloadAction<string>) => {
            const cat = state.catsList.find(item => item.id === action.payload)
            const catIsLike = state.likedCatsList.find(item => item.id === action.payload);

            if (catIsLike) {
                state.likedCatsList = state.likedCatsList.filter(item => item.id !== action.payload)
            } else {
                if (cat) {
                    state.likedCatsList.push(cat)
                }
            }
        },
        setFilter: (state, action: PayloadAction<string>) => {
            state.filterActive = action.payload
        }
    },
    extraReducers: builder => {
        builder
        .addCase(fetchCats.pending, (state) => {
            state.loadingStatus = "loading"
        })
        .addCase(fetchCats.fulfilled, (state, action: PayloadAction<ICat[]>) => {
            state.catsList = [...state.catsList, ...action.payload]
            state.loadingStatus = "idle"
        })
        .addCase(fetchCats.rejected, (state) => {
            state.loadingStatus = "error"
        })
    }
})

const { reducer, actions } = catsSlice;

export default reducer;

export const {
    catAdd,
    setCats,
    toggleLiked,
    setFilter,
} = actions;

export const selectLikedCatById = (state: RootState, id: string) => {
    return state.cats.likedCatsList.find((cat: ICat) => cat.id === id)
}