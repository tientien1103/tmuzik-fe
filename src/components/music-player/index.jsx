import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth.jsx";

import {
  nextSong,
  prevSong,
  playPause,
} from "../../features/player/playerSlice";
import Controls from "./Controls";
import Player from "./Player";
import SeekBar from "./SeekBar";
import Track from "./Track";
import VolumeBar from "./VolumeBar";
import LoginPromptModal from "../LoginPromptModal.jsx";

const MusicPlayer = () => {
  const { activeSong, currentSongs, currentIndex, isActive, isPlaying } =
    useSelector((state) => state.player);
  const [duration, setDuration] = useState(0);
  const [seekTime, setSeekTime] = useState(0);
  const [appTime, setAppTime] = useState(0);
  const [volume, setVolume] = useState(0.3);
  const [repeat, setRepeat] = useState(false);
  const [shuffle, setShuffle] = useState(false);
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (currentSongs.length) {
      if (!isAuthenticated) {
        dispatch(playPause(false));
        setShowLoginPrompt(true);
        return;
      }
      dispatch(playPause(true));
    }
  }, [currentIndex, currentSongs, dispatch, isAuthenticated]);

  const handlePlayPause = () => {
    if (!isActive) return;

    if (!isAuthenticated) {
      setShowLoginPrompt(true);
      return;
    }

    if (isPlaying) {
      dispatch(playPause(false));
    } else {
      dispatch(playPause(true));
    }
  };

  const handleNextSong = () => {
    if (!isAuthenticated) {
      setShowLoginPrompt(true);
      return;
    }

    dispatch(playPause(false));

    if (!shuffle) {
      dispatch(nextSong((currentIndex + 1) % currentSongs.length));
    } else {
      dispatch(nextSong(Math.floor(Math.random() * currentSongs.length)));
    }
  };

  const handlePrevSong = () => {
    if (!isAuthenticated) {
      setShowLoginPrompt(true);
      return;
    }

    if (currentIndex === 0) {
      dispatch(prevSong(currentSongs.length - 1));
    } else if (shuffle) {
      dispatch(prevSong(Math.floor(Math.random() * currentSongs.length)));
    } else {
      dispatch(prevSong(currentIndex - 1));
    }
  };

  return (
    <>
      <div className="relative sm:px-12 px-8 w-full flex items-center justify-between">
        <Track
          isPlaying={isPlaying}
          isActive={isActive}
          activeSong={activeSong}
        />
        <div className="flex-1 flex flex-col items-center justify-center">
          <Controls
            isPlaying={isPlaying}
            isActive={isActive}
            repeat={repeat}
            setRepeat={setRepeat}
            shuffle={shuffle}
            setShuffle={setShuffle}
            currentSongs={currentSongs}
            handlePlayPause={handlePlayPause}
            handlePrevSong={handlePrevSong}
            handleNextSong={handleNextSong}
          />
          <SeekBar
            value={appTime}
            min="0"
            max={duration}
            onInput={(event) => setSeekTime(event.target.value)}
            setSeekTime={setSeekTime}
            appTime={appTime}
          />
          <Player
            activeSong={activeSong}
            volume={volume}
            isPlaying={isPlaying}
            seekTime={seekTime}
            repeat={repeat}
            currentIndex={currentIndex}
            onEnded={handleNextSong}
            onTimeUpdate={(event) => setAppTime(event.target.currentTime)}
            onLoadedData={(event) => setDuration(event.target.duration)}
          />
        </div>
        <VolumeBar
          value={volume}
          min="0"
          max="1"
          onChange={(event) => setVolume(event.target.value)}
          setVolume={setVolume}
        />
      </div>

      <LoginPromptModal 
        open={showLoginPrompt} 
        onClose={() => setShowLoginPrompt(false)} 
      />
    </>
  );
};

export default MusicPlayer;
