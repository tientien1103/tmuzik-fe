import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentSongs: [],
  currentIndex: 0,
  isActive: false,
  isPlaying: false,
  activeSong: {},
};

const playerSlice = createSlice({
  name: "player",
  initialState,
  reducers: {
    setActiveSong: (state, action) => {
      state.activeSong = action.payload.song;

      if (action.payload?.songs) {
        state.currentSongs = action.payload.songs;
      } else if (action.payload?.data?.properties) {
        state.currentSongs = action.payload?.songs;
      } else {
        state.currentSongs = action.payload.songs;
      }

      state.currentIndex = action.payload.i;
      state.isActive = true;
    },

    nextSong: (state, action) => {
      if (state.currentSongs[action.payload]) {
        state.activeSong = state.currentSongs[action.payload];
      } else {
        state.activeSong = state.currentSongs[action.payload];
      }

      state.currentIndex = action.payload;
      state.isActive = true;
    },

    prevSong: (state, action) => {
      if (state.currentSongs[action.payload]) {
        state.activeSong = state.currentSongs[action.payload];
      } else {
        state.activeSong = state.currentSongs[action.payload];
      }

      state.currentIndex = action.payload;
      state.isActive = true;
    },

    playPause: (state, action) => {
      state.isPlaying = action.payload;
    },
  },
});

export const { setActiveSong, nextSong, prevSong, playPause } =
  playerSlice.actions;

export default playerSlice.reducer;
