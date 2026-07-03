import { NavigationContainer } from '@react-navigation/native'
import * as Linking from 'expo-linking'
import React, { useMemo } from 'react'

export function NavigationProvider({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <NavigationContainer
      linking={useMemo(
        () => ({
          prefixes: [Linking.createURL('/')],
          config: {
            initialRouteName: 'home',
            screens: {
              home: '',
              sozlamalar: 'sozlamalar',
              katalog: 'katalog',
              savat: 'savat',
              saralangan: 'yoqtirilgan',
              profile: 'profile',
              savolJavob: 'savolJavob',
              search: 'search',
              careres: 'careres',
              punkt: 'punkt',
              'filter': 'search/:id'
            },
          },
        }),
        []
      )}
    >
      {children}
    </NavigationContainer>
  )
}