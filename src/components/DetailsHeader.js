import React from "react";
import { IconButton } from "@mui/material";
import { Link } from "react-router-dom";
import HeadphonesIcon from "@mui/icons-material/Headphones";
import FavoriteIcon from "@mui/icons-material/Favorite";
import PlayPause from "./PlayPause";

const DetailsHeader = ({
  artistId,
  artist,
  song,
  songs,
  handlePauseClick,
  handlePlayClick,
  isPlaying,
  activeSong,
}) => {
  return (
    <div className="relative w-full flex flex-col">
      <div className="w-full bg-gradient-to-l from-transparent to-thirdly sm:h-48 h-28" />

      <div className="absolute inset-0 flex items-center pl-0 lg:pl-[185px]">
        <img
          alt="profile"
          src={artistId ? artist?.imageUrl : song?.images?.coverart}
          className="sm:w-48 w-28 sm:h-48 h-28 rounded-full object-cover border-2 shadow-xl shadow-black"
        />

        <div className="ml-5">
          <div className="flex flex-row gap-4">
            <p className="font-bold sm:text-3xl text-xl text-white">
              {artistId ? artist?.name : song?.title}
            </p>
            {!artistId ? (
              <PlayPause
                isPlaying={isPlaying}
                activeSong={activeSong}
                song={song}
                handlePause={handlePauseClick}
                handlePlay={() => handlePlayClick(song)}
              />
            ) : null}
          </div>
          <div className="flex flex-row">
            {artistId ? (
              <div className="flex flex-row">
                <IconButton>
                  <FavoriteIcon sx={{ fontSize: 20, color: "white" }} />
                </IconButton>
                <p variant="h6" className="mt-1.5 text-white">
                  {artist?.reactions?.like}
                </p>
              </div>
            ) : (
              <>
                <Link to={`/artists/${song?.artists?.adamid}`}>
                  <p className="text-base text-white mt-2">{song?.subtitle}</p>
                </Link>
                <div className="flex flex-row">
                  <IconButton>
                    <HeadphonesIcon sx={{ fontSize: 20, color: "white" }} />
                  </IconButton>
                  <p variant="h6" className="mt-2 text-white">
                    {song?.playbackCount}
                  </p>
                  <IconButton>
                    <FavoriteIcon sx={{ fontSize: 20, color: "white" }} />
                  </IconButton>
                  <p variant="h6" className="mt-2 text-white">
                    {song?.reactions?.like}
                  </p>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      <div className="w-full sm:h-44 h-24" />
    </div>
  );
};

export default DetailsHeader;
