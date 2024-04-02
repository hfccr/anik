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
import Link from "next/link";
import { usePathname } from "next/navigation";

export const OperatorList = ({ operators, isDelegated, delegatedTo }) => {
  const pathname = usePathname();
  const items = operators.map((operator) => {
    const { operatorAddress, name, operatorType, slashes } = operator;
    const isDelegatedToOperator = operatorAddress === delegatedTo;
    return (
      <ListItem
        key={operatorAddress}
        secondaryAction={
          <>
            {isDelegatedToOperator && (
              <Chip
                label={`Delegated`}
                sx={{ position: "relative", right: 40 }}
                color="success"
              />
            )}
          </>
        }
      >
        <Link
          href={`${pathname}/view/${operatorAddress}`}
          style={{ width: "100%" }}
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
        </Link>
      </ListItem>
    );
  });
  return <List>{items}</List>;
};
