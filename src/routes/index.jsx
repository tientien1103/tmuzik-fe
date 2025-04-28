import * as React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import BlankLayout from "../layouts/BlankLayout.jsx";
import MainLayout from "../layouts/MainLayout.jsx";
import HomePage from "../pages/HomePage.jsx";
import LoginPage from "../pages/LoginPage.jsx";
import NotFoundPage from "../pages/NotFoundPage.jsx";
import AuthRequire from "./AuthRequire.jsx";
import RegisterPage from "../pages/RegisterPage.jsx";
import SongDetails from "../pages/SongDetails.jsx";
import ArtistDetails from "../pages/ArtistDetails.jsx";
import TopArtists from "../pages/TopArtists.jsx";
import Playlist from "../pages/Playlist.jsx";
import TopCharts from "../pages/TopCharts.jsx";
import MusicPlayer from "../components/music-player/index.jsx";
import AccountGeneral from "../pages/AccountGeneral.jsx";
import { useSelector } from "react-redux";
import PlaylistDetails from "../pages/PlaylistDetails.jsx";

function Router() {
  const { activeSong } = useSelector((state) => state.player);
  const location = useLocation();
  const isAuthPage = ['/login', '/register'].includes(location.pathname);

  return (
    <div className="relative">
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<HomePage />} />
          <Route
            path="account"
            element={
              <AuthRequire>
                <AccountGeneral />
              </AuthRequire>
            }
          />
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

      {activeSong?.title && !isAuthPage && (
        <div className="fixed h-28 bottom-0 left-0 right-0 flex animate-slideup bg-gradient-to-br from-white/10 to-[#27A3A3] backdrop-blur-lg rounded-t-3xl z-10">
          <MusicPlayer />
        </div>
      )}
    </div>
  );
}

export default Router;
