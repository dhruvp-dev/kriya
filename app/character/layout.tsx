import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Character',
};

export default function CharacterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
