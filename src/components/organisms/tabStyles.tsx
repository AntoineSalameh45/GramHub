import {StyleSheet} from 'react-native';

const tabStyles = StyleSheet.create({
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#222',
    borderTopWidth: 1,
    borderTopColor: '#444',
  },
  tabButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
  },
  tabButtonFocused: {
    backgroundColor: '#222',
  },
  tabText: {
    fontSize: 14,
    color: '#000',
  },
  tabTextFocused: {
    color: '#000',
    fontWeight: 'bold',
  },
});

export default tabStyles;
