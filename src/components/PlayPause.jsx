import React from "react";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import PauseCircleIcon from "@mui/icons-material/PauseCircle";

const PlayPause = ({ isPlaying, activeSong, song, handlePause, handlePlay }) =>
  isPlaying && activeSong?.title === song.title ? (
    <PauseCircleIcon
      size={100}
      fontSize="large"
      className="text-primary cursor-pointer"
      onClick={handlePause}
    />
  ) : (
    <PlayCircleIcon
      size={100}
      fontSize="large"
      className="text-primary cursor-pointer"
      onClick={handlePlay}
    />
  );

export default PlayPause;
