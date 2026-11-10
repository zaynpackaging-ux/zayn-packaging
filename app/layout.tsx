import "./globals.css";

export const metadata = {
  title: "Zayn Packaging ERP",
  description: "Sistem Operasional Harian Zayn Packaging",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <body>{children}</body>
    </html>
  );
}
