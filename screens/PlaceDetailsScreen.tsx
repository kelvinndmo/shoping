import React from "react";
import { View, Text, StyleSheet } from "react-native";

const PlaceDetailsScreen = () => {
  return (
    <View>
      <Text>Places Details</Text>
    </View>
  );
};

PlaceDetailsScreen.navigationOptions = (navData) => {
  return {
    headerTitle: navData.navigation.getParam("placeTitle"),
  };
};
const styles = StyleSheet.create({});

export default PlaceDetailsScreen;
