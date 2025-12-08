import 'react-native-gesture-handler'
import { StatusBar } from 'expo-status-bar'
import { StyleSheet } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { JogoProvider } from '../src/context/JogoContext'
import Navegacao from '../src/navigation/Navegacao'

export default function App() {
    return (
        <JogoProvider>
            <NavigationContainer>
                <StatusBar />
                <Navegacao />
            </NavigationContainer>
        </JogoProvider>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
})
