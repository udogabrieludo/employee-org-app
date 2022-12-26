import { EmployeeOrgApp } from "./component";
import { CEO } from "./data";


const employeeApp = new EmployeeOrgApp(CEO);

employeeApp.move(5,14);
console.log({employeeApp})

// employeeApp.undo()
// employeeApp.redo()