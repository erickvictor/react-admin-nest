import { BrowserRouter, Route } from "react-router-dom";
import "./App.css";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import UserCreate from "./pages/users/UserCreate";
import UserEdit from "./pages/users/UserEdit";
import Users from "./pages/users/Users";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Route path={"/"} exact component={Dashboard} />
        <Route path={"/register"} component={Register} />
        <Route path={"/login"} component={Login} />
        <Route path={"/users"} exact component={Users} />
        <Route path={"/users/create"} component={UserCreate} />
        <Route path={"/users/:id/edit"} component={UserEdit} />
        
      </BrowserRouter>
    </div>
  );
}

export default App;
