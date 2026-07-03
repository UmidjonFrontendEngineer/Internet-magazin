import { Text, View } from 'react-native'
import ScreenWrapper from 'app/components/layout/ScreenWrapper'
import { SolitoImage } from 'solito/image'
import { TextLink } from 'solito/link'
import React from 'react'

const Profile = () => {
    return (
        <ScreenWrapper>
            <Text>Profile</Text>

            <TextLink href="/sozlamalar">
                <View style={{ flexDirection: 'row', gap: 10, alignItems: 'center' }}>
                    <SolitoImage
                        src="https://i.ibb.co/Myj2g1pg/settings.png"
                        alt="Settings Icon"
                        width={24}
                        height={24}
                        resizeMode="contain"
                    />
                    <Text style={{ fontSize: 16, fontWeight: '500' }}>Sozlamalar</Text>
                </View>
            </TextLink>
        </ScreenWrapper>
    )
}

export default Profile