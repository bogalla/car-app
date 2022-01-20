import React, { Component, useState } from "react";
import { View, StyleSheet} from "react-native";
import RNPickerSelect from 'react-native-picker-select'; // style={{ height: 10, width: 150 }}

export default class  DropdownMake extends Component <any, any> {
  constructor (props: {}) {
    super(props);
    this.state = {
      makes: [],
    };
    this.getPickerFormat = this.getPickerFormat.bind(this);
  }

  componentDidMount() {
    this.getPickerFormat(this.props.passedMakes)
  }

  getPickerFormat(arr: Array<{Make_ID: number, Make_Name: string}>) {
    const dataList = arr.map((x, i) => ({
      label: x['Make_Name'],
      value: x['Make_Name'],
      key: i
    }))

    this.setState({makes: dataList});
  }

  render() {
    return (
      <View style={styles.container}>
        <RNPickerSelect        
          onValueChange={(itemValue) => this.props.onSelectMake(itemValue)}
          items={this.state.makes}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 0,
    alignItems: "center"
  }
});