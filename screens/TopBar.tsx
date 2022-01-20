import * as React from "react";
import { Header, Icon } from "react-native-elements";

export default function TopBar() {
  return (
    <Header
      backgroundColor="black"
      backgroundImageStyle={{}}
      barStyle="light-content"
      centerComponent={{
        text: "CarSHAiR",
        style: { color: "#fff", fontSize: 20 }
      }}
      centerContainerStyle={{}}
      containerStyle={{ width: '100%', height: 125 }}
      leftComponent={{ icon: "menu", color: "#fff" }}
      leftContainerStyle={{}}
      placement="center"
      rightComponent={{ icon: "home", color: "#fff" }}
      rightContainerStyle={{}}
      statusBarProps={{}}
    />
  );
}