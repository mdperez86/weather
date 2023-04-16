import { DynaPuff as Font } from "next/font/google";

const font = Font({ subsets: ["latin"] });

import "./globals.css";

export const metadata = {
  title: "Weather",
  description: "Local weather information",
  manifest: "/manifest.webmanifest",
  icons: {
    icon: "/weather.svg",
  },
  themeColor: "#317EFB",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={font.className}>
      <body className="bg-gradient-to-br from-yellow-200 to-rose-300 overflow-hidden">
        <div className="container mx-auto">
          <main className="w-screen h-screen sm:w-auto bg-white/30 backdrop-blur-md rounded-xl py-8 px-6">
            {children}
          </main>
        </div>

        <script src="/sw.js" async />
      </body>
    </html>
  );
}
