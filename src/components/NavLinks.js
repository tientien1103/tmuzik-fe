import React from "react";
import HouseIcon from "@mui/icons-material/House";
import GroupsIcon from "@mui/icons-material/Groups";
import AutoGraphIcon from "@mui/icons-material/AutoGraph";
import QueueMusicIcon from "@mui/icons-material/QueueMusic";
import { NavLink, useLocation } from "react-router-dom";
import clsx from "clsx";

const links = [
  { name: "Discover", to: "/", icon: HouseIcon },
  { name: "Top Artists", to: "/top-artists", icon: GroupsIcon },
  { name: "Top Charts", to: "/top-charts", icon: AutoGraphIcon },
  { name: "Playlist", to: "/playlists", icon: QueueMusicIcon },
];

function NavLinks({ handleClick }) {
  const location = useLocation();

  return (
    <div className="flex flex-col items-center xs:gap-6 md:mt-10 lg:mt-0 md:gap-10 lg:gap-0 xs:mt-10 lg:flex-row lg:mr-14">
      {links.map((item) => (
        <NavLink
          key={item.name}
          to={item.to}
          className={clsx([
            "flex flex-row text-center items-center mr-6 text-sm font-medium hover:text-primary",
            location.pathname === item.to ? "text-primary" : "text-white",
          ])}
          onClick={() => handleClick && handleClick()}
        >
          <item.icon className="w-6 h-6 mr-2" />
          {item.name}
        </NavLink>
      ))}
    </div>
  );
}

export default NavLinks;
