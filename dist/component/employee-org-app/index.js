"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../../utils");
class EmployeeOrgApp {
    constructor(ceo) {
        this.history = [];
        this.currentIndex = -1;
        this.ceo = ceo;
    }
    move(employeeID, supervisorID) {
        const employee = (0, utils_1.findEmployee)(employeeID, this.ceo);
        const supervisor = (0, utils_1.findEmployee)(supervisorID, this.ceo);
        if (!employee || !supervisor) {
            throw new Error('Employee or supervisor not found');
        }
        const currentSupervisor = (0, utils_1.findSupervisor)(employeeID, this.ceo);
        const currentSupervisorSubordinates = currentSupervisor === null || currentSupervisor === void 0 ? void 0 : currentSupervisor.subordinates;
        currentSupervisorSubordinates === null || currentSupervisorSubordinates === void 0 ? void 0 : currentSupervisorSubordinates.splice(currentSupervisorSubordinates.indexOf(employee), 1);
        supervisor.subordinates.push(employee);
        this.history.splice(this.currentIndex + 1);
        this.history.push((0, utils_1.cloneEmployee)(this.ceo));
        this.currentIndex++;
    }
    undo() {
        var _a;
        if (this.currentIndex < 0) {
            throw new Error('No actions to undo');
        }
        this.ceo = (0, utils_1.cloneEmployee)((_a = this.history) === null || _a === void 0 ? void 0 : _a[this.currentIndex--]);
    }
    redo() {
        if (this.currentIndex >= this.history.length - 1) {
            throw new Error('No actions to redo');
        }
        this.ceo = (0, utils_1.cloneEmployee)(this.history[++this.currentIndex]);
    }
}
exports.default = EmployeeOrgApp;
//# sourceMappingURL=index.js.map