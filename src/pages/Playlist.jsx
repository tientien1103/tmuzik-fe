import React, { useEffect, useState } from "react";
import { getPlaylists } from "../features/playlist/playlistSlice.jsx";
import { useDispatch, useSelector } from "react-redux";
import PlaylistBar from "../features/playlist/PlaylistBar.jsx";
import Loader from "../components/Loader.jsx";

function Playlist() {
  const [page] = useState(1);
  const dispatch = useDispatch();
  const { playlists, isLoading } = useSelector((state) => state.playlist);

  useEffect(() => {
    dispatch(getPlaylists({ page }));
  }, [page, dispatch]);

  if (isLoading) return <Loader />;

  return (
    <div className="w-full">
      <div className="container max-w-1072 mx-auto">
        <h2 className="text-4xl font-semibold text-white text-center">
          Top Playlists
        </h2>
        <div className="grid lg:grid-cols-5 md:grid-cols-2 gap-8 md:ml-20 ml-14 lg:ml-10 grid-cols-1 mt-10 mb-10">
          {playlists?.map((playlist, i) => (
            <PlaylistBar
              key={playlist._id}
              playlist={playlist}
              isLoading={isLoading}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Playlist;
