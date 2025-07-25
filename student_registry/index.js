"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//Importing Required Modules.
var serializer_1 = require("./services/serializer");
var student_manager_1 = require("./services/student_manager");
var menu_1 = require("./utils/menu");
//Creating serializer Instance to save and load data from disk.
var serializer = new serializer_1.Serializer();
//Creatig a single instance of userManager.
var Instance = student_manager_1.UserManager.getInstance();
//Loading saved student records from disk.
var savedStudentRecorde = serializer.loadDataFromDisk();
//stes the student data to access easily.
Instance.setUsers(savedStudentRecorde);
//Display the interactive menu(Start of Application).
(0, menu_1.showMenu)();
