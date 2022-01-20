import * as React from "react";
import { Card } from "react-native-elements";
import { View, Image, Text, StyleSheet, TouchableOpacity } from "react-native";

export default function CarCard(props: any) {
  return (
    <Card containerStyle={styles.container} wrapperStyle={{}}>
      <View
        style={{
          alignItems: "flex-start",
          flexDirection: "row",
        }}
      >
        <Image
          style={{ width: 150, height: 130, marginLeft:10 }}
          resizeMode="contain"
          source={{
            uri: "https://media.wired.com/photos/5926c2f38d4ebc5ab806b65e/master/w_2560%2Cc_limit/HotwheelsTA.jpg"
          }}
        />
          <View style={{marginTop:5, marginLeft: 21, flexDirection: "column",}}>
            <View style={{padding: 3, flexDirection: "row", flexWrap: "wrap"}}>
              <Text style={{fontWeight: "300"}}>{props.item.MakeName ? props.item.MakeName : ''}{props.item.Make_Name ? props.item.Make_Name : ''} </Text>
              <Text style={{fontWeight: "200"}}>{props.item.ModelName ? props.item.ModelName : ''}{props.item.Model_Name ? props.item.Model_Name : ''}</Text>
            </View>
            <Text style={{fontWeight: "200", padding: 3}}>200$ /day</Text>
            <Text style={{fontWeight: "200", padding: 3}}>Anaheim, California</Text>
            
            <TouchableOpacity
            style={styles.buttonStyle}>
            <Text style={{color: "white", fontWeight: "200"}}>Book</Text>
          </TouchableOpacity>          
        </View>
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 0, // Remove Border
    width: "90%",
    padding: 0,
    marginBottom:0,
    shadowColor: 'rgba(0,0,0, 0.0)', // Remove Shadow for iOS
    shadowOffset: { height: 0, width: 0 },
    shadowOpacity: 0,
    shadowRadius: 0,
    
    elevation: 0 // Remove Shadow for Android
  },
  buttonStyle: {
    alignItems: 'center',
    borderWidth: 0,
    padding: 10,
    width: '100%',
    backgroundColor: 'black',
  },
});