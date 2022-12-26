"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class EmployeeOrgApp {
    constructor(ceo) {
        this.history = [];
        this.currentIndex = -1;
        this.ceo = ceo;
    }
    move(employeeID, supervisorID) {
        const employee = this.findEmployee(employeeID, this.ceo);
        const supervisor = this.findEmployee(supervisorID, this.ceo);
        if (!employee || !supervisor) {
            throw new Error('Employee or supervisor not found');
        }
        const currentSupervisor = this.findSupervisor(employeeID, this.ceo);
        const currentSupervisorSubordinates = currentSupervisor === null || currentSupervisor === void 0 ? void 0 : currentSupervisor.subordinates;
        currentSupervisorSubordinates === null || currentSupervisorSubordinates === void 0 ? void 0 : currentSupervisorSubordinates.splice(currentSupervisorSubordinates.indexOf(employee), 1);
        supervisor.subordinates.push(employee);
        this.history.splice(this.currentIndex + 1);
        this.history.push(this.cloneEmployee(this.ceo));
        this.currentIndex++;
    }
    undo() {
        var _a;
        if (this.currentIndex < 0) {
            throw new Error('No actions to undo');
        }
        this.ceo = this.cloneEmployee((_a = this.history) === null || _a === void 0 ? void 0 : _a[this.currentIndex--]);
    }
    redo() {
        if (this.currentIndex >= this.history.length - 1) {
            throw new Error('No actions to redo');
        }
        this.ceo = this.cloneEmployee(this.history[++this.currentIndex]);
    }
    findEmployee(employeeID, employee) {
        if (employee.uniqueId === employeeID) {
            return employee;
        }
        for (const subordinate of employee.subordinates) {
            const found = this.findEmployee(employeeID, subordinate);
            if (found) {
                return found;
            }
        }
        return undefined;
    }
    findSupervisor(employeeID, employee) {
        if (employee.subordinates.some(subordinate => subordinate.uniqueId === employeeID)) {
            return employee;
        }
        for (const subordinate of employee.subordinates) {
            const found = this.findSupervisor(employeeID, subordinate);
            if (found) {
                return found;
            }
        }
        return undefined;
    }
    cloneEmployee(employee) {
        return {
            uniqueId: employee.uniqueId,
            name: employee.name,
            subordinates: employee.subordinates.map(subordinate => this.cloneEmployee(subordinate))
        };
    }
}
exports.default = EmployeeOrgApp;
//# sourceMappingURL=index.js.map