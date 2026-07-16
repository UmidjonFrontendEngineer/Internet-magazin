import React from 'react'
import ScreenWrapper from '../layout/ScreenWrapper'
import { View, Text, Pressable } from 'react-native'
import { SolitoImage } from 'solito/image'
import emptyPng from 'app/features/app/assets/black-hole.png'
import { useRouter } from 'solito/navigation'
import { TextLink } from 'solito/link'
import { useLanStorage } from 'app/store/useLanStore'

const Empty = () => {
    const router = useRouter()
    const lan = useLanStorage(state => state.lan)
    return (
        <ScreenWrapper>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 24, minHeight: 400 }}>

                <SolitoImage
                    src={emptyPng}
                    alt='empty'
                    width={160}
                    height={160}
                    resizeMode='contain'
                />

                <Text style={{ fontSize: 18, fontWeight: '700', color: '#0ea5e9', marginBottom: 8, textAlign: 'center' }}>
                    {lan === 'uz' ? "Ro'yxat bo'sh" : lan === 'en' ? 'The list is empty' : lan === 'ru' ? 'Список пуст' : "Ro'yxat bo'sh"}
                </Text>

                <Text style={{ fontSize: 14, color: '#64748b', textAlign: 'center', lineHeight: 20, marginBottom: 24 }}>
                    {lan === 'uz' ? "Hozircha bu bo'lim bo'm-bo'sh." : lan === 'en' ? 'For now, this section is completely empty' : lan === 'ru' ? 'На данный момент этот раздел полностью пуст' : "Hozircha bu bo'lim bo'm-bo'sh."}
                    {' '}
                    <TextLink href='/'><Text style={{ fontSize: 14, color: '#64748b', textAlign: 'center', lineHeight: 20 }}>
                        {lan === 'uz' ? 'bosh sahifaga qaytish' : lan === 'en' ? 'Return to the home page' : lan === 'ru' ? 'Вернуться на главную страницу' : 'bosh sahifaga qaytish'}.
                    </Text></TextLink>
                </Text>

                <Pressable
                    style={({ pressed }) => [
                        {
                            backgroundColor: '#0ea5e9',
                            paddingVertical: 12,
                            paddingHorizontal: 28,
                            borderRadius: 14,
                            width: '100%',
                            alignItems: 'center',
                        },
                        pressed && {
                            opacity: 0.85,
                        }
                    ]}
                    onPress={() => router.back()}
                >
                    <Text style={{ color: '#ffffff', fontSize: 14, fontWeight: '600' }}>
                        {lan === 'uz' ? 'Ortga qaytish' : lan === 'en' ? 'Go back' : lan === 'ru' ? 'Возвращаться' : 'Ortga qaytish'}
                    </Text>
                </Pressable>
            </View>
        </ScreenWrapper>
    )
}

export default Empty