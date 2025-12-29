import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Compikzel - AI Image Generation",
  description: "Create stunning AI-generated images with Compikzel powered by OpenAI DALL-E 3",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="font-interface">
        {children}
      </body>
    </html>
  );
}
