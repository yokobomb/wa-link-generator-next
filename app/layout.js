import "./globals.css";

export const metadata = {
  title: "WhatsApp Link Generator",
  description: "Generate WhatsApp chat links with a phone number and message.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
