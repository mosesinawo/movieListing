import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import movieApi from "../../common/apis/MovieApi";
import { APIkey } from "../../common/apis/MovieApiKey"

export const fetchAsyncMovies = createAsyncThunk(
    'movies/fetchAsyncMovies', async () => {
        const movieText = "Harry"
        const response = await movieApi.get(`?apikey=${APIkey}&s=${movieText}&type=movie`
        )
        return response.data
    })
export const fetchAsyncShows = createAsyncThunk(
    'movies/fetchAsyncShows', async () => {
        const seriesText = "Friends"
        const response = await movieApi.get(`?apikey=${APIkey}&s=${seriesText}&type=series`
        )
        return response.data
    })
export const fetchAsyncshowDetail = createAsyncThunk(
    'movies/fetchAsyncshowDetail', async (id) => {
        const response = await movieApi.get(
            `?apikey=${APIkey}&i=${id}&Plot=full`
        )
        return response.data
    })

const initialState = {
    movies: {},
    shows: {},
    movieDetail: {}
};

const movieSlice = createSlice({
    name: "movies",
    initialState,
    reducers: {
        removeShowDetails: (state) => {
            state.movieDetail = {}
        },
    },
    extraReducers: {
        [fetchAsyncMovies.pending]: () => {
            console.log("pending");
        },
        [fetchAsyncMovies.fulfilled]: (state, { payload }) => {
            console.log("Fetch successful")
            return { ...state, movies: payload }
        },
        [fetchAsyncMovies.rejected]: () => {
            console.log("Rejected");
        },
        [fetchAsyncShows.fulfilled]: (state, { payload }) => {
            console.log("Fetch successful")
            return { ...state, shows: payload }
        },
        [fetchAsyncshowDetail.fulfilled]: (state, { payload }) => {
            console.log("Fetch successful")
            return { ...state, movieDetail: payload }
        },

    }
});

export const { removeShowDetails } = movieSlice.actions;
export const getAllMovies = (state) => state.movies.movies
export const getAllShows = (state) => state.movies.shows
export const getAllDetail = (state) => state.movies.movieDetail
export default movieSlice.reducer