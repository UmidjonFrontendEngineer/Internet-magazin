'use client'
import React, { useState } from 'react'
import { View, Text, Pressable, TouchableOpacity, Platform, Button } from 'react-native'
import { useLanStorage } from 'app/store/useLanStore'

interface propsType {
    setOpenLan: (prew: string) => void
}

const SettingsLanguage = ({setOpenLan}: propsType) => {
    const lan = useLanStorage(state => state.lan)
    const setLan = useLanStorage(state => state.setLan)

    const [nextLan, setNextLan] = useState(lan)
    return (
        <>
            <View><Text>{lan}</Text></View>
            <View style={{
                gap: 16, backgroundColor: '#8c8c8c', borderTopLeftRadius: 30, borderTopRightRadius: 30, flex: 1, width: '100%', padding: 20, left: 0, bottom: 80,
                ...Platform.select({
                    web: {
                        position: 'fixed',
                    },
                    default: {
                        position: 'absolute',
                    }
                }),
            }}>
                <Button onPress={() => setOpenLan(prew => !prew)} />

                <TouchableOpacity onPress={() => setNextLan('uz')}>
                    <Text>uzbek</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setNextLan('en')}>
                    <Text>english</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setNextLan('ru')}>
                    <Text>rus</Text>
                </TouchableOpacity>
                <Pressable onPress={() => setLan(nextLan)} style={{ paddingHorizontal: 20, paddingVertical: 10, borderRadius: 10, backgroundColor: '#4dafff', marginHorizontal: 'auto', flex: 1 }}>almashtirish</Pressable>
            </View>
        </>
    )
}

export default SettingsLanguage