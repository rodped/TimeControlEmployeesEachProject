import React from "react";
import { jsonServerRestClient, simpleRestClient, Admin, Resource, Delete } from "admin-on-rest";
import myApiRestClient from "./restClient";

import PostIcon from "material-ui/svg-icons/action/book";
import UserIcon from "material-ui/svg-icons/social/group";

import Dashboard from "./components/Dashboard";
import authClient from "./components/authClient";
import { PostList, PostEdit, PostCreate } from "./components/posts";
import { UserList, UserCreate } from "./components/users";
import { ClientList, ClientCreate } from "./components/clients";
import { WorkList, WorkCreate } from "./components/works";

const App = () => (
  <Admin
    authClient={authClient}
    dashboard={Dashboard}
    restClient={myApiRestClient}
    // restClient={jsonServerRestClient('http://jsonplaceholder.typicode.com')}
    // restClient={simpleRestClient('http://localhost:8080')}
  >
    <Resource
      name="users"
      list={UserList}
      create={UserCreate}
      icon={UserIcon}
    />
    <Resource
      name="clients"
      list={ClientList}
      create={ClientCreate}
      icon={UserIcon}
    />
    <Resource
      name="works"
      list={WorkList}
      create={WorkCreate}
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
