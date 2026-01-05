export default function EmployeeTable({
  employees,
  setEmployees,
  setEditEmp,
  filters,
}) {
  const del = (id) => {
    if (window.confirm("Delete employee?")) {
      setEmployees(employees.filter((e) => e.id !== id));
    }
  };

  return (
    <>
      {(filters.name || filters.gender || filters.status) && (
        <h3>Filtered Employee Results</h3>
      )}
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Image</th>
            <th>Name</th>
            <th>Gender</th>
            <th>DOB</th>
            <th>State</th>
            <th>Status</th>
            <th className="no-print">Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((e) => (
            <tr key={e.id}>
              <td>{e.id}</td>
              <td>{e.image && <img src={e.image} width="40" />}</td>
              <td>{e.name}</td>
              <td>{e.gender}</td>
              <td>{e.dob}</td>
              <td>{e.state}</td>
              <td>
                <label className="switch">
                <input
                    type="checkbox"
                    checked={e.active}
                    onChange={() =>
                    setEmployees(
                        employees.map(emp =>
                        emp.id === e.id ? { ...emp, active: !emp.active } : emp
                        )
                    )
                    }
                />
                <span className="slider"></span>
                </label>
                <span style={{ marginLeft: "8px" }}>
                {e.active ? "Active" : "Inactive"}
                </span>
              </td>
              <td className="no-print">
                <button onClick={() => setEditEmp(e)}>Edit</button>
                <button className="secondary" onClick={() => del(e.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
