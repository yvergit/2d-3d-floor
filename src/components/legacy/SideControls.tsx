'use client';

import React from 'react';
import { ToolButton } from '@/components/ui/ToolButton';
import { Icons } from '@/components/ui/icons';

export function SideControls() {
  return (
    <div id="interface-controls" className="ac-side">
      <div className="ac-side-group">
        <ToolButton id="showFloorPlan" title="Edit 2D floorplan" className="active ac-sidebtn">
          <span className="ac-icon" aria-hidden="true"><Icons.Map /></span>
          <span className="ac-label">Floor Plan</span>
        </ToolButton>
        <ToolButton id="showDesign" title="Edit 3D floorplan" className="ac-sidebtn">
          <span className="ac-icon" aria-hidden="true"><Icons.Cube /></span>
          <span className="ac-label">3D Design</span>
        </ToolButton>
      </div>

      {/* View controls (legacy IDs) */}
      <div className="btn-group-vertical" id="viewcontrols">
        <div className="ac-viewpad">
          <a className="btn btn-default bottom ac-viewbtn" href="#" id="leftview" title="Show side view (left)">
            <span className="ac-icon" aria-hidden="true"><Icons.ArrowLeft /></span>
          </a>
          <span className="btn-group-vertical ac-viewstack">
            <a className="btn btn-default ac-viewbtn" href="#" id="topview" title="Show top view">
              <span className="ac-icon" aria-hidden="true"><Icons.ChevronUp /></span>
            </a>
            <a className="btn btn-default ac-viewbtn" href="#" id="isometryview" title="Show 3D view">
              <span className="ac-icon" aria-hidden="true"><Icons.Cube /></span>
            </a>
            <a className="btn btn-default ac-viewbtn" href="#" id="frontview" title="Show front view">
              <span className="ac-icon" aria-hidden="true"><Icons.ChevronDown /></span>
            </a>
          </span>
          <a className="btn btn-default bottom ac-viewbtn" href="#" id="rightview" title="Show side view (right)">
            <span className="ac-icon" aria-hidden="true"><Icons.ArrowRight /></span>
          </a>
        </div>

        <ToolButton id="showSwitchCameraMode" title="Switch camera ortho/perspective" className="ac-sidebtn">
          <span className="ac-icon" aria-hidden="true"><Icons.Camera /></span>
          <span className="ac-label">Camera</span>
        </ToolButton>

        <ToolButton id="showSwitchWireframeMode" title="Toggle wireframe" className="ac-sidebtn">
          <span className="ac-icon" aria-hidden="true"><Icons.Wire /></span>
          <span className="ac-label">Wireframe</span>
        </ToolButton>
      </div>

      <button id="showAddItems" className="btn btn-sm btn-default ac-btn ac-sidebtn ac-primary" data-toggle="modal" data-target="#add-items-modal" title="Add/Remove items in 3D" type="button">
        <span className="ac-icon" aria-hidden="true"><Icons.BagPlus /></span>
        <span className="ac-label">Inventory</span>
      </button>

      <div className="ac-minihelp">
        <div className="ac-minihelp-title">Quick help</div>
        <ul>
          <li><kbd>Shift</kbd> — snap to axis / grid</li>
          <li><kbd>Esc</kbd> — stop drawing walls</li>
          <li>Double-click corner — adjust elevation</li>
          <li>Click room — rename</li>
        </ul>
      </div>
    </div>
  );
}
