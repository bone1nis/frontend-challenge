import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from ".";

import { useHttp } from "../hooks/http.hook";

import { ICat } from "../types/types";


export const fetchCats = createAsyncThunk<ICat[]>(
    "cats/fetchCats",
    async () => {
        const request = useHttp<ICat[]>();

        const res = await request("https://api.thecatapi.com/v1/images/search?limit=15&breed_ids=beng&api_key=live_xZleH3vcw7GdeK3M3k5rgc4P49RMgyM5ZF59otRlTbRyM2qDwu5DL0Qs8ypFmH2I");
        return res
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
            state.catsList = [...action.payload]
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