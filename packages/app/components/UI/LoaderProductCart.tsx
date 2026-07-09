'use client'
import React, { useState, useEffect } from "react";
import { View, StyleSheet } from 'react-native'

const isWeb = typeof window !== 'undefined' && window.innerWidth > 768;

const LoaderProductCard = () => {
    const [isShining, setIsShining] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => {
            setIsShining((prev) => !prev);
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    const shimmerStyle = {
        opacity: isShining ? 0.5 : 1,
        transition: 'opacity 1s linear',
    };

    return (
        <View style={[styles.card, shimmerStyle]}>
            <View>
                <View style={styles.imageLoader} />
                
                <View style={[styles.titleLoader, { width: '80%' }]} />
                <View style={[styles.titleLoader, { width: '50%', marginTop: 6 }]} />
            </View>

            <View style={styles.bottomSection}>
                <View style={styles.row}>
                    <View style={styles.priceLoader} />
                    
                    <View style={styles.buttonLoader} />
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        width: isWeb ? '24%' : '48%',
        backgroundColor: '#ffffff',
        borderRadius: 24,
        padding: 16,
        marginBottom: 16,
        borderWidth: 1,
        borderColor: '#f3f4f6',
        justifyContent: 'space-between',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
        elevation: 2,
        height: 320,
    },
    imageLoader: {
        width: '100%',
        height: 180,
        backgroundColor: '#e5e7eb',
        borderRadius: 16,
        marginBottom: 12,
    },
    titleLoader: {
        height: 14,
        backgroundColor: '#e5e7eb',
        borderRadius: 4,
    },
    bottomSection: { 
        marginTop: 12 
    },
    row: { 
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        alignItems: 'center' 
    },
    priceLoader: {
        width: '40%',
        height: 20,
        backgroundColor: '#e5e7eb',
        borderRadius: 6,
    },
    buttonLoader: {
        width: 100,
        height: 32,
        backgroundColor: '#e5e7eb',
        borderRadius: 12,
    },
});

export default LoaderProductCard;