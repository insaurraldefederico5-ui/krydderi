// Root layout: passthrough so app/[locale]/layout.tsx owns html/body and lang
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
