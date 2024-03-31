"use client";
import {
  Avatar,
  Chip,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import React from "react";
import Image from "next/image";
import { strategies } from "@/util/strategies";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAccount, useReadContract } from "wagmi";
import { strategyManager } from "@/util/strategyManager";

export const Strategies = () => {
  const pathname = usePathname();
  const { address } = useAccount();
  const { isSuccess, data: deposits } = useReadContract({
    abi: strategyManager.abi,
    address: strategyManager.address,
    functionName: "getDeposits",
    args: [address],
  });
  const depositMap = {};
  if (isSuccess) {
    const [strategyAddress, deposit] = deposits;
    strategyAddress.forEach((address, index) => {
      depositMap[address] = deposit[index];
    });
  }
  const items = strategies.map((strategy) => {
    const { key, title, ticker, logo, strategyAddress } = strategy;
    const restaked = depositMap[strategyAddress] || 0;
    const chipLabel = restaked > 0 ? `${restaked} Restaked` : "Not Restaked";
    return (
      <ListItem
        key={key}
        secondaryAction={
          <>
            {restaked > 0 && (
              <Chip
                label={chipLabel}
                sx={{ position: "relative", right: 40 }}
              />
            )}
          </>
        }
      >
        <Link href={`${pathname}/${key}`} style={{ width: "100%" }}>
          <ListItemButton>
            <ListItemIcon>
              <Avatar sx={{ height: 36, width: 36 }}>
                <Image src={logo} width={36} height={36} alt={ticker} />
              </Avatar>
            </ListItemIcon>
            <ListItemText
              primary={title}
              secondary={ticker}
              primaryTypographyProps={{ variant: "h6" }}
              secondaryTypographyProps={{ variant: "body1" }}
            />
          </ListItemButton>
        </Link>
      </ListItem>
    );
  });
  return <List>{items}</List>;
};
