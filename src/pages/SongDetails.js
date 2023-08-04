import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import DetailsHeader from "../components/DetailsHeader";
import RelatedSongs from "../components/RelatedSongs";

import { setActiveSong, playPause } from "../features/player/playerSlice";
import { getSongDetail, getSongs } from "../features/song/songSlice";

const SongDetails = () => {
  const [page] = useState(1);
  const { songId } = useParams();
  const dispatch = useDispatch();
  const { song, songs } = useSelector((state) => state.song);
  const { activeSong, isPlaying } = useSelector((state) => state.player);

  const handlePauseClick = () => {
    dispatch(playPause(false));
  };

  const handlePlayClick = (song, i) => {
    dispatch(setActiveSong({ song, songs, i }));
    dispatch(playPause(true));
  };

  useEffect(() => {
    dispatch(getSongDetail({ songId }));
  }, [dispatch, songId]);

  useEffect(() => {
    dispatch(getSongs({ page }));
  }, [dispatch, page]);

  return (
    <div className="flex flex-col">
      <DetailsHeader song={song} />
      <div className="mb-10 flex flex-col ml-3 lg:flex-row lg:justify-around">
        <div>
          <h2 className="text-white text-3xl font-bold">Lyrics:</h2>

          <div className="mt-5">
            {song?.lyric?.lines ? (
              song?.lyric?.lines.map((line, i) => (
                <p
                  key={`lyrics-${line}-${i}`}
                  className="text-white text-base my-1"
                >
                  {line}
                </p>
              ))
            ) : (
              <p className="text-white text-base my-1">
                Sorry, No lyrics found!
              </p>
            )}
          </div>
        </div>

        <RelatedSongs
          songs={songs}
          artistId={song?.artists?.adamid}
          isPlaying={isPlaying}
          activeSong={activeSong}
          handlePauseClick={handlePauseClick}
          handlePlayClick={handlePlayClick}
        />
      </div>
    </div>
  );
};

export default SongDetails;
