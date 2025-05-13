import './globals.css';
import Header from './components/Header';
import Footer from './components/Footer';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'HU UFPI',
  description: 'Sistema de Avaliação de Hanseníase',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-br" className="w-full h-full bg-white">
      <body className="flex flex-col min-h-screen w-full bg-white text-black">
        <Header />
        <main className="flex-grow pt-4 px-4">{children}</main>
        <Footer />
      </body>
    </html>
  );
}