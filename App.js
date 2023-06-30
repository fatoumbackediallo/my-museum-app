import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, StatusBar as S } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import Accueil from "./screens/Accueil";
import Formulaire from "./screens/Formulaire";
import Gestion from "./screens/Gestion";

const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <View style={styles.container}>
      <NavigationContainer>
        <Drawer.Navigator>
          <Drawer.Screen
            name={"accueil"}
            component={Accueil}
            options={{
              headerTitle: "Bienvenue au sein de notre Musée",
              headerTitleAlign: "center",
              headerTitleStyle: {
                color: "#6F1E51",
                fontSize: 15,
              },
              drawerIcon: function () {
                return (
                  <MaterialCommunityIcons
                    name={"home"}
                    size={25}
                    color={"#B53471"}
                  />
                );
              },
            }}
          />
          <Drawer.Screen
            name={"Formulaire"}
            component={Formulaire}
            options={{
              headerTitle: "Ajouter une oeuvre",
              headerTitleAlign: "center",
              headerTitleStyle: {
                color: "#6F1E51",
                fontSize: 25,
              },
              drawerIcon: function () {
                return (
                  <MaterialCommunityIcons
                    name={"form-select"}
                    size={25}
                    color={"#B53471"}
                  />
                );
              },
            }}
          />
          <Drawer.Screen
            name={"Gestion"}
            component={Gestion}
            options={{
              headerTitle: "Gérer vos oeuvres",
              headerTitleAlign: "center",
              headerTitleStyle: {
                color: "#6F1E51",
                fontSize: 25,
              },
              drawerIcon: function () {
                return (
                  <MaterialCommunityIcons
                    name={"content-save-edit"}
                    size={25}
                    color={"#B53471"}
                  />
                );
              },
            }}
          />
        </Drawer.Navigator>
      </NavigationContainer>

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    marginTop: S.currentHeight,
  },
});
