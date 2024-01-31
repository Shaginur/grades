// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"src/js/stats.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getAverageGrade = getAverageGrade;
exports.getFirstGrade = getFirstGrade;
exports.getLastGrade = getLastGrade;
exports.getNumberOfGrades = getNumberOfGrades;
/*
 * @param {array} grades
 */
function getNumberOfGrades(grades) {
  return grades.length;
}

/*
 * @param {array} grades
 */
function getFirstGrade(grades) {
  return grades[0];
}

/*
 * @param {array} grades
 */
function getLastGrade(grades) {
  return grades.at(-1);
}
function getAverageGrade(grades) {
  var sum = 0;
  grades.forEach(function (grade) {
    sum += grade;
  });
  var average = sum / (grades === null || grades === void 0 ? void 0 : grades.length) || 0;
  return average;
}
},{}],"src/js/index.js":[function(require,module,exports) {
"use strict";

var _stats = require("./stats.js");
// элемент формы
var gradesForm = document.querySelector("#grades-form");

// элемент ввода
var yourGrade = document.querySelector("#your-grade");

// содержимое таблицы
var tbody = document.querySelector("#stats-table tbody");

// история оценок
var gradesList = document.querySelector(".grades-list");

// массив оценок
var grades = [1, 2, 3, 4, 5];

/**
 *
 * @param {array} grades - массив оценок
 */
function render(grades) {
  var _getNumberOfGrades, _getFirstGrade, _getLastGrade;
  tbody.innerHTML = "<tr>\n  <td>".concat((_getNumberOfGrades = (0, _stats.getNumberOfGrades)(grades)) !== null && _getNumberOfGrades !== void 0 ? _getNumberOfGrades : "0", "</td>\n  <td>").concat((_getFirstGrade = (0, _stats.getFirstGrade)(grades)) !== null && _getFirstGrade !== void 0 ? _getFirstGrade : "0", "</td>\n  <td>").concat((_getLastGrade = (0, _stats.getLastGrade)(grades)) !== null && _getLastGrade !== void 0 ? _getLastGrade : "0", "</td>\n  <td>").concat((0, _stats.getAverageGrade)(grades), "</td>\n  </tr>");
  showAndUpdateGradesHistory(grades); // показ истории оценок
}
gradesForm.addEventListener("submit", function (event) {
  event.preventDefault();
  var newGrade = Number.parseInt(yourGrade.value, 10);
  grades.push(newGrade);
  showNotification("Новая оценка добавлена!");
  yourGrade.value = "";
  render(grades);
});

/**
 *
 * @param {string} message - текстовое сообщение
 */
function showNotification(message) {
  var element = document.createElement("div");
  element.classList.add("notification", "is-show");
  element.innerHTML = message;
  element.style.backgroundColor = "#2b8379";
  element.style.color = "#fff";
  element.style.padding = "4px";
  document.body.appendChild(element);
  // document.body.insertAdjacentHTML("beforeend", element);

  setTimeout(function () {
    element.classList.remove("is-show");
  }, 3000);
}
/**
 *
 * @param {string} message - текстовое сообщение
 */
function showNotificationErrore(message) {
  var element = document.createElement("div");
  element.classList.add("notification", "is-show");
  element.innerHTML = message;
  element.style.backgroundColor = "#970e3d";
  element.style.color = "#fff";
  element.style.padding = "4px";
  document.body.appendChild(element);
  // document.body.insertAdjacentHTML("beforeend", element);

  setTimeout(function () {
    element.classList.remove("is-show");
  }, 3000);
}
function showAndUpdateGradesHistory(grades) {
  gradesList.innerHTML = "";
  grades.forEach(function (grade, index) {
    // gradesList.innerHTML += `
    //   <li class="grade" data-grade="${index}">
    //   ${grade}
    //   <button onclick="onEditHandler()" class="btn-edit">Edit</button>
    //   <button onclick="onDeleteHandler()" class="btn-edit">Cancel</button>
    // </li>
    // `;

    var listItemHTML = "\n      <li class=\"grade\" data-grade=\"".concat(index, "\">\n        ").concat(grade, "\n        <button data-action=edit class=\"btn-edit\">Edit</button>\n        <button data-action=delete class=\"btn-edit\">Delete</button>\n      </li>\n    ");
    gradesList.insertAdjacentHTML("beforeend", listItemHTML); // вставка в конец родителя

    var listItem = gradesList.querySelector("[data-grade=\"".concat(index, "\"]")); // получение тега li
    var editButton = listItem.querySelector("[data-action=edit]"); // получение кнопки редактирования
    var deleteButton = listItem.querySelector("[data-action=delete]"); // получение кнопки удаления

    //добавил css свойства для украшения
    deleteButton.style.backgroundColor = "#970e3d";
    deleteButton.style.color = "#fff";
    deleteButton.style.border = "none";
    editButton.style.backgroundColor = "#2b8379";
    editButton.style.color = "#fff";
    editButton.style.border = "none";
    editButton.addEventListener("click", function () {
      onEditHandler(index);
    });
    deleteButton.addEventListener("click", function () {
      onDeleteHandler(index);
    });
  });
}

/**
 * Функция редактирования оценки
 * @param {string} key - data атрибут элемента
 */
function onEditHandler(key) {
  console.log("Edit grade at index:", key);
  var element = document.querySelector('.notification');
  var newGrade = prompt("\u0420\u0435\u0434\u0430\u043A\u0442\u0438\u0440\u0443\u0435\u043C\u0430\u044F \u043E\u0446\u0435\u043D\u043A\u0430: ".concat(grades[key]));
  //добавил запрет на устоновку отрицательного значения
  if (newGrade < 0) {
    return showNotificationErrore("нельзя установить отрицательную оценку!");
  }
  if (newGrade !== null && newGrade !== "") {
    grades[key] = +newGrade;
    console.log(grades);
    render(grades);
    showNotification("Оценка изменена!");
  }
}
/**
 * Функция редактирования оценки
 * @param {string} key - data атрибут элемента
 */

/**
 * Функция удаления оценки
 * @param {string} key - data атрибут элемента
 */
function onDeleteHandler(key) {
  var confirmationMessage = "Вы действительно хотите удалить оценку?";
  var isConfirmed = confirm(confirmationMessage);
  if (isConfirmed) {
    grades.splice(key, 1);
    showNotification("Оценка удалена!");
    render(grades); // показ измененных оценок
  }
}
render(grades); // первичная отрисовка
},{"./stats.js":"src/js/stats.js"}],"node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;
function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}
module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "50625" + '/');
  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);
    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);
          if (didAccept) {
            handled = true;
          }
        }
      });

      // Enable HMR for CSS by default.
      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });
      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }
    if (data.type === 'reload') {
      ws.close();
      ws.onclose = function () {
        location.reload();
      };
    }
    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }
    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}
function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);
  if (overlay) {
    overlay.remove();
  }
}
function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID;

  // html encode message and stack trace
  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}
function getParents(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return [];
  }
  var parents = [];
  var k, d, dep;
  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];
      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }
  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }
  return parents;
}
function hmrApply(bundle, asset) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }
  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}
function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }
  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }
  if (checkedAssets[id]) {
    return;
  }
  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);
  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }
  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}
function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};
  if (cached) {
    cached.hot.data = bundle.hotData;
  }
  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }
  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];
  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });
    return true;
  }
}
},{}]},{},["node_modules/parcel-bundler/src/builtins/hmr-runtime.js","src/js/index.js"], null)
//# sourceMappingURL=/js.d818e0ef.js.map