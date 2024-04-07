import React, {PropsWithChildren} from 'react';
import {View, TouchableOpacity} from 'react-native';
import tabStyles from './tabStyles';

interface TabBarProps {
  state: any;
  descriptors: any;
  navigation: any;
  icons: any;
}

const MyTabBar = ({
  state,
  navigation,
  icons,
}: PropsWithChildren<TabBarProps>) => {
  return (
    <>
      <View style={tabStyles.tabContainer}>
        {state.routes.map((route: any, index: number) => {
          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name, route.params);
            }
          };

          const onLongPress = () => {
            navigation.emit({
              type: 'tabLongPress',
              target: route.key,
            });
          };

          const Icon = icons[index];

          return (
            <TouchableOpacity
              key={route.key}
              accessibilityRole="button"
              accessibilityState={isFocused ? {selected: true} : {}}
              onPress={onPress}
              onLongPress={onLongPress}
              style={[
                tabStyles.tabButton,
                isFocused ? tabStyles.tabButtonFocused : null,
              ]}>
              <Icon
                width={24}
                height={24}
                fill={isFocused ? '#7E30E1' : '#222'}
              />
            </TouchableOpacity>
          );
        })}
      </View>
    </>
  );
};

export default MyTabBar;
