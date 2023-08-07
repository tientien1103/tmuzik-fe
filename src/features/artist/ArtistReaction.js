import React from "react";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { sendArtistReaction } from "../artist/artistSlice";
import { IconButton } from "@mui/material";
import { useDispatch } from "react-redux";

const ArtistReaction = ({ artist }) => {
  const dispatch = useDispatch();

  const handleClick = (emoji) => {
    dispatch(sendArtistReaction({ artistId: artist._id, emoji }));
  };
  return (
    <div className="flex flex-row justify-end">
      <IconButton onClick={() => handleClick("like")}>
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
      </IconButton>
      <p variant="h6" className="mr-1 mt-1.5 text-white">
        {artist?.reactions?.like}
      </p>
    </div>
  );
};

export default ArtistReaction;
