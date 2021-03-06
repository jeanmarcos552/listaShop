import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import {Text, View} from 'react-native';
import Button from '../../Components/Button';

import Home from '../Home';
import Icons from 'react-native-vector-icons/Ionicons';

import Lista from '../Lista/Listagem';
import {useAuth} from '../../hooks/auth';

const Tab = createBottomTabNavigator();

function Settings() {
  const {signOut} = useAuth();
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>Settings!</Text>
      <Button onPress={signOut}>Sair</Button>
    </View>
  );
}

const Tabs = () => {
  return (
    <>
      <Tab.Navigator
        screenOptions={({route}) => ({
          tabBarIcon: ({focused, color, size}) => {
            let iconName: any;

            switch (route.name) {
              case 'Home':
                iconName = focused ? 'home' : 'home-outline';
                break;
              case 'Lista':
                iconName = 'ios-list-outline';
                break;
              case 'Settings':
                iconName = focused ? 'settings' : 'settings-outline';
                break;
            }
            return <Icons name={iconName} size={size} color={color} />;
          },
        })}
        tabBarOptions={{
          activeTintColor: '#01ac73',
          inactiveTintColor: 'gray',
          showLabel: false,
        }}
        initialRouteName="Lista">
        <Tab.Screen name="Home" component={Home} />
        <Tab.Screen name="Lista" component={Lista} />
        <Tab.Screen name="Settings" component={Settings} />
      </Tab.Navigator>
    </>
  );
};

export default Tabs;
