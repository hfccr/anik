import { Box, Container, Divider, Stack, Typography } from "@mui/material";
import Image from "next/image";

export default function Home() {
  return (
    <Stack
      direction="column"
      justifyContent="center"
      alignItems="center"
      spacing={8}
      sx={{ paddingBottom: 8 }}
    >
      <Stack
        direction={{ md: "column", lg: "row" }}
        justifyContent="center"
        alignItems="center"
        sx={{ minHeight: "70vh", position: "relative" }}
      >
        <Image
          src="/flow-diagonal.svg"
          alt="flow-diagonal"
          fill="true"
          priority
          quality={100}
        />
        <Typography variant="h1" sx={{ textAlign: "center", zIndex: 1 }}>
          Filecoin Ecosystem Trust Layer
        </Typography>
      </Stack>
      <Box sx={{ width: "100%" }}>
        <Divider>
          <Typography variant="h2">About</Typography>
        </Divider>
      </Box>
      <Container>
        <Stack
          justifyContent="center"
          alignItems="center"
          direction={{ md: "column", lg: "row" }}
          spacing={5}
        >
          <Image src="/tusk.svg" alt="tusk" width={400} height={400} />
          <Stack spacing={4}>
            <Typography variant="h2">Restaking For Filecoin</Typography>
            <Typography variant="h6">
              Anik is a restaking layer focussed on providing cryptoeconomic
              trust to participants in the Filecoin Ecosystem
            </Typography>
          </Stack>
        </Stack>
      </Container>
      <Box sx={{ width: "100%" }}>
        <Divider>
          <Typography variant="h2">Use Cases</Typography>
        </Divider>
      </Box>
      <Container>
        <Stack
          justifyContent="center"
          alignItems="center"
          direction={{ md: "column", lg: "row" }}
          spacing={5}
        >
          <Image
            src="/tree.svg"
            alt="tree"
            width={400}
            height={400}
            style={{ opacity: 0.4 }}
          />
          <Stack spacing={4}>
            <Typography variant="h2">IPC Subnet Security</Typography>
            <Typography variant="h6">
              Bootstrap trusted IPC subnets by delegation of Restaked LSTs to
              Subnet Validators
            </Typography>
          </Stack>
        </Stack>
      </Container>
      <Container>
        <Stack
          justifyContent="center"
          alignItems="center"
          direction={{ md: "column", lg: "row-reverse" }}
          spacing={5}
        >
          <Image
            src="/disks.svg"
            alt="disks"
            width={400}
            height={400}
            style={{ opacity: 0.6 }}
          />
          <Stack spacing={4}>
            <Typography variant="h2">Storage Providers</Typography>
            <Typography variant="h6">
              Help manage Storage Provider capital by delegating LSTs for deal
              collaterals
            </Typography>
          </Stack>
        </Stack>
      </Container>
      <Container>
        <Stack
          justifyContent="center"
          alignItems="center"
          direction={{ md: "column", lg: "row" }}
          spacing={5}
        >
          <Image
            src="/fetch.svg"
            alt="fetch"
            width={400}
            height={400}
            style={{ opacity: 0.6 }}
          />
          <Stack spacing={4}>
            <Typography variant="h2">Retrieval Protocols</Typography>
            <Typography variant="h6">
              Delegate to offchain retrieval attestors & storage providers to
              secure the next generation of Retrieval Protocols
            </Typography>
          </Stack>
        </Stack>
      </Container>
    </Stack>
  );
}
