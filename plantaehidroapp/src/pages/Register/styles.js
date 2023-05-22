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
  input: {
    width: '100%',
    textAlign: 'center',
    marginBottom: 10,
  },
  button: {
    width: '80%',
    marginTop: 10,
  },
});

export default styles;
