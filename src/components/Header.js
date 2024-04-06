import * as React from "react";
import { useState } from "react";
import { Stack, useMediaQuery, useTheme } from "@mui/material";
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
import { motion } from "framer-motion";
import Image from "next/image";

const pages = [
  {
    title: "Restake",
    href: "/dapp/restake",
  },
  {
    title: "Operators",
    href: "/dapp/operators",
  },
  {
    title: "IPC",
    href: "/dapp/ipc",
  },
  {
    title: "SPs",
    href: "/dapp/sps",
  },
];

export default function Header() {
  const pathname = usePathname();
  const selectedIndex = pages.findIndex(
    (page) => pathname.indexOf(page.href) >= 0
  );
  const isHome = pathname === "/";
  const [anchorElNav, setAnchorElNav] = useState(null);
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };
  const theme = useTheme();
  const uptoMedium = useMediaQuery(theme.breakpoints.down("lg"));
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
            <Stack
              direction={{ sm: "column", md: "row" }}
              justifyContent="space-between"
              alignItems="center"
              sx={{ width: "100%" }}
            >
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                sx={{ flexGrow: 1 }}
              >
                <Link href="/" legacyBehavior>
                  <Stack direction="row" alignItems="center" spacing={2}>
                    <Box
                      sx={{
                        display: {
                          xs: "none",
                          sm: "none",
                          md: "none",
                          lg: "block",
                        },
                        paddingTop: 2,
                        cursor: "pointer",
                      }}
                    >
                      <motion.div
                        className="container"
                        whileHover={{ scale: 1.2, rotate: 20 }}
                        whileTap={{
                          scale: 0.8,
                          rotate: -40,
                          borderRadius: "100%",
                        }}
                        initial={{ scale: 0.4 }}
                        animate={{ rotate: 0, scale: 1 }}
                        transition={{
                          type: "spring",
                          stiffness: 260,
                          damping: 20,
                        }}
                      >
                        <Image
                          src="/twist.svg"
                          alt="logo-image"
                          width={uptoMedium ? 32 : 72}
                          height={uptoMedium ? 32 : 72}
                          priority
                        />
                      </motion.div>
                    </Box>
                    <Box
                      sx={{
                        visibility: !isHome ? "hidden" : "visible",
                      }}
                    >
                      <Typography
                        variant="h1"
                        component="div"
                        sx={{
                          cursor: "pointer",
                          display: {
                            xs: "none",
                            sm: "none",
                            md: "none",
                            lg: "flex",
                          },
                        }}
                      >
                        anik
                      </Typography>
                      <Typography
                        variant="h3"
                        component="div"
                        sx={{
                          cursor: "pointer",
                          display: { xs: "none", md: "flex", lg: "none" },
                        }}
                      >
                        anik
                      </Typography>
                    </Box>
                  </Stack>
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
                          <Typography textAlign="center">
                            {page.title}
                          </Typography>
                        </MenuItem>
                      </Link>
                    ))}
                  </Menu>
                </Box>
                <Typography
                  variant="h4"
                  noWrap
                  component="div"
                  sx={{
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
                  sx={{
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
                      <motion.div
                        whileHover={{ scale: 1.2 }}
                        transition={{
                          type: "tween",
                          stiffness: 400,
                          damping: 10,
                        }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <Button
                          onClick={handleCloseNavMenu}
                          color="inherit"
                          sx={{ my: 4, display: "block", mx: { md: 0, lg: 2 } }}
                          size={uptoMedium ? "small" : "large"}
                          variant={
                            selectedIndex === pageIndex ? "outlined" : "text"
                          }
                        >
                          {page.title}
                        </Button>
                      </motion.div>
                    </Link>
                  ))}
                </Box>
              </Stack>
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
            </Stack>
          </Toolbar>
        </Container>
      </AppBar>
    </Box>
  );
}
