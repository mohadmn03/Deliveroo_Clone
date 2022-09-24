import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import { urlFor } from "../sanity";

export default function CategoryCard({ imgSource, title }) {
  return (
    <TouchableOpacity className="mr-2 relative">
      <Image className="w-24 h-24" source={{ uri: urlFor(imgSource).url() }} />
      <Text className="absolute bottom-1 left-1 text-white font-bold">
        {title}
      </Text>
    </TouchableOpacity>
  );
}
