"use client";
import {
  Avatar,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import React from "react";
import Image from "next/image";
import { strategies } from "@/util/strategies";

export const Strategies = () => {
  const items = strategies.map((strategy) => {
    const { key, title, ticker, logo } = strategy;
    return (
      <ListItem key={key}>
        <ListItemIcon>
          <Avatar sx={{ height: 36, width: 36 }}>
            <Image src={logo} width={36} height={36} alt={ticker} />
          </Avatar>
        </ListItemIcon>
        <ListItemText primary={title} secondary={ticker} />
      </ListItem>
    );
  });
  return <List>{items}</List>;
};
