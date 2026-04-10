import "./globals.css";

export const metadata = {
  title: "Product Builder",
  description: "AI workspace for turning product ideas into executable plans.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
