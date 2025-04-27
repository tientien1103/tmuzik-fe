import React, { useEffect, useState } from "react";
import { getSinglePlaylist } from "../features/playlist/playlistSlice.jsx";
import { setActiveSong, playPause } from "../features/player/playerSlice.jsx";
import useAuth from "../hooks/useAuth.jsx";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { record } from "../features/user-history/userHistorySlice.jsx";
import SongBar from "../components/SongBar.jsx";
import Loader from "../components/Loader.jsx";

function PlaylistDetails() {
  const [page] = useState(1);
  const { user } = useAuth();
  const { playlistId } = useParams();
  const dispatch = useDispatch();

  const { songs, imageUrl, isLoading } = useSelector((state) => state.playlist);
  const { activeSong, isPlaying } = useSelector((state) => state.player);

  useEffect(() => {
    dispatch(getSinglePlaylist({ playlistId, page }));
  }, [page, playlistId, dispatch]);

  const handlePlayClick = (song, i) => {
    dispatch(setActiveSong({ song, songs, i }));
    dispatch(
      record({
        playlistId: playlistId,
        userId: user._id,
        data: "play playlist",
        action: "playPlaylist",
      })
    );
    dispatch(playPause(true));
  };

  const handlePauseClick = () => {
    dispatch(playPause(false));
  };

  if (isLoading) return <Loader />;
  return (
    <div className="w-full">
      <div className="container max-w-1072 mx-auto relative">
        <div className="flex flex-col lg:flex-row gap-16 lg:justify-evenly justify-center md:flex-row">
          <div className="xs:flex xs:flex-row xs:justify-center">
            <img
              loading="lazy"
              alt=""
              src={imageUrl}
              className="rounded-lg lg:w-80 w-48 object-cover border-2 shadow-xl sticky top-20 shadow-black"
            />
          </div>
          <div className="flex flex-col mb-20">
            <h2 className="text-white font-semibold text-3xl lg:text-5xl">
              Songs
            </h2>
            {songs.map((song, i) => (
              <div
                key={`${song.key}+${song._id}`}
                className="mt-6 lg:w-[550px] md:w-[450px] w-[360px]"
              >
                <SongBar
                  song={song}
                  i={i}
                  isPlaying={isPlaying}
                  activeSong={activeSong}
                  handlePauseClick={handlePauseClick}
                  handlePlayClick={handlePlayClick}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default PlaylistDetails;
