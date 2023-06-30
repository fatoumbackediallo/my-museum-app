import { StyleSheet, View, TextInput, Button } from "react-native";
import React, { useState } from "react";
import { db } from "../database/FirebaseConfig";
import { doc, updateDoc } from "firebase/firestore";

export default function ModifOeuvre({ item, setId, setUpdate }) {
  const [oeuvre, setOeuvre] = useState(item);

  function modifierOeuvre(valeurSaisie, nom) {
    const cloneOeuvre = { ...oeuvre };
    cloneOeuvre[nom] = valeurSaisie;
    setOeuvre(cloneOeuvre);
  }

  function submit(id) {
    updateDoc(doc(db, "oeuvres", id), oeuvre).then(function () {
      setOeuvre({});
      setId("");
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
      <View>
        <Button
          title={"Change"}
          onPress={function () {
            submit(oeuvre.id);
          }}
          color={"#D980FA"}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    borderColor: "black",
    borderWidth: 1,
    marginBottom: 20,
    padding: 10,
    borderRadius: 10,
  },
});
