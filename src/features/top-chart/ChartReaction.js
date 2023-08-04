import React from "react";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { sendChartReaction } from "./topChartSlice";
import { IconButton } from "@mui/material";
import { useDispatch } from "react-redux";

const ChartReaction = ({ song }) => {
  const dispatch = useDispatch();

  const handleClick = (emoji) => {
    dispatch(sendChartReaction({ songId: song._id, emoji }));
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
        {song?.reactions.like}
      </p>
    </div>
  );
};

export default ChartReaction;
