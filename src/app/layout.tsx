import type { Metadata } from 'next';
import '../styles/globals.css';

export const metadata: Metadata = {
  title: 'Graphiql app',
  description: 'React course final project',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return children;
}
