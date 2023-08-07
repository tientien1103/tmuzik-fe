import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import DetailsHeader from "../components/DetailsHeader";
import RelatedSongs from "../components/RelatedSongs";
import {
  getSingleArtist,
  getSongsByArtist,
} from "../features/artist/artistSlice";
import { setActiveSong, playPause } from "../features/player/playerSlice";
import { record } from "../features/user-history/userHistorySlice";
import useAuth from "../hooks/useAuth";
import Loader from "../components/Loader";

const ArtistDetails = () => {
  const [page] = useState(1);
  const { artistId } = useParams();
  const { user } = useAuth();

  const { activeSong, isPlaying } = useSelector((state) => state.player);
  const { artist, songs, isLoading } = useSelector((state) => state.artist);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getSingleArtist({ artistId }));
  }, [dispatch, artistId]);
  useEffect(() => {
    dispatch(getSongsByArtist({ page, artistId }));
  }, [dispatch, page, artistId]);

  const handlePauseClick = () => {
    dispatch(playPause(false));
  };

  const handlePlayClick = (song, i) => {
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

  if (isLoading) return <Loader />;
  return (
    <div className="flex flex-col">
      <DetailsHeader artistId={artistId} artist={artist} />

      <RelatedSongs
        artist={artist}
        songs={songs}
        artistId={artistId}
        isPlaying={isPlaying}
        activeSong={activeSong}
        handlePauseClick={handlePauseClick}
        handlePlayClick={handlePlayClick}
      />
    </div>
  );
};

export default ArtistDetails;
