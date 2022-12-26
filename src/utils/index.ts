import { Employee } from "../interface";

export function cloneEmployee(employee: Employee): Employee {
    return {
      uniqueId: employee.uniqueId,
      name: employee.name,
      subordinates: employee.subordinates.map(subordinate => cloneEmployee(subordinate))
    };
  }

  export function findSupervisor(employeeID: number, employee: Employee): Employee | undefined {
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

  export function findEmployee(employeeID: number, employee: Employee): Employee | undefined {
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