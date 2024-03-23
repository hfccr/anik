"use client";
import {
  Avatar,
  Container,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";
import Image from "next/image";

export const Protocols = () => {
  return (
    <List>
      <ListItem>
        <ListItemIcon>
          <Avatar sx={{ height: 36, width: 36 }}>
            <Image src="/glif.webp" width={36} height={36} alt="iFIL" />
          </Avatar>
        </ListItemIcon>
        <ListItemText primary="GLIF Infinity Pool" secondary="iFIL" />
      </ListItem>
      <ListItem>
        <ListItemIcon>
          <Avatar sx={{ height: 36, width: 36 }}>
            <Image src="/stfil.webp" width={36} height={36} alt="stFIL" />
          </Avatar>
        </ListItemIcon>
        <ListItemText primary="STFIL" secondary="stFIL" />
      </ListItem>
      <ListItem>
        <ListItemIcon>
          <Avatar sx={{ height: 36, width: 36 }}>
            <Image
              src="/collectif-dao.webp"
              width={36}
              height={36}
              alt="cIFIL"
            />
          </Avatar>
        </ListItemIcon>
        <ListItemText primary="CollectifDAO" secondary="cIFIL" />
      </ListItem>
      <ListItem>
        <ListItemIcon>
          <Avatar sx={{ height: 36, width: 36 }}>
            <Image src="/repl.webp" width={36} height={36} alt="pFIL" />
          </Avatar>
        </ListItemIcon>
        <ListItemText primary="Repl" secondary="pFIL" />
      </ListItem>
      <ListItem>
        <ListItemIcon>
          <Avatar sx={{ height: 36, width: 36 }}>
            <Image src="/sft-protocol.webp" width={36} height={36} alt="SFT" />
          </Avatar>
        </ListItemIcon>
        <ListItemText primary="SFT Protocol" secondary="SFT" />
      </ListItem>
      <ListItem>
        <ListItemIcon>
          <Avatar sx={{ height: 36, width: 36 }}>
            <Image
              src="/filet-finance.webp"
              width={36}
              height={36}
              alt="nFIL"
            />
          </Avatar>
        </ListItemIcon>
        <ListItemText primary="Filet" secondary="nFIL" />
      </ListItem>
    </List>
  );
};
