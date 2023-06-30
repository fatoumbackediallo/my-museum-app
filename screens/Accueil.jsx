import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import ListeOeuvre from "../composants/ListeOeuvre";

export default function Accueil() {
  const [update, setUpdate] = useState(true);

  return (
    <View>
      <Text style={styles.titre}>Découvrez nos oeuvres</Text>
      <ListeOeuvre />
    </View>
  );
}

const styles = StyleSheet.create({
  titre: {
    textAlign: "center",
    fontSize: 24,
    color: "#6F1E51",
    margin: 10,
    fontWeight: "bold",
  },
});
