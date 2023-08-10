import React, { useEffect, useState } from "react";
import SongCard from "../features/song/SongCard";
import { useDispatch, useSelector } from "react-redux";
import { getSongs } from "../features/song/songSlice";
import SearchInput from "../components/SearchInput";
import TopPlay from "../components/TopPlay";
import Loader from "../components/Loader";

const HomePage = () => {
  const [filterName, setFilterName] = useState("");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const { currentPageSongs, songsById } = useSelector((state) => state.song);
  const { activeSong, isPlaying } = useSelector((state) => state.player);

  const songs = currentPageSongs.map((songId) => songsById[songId]);

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop + 1 >=
      document.documentElement.scrollHeight
    ) {
      setLoading(true);
      setPage((prev) => prev + 1);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    dispatch(getSongs({ filterName, page }));
  }, [filterName, page, dispatch]);

  const handleSubmit = (searchQuery) => {
    setFilterName(searchQuery);
  };

  return (
    <div className="container max-w-full mx-auto flex flex-col mb-24">
      <div className="flex lg:flex-row md:flex-col-reverse sm:flex-col-reverse xs:flex-col-reverse">
        <div className="flex flex-col items-center lg:mt-0 md:mt-20 xs:mt-16">
          <div className="flex justify-center items-center gap-4 flex-col md:gap-6 mt-4 mb-10">
            <h2 className="font-bold text-3xl text-white">New & Trending</h2>
            <SearchInput handleSubmit={handleSubmit} />
          </div>

          {!songs.length ? (
            filterName.length ? (
              <h2 className="text-white text-lg font-semibold">
                {`No match found for ${filterName}`}
              </h2>
            ) : (
              <h2 className="text-white text-lg font-semibold">
                <Loader />
              </h2>
            )
          ) : null}

          <div className="flex flex-col lg:flex-row flex-wrap lg:w-[600px] xl:w-[950px] justify-center gap-8">
            {songs?.map((song, i) => (
              <SongCard
                key={song.key}
                songId={song._id}
                song={song}
                i={i}
                isPlaying={isPlaying}
                activeSong={activeSong}
                songs={songs}
              />
            ))}
          </div>
          {loading && <Loader />}
        </div>

        <div className="lg:sticky lg:w-[500px] lg:mr-12 relative top-10 h-fit lg:mt-5">
          <TopPlay />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
