'use client'

import React, { useState, useEffect } from 'react'
import { ScrollView, StyleSheet, View, useWindowDimensions, Platform } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import Footer from 'app/components/layout/footer/Footer'

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
    const isMobileView = currentWidth < 1000

    return (
        <View style={styles.outerContainer}>
            <ScrollView
                style={[
                    styles.scroll, 
                    { 
                        maxWidth: 1400, 
                        width: '100%' 
                    }
                ]}
                contentContainerStyle={[
                    styles.scrollContent,
                    { paddingBottom: insets.bottom || 20 }
                ]}
                showsVerticalScrollIndicator={false}
            >
                <View style={[styles.mainBody, { paddingTop }]}>
                    {children}
                </View>
                <Footer />
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    outerContainer: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
    },
    scroll: {
        flex: 1,
        backgroundColor: '#fff',
        paddingHorizontal: Platform.OS === 'web' ? 20 : 10,
    },
    scrollContent: {
        flexGrow: 1,
        justifyContent: 'space-between',
    },
    mainBody: {
        flex: 1,
        width: '100%',
    },
})