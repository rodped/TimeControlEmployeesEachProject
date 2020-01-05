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
  Filter,
  Responsive,
  SimpleList,
  EditButton,
  required
} from "admin-on-rest";

const ClientFilter = props => (
  <Filter {...props}>
    <TextInput label="Search" source="q" alwaysOn />
  </Filter>
);

export const ClientList = props => (
  <List {...props} filters={<ClientFilter />}>
    <Responsive
      small={
        <SimpleList
          primaryText={record => record.name}
          // secondaryText={record => `${record.views} views`}
          // tertiaryText={record =>
          //   new Date(record.published_at).toLocaleDateString()
          // }
        />
      }
      medium={
        <Datagrid>
          <TextField source="id" />
          <TextField source="name" />
          <EmailField source="email" />
          <EditButton />
        </Datagrid>
      }
    />
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
