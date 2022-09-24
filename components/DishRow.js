import { View, Text, Image, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { urlFor } from "../sanity";
import { PlusCircleIcon, MinusCircleIcon } from "react-native-heroicons/solid";
import Currency from "react-currency-formatter";
import { useSelector, useDispatch } from "react-redux";
import {
  addToBasket,
  removeFromBasket,
  selectBasketItems,
} from "../redux/basketSlice";
import Status from "../components/Status";

export default function DishRow({ id, name, description, image, price }) {
  const [isPressed, setIsPressed] = useState(false);
  //
  const items = useSelector((state) =>
    state.basketReducer.items.filter((item) => item.id === id)
  );
  const dispatch = useDispatch();
  const addItemToBasket = () => {
    dispatch(addToBasket({ id, name, description, image, price }));
  };
  const removeItemFromBasket = () => {
    if (items.length <= 0) {
      return;
    }
    dispatch(removeFromBasket({ name: name }));
  };
  return (
    <View>
      <TouchableOpacity
        className={`flex-row items-center py-1 border-b border-gray-100 ${
          isPressed && "border-b-0"
        }`}
        onPress={() => setIsPressed(!isPressed)}
      >
        <View className="flex-1 ">
          <Text className="text-lg font-light">{name}</Text>
          <Text className="text-gray-400">{description}</Text>
          <Text className="text-gray-400 py-1">
            <Currency quantity={price} currency="USD" />
          </Text>
        </View>
        <Image
          className="w-16 h-16 rounded-sm border border-gray-300 bg-gray-300"
          source={{ uri: urlFor(image).url() }}
        />
      </TouchableOpacity>
      {isPressed && (
        <View className="flex-row items-center">
          <MinusCircleIcon
            color={items.length > 0 ? "#00CCBB" : "gray"}
            size={40}
            disabled={items.length <= 0 ? true : false}
            onPress={removeItemFromBasket}
          />
          <Text className="px-2">{items.length}</Text>
          <PlusCircleIcon
            color={"#00CCBB"}
            size={40}
            onPress={addItemToBasket}
          />
        </View>
      )}
    </View>
  );
}
