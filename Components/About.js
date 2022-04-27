import {React} from "react";
import { View, Alert } from "react-native";
import { Button, DataTable } from "react-native-paper";
import * as Clipboard from "expo-clipboard";

const AppInfo = require("../app.json").expo;

export default function About(){
  return(
    <View>
      <DataTable>
        <DataTable.Header>
          <DataTable.Title>Item</DataTable.Title>
          <DataTable.Title>Value</DataTable.Title>
        </DataTable.Header>

        <DataTable.Row>
          <DataTable.Cell>Splash Location</DataTable.Cell>
          <DataTable.Cell>{AppInfo.splash.image}</DataTable.Cell>
        </DataTable.Row>

        <DataTable.Row>
          <DataTable.Cell>Version</DataTable.Cell>
          <DataTable.Cell>{AppInfo.version}</DataTable.Cell>
        </DataTable.Row>

        <DataTable.Row>
          <DataTable.Cell>Orientation</DataTable.Cell>
          <DataTable.Cell>{AppInfo.orientation}</DataTable.Cell>
        </DataTable.Row>

        <DataTable.Row>
          <DataTable.Cell>Android</DataTable.Cell>
          <DataTable.Cell>{JSON.stringify(AppInfo.android)}</DataTable.Cell>
        </DataTable.Row>
      </DataTable>

      <Button icon="clipboard" mode="contained" onPress={() => {
        Clipboard.setString(JSON.stringify(AppInfo));
        Alert.alert("copied");}}>
        Copy
      </Button>
    </View>
   
  );
}