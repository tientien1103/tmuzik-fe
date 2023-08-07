import React from "react";
import { Link } from "react-router-dom";

function PlaylistBar({ playlist, isLoading }) {
  return (
    <div className="flex flex-col w-[250px] p-4 bg-black/5 bg-opacity-10 backdrop-blur-sm animate-slideup rounded-lg cursor-pointer">
      <Link to={`/playlists/${playlist._id}`}>
        <div className="relative w-full h-56 group">
          <div className="absolute inset-0 justify-center items-center bg-black bg-opacity-0 hover:bg-opacity-50"></div>
          <img
            alt="song_img"
            src={isLoading ? "/img/placeholder-img.jpg" : playlist.imageUrl}
            className="w-full h-full rounded-lg"
          />
        </div>
        <div className="mt-4 flex flex-col">
          <p className="font-semibold text-lg text-white truncate capitalize">
            {playlist.name}
          </p>
        </div>
      </Link>
    </div>
  );
}

export default PlaylistBar;
