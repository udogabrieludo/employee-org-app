"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findEmployee = exports.findSupervisor = exports.cloneEmployee = void 0;
function cloneEmployee(employee) {
    return {
        uniqueId: employee.uniqueId,
        name: employee.name,
        subordinates: employee.subordinates.map(subordinate => cloneEmployee(subordinate))
    };
}
exports.cloneEmployee = cloneEmployee;
function findSupervisor(employeeID, employee) {
    if (employee.subordinates.some(subordinate => subordinate.uniqueId === employeeID)) {
        return employee;
    }
    for (const subordinate of employee.subordinates) {
        const found = findSupervisor(employeeID, subordinate);
        if (found) {
            return found;
        }
    }
    return undefined;
}
exports.findSupervisor = findSupervisor;
function findEmployee(employeeID, employee) {
    if (employee.uniqueId === employeeID) {
        return employee;
    }
    for (const subordinate of employee.subordinates) {
        const found = findEmployee(employeeID, subordinate);
        if (found) {
            return found;
        }
    }
    return undefined;
}
exports.findEmployee = findEmployee;
//# sourceMappingURL=index.js.map