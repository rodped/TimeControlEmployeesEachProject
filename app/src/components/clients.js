import React from "react";
import {
  List,
  Create,
  Datagrid,
  TextField,
  SimpleForm,
  TextInput,
  EmailField,
  Edit,
  DisabledInput,
  Responsive,
  SimpleList,
  EditButton,
  required} from "admin-on-rest";

export const ClientList = ({ ...props }) => (
  <List {...props}>
    {permissions => (
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
            <EmailField source="email" />
            {permissions === "ROLE_ADMIN" ? <EditButton /> : null}
          </Datagrid>
        }
      />
    )}
  </List>
);

const ClientTitle = ({ record }) => {
  return <span>Client {record ? `"${record.name}"` : ""}</span>;
};

export const ClientEdit = props => (
  <Edit title={<ClientTitle />} {...props}>
    <SimpleForm>
      <DisabledInput source="id" />
      <TextInput source="name" validate={required} />
      <TextInput source="email" validate={required} />
    </SimpleForm>
  </Edit>
);

export const ClientCreate = props => (
  <Create {...props}>
    <SimpleForm>
      <TextInput source="name" validate={required} />
      <TextInput source="email" validate={required} />
    </SimpleForm>
  </Create>
);
