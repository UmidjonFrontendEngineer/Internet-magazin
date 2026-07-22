'use client'
import { Text, View, StyleSheet, Pressable } from 'react-native'
import { UniversalImage } from 'app/components/UI/UniversalImage'
import Language from 'app/components/UI/Language'
import React, { useState, useEffect } from 'react'

const Sozlamalar = () => {
    const [openLan, setOpenLan] = useState(false)
    return (
        <View style={{ marginTop: 120 }}>
            <Text>Sozlamalar</Text>
            <View style={styles.container}>
                <UniversalImage
                    src="https://i.ibb.co/Myj2g1pg/settings.png"
                    alt="Settings Icon"
                    width={24}
                    height={24}
                    resizeMode="contain"
                />
                <Text style={styles.text}>Sozlamalar</Text>
            </View>

            <Pressable onPress={() => setOpenLan(prew => !prew)}>
                <Text>Til Sozlamalari</Text>
                <View style={styles.container}>
                    <UniversalImage
                        src="https://i.ibb.co/Myj2g1pg/settings.png"
                        alt="Settings Icon"
                        width={24}
                        height={24}
                        resizeMode="contain"
                    />
                    <Text style={styles.text}>Sozlamalar</Text>
                </View>
            </Pressable>

            {openLan ? <Language setOpenLan={setOpenLan} /> : null}

        </View>
    )
}

export default Sozlamalar

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        gap: 10,
    },
    text: {
        fontSize: 16,
        fontWeight: '500',
    },
})