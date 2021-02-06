import { Place } from "../models/Places";
import { ADD_PLACE, LOAD_PLACES } from "./places-action";

type PlacesType = {
  places: Place[];
};

const initialState: PlacesType = {
  places: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_PLACE:
      console.log(action);
      const newPlace: Place = {
        id: action.placeData.id,
        title: action.placeData.title,
        imageUrl: action.placeData.imageUrl,
      };
      return {
        places: [...state.places, newPlace],
      };

    case LOAD_PLACES:
      console.log("*******");
      return {
        places: action.places.map((pl) => ({
          id: pl.id.toString(),
          title: pl.title,
          imageUrl: pl.imagUrl,
        })),
      };
  }
  return state;
};
