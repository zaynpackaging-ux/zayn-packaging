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
    <html lang="id" className="dark">
      <body className="bg-slate-950 text-slate-100 min-h-screen antialiased">
        {children}
      </body>
    </html>
  );
}
