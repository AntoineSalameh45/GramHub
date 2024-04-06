import {View, TextInput, StyleSheet} from 'react-native';
import React from 'react';
import SearchSvg from '../../assets/svg/SearchSvg.svg';

const SearchBar = () => {
  return (
    <>
      <View style={styles.barContainer}>
        <View style={styles.inputContainer}>
          <SearchSvg width={30} height={20} />
          <TextInput
            placeholder="Search"
            placeholderTextColor={'#cdcdcd'}
            style={styles.searchInput}
          />
        </View>
      </View>
    </>
  );
};

export default SearchBar;

const styles = StyleSheet.create({
  searchInput: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10,
    flex: 1,
  },
  inputContainer: {
    backgroundColor: '#444',
    margin: 15,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  barContainer: {backgroundColor: '#222'},
});
