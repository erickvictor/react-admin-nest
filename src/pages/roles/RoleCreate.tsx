import axios from "axios";
import { SyntheticEvent, useEffect, useState } from "react";
import { Redirect } from "react-router";
import Wrapper from "../../components/Wrapper";
import { Permission } from "../../models/permissions";

const RoleCreate = () => {
  const [permissions, setPermissions] = useState([]);
  const [selected, setSelected] = useState([] as number[]);
  const [name, setName] = useState("");
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    (async () => {
      const { data } = await axios.get("permissions");

      setPermissions(data);
    })();
  }, []);

  const check = (id: number) => {
    if (selected.some((s) => s === id)) {
      setSelected(selected.filter((s) => s !== id));
      return;
    }
    setSelected([...selected, id]);
  };

  const submit = async (e: SyntheticEvent) => {
    e.preventDefault();

    await axios.post("roles", {
      name,
      permissions: selected,
    });

    setRedirect(true);
  };

  if (redirect) {
    return <Redirect to="/roles" />;
  }

  return (
    <Wrapper>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h1 className="h2">Create Role</h1>
      </div>
      <form onSubmit={submit}>
        <div className="mb-3 col-sm-10">
          <label htmlFor="Name" className="form-label">
            Name
          </label>
          <input
            id="Name"
            type="text"
            onChange={(e) => setName(e.target.value)}
            className="form-control"
          />
        </div>
        <div className="mb-3 col-sm-10">
          <label className="col-sm-10 col-form-label">Permissions</label>
          {permissions.map((p: Permission) => {
            return (
              <div key={p.id} className="form-check form-check-inline col-3">
                <input
                  className="form-check-input"
                  type="checkbox"
                  value={p.id}
                  id={p.id.toString()}
                  onChange={() => check(p.id)}
                />
                <label className="form-check-label" htmlFor={p.id.toString()}>
                  {p.name}
                </label>
              </div>
            );
          })}
        </div>

        <button className="btn btn-outline-secondary">Save</button>
      </form>
    </Wrapper>
  );
};

export default RoleCreate;
