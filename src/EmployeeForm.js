import { useEffect, useState, useRef } from "react";
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

  const fileInputRef = useRef(null);

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
    if (!form.gender) return alert("Gender is required");
    if (!form.dob) return alert("Date of Birth is required");
    if (!form.state) return alert("State is required");

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
    if (fileInputRef.current) {
      fileInputRef.current.value = ""; // Clear the file input
    }
  };

  return (
    <div className="card">
      <h3>Employee Form – {editEmp ? "Edit" : "Add"} Employee</h3>

      <div className="form-grid">
        <div className="form-group">
          <label>Full Name</label>
          <input
            type="text"
            placeholder="Enter full name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
        </div>

        <div className="form-group">
          <label>Gender</label>
          <select
            value={form.gender}
            onChange={(e) => setForm({ ...form, gender: e.target.value })}
          >
            <option value="">Select</option>
            <option>Male</option>
            <option>Female</option>
          </select>
        </div>

        <div className="form-group">
          <label>Date of Birth</label>
          <input
            type="date"
            value={form.dob}
            onChange={(e) => setForm({ ...form, dob: e.target.value })}
          />
        </div>

        <div className="form-group">
          <label>State</label>
          <select
            value={form.state}
            onChange={(e) => setForm({ ...form, state: e.target.value })}
          >
            <option value="">Select</option>
            {states.map((state) => (
              <option key={state} value={state}>
                {state}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Profile Image</label>
          <input type="file" onChange={handleImage} ref={fileInputRef} />
        </div>

        <div className="form-group image-save">
          {form.image && (
            <img
              src={form.image}
              alt="preview"
              className="preview-img"
            />
          )}

          <button onClick={save}>Save</button>
        </div>
      </div>
    </div>
  );
}
