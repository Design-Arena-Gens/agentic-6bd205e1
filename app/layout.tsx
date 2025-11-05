import { ReactNode } from "react";
import { Space_Grotesk } from "next/font/google";
import StyledComponentsRegistry from "../lib/registry";
import QuoteBanner from "../components/QuoteBanner";
import "./globals.css";

export const metadata = {
  title: "Weird Wins: Offbeat Marketing That Worked",
  description:
    "Dive into the strangest marketing campaigns that turned into runaway successes, complete with stories, data, and interactive explorations."
};

type Props = {
  children: ReactNode;
};

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  display: "swap"
});

export default function RootLayout({ children }: Props) {
  return (
    <html lang="en">
      <body className={spaceGrotesk.className}>
        <StyledComponentsRegistry>
          <main>
            <QuoteBanner />
            {children}
          </main>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
