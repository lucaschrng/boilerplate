import '~/styles/globals.css';

import { type Metadata } from 'next';
import { DM_Serif_Display, Geist } from 'next/font/google';

import Providers from './providers';

export const metadata: Metadata = {
  description: 'Lucas Charoing Boilerplate',
  icons: [
    { rel: 'icon', url: '/icons/favicon.ico' },
    { rel: 'apple-touch-icon', sizes: '180x180', url: '/icons/apple-touch-icon.png' },
    { rel: 'icon', sizes: '32x32', type: 'image/png', url: '/favicon-32x32.png' },
    { rel: 'icon', sizes: '16x16', type: 'image/png', url: '/favicon-16x16.png' },
  ],
  title: 'Lucas Charoing Boilerplate',
};

const geist = Geist({
  subsets: ['latin'],
  variable: '--font-geist-sans',
});

const dmSerifDisplay = DM_Serif_Display({
  subsets: ['latin'],
  variable: '--font-dm-serif-display',
  weight: ['400'],
});

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html className={`${geist.variable} ${dmSerifDisplay.variable}`} lang="en" suppressHydrationWarning>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
