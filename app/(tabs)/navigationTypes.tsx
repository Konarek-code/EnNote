import { RouteProp } from "@react-navigation/native";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";

export type RootStackParamList = {
  HomePage: undefined;
  MenuPage: undefined;
  ProfilePage: undefined;
};

export type NavigationProp = BottomTabNavigationProp<RootStackParamList>;
export type RouteProps<T extends keyof RootStackParamList> = RouteProp<
  RootStackParamList,
  T
>;
