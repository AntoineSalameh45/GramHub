import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import GearSvg from '../../assets/svg/GearSvg.svg';
import NotifSvg from '../../assets/svg/BellSvg.svg';

const ProfileHeader = () => {
  return (
    <View style={styles.viewContainer}>
      <Text style={styles.title}>GramHub</Text>
      <View style={styles.viewButtonsContainer}>
        <NotifSvg width={30} height={30} />
        <GearSvg width={30} height={30} />
      </View>
    </View>
  );
};

export default ProfileHeader;

const styles = StyleSheet.create({
  viewContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 10,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  title: {fontSize: 24, fontFamily: 'Pacifico-Regular', marginLeft: 10},
  viewButtonsContainer: {
    flex: 0.4,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
});
