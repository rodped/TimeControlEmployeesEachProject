import React from "react";
import {
  List,
  Create,
  Datagrid,
  TextField,
  SimpleForm,
  TextInput,
  Edit,
  DisabledInput,
  Responsive,
  SimpleList,
  EditButton,
  required,
  ReferenceInput,
  SelectInput,
  ListButton,
  DeleteButton,
  RefreshButton
} from "admin-on-rest";

import { CardActions } from "material-ui/Card";

import StartWorkButton from "./startWork";
import EndWorkButton from "./endWork";
import TimeWorkButton from "./timeWork";

export const WorkList = props => (
  <List {...props}>
    <Responsive
      small={
        <SimpleList
          primaryText={record => record.name}
          secondaryText={record => record.client}
          tertiaryText={record => record.id}
        />
      }
      medium={
        <Datagrid>
          <TextField source="id" />
          <TextField source="name" />
          <TextField source="client" />
          <EditButton />
        </Datagrid>
      }
    />
  </List>
);

const WorkTitle = ({ record }) => {
  return <span>Work {record ? `"${record.name}"` : ""}</span>;
};

const cardActionStyle = {
  zIndex: 2,
  display: "inline-block",
  float: "right"
};

const WorkEditActions = ({ basePath, data }) => (
  <CardActions style={cardActionStyle}>
    <ListButton basePath={basePath} />
    <DeleteButton basePath={basePath} record={data} />
    <RefreshButton />

    <StartWorkButton work={data} />
    <EndWorkButton work={data} />
    <TimeWorkButton work={data} />
  </CardActions>
);

export const WorkEdit = props => (
  <Edit title={<WorkTitle />} actions={<WorkEditActions />} {...props}>
    <SimpleForm>
      <DisabledInput source="id" />
      <TextInput source="name" validate={required} />
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
  </Edit>
);

export const WorkCreate = props => (
  <Create {...props}>
    <SimpleForm>
      <TextInput source="name" validate={required} />
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
