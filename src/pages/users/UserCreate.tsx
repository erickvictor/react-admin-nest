import axios from "axios";
import { SyntheticEvent, useEffect, useState } from "react";
import { Redirect } from "react-router";
import Wrapper from "../../components/Wrapper";
import { Role } from "../../models/role";

const UserCreate = () => {
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [role_id, setRoleId] = useState("");
  const [roles, setRoles] = useState([]);
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    (async () => {
      const { data } = await axios.get("roles");

      setRoles(data);
    })();
  }, []);

  const submit = async (e: SyntheticEvent) => {
    e.preventDefault();

    await axios.post("users", {
      first_name,
      last_name,
      email,
      role_id,
    });

    setRedirect(true);
  };

  if (redirect) {
    return <Redirect to="/users" />;
  }

  return (
    <Wrapper>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h1 className="h2">Create User</h1>
      </div>
      <form onSubmit={submit}>
        <div className="mb-3">
          <label htmlFor="FirstName" className="form-label">
            First Name
          </label>
          <input
            id="FirstName"
            type="text"
            onChange={(e) => setFirstName(e.target.value)}
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="LastName" className="form-label">
            Last Name
          </label>
          <input
            id="LastName"
            type="text"
            onChange={(e) => setLastName(e.target.value)}
            className="form-control"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="Email" className="form-label">
            Email
          </label>
          <input
            id="Email"
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            className="form-control"
          />
        </div>
        <div className="form-floating mb-3">
          <select
            className="form-select"
            id="Role"
            onChange={(e) => setRoleId(e.target.value)}
            aria-label="Select Role User"
          >
            {roles.map((r: Role) => {
              return (
                <option key={r.id} value={r.id}>
                  {r.name}
                </option>
              );
            })}
          </select>
          <label htmlFor="Role">Role</label>
        </div>

        <button className="btn btn-outline-secondary">Save</button>
      </form>
    </Wrapper>
  );
};

export default UserCreate;
