import React, { useEffect } from "react";
import { View, Text, StyleSheet, Platform } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { useDispatch, useSelector } from "react-redux";
import CustomHeaderButton from "../components/HeaderButton";
import PlaceItem from "../components/PlaceItem";
import { Place } from "../models/Places";

import * as placesActions from "../store/places-action";

const PlacesListScreen = (props) => {
  const places = useSelector((state: any) => state.places.places);
  console.log(places);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(placesActions.loadPlaces());
  }, []);
  return (
    <FlatList
      data={places}
      keyExtractor={(item: Place) => item.id}
      renderItem={(itemData) => (
        <PlaceItem
          onSelect={() => {
            props.navigation.navigate("PlaceDetail", {
              placeTitle: itemData.item.title,
              placeId: itemData.item.id,
            });
          }}
          title={itemData.item.title}
          address={null}
          image={itemData.item.imageUrl}
        />
      )}
    />
  );
};

PlacesListScreen.navigationOptions = (navData) => {
  return {
    headerTitle: "All Places",
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
        <Item
          title="Add Place"
          iconName={Platform.OS === "ios" ? "md-add" : "ios-add"}
          onPress={() => {
            console.log("DDDDDD");
            navData.navigation.navigate("NewPlace");
          }}
        />
      </HeaderButtons>
    ),
  };
};

const styles = StyleSheet.create({});

export default PlacesListScreen;
