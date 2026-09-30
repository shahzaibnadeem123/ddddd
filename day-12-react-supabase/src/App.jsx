import { useEffect, useState } from "react";
import { supabase } from "./supabaseClient";

function App() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    console.log("Fetching users...");

    async function fetchUsers() {
      const { data, error } = await supabase
        .from("users")
        .select("*");

      console.log("DATA:", data);
      console.log("ERROR:", error);

      if (!error) {
        setUsers(data);
      }
    }

    fetchUsers();
  }, []);

  return (
    <div style={{ padding: "30px" }}>
      <h1>Users from Supabase</h1>

      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Auth ID</th>
            <th>Created At</th>
          </tr>
        </thead>

        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.auth_id}</td>
              <td>{user.created_at}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;