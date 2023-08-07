import React from "react";
import { Link } from "react-router-dom";

const Track = ({ isPlaying, isActive, activeSong }) => (
  <div className="flex-1 flex items-center justify-start">
    <div
      className={`${
        isPlaying && isActive ? "animate-[spin_3s_linear_infinite]" : ""
      } hidden sm:block h-16 w-16 mr-4`}
    >
      <Link to={`/songs/${activeSong?._id}`}>
        <img
          src={activeSong?.images?.coverart}
          alt="cover art"
          className="rounded-full hover:brightness-50"
        />
      </Link>
    </div>
    <div className="w-[50%]">
      <Link to={`/songs/${activeSong?._id}`}>
        <p className="truncate text-white font-bold text-lg hover:text-primary">
          {activeSong?.title ? activeSong?.title : "No active Song"}
        </p>
      </Link>
      <Link to={`/artists/${activeSong?.artists[0].adamid}`}>
        <p className="truncate text-gray-300 hover:brightness-200">
          {activeSong?.subtitle ? activeSong?.subtitle : "No active Song"}
        </p>
      </Link>
    </div>
  </div>
);

export default Track;
