import React from "react";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { sendSongReaction } from "../song/songSlice";
import { IconButton } from "@mui/material";
import { useDispatch } from "react-redux";

const SongReaction = ({ song }) => {
  const dispatch = useDispatch();

  const handleClick = (emoji) => {
    dispatch(sendSongReaction({ songId: song._id, emoji }));
  };
  return (
    <div className="flex flex-row justify-end">
      <IconButton onClick={() => handleClick("like")}>
        {song?.isLiked === true ? (
          <FavoriteIcon
            sx={{
              fontSize: 20,
              color: "primary.main",
              "&:hover": {
                cursor: "pointer",
                color: "primary.main",
              },
            }}
          />
        ) : (
          <FavoriteIcon
            sx={{
              fontSize: 20,
              color: "white",
              "&:hover": {
                cursor: "pointer",
                color: "primary.main",
              },
            }}
          />
        )}
      </IconButton>
      <p variant="h6" className="mr-1 mt-1.5 text-white">
        {song?.reactions?.like}
      </p>
    </div>
  );
};

export default SongReaction;
