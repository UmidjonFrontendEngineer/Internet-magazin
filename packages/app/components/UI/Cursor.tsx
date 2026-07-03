'use client'

import { View, StyleSheet, Platform } from 'react-native'
import React, { useState, useEffect } from 'react'

const Cursor = () => {
    const [clientX, setClientX] = useState(0)
    const [clientY, setClientY] = useState(0)
    const ulcham = 10

    useEffect(() => {
        if (Platform.OS !== 'web') return

        const handleMouseMove = (e: MouseEvent) => {
            setClientX(e.clientX)
            setClientY(e.clientY)
        }

        window.addEventListener('mousemove', handleMouseMove)
        return () => {
            window.removeEventListener('mousemove', handleMouseMove)
        }
    }, [])

    if (Platform.OS !== 'web') return null

    return (
        <View 
            style={styles.container} 
            pointerEvents="none"
        >
            <View
                style={[
                    styles.cursor,
                    {
                        width: ulcham * 2,
                        height: ulcham * 2,
                        left: clientX - ulcham,
                        top: clientY - ulcham,
                    }
                ]}
            />
        </View>
    )
}

export default Cursor

const styles = StyleSheet.create({
    container: {
        position: 'fixed' as any,
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 99999999,
    },
    cursor: {
        position: 'absolute' as any,
        backgroundColor: 'rgb(0, 166, 255)',
        borderRadius: 50,
    }
})