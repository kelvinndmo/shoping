import { useFormik } from "formik";
import React, { useCallback } from "react";
import { ScrollView, View, Text, StyleSheet, Button } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { useDispatch } from "react-redux";
import ImageSelector from "../components/ImageSelector";
import LocationPicker from "../components/LocationPicker";
import { Colors } from "../constants/Colors";
import * as placesActions from "../store/places-action";

const NewPlaceScreen = (props) => {
  const dispatch = useDispatch();
  const { handleSubmit, setFieldValue } = useFormik({
    initialValues: {
      title: "",
      imageUrl: "",
      latitude: "",
      longitude: "",
    },
    onSubmit: (values) => {
      console.log(values);
      dispatch(placesActions.addPlace(values));

      props.navigation.navigate("Places");
    },
  });

  const onLocationPicked = useCallback((pickedLocation) => {
    setFieldValue("latitude", pickedLocation.lat);
    setFieldValue("longitude", pickedLocation.lng);
  }, []);

  return (
    <ScrollView>
      <View style={styles.form}>
        <Text style={styles.label}>Title</Text>
        <TextInput
          style={styles.textInput}
          autoCorrect={false}
          onChangeText={(value) => {
            setFieldValue("title", value);
          }}
        />
        <ImageSelector
          onImageTaken={(value) => {
            setFieldValue("imageUrl", value);
          }}
        />
        <LocationPicker
          navigation={props.navigation}
          onLocationPicked={onLocationPicked}
        />
        <Button
          title="Save Place"
          color={Colors.primary}
          onPress={() => {
            handleSubmit();
          }}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  textInput: {
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
    marginBottom: 15,
    paddingVertical: 4,
    paddingHorizontal: 2,
  },
  label: {
    fontSize: 18,
    marginBottom: 15,
  },
  form: {
    margin: 30,
  },
});

export default NewPlaceScreen;
