import type { Metadata } from 'next';
import { Plus_Jakarta_Sans, Outfit, Dancing_Script } from 'next/font/google';
import './globals.css';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { ThemeProvider } from '@/components/ThemeProvider';
import { withBasePath } from '@/lib/assets';

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
});

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-heading',
  display: 'swap',
});

const dancingScript = Dancing_Script({
  subsets: ['latin'],
  variable: '--font-accent',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Travelog — Journey Around the World',
  description:
    'A personal travel blog showcasing journeys across the world with stunning photography and stories from every destination.',
  keywords: ['travel', 'blog', 'photography', 'adventure', 'wanderlust'],
  authors: [{ name: 'Rajat' }],
  icons: {
    icon: [{ url: withBasePath('/travelog-icon.svg'), type: 'image/svg+xml' }],
    shortcut: [{ url: withBasePath('/travelog-icon.svg'), type: 'image/svg+xml' }],
    apple: [{ url: withBasePath('/apple-icon.svg'), type: 'image/svg+xml' }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="golden-hour-light" suppressHydrationWarning>
      <body className={`${plusJakartaSans.variable} ${outfit.variable} ${dancingScript.variable} font-sans antialiased`}>
        <ThemeProvider>
          <div className="flex min-h-screen flex-col">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
