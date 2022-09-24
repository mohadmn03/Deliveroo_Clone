import { View, Text, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import CategoryCard from "./CategoryCard";
import sanityClient from "../sanity";

export default function Categories() {
  const [categories, setCategories] = useState([]);
  //
  useEffect(() => {
    sanityClient
      .fetch('* [_type == "category"]')
      .then((data) => setCategories(data))
      .catch((err) => console.log(err));
  }, []);
  //
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ paddingVertical: 10 }}
    >
      {/* Category Card */}
      {categories.map((category) => (
        <CategoryCard
          key={category._id}
          title={category.title}
          imgSource={category.image.asset._ref}
        />
      ))}
    </ScrollView>
  );
}
