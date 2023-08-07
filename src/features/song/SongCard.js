import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import useAuth from "../../hooks/useAuth";
import clsx from "clsx";

import { IconButton } from "@mui/material";
import PlayPause from "../../components/PlayPause";
import SongReaction from "./SongReaction";
import HeadphonesIcon from "@mui/icons-material/Headphones";

import { playPause, setActiveSong } from "../player/playerSlice";
import { record } from "../user-history/userHistorySlice";
import ChartReaction from "../top-chart/ChartReaction";

const SongCard = ({ songId, song, i, isPlaying, activeSong, songs }) => {
  const dispatch = useDispatch();
  const { user } = useAuth();

  const handlePlayClick = () => {
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

  const handlePauseClick = () => {
    dispatch(playPause(false));
  };
  return (
    <div className="flex flex-col w-[250px] p-4 overflow-hidden bg-black/5 bg-opacity-10 backdrop-blur-sm animate-slideup rounded-lg cursor-pointer">
      <div className="relative overflow-hidden w-full h-56 group">
        <div
          className={clsx([
            "absolute inset-0 justify-center items-center bg-black bg-opacity-50 group-hover:rounded-lg group-hover:flex",
            activeSong?.title === song.title
              ? "flex bg-black bg-opacity-70 rounded-lg"
              : "hidden",
          ])}
        >
          <PlayPause
            isPlaying={isPlaying}
            activeSong={activeSong}
            song={song}
            handlePause={handlePauseClick}
            handlePlay={handlePlayClick}
          />
        </div>
        <img
          alt="song_img"
          src={song.images?.coverart}
          className="w-full h-full rounded-lg"
        />
      </div>

      <div className="mt-4 flex flex-col">
        <p className="font-semibold text-lg text-white hover:text-secondary truncate capitalize">
          <Link to={`/songs/${song._id}`}>{song.title}</Link>
        </p>
        <p className="text-sm truncate text-gray-300 hover:brightness-200 mt-1">
          <Link
            to={
              song.artists
                ? `/artists/${song?.artists[0]?.adamid}`
                : "/top-artists"
            }
          >
            {song.subtitle}
          </Link>
        </p>
      </div>

      <div className="flex flex-row justify-end">
        {songId ? <SongReaction song={song} /> : <ChartReaction song={song} />}
        <IconButton>
          <HeadphonesIcon sx={{ fontSize: 20, color: "white" }} />
        </IconButton>
        <p variant="h6" className="mr-1 mt-1.5 text-white">
          {song?.playbackCount}
        </p>
      </div>
    </div>
  );
};

export default SongCard;
