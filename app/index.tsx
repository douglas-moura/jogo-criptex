import 'react-native-gesture-handler'
import { StatusBar } from 'expo-status-bar'
import { StyleSheet } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { JogoProvider } from '../src/context/JogoContext'
import { SafeAreaView } from 'react-native-safe-area-context'
import Navegacao from '../src/navigation/Navegacao'

export default function App() {
    return (
        <SafeAreaView style={styles.container}>
            <JogoProvider>
                <NavigationContainer>
                    <StatusBar />
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
