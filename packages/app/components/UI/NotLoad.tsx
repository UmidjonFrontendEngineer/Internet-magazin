import React from 'react'
import ScreenWrapper from '../layout/ScreenWrapper'
import { View, Text, Pressable } from 'react-native'
import { SolitoImage } from 'solito/image'
import noInternet from 'app/features/app/assets/no-wifi.png'
import { useLanStorage } from 'app/store/useLanStore'

const NotLoad = ({ fetchProducts }: { fetchProducts: () => void }) => {
    const lan = useLanStorage(state => state.lan)
    return (
        <ScreenWrapper>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 24, minHeight: 400 }}>
                <SolitoImage
                    src={noInternet}
                    alt='noInternet'
                    width={70}
                    height={70}
                    resizeMode='contain'
                />

                <Text style={{ fontSize: 18, fontWeight: '700', color: '#1e293b', marginBottom: 8, textAlign: 'center' }}>
                    {lan === 'uz' ? 'Aloqa mavjud emas' : lan === 'en' ? 'No connection available' : lan === 'ru' ? 'Нет подключения' : 'Aloqa mavjud emas'}
                </Text>

                <Text style={{ fontSize: 14, color: '#64748b', textAlign: 'center', lineHeight: 20, marginBottom: 24 }}>
                    {lan === 'uz' ? "Internetga ulaning yoki Wi-Fi tarmog'ingizni tekshirib ko'ring" : lan === 'en' ? 'Connect to the Internet or check your Wi-Fi network' : lan === 'ru' ? 'Подключитесь к Интернету или проверьте сеть Wi-Fi' : "Internetga ulaning yoki Wi-Fi tarmog'ingizni tekshirib ko'ring"}.
                </Text>

                <Pressable
                    style={({ pressed }) => [
                        {
                            backgroundColor: '#0070f3',
                            paddingVertical: 12,
                            paddingHorizontal: 28,
                            borderRadius: 14,
                            width: '100%',
                            alignItems: 'center',
                        },
                        pressed && {
                            opacity: 0.85,
                            transform: [{ scale: 0.98 }],
                        }
                    ]}
                    onPress={fetchProducts}
                >
                    <Text style={{ color: '#ffffff', fontSize: 14, fontWeight: '600' }}>
                        {lan === 'uz' ? 'Qayta urinish' : lan === 'en' ? 'retry' : lan === 'ru' ? 'повторить попытку' : 'Qayta urinish'}
                    </Text>
                </Pressable>
            </View>
        </ScreenWrapper>
    )
}

export default NotLoad