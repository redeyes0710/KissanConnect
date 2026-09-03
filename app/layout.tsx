import "./globals.css";

export const metadata = {
  title: "KisanConnect",
  description: "Connecting farmers directly with buyers.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}