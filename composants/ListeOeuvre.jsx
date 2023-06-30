import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  FlatList,
} from "react-native";
import React, { useState, useEffect } from "react";
import { db } from "../database/FirebaseConfig";
import { getDocs, collection } from "firebase/firestore";
import AddOeuvre from "./AddOeuvre";

export default function ListeOeuvre({ update, setUpdate }) {
  const [oeuvres, setOeuvres] = useState([]);
  const [id, setId] = useState("");
  useEffect(
    function () {
      getDocs(collection(db, "oeuvres")).then(function (reponse) {
        const resultat = reponse.docs.map(function (doc) {
          return { ...doc.data(), id: doc.id };
        });

        setOeuvres(resultat);
      });
    },
    [update]
  );

  return (
    <View style={{ margin: 10, padding: 5 }}>
      <FlatList
        data={oeuvres}
        renderItem={function ({ item }) {
          return (
            <View>
              {item.id === id ? (
                <AddOeuvre item={item} setUpdate={setUpdate} setId={setId} />
              ) : (
                <View>
                  <Text style={styles.text1}> {item.nom}</Text>
                  <Text style={styles.text}> {item.description}</Text>
                  <Image
                    source={{
                      uri: item.url,
                      width: Dimensions.get("window").width - 40,
                      height: 150,
                    }}
                    resizeMode="contain"
                    fadeDuration={2000}
                  />
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <Text style={styles.text}>Auteur : {item.auteur}</Text>
                    <Text style={styles.text}> {item.date}</Text>
                  </View>
                </View>
              )}
            </View>
          );
        }}
        keyExtractor={function () {
          return Math.random().toString();
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  text1: {
    margin: 5,
    textAlign: "justify",
    fontWeight: "bold",
    fontSize: 20,
  },
  text: {
    margin: 5,
    textAlign: "justify",
  },
});
