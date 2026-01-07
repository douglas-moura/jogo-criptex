import { Animated, Easing } from "react-native"

export const linear = (from: any, to: number, delay?: number) => {
    Animated.timing(from, {
        toValue: to,
        duration: 300,
        delay: delay ? delay : 0,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
    }).start()
}

export const shake = (prop: any, intensidade: number, delay?: number) => {
    Animated.sequence([
        Animated.delay(delay ?? 0),
        Animated.timing(prop, {
            toValue: intensidade,
            duration: 50,
            easing: Easing.out(Easing.ease),
            useNativeDriver: true,
        }),
        Animated.timing(prop, {
            toValue: prop,
            duration: 50,
            easing: Easing.out(Easing.ease),
            useNativeDriver: true,
        }),
    ]).start()
}