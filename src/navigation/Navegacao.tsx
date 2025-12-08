import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { createNativeStackNavigator } from "@react-navigation/native-stack"

import HomeScreen from "../../app/pages/HomeScreen"
import AjustesScreen from "../../app/pages/AjustesScreen"
import PartidaScreen from "../../app/pages/PartidaScreen"

const Tab = createBottomTabNavigator()
const Stack = createNativeStackNavigator()

function Tabs() {
    return (
        <Tab.Navigator
            initialRouteName="Home"
            screenOptions={({ route }) => ({
                headerShown: false,
                tabBarActiveTintColor: '#e91e63',
                tabBarInactiveTintColor: '#aaa',
            })}
        >
            <Tab.Screen name="Home" component={HomeScreen} />
            <Tab.Screen name="Ajustes" component={AjustesScreen} />
        </Tab.Navigator>
    )
}

export default function Navegacao() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Tabs" component={Tabs} />
            <Stack.Screen name="Partida" component={PartidaScreen} />
        </Stack.Navigator>
    )
}