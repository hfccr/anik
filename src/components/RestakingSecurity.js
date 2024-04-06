import { Paper, Stack, Typography, Skeleton } from "@mui/material";

export const RestakingSecurity = ({ isSuccess, isFetching, ipcStaking }) => {
  const title = "Restaked";
  return (
    <Paper variant="outlined" sx={{ padding: 2 }}>
      <Stack spacing={2}>
        <Typography variant="h6">{title}</Typography>
        <Stack
          direction="column"
          spacing={2}
          justifyContent="center"
          alignItems="center"
          sx={{ padding: 2 }}
        >
          {isFetching && <Skeleton height={20} />}
          <Typography variant="h4" sx={{ paddingLeft: 1, paddingRight: 1 }}>
            {ipcStaking.toString()}
          </Typography>
          <Typography>Tokens</Typography>
        </Stack>
      </Stack>
    </Paper>
  );
};
