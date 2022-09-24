import { View, Text, Image, ScrollView, TouchableOpacity } from "react-native";
import React, { useEffect, useLayoutEffect } from "react";
import { urlFor } from "../sanity";
import {
  StarIcon,
  ChevronRightIcon,
  ArrowLeftIcon,
} from "react-native-heroicons/solid";
import {
  MapPinIcon,
  QuestionMarkCircleIcon,
} from "react-native-heroicons/outline";
import DishRow from "../components/DishRow";
import Status from "../components/Status";
import { setResturant } from "../redux/resturantSlice";
import { useDispatch } from "react-redux";

export default function Resturant({ navigation, route }) {
  const dispatch = useDispatch();
  //
  const {
    id,
    imgUrl,
    title,
    reating,
    genre,
    address,
    short_description,
    dishes,
    long,
    lat,
  } = route.params;
  //
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);
  //
  useEffect(() => {
    dispatch(
      setResturant({
        id,
        imgUrl,
        title,
        reating,
        genre,
        address,
        short_description,
        dishes,
        long,
        lat,
      })
    );
  }, [dispatch]);
  return (
    <View>
      <ScrollView className="bg-gray-100">
        <View className="relative bg-white">
          <Image
            className="w-full h-56"
            source={{ uri: urlFor(imgUrl).url() }}
          />
          <TouchableOpacity
            className="absolute bg-gray-100 rounded-full p-2 top-8 left-4"
            onPress={navigation.goBack}
          >
            <ArrowLeftIcon color="#00CCBB" size={20} />
          </TouchableOpacity>
        </View>
        <View className="p-3 pb-0 bg-white">
          <Text className="font-bold text-2xl">{title}</Text>
          <View className="flex-row items-center pt-1 pb-3">
            <StarIcon size={18} color="#00EEAA" opacity={0.6} />
            <Text className="text-gray-500 mx-1">
              <Text className="text-green-500">{reating}</Text> . {genre}
            </Text>
            <MapPinIcon size={18} color="gray" opacity={0.6} />
            <Text className="text-xs text-gray-500 ml-1">
              Nearby . {address}
            </Text>
          </View>
          <Text className="text-gray-500 ">{short_description} </Text>
          <TouchableOpacity className="border-y border-y-gray-200 py-4 mt-3 flex-row items-center ">
            <QuestionMarkCircleIcon color={"gray"} size={20} opacity={0.6} />
            <Text className="font-bold flex-1 pl-1">Have a food allergy?</Text>
            <ChevronRightIcon size={18} color="#00CCBB" />
          </TouchableOpacity>
        </View>
        <View>
          <Text className="font-bold text-lg p-3">Menu</Text>
          {/* Dish Rowes */}
          <View className="bg-white px-3 pb-24">
            {dishes.map((dish) => (
              <DishRow
                key={dish._id}
                id={dish._id}
                name={dish.name}
                description={dish.short_description}
                image={dish.image.asset._ref}
                price={dish.price}
              />
            ))}
          </View>
        </View>
      </ScrollView>
      <Status navigation={navigation} title={title} />
    </View>
  );
}
