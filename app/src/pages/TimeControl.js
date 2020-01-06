import React from "react";
import { Admin, Resource, Delete } from "admin-on-rest";
import myApiRestClient from "../restClient";
import PostIcon from "material-ui/svg-icons/action/book";
import UserIcon from "material-ui/svg-icons/social/group";

import Dashboard from "../components/Dashboard";
import authClient from "../components/authClient";
import { UserList, UserEdit, UserCreate } from "../components/users";
import { ClientList, ClientEdit, ClientCreate } from "../components/clients";
import { WorkList, WorkEdit, WorkCreate } from "../components/works";
import Login from "./Login";

const TimeControl = () => (
  <Admin
    title="Time Control"
    loginPage={Login}
    authClient={authClient}
    dashboard={Dashboard}
    restClient={myApiRestClient}
  >
    {permissions => [
      <Resource
        name="users"
        list={UserList}
        edit={permissions === "ROLE_ADMIN" ? UserEdit : null}
        create={permissions === "ROLE_ADMIN" ? UserCreate : null}
        remove={permissions === "ROLE_ADMIN" ? Delete : null}
        icon={UserIcon}
      />,
      <Resource
        name="clients"
        list={ClientList}
        edit={permissions === "ROLE_ADMIN" ? ClientEdit : null}
        create={permissions === "ROLE_ADMIN" ? ClientCreate : null}
        remove={permissions === "ROLE_ADMIN" ? Delete : null}
        icon={UserIcon}
      />,
      <Resource
        name="works"
        list={WorkList}
        edit={WorkEdit}
        create={WorkCreate}
        remove={Delete}
        icon={PostIcon}
      />
    ]}
  </Admin>
);

export default TimeControl;
