import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { TextLink } from 'solito/link'

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 10,
        padding: 40
    },
    item: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        gap: 10,
        minWidth: 300
    },
    btn: {
        backgroundColor: 'rgb(0, 149, 255)',
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderRadius: 20,
        color: 'snow',
    },
    text: {
        color: 'snow'
    }
})

const AboutItem = () => {
    return (
        <View style={styles.container}>
            <View style={styles.item}>
                <TextLink href='punkt'><View style={styles.btn}><Text style={styles.text}>topshirish punktlari</Text></View></TextLink>
                <TextLink href='careres'><View style={styles.btn}><Text style={styles.text}>vakansiyalar</Text></View></TextLink>
            </View>
        </View>
    )
}

export default AboutItem