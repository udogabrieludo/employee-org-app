import { EmployeeOrgApp } from "./component";
import { CEO } from "./data";


const employeeApp = new EmployeeOrgApp(CEO);

console.log(employeeApp.move(5,14))
//console.log(employeeApp.undo())
//console.log(employeeApp.redo())