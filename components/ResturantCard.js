import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import { StarIcon } from "react-native-heroicons/solid";
import { MapPinIcon } from "react-native-heroicons/outline";
import { urlFor } from "../sanity";
import { useNavigation } from "@react-navigation/native";

export default function ResturantCard({
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
}) {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      className="rounded-sm shadow  mr-2"
      onPress={() =>
        navigation.navigate("Resturant", {
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
      }
    >
      <Image
        className="w-60 h-36 rounded-t-sm"
        source={{ uri: urlFor(imgUrl).url() }}
      />
      <View className="bg-white p-4 rounded-b-sm">
        <Text className="text-lg">{title}</Text>
        <View className="flex-row items-center py-1 gap-1 ">
          <StarIcon size={20} color="#00CCBB" opacity={0.6} />
          <Text className="text-gray-500">
            <Text style={{ color: "#00CCBB" }}>{reating}</Text> . {genre}
          </Text>
        </View>
        <View className="flex-row items-center gap-1 ">
          <MapPinIcon size={20} color="#00CCBB" opacity={0.6} />
          <Text className="text-xs text-gray-500">Nearby . {address}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}
