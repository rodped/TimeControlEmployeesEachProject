import React from "react";
import {
  List,
  Datagrid,
  TextField,
  Responsive,
  SimpleList,
  EditButton
} from "admin-on-rest";

export const TimeList = props => (
  <List {...props}>
    <Responsive
      small={
        <SimpleList
          primaryText={record => record.work}
          secondaryText={record => record.workTime}
          tertiaryText={record => record.id}
        />
      }
      medium={
        <Datagrid>
          <TextField source="id" />
          <TextField source="work" />
          <TextField source="client" />
          <TextField source="employee" />
          <TextField source="startTime" />
          <TextField source="endTime" />
          <TextField source="workTime" />
          <EditButton />
        </Datagrid>
      }
    />
  </List>
);
