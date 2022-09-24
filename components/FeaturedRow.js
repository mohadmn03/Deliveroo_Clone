import { View, Text, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { ArrowRightIcon } from "react-native-heroicons/outline";
import ResturantCard from "./ResturantCard";
import sanityClient from "../sanity";

export default function FeaturedRow({ navigation, id, title, description }) {
  const [resturants, setResturants] = useState([]);
  useEffect(() => {
    sanityClient
      .fetch(
        `* [_type == "featured" && _id == $id]{...,resturants[] -> {..., dishes[] -> , type->{name}}}[0]`,
        { id: id }
      )
      .then((data) => setResturants(data?.resturants))
      .catch((err) => console.log(err));
  }, [id]);
  //
  return (
    <View className="py-2">
      <View className="flex flex-row items-center justify-between">
        <Text className="font-bold text-lg">{title}</Text>
        <ArrowRightIcon color="#00CCBB" />
      </View>
      <Text className="font-light text-gray-500 text-xs">{description}</Text>
      {/*  */}
      <ScrollView
        contentContainerStyle={
          {
            // paddingHorizontal: 15,
          }
        }
        showsHorizontalScrollIndicator={false}
        horizontal
        className="pt-4"
      >
        {/* Resturant Cards */}
        {resturants?.map((resturant) => (
          <ResturantCard
            key={resturant._id}
            id={resturant._id}
            imgUrl={resturant.image.asset._ref}
            title={resturant.name}
            short_description={resturant.short_description}
            reating={resturant.rating}
            address={resturant.address}
            genre={resturant.type.name}
            dishes={resturant.dishes}
            long={resturant.long}
            lat={resturant.lat}
          />
        ))}
      </ScrollView>
    </View>
  );
}
