import React from "react";
import { useNavigate } from "react-router-dom";
import ArtistReaction from "./ArtistReaction.jsx";

const ArtistCard = ({ artist }) => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col w-[250px] p-4 bg-white/5 bg-opacity-80 backdrop-blur-sm animate-slideup rounded-lg cursor-pointer">
      <div onClick={() => navigate(`/artists/${artist?.adamId}`)}>
        <img
          alt="song_img"
          src={artist?.imageUrl}
          className="w-full h-56 rounded-lg hover:brightness-50"
        />
        <p className="mt-4 font-semibold text-lg text-white truncate">
          {artist?.name}
        </p>
      </div>
      <ArtistReaction artist={artist} />
    </div>
  );
};

export default ArtistCard;
