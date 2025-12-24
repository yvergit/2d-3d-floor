import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: '3dfloor • Cozy Edition',
  description: '3dfloor — a Blueprint3D floorplan editor in a cozy Animal-Crossing-inspired UI.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        {/* Legacy Bootstrap for glyphicons + modal JS hooks. Our theme overrides the look. */}
        <link rel="stylesheet" href="/css/bootstrap.min.css" />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
