import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import axios from "axios"; 
import { Button, ThemeProvider, Text } from 'react-native-elements';
import MainPage from './screens/MainPage';
import { Component } from 'react';

axios.defaults.timeout = 30000;

const theme = {
  Button: {
    raised: true,
  },
};

class App extends Component {
  constructor(props: {}) {
    super(props);
  }
  render () {
    return (
      <SafeAreaProvider>
        <ThemeProvider>
          <MainPage/>
        </ThemeProvider>
      </SafeAreaProvider>
    );
  }
}

export default App;
