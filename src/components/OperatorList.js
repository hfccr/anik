import {
  Chip,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { getName, getLogo } from "@/util/operatorTypes";
import Image from "next/image";

export const OperatorList = ({ operators }) => {
  const items = operators.map((operator) => {
    const { operatorAddress, name, operatorType, slashes } = operator;
    return (
      <ListItem
        key={operatorAddress}
        secondaryAction={
          <>
            {slashes > 0 && (
              <Chip
                label={`${slashes} Slashes`}
                sx={{ position: "relative", right: 40 }}
              />
            )}
          </>
        }
      >
        <ListItemButton>
          <ListItemIcon>
            <Image
              src={getLogo(operatorType)}
              width={64}
              height={64}
              alt={getName(operatorType)}
            />
          </ListItemIcon>
          <ListItemText primary={name} secondary={operatorAddress} />
        </ListItemButton>
      </ListItem>
    );
  });
  return <List>{items}</List>;
};
