import { Employee, IEmployeeOrgApp } from "../../interface";
import {cloneEmployee,findEmployee, findSupervisor} from '../../utils'

class EmployeeOrgApp implements IEmployeeOrgApp {
    ceo: Employee;
    history: Employee[] = [];
    currentIndex = -1;
  
    constructor(ceo: Employee) {
      this.ceo = ceo;
    }
  
    move(employeeID: number, supervisorID: number): void {
      // find the employee and supervisor in the organization hierarchy
      const employee =  findEmployee(employeeID, this.ceo);
      const supervisor = findEmployee(supervisorID, this.ceo);
  
      if (!employee || !supervisor) {
        throw new Error('Employee or supervisor not found');
      }
  
     //this remove the employee from their current supervisor's subordinates  
      const currentSupervisor = findSupervisor(employeeID, this.ceo);
      const currentSupervisorSubordinates = currentSupervisor?.subordinates;
      currentSupervisorSubordinates?.splice(currentSupervisorSubordinates.indexOf(employee), 1);

     
    // this add the employee to the new supervisor's subordinates
       supervisor.subordinates.push(employee);


      // add the current state of the organization to the history
      this.history.splice(this.currentIndex + 1);
      this.history.push(cloneEmployee(this.ceo));
      this.currentIndex++;
    }
  
    undo(): void {
      if (this.currentIndex < 0) {
        throw new Error('No actions to undo');
      }
      this.ceo = cloneEmployee(this.history?.[this.currentIndex--]);
    }


  
    redo(): void {
      if (this.currentIndex >= this.history.length - 1) {
        throw new Error('No actions to redo');
      }
      this.ceo = cloneEmployee(this.history[++this.currentIndex]);
    }
  


   
  }

  export default EmployeeOrgApp