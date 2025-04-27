import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/user/userSlice.jsx";
import userHistoryReducer from "../features/user-history/userHistorySlice.jsx";
import songReducer from "../features/song/songSlice.jsx";
import playerReducer from "../features/player/playerSlice.jsx";
import artistReducer from "../features/artist/artistSlice.jsx";
import topChartReducer from "../features/top-chart/topChartSlice.jsx";
import playlistReducer from "../features/playlist/playlistSlice.jsx";

const rootReducer = {
  user: userReducer,
  userHistory: userHistoryReducer,
  song: songReducer,
  player: playerReducer,
  artist: artistReducer,
  playlist: playlistReducer,
  topChart: topChartReducer,
};

const store = configureStore({
  reducer: rootReducer,
});

export default store;
