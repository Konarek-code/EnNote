import { Feather } from '@expo/vector-icons';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import React from 'react';
import { TouchableOpacity } from 'react-native';

import { NavbarContainer, NavButton } from './navigationBar.style';


const iconMap: Record<string, keyof typeof Feather.glyphMap> = {
  menu: 'menu',
  home: 'home',
  profile: 'user',
};

const orderedRoutes = ['menu', 'home', 'profile'];

const NavigationBar: React.FC<BottomTabBarProps> = ({ state, navigation }) => {
  return (
    <NavbarContainer>
      {orderedRoutes.map((name, index) => {
        const route = state.routes.find((r) => r.name.toLowerCase().includes(name));
        if (!route) return null;
        const cleanedRouteName = route.name.split('/')[0];
        const iconName = iconMap[cleanedRouteName] || 'help-circle';
        const isFocused = state.index === index;

        return (
          <NavButton
            key={route.name}
            as={TouchableOpacity}
            onPress={() => navigation.navigate(route.name)}
          >
            <Feather name={iconName} size={30} color={isFocused ? '#666666' : '#ffffff'} />
          </NavButton>
        );
      })}
    </NavbarContainer>
  );
};
export default NavigationBar;
