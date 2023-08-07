import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ArtistCard from "../features/artist/ArtistCard";
import { getArtists } from "../features/artist/artistSlice";
import SearchInput from "../components/SearchInput";
import Loader from "../components/Loader";

const TopArtists = () => {
  const [filterName, setFilterName] = useState("");
  const [page, setPage] = useState(1);
  const dispatch = useDispatch();
  const { artistsById, currentPageArtists, isLoading } = useSelector(
    (state) => state.artist
  );
  const artists = currentPageArtists.map((artistId) => artistsById[artistId]);

  useEffect(() => {
    dispatch(getArtists({ filterName, page }));
  }, [dispatch, filterName, page]);

  const handleSubmit = (searchQuery) => {
    setFilterName(searchQuery);
  };

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop + 1 >=
      document.documentElement.scrollHeight
    ) {
      setPage((prev) => prev + 1);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (isLoading) return <Loader />;

  return (
    <div className="flex flex-col items-center justify-center mb-20">
      <h2 className="font-bold text-3xl text-white text-left mt-4 mb-10">
        Top artists
      </h2>
      <SearchInput handleSubmit={handleSubmit} />

      {!artists.length && (
        <h2 className="text-white text-lg font-semibold mt-24">{`No match found for "${filterName}"`}</h2>
      )}

      <div className="lg:grid-cols-5 md:grid-cols-2 grid grid-cols-1 justify-center gap-8 mt-10">
        {artists?.map((artist) => (
          <ArtistCard key={artist._id} artist={artist} />
        ))}
      </div>
    </div>
  );
};

export default TopArtists;
