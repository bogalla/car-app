import React, { Component, useState } from "react";
import { View, StyleSheet} from "react-native";
import RNPickerSelect from 'react-native-picker-select'; // style={{ height: 10, width: 150 }}

export default class  DropdownType extends Component <any, any> {
  constructor (props: {}) {
    super(props);
    this.state = {
      types: [],
    };
    this.getPickerFormat = this.getPickerFormat.bind(this);
    this.handleTypeChange = this.handleTypeChange.bind(this);

  }

  componentDidMount() {
    this.getPickerFormat(this.props.passedTypes)
  }

  getPickerFormat(arr: Array<{MakeID: number, MakeName: string, VehicleTypeId: number, VehicleTypeName: string}>) {
    const dataList = arr.map((x, i) => ({
      label: x['VehicleTypeName'],
      value: x['VehicleTypeName'],
      key: i
    }))

    this.setState({types:dataList});
  }

  handleTypeChange(itemValue: any) {
    this.props.onSelectType(itemValue)
  }


  render() {
    return (
      <View style={styles.container}>
        <RNPickerSelect        
          onValueChange={(itemValue) => this.handleTypeChange(itemValue)}
          items={this.state.types}
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