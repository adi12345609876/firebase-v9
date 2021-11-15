import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  TouchableOpacity,
  TextInput,
  Scrollview,
} from "react-native";
import {
  onSnapshot,
  collection,
  doc,
  setDoc,
  addDoc,
  deleteDoc,
  where,
  query,
  getDocs,
  serverTimestamp,
  orderBy,
} from "firebase/firestore";
import db from "./fireConfig";

//this is the dot
const Dot = ({ color }) => {
  const style = {
    height: 25,
    width: 25,
    margin: 10,
    backgroundColor: color,
    borderRadius: "50%",
    display: "inline-block",
  };
  return <View style={style}></View>;
};

export default function App() {
  //*States
  const [colors, setColors] = useState([{ name: "Loading...", id: "initial" }]);
  const [newname, setNewname] = useState("");
  const [newvalue, setNewvalue] = useState("");
  //*Values
  //snapshots values
  //location
  const colRef = collection(db, "colors");

  //what to do
  //get every color from the colors(location) and giving it a doc then getting all data and getting id also
  const snapvalue = (snapshot) => {
    setColors(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  //*Effect
  //snapshots
  useEffect(() => {
    const q = query(colRef, orderBy("Time", "desc"));

    const unsub = onSnapshot(q, snapvalue);
    return unsub;
  }, []);
  //*functions
  //add color
  const addColor = async () => {
    const values = {
      name: newname,
      value: newvalue,
      Time: serverTimestamp(),
    };
    const DocRef = await addDoc(colRef, values);
  };
  const CustomDoc = async () => {

    await setDoc(doc(db, "colors", "customidcreated"), {
      name: "Custom id name",
     value:"#e0e",
     Time:serverTimestamp(),
      
    });
  };
  const editColor = async (id) => {
    const docRef = doc(db, "colors", id);
    const values = {
      name: newname,
      value: newvalue,
      Time: serverTimestamp(),
    };
    await setDoc(docRef, values);
  };
  const DeleteColor = async (id) => {
    const docRef = doc(db, "colors", id);
    await deleteDoc(docRef);
  };
  const QueryDelete = async (id) => {
    const collectionRef = collection(db, "colors");
    const q = query(collectionRef, where("name", "==", newname));

    const namesdata = await getDocs(q);
    const results = namesdata.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
    console.log(results);
    //mapping results
    results.forEach(async (result) => {
      const docRef = doc(db, "colors", result.id);
      await deleteDoc(docRef);
    });
  };

  return (
    <View>
      <TextInput
        style={{ height: 40, borderColor: "gray", borderWidth: 1 }}
        onChangeText={(text) => setNewname(text)}
      />
      <TextInput
        style={{ height: 40, borderColor: "gray", borderWidth: 1 }}
        onChangeText={(value) => setNewvalue(value)}
      />
      <Text>{newname}</Text>
      <Text>{newvalue}</Text>
      <TouchableOpacity style={styles.box} onPress={addColor}>
        <Text style={styles.buttontext}>New</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.box} onPress={CustomDoc}>
        <Text style={styles.buttontext}>create CustomDoc id</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.box} onPress={QueryDelete}>
        <Text style={styles.buttontext}>DeleteByName</Text>
      </TouchableOpacity>
      {/*getting every Data in the colorsState and giving it a name of color*/}
      {colors.map((color) => (
        <View
          style={{
            flexDirection: "row",
            backgroundColor: color.value,
            justifyContent: "space-evenly",
          }}
        >
          {/* <Dot color="#000000" /> */}
          {/* <Dot color={color.value} /> */}
          <Text>{color.name}</Text>
          <TouchableOpacity
            style={styles.box}
            onPress={() => DeleteColor(color.id)}
          >
            <Text style={styles.buttontext}>Delete</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.box}
            onPress={() => editColor(color.id)}
          >
            <Text style={styles.buttontext}>Edit</Text>
          </TouchableOpacity>
        </View>
      ))}
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
  box: {
    backgroundColor: "#000000",
    width: 100,
    height: 25,
    borderRadius: 10,
  },
  buttontext: {
    color: "#ffffff",
    fontSize: 10,
    textAlign: "center",
  },
});

