import { CEO } from "./data";
import { Employee, IEmployeeOrgApp } from "./interface";

class EmployeeOrgApp implements IEmployeeOrgApp {
    ceo: Employee;
    history: Employee[] = [];
    currentIndex = -1;
  
    constructor(ceo: Employee) {
      this.ceo = ceo;
    }
  
    move(employeeID: number, supervisorID: number): void {
      // find the employee and supervisor in the organization hierarchy
      const employee = this.findEmployee(employeeID, this.ceo);
      const supervisor = this.findEmployee(supervisorID, this.ceo);
  
      if (!employee || !supervisor) {
        throw new Error('Employee or supervisor not found');
      }
  
     //this remove the employee from their current supervisor's subordinates  
      const currentSupervisor = this.findSupervisor(employeeID, this.ceo);
      const currentSupervisorSubordinates = currentSupervisor?.subordinates;
      currentSupervisorSubordinates?.splice(currentSupervisorSubordinates.indexOf(employee), 1);

     
    // this add the employee to the new supervisor's subordinates
       supervisor.subordinates.push(employee);


      // add the current state of the organization to the history
      this.history.splice(this.currentIndex + 1);
      this.history.push(this.cloneEmployee(this.ceo));
      this.currentIndex++;
    }
  
    undo(): void {
      if (this.currentIndex < 0) {
        throw new Error('No actions to undo');
      }
      this.ceo = this.cloneEmployee(this.history?.[this.currentIndex--]);
    }


  
    redo(): void {
      if (this.currentIndex >= this.history.length - 1) {
        throw new Error('No actions to redo');
      }
      this.ceo = this.cloneEmployee(this.history[++this.currentIndex]);
    }
  


    private findEmployee(employeeID: number, employee: Employee): Employee | undefined {
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
  

    private findSupervisor(employeeID: number, employee: Employee): Employee | undefined {
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
  

    private cloneEmployee(employee: Employee): Employee {
      return {
        uniqueId: employee.uniqueId,
        name: employee.name,
        subordinates: employee.subordinates.map(subordinate => this.cloneEmployee(subordinate))
      };
    }
  }

  const employeeApp = new EmployeeOrgApp(CEO);

  // console.log(employeeApp.move(5,14))
//console.log(employeeApp.undo())
//console.log(employeeApp.redo())