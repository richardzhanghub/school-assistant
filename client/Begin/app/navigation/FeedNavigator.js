import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import DataAnalysisScreen from "../screens/DataAnalysisScreen";
import ListingDetailsScreen from "../screens/ListingDetailsScreen";
import ListingsScreen from "../screens/ListingsScreen";
import ProgressDetailScreen from "../screens/ProgressDetailScreen";
import ScheduleParamScreen from "../screens/ScheduleParamScreen";
import ListingEditScreen from "../screens/ListingEditScreen";
const Stack = createStackNavigator();

const FeedNavigator = () => (
  <Stack.Navigator mode="modal" screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Listings" component={ListingsScreen} />
    <Stack.Screen name="ListingDetails" component={ListingDetailsScreen} />
    <Stack.Screen name="ListingEdit" component={ListingEditScreen} />
    <Stack.Screen name="DataAnalysis" component={DataAnalysisScreen} />
    <Stack.Screen name="ScheduleParam" component={ScheduleParamScreen} />
    <Stack.Screen name="ProgressDetails" component={ProgressDetailScreen} />
  </Stack.Navigator>
);

export default FeedNavigator;
