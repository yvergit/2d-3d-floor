'use client';

import React, { useEffect, useRef } from 'react';
import { ToolButton } from '@/components/ui/ToolButton';
import { Icons } from '@/components/ui/icons';

export function ViewerPane() {
  const didBindRef = useRef(false);

  useEffect(() => {
    
    const viewer = document.getElementById('viewer') as HTMLElement | null;
    if (!viewer) return;

    // --- WebGL sizing hardening for Next 15 + React 19.
    // BP3DJS computes sizes using jQuery offsets; when the 3D face becomes visible
    // (after flip), we must re-run updateWindowSize so the renderer draws full-size.

    const findCanvas = (): HTMLCanvasElement | null => {
      return (
        (document.getElementById('three-canvas') as HTMLCanvasElement | null) ||
        (viewer.querySelector('canvas') as HTMLCanvasElement | null)
      );
    };

    const forceCanvasFill = () => {
      const c = findCanvas();
      if (!c) return;
      if (!viewer.contains(c)) viewer.appendChild(c);
      const s = c.style;
      s.position = 'absolute';
      s.inset = '0';
      s.width = '100%';
      s.height = '100%';
      s.display = 'block';
      // Kill any centering styles injected by legacy code or bootstrap.
      s.margin = '0';
      s.transform = 'none';
    };

    const updateBp3d = () => {
      const bp = (window as any).blueprint3d;
      const three = bp?.three;

      // Keep the renderer/cameras synced to the DOM size.
      if (three?.updateWindowSize) {
        try {
          three.updateWindowSize();
        } catch {
          // ignore
        }
      }

      // Some builds expose renderer/camera directly.
      const r = three?.renderer ?? (window as any).renderer;
      const cam = three?.camera ?? (window as any).camera;
      if (r?.setSize && cam?.updateProjectionMatrix) {
        const w = viewer.clientWidth;
        const h = viewer.clientHeight;
        if (w > 0 && h > 0) {
          try {
            r.setSize(w, h, false);
          } catch {
            try {
              r.setSize(w, h);
            } catch {
              // ignore
            }
          }
          try {
            cam.aspect = w / h;
            cam.updateProjectionMatrix();
          } catch {
            // ignore
          }
        }
      }

      forceCanvasFill();
    };

    const tickUntilReady = () => {
      let tries = 0;
      const t = window.setInterval(() => {
        tries += 1;
        updateBp3d();
        const hasCanvas = !!findCanvas();
        const bp = (window as any).blueprint3d;
        if ((bp?.three && hasCanvas) || tries > 40) {
          window.clearInterval(t);
        }
      }, 150);
      return () => window.clearInterval(t);
    };

    const onResize = () => updateBp3d();
    const ro = new ResizeObserver(onResize);
    ro.observe(viewer);
    window.addEventListener('resize', onResize);

    // If BP3DJS re-creates the canvas, re-apply sizing.
    const mo = new MutationObserver(() => updateBp3d());
    mo.observe(viewer, { childList: true, subtree: true });

    // After flipping to 3D, the element becomes visible and needs a resize.
    // Bind once to avoid stacking listeners on HMR.
    if (!didBindRef.current) {
      didBindRef.current = true;
      const bindClick = (id: string) => {
        const el = document.getElementById(id);
        if (!el) return;
        el.addEventListener('click', () => {
          // Flip animation + layout settle
          setTimeout(updateBp3d, 50);
          setTimeout(updateBp3d, 250);
          setTimeout(updateBp3d, 600);
        });
      };
      bindClick('showDesign');
      bindClick('showFirstPerson');
      bindClick('showFloorPlan');
    }

    // Kick once immediately, then poll briefly until BP3DJS is fully ready.
    updateBp3d();
    const stopTick = tickUntilReady();

    return () => {
      stopTick();
      ro.disconnect();
      mo.disconnect();
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return (
    <div id="viewer" className="back">
      <div id="main-controls" className="ac-toolbar">
        <ToolButton as="a" id="new" title="New Layout" href="#" className="ac-iconbtn">
          <span className="ac-icon" aria-hidden="true"><Icons.Leaf /></span>
        </ToolButton>

        {/* SAVE - keep original glyphicon icon */}
        <a
          href="#"
          className="btn btn-default btn-sm glyphicon glyphicon-floppy-save ac-btn"
          id="saveFile"
          title="Save Layout"
        />

        {/* UPLOAD - keep original glyphicon icon */}
        <a className="btn btn-sm btn-default btn-file glyphicon glyphicon-floppy-open ac-btn" href="#" title="Load Layout">
          <input type="file" className="hidden-input" id="loadFile" />
        </a>

        <ToolButton as="a" id="saveMesh" title="Export scene as OBJ mesh" href="#" className="ac-iconbtn">
          <span className="ac-icon" aria-hidden="true"><Icons.Mesh /></span>
        </ToolButton>

        <ToolButton as="a" id="saveGLTF" title="Export scene as GLTF" href="#" className="ac-iconbtn">
          <span className="ac-icon" aria-hidden="true"><Icons.Download /></span>
        </ToolButton>
      </div>

      {/* Canvas is created by the BP3DJS viewer and injected here */}
    </div>
  );
}
