import { useEffect, useState } from "react";
import EmployeeForm from "./EmployeeForm";
import EmployeeTable from "./EmployeeTable";
import Filters from "./Filters";
import { useNavigate } from "react-router-dom";


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

    const navigate = useNavigate();

    const logout = () => {
    sessionStorage.clear();
    navigate("/login");
    };

  return (
    <div className="container">
    <button className="no-print" style={{float:"right"}} onClick={logout}>Logout</button>
      <h1 style={{textAlign:"center"}}>Employee Management Dashboard</h1>
      <p style={{textAlign:"center"}}>Total Number of Employees: {employees.length}</p>
      <Filters setFilters={setFilters} filters={filters} />
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
