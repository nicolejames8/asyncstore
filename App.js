import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import TableTab from './src/tableTab';
import MainTab from './src/mainTab';


const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="MainTab"
        screenOptions={{headerShown: false}}
      >
        <Stack.Screen name="MainTab" component={MainTab} />
        <Stack.Screen name="TableTab" component={TableTab} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;