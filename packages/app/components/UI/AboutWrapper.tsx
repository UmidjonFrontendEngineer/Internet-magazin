'use client'

import React, { useState, useEffect } from 'react'
import { ScrollView, StyleSheet, View, useWindowDimensions } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import AboutItem from 'app/components/UI/AboutItem'

interface ScreenWrapperProps {
    children: React.ReactNode
    paddingTop?: number
}

export default function ScreenWrapper({ children, paddingTop = 120 }: ScreenWrapperProps) {
    let insets = { bottom: 0, top: 0 }

    try {
        const hookInsets = useSafeAreaInsets()
        if (hookInsets) {
            insets = hookInsets
        }
    } catch (error) {
    }

    const { width: windowWidth } = useWindowDimensions()
    const [isHydrated, setIsHydrated] = useState(false)

    useEffect(() => {
        setIsHydrated(true)
    }, [])

    const currentWidth = isHydrated ? windowWidth : 1200
    function isMobile() {
        const isMobileView = currentWidth < 1000
        return isMobileView
    }

    return (
        <ScrollView
            style={styles.scroll}
            contentContainerStyle={[
                styles.scrollContent,
                { paddingBottom: insets.bottom || 20 }
            ]}
        >
            <View style={[styles.mainBody, { paddingTop }]}>
                {children}
            </View>
            <AboutItem />
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    scroll: {
        flex: 1,
        backgroundColor: '#fff',
        widht: '100%',
        aligntItems: 'center',
        flexDirection: 'row',
    },
    scrollContent: {
        flexGrow: 1,
        justifyContent: 'space-between',
    },
    mainBody: {
        flex: 1,
    },
})