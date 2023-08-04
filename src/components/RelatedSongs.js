import React from "react";
import SongBar from "./SongBar";

const RelatedSongs = ({
  artist,
  songs,
  artistId,
  isPlaying,
  activeSong,
  handlePauseClick,
  handlePlayClick,
}) => {
  return (
    <div className="flex flex-col mb-20">
      {artistId ? (
        <h1 className="font-bold text-3xl text-white">{`${artist.name}'s Songs:`}</h1>
      ) : (
        <h1 className="font-bold text-3xl text-white">Related Songs:</h1>
      )}

      <div className="mt-6 w-full flex flex-col">
        {songs?.map((song, i) => (
          <SongBar
            key={`${artistId}-${song.key}-${i}`}
            song={song}
            i={i}
            artistId={artistId}
            isPlaying={isPlaying}
            activeSong={activeSong}
            handlePauseClick={handlePauseClick}
            handlePlayClick={handlePlayClick}
          />
        ))}
      </div>
    </div>
  );
};

export default RelatedSongs;
