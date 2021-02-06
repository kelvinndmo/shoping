export const ADD_PLACE = "ADD_PLACE";
export const LOAD_PLACES = "LOAD_PLACES";
import * as FileSystem from "expo-file-system";
import { fetchPlaces, insertPlace } from "../helpers/db";

export const addPlace = (values) => {
  return async (dispatch) => {
    const fileName = (values.imageUrl as string).split("/").pop();
    const newPath = FileSystem.documentDirectory + fileName;
    try {
      await FileSystem.moveAsync({
        from: values.imageUrl,
        to: newPath,
      });
      const dbResult: any = await insertPlace(
        values.title,
        newPath,
        "Dummy Adress",
        values.latitude,
        values.longitude
      );

      dispatch({
        type: ADD_PLACE,
        placeData: {
          ...values,
          imageUrl: newPath,
          id: dbResult.insertId,
        },
      });
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  };
};

export const loadPlaces = () => {
  return async (dispatch) => {
    try {
      const dbResult: any = await fetchPlaces();
      console.log("&&&&&&&&&");
      dispatch({ type: LOAD_PLACES, places: dbResult.rows._array });
    } catch (error) {}
  };
};
