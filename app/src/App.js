import React from "react";
import {
  jsonServerRestClient,
  simpleRestClient,
  Admin,
  Resource,
  Delete
} from "admin-on-rest";
import myApiRestClient from "./restClient";

import PostIcon from "material-ui/svg-icons/action/book";
import UserIcon from "material-ui/svg-icons/social/group";

import Dashboard from "./components/Dashboard";
import authClient from "./components/authClient";
import { PostList, PostEdit, PostCreate } from "./components/posts";
import { UserList, UserEdit, UserCreate } from "./components/users";
import { ClientList, ClientEdit, ClientCreate } from "./components/clients";
import { WorkList, WorkEdit, WorkCreate, WorkShow } from "./components/works";

const App = () => (
  <Admin
    authClient={authClient}
    dashboard={Dashboard}
    restClient={myApiRestClient}
    // restClient={jsonServerRestClient("http://jsonplaceholder.typicode.com")}
    // restClient={simpleRestClient('http://localhost:8080')}
  >
    {/* {permissions => [
      // Only include the categories resource for admin users
      permissions === "admin" ? (
        <Resource
          name="postsAdmin"
          list={PostList}
          edit={PostEdit}
          create={PostCreate}
          remove={Delete}
          icon={PostIcon}
        />
      ) : null
    ]} */}

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

    <Resource
      name="posts"
      list={PostList}
      edit={PostEdit}
      create={PostCreate}
      remove={Delete}
      icon={PostIcon}
    />
  </Admin>
);

export default App;
