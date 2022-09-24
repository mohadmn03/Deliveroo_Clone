import {
  View,
  Text,
  SafeAreaView,
  Image,
  Button,
  TextInput,
  ScrollView,
} from "react-native";
import React, { useEffect, useLayoutEffect, useState } from "react";
import {
  ChevronDownIcon,
  UserIcon,
  AdjustmentsVerticalIcon,
  MagnifyingGlassIcon,
} from "react-native-heroicons/outline";
import Categories from "../components/Categories";
import FeaturedRow from "../components/FeaturedRow";
import sanityClient from "../sanity";

export default function Home({ navigation }) {
  const [featuredCategories, setFeaturedCategories] = useState([]);
  //
  useEffect(() => {
    sanityClient
      .fetch(
        `*[_type == "featured"]{ ... , resturants[] -> { ... , dishes[] -> ,}}`
      )
      .then((data) => setFeaturedCategories(data))
      .catch((err) => console.log(err));
  }, []);
  //
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);
  //
  return (
    <SafeAreaView>
      {/* Header */}
      <View className="flex-row items-center px-3 py-2">
        <Image
          className="w-10 h-10 bg-gray-300 rounded-full"
          source={require("../assets/food/icon/icon130.png")}
        />
        <View className="flex-1 px-2">
          <Text className="text-gray-400 font-bold text-xs">Deliver now!</Text>
          <Text className="font-bold text-xl">
            Current Location <ChevronDownIcon size={20} color="#00CCBB" />
          </Text>
        </View>
        <UserIcon size={35} color="#00CCBB" />
      </View>
      {/* Search */}
      <View className="flex flex-row px-3 items-center py-2">
        <View className="flex flex-row flex-1 relative p-3 mr-1 items-center space-x-2 bg-gray-200">
          <MagnifyingGlassIcon size={20} color="gray" />
          <TextInput
            className="flex-1"
            placeholder="Resturants and Cuisines"
            keyboardType="default"
          />
        </View>
        <AdjustmentsVerticalIcon size={30} color="#00CCBB" />
      </View>
      {/* Body */}
      <ScrollView
        contentContainerStyle={{ paddingHorizontal: 12, paddingBottom: 130 }}
      >
        {/* Categories */}
        <Categories />
        {/* Featured */}
        {featuredCategories?.map((category) => {
          return (
            <FeaturedRow
              key={category._id}
              id={category._id}
              title={category.name}
              description={category.short_description}
            />
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
}
