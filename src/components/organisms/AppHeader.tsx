import {View, Text, StyleSheet, Pressable} from 'react-native';
import React from 'react';
import DmSvg from '../../assets/svg/DmSvg.svg';
import NotifSvg from '../../assets/svg/BellSvg.svg';

const AppHeader = ({navigation}: any) => {
  return (
    <View style={styles.viewContainer}>
      <Text style={styles.title}>GramHub</Text>
      <View style={styles.viewButtonsContainer}>
        <Pressable
          onPress={() => {
            navigation.navigate('Notification Center');
          }}>
          <NotifSvg width={30} height={30} />
        </Pressable>
        <Pressable
          onPress={() => {
            navigation.navigate('Direct Messages');
          }}>
          <DmSvg width={30} height={30} />
        </Pressable>
      </View>
    </View>
  );
};

export default AppHeader;

const styles = StyleSheet.create({
  viewContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 10,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  title: {
    fontSize: 24,
    fontFamily: 'Pacifico-Regular',
    marginLeft: 10,
    color: '#F3F8FF',
  },
  viewButtonsContainer: {
    flex: 0.4,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
});
