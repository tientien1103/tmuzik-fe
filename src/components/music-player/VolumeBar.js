import React from "react";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import VolumeDownIcon from "@mui/icons-material/VolumeDown";
import VolumeOffIcon from "@mui/icons-material/VolumeOff";

const VolumeBar = ({ value, min, max, onChange, setVolume }) => (
  <div className="hidden lg:flex flex-1 items-center justify-end">
    {value <= 1 && value > 0.5 && (
      <VolumeUpIcon size={25} color="#FFF" onClick={() => setVolume(1)} />
    )}
    {value <= 0.5 && value > 0 && (
      <VolumeDownIcon size={25} color="#FFF" onClick={() => setVolume(0)} />
    )}
    {value <= 0 && (
      <VolumeOffIcon size={25} color="#FFF" onClick={() => setVolume(0)} />
    )}
    <input
      type="range"
      step="any"
      value={value}
      min={min}
      max={max}
      onChange={onChange}
      className="2xl:w-40 lg:w-32 md:w-32 h-1 ml-2"
    />
  </div>
);

export default VolumeBar;
