'use client'
import React, { useState, useEffect } from "react";
import { View, StyleSheet } from 'react-native'

const isWeb = typeof window !== 'undefined' && window.innerWidth > 768;

const LoaderCart = () => {
    const [isShining, setIsShining] = useState(false);

    // Yonib-o'chish (Shimmer) effekti sikli
    useEffect(() => {
        const interval = setInterval(() => {
            setIsShining((prev) => !prev);
        }, 1000); 

        return () => clearInterval(interval);
    }, []);

    const shimmerStyle = {
        opacity: isShining ? 0.5 : 1,
        transition: 'opacity 1s linear', // Web platformasi uchun silliq o'tish
    };

    return (
        <View style={[styles.card, shimmerStyle]}>
            {/* Chap tomon: Rasm joyi */}
            <View style={styles.leftSection}>
                <View style={styles.imageLoader} />
            </View>

            {/* O'ng tomon: Ma'lumotlar loaderi */}
            <View style={styles.rightSection}>
                <View style={styles.headerRow}>
                    {/* Sarlavha o'rniga loader chiziqlar */}
                    <View style={styles.titleWrapper}>
                        <View style={[styles.lineLoader, { width: '90%' }]} />
                        <View style={[styles.lineLoader, { width: '60%', marginTop: 6 }]} />
                    </View>
                    
                    {/* O'chirish tugmasi loaderi */}
                    <View style={styles.deleteLoader} />
                </View>

                {/* Qo'shimcha ma'lumotlar (Sotuvchi, Kategoriya) */}
                <View style={styles.metaInfo}>
                    <View style={[styles.lineLoader, { width: '45%', height: 10 }]} />
                    <View style={[styles.lineLoader, { width: '35%', height: 10, marginTop: 4 }]} />
                </View>

                {/* Pastki qism: Counter va Narxlar */}
                <View style={styles.footerRow}>
                    {/* Hisoblagich (Counter) loaderi */}
                    <View style={styles.counterLoader} />

                    {/* Narxlar loaderi */}
                    <View style={styles.priceContainer}>
                        <View style={styles.currentPriceLoader} />
                        <View style={styles.oldPriceLoader} />
                    </View>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        flexDirection: 'row',
        width: '100%',
        backgroundColor: '#ffffff',
        borderRadius: 16,
        padding: 16,
        marginBottom: 16,
        borderWidth: 1,
        borderColor: '#e5e7eb',
        justifyContent: 'space-between',
    },
    leftSection: {
        marginRight: 16,
    },
    imageLoader: {
        width: 110,
        height: 110,
        backgroundColor: '#e5e7eb', // Grey 200 rangli loader backgrounds
        borderRadius: 12,
    },
    rightSection: {
        flex: 1,
        justifyContent: 'space-between',
    },
    headerRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
    },
    titleWrapper: {
        flex: 1,
        paddingRight: 8,
    },
    lineLoader: {
        height: 14,
        backgroundColor: '#e5e7eb',
        borderRadius: 4,
    },
    deleteLoader: {
        width: 60,
        height: 16,
        backgroundColor: '#e5e7eb',
        borderRadius: 4,
    },
    metaInfo: {
        marginTop: 4,
    },
    footerRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 12,
    },
    counterLoader: {
        width: 90,
        height: 32,
        backgroundColor: '#e5e7eb',
        borderRadius: 8,
    },
    priceContainer: {
        alignItems: 'flex-end',
        gap: 4,
    },
    currentPriceLoader: {
        width: 100,
        height: 18,
        backgroundColor: '#e5e7eb',
        borderRadius: 4,
    },
    oldPriceLoader: {
        width: 70,
        height: 12,
        backgroundColor: '#e5e7eb',
        borderRadius: 4,
    },
});

export default LoaderCart;