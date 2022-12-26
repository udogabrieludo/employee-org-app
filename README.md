Employee Organization App
-  This is an application for managing the relationships between employees in an organization. 
-  It allows you to move employees between supervisors and provides undo and redo functionality to revert and reapply changes.

#Features
-  Move employees between supervisors
-  Undo and redo changes to the organization hierarchy
-  View the current state of the organization hierarchy

#Dependencies
-  TypeScript


#Setup
-  Clone the repository: git clone https://github.com/udogabrieludo/employee-org-app.git
  
Run Project:
-  tsc && node dist/index.js

#Usage
 -  Import  EmployeeOrgApp class
 
import { EmployeeOrgApp } from './components';
 -  Create an instance of the EmployeeOrgApp class and pass in the CEO object as the initial state of the organization hierarchy:
 
const employeeApp= new EmployeeOrgApp(ceo);

-  Use the move method to move an employee from one supervisor to another:

employeeApp.move(employeeID, supervisorID);

-  Use the undo and redo methods to revert and reapply changes to the organization hierarchy:

 employeeApp.undo();
 
 
 employeeApp.redo();
