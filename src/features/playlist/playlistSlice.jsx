import { createSlice } from "@reduxjs/toolkit";
import apiService from "../../app/apiService.jsx";

const initialState = {
  isLoading: false,
  error: null,
  playlists: [],
  songs: [],
  playlistsById: {},
  currentPagePlaylists: [],
  totalPlaylists: null,
  image: [],
};

const playlistSlice = createSlice({
  name: "playlist",
  initialState,
  reducers: {
    startLoading(state) {
      state.isLoading = true;
    },
    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
    getPlaylistsSuccess(state, action) {
      state.isLoading = false;
      state.error = null;

      state.playlists = action.payload.data.playlists;
    },
    getSinglePlaylistSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      state.imageUrl = action.payload.data.imageUrl;
      state.songs = action.payload.data.songs;
    },
  },
});

const {
  startLoading,
  hasError,
  createPlaylisSuccess,
  getPlaylistsSuccess,
  getSinglePlaylistSuccess,
} = playlistSlice.actions;

export const createPlaylist =
  ({ name }) =>
  async (dispatch) => {
    dispatch(startLoading());
    try {
      // upload image to cloudinary
      const res = await apiService.post("/playlists", {
        name,
      });
      dispatch(createPlaylisSuccess(res.data));
    } catch (error) {
      dispatch(hasError(error.message));
    }
  };

export const getPlaylists =
  ({ page = 1, limit = 10 }) =>
  async (dispatch) => {
    dispatch(startLoading());
    try {
      const params = { page, limit };
      const res = await apiService.get(`/playlists`, {
        params,
      });
      dispatch(getPlaylistsSuccess(res.data));
    } catch (error) {
      dispatch(hasError(error.message));
    }
  };

export const getSinglePlaylist =
  ({ playlistId }) =>
  async (dispatch) => {
    dispatch(startLoading());
    try {
      const res = await apiService.get(`/playlists/${playlistId}`);
      dispatch(getSinglePlaylistSuccess(res.data));
    } catch (error) {
      dispatch(hasError(error.message));
    }
  };

export default playlistSlice.reducer;
