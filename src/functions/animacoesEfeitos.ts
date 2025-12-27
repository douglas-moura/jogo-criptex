import { Animated } from "react-native"

export const linear = (from: any, to: number) => {
    Animated.timing(from, {
        toValue: to,
        duration: 300,
        delay: 300,
        useNativeDriver: true,
    }).start()
}
