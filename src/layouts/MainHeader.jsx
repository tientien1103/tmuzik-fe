import * as React from "react";
import { Avatar, Divider, Box, Button } from "@mui/material";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";

import Logo from "../components/Logo.jsx";
import NavLinks from "../components/NavLinks.jsx";

import clsx from "clsx";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth.jsx";
import { useDispatch } from "react-redux";
import { record } from "../features/user-history/userHistorySlice.jsx";

export default function MainHeader({ handleClick }) {
  const { user, logout, isAuthenticated } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    try {
      handleMenuClose();
      await logout(() => {
        navigate("/login");
      });
    } catch (error) {
      console.log(error);
    }
    dispatch(
      record({
        userId: user._id,
        data: "User Log Out",
        action: "logout",
      })
    );
  };

  const renderMenu = (
    <Menu
      id="menu-appbar"
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={Boolean(anchorEl)}
      onClose={handleMenuClose}
    >
      <Box sx={{ my: 1.5, px: 2.5 }}>
        <Typography variant="subtitle2" noWrap>
          {user?.name}
        </Typography>
        <Typography variant="body2" sx={{ color: "text.secondary" }} noWrap>
          {user?.email}
        </Typography>
      </Box>

      <Divider sx={{ borderStyle: "dashed" }} />

      <MenuItem
        onClick={handleMenuClose}
        to="/account"
        component={RouterLink}
        sx={{ mx: 1 }}
      >
        Account Setting
      </MenuItem>

      <MenuItem onClick={handleLogout} sx={{ ml: 1 }}>
        Logout
      </MenuItem>
    </Menu>
  );

  const renderAuthButtons = (
    <Box sx={{ 
      display: "flex", 
      gap: { xs: 0.5, sm: 1 }, 
      mr: { xs: 1, sm: 2, lg: 6 },
      "& .MuiButton-root": {
        minWidth: { xs: "60px", sm: "auto" },
        padding: { xs: "6px 8px", sm: "6px 16px" },
        fontSize: { xs: "13px", sm: "14px" }
      }
    }}>
      <Button
        component={RouterLink}
        to="/login"
        variant="text"
        sx={{ color: "white" }}
      >
        Login
      </Button>
      <Button
        component={RouterLink}
        to="/register"
        variant="contained"
        sx={{ 
          bgcolor: "#27A3A3",
          "&:hover": {
            bgcolor: "#1f8a8a"
          }
        }}
      >
        Sign up
      </Button>
    </Box>
  );

  const renderUserProfile = (
    <Box
      sx={{
        display: "flex",
        color: "white",
        gap: { xs: 0.5, sm: 1 },
        alignItems: "center",
        mr: { xs: 1, sm: 2, lg: 6 },
      }}
    >
      <Avatar
        src={user?.avatarUrl}
        alt={user?.name}
        onClick={handleProfileMenuOpen}
        sx={{
          width: { xs: 32, sm: 40 },
          height: { xs: 32, sm: 40 },
          fontSize: { xs: "14px", sm: "16px" }
        }}
      >
        {user?.name?.slice(0, 1)}
      </Avatar>
      <Typography
        sx={{ 
          display: { xs: "none", sm: "none", md: "flex", lg: "flex" },
          fontSize: { md: "14px", lg: "16px" }
        }}
        variant="subtitle2"
      >
        {user?.name}
      </Typography>
    </Box>
  );

  return (
    <Box sx={{ mb: 0 }}>
      <Toolbar sx={{ minHeight: { xs: '56px', sm: '64px' } }}>
        <IconButton
          size="large"
          edge="start"
          aria-label="menu"
          color="inherit"
          sx={{ mr: 2 }}
        ></IconButton>

        <div className="xs:hidden lg:flex lg:ml-5 xs:justify-center xs:w-full xs:items-center">
          <Logo />
        </div>

        <Box sx={{ flexGrow: 1 }} />

        <div className="lg:flex hidden lg:flex-row">
          <NavLinks />
        </div>

        <div className="lg:hidden flex items-center justify-between w-full pt-2">
          {!mobileMenuOpen && (
            <MenuIcon
              className="w-6 h-6 text-white"
              onClick={() => setMobileMenuOpen(true)}
            />
          )}
          {renderUserProfile}
        </div>

        <div
          className={clsx([
            "absolute top-0 h-screen w-2/3 bg-gradient-to-tl from-white/10 to-[#483D8B] backdrop-blur-lg z-10 p-6 lg:hidden smooth-transition flex flex-col",
            mobileMenuOpen ? "left-0" : "hidden",
          ])}
        >
          <div className="flex justify-between items-center">
            <Logo />
            <CloseIcon
              className="w-6 h-6 text-white cursor-pointer"
              onClick={() => setMobileMenuOpen(false)}
            />
          </div>
          <NavLinks handleClick={() => setMobileMenuOpen(false)} />
          {!isAuthenticated && (
            <div className="mt-auto flex flex-col items-center gap-3 mb-8">
              <Button
                component={RouterLink}
                to="/login"
                variant="text"
                fullWidth
                sx={{ 
                  color: "white",
                  fontSize: "16px",
                  maxWidth: "200px"
                }}
                onClick={() => setMobileMenuOpen(false)}
              >
                Login
              </Button>
              <Button
                component={RouterLink}
                to="/register"
                variant="contained"
                fullWidth
                sx={{ 
                  bgcolor: "#27A3A3",
                  "&:hover": {
                    bgcolor: "#1f8a8a"
                  },
                  fontSize: "16px",
                  maxWidth: "200px"
                }}
                onClick={() => setMobileMenuOpen(false)}
              >
                Sign up
              </Button>
            </div>
          )}
        </div>

        <div className="lg:block hidden">
          {isAuthenticated ? renderUserProfile : renderAuthButtons}
        </div>
        {renderMenu}
      </Toolbar>
    </Box>
  );
}
