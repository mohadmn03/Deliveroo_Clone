import { View, Text, SafeAreaView, Image } from "react-native";
import React, { useEffect } from "react";
import * as Animatable from "react-native-animatable";
import * as Progress from "react-native-progress";

export default function PreparingOrder({ navigation }) {
  useEffect(() => {
    setTimeout(() => {
      navigation.navigate("Delivery");
    }, 4000);
  }, []);

  return (
    <SafeAreaView className="flex-1 bg-[#00CCBB] items-center justify-center">
      <Animatable.Image
        className="w-80 h-80"
        source={require("../assets/food/orderLoading.gif")}
        animation={"slideInUp"}
        iterationCount={1}
      />
      <Animatable.Text
        className="text-white font-bold text-base mt-14 mb-10"
        animation={"slideInUp"}
        iterationCount={1}
      >
        Waiting for resturant to accept your oreder
      </Animatable.Text>
      <Progress.Circle size={60} color={"white"} indeterminate={true} />
    </SafeAreaView>
  );
}
