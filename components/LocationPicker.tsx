import React, { FC, useEffect, useState } from "react";
import {
  View,
  Button,
  Text,
  ActivityIndicator,
  Alert,
  StyleSheet,
  Image,
} from "react-native";
import { Colors } from "../constants/Colors";
import * as Location from "expo-location";
import * as Permissions from "expo-permissions";
import MapPreview from "./MapPreview";

const verifyPermission = async () => {
  const result = await Permissions.askAsync(Permissions.LOCATION);
  if (result.status !== "granted") {
    Alert.alert("Permission Denied", "You need to grant location permission", [
      {
        text: "Okay",
      },
    ]);

    return false;
  }
  return true;
};

type LocationPickerProps = {
  lat: string;
  lng: String;
};

const LocationPicker: FC<LocationPickerProps & any> = (props: any) => {
  const [pickedLocation, setPickedLocation] = useState<any>();
  const [isFetching, setIsFetching] = useState(false);

  const mapPickedLocation = props.navigation.getParam("pickedLocation");

  useEffect(() => {
    if (mapPickedLocation) {
      setPickedLocation(mapPickedLocation);
      props.onLocationPicked(mapPickedLocation);
    }
  }, [mapPickedLocation]);

  const getLocationHandler = async () => {
    const hasPermission = await verifyPermission();
    if (!hasPermission) {
      return;
    }

    try {
      setIsFetching(true);
      const location = await Location.getCurrentPositionAsync({});
      console.log(location);
      setPickedLocation({
        lat: location.coords.latitude,
        lng: location.coords.longitude,
      });
      props.onLocationPicked({
        lat: location.coords.latitude,
        lng: location.coords.longitude,
      });
    } catch (error) {
      Alert.alert("Not Possible", "Fetching location failed", [
        {
          text: "Okay",
        },
      ]);
    }
    setIsFetching(false);
  };

  const pickOnMap = () => {
    props.navigation.navigate("Map");
  };
  return (
    <View style={styles.locationPicker}>
      <View style={styles.mapPreview}>
        <MapPreview
          style={styles.mapPreview}
          location={pickedLocation}
          onPress={pickOnMap}
        >
          {isFetching ? (
            <ActivityIndicator size="large" color={Colors.primary} />
          ) : (
            <Text>No Location chosen yet</Text>
          )}
        </MapPreview>
      </View>
      <View style={styles.actions}>
        <Button
          onPress={getLocationHandler}
          title="Get user Location"
          color={Colors.primary}
        />
        <Button
          onPress={getLocationHandler}
          title="Pick On Map"
          color={Colors.primary}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  locationPicker: {
    marginBottom: 15,
  },
  mapPreview: {
    marginBottom: 10,
    width: "100%",
    height: 150,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 10,
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
  },
});

export default LocationPicker;
