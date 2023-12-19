import Navbar from '@/components/Navbar';
import './globals.css';
import type { Metadata } from 'next';
import { Roboto } from 'next/font/google';
import { MessageProvider } from '@/contexts/messageContext';
import { headers } from 'next/headers';
import { AuthProvider } from '@/contexts/userContext';
const inter = Roboto({ subsets: ['latin'], weight: ['100', '300', '400', '500', '700', '900'] });

export const metadata: Metadata = {
  title: 'Library',
  description: 'Library with next',
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const pathname = headers().get('x-next-pathname') as string;

  return (
    <html lang="pt-BR">
      <body className={`${inter.className} ${!pathname.includes('/auth') ? 'bg-secondary' : 'bg-bg bg-center'}`}>
        <AuthProvider>
          <MessageProvider>
            {!pathname.includes('/auth') ? (
              <>
                <Navbar />
                <main className="">{children}</main>
              </>
            ) : (
              <main>{children}</main>
            )}
          </MessageProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
