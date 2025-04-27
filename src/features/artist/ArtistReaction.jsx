import React from "react";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { sendArtistReaction } from "../artist/artistSlice.jsx";
import { IconButton } from "@mui/material";
import { useDispatch } from "react-redux";

const ArtistReaction = ({ artist }) => {
  const [isLiked, setLiked] = React.useState(artist?.isLiked ?? true);
  const dispatch = useDispatch();

  const handleClick = (emoji) => {
    dispatch(sendArtistReaction({ artistId: artist._id, emoji }));
    setLiked((pIsLiked) => !pIsLiked);
  };
  return (
    <div className="flex flex-row justify-end">
      <IconButton onClick={() => handleClick("like")}>
        {isLiked === true ? (
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
        {artist?.reactions?.like}
      </p>
    </div>
  );
};

export default ArtistReaction;
