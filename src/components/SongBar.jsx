import React from "react";
import { Link } from "react-router-dom";

import PlayPause from "./PlayPause.jsx";

const SongBar = ({
  song,
  artist,
  i,
  artistId,
  isPlaying,
  activeSong,
  handlePauseClick,
  handlePlayClick,
}) => {
  const handleTogglePlay = (e) => {
    if (isPlaying && activeSong?.title === song.title) {
      handlePauseClick();
      e.stopPropagation();
    } else {
      handlePlayClick(song, i);
      e.stopPropagation();
    }
  };
  return (
    <div
      className={`w-full flex flex-row items-center hover:bg-thirdly ${
        activeSong?.title === song?.title ? "bg-thirdly" : "bg-transparent"
      } p-4 rounded-lg cursor-pointer mb-2`}
      onClick={handleTogglePlay}
    >
      <div className="flex-1 flex flex-row justify-between items-center">
        <img
          className="w-20 h-20 rounded-lg"
          src={song?.images?.coverart}
          alt={song?.title}
        />
        <div className="flex-1 flex flex-col justify-center mx-3">
          <Link to={`/songs/${song._id}`}>
            <p className="text-xl font-bold text-white hover:text-secondary">
              {song?.title}
            </p>
          </Link>
          {!artistId && (
            <Link to={`/artists/${song?.artists[0]?.adamid}`}>
              <p className="text-base text-gray-300 mt-1 hover:brightness-200">
                {song?.subtitle}
              </p>
            </Link>
          )}
        </div>
      </div>

      <PlayPause isPlaying={isPlaying} activeSong={activeSong} song={song} />
    </div>
  );
};

export default SongBar;
