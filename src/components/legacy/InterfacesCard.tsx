'use client';

import React from 'react';
import { FloorplannerPane } from './FloorplannerPane';
import { ViewerPane } from './ViewerPane';

/**
 * IMPORTANT: Keep IDs and selectors identical to the legacy index.html.
 * The legacy scripts in /public/js/app.js rely on these.
 */
export function InterfacesCard() {
  return (
    <div id="interfaces" className="card">
      <FloorplannerPane />
      <ViewerPane />
    </div>
  );
}
