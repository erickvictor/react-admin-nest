import axios from "axios";
import { SyntheticEvent, useEffect, useState } from "react";
import Wrapper from "../components/Wrapper";

const Profile = () => {
  const [first_name, setFirstName] = useState('');
  const [last_name, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password_confirm, setPasswordConfirm] = useState('');

  useEffect(() => {
    (
      async () => {
        const { data } = await axios.get('user');

        setFirstName(data.first_name);
        setLastName(data.last_name);
        setEmail(data.email);
      }
    )()
  }, [])

  const infoSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();

    await axios.put('users/info', {
      first_name,
      last_name,
      email
    })
  }

  const passwordSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();

    await axios.put('users/password', {
      password,
      password_confirm
    })
  }

  return (
    <Wrapper>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h1 className="h2">Profile</h1>
      </div>
      <h3>Account Information</h3>
      <form onSubmit={infoSubmit}>
        <div className="mb-3 col-sm-10">
          <label htmlFor="FirstName" className="form-label">
            First Name
          </label>
          <input id="FirstName" defaultValue={first_name} onChange={e => setFirstName(e.target.value)} type="text" className="form-control" />
        </div>
        <div className="mb-3 col-sm-10">
          <label htmlFor="LastName" className="form-label">
            Last Name
          </label>
          <input id="LastName" defaultValue={last_name} onChange={e => setLastName(e.target.value)} type="text" className="form-control" />
        </div>
        <div className="mb-4 col-sm-10">
          <label htmlFor="Email" className="form-label">
            Email
          </label>
          <input id="Email" defaultValue={email} onChange={e => setEmail(e.target.value)} type="email" className="form-control" />
        </div>

        <button className="btn btn-outline-secondary">Save</button>
      </form>

      <h3 className="mt-4">Change Password</h3>
      <form onSubmit={passwordSubmit}>
        <div className="mb-3 col-sm-10">
          <label htmlFor="Password" className="form-label">
            Password
          </label>
          <input id="Password" onChange={e => setPassword(e.target.value)} type="password" className="form-control" />
        </div>
        <div className="mb-4 col-sm-10">
          <label htmlFor="PasswordConfirm" className="form-label">
            Password Confirm
          </label>
          <input id="PasswordConfirm" onChange={e => setPasswordConfirm(e.target.value)} type="password" className="form-control" />
        </div>

        <button className="btn btn-outline-secondary mb-4">Save</button>
      </form>
    </Wrapper>
  );
};

export default Profile;
