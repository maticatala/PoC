var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
// Seleccionamos los elementos del DOM usando TypeScript
var d = document;
var $form = d.querySelector(".form-control");
var $tasks = d.querySelector(".list-group");
var $removes = d.querySelectorAll('a');
// Función para obtener tareas desde el servidor
var getTasks = function () { return __awaiter(_this, void 0, void 0, function () {
    var res, json, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                return [4 /*yield*/, fetch("http://localhost:3000/tasks")];
            case 1:
                res = _a.sent();
                return [4 /*yield*/, res.json()];
            case 2:
                json = _a.sent();
                if (!res.ok) {
                    throw { status: res.status, statusText: res.statusText };
                }
                json.forEach(function (el) {
                    var $li = d.createElement("li");
                    $li.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center', 'border-start-0', 'border-top-0', 'border-end-0', 'border-bottom', 'rounded-0', 'mb-2');
                    $li.innerHTML = "\n        <div class=\"d-flex align-items-center\">\n          <input class=\"form-check-input me-2\" type=\"checkbox\" value=\"\" aria-label=\"...\" />\n          ".concat(el.title, "\n        </div>\n        <a href=\"#!\" data-mdb-toggle=\"tooltip\" title=\"Remove item\">\n          <i class=\"fas fa-times text-primary\" data-icon-type=\"remove\"></i>\n        </a>\n      ");
                    if ($tasks) {
                        $tasks.appendChild($li);
                    }
                });
                return [3 /*break*/, 4];
            case 3:
                error_1 = _a.sent();
                console.log(error_1);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
// Función para agregar una tarea al servidor
var addTask = function (title) { return __awaiter(_this, void 0, void 0, function () {
    var data, res, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                data = { title: title };
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, fetch("http://localhost:3000/tasks", {
                        method: 'POST',
                        body: JSON.stringify(data),
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    })];
            case 2:
                res = _a.sent();
                if (!res.ok) {
                    throw { status: res.status, statusText: res.statusText };
                }
                location.reload();
                return [3 /*break*/, 4];
            case 3:
                error_2 = _a.sent();
                console.log(error_2);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
// Función para eliminar una tarea en el servidor
var deleteTask = function (id) { return __awaiter(_this, void 0, void 0, function () {
    var res, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, fetch("http://localhost:3000/tasks?id=".concat(id), {
                        method: 'DELETE',
                    })];
            case 1:
                res = _a.sent();
                if (!res.ok) {
                    throw { status: res.status, statusText: res.statusText };
                }
                location.reload();
                return [3 /*break*/, 3];
            case 2:
                error_3 = _a.sent();
                console.log(error_3);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
d.addEventListener("DOMContentLoaded", getTasks);
d.addEventListener("change", function (e) {
    if ($form && e.target === $form) {
        addTask($form.value);
    }
});
d.addEventListener("click", function (e) {
    var target = e.target;
    if (target.getAttribute('data-icon-type')) {
        // Encuentra el elemento li padre del enlace clicado
        var $li = target.closest('li');
        if ($li) {
            // Encuentra la lista ul padre del elemento li
            var $ul = $li.closest('ul');
            if ($ul) {
                // Obtiene la posición del elemento li dentro de la lista ul
                var position = Array.from($ul.children).indexOf($li);
                console.log("La posición del elemento en la lista es: " + position);
                deleteTask(position + 1);
            }
        }
    }
});
