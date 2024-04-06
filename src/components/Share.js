import { Avatar, ListItem, ListItemIcon, ListItemText } from "@mui/material";
import Image from "next/image";

export const Share = ({ strategy, delegatableShares }) => {
  return (
    <ListItem key={strategy.strategyAddress} component="div">
      <ListItemIcon>
        <Avatar sx={{ height: 32, width: 32 }}>
          <Image
            src={strategy.logo}
            width={32}
            height={32}
            alt={strategy.title}
          />
        </Avatar>
      </ListItemIcon>
      <ListItemText
        primary={strategy.title}
        secondary={delegatableShares.toString() + " shares delegated"}
      />
    </ListItem>
  );
};
