import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  TouchableOpacity,
  Scrollview,
} from "react-native";
import { onSnapshot, collection } from "firebase/firestore";
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

  //*Values
  //snapshots values
  //location
  const colRef = collection(db, "colors");
  //what to do
  //get every color from the colors(location) and giving it a doc then getting all data and getting id also
  const snapvalue = (snapshot) =>
    setColors(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));

  //*Effect
  //snapshots
  useEffect(() => onSnapshot(colRef, snapvalue), []);

  return (
    <View>
      <TouchableOpacity>
        <Text>New</Text>
      </TouchableOpacity>
      {/*getting every Data in the colorsState and giving it a name of color*/}
      {colors.map((color) => (
        <View style={{ flexDirection: "row" }}>
          <Dot color="#000000" />
          <TouchableOpacity>
            <Text>Edit</Text>
          </TouchableOpacity>
          <Dot color={color.value} />
          <Text>{color.name}</Text>
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
  // dotstyle: {
  //   height: 25,
  //   width: 25,
  //   margin: "0px 10px",
  //   backgroundColor: color,
  //   borderRadius: "50%",
  //   display: "inline-block",
  // },
});
