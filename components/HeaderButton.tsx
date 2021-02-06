import React, { FC } from "react";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Platform } from "react-native";
import {
  HeaderButton,
  HeaderButtonProps,
} from "react-navigation-header-buttons";
import { Colors } from "../constants/Colors";

const CustomHeaderButton: FC<HeaderButtonProps> = (
  props: HeaderButtonProps
) => {
  return (
    <HeaderButton
      {...props}
      IconComponent={Ionicons}
      iconSize={23}
      title="Headers"
      color={Platform.OS === "android" ? "white" : Colors.primary}
    />
  );
};

const styles = StyleSheet.create({});

export default CustomHeaderButton;
