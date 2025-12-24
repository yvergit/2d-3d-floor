'use client';

import React from 'react';

export function AddItemsModal() {
  return (
    <div className="modal fade" id="add-items-modal" role="dialog" aria-hidden="true">
      <div className="modal-dialog">
        <div className="modal-content ac-modal">
          <div className="modal-header ac-modal-header">
            <button type="button" className="close ac-modal-close" data-dismiss="modal" aria-label="Close">
              ×
            </button>
            <h4 className="modal-title">Furniture Inventory</h4>
          </div>
          <div className="modal-body ac-modal-body">
            <div id="add-items" className="panel-group">
              {/* Panels are populated by legacy items.js. Keep wrappers + IDs intact. */}
              <div id="floor-items" className="panel panel-default">
                <div id="floor-items-header" className="panel-heading">
                  <h4 className="panel-title">
                    <a data-toggle="collapse" data-parent="#add-items" href="#floor-items-body">Floor Items</a>
                  </h4>
                </div>
                <div id="floor-items-body" className="panel-collapse collapse inventory-content">
                  <div className="row panel-body" id="floor-items-wrapper" />
                </div>
              </div>

              <div id="roof-items" className="panel panel-default">
                <div id="roof-items-header" className="panel-heading">
                  <h4 className="panel-title">
                    <a data-toggle="collapse" data-parent="#add-items" href="#roof-items-body">Ceiling Items</a>
                  </h4>
                </div>
                <div id="roof-items-body" className="panel-collapse collapse inventory-content">
                  <div className="row panel-body" id="roof-items-wrapper" />
                </div>
              </div>

              <div id="wall-items" className="panel panel-default">
                <div id="wall-items-header" className="panel-heading">
                  <h4 className="panel-title">
                    <a data-toggle="collapse" data-parent="#add-items" href="#wall-items-body">Wall Items</a>
                  </h4>
                </div>
                <div id="wall-items-body" className="panel-collapse collapse inventory-content">
                  <div className="row panel-body" id="wall-items-wrapper" />
                </div>
              </div>

              <div id="in-wall-items" className="panel panel-default">
                <div id="in-wall-items-header" className="panel-heading">
                  <h4 className="panel-title">
                    <a data-toggle="collapse" data-parent="#add-items" href="#in-wall-items-body">In Wall Items</a>
                  </h4>
                </div>
                <div id="in-wall-items-body" className="panel-collapse collapse inventory-content">
                  <div className="row panel-body" id="in-wall-items-wrapper" />
                </div>
              </div>

              <div id="in-wall-floor-items" className="panel panel-default">
                <div id="in-wall-floor-items-header" className="panel-heading">
                  <h4 className="panel-title">
                    <a data-toggle="collapse" data-parent="#add-items" href="#in-wall-floor-items-body">In Wall Floor Items</a>
                  </h4>
                </div>
                <div id="in-wall-floor-items-body" className="panel-collapse collapse inventory-content">
                  <div className="row panel-body" id="in-wall-floor-items-wrapper" />
                </div>
              </div>

              <div id="on-floor-items" className="panel panel-default">
                <div id="on-floor-items-header" className="panel-heading">
                  <h4 className="panel-title">
                    <a data-toggle="collapse" data-parent="#add-items" href="#on-floor-items-body">On Floor Items</a>
                  </h4>
                </div>
                <div id="on-floor-items-body" className="panel-collapse collapse inventory-content">
                  <div className="row panel-body" id="on-floor-items-wrapper" />
                </div>
              </div>

              <div id="wall-floor-items" className="panel panel-default">
                <div id="wall-floor-items-header" className="panel-heading">
                  <h4 className="panel-title">
                    <a data-toggle="collapse" data-parent="#add-items" href="#wall-floor-items-body">Wall-Floor Items</a>
                  </h4>
                </div>
                <div id="wall-floor-items-body" className="panel-collapse collapse inventory-content">
                  <div className="row panel-body" id="wall-floor-items-wrapper" />
                </div>
              </div>

              <div id="item-items" className="panel panel-default">
                <div id="item-items-header" className="panel-heading">
                  <h4 className="panel-title">
                    <a data-toggle="collapse" data-parent="#add-items" href="#item-items-body">Anywhere Items</a>
                  </h4>
                </div>
                <div id="item-items-body" className="panel-collapse collapse inventory-content">
                  <div className="row panel-body" id="item-items-wrapper" />
                </div>
              </div>
            </div>
          </div>
          <div className="modal-footer ac-modal-footer">
            <button type="button" className="btn btn-default ac-btn" data-dismiss="modal">Close</button>
          </div>
        </div>
      </div>
    </div>
  );
}
