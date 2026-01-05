import { Funnel_Sans } from "next/font/google";
import "./globals.css";
import type { Metadata } from 'next';

const funnelSans = Funnel_Sans({ 
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: 'Pragma - IA para Decisões',
  description: 'Uma IA que ajuda a tomar decisões melhores em negócios digitais antes de gastar tempo e dinheiro.',
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/images/favicon/favicon.png', type: 'image/png' },
    ],
    apple: '/images/favicon/favicon.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={funnelSans.className}>{children}</body>
    </html>
  );
}
