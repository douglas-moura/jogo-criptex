import 'react-native-gesture-handler'
import { StatusBar } from 'expo-status-bar'
import { StyleSheet } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { JogoProvider } from '../src/context/JogoContext'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useFonts } from 'expo-font'
import { paletaCores } from '../src/styles/StylesGlobal'
import Navegacao from '../src/navigation/Navegacao'

export default function App() {
    const [ fontLoaded ] = useFonts({
        Audiowide: require('../assets/fonts/Audiowide-Regular.ttf'),
        FredokaL: require('../assets/fonts/Fredoka-Light.ttf'),
        FredokaR: require('../assets/fonts/Fredoka-Regular.ttf'),
        FredokaM: require('../assets/fonts/Fredoka-Medium.ttf'),
        FredokaB: require('../assets/fonts/Fredoka-Bold.ttf')
    })

    if (!fontLoaded) return null

    return (
        <SafeAreaView style={styles.container}>
            <JogoProvider>
                <NavigationContainer>
                    <StatusBar
                        style='light'
                        backgroundColor={paletaCores._primario}
                    />
                    <Navegacao />
                </NavigationContainer>
            </JogoProvider>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: '100%',
    },
})
