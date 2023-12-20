const data = {};
data.employee = require("../model/employees.json");

const getAllEmployees = (req, res) => {
  res.json(data.employee);
};

const getEmployeeById = (req, res) => {
  const employee = data.employee.find(
    (employee) => employee.id === parseInt(req.params.id)
  );
  res.json(employee);
};
module.exports = { getAllEmployees, getEmployeeById };
