import { Link } from "react-router-dom";
import PlayPause from "./PlayPause.jsx";
import clsx from "clsx";

const TopChartCard = ({
  song,
  i,
  isPlaying,
  activeSong,
  handlePauseClick,
  handlePlayClick,
}) => (
  <div
    className={clsx([
      "w-full flex flex-row items-center hover:bg-thirdly py-2 p-4 rounded-lg cursor-pointer mb-2",
      activeSong?.title === song?.title ? "bg-thirdly" : "bg-transparent",
    ])}
  >
    <h3 className="font-bold text-base text-white lg:mr-3">{i + 1}.</h3>
    <div className="flex-1 flex flex-row justify-between items-center">
      <img
        className="w-20 h-20 rounded-lg"
        src={song?.images?.coverart}
        alt={song?.title}
      />
      <div className="flex-1 flex flex-col justify-center mx-3 ">
        <Link to={`/songs/${song?._id}`}>
          <p className="text-base font-semibold text-white hover:text-secondary">
            {song?.title}
          </p>
        </Link>
        <Link to={`/artists/${song?.artists[0].adamid}`}>
          <p className="text-sm text-gray-300 mt-1 hover:brightness-200">
            {song?.subtitle}
          </p>
        </Link>
      </div>
    </div>
    <PlayPause
      isPlaying={isPlaying}
      activeSong={activeSong}
      song={song}
      handlePause={handlePauseClick}
      handlePlay={handlePlayClick}
    />
  </div>
);

export default TopChartCard;
