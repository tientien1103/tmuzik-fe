import * as React from "react";
import { Routes, Route } from "react-router-dom";
import BlankLayout from "../layouts/BlankLayout";
import MainLayout from "../layouts/MainLayout";
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import NotFoundPage from "../pages/NotFoundPage";
import AuthRequire from "./AuthRequire";
import RegisterPage from "../pages/RegisterPage";
import SongDetails from "../pages/SongDetails";
import ArtistDetails from "../pages/ArtistDetails";
import TopArtists from "../pages/TopArtists";
import Playlist from "../pages/Playlist";
import TopCharts from "../pages/TopCharts";
import MusicPlayer from "../components/music-player";
import AccountGeneral from "../pages/AccountGeneral";
import { useSelector } from "react-redux";
import PlaylistDetails from "../pages/PlaylistDetails";

function Router() {
  const { activeSong } = useSelector((state) => state.player);
  return (
    <div className="relative">
      <Routes>
        <Route
          path="/"
          element={
            <AuthRequire>
              <MainLayout />
            </AuthRequire>
          }
        >
          <Route index element={<HomePage />} />
          <Route path="account" element={<AccountGeneral />} />
          <Route path="songs/:songId" element={<SongDetails />} />
          <Route path="artists/:artistId" element={<ArtistDetails />} />
          <Route path="playlists" element={<Playlist />} />
          <Route path="playlists/:playlistId" element={<PlaylistDetails />} />
          <Route path="top-artists" element={<TopArtists />} />
          <Route path="top-charts" element={<TopCharts />} />
        </Route>

        <Route element={<BlankLayout />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>

      {activeSong?.title && (
        <div className="fixed h-28 bottom-0 left-0 right-0 flex animate-slideup bg-gradient-to-br from-white/10 to-[#27A3A3] backdrop-blur-lg rounded-t-3xl z-10">
          <MusicPlayer />
        </div>
      )}
    </div>
  );
}

export default Router;
