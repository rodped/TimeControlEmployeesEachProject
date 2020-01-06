import React from "react";
import {
  Filter,
  List,
  Responsive,
  SimpleList,
  Edit,
  Create,
  Datagrid,
  TextField,
  SimpleForm,
  TextInput,
  EmailField,
  CheckboxGroupInput,
  DisabledInput,
  EditButton,
  required
} from "admin-on-rest";

export const UserList = props => (
  <List {...props}>
    <Responsive
      small={
        <SimpleList
          primaryText={record => record.name}
          secondaryText={record => record.email}
          tertiaryText={record => record.id}
        />
      }
      medium={
        <Datagrid>
          <TextField source="id" />
          <TextField source="name" />
          <TextField source="username" />
          <TextField source="role" />
          <EmailField source="email" />
          <EditButton />
        </Datagrid>
      }
    />
  </List>
);

const UserTitle = ({ record }) => {
  return <span>User {record ? `"${record.name}"` : ""}</span>;
};

export const UserEdit = props => (
  <Edit title={<UserTitle />} {...props}>
    <SimpleForm>
      <DisabledInput source="id" />
      <TextInput source="name" validate={required} />
      <TextInput source="username" validate={required} />
      <TextInput source="email" validate={required} />
      <TextInput source="password" validate={required} type="password" />
      {/* <CheckboxGroupInput
        source="roles"
        choices={[
          { id: "admin", name: "ADMIN" },
          { id: "employee", name: "EMPLOYEE" }
        ]}
        validate={required}
      /> */}
    </SimpleForm>
  </Edit>
);

export const UserCreate = props => (
  <Create {...props}>
    <SimpleForm>
      <TextInput source="name" validate={required} />
      <TextInput source="username" validate={required} />
      <TextInput source="email" validate={required} />
      <CheckboxGroupInput
        source="roles"
        choices={[
          { id: "admin", name: "ADMIN" },
          { id: "employee", name: "EMPLOYEE" }
        ]}
        validate={required}
      />
    </SimpleForm>
  </Create>
);
