import React, { Component, useState } from "react";
import { View, StyleSheet} from "react-native";
import RNPickerSelect from 'react-native-picker-select'; // style={{ height: 10, width: 150 }}

export default class  DropdownYear extends Component <any, any> {
  constructor (props: {}) {
    super(props);
    this.state = {
      years: [],
    };
    this.getPickerFormat = this.getPickerFormat.bind(this);
  }

  componentDidMount() {
    this.getPickerFormat()
  }

  getPickerFormat() {
    let ans = []
    for (let i = 2022; i > 1966; i-- ) {
        ans.push({
            label: String(i),
            value: String(i),
        })
    }

    this.setState({years: ans});
  }

  render() {
    return (
      <View style={styles.container}>
        <RNPickerSelect        
          onValueChange={(itemValue) => this.props.onSelectYear(itemValue)}
          items={this.state.years}
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