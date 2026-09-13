import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Quests',
};

export default function QuestsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
