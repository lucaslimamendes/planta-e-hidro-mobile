import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
    createAlertButton: {
        borderRadius: 20,
        borderWidth: 1,
        borderColor: "#000",
        width: "50%",
        alignSelf: "center",
        marginTop: "4%",
    },
    loginCard: {
        margin: 15, 
        height: "80%",
        flexDirection: "column",
        justifyContent: "space-between"
    },
    loginFooter: {
        flexDirection: "row",
        justifyContent: "space-around",
    },
    footerButton: {
        borderRadius: 20,
        borderWidth: 1,
        borderColor: "#000",
        width: "40%",
        alignSelf: "center",
        marginTop: "4%",
    }
});

export default styles;