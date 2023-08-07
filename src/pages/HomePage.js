import React, { useEffect, useState } from "react";
import SongCard from "../features/song/SongCard";
import { useDispatch, useSelector } from "react-redux";
import { getSongs } from "../features/song/songSlice";
import SearchInput from "../components/SearchInput";
import TopPlay from "../components/TopPlay";
import { LoadingButton } from "@mui/lab";
import Loader from "../components/Loader";

const HomePage = () => {
  const [filterName, setFilterName] = useState("");
  const [page, setPage] = useState(1);
  const dispatch = useDispatch();

  const { currentPageSongs, songsById, totalSongs, isLoading } = useSelector(
    (state) => state.song
  );
  const { activeSong, isPlaying } = useSelector((state) => state.player);

  const songs = currentPageSongs.map((songId) => songsById[songId]);

  useEffect(() => {
    dispatch(getSongs({ filterName, page }));
  }, [filterName, page, dispatch]);

  const handleSubmit = (searchQuery) => {
    setFilterName(searchQuery);
  };
  if (isLoading) return <Loader />;

  return (
    <div className="container max-w-1072 mx-auto flex flex-col mb-24">
      <div className="flex lg:flex-row md:flex-col-reverse xs:flex-col-reverse">
        <div className="flex flex-col items-center">
          <div className="flex justify-center lg:gap-[350px] items-center lg:flex-row-reverse gap-4 md:flex-col-reverse md:gap-6 flex-col mt-4 mb-10">
            <SearchInput handleSubmit={handleSubmit} />
            <h2 className="font-bold text-3xl text-white">New & Trending</h2>
          </div>

          {!songs.length && (
            <h2 className="text-white text-lg font-semibold">{`No match found for "${filterName}"`}</h2>
          )}

          <div className="flex flex-col lg:flex-row md:flex-row flex-wrap md:w-[800px] lg:w-[1000px] justify-center gap-8">
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
          <div className="mt-10 flex justify-center">
            {totalSongs ? (
              <LoadingButton
                variant="contained"
                size="small"
                loading={isLoading}
                onClick={() => setPage((page) => page + 1)}
                disabled={Boolean(totalSongs) && songs.length >= totalSongs}
              >
                Load more
              </LoadingButton>
            ) : (
              <h6>No song yet</h6>
            )}
          </div>
        </div>
        <div className="lg:sticky lg:w-[500px] lg:mr-12 relative top-10 h-fit lg:mt-5">
          <TopPlay />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
