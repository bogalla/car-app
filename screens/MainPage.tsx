import { ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import axios from "axios"; 
import { Text, View,  } from '../components/Themed';
import TopBar from './TopBar';
import CarCard from './CarCard';
import { useState, Component, useEffect } from 'react';
import DropdownMake from './DropdownMake';
import DropdownType from './DropdownType';
import DropdownYear from './DropdownYear';

export default class MainPage extends Component <any, any> {

  constructor (props: {}) {
    super(props);
    this.state = {
      carResults: [],
      makes: [],
      selectedMake: null,
      selectedYear: null,
      types: [],
      selectedType: [],
      showFilters: false
    };

    this.getTypesByMake = this.getTypesByMake.bind(this);
    this.getMakes = this.getMakes.bind(this);
    this.getModelByMakeAndYear = this.getModelByMakeAndYear.bind(this);
    this.showCurrentState = this.showCurrentState.bind(this);
    this.search = this.search.bind(this);
    this.hideFilters = this.hideFilters.bind(this);
    this.getModelByMake = this.getModelByMake.bind(this);
  }

  componentDidMount(){
    this.getModelByMake();
    this.getMakes();
  }

  handleMake = (makeVal :any) => {
    this.setState({selectedMake: makeVal})
    this.getTypesByMake(makeVal)
  }

  handleType = (typeVal :any) => {
    this.setState({selectedType: typeVal})
  }

  handleYear = (yearVal :any) => {
    this.setState({selectedYear: yearVal})
  }
  
  getTypesByMake(makeVal : string) {
    axios
      .get('https://vpic.nhtsa.dot.gov/api/vehicles/GetVehicleTypesForMake/' + makeVal + '?format=json')
      .then( (response) => {
        // handle success
        this.setState({
          types: response.data['Results']
        });
      })
      .catch(function (error) {
        // handle error
        alert(error.message);
      })
  };

  getMakes(){
    axios
      .get('https://vpic.nhtsa.dot.gov/api/vehicles/GetAllMakes?format=json')
      .then( (response) => {
        // handle success
        this.setState({
          makes: response.data['Results']
        });
      })
      .catch(function (error) {
        // handle error
        alert(error.message);
      })
  };

  getModelByMakeAndYear(){
    axios
      .get('https://vpic.nhtsa.dot.gov/api/vehicles/GetModelsForMakeYear/make/honda/modelyear/2015?format=json')
      .then( (response) => {
        // handle success
        this.setState({
          carResults: response.data['Results']
        });
      })
      .catch(function (error) {
        // handle error
        alert(error.message);
      })
  };

  getModelByMake(){
    axios
      .get('https://vpic.nhtsa.dot.gov/api/vehicles/GetModelsForMake/TESLA?format=json')
      .then( (response) => {
        // handle success
        this.setState({
          carResults: response.data['Results']
        });
      })
      .catch(function (error) {
        // handle error
        alert(error.message);
      })
  };

  showCurrentState() {
    this.setState({
      showFilters: true
    })
  }

  hideFilters() {
    this.setState({
      showFilters: false
    })
  }

  search() {
    let keystring = '';
    
    if (this.state.selectedMake != null && this.state.selectedType != null && this.state.selectedYear != null) {
      keystring += 'GetModelsForMakeYear/make/' + this.state.selectedMake + '/modelyear/' + this.state.selectedYear + '/vehicletype/' + this.state.selectedType;
    }
    else if (this.state.selectedMake != null && this.state.selectedType != null) {
      keystring += 'GetModelsForMakeYear/make/' + this.state.selectedMake + '/vehicletype/' + this.state.selectedType;
    }
    else if (this.state.selectedMake != null && this.state.selectedYear != null) {
      keystring += 'GetModelsForMakeYear/make/' + this.state.selectedMake + '/modelyear/' + this.state.selectedYear;
    }
    else if (this.state.selectedMake != null) {
      keystring += 'GetModelsForMake/' + this.state.selectedMake;
    }
    else {
      alert('choose appropriate fields');
      return;
    }
    keystring += '?format=json'

    axios
      .get('https://vpic.nhtsa.dot.gov/api/vehicles/'+keystring)
      .then( (response) => {
        // handle success
        // this.setState({
        //   carResults: response.data['Results']
        // });
        this.setState({
          carResults: response.data['Results']
        });
      })
      .catch(function (error) {
        // handle error
        alert(error.message);
      })
  }

  render() {
    return (
      <View>
        <View>
          <TopBar/>
        </View>
        {this.state.showFilters ? 
        <View>
          <View style={{flexDirection: "row", justifyContent: "space-between", margin: 10}}>
            <Text>Select Make:</Text>
            <DropdownMake passedMakes={this.state.makes} onSelectMake={this.handleMake}/>
          </View>
          <View style={{flexDirection: "row", justifyContent: "space-between", margin: 10}}>
            <Text>Select Vehicle Type:</Text>
            <DropdownType key={this.state.types} passedTypes={this.state.types} onSelectType={this.handleType}/>
          </View>
          <View style={{flexDirection: "row", justifyContent: "space-between", margin: 10}}>
            <Text>Select Year:</Text>
            <DropdownYear onSelectYear={this.handleYear}/>
          </View>
          <View style={{flexDirection: "row"}}>
          <TouchableOpacity
            onPress={this.search}
            style={styles.smallButtonStyle}>
            <Text style={{color: "white", fontWeight: "200",}}>Search</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={this.hideFilters}
            style={styles.smallButtonStyle}>
            <Text style={{color: "white", fontWeight: "200"}}>Hide</Text>
          </TouchableOpacity>
          </View>
        </View>

          :
        
          <TouchableOpacity
            onPress={this.showCurrentState}
            style={styles.buttonStyle}>
            <Text style={{fontWeight: "300"}}>Refine Search</Text>
          </TouchableOpacity>
          }
        <ScrollView>
          <View style={{flexWrap: "wrap", flexDirection: "row"}}>
            {this.state.carResults.map((item: any, index: any) => {
                return (<CarCard style={{width: "50%"}} key={index} item={item} />);
            })}
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  buttonStyle: {
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: 'black',
    borderColor: 'white',
    padding: 10,
    width: '100%',
  },
  smallButtonStyle: {
    alignItems: 'center',
    backgroundColor: 'black',
    borderWidth: 1,
    borderColor: 'white',
    padding: 10,
    width: '50%',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  }
  
});