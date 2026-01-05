import { useEffect, useState } from "react";
import states from "./states";

export default function EmployeeForm({
  employees,
  setEmployees,
  editEmp,
  setEditEmp,
}) {
  const [form, setForm] = useState({
    name: "",
    gender: "",
    state: "",
    dob: "",
    active: true,
    image: "",
  });

  useEffect(() => {
    if (editEmp) setForm(editEmp);
  }, [editEmp]);

  const handleImage = (e) => {
    const reader = new FileReader();
    reader.onload = () => setForm({ ...form, image: reader.result });
    reader.readAsDataURL(e.target.files[0]);
  };

  const save = () => {
    if (!form.name) return alert("Name required");

    if (editEmp) {
      setEmployees(employees.map((e) => (e.id === form.id ? form : e)));
    } else {
      setEmployees([...employees, { ...form, id: Date.now() }]);
    }

    setForm({
      name: "",
      gender: "",
      state: "",
      dob: "",
      active: true,
      image: "",
    });
    setEditEmp(null);
  };

  return (
    <div className="card">
      <h3>{editEmp ? "Edit" : "Add"} Employee</h3>

      <input
        placeholder="Name"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
      />
      <select
        value={form.gender}
        onChange={(e) => setForm({ ...form, gender: e.target.value })}
      >
        <option value="">Gender</option>
        <option>Male</option>
        <option>Female</option>
      </select>
      <input
        type="date"
        value={form.dob}
        onChange={(e) => setForm({ ...form, dob: e.target.value })}
      />
      <select
        value={form.state}
        onChange={(e) => setForm({ ...form, state: e.target.value })}
      >
        <option value="">Select State</option>
        {states.map((state) => (
          <option key={state} value={state}>
            {state}
          </option>
        ))}
      </select>
      <input type="file" onChange={handleImage} value="" />
      {form.image && (
        <div style={{ marginTop: "8px" }}>
            <img src={form.image} width="50" alt="preview" />
        </div>
        )}
      <button onClick={save}>Save</button>
    </div>
  );
}
