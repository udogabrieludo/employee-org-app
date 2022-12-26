"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const component_1 = require("./component");
const data_1 = require("./data");
const employeeApp = new component_1.EmployeeOrgApp(data_1.CEO);
employeeApp.move(5, 14);
console.log({ employeeApp });
//# sourceMappingURL=index.js.map