import { StyleSheet } from 'react-native';

const sensorsStyles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modal: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    margin: 50,
    borderRadius: 10,
    padding: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  positionButton: {
    position: 'absolute',
    top: 0,
    right: 0,
  },
  createSensorButton: {
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#008000',
    backgroundColor: '#008000',
    width: '50%',
    alignSelf: 'center',
    marginTop: '4%',
  },
  txt: {
    color: '#4a4242',
  },
});

export default sensorsStyles;
