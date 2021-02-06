import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import MapScreen from "../screens/MapScreen";
import NewPlaceScreen from "../screens/NewPlaceScreen";
import PlaceDetailsScreen from "../screens/PlaceDetailsScreen";
import PlacesListScreen from "../screens/PlacesListScreen";
import { Colors } from "../constants/Colors";
import { Platform } from "react-native";

const PlacesNavigator = createStackNavigator(
  {
    Places: PlacesListScreen,
    PleaceDetail: PlaceDetailsScreen,
    NewPlace: NewPlaceScreen,
    Map: MapScreen,
  },
  {
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: Platform.OS === "android" ? Colors.primary : "",
      },
      headerTintColor: Platform.OS === "ios" ? Colors.primary : "white",
    },
  }
);

export default createAppContainer(PlacesNavigator);
