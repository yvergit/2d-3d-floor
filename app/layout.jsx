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

        {/* Friendly, game-ish typefaces (Animal Crossing-inspired vibe) */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800&family=Fredoka:wght@400;500;600&display=swap"
        />

        {/* Legacy styles (kept as-is to preserve functionality/appearance) */}
        <link rel="stylesheet" href="/css/jquery-ui.css" />
        <link rel="stylesheet" href="/css/bootstrap.min.css" />
        <link rel="stylesheet" href="/css/app.css" />

        {/* Modern UI layer (overrides legacy look but preserves IDs/behavior) */}
        <link rel="stylesheet" href="/css/modern-ui.css" />
      </head>
      <body>{children}</body>
    </html>
  );
}
