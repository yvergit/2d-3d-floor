"use client";

import Script from "next/script";


const BODY_HTML = `
	<div id="ac-shell" class="ac-shell">
		<div id="ac-topbar" class="ac-topbar">
			<div class="ac-brand">
				<div class="ac-logo" aria-hidden="true"></div>
				<div class="ac-brand-text">
					<div class="ac-title">3Dfloor</div>
					<div class="ac-subtitle"> 2d floorplanner • 3d <span class="ac-author">viewer</span></div>
				</div>
			</div>
			<div class="ac-top-actions">
				<button id="ac-help" class="btn btn-sm btn-default" type="button" title="Shortcuts & tips">?</button>
				<button id="ac-theme" class="btn btn-sm btn-default" type="button" title="Toggle dusk mode">🌙</button>
			</div>
		</div>

		<div id="ac-toast-root" class="ac-toast-root" aria-live="polite" aria-atomic="true"></div>
		<div id="ac-autosave-banner" class="ac-banner ac-hidden" role="status">
			<span>We found an autosave from <strong id="ac-autosave-time">recently</strong>.</span>
			<div class="ac-banner-actions">
				<button id="ac-autosave-restore" class="btn btn-sm btn-primary" type="button">Restore</button>
				<button id="ac-autosave-dismiss" class="btn btn-sm btn-default" type="button">Dismiss</button>
			</div>
		</div>

		<div id='interfaces' class='card'>
		<div id="floorplanner" class='front'>
			<div id="floorplanner-controls">
				<a href="#"
					class="btn btn-default btn-sm glyphicon glyphicon-floppy-disk"
					id="new2d" title="New Layout"></a>
				<a href="#"	class="btn btn-default btn-sm glyphicon glyphicon-floppy-save" id="saveFile2d" title="Save Layout"></a>
				<a class="btn btn-sm btn-default btn-file glyphicon glyphicon-floppy-open">
					<input type="file" class="hidden-input" id="loadFile2d">
				</a>
				<button id="move" class="btn btn-sm btn-default" title="Move Walls">
					<span class="glyphicon glyphicon-move"></span>
				</button>
				<button id="draw" class="btn btn-sm btn-default"
					title="Draw New Walls">
					<span class="glyphicon glyphicon-pencil"></span>
				</button>
				<button id="delete" class="btn btn-sm btn-default"
					title="Delete Walls">
					<span class="glyphicon glyphicon-remove"></span>
				</button>
				<button id="help2d" class="btn btn-sm btn-default"
					title="Tips&#10;Shift Key: Snap To Axis and Snap to Grid&#10;ESC: Stop drawing walls&#10;DbL-Click(Corner): Adjust Elevation&#10;Click(Room): Change Name&#10;">
					<span class="glyphicon glyphicon-info-sign"></span>
				</button>
			</div>
			<div id="draw-walls-hint" class="btn-hint">Press the "Esc" key to stop drawing
				walls</div>
			<canvas id="floorplanner-canvas"></canvas>
		</div>

		<div id="viewer" class='back'>
			<div id="main-controls">
				<a href="#" class="btn btn-default btn-sm glyphicon glyphicon-floppy-disk" id="new" title="New Layout"></a>
				<a href="#"	class="btn btn-default btn-sm glyphicon glyphicon-floppy-save" id="saveFile" title="Save Layout"></a>
				<a class="btn btn-sm btn-default btn-file glyphicon glyphicon-floppy-open">
					<input type="file" class="hidden-input" id="loadFile">
				</a>
				<a href="#" class="btn btn-default btn-sm glyphicon glyphicon-asterisk"	id="saveMesh" title="Save Scene as a mesh"></a>
				<a href="#" class="btn btn-default btn-sm glyphicon glyphicon-export"	id="saveGLTF" title="Save Scene as a GLTF"></a>
			</div>
		</div>
	</div>
	<div id='interface-controls'>
		<button id="showFloorPlan" class="btn btn-sm btn-default active"
			title="Edit 2D floorplan">
			<span class="glyphicon glyphicon-move"></span> Floor Plan
		</button>
		<button id="showDesign" class="btn btn-sm btn-default"
			title="Edit 3D floorplan">
			<span class="glyphicon glyphicon-move"></span> 3D
		</button>
		<div class="btn-group-vertical" id='viewcontrols' >
			<div class="btn btn-sm btn-default">
		            <a class="btn btn-default bottom" href="#" id="leftview" title="Show side view (left)">
  <span class="ac-arrow is-left" aria-hidden="true"></span>
</a>

<a class="btn btn-default" href="#" id="topview" title="Show top view">
  <span class="ac-arrow is-top" aria-hidden="true"></span>
</a>

<a class="btn btn-default" href="#" id="frontview" title="Show front view">
  <span class="ac-arrow is-front" aria-hidden="true"></span>
</a>

<a class="btn btn-default bottom" href="#" id="rightview" title="Show side view (right)">
  <span class="ac-arrow is-right" aria-hidden="true"></span>
</a>

	        </div>
	        <button id="showSwitchCameraMode" class="btn btn-sm btn-default" title="Switch Camera ortho/perspective">
				<span class="glyphicon glyphicon-camera"></span>
			</button>
			<button id="showSwitchWireframeMode" class="btn btn-sm btn-default" title="Switch wireframe mode">
				<span class="glyphicon glyphicon-pencil"></span>
			</button>
        </div>
		<button id="showAddItems" class="btn btn-sm btn-default" data-toggle="modal" data-target="#add-items-modal" title="Add/Remove items in 3D">
			<span class="glyphicon glyphicon-plus"></span>
		</button>
<!-- 		<button id="showFirstPerson" class="btn btn-sm btn-default" title="Walk through"> -->
<!-- 			<span class="glyphicon glyphicon-eye-open"></span> -->
<!-- 		</button> -->
	</div>

	<!-- Add Items -->
	<div class="modal fade" id="add-items-modal" role = "dialog">
		<div class="modal-dialog">
		<div class="modal-content">
				<div class="modal-header">
		          <button type="button" class="close" data-dismiss="modal">&times;</button>
		          <h4 class="modal-title">Furniture Inventory</h4>
		          <div class="ac-inventory-tools">
					<input id="inventory-search" type="search" class="form-control" placeholder="Search items…" autocomplete="off" />
					<button id="inventory-clear" type="button" class="btn btn-default btn-sm" title="Clear search">✕</button>
					<button id="inventory-sort" type="button" class="btn btn-default btn-sm" title="Sort A→Z">A→Z</button>
			  	  </div>
		        </div>
		        <div class="modal-body">
				  <div id="inventory-recents" class="ac-recents ac-hidden">
					  <div class="ac-recents-title">Recently used</div>
					  <div id="inventory-recents-wrapper" class="row"></div>
				  </div>
		          <div id="add-items" class="panel-group">

					<div id="floor-items" class="panel panel-default">
						<div id="floor-items-header" class="panel-heading">
							<h4 class="panel-title">
							<a data-toggle="collapse" data-parent="#add-items" href="#floor-items-body">Floor Items</a>
						</h4>
					</div>
						<div id="floor-items-body" class="panel-collapse collapse inventory-content">
							<div class="row panel-body" id="floor-items-wrapper">
								<!-- Items added here by items.js -->
							</div>
						</div>
					</div>


					<div id="roof-items" class="panel panel-default">
						<div id="roof-items-header" class="panel-heading">
							<h4 class="panel-title">
								<a data-toggle="collapse" data-parent="#add-items" href="#roof-items-body">Ceiling Items</a>
							</h4>
						</div>
						<div id="roof-items-body" class="panel-collapse collapse inventory-content">
							<div class="row panel-body" id="roof-items-wrapper">
								<!-- Items added here by items.js -->
							</div>
						</div>
					</div>


					<div id="wall-items" class="panel panel-default">
						<div id="wall-items-header" class="panel-heading"><h4 class="panel-title"><a data-toggle="collapse" data-parent="#add-items" href="#wall-items-body">Wall Items</a></h4></div>
						<div id="wall-items-body" class="panel-collapse collapse inventory-content">
							<div class="row panel-body" id="wall-items-wrapper">
								<!-- Items added here by items.js -->
							</div>
						</div>
					</div>
					<div id="in-wall-items" class="panel panel-default">
						<div id="in-wall-items-header" class="panel-heading"><h4 class="panel-title"><a data-toggle="collapse" data-parent="#add-items" href="#in-wall-items-body">In Wall Items</a></h4></div>
						<div id="in-wall-items-body" class="panel-collapse collapse inventory-content">
							<div class="row panel-body" id="in-wall-items-wrapper">
								<!-- Items added here by items.js -->
							</div>
						</div>
					</div>
					<div id="in-wall-floor-items" class="panel panel-default">
						<div id="in-wall-floor-items-header" class="panel-heading"><h4 class="panel-title"><a data-toggle="collapse" data-parent="#add-items" href="#in-wall-floor-items-body">In Wall Floor Items</a></h4></div>
						<div id="in-wall-floor-items-body" class="panel-collapse collapse inventory-content">
							<div class="row panel-body" id="in-wall-floor-items-wrapper">
								<!-- Items added here by items.js -->
							</div>
						</div>
					</div>
					<div id="on-floor-items" class="panel panel-default">
						<div id="on-floor-items-header" class="panel-heading"><h4 class="panel-title"><a data-toggle="collapse" data-parent="#add-items" href="#on-floor-items-body">On Floor Items</a></h4></div>
						<div id="on-floor-items-body" class="panel-collapse collapse inventory-content">
							<div class="row panel-body" id="on-floor-items-wrapper">
								<!-- Items added here by items.js -->
							</div>
						</div>
					</div>
					<div id="wall-floor-items" class="panel panel-default">
						<div id="wall-floor-items-header" class="panel-heading"><h4 class="panel-title"><a data-toggle="collapse" data-parent="#add-items" href="#wall-floor-items-body">Wall-Floor Items</a></h4></div>
						<div id="wall-floor-items-body" class="panel-collapse collapse inventory-content">
							<div class="row panel-body" id="wall-floor-items-wrapper">
								<!-- Items added here by items.js -->
							</div>
						</div>
					</div>
					<div id="item-items" class="panel panel-default">
						<div id="item-items-header" class="panel-heading">
							<h4 class="panel-title">
								<a data-toggle="collapse" data-parent="#add-items" href="#item-items-body">Anywhere Items</a>
							</h4>
						</div>
						<div id="item-items-body" class="panel-collapse collapse inventory-content">
							<div class="row panel-body" id="item-items-wrapper">
								<!-- Items added here by items.js -->
							</div>
						</div>
					</div>
				</div>
		        </div>
		        <div class="modal-footer">
		          <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
		        </div>
			</div>
		</div>
	</div>

	<div id="ac-help-modal" class="ac-modal ac-hidden" role="dialog" aria-modal="true" aria-labelledby="ac-help-title">
		<div class="ac-modal-card">
			<div class="ac-modal-head">
				<div id="ac-help-title" class="ac-modal-title">Shortcuts & tips</div>
				<button id="ac-help-close" class="btn btn-sm btn-default" type="button" aria-label="Close">Close</button>
			</div>
			<div class="ac-modal-body">
				<div class="ac-help-grid">
					<div class="ac-help-item"><span class="ac-kbd">Esc</span><span>Stop drawing walls</span></div>
					<div class="ac-help-item"><span class="ac-kbd">Shift</span><span>Snap to axis/grid while drawing</span></div>
					<div class="ac-help-item"><span class="ac-kbd">Double‑click</span><span>Corner: adjust elevation</span></div>
					<div class="ac-help-item"><span class="ac-kbd">Click room</span><span>Rename room</span></div>
					<div class="ac-help-item"><span class="ac-kbd">?</span><span>Open this help</span></div>
				</div>
				<div class="ac-help-note">Tip: use <strong>Floor Plan</strong> for layout, then switch to <strong>3D</strong> to place items.</div>
			</div>
		</div>
	</div>

	<div class="ac-footer">3dfloor • by <strong>Yverdon Pierre Boei</strong> • 2026</div>
	</div>
`;

