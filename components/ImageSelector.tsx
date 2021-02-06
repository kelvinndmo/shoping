import React, { useState } from "react";
import { View, Button, Text, StyleSheet, Image, Alert } from "react-native";
import * as Permissions from "expo-permissions";
import { Colors } from "../constants/Colors";

import * as ImagePicker from "expo-image-picker";

const verifyPermission = async () => {
  const result = await Permissions.askAsync(Permissions.MEDIA_LIBRARY);
  if (result.status !== "granted") {
    Alert.alert("Permission Denied", "You need to grant camera permission", [
      {
        text: "Okay",
      },
    ]);

    return false;
  }
  return true;
};

const ImageSelector = (props) => {
  const [pickedImage, setPickedImage] = useState("");
  const takeImageHandler = async () => {
    const hasPermission = await verifyPermission();
    if (!hasPermission) {
      return;
    }
    const image: any = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
    });
    setPickedImage(image.uri);
    props.onImageTaken(image.uri);
  };
  return (
    <View style={styles.imagePicker}>
      <View style={styles.imagePreview}>
        <Text>No Image Picked Yet</Text>
        <Image style={styles.image} source={{ uri: pickedImage }} />
      </View>
      <Button
        color={Colors.primary}
        title="Select Image"
        onPress={takeImageHandler}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  imagePicker: {
    alignItems: "center",
    marginBottom: 15,
  },
  imagePreview: {
    width: "100%",
    height: 200,
    marginBottom: 10,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#ccc",
    borderWidth: 1,
  },
  image: {
    width: "100%",
    height: "100%",
  },
});

export default ImageSelector;
