import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ArtistCard from "../features/artist/ArtistCard";
import { getArtists } from "../features/artist/artistSlice";
import SearchInput from "../components/SearchInput";
import { LoadingButton } from "@mui/lab";
import Loader from "../components/Loader";

const TopArtists = () => {
  const [filterName, setFilterName] = useState("");
  const [page, setPage] = useState(1);
  const dispatch = useDispatch();
  const { artistsById, currentPageArtists, totalArtists, isLoading } =
    useSelector((state) => state.artist);
  const artists = currentPageArtists.map((artistId) => artistsById[artistId]);

  useEffect(() => {
    dispatch(getArtists({ filterName, page }));
  }, [dispatch, filterName, page]);

  const handleSubmit = (searchQuery) => {
    setFilterName(searchQuery);
  };

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
      <div className="mt-10 flex justify-center">
        {totalArtists ? (
          <LoadingButton
            variant="contained"
            size="small"
            loading={isLoading}
            onClick={() => setPage((page) => page + 1)}
            disabled={Boolean(totalArtists) && artists.length >= totalArtists}
          >
            Load more
          </LoadingButton>
        ) : (
          <h6>No post yet</h6>
        )}
      </div>
    </div>
  );
};

export default TopArtists;
