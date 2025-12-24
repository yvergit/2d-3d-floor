import React from 'react';

type Props = { size?: number; className?: string; title?: string };

function Svg({ size = 18, className, title, children }: React.PropsWithChildren<Props>) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden={title ? undefined : true}
      role={title ? 'img' : 'presentation'}
      className={className}
    >
      {title ? <title>{title}</title> : null}
      {children}
    </svg>
  );
}

export const Icons = {
  Leaf: (p: Props) => (
    <Svg {...p}>
      <path d="M5 14c5.5 0 10-4.5 10-10 3 2 6 6 6 10a8 8 0 0 1-8 8c-4 0-7-3-8-8z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
      <path d="M9 13c2-2 5-3 8-3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </Svg>
  ),
  Map: (p: Props) => (
    <Svg {...p}>
      <path d="M9 18 3 20V6l6-2 6 2 6-2v14l-6 2-6-2Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
      <path d="M9 4v14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M15 6v14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </Svg>
  ),
  Cube: (p: Props) => (
    <Svg {...p}>
      <path d="M12 2 3.5 6.5 12 11 20.5 6.5 12 2Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
      <path d="M3.5 6.5V17.5L12 22V11" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
      <path d="M20.5 6.5V17.5L12 22" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
    </Svg>
  ),
  Hand: (p: Props) => (
    <Svg {...p}>
      <path d="M7 11V6a1 1 0 1 1 2 0v5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M9 11V4a1 1 0 1 1 2 0v7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M11 11V5a1 1 0 1 1 2 0v6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M13 11V7a1 1 0 1 1 2 0v7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M7 11v4a5 5 0 0 0 10 0v-3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </Svg>
  ),
  Pencil: (p: Props) => (
    <Svg {...p}>
      <path d="M4 20h4l11-11a2 2 0 0 0-4-4L4 16v4Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
      <path d="M13 6l5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </Svg>
  ),
  Trash: (p: Props) => (
    <Svg {...p}>
      <path d="M4 7h16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M10 11v6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M14 11v6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M6 7l1 14h10l1-14" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
      <path d="M9 7V4h6v3" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
    </Svg>
  ),
  Info: (p: Props) => (
    <Svg {...p}>
      <path d="M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20Z" stroke="currentColor" strokeWidth="1.8" />
      <path d="M12 10v7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M12 7h.01" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" />
    </Svg>
  ),
  Download: (p: Props) => (
    <Svg {...p}>
      <path d="M12 3v10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M8 10l4 4 4-4" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
      <path d="M5 21h14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </Svg>
  ),
  Mesh: (p: Props) => (
    <Svg {...p}>
      <path d="M5 7l7-4 7 4v10l-7 4-7-4V7Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
      <path d="M5 7l7 4 7-4" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
      <path d="M12 11v10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </Svg>
  ),
  Camera: (p: Props) => (
    <Svg {...p}>
      <path d="M7 7h10l2 3v9a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-9l2-3Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
      <path d="M12 18a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Z" stroke="currentColor" strokeWidth="1.8" />
    </Svg>
  ),
  Wire: (p: Props) => (
    <Svg {...p}>
      <path d="M4 6h16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M4 12h16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M4 18h16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M8 6v12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M16 6v12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </Svg>
  ),
  BagPlus: (p: Props) => (
    <Svg {...p}>
      <path d="M7 7h10l1 14H6L7 7Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
      <path d="M9 7a3 3 0 0 1 6 0" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M12 12v5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M9.5 14.5h5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </Svg>
  ),
  ArrowLeft: (p: Props) => (
    <Svg {...p}>
      <path d="M14 6l-6 6 6 6" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
    </Svg>
  ),
  ArrowRight: (p: Props) => (
    <Svg {...p}>
      <path d="M10 6l6 6-6 6" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
    </Svg>
  ),
  ChevronUp: (p: Props) => (
    <Svg {...p}>
      <path d="M6 15l6-6 6 6" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
    </Svg>
  ),
  ChevronDown: (p: Props) => (
    <Svg {...p}>
      <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
    </Svg>
  )
};
