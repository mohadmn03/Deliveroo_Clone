import {
  View,
  Text,
  Image,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from "react-native";
import React, { useEffect, useMemo, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { urlFor } from "../sanity";
import Currency from "react-currency-formatter";
import { removeFromBasket } from "../redux/basketSlice";

export default function Basket({ navigation, route }) {
  const dispatch = useDispatch();
  const resturant = useSelector((state) => state.resturantReducer.resturant);
  const items = useSelector((state) => state.basketReducer.items);
  const [groupedItemsInBasket, setGroupedItemsInBasket] = useState([]);
  //
  useMemo(() => {
    const groupedItems = items.reduce((results, item) => {
      (results[item.name] = results[item.name] || []).push(item);
      return results;
    }, {});
    setGroupedItemsInBasket(groupedItems);
  }, [items]);
  const as = Object.entries(groupedItemsInBasket);
  const totalPrice = as
    .map(([key, item]) => item[0].price * item.length)
    .reduce((total, current) => total + current, 0);
  //
  return (
    <SafeAreaView className="flex-1">
      <View className="bg-white justify-center items-center w-full p-3 border-b border-b-[#00CCBB]">
        <TouchableOpacity
          className="w-9 h-9 z-50 rounded-full items-center justify-center absolute bg-[#00CCBB] right-5"
          onPress={() => navigation.goBack()}
        >
          <Text className="text-white font-bold text-lg">X</Text>
        </TouchableOpacity>
        <Text className="font-bold">Basket</Text>
        <Text className="font-light">{resturant.title}</Text>
      </View>
      <View className="flex-row justify-between items-center bg-white w-full p-3 my-2">
        <Image
          className="w-10 h-10 bg-gray-300 rounded-full"
          source={require("../assets/food/icon/icon130.png")}
        />
        <Text className="flex-1 pl-3">Deliver in 15-30 min</Text>
        <TouchableOpacity>
          <Text className="text-[#00CCBB]">Change</Text>
        </TouchableOpacity>
      </View>
      {/* dishes details */}
      <ScrollView className="divide-y divide-gray-200">
        {as.map(([key, items], i) => (
          <View
            key={i}
            className="flex-row justify-between items-center bg-white w-full p-3 "
          >
            <Text className="pr-5 text-[#00CCBB]">{items.length} x</Text>
            <Image
              className="w-10 h-10 bg-gray-300 rounded-full"
              source={{ uri: urlFor(items[0].image).url() }}
            />
            <Text className="flex-1 px-5">{key}</Text>
            <Text className="pr-5">
              <Currency
                quantity={items[0].price * items.length}
                currency="USD"
              />
            </Text>
            <TouchableOpacity>
              <Text
                className="text-[#00CCBB]"
                onPress={() =>
                  dispatch(removeFromBasket({ name: items[0].name }))
                }
              >
                Remove
              </Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
      <View className="pb-20 bg-white">
        <View className="flex-row justify-between items-center bg-white w-full p-3">
          <Text className="text-gray-500">Subtotal</Text>
          <Text className="text-gray-500">
            <Currency quantity={totalPrice} currency={"USD"} />
          </Text>
        </View>
        <View className="flex-row justify-between items-center bg-white w-full p-3">
          <Text className="text-gray-500">Delivery Free</Text>
          <Text
            className={` ${
              items.length > 0 ? "text-gray-500" : "text-red-200"
            }`}
          >
            <Currency quantity={10} currency={"USD"} />
          </Text>
        </View>
        <View className="flex-row justify-between items-center bg-white w-full p-3">
          <Text className="text-bold">Order Total</Text>
          <Text
            className={`font-extrabold 
            ${items.length > 0 ? "text-black" : "text-red-200"}
            `}
          >
            <Currency quantity={10 + totalPrice} currency={"USD"} />
          </Text>
        </View>
      </View>
      <TouchableOpacity
        disabled={items.length === 0 ? true : false}
        onPress={() => navigation.navigate("PreparingOrder")}
        className={`w-[390px] mx-3 rounded-lg h-14 p-3 z-50 items-center justify-center absolute bottom-4
        ${items.length > 0 ? "bg-[#00CCBB]" : "bg-gray-200"}`}
      >
        <Text className="text-white font-bold ">Place Order</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
