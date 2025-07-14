// import React from 'react';
// import { NavigationContainer } from '@react-navigation/native';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import { StatusBar } from 'expo-status-bar';

// import Login from './components/Login';
// import Register from './components/Register';
// import Home from './components/Home';

// const Stack = createNativeStackNavigator();

// export default function App() {
//   return (
//     <NavigationContainer>
//       <StatusBar style="auto" />
//       <Stack.Navigator 
//         initialRouteName="Register"
//         screenOptions={{
//           headerStyle: {
//             backgroundColor: '#4CAF50',
//           },
//           headerTintColor: '#fff',
//           headerTitleStyle: {
//             fontWeight: 'bold',
//           },
//         }}
//       >
//         <Stack.Screen 
//           name="Register" 
//           component={Register} 
//           options={{ title: 'Create Account' }}
//         />
//         <Stack.Screen 
//           name="Login" 
//           component={Login} 
//           options={{ title: 'Sign In' }}
//         />
//         <Stack.Screen 
//           name="Home" 
//           component={Home} 
//           options={{ 
//             title: 'Home',
//             headerBackVisible: false,
//             gestureEnabled: false
//           }}
//         />
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// }

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';

import Login from './components/Login';
import Register from './components/Register';
import Home from './components/Home';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="auto" />
      <Stack.Navigator 
        initialRouteName="Register"
        screenOptions={{
          headerStyle: {
            backgroundColor: '#4CAF50',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      >
        <Stack.Screen 
          name="Register" 
          component={Register} 
          options={{ title: 'Create Account' }}
        />
        <Stack.Screen 
          name="Login" 
          component={Login} 
          options={{ title: 'Sign In' }}
        />
        <Stack.Screen 
          name="Home" 
          component={Home} 
          options={{ 
            title: 'Dashboard',
            headerBackVisible: false,
            gestureEnabled: false
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
