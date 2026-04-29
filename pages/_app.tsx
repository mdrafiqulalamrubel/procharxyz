import '@blocknote/core/fonts/inter.css';
import '../src/index.css';
import '@blocknote/mantine/style.css';
import type { AppProps } from 'next/app';
import dynamic from 'next/dynamic';

// Load ChatBot without SSR (client-side only)
const ChatBot = dynamic(() => import('../src/components/ChatBot'), { ssr: false });

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Component {...pageProps} />
      <ChatBot />
    </>
  );
}
