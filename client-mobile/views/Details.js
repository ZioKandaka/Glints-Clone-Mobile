import { StatusBar } from "expo-status-bar";
import {
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { ScreenStackHeaderCenterView } from "react-native-screens";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { Divider, Badge, Image, Icon } from "@rneui/themed";
import { useQuery } from "@apollo/client";
import { GET_JOB_BY_ID } from "../queries/index.js";
import Loading from "../components/Loading.js";

export default function Details(routes) {
  //   console.log(JSON.stringify(routes.route))
  let id = routes.route.params.id;
  const { loading, error, data } = useQuery(GET_JOB_BY_ID, {
    variables: { getJobDetailId: +id },
  });
  console.log(id);

  if (loading) {
    return <Loading />;
  }
  //   let job = data.getJobDetail;
  console.log(data.getJobDetail);
  return (
    <View style={{ flex: 1 }}>
      <ScrollView style={styles.layout}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Image
              source={{ uri: data.getJobDetail.Company.companyLogo }}
              style={{ width: 100, height: 100 }}
            />
          </View>
          <View
            style={{ marginLeft: 10, flex: 1, justifyContent: "space-evenly" }}
          >
            <Text style={{ fontSize: 20 }}>{data.getJobDetail.title}</Text>
            <Text style={{ color: "blue", fontSize: 17 }}>
              {data.getJobDetail.Company.name}
            </Text>
            <Text style={{ fontSize: 17 }}>
              {data.getJobDetail.Company.location}, Indonesia
            </Text>
          </View>
        </View>
        <Divider width={3} style={styles.divider} />

        {/* Job summary */}
        <View>
          <View style={styles.summary}>
            <Icon name="cash-outline" type="ionicon"></Icon>
            <Text style={{ marginLeft: 10 }}>
              IDR {data.getJobDetail.minimumSalary} -{" "}
              {data.getJobDetail.maximumSalary}
            </Text>
          </View>
          <View style={styles.summary}>
            <Icon name="business-outline" type="ionicon" />
            <Text style={{ marginLeft: 10 }}>{data.getJobDetail.category}</Text>
          </View>
          <View style={styles.summary}>
            <Icon name="receipt-outline" type="ionicon" />
            <Text style={{ marginLeft: 10 }}>{data.getJobDetail.jobType}</Text>
          </View>
          <View style={styles.summary}>
            <Icon name="briefcase-outline" type="ionicon" />
            <Text style={{ marginLeft: 10 }}>
              {data.getJobDetail.minimumExperience} -{" "}
              {data.getJobDetail.maximumExperience} tahun pengalaman
            </Text>
          </View>
          <View style={styles.summary}>
            <Icon name="time-outline" type="ionicon" />
            <Text style={{ marginLeft: 10 }}>
              Diperbarui pada {data.getJobDetail.updatedDate}
            </Text>
          </View>
        </View>
        <Divider width={3} style={styles.divider} />

        {/* Job description */}
        <View>
          <Text style={{ fontSize: 20, marginBottom: 8 }}>
            Deskripsi pekerjaan
          </Text>
          <Text style={{ textAlign: "justify" }}>
            {data.getJobDetail.description}
          </Text>
        </View>
        <Divider width={3} style={styles.divider} />

        {/* Tunjangan dan keuntungan */}
        <View>
          <Text style={{ fontSize: 20, marginBottom: 8 }}>
            Tunjangan dan keuntungan
          </Text>

          <View
            style={{
              flex: 1,
              flexDirection: "row",
              justifyContent: "space-around",
            }}
          >
            <View style={styles.tunjangan}>
              <Icon name="people-outline" type="ionicon" />
              <Text style={{ textAlign: "center" }}>Jam kerja fleksibel</Text>
            </View>
            <View style={styles.tunjangan}>
              <Icon name="medical-outline" type="ionicon" />
              <Text style={{ textAlign: "center" }}>Asuransi kesehatan</Text>
            </View>
          </View>

          <View
            style={{
              flex: 1,
              flexDirection: "row",
              justifyContent: "space-around",
            }}
          >
            <View style={styles.tunjangan}>
              <Icon name="bar-chart-outline" type="ionicon" />
              <Text style={{ textAlign: "center" }}>Pertumbuhan karir</Text>
            </View>
            <View style={styles.tunjangan}>
              <Icon name="airplane-outline" type="ionicon" />
              <Text style={{ textAlign: "center" }}>Paid leave</Text>
            </View>
          </View>
        </View>
        <Divider width={3} style={styles.divider} />
      </ScrollView>

      {/* Lamar button */}
      <View style={styles.containerLamar}>
        <TouchableOpacity style={styles.lamar}>
          <Text style={{textAlign: "center", color: "white"}}>LAMAR</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.save}>
          <Icon name="bookmark-outline" type="ionicon"></Icon>
        </TouchableOpacity>
      </View>
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

  header: {
    flex: 1,
    flexDirection: "row",
  },

  layout: {
    padding: 18,
    backgroundColor: "white",
    flex: 1,
  },

  divider: {
    marginBottom: 20,
    marginTop: 20,
  },

  summary: {
    marginBottom: 5,
    marginTop: 5,
    flex: 1,
    flexDirection: "row",
  },

  tunjangan: {
    // flex: 1,
    // justifyContent: "center",
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 20,
    marginRight: 20,
    width: 100,
  },

  containerLamar: {
    flex: 0.13,
    marginBottom: 20,
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
  },

  lamar: {
    flex: 8,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "black",
    height: 50,
    marginLeft: 40,
    borderRadius: 10
  },

  save: {
    flex: 2,
    marginRight: 30,
    marginLeft: 20,
    borderColor: "black",
    borderWidth: 1,
    height: 50,
    justifyContent: "center",
    borderRadius: 10
  }
});
