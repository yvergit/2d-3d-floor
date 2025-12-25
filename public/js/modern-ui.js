/*
  Modern UI/UX layer for the legacy Blueprint3D UI.
  - Keeps all original IDs and behaviors intact
  - Adds: toasts, autosave, restore prompt, inventory search/sort, recents, dusk mode, help modal
*/

(function () {
  function whenReady(fn) {
    if (document.readyState === "complete" || document.readyState === "interactive") {
      setTimeout(fn, 0);
    } else {
      document.addEventListener("DOMContentLoaded", fn);
    }
  }

  function safeJSONParse(s) {
    try {
      return JSON.parse(s);
    } catch (_) {
      return null;
    }
  }

  whenReady(function () {
    // Wait for jQuery & blueprint3d globals (loaded by legacy loader)
    var tries = 0;
    var timer = setInterval(function () {
      tries += 1;
      if (window.jQuery && window.blueprint3d && window.BP3DJS) {
        clearInterval(timer);
        boot(window.jQuery, window.blueprint3d);
      }
      if (tries > 200) {
        clearInterval(timer);
      }
    }, 50);
  });

  function boot($, blueprint3d) {
    var AUTOSAVE_KEY = "architect3d.autosave.v1";
    var RECENTS_KEY = "architect3d.recents.v1";
    var THEME_KEY = "architect3d.theme";

    var toastRoot = document.getElementById("ac-toast-root");

    function toast(msg) {
      if (!toastRoot) return;
      var el = document.createElement("div");
      el.className = "ac-toast";
      el.textContent = msg;
      toastRoot.appendChild(el);
      setTimeout(function () {
        el.style.opacity = "0";
        el.style.transform = "translateY(-4px)";
      }, 2200);
      setTimeout(function () {
        if (el && el.parentNode) el.parentNode.removeChild(el);
      }, 3000);
    }

    // Dusk mode
    (function initTheme() {
      var saved = localStorage.getItem(THEME_KEY);
      if (saved === "dusk") document.body.classList.add("ac-dusk");
      var btn = document.getElementById("ac-theme");
      if (!btn) return;
      btn.addEventListener("click", function () {
        document.body.classList.toggle("ac-dusk");
        localStorage.setItem(THEME_KEY, document.body.classList.contains("ac-dusk") ? "dusk" : "light");
        toast(document.body.classList.contains("ac-dusk") ? "Dusk mode on" : "Dusk mode off");
      });
    })();

    // Help modal
    (function initHelp() {
      var modal = document.getElementById("ac-help-modal");
      var openBtn = document.getElementById("ac-help");
      var closeBtn = document.getElementById("ac-help-close");
      if (!modal || !openBtn || !closeBtn) return;

      function open() {
        modal.classList.remove("ac-hidden");
      }
      function close() {
        modal.classList.add("ac-hidden");
      }

      openBtn.addEventListener("click", open);
      closeBtn.addEventListener("click", close);
      modal.addEventListener("click", function (e) {
        if (e.target === modal) close();
      });

      document.addEventListener("keydown", function (e) {
        if (e.key === "?" && !e.metaKey && !e.ctrlKey && !e.altKey) {
          open();
        }
        if (e.key === "Escape") {
          close();
        }
      });
    })();

    // Autosave
    var dirty = false;
    var lastAutosaveAt = 0;
    var autosaveTimer = null;

    function setDirty() {
      dirty = true;
      scheduleAutosave();
    }

    function scheduleAutosave() {
      if (autosaveTimer) clearTimeout(autosaveTimer);
      autosaveTimer = setTimeout(function () {
        try {
          var data = blueprint3d.model.exportSerialized();
          var payload = {
            at: Date.now(),
            data: data,
          };
          localStorage.setItem(AUTOSAVE_KEY, JSON.stringify(payload));
          lastAutosaveAt = payload.at;
          toast("Auto-saved");
        } catch (e) {
          // ignore
        }
      }, 900);
    }

    function clearDirty() {
      dirty = false;
    }

    // Mark dirty on common floorplan edits (2D)
    try {
      var fp = blueprint3d.model.floorplan;
      var events = [
        BP3DJS.EVENT_CORNER_ATTRIBUTES_CHANGED,
        BP3DJS.EVENT_WALL_ATTRIBUTES_CHANGED,
        BP3DJS.EVENT_ROOM_ATTRIBUTES_CHANGED,
      ];
      events.forEach(function (evt) {
        fp.addEventListener(evt, setDirty);
      });
    } catch (_) {
      // ignore
    }

    // And on 3D item operations
    try {
      blueprint3d.three.addEventListener(BP3DJS.EVENT_ITEM_SELECTED, setDirty);
    } catch (_) {
      // ignore
    }

    window.addEventListener("beforeunload", function (e) {
      if (!dirty) return;
      e.preventDefault();
      e.returnValue = "";
    });

    // Restore banner
    (function initRestoreBanner() {
      var banner = document.getElementById("ac-autosave-banner");
      var timeEl = document.getElementById("ac-autosave-time");
      var restoreBtn = document.getElementById("ac-autosave-restore");
      var dismissBtn = document.getElementById("ac-autosave-dismiss");
      if (!banner || !restoreBtn || !dismissBtn) return;

      var saved = safeJSONParse(localStorage.getItem(AUTOSAVE_KEY) || "");
      if (!saved || !saved.data) return;

      var ageMs = Date.now() - (saved.at || Date.now());
      var mins = Math.max(1, Math.round(ageMs / 60000));
      if (timeEl) timeEl.textContent = mins + " min ago";
      banner.classList.remove("ac-hidden");

      restoreBtn.addEventListener("click", function () {
        try {
          blueprint3d.model.loadSerialized(saved.data);
          toast("Restored autosave");
          clearDirty();
          banner.classList.add("ac-hidden");
        } catch (e) {
          toast("Couldn't restore autosave");
        }
      });

      dismissBtn.addEventListener("click", function () {
        banner.classList.add("ac-hidden");
      });
    })();

    // Toasts for common actions
    $("#saveFile, #saveFile2d").on("click", function () {
      toast("Saving… download will start");
      clearDirty();
    });
    $("#loadFile, #loadFile2d").on("change", function () {
      toast("Loading layout…");
      clearDirty();
    });
    $("#new, #new2d").on("click", function () {
      toast("New layout");
      clearDirty();
    });
    $("#saveGLTF").on("click", function () {
      toast("Exporting GLTF…");
    });
    $("#saveMesh").on("click", function () {
      toast("Exporting OBJ…");
    });

    // Inventory search + sort + recents
    (function initInventoryTools() {
      var search = document.getElementById("inventory-search");
      var clearBtn = document.getElementById("inventory-clear");
      var sortBtn = document.getElementById("inventory-sort");
      var recentsBox = document.getElementById("inventory-recents");
      var recentsWrapper = document.getElementById("inventory-recents-wrapper");
      if (!search) return;

      function allItems() {
        return Array.prototype.slice.call(document.querySelectorAll("#add-items .add-item"));
      }

      function applyFilter() {
        var q = (search.value || "").trim().toLowerCase();
        allItems().forEach(function (a) {
          var name = (a.getAttribute("model-name") || a.textContent || "").toLowerCase();
          a.parentElement.style.display = !q || name.indexOf(q) !== -1 ? "" : "none";
        });
      }

      function sortAZ() {
        // Sort within each wrapper independently
        var wrappers = document.querySelectorAll(
          "#floor-items-wrapper, #roof-items-wrapper, #wall-items-wrapper, #in-wall-items-wrapper, #in-wall-floor-items-wrapper, #on-floor-items-wrapper, #wall-floor-items-wrapper, #item-items-wrapper"
        );
        wrappers.forEach(function (w) {
          var cards = Array.prototype.slice.call(w.children);
          cards.sort(function (c1, c2) {
            var a = (c1.querySelector(".add-item")?.getAttribute("model-name") || "").toLowerCase();
            var b = (c2.querySelector(".add-item")?.getAttribute("model-name") || "").toLowerCase();
            return a.localeCompare(b);
          });
          cards.forEach(function (c) { w.appendChild(c); });
        });
        toast("Sorted A→Z");
      }

      search.addEventListener("input", applyFilter);
      if (clearBtn) {
        clearBtn.addEventListener("click", function () {
          search.value = "";
          applyFilter();
          search.focus();
        });
      }
      if (sortBtn) sortBtn.addEventListener("click", sortAZ);

      function loadRecents() {
        var arr = safeJSONParse(localStorage.getItem(RECENTS_KEY) || "[]") || [];
        return Array.isArray(arr) ? arr : [];
      }
      function saveRecents(arr) {
        localStorage.setItem(RECENTS_KEY, JSON.stringify(arr.slice(0, 8)));
      }
      function renderRecents() {
        if (!recentsBox || !recentsWrapper) return;
        recentsWrapper.innerHTML = "";
        var recents = loadRecents();
        if (!recents.length) {
          recentsBox.classList.add("ac-hidden");
          return;
        }
        recentsBox.classList.remove("ac-hidden");
        recents.forEach(function (it) {
          var col = document.createElement("div");
          col.className = "col-sm-4";
          col.innerHTML =
            '<a class="thumbnail add-item" model-name="' +
            escapeHtml(it.name) +
            '" model-url="' +
            escapeHtml(it.modelUrl) +
            '" model-type="' +
            escapeHtml(String(it.itemType)) +
            (it.format ? '" model-format="' + escapeHtml(it.format) : "") +
            '"><img src="' +
            escapeHtml(it.image || "models/thumbnails/thumbnail_duck.png") +
            '" alt="Add Item" data-dismiss="modal"> ' +
            escapeHtml(it.name) +
            "</a>";
          recentsWrapper.appendChild(col);
        });
      }

      function escapeHtml(str) {
        return String(str)
          .replace(/&/g, "&amp;")
          .replace(/</g, "&lt;")
          .replace(/>/g, "&gt;")
          .replace(/\"/g, "&quot;")
          .replace(/'/g, "&#039;");
      }

      // Record recents whenever an item is used
      $(document).on("mousedown", "#add-items .add-item", function () {
        try {
          var $a = $(this);
          var next = {
            name: $a.attr("model-name") || "Item",
            modelUrl: $a.attr("model-url") || "",
            itemType: parseInt($a.attr("model-type") || "1", 10),
            format: $a.attr("model-format") || "",
            image: $a.find("img").attr("src") || "",
          };
          var arr = loadRecents();
          arr = arr.filter(function (x) {
            return !(x && x.modelUrl === next.modelUrl && x.itemType === next.itemType);
          });
          arr.unshift(next);
          saveRecents(arr);
          renderRecents();
          toast("Placed: " + next.name);
          setDirty();
        } catch (_) {
          // ignore
        }
      });

      // Render recents when modal opens
      $("#add-items-modal").on("shown.bs.modal", function () {
        renderRecents();
        search.focus();
      });
    })();

    // Small polish: show hint bubble a little sooner in draw mode
    $("#draw").on("click", function () {
      $("#draw-walls-hint").stop(true, true).fadeIn(160);
    });
    $("#move, #delete").on("click", function () {
      $("#draw-walls-hint").stop(true, true).fadeOut(160);
    });
  }
})();
