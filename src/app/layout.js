"use client";
import { Toaster } from "react-hot-toast";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiProvider } from "wagmi";
import ColorModeHandler from "@/components/ColorModeHandler";
import Header from "@/components/Header";
import "@fontsource-variable/unbounded";
import "@fontsource/syncopate";
import "@fontsource/paytone-one";
import "@rainbow-me/rainbowkit/styles.css";
import "./globals.css";
import { config } from "@/util/wagmiConfig";
import { RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { Container } from "@mui/material";

const queryClient = new QueryClient();

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ColorModeHandler>
          <WagmiProvider config={config}>
            <QueryClientProvider client={queryClient}>
              <RainbowKitProvider>
                <Container>
                  <Toaster />
                  <Header />
                  {children}
                </Container>
              </RainbowKitProvider>
            </QueryClientProvider>
          </WagmiProvider>
        </ColorModeHandler>
      </body>
    </html>
  );
}
