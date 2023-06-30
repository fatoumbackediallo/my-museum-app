import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  FlatList,
  Button,
} from "react-native";
import React, { useState, useEffect } from "react";
import { db } from "../database/FirebaseConfig";
import { getDocs, collection, doc, deleteDoc } from "firebase/firestore";
import ModifOeuvre from "./ModifOeuvre";

export default function EditOeuvre({ update, setUpdate }) {
  const [oeuvre, setOeuvre] = useState([]);
  const [id, setId] = useState("");

  useEffect(
    function () {
      getDocs(collection(db, "oeuvres")).then(function (reponse) {
        const resultat = reponse.docs.map(function (doc) {
          return { ...doc.data(), id: doc.id };
        });
        setOeuvre(resultat);
      });
    },
    [update]
  );

  function supprimer(id) {
    deleteDoc(doc(db, "oeuvres", id)).then(function () {
      setUpdate(function (update) {
        return !update;
      });
      alert("l'oeuvre a bien été supprimée de la bdd");
    });
  }

  return (
    <View>
      <FlatList
        data={oeuvre}
        renderItem={function ({ item }) {
          return (
            <View>
              {item.id === id ? (
                <ModifOeuvre item={item} setUpdate={setUpdate} setId={setId} />
              ) : (
                <View>
                  <Text style={styles.text1}>{item.nom}</Text>
                  <Text style={styles.text}> {item.description}</Text>
                  <Image
                    source={{
                      uri: item.url,
                      width: Dimensions.get("window").width - 50,
                      height: 150,
                    }}
                    resizeMode="contain"
                    fadeDuration={2000}
                  />
                  <Text style={styles.text}>auteur : {item.auteur}</Text>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-around",
                      margin: 7,
                    }}
                  >
                    <Button
                      title={"modifier"}
                      onPress={function () {
                        setId(item.id);
                      }}
                      color={"#009432"}
                    />
                    <Button
                      title={"supprimer"}
                      onPress={function () {
                        supprimer(item.id);
                      }}
                      color={"#EA2027"}
                    />
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
    textAlign: "justify",
  },
});
