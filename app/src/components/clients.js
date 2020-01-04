import React from "react";
import {
  List,
  Create,
  Datagrid,
  TextField,
  SimpleForm,
  TextInput,
  EmailField
} from "admin-on-rest";

export const ClientList = props => (
  <List title="All clients" {...props}>
    <Datagrid>
      <TextField source="name" />
      <EmailField source="email" />
    </Datagrid>
  </List>
);

export const ClientCreate = props => (
  <Create {...props}>
    <SimpleForm>
      <TextInput source="name" />
      <TextInput source="email" />
    </SimpleForm>
  </Create>
);
