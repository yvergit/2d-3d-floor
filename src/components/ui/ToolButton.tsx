'use client';

import React from 'react';

type ToolButtonProps = {
  id: string;
  title?: string;
  className?: string;
  children?: React.ReactNode;
  as?: 'button' | 'a';
  href?: string;
};

export function ToolButton({ id, title, className, children, as = 'button', href = '#'}: ToolButtonProps) {
  const common = {
    id,
    title,
    className: `btn btn-sm btn-default ac-btn ${className ?? ''}`.trim(),
  } as const;

  if (as === 'a') {
    return (
      <a {...common} href={href} role="button">
        {children}
      </a>
    );
  }

  return (
    <button {...common} type="button">
      {children}
    </button>
  );
}
