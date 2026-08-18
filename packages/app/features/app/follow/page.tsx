'use client'

import React, { useEffect, useState } from 'react'
import { View, Text, Image, StyleSheet, ScrollView, ActivityIndicator } from 'react-native'
import { UniversalImage } from 'app/components/UI/UniversalImage'

interface Market {
    id: string
    title: string
    logo: string
}

interface Follow {
    id: string
    userId: string
    following: string[]
    createdAt: string
}

const FollowComponent = () => {
    const [follows, setFollows] = useState<Follow[]>([])
    const [markets, setMarkets] = useState<Market[]>([])
    const [loading, setLoading] = useState<boolean>(true)

    const fetchData = async () => {
        try {
            const [followRes, marketRes] = await Promise.all([
                fetch('https://internet-magazin-nest-server.onrender.com/followings'),
                fetch('https://internet-magazin-nest-server.onrender.com/markets')
            ])

            const followData = await followRes.json()
            const marketData = await marketRes.json()

            if (followRes.ok) {
                console.log(followData)
                setFollows(followData)
            }
            if (marketRes.ok) {
                console.log(marketData)
                setMarkets(marketData)
            }
        } catch (err) {
            console.error("Xatolik yuz berdi:", err)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchData()
    }, [])

    const getMarketById = (id: string) => markets.find(m => m.id === id)

    if (loading) {
        return (
            <View style={styles.loaderContainer}>
                <ActivityIndicator size="large" color="#007AFF" />
            </View>
        )
    }

    return (
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
            <Text style={styles.headerTitle}>Obuna bo'lgan marketlar</Text>

            {follows.map((follow: Follow) => (
                <View key={follow.id} style={styles.card}>
                    <Text style={styles.userIdText}>User ID: {follow.userId}</Text>
                    <Text style={styles.countText}>Obunalar soni: {follow.following.length}</Text>

                    <View style={styles.marketList}>
                        {follow.following.map((marketId, index) => {
                            const market = getMarketById(marketId)
                            return (
                                <View key={index} style={styles.marketItem}>
                                    {market ? (
                                        <>
                                            <UniversalImage src={market.logo} width={10000} height={10000} alt={market.title} resizeMode='contain' />
                                            <Text style={styles.marketTitle}>{market.title}</Text>
                                        </>
                                    ) : (
                                        <Text style={styles.notFoundText}>Market topilmadi ({marketId.slice(0, 6)}...)</Text>
                                    )}
                                </View>
                            )
                        })}
                    </View>
                </View>
            ))}
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    contentContainer: {
        padding: 16,
    },
    loaderContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F8F9FA',
    },
    headerTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#1A1A1A',
        marginBottom: 16,
        textAlign: 'center',
    },
    card: {
        backgroundColor: '#FFFFFF',
        borderWidth: 1,
        borderColor: '#E2E8F0',
        borderRadius: 12,
        padding: 16,
        marginBottom: 14,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 2,
    },
    userIdText: {
        fontSize: 14,
        fontWeight: '600',
        color: '#4A5568',
        marginBottom: 4,
    },
    countText: {
        fontSize: 13,
        color: '#718096',
        marginBottom: 12,
    },
    marketList: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 8,
    },
    marketItem: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#EDF2F7',
        borderWidth: 1,
        borderColor: '#E2E8F0',
        paddingVertical: 6,
        paddingHorizontal: 10,
        borderRadius: 20,
    },
    logo: {
        width: 24,
        height: 24,
        borderRadius: 12,
        marginRight: 6,
    },
    marketTitle: {
        fontSize: 13,
        fontWeight: '500',
        color: '#2D3748',
    },
    notFoundText: {
        fontSize: 12,
        color: '#E53E3E',
    },
})

export default FollowComponent