'use client'

import React, { useEffect, useState } from 'react'
import { View, Text, FlatList, StyleSheet } from 'react-native'

interface Follow {
    id: string
    userId: string
    following: any[]
    createdAt: string
}

const FollowComponent = () => {
    const [data, setData] = useState<Follow[]>([])
    const [loading, setLoading] = useState(true)

    const getFollowers = async () => {
        try {
            const res = await fetch('https://internet-magazin-nest-server.onrender.com/followings')
            const req = await res.json()

            if (res.ok) {
                setData(req)
            } else {
                console.log(req.message)
            }
        } catch (err) {
            console.log(`So'rov yuborilmadi ${err}`)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        getFollowers()
    }, [])

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Followers Ro'yxati</Text>

            {loading ? (
                <Text>Yuklanmoqda...</Text>
            ) : (
                <FlatList
                    data={data}
                    keyExtractor={(item: Follow) => item.id}
                    renderItem={({ item }: {item: Follow}) => (
                        <View style={styles.card}>
                            <Text style={styles.text}><Text style={styles.bold}>ID:</Text> {item.id}</Text>
                            <Text style={styles.text}><Text style={styles.bold}>User ID:</Text> {item.userId}</Text>
                            <Text style={styles.text}>
                                <Text style={styles.bold}>Following:</Text> {JSON.stringify(item.following)}
                            </Text>
                        </View>
                    )}
                />
            )}
        </View>
    )
}

export default FollowComponent

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#f5f5f5',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 16,
        textAlign: 'center',
    },
    card: {
        backgroundColor: '#fff',
        padding: 12,
        borderRadius: 8,
        marginBottom: 12,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    text: {
        fontSize: 14,
        marginBottom: 4,
        color: '#333',
    },
    bold: {
        fontWeight: 'bold',
    },
})