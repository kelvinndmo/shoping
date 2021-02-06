import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import PlacesNavigator from "./navigation/PlacesNavigation";

import { createStore, combineReducers, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";

import placesReducer from "./store/places-reducer";
import { init } from "./helpers/db";

const rootReducer = combineReducers({
  places: placesReducer,
});

init()
  .then(() => {
    console.log("initalized Database");
  })
  .catch((err) => {
    console.log("initializing Db Failed");
    console.log(err);
  });

const store = createStore(rootReducer, applyMiddleware(thunk));

export default function App() {
  return (
    <Provider store={store}>
      <PlacesNavigator />
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
