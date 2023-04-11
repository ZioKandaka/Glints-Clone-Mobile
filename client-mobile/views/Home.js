import { StatusBar } from "expo-status-bar";
import {
  Button,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { ScreenStackHeaderCenterView } from "react-native-screens";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import JobCard from "../components/JobCard";
import { useQuery } from "@apollo/client";
import { GET_ALL_JOBS } from "../queries";
import Loading from "../components/Loading";

// const jobs = require("../data.json");

export default function Home() {
  const navigation = useNavigation();

  const { loading, error, data } = useQuery(GET_ALL_JOBS);
  // const jobs = data.getJobs

  if(loading) {
    return <Loading />
  }
  // console.log(data.getJobs[0], "INI DATANYA")

  return (
    <View style={styles.container}>

      <FlatList
        data={data.getJobs}
        renderItem={({ item }) => (
          <JobCard job={item}  />
        )}
        keyExtractor={(item) => item.id}
        style={{ backgroundColor: "#f0efed", width: "100%" }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "red",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
});
