import Head from 'next/head';

import FileInput from '@/components/FileInput';
import FileHistory from '@/components/FileHistory';
import { FileStateProvider } from '@/contexts/FileContext';

export default function Home() {
  return (
    <div>
      <Head>
        <title>Coding Challenge</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <FileStateProvider>
        <FileInput />
        <FileHistory />
      </FileStateProvider>
    </div>
  );
}
