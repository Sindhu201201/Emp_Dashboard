export default function Filters({ filters, setFilters }) {
    const clearAll = () => {
        setFilters({ name: "", gender: "", status: "" });
    }
  return (
    <div className="card">
      <h3>Employee Filters</h3>
      <p>Use the below fields to filter employee data</p>

      <input
        placeholder="Search by name" 
        value={filters?.name}
        onChange={(e) => setFilters((f) => ({ ...f, name: e.target.value }))}
      />

      <select
        value={filters?.gender}
        onChange={(e) => setFilters((f) => ({ ...f, gender: e.target.value }))}
      >
        <option value="">All Gender</option>
        <option>Male</option>
        <option>Female</option>
      </select>

      <select
        value={filters?.status}
        onChange={(e) => setFilters((f) => ({ ...f, status: e.target.value }))}
      >
        <option value="">All Status</option>
        <option value="true">Active</option>
        <option value="false">Inactive</option>
      </select>
      <button onClick={clearAll}>Clear All</button>
    </div>
  );
}
