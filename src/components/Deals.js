import { Alert, Button, List, ListItem, ListItemText } from "@mui/material";
import { MinerSlashButton } from "./MinerSlashButton";
import { formatSize } from "@/util/formatSize";

const MAX_DEALS = 500;

export const Deals = ({ deals, operatorDetails, slash }) => {
  const { minerId } = operatorDetails;
  const noDeals = deals.length === 0;
  const dealList = deals.slice(0, MAX_DEALS).map((deal) => {
    const { id: dealId, startTimestamp, endTimestamp, pieceSize } = deal;
    const startDateString = new Date(startTimestamp * 1000)
      .toDateString()
      .slice(4);
    const endDateString = new Date(endTimestamp * 1000).toDateString().slice(4);
    const dateRange = `${formatSize(
      pieceSize
    )} From ${startDateString} - ${endDateString}`;
    const secondaryAction =
      slash !== false ? (
        <MinerSlashButton operatorDetails={operatorDetails} deal={deal} />
      ) : null;
    return (
      <ListItem component="div" key={dealId} secondaryAction={secondaryAction}>
        <ListItemText primary={dealId} secondary={dateRange} />
      </ListItem>
    );
  });
  return (
    <>
      {noDeals && <Alert severity="info">No deals by miner t0{minerId}</Alert>}
      {!noDeals && <List>{dealList}</List>}
    </>
  );
};
