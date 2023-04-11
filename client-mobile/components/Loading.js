import {
  Button,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Divider, Badge, Image, Icon } from "@rneui/themed";

export default function Loading() {
  return (
    <View style={styles.container}>
      <Icon name="hourglass-outline" type="ionicon"></Icon>
      <Text>Loading</Text>
      <Text>Please Wait</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
});
