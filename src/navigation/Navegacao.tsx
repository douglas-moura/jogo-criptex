import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { temas, paletaCores } from "../styles/StylesGlobal"
import { useJogo } from "../context/JogoContext"
import { Ionicons } from '@expo/vector-icons'
import HomeScreen from "../../app/pages/HomeScreen"
import ContaScreen from "../../app/pages/ContaScreen"
import PartidaScreen from "../../app/pages/PartidaScreen"
import ParabensScreen from "../../app/pages/ParabensScreen"

const Tab = createBottomTabNavigator()
const Stack = createNativeStackNavigator()

function Tabs() {
    const { prefTema } = useJogo()
    const temaAtivo = prefTema ? temas.dark : temas.light

    return (
        <Tab.Navigator
            initialRouteName="Início"
            screenOptions={({ route }) => ({
                headerShown: false,
                animation: 'shift',
                tabBarActiveTintColor: paletaCores._primario,
                tabBarInactiveTintColor: paletaCores._cinza_2,
                tabBarStyle: {
                    backgroundColor: temaAtivo._bgPagina.backgroundColor,
                    //paddingVertical: 12,
                    borderTopWidth: 0,
                    height: 80,
                },
                tabBarLabelStyle: {
                    fontSize: 12,
                    fontFamily: 'FredokaM'
                },
                tabBarItemStyle: {
                    paddingVertical: 8,
                    justifyContent: 'center',
                    alignItems: 'center',
                },
                tabBarIconStyle: {
                    justifyContent: 'center',
                    alignItems: 'center',
                },
                tabBarIcon: ({ focused, color, size }) => {
                    type IconName = keyof typeof Ionicons.glyphMap
                    let iconName: IconName = 'help-circle-outline'

                    if (route.name === 'Início') {
                        iconName = focused ? 'home' : 'home-outline'
                    } else if (route.name === 'Minha Conta') {
                        iconName = focused ? 'person' : 'person-outline'
                    } else {
                        iconName = 'help-circle-outline'
                    }

                    return <Ionicons name={iconName} size={size} color={color} />
                }
            })}
        >
            <Tab.Screen name="Início" component={HomeScreen} />
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