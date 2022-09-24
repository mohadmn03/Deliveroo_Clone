import { Image, SafeAreaView, StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./screens/Home";
import Resturant from "./screens/Resturant";
import Basket from "./screens/Basket";
import PreparingOrder from "./screens/PreparingOrder";
import Delivery from "./screens/Delivery";
import { Provider } from "react-redux";
import store from "./redux/store";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Provider store={store}>
        <Stack.Navigator>
          {/* Home */}
          <Stack.Screen name="Home" component={Home} />
          {/* Resturant */}
          <Stack.Screen name="Resturant" component={Resturant} />
          {/* Basket */}
          <Stack.Screen
            name="Basket"
            component={Basket}
            options={{ presentation: "modal", headerShown: false }}
          />
          {/* Preparing Order */}
          <Stack.Screen
            name="PreparingOrder"
            component={PreparingOrder}
            options={{ presentation: "fullScreenModal", headerShown: false }}
          />
          {/* Delivery */}
          <Stack.Screen
            name="Delivery"
            component={Delivery}
            options={{ presentation: "fullScreenModal", headerShown: false }}
          />
        </Stack.Navigator>
      </Provider>
    </NavigationContainer>
  );
}
