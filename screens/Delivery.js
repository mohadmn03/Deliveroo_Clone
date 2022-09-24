import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import React from "react";
import { XMarkIcon } from "react-native-heroicons/solid";
import { useSelector, useDispatch } from "react-redux";
import { removeAllItems } from "../redux/basketSlice";
import * as Animatable from "react-native-animatable";
import * as Progress from "react-native-progress";
import MapView, { Marker } from "react-native-maps";

export default function Delivery({ navigation }) {
  const resturant = useSelector((state) => state.resturantReducer.resturant);
  const dispatch = useDispatch();

  const xDone = () => {
    navigation.navigate("Home");
    dispatch(removeAllItems());
  };
  return (
    <View className="bg-[#00CCBB] flex-1">
      <SafeAreaView>
        <View className="flex-row items-center justify-between p-3">
          <TouchableOpacity onPress={xDone}>
            <XMarkIcon color={"white"} size={26} />
          </TouchableOpacity>
          <Text className="font-light text-white text-base">Order Help</Text>
        </View>
        <View className="p-6 shadow-md bg-white z-50 rounded-md mx-5 my-2">
          <View className="flex-row items-center justify-between">
            <View>
              <Text className="text-lg text-gray-400">Estimated Arrival</Text>
              <Text className="text-4xl font-bold">15-30 Minutes</Text>
            </View>
            <Image
              className="w-16 h-16"
              source={require("../assets/food/livreur.gif")}
            />
          </View>
          <Progress.Bar
            size={60}
            color={"#00CCBB"}
            indeterminate={true}
            className="mt-2 mb-4"
          />
          <Text className="font-bold text-gray-400">
            Your order at {resturant.title} is being prepared
          </Text>
        </View>
      </SafeAreaView>
      <MapView
        initialRegion={{
          latitude: resturant.lat,
          longitude: resturant.long,
          latitudeDelta: 0.005,
          longitudeDelta: 0.005,
        }}
        className="flex-1 -mt-10 -z-10"
        mapType="mutedStandard"
      >
        <Marker
          coordinate={{
            latitude: resturant.lat,
            longitude: resturant.long,
          }}
          title={resturant.title}
          description={resturant.short_description}
          identifier="origin"
          pinColor={"#00CCBB"}
        />
      </MapView>

      <Animatable.View
        className="flex-row items-center bg-white p-3 justify-between pb-6 absolute bottom-0 rounded-t-3xl"
        animation={"slideInUp"}
        iterationCount={1}
      >
        <Image
          className="w-10 h-10 bg-gray-300 rounded-full"
          source={require("../assets/food/icon/icon130.png")}
        />
        <View className="flex-1 pl-3">
          <Text className="font-bold text-base">Taha Debih</Text>
          <Text className="text-gray-400">Your Rider</Text>
        </View>
        <Text className="text-[#00CCBB] font-bold">Call</Text>
      </Animatable.View>
    </View>
  );
}
/*
<View className="flex-row items-center bg-white p-3 justify-between pb-10 absolute bottom-0 rounded-t-3xl">
        <Image
          className="w-10 h-10 bg-gray-300 rounded-full"
          source={require("../assets/food/icon/icon130.png")}
        />
        <View className="flex-1 pl-3">
          <Text className="font-bold text-base">Achraf Djaalab</Text>
          <Text className="text-gray-400">Your Rider</Text>
        </View>
        <Text className="text-[#00CCBB] font-bold">Call</Text>
      </View>
*/
