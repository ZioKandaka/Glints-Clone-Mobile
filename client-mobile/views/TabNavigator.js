import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import Home from "./Home";
import Profile from "./Profile";
import { Divider, Badge, Image, Icon } from "@rneui/themed";
import {
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const Tab = createMaterialBottomTabNavigator();

export default function TabNavigator() {
  return (
    <Tab.Navigator
      inactiveColor="#3e2465"
      activeColor="#3e2465"
      barStyle={{ backgroundColor: "white" }}
      //   style={styles.tabBarStyle}
    >
      <Tab.Screen
        options={{
          tabBarIcon: ({ color }) => (
            <Icon name="briefcase-outline" color={color} type="ionicon" />
          ),
        }}
        name="Vacancies"
        component={Home}
      />
      <Tab.Screen
        options={{
          tabBarIcon: ({ color }) => (
            <Icon name="person-outline" color={color} type="ionicon" />
          ),
        }}
        name="Profile"
        component={Profile}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  tabBarStyle: {
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.0,
    elevation: 24,
    borderTopLeftRadius: 21,
    borderTopRightRadius: 21,
    backgroundColor: "#fff",
    // position: "absolute",
    bottom: 0,
    padding: 10,
    width: "100%",
    height: 84,
    zIndex: 0,
  },
});