export default function Home() {
  return (
    <>
      <div dangerouslySetInnerHTML={{ __html: BODY_HTML }} />

      {/* Sequentially load the legacy scripts in the same order as the original build/index.html */}
      <Script id="architect3d-legacy-loader" strategy="afterInteractive">{`
        (function () {
          if (window.__architect3d_loaded) return;
          window.__architect3d_loaded = true;

          var scripts = [
            '/js/lib/jquery-2.1.4.min.js',
            '/js/lib/jquery.flip.min.js',
            '/js/lib/dat.gui.min.js',
            '/js/lib/quicksettings.min.js',
            '/js/lib/bootstrap.min.js',
            '/js/bp3djs.js',
            '/js/items.js',
            '/js/items_gltf.js',
            '/js/app.js',
            '/js/modern-ui.js'
          ];

          function loadOne(src) {
            return new Promise(function (resolve, reject) {
              var s = document.createElement('script');
              s.src = src;
              s.async = false;
              s.onload = function () { resolve(); };
              s.onerror = function (e) { reject(new Error('Failed to load ' + src)); };
              document.body.appendChild(s);
            });
          }

          scripts.reduce(function (p, src) {
            return p.then(function () { return loadOne(src); });
          }, Promise.resolve()).catch(function (err) {
            console.error('[Architect3D] Script load error:', err);
          });
        })();
      `}</Script>
    </>
  );
}
