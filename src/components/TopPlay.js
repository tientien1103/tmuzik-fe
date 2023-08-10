import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode } from "swiper/modules";
import { playPause, setActiveSong } from "../features/player/playerSlice";
import { getTopChart } from "../features/top-chart/topChartSlice";
import { getArtists } from "../features/artist/artistSlice";
import { record } from "../features/user-history/userHistorySlice";

import "swiper/css";
import "swiper/css/free-mode";
import TopChartCard from "./TopChartCard";
import useAuth from "../hooks/useAuth";

const TopPlay = () => {
  const [page] = useState(1);
  const dispatch = useDispatch();
  const { user } = useAuth();
  const { activeSong, isPlaying } = useSelector((state) => state.player);
  const { currentPageSongs, songsById } = useSelector(
    (state) => state.topChart
  );
  const { artists } = useSelector((state) => state.artist);
  const songs = currentPageSongs.map((songId) => songsById[songId]);

  const divRef = useRef(null);

  useEffect(() => {
    divRef.current.scrollIntoView({ behavior: "smooth" });
  });

  useEffect(() => {
    dispatch(getTopChart({ page }));
  }, [dispatch, page]);

  useEffect(() => {
    dispatch(getArtists({ page }));
  }, [dispatch, page]);

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

  return (
    <div ref={divRef} className="lg:mb-24 mb-6 w-full flex flex-col">
      <div className="container max-w-lg mx-auto flex flex-col">
        <div className="flex flex-row justify-between items-center">
          <h2 className="text-white font-bold text-2xl">Top Charts</h2>
          <Link to="/top-charts">
            <p className="text-white text-base cursor-pointer hover:text-primary">
              See all
            </p>
          </Link>
        </div>

        <div className="mt-4 flex flex-col gap-1">
          {songs?.slice(0, 5).map((song, i) => (
            <TopChartCard
              key={song.key}
              song={song}
              i={i}
              isPlaying={isPlaying}
              activeSong={activeSong}
              handlePauseClick={handlePauseClick}
              handlePlayClick={() => handlePlayClick(song, i)}
            />
          ))}
        </div>
      </div>

      <div className="w-full flex flex-col mt-8">
        <div className="flex flex-row justify-between items-center">
          <h2 className="text-white font-bold text-2xl">Top Artists</h2>
          <Link to="/top-artists">
            <p className="text-white text-base cursor-pointer hover:text-primary">
              See all
            </p>
          </Link>
        </div>

        <Swiper
          slidesPerView="auto"
          spaceBetween={15}
          freeMode
          centeredSlides
          centeredSlidesBounds
          modules={[FreeMode]}
          className="mt-4"
        >
          {artists?.slice(0, 5).map((artist) => (
            <SwiperSlide
              key={artist?._id}
              style={{ width: "22%", height: "auto" }}
              className="shadow-lg rounded-full animate-slideright"
            >
              <Link to={`/artists/${artist?.adamId}`}>
                <img
                  src={artist?.imageUrl}
                  alt="Name"
                  className="rounded-full w-full object-cover"
                />
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default TopPlay;
