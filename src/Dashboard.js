import { useEffect, useState } from "react";
import EmployeeForm from "./EmployeeForm";
import EmployeeTable from "./EmployeeTable";
import Filters from "./Filters";

export default function Dashboard() {
  const [employees, setEmployees] = useState([]);
  const [editEmp, setEditEmp] = useState(null);
  const [filters, setFilters] = useState({ name: "", gender: "", status: "" });

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("employees")) || [];
    setEmployees(data);
  }, []);

  useEffect(() => {
    localStorage.setItem("employees", JSON.stringify(employees));
  }, [employees]);

  const filtered = employees
    .filter((e) => e.name.toLowerCase().includes(filters.name.toLowerCase()))
    .filter((e) => (filters.gender ? e.gender === filters.gender : true))
    .filter((e) =>
      filters.status ? String(e.active) === filters.status : true
    );

  return (
    <div className="container">
      <h1 style={{textAlign:"center"}}>Employee Dashboard</h1>
      <p style={{textAlign:"center"}}>Total Employees: {employees.length}</p>
      <Filters setFilters={setFilters} />
      <EmployeeForm
        employees={employees}
        setEmployees={setEmployees}
        editEmp={editEmp}
        setEditEmp={setEditEmp}
      />
    <div id="print-table">
    <button className="no-print" onClick={() => window.print()} style={{float:"right", marginBottom:"10px"}}>Print Employee List</button>
      <EmployeeTable
        employees={filtered}
        setEmployees={setEmployees}
        setEditEmp={setEditEmp}
        filters={filters}
      /></div>
    </div>
  );
}
