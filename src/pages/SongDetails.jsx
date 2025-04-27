import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import DetailsHeader from "../components/DetailsHeader.jsx";
import RelatedSongs from "../components/RelatedSongs.jsx";

import { setActiveSong, playPause } from "../features/player/playerSlice.jsx";
import { getSongDetail, getSongs } from "../features/song/songSlice.jsx";
import Loader from "../components/Loader.jsx";
import { record } from "../features/user-history/userHistorySlice.jsx";
import useAuth from "../hooks/useAuth.jsx";

const SongDetails = () => {
  const [page] = useState(1);
  const { songId } = useParams();
  const { user } = useAuth();
  const dispatch = useDispatch();
  const { song, songs, isLoading } = useSelector((state) => state.song);
  const { activeSong, isPlaying } = useSelector((state) => state.player);

  const handlePauseClick = () => {
    dispatch(playPause(false));
  };

  const handlePlayClick = (song, i) => {
    dispatch(setActiveSong({ song, songs, i }));
    dispatch(
      record({
        songId: song._id,
        userId: user._id,
        data: "play song once",
        action: "playSong",
      })
    );
    dispatch(playPause(true));
  };

  useEffect(() => {
    dispatch(getSongDetail({ songId }));
  }, [dispatch, songId]);

  useEffect(() => {
    dispatch(getSongs({ page }));
  }, [dispatch, page]);

  if (isLoading) return <Loader />;

  return (
    <div className="flex flex-col">
      <DetailsHeader
        song={song}
        handlePauseClick={handlePauseClick}
        handlePlayClick={handlePlayClick}
        activeSong={activeSong}
        isPlaying={isPlaying}
      />
      <div className="mb-10 flex flex-col ml-3 lg:flex-row lg:justify-around">
        <div>
          <h2 className="text-white text-3xl font-bold">Lyrics:</h2>

          <div className="mt-5">
            {song?.lyric?.lines ? (
              song?.lyric?.lines.map((line, i) => (
                <p
                  key={`lyrics-${line}-${i}`}
                  className="text-white text-base my-1"
                >
                  {line}
                </p>
              ))
            ) : (
              <p className="text-white text-base my-1">
                Sorry, No lyrics found!
              </p>
            )}
          </div>
        </div>

        <RelatedSongs
          songs={songs}
          artistId={song?.artists?.adamid}
          isPlaying={isPlaying}
          activeSong={activeSong}
          handlePauseClick={handlePauseClick}
          handlePlayClick={handlePlayClick}
        />
      </div>
    </div>
  );
};

export default SongDetails;
