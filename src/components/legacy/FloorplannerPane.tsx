'use client';

import React from 'react';
import { ToolButton } from '@/components/ui/ToolButton';
import { Icons } from '@/components/ui/icons';

export function FloorplannerPane() {
  return (
    <div id="floorplanner" className="front">
      <div id="floorplanner-controls" className="ac-toolbar">
        {/* NEW layout */}
        <ToolButton as="a" id="new2d" title="New Layout" href="#" className="ac-iconbtn">
          <span className="ac-icon" aria-hidden="true"><Icons.Leaf /></span>
        </ToolButton>

        {/* SAVE - keep original glyphicon icon */}
        <a
          href="#"
          className="btn btn-default btn-sm glyphicon glyphicon-floppy-save ac-btn"
          id="saveFile2d"
          title="Save Layout"
        />

        {/* UPLOAD - keep original glyphicon icon */}
        <a className="btn btn-sm btn-default btn-file glyphicon glyphicon-floppy-open ac-btn" href="#" title="Load Layout">
          <input type="file" className="hidden-input" id="loadFile2d" />
        </a>

        <ToolButton id="move" title="Move Walls" className="ac-btnwide">
          <span className="ac-icon" aria-hidden="true"><Icons.Hand /></span>
          <span className="ac-label">Move</span>
        </ToolButton>

        <ToolButton id="draw" title="Draw New Walls" className="ac-btnwide">
          <span className="ac-icon" aria-hidden="true"><Icons.Pencil /></span>
          <span className="ac-label">Draw</span>
        </ToolButton>

        <ToolButton id="delete" title="Delete Walls" className="ac-btnwide">
          <span className="ac-icon" aria-hidden="true"><Icons.Trash /></span>
          <span className="ac-label">Erase</span>
        </ToolButton>

        <ToolButton
          id="help2d"
          title={
            'Tips\nShift Key: Snap To Axis and Snap to Grid\nESC: Stop drawing walls\nDbL-Click(Corner): Adjust Elevation\nClick(Room): Change Name\n'
          }
          className="ac-iconbtn"
        >
          <span className="ac-icon" aria-hidden="true"><Icons.Info /></span>
        </ToolButton>
      </div>

      <canvas id="floorplanner-canvas" />

      {/* Legacy app.js toggles this by id */}
      <div id="draw-walls-hint" className="btn-hint">
        Press the <kbd>Esc</kbd> key to stop drawing walls
      </div>
    </div>
  );
}
