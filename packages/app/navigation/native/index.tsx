import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { View, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import Header from 'app/features/app/Header'
import Cursor from 'app/components/UI/Cursor'

import HomeScreen from 'app/features/app/screen'
import SozlamalarScreen from 'app/features/app/sozlamalar/page'
import KatalogScreen from 'app/features/app/katalog/page'
import SavatScreen from 'app/features/app/savat/page'
import SaralanganScreen from 'app/features/app/yoqtirilgan/page'
import ProfileScreen from 'app/features/app/profile/page'
import SavolJavobScreen from 'app/features/app/savolJavob/page'
import Search from 'app/features/app/search/page'
import CareresScreen from 'app/features/app/about/careres/page'
import PunktScreen from 'app/features/app/about/punkt/page'
import Filter from 'app/features/app/search/_components/filter/page'
import ProductsID from 'app/features/app/product/[id]/page'

const Stack = createNativeStackNavigator<{
  home: undefined
  sozlamalar: undefined
  katalog: undefined
  savat: undefined
  saralangan: undefined
  profile: undefined
  savolJavob: undefined
  search: undefined
  careres: undefined
  punkt: undefined
  'filter': {
    id: 'string'
  }
  'products': {
    id: 'string'
  }
}>()
export function NativeNavigation() {
  return (
    <View style={styles.container}>
      <Header />

      <View style={styles.mainContent}>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="home" component={HomeScreen} />
          <Stack.Screen name="sozlamalar" component={SozlamalarScreen} />
          <Stack.Screen name="katalog" component={KatalogScreen} />
          <Stack.Screen name="savat" component={SavatScreen} />
          <Stack.Screen name="saralangan" component={SaralanganScreen} />
          <Stack.Screen name="profile" component={ProfileScreen} />
          <Stack.Screen name="savolJavob" component={SavolJavobScreen} />
          <Stack.Screen name="search" component={Search} />
          <Stack.Screen name="careres" component={CareresScreen} />
          <Stack.Screen name="punkt" component={PunktScreen} />
          <Stack.Screen name="filter" component={Filter} options={{
            title: 'filter'
          }} />
          <Stack.Screen name='products' component={ProductsID} options={{
            title: 'products'
          }} />
        </Stack.Navigator>
      </View>

      <Cursor />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  mainContent: {
    flex: 1,
  },
})