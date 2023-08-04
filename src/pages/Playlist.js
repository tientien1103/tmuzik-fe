import React, { useEffect, useState } from "react";
import { getPlaylists } from "../features/playlist/playlistSlice";
import { useDispatch, useSelector } from "react-redux";
import PlaylistBar from "../features/playlist/PlaylistBar";

function Playlist() {
  const [page] = useState(1);
  const dispatch = useDispatch();
  const { playlists } = useSelector((state) => state.playlist);

  useEffect(() => {
    dispatch(getPlaylists({ page }));
  }, [page, dispatch]);

  return (
    <div className="w-full">
      <div className="container max-w-1072">
        <h2 className="text-4xl font-semibold text-white text-center">
          Top Playlists
        </h2>
        <div className="flex flex-wrap justify-center lg:gap-10 items-center lg:flex-row-reverse xs:gap-4 md:gap-6 xs:flex-col mt-4 mb-10">
          {playlists?.map((playlist, i) => (
            <PlaylistBar key={playlist._id} playlist={playlist} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Playlist;
