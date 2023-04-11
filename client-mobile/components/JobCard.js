import { StatusBar } from "expo-status-bar";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  TouchableHighlight,
} from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { ScreenStackHeaderCenterView } from "react-native-screens";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { Card, ListItem, Button } from "react-native-elements";
import { Divider, Badge, Icon } from "@rneui/themed";

export default function JobCard({ job }) {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate("Details", { id: job.id })}
      style={styles.buttonStyle}
      underlayColor="null"
      activeOpacity= {0.9}
    >
      <Card containerStyle={styles.cardStyle}>
        <Card.Title style={{fontSize: 20}}>{job.title}</Card.Title>
        <View>
          <Text style={{fontWeight: 500}}>
            IDR {job.minimumSalary} - {job.maximumSalary}
          </Text>
          <Text>{job.category}</Text>
          <View style={{flex: 1, flexDirection: "row"}}>
            <Text>{job.jobType}</Text>
            <Icon name="git-commit-outline" type="ionicon" 
              style={{marginLeft: 5, marginRight: 5}}
            />
            <Text>
              {job.minimumExperience} - {job.maximumExperience} tahun
            </Text>
          </View>
        </View>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "flex-start",
            marginTop: 0,
            marginBottom: 5,
          }}
        >
          {job.Skills?.map((el, index) => {
            return <Badge value={el.name} status="success" key={index} badgeStyle={{margin: 5, backgroundColor: "blue", height: 24}}/>;
          })}
        </View>

        <View style={styles.vertical}>
          <Divider orientation="vertical" width={5} style={{marginRight: 8}} />
          <View>
            <Text style={{fontSize: 16, fontWeight:"bold"}}>{job.Company.name}</Text>
            <Text>{job.Company.location}, Indonesia</Text>
          </View>
        </View>
        <View>
          <Text style={{fontWeight: 500}}>Posted {job.updatedDate}</Text>
        </View>
      </Card>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  vertical: {
    marginBottom: 10,
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
  },
  cardStyle: {
    width: "100%",
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 1,
    shadowRadius: 10, 
    elevation: 10,
    marginLeft: 0,
    marginTop: 0,
    borderRadius: 10
  },

  buttonStyle: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 1,
    shadowRadius: 10, 
    elevation: 10,
    width: "95%",
    margin: 10,
  }
});
