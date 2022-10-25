import { BG_COLOR, COLOR_WHITE } from './constants';

const { StyleSheet } = require('react-native');

const styles = StyleSheet.create({
  modal: {
    flex: 1,
    margin: 0,
    paddingVertical: 0,
  },
  mainView: {
    flex: 1,
    backgroundColor: BG_COLOR,
  },
  headerView: {
    backgroundColor: COLOR_WHITE,
    flex: 0,
  }
});
export default styles;
