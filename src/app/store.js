import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/user/userSlice";
import userHistoryReducer from "../features/user-history/userHistorySlice";
import songReducer from "../features/song/songSlice";
import playerReducer from "../features/player/playerSlice";
import artistReducer from "../features/artist/artistSlice";
import topChartReducer from "../features/top-chart/topChartSlice";
import playlistReducer from "../features/playlist/playlistSlice";

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
