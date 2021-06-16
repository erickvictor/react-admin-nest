import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Wrapper from "../../components/Wrapper";
import { Role } from "../../models/role";

const Roles = () => {
  const [roles, setRoles] = useState([]);

  useEffect(() => {
    (async () => {
      const { data } = await axios.get("roles");
      setRoles(data);
    })();
  }, []);

  const del = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this record?')) {
      await axios.post(`roles/${id}`);

      setRoles(roles.filter((r: Role) => r.id !== id));
    }
  }

  return (
    <Wrapper>
      <div className="table-responsive">
        <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
          <h1 className="h2">Roles</h1>
        </div>
        <div className="pt-3 pb-2 mb-3 border-bottom">
          <Link to="/roles/create" className="btn btn-sm btn-outline-secondary">
            Add
          </Link>
        </div>
        <table className="table table-striped table-sm">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {roles.map((role: Role) => {
              return (
                <tr key={role.id}>
                  <td>{role.id}</td>
                  <td>{role.name}</td>
                  <td>
                    <div className="btn-group mr-2">
                      <Link
                        className="btn btn-sm btn-outline-secondary"
                        to={`/users/${role.id}/edit`}
                      >
                        Edit
                      </Link>
                      <button
                        className="btn btn-sm btn-outline-secondary"
                        onClick={() => del(role.id)}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </Wrapper>
  );
};

export default Roles;
