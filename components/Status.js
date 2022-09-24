import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { useSelector } from "react-redux";
import Currency from "react-currency-formatter";

export default function status({ navigation, route, title }) {
  const items = useSelector((state) => state.basketReducer.items);
  const basketTotal = useSelector((state) =>
    state.basketReducer.items.reduce((total, item) => {
      return (total += item.price);
    }, 0)
  );
  return (
    items.length > 0 && (
      <TouchableOpacity
        className="w-[390px] mx-3 bg-[#00CCBB] rounded-lg h-14 p-3 z-50 flex-row items-center justify-between absolute bottom-4"
        onPress={() => navigation.navigate("Basket", { title })}
      >
        <Text className="text-white p-1 font-extrabold bg-[#01A296]">
          {items.length}
        </Text>
        <Text className="font-extrabold text-white flex-1 text-center">
          View Basket
        </Text>
        <Text className="font-extrabold text-white">
          <Currency quantity={basketTotal} currency={"USD"} />
        </Text>
      </TouchableOpacity>
    )
  );
}
