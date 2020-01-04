import React from "react";
import {
  List,
  Create,
  Datagrid,
  TextField,
  SimpleForm,
  TextInput,
  ReferenceInput,
  SelectInput,
  required
} from "admin-on-rest";

export const WorkList = props => (
  <List title="All works" {...props}>
    <Datagrid>
      <TextField source="name" />
    </Datagrid>
  </List>
);

export const WorkCreate = props => (
  <Create {...props}>
    <SimpleForm>
      <TextInput source="name" />
      <ReferenceInput
        label="client"
        source="client"
        reference="clients"
        validate={required}
        allowEmpty
      >
        <SelectInput optionText="name" />
      </ReferenceInput>
    </SimpleForm>
  </Create>
);
