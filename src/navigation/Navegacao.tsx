import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { useEffect, useState } from "react"
import { temas } from "../styles/StylesGlobal"
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
    const [ temaAtivo, setTemaAtivo ] = useState(temas.light)

    useEffect(() => {
        setTemaAtivo(prefTema ? temas.dark : temas.light)
    }, [prefTema])

    return (
        <Tab.Navigator
            initialRouteName="Jogar"
            screenOptions={({ route }) => ({
                headerShown: false,
                tabBarActiveTintColor: '#e91e63',
                tabBarInactiveTintColor: '#aaa',
                tabBarStyle: {
                    backgroundColor: temaAtivo.backgroundColor
                },
                //tabBarActiveBackgroundColor: temaAtivo.backgroundColor,
                //tabBarInactiveBackgroundColor: temaAtivo.backgroundColor,
                tabBarIcon: ({ focused, color, size }) => {
                    type IconName = keyof typeof Ionicons.glyphMap
                    let iconName: IconName = 'help-circle-outline'

                    if (route.name === 'Jogar') {
                        iconName = focused ? 'play' : 'play-outline'
                    } else if (route.name === 'Minha Conta') {
                        iconName = focused ? 'person' : 'person-outline'
                    } else {
                        iconName = 'help-circle-outline'
                    }

                    return <Ionicons style={{}} name={iconName} size={size} color={color} />
                }
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