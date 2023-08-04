import React from "react";
import { Link } from "react-router-dom";

const RelatedPlaylists = ({ playlist }) => {
  return (
    <div className="mt-6 w-full flex flex-col">
      <div className="w-full flex flex-row items-center rounded-lg cursor-pointer hover:bg-thirdly">
        <div className="flex-1 flex flex-row justify-between items-center">
          <img
            className="w-20 h-20 rounded-lg"
            src="https://media.istockphoto.com/id/1134035116/vector/online-media-cloud-audio-streaming-online-music-concept-vector-illustration-eps-10.jpg?s=612x612&w=0&k=20&c=iX5IJ0cODOSK6i3HttYRjm8dedKYiEpw5OCJGs5Xkig="
            alt=""
          />
          <div className="flex-1 flex flex-col justify-center mx-3">
            <Link to={`/playlists/${playlist._id}`}>
              <p className="text-xl font-bold text-white">{playlist?.name}</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RelatedPlaylists;
