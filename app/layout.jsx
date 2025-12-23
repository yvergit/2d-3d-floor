import './globals.css';

export const metadata = {
  title: 'Architect3D - Floorplan',
  description: 'Architect3D floorplanner (Blueprint3D) wrapped in Next.js',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        {/* Legacy styles (kept as-is to preserve functionality/appearance) */}
        <link rel="stylesheet" href="/css/jquery-ui.css" />
        <link rel="stylesheet" href="/css/bootstrap.min.css" />
        <link rel="stylesheet" href="/css/app.css" />
      </head>
      <body>{children}</body>
    </html>
  );
}
