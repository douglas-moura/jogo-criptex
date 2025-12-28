import { Animated } from "react-native"

export const linear = (from: any, to: number, delay?: number) => {
    Animated.timing(from, {
        toValue: to,
        duration: 300,
        delay: delay ? delay : 0,
        useNativeDriver: true,
    }).start()
}

export const shake = (prop: any, intensidade: number, delay?: number) => {
    Animated.sequence([
        Animated.timing(prop, {
            toValue: intensidade,
            duration: 10,
            useNativeDriver: true,
        }),
        Animated.timing(prop, {
            toValue: prop,
            duration: 10,
            useNativeDriver: true,
        }),
        Animated.delay(delay ? delay : 0)
    ]).start()
}