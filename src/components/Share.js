import { Avatar, ListItem, ListItemIcon, ListItemText } from "@mui/material";
import Image from "next/image";

export const Share = ({ strategy, operatorAddress, delegatableShares }) => {
  return (
    <ListItem key={strategy.strategyAddress}>
      <ListItemIcon>
        <Avatar sx={{ height: 36, width: 36 }}>
          <Image
            src={strategy.logo}
            width={36}
            height={36}
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
