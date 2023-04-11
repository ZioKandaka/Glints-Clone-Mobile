import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { ScreenStackHeaderCenterView } from "react-native-screens";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { Divider, Badge, Image, Icon } from "@rneui/themed";

export default function Profile() {
  return (
    <View style={styles.container}>
      <Image
        source={{
          uri: "https://radaraktual.com/wp-content/uploads/2022/12/1-potret-kang-dedi-mulyadi-saat-mengunjungi-salah-satu-proyek-di-purwakarta-1.png",
        }}
        style={{ width: 300, height: 150 }}
      />
      <Text style={{ fontSize: 18 }}>Please login to set your profile</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },

  login: {
    backgroundColor: "blue",
    width: 120,
    height: 20,
  },
});
