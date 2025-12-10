import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { createNativeStackNavigator } from "@react-navigation/native-stack"

import HomeScreen from "../../app/pages/HomeScreen"
import ContaScreen from "../../app/pages/ContaScreen"
import PartidaScreen from "../../app/pages/PartidaScreen"
import ParabensScreen from "../../app/pages/ParabensScreen"

const Tab = createBottomTabNavigator()
const Stack = createNativeStackNavigator()

function Tabs() {
    return (
        <Tab.Navigator
            initialRouteName="Jogar"
            screenOptions={({ route }) => ({
                headerShown: false,
                tabBarActiveTintColor: '#e91e63',
                tabBarInactiveTintColor: '#aaa',
            })}
        >
            <Tab.Screen name="Jogar" component={HomeScreen} />
            <Tab.Screen name="Minha Conta" component={ContaScreen} />
        </Tab.Navigator>
    )
}

export default function Navegacao() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Tabs" component={Tabs} />
            <Stack.Screen name="Partida" component={PartidaScreen} />
            <Stack.Screen name="Parabens" component={ParabensScreen} />
        </Stack.Navigator>
    )
}