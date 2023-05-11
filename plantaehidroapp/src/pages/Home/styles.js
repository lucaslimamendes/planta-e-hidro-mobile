import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  containerScroll: {
    flexGrow: 1,
    alignItems: 'center',
  },
  container: {
    width: '90%',
    alignItems: 'center',
  },
  imgLogo: {
    maxHeight: 150,
    maxWidth: '90%',
    resizeMode: 'contain',
    marginTop: 30,
    marginBottom: 20,
  },
  section: {
    margin: 15,
    backgroundColor: 'green',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    flexDirection: 'row',
    borderRadius: 20,
    padding: 12,
  },
  txt: {
    color: '#fff',
    fontSize: 16,
  },
});

export default styles;
