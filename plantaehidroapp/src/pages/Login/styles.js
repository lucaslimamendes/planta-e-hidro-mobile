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
  },
  imgLogo: {
    maxHeight: 200,
    maxWidth: '90%',
    resizeMode: 'contain',
    marginBottom: 50,
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
