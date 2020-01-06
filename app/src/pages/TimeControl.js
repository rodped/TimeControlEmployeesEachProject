import React from "react";
import {
  jsonServerRestClient,
  simpleRestClient,
  Admin,
  Resource,
  Delete,
  fetchUtils
} from "admin-on-rest";
import myApiRestClient from "../restClient";
import PostIcon from "material-ui/svg-icons/action/book";
import UserIcon from "material-ui/svg-icons/social/group";

import Dashboard from "../components/Dashboard";
import authClient from "../components/authClient";
import { PostList, PostEdit, PostCreate } from "../components/posts";
import { UserList, UserEdit, UserCreate } from "../components/users";
import { ClientList, ClientEdit, ClientCreate } from "../components/clients";
import { WorkList, WorkEdit, WorkCreate, WorkShow } from "../components/works";
import { TimeList } from "../components/times";
import Login from "./Login";

const TimeControl = () => (
  <Admin
    title="Time Control"
    loginPage={Login}
    authClient={authClient}
    dashboard={Dashboard}
    restClient={myApiRestClient}
    // restClient={jsonServerRestClient("http://jsonplaceholder.typicode.com")}
  >
    {permissions => [
      // // Restrict access to the edit and remove views to admin only
      // <Resource
      //   name="users"
      //   list={UserList}
      //   edit={permissions === "ROLE_ADMIN" ? UserEdit : null}
      //   create={permissions === "ROLE_ADMIN" ? UserCreate : null}
      //   remove={permissions === "ROLE_ADMIN" ? Delete : null}
      //   icon={UserIcon}
      // />,
      // <Resource
      //   name="clients"
      //   list={ClientList}
      //   edit={ClientEdit === "admin" ? VisitorEdit : null}
      //   create={ClientCreate === "admin" ? VisitorEdit : null}
      //   remove={Delete === "admin" ? VisitorEdit : null}
      //   icon={UserIcon}
      // />,
      // <Resource
      //   name="works"
      //   list={WorkList}
      //   edit={WorkEdit}
      //   create={WorkCreate}
      //   remove={Delete}
      //   // show={WorkShow}
      //   icon={PostIcon}
      // />,
      // // Only include the categories resource for admin users
      // permissions === "ROLE_ADMIN" ? (
      //   <Resource
      //     name="users"
      //     list={UserList}
      //     edit={UserEdit}
      //     create={UserCreate}
      //     remove={Delete}
      //     icon={UserIcon}
      //   />
      // ) : null
    ]}

    <Resource
      name="users"
      list={UserList}
      edit={UserEdit}
      create={UserCreate}
      remove={Delete}
      icon={UserIcon}
    />
    <Resource
      name="clients"
      list={ClientList}
      edit={ClientEdit}
      create={ClientCreate}
      remove={Delete}
      icon={UserIcon}
    />
    <Resource
      name="works"
      list={WorkList}
      edit={WorkEdit}
      create={WorkCreate}
      remove={Delete}
      // show={WorkShow}
      icon={PostIcon}
    />

    {/* <Resource name="Time Control" list={TimeList} />

    <Resource
      name="posts"
      list={PostList}
      edit={PostEdit}
      create={PostCreate}
      remove={Delete}
      icon={PostIcon}
    /> */}
  </Admin>
);

export default TimeControl;
