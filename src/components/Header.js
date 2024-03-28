import * as React from "react";
import { useState } from "react";
import { useTheme } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import ToggleColorMode from "./ToggleColorMode";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import MenuItem from "@mui/material/MenuItem";
import Link from "next/link";
import Connect from "./Connect";
import { usePathname } from "next/navigation";
import { hexToRgb } from "../util/hexToRgb";

const pages = [
  {
    title: "Restake",
    href: "/dapp/restake",
  },
  {
    title: "Stats",
    href: "/dapp/stats",
  },
  {
    title: "Operators",
    href: "/dapp/operators",
  },
];

export default function Header() {
  const pathname = usePathname();
  const selectedIndex = pages.findIndex(
    (page) => pathname.indexOf(page.href) >= 0
  );
  const [anchorElNav, setAnchorElNav] = useState(null);
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };
  const theme = useTheme();
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        elevation={0}
        position="fixed"
        color="inherit"
        sx={{
          padding: 1,
          backdropFilter: "blur(8px)",
          backgroundColor: hexToRgb(theme.palette.background.default, 0.8),
        }}
      >
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Link href="/" legacyBehavior>
              <Box>
                <Typography
                  variant="h1"
                  component="div"
                  sx={{
                    cursor: "pointer",
                    fontFamily: "Syncopate, sans-serif",
                    display: { xs: "none", sm: "none", md: "none", lg: "flex" },
                  }}
                >
                  anik
                </Typography>
                <Typography
                  variant="h3"
                  component="div"
                  sx={{
                    cursor: "pointer",
                    fontFamily: "Syncopate, sans-serif",
                    display: { xs: "none", md: "flex", lg: "none" },
                  }}
                >
                  anik
                </Typography>
              </Box>
            </Link>
            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="app-menu"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: "block", md: "none" },
                }}
              >
                {pages.map((page) => (
                  <Link key={page.href} href={page.href} legacyBehavior>
                    <MenuItem onClick={handleCloseNavMenu}>
                      <Typography textAlign="center">{page.title}</Typography>
                    </MenuItem>
                  </Link>
                ))}
              </Menu>
            </Box>
            <Typography
              variant="h5"
              noWrap
              component="div"
              color="primary"
              sx={{
                fontFamily: "Syncopate",
                display: { xs: "none", sm: "flex", md: "none" },
                mr: 2,
                flexGrow: 1,
              }}
            >
              anik
            </Typography>
            <Typography
              variant="h6"
              noWrap
              component="div"
              color="primary"
              sx={{
                fontFamily: "Syncopate",
                display: { xs: "flex", sm: "none" },
                mr: 1,
                flexGrow: 1,
              }}
            >
              anik
            </Typography>
            <Box
              sx={{
                flexGrow: 1,
                display: {
                  xs: "none",
                  md: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                },
              }}
            >
              {pages.map((page, pageIndex) => (
                <Link key={page.href} href={page.href} legacyBehavior>
                  <Button
                    onClick={handleCloseNavMenu}
                    color="inherit"
                    sx={{ my: 4, display: "block", mx: 2 }}
                    size="large"
                    variant={selectedIndex === pageIndex ? "outlined" : "text"}
                  >
                    {page.title}
                  </Button>
                </Link>
              ))}
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                alignItems: "center",
              }}
            >
              <ToggleColorMode />
              <Box
                sx={{
                  minWidth: { xs: "auto", md: "auto", lg: "445px" },
                }}
              >
                <Connect />
              </Box>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </Box>
  );
}
