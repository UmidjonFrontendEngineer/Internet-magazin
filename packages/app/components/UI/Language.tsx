import React from 'react'
import { View, Text, Pressable, TouchableOpacity } from 'react-native'
import { useLanStorage } from 'app/store/useLanStore'

interface propsType {
    setOpenLan: (prew: boolean) => void
}

const Language = ({ setOpenLan }: propsType) => {
    const lan = useLanStorage(state => state.lan)
    const setLan = useLanStorage(state => state.setLan)
    const Langs = ['uz', 'en', 'ru']
    return (
        <View style={{ gap: 4, width: '100%', backgroundColor: 'white', borderRadius: 16, padding: 4, zIndex: 99999999999999 }}>
            {
                Langs.map(item => (
                    <TouchableOpacity key={item} onPress={() => { setLan(item), setOpenLan(prew => !prew) }} style={{ paddingHorizontal: 30, paddingVertical: 4, borderRadius: 10, backgroundColor: 'rgba(226, 245, 255, 0.6)', width: '100%', alignItems: 'center', justifyItems: 'center' }}>
                        <Text>{item}</Text>
                    </TouchableOpacity>
                ))
            }
        </View>
    )
}

export default Language