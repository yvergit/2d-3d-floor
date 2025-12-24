'use client';

import React from 'react';
import { InterfacesCard } from '@/components/legacy/InterfacesCard';
import { SideControls } from '@/components/legacy/SideControls';
import { AddItemsModal } from '@/components/legacy/AddItemsModal';

export function CozyShell() {
  return (
    <div className="ac-shell">
      <header className="ac-topbar">
        <div className="ac-brand">
          <div className="ac-logo" aria-hidden="true" />
          <div className="ac-title">
            <strong>3dfloor</strong>
            <span>plan your floor in 2d and 3d</span>
          </div>
        </div>

        <div className="ac-top-actions">
          <span className="ac-chip">Tip: <kbd>Esc</kbd> stops wall drawing</span>
          <span className="ac-chip">Shift = snap</span>
        </div>
      </header>

      <main className="ac-main">
        <section className="ac-panel">
          <div className="ac-panel-header">
            <div>
              <h2>Workspace</h2>
              <p>Switch between 2D Floor Plan and 3D Design — let's go!</p>
            </div>
            <div className="ac-badge" aria-hidden="true">v1</div>
          </div>
          <div className="ac-panel-body ac-panel-body--workspace">
            <InterfacesCard />
          </div>
        </section>

        <aside className="ac-panel">
          <div className="ac-panel-header">
            <div>
              <h2>Controls</h2>
              <p>Cozy quick actions. IDs preserved so legacy JS continues to work.</p>
            </div>
          </div>
          <div className="ac-panel-body ac-panel-body--controls">
            <SideControls />
            <div className="ac-divider" />
            <div className="ac-credits">
              <div className="ac-credits-title">Credits</div>
              <p>
                Made by: <strong>Yverdon</strong>.
              </p>
              <p className="ac-credits-muted">
                Core engine and legacy scripts remain from the original BP3DJS-based build.
              </p>
            </div>
          </div>
        </aside>

        <AddItemsModal />
      </main>
    </div>
  );
}
