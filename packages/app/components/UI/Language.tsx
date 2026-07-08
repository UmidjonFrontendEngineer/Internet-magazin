import React from 'react'
import { View, Text, Pressable, TouchableOpacity } from 'react-native'
import { useLanStorage } from 'app/store/useLanStore'
import { SolitoImage } from 'solito/image'
import UzPng from 'app/features/app/assets/uzbekistan.png'
import EnPng from 'app/features/app/assets/united-kingdom.png'
import RuPng from 'app/features/app/assets/russia.png'

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
                        <SolitoImage
                            src={item === 'uz' ? UzPng : item === 'ru' ? RuPng : item === 'en' ? EnPng : ''}
                            alt={item === 'uz' ? 'uz' : item === 'ru' ? 'ru' : item === 'en' ? 'en' : ''}
                            width={40}
                            height={30}
                            resizeMode="contain"
                        />
                        <Text style={{textTransform: 'uppercase', fontSize: 20, color: 'skyblue'}}>{item}</Text>
                    </TouchableOpacity>
                ))
            }
        </View>
    )
}

export default Language