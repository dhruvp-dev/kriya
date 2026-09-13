import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Avatars',
};

export default function AvatarsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
