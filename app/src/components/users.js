import React from "react";
import {
  List,
  Datagrid,
  EmailField,
  TextField,
  Create,
  CheckboxGroupInput,
  SimpleForm,
  TextInput
} from "admin-on-rest";

export const UserList = props => (
  <List title="All users" {...props}>
    <Datagrid>
      <TextField source="id" />
      <TextField source="name" />
      <TextField source="username" />
      <EmailField source="email" />
    </Datagrid>
  </List>
);

export const UserCreate = props => (
  <Create {...props}>
    <SimpleForm>
      <TextInput source="name" />
      <TextInput source="username" />
      <TextInput source="email" />
      <CheckboxGroupInput
        source="roles"
        choices={[
          { id: "admin", name: "ADMIN" },
          { id: "employee", name: "EMPLOYEE" }
        ]}
      />
    </SimpleForm>
  </Create>
);
