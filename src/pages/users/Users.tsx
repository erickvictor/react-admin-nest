import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Paginator from "../../components/Paginator";
import Wrapper from "../../components/Wrapper";
import { User } from "../../models/user";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(0);

  useEffect(() => {
    (async () => {
      const { data } = await axios.get(`users?page=${page}`);

      setUsers(data.data);
      setLastPage(data.meta.last_page);
    })();
  }, [page]);

  const del = async (id: number) => {
    if (window.confirm("Are you sure you want to delete this record?")) {
      await axios.delete(`users/${id}`);

      setUsers(users.filter((u: User) => u.id !== id));
    }
  };

  return (
    <Wrapper>
      <div className="table-responsive">
        <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
          <h1 className="h2">Users</h1>
        </div>
        <div className="pt-3 pb-2 mb-3 border-bottom">
          <Link to="/users/create" className="btn btn-sm btn-outline-secondary">
            Add
          </Link>
        </div>
        <table className="table table-striped table-sm">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user: User) => {
              return (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>
                    {user.first_name} {user.last_name}
                  </td>
                  <td>{user.email}</td>
                  <td>{user.role.name}</td>
                  <td>
                    <div className="btn-group mr-2">
                      <Link
                        className="btn btn-sm btn-outline-secondary"
                        to={`/users/${user.id}/edit`}
                      >
                        Edit
                      </Link>
                      <button
                        className="btn btn-sm btn-outline-secondary"
                        onClick={() => del(user.id)}
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

      <Paginator page={page} lastPage={lastPage} pageChanged={setPage} />
    </Wrapper>
  );
};

export default Users;
