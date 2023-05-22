import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  containerScroll: {
    flexGrow: 1,
    alignItems: 'center',
  },
  container: {
    width: '90%',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
  },
  textDate: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 15,
    color: '#000',
  },
  btn: {
    marginTop: 10,
    borderWidth: 1,
    borderRadius: 50,
    borderColor: '#008000',
  },
  btnFilter: {
    borderWidth: 1,
    borderRadius: 50,
    paddingVertical: 2,
    paddingHorizontal: 8,
    margin: 5,
  },
  txt: {
    color: '#4a4242',
  },
});

export default styles;
