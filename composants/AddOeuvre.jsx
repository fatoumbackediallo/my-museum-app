import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { db } from "../database/FirebaseConfig";
import { addDoc, collection } from "firebase/firestore";

export default function AddOeuvre({ setUpdate }) {
  const [oeuvre, setOeuvre] = useState({});

  function add(valeurSaisie, a) {
    const cloneOeuvre = { ...oeuvre };
    cloneOeuvre[a] = valeurSaisie;
    setOeuvre(cloneOeuvre);
  }

  function submit() {
    addDoc(collection(db, "oeuvres"), oeuvre).then(function () {
      alert("Votre oeuvre a été bien ajouté");
      setOeuvre({});
      setUpdate(function (update) {
        return !update;
      });
    });
  }

  return (
    <View>
      <TextInput
        placeholder={"nom oeuvre"}
        onChangeText={function (valeurSaisie) {
          add(valeurSaisie, "nom");
        }}
        value={oeuvre.nom}
        maxLength={255}
        multiline={true}
        style={styles.input}
      />
      <TextInput
        placeholder={"description oeuvre"}
        onChangeText={function (valeurSaisie) {
          add(valeurSaisie, "description");
        }}
        value={oeuvre.description}
        style={styles.input}
        maxLength={10000}
        multiline={true}
      />
      <TextInput
        placeholder={"url image oeuvre"}
        onChangeText={function (valeurSaisie) {
          add(valeurSaisie, "url");
        }}
        value={oeuvre.url}
        maxLength={10000}
        multiline={true}
        style={styles.input}
      />
      <TextInput
        placeholder={"auteur de l'oeuvre"}
        onChangeText={function (valeurSaisie) {
          add(valeurSaisie, "auteur");
        }}
        value={oeuvre.auteur}
        maxLength={255}
        multiline={true}
        style={styles.input}
      />
      <TextInput
        placeholder={"date de l'oeuvre"}
        onChangeText={function (valeurSaisie) {
          add(valeurSaisie, "date");
        }}
        value={oeuvre.date}
        style={styles.input}
      />

      <TouchableOpacity style={styles.boxBtn} onPress={submit}>
        <Text style={styles.text}>Soumettre</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 10,
    margin: 10,
    padding: 10,
  },
  boxBtn: {
    color: "",
    width: "50%",
    alignSelf: "center",
    borderRadius: 5,
    backgroundColor: "#ED4C67",
    margin: 10,
  },
  text: { textAlign: "center", fontSize: 25 },
  titre: {
    textAlign: "center",
    fontSize: 25,
    color: "#6F1E51",
    fontWeight: "bold",
  },
});
