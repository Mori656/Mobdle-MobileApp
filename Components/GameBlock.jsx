import {ScrollView, StyleSheet, Text, TouchableOpacity, View, Image, ImageBackground } from 'react-native';


export default function Block({status, text}) {

    const statusImages = {
        correct: require('../assets/img/correct.png'),
        wrong: require('../assets/img/wrong.png'),
        partial: require('../assets/img/partial.png'),
        less: require('../assets/img/less.png'),
        more: require('../assets/img/more.png'),
    }

    return (
        <ImageBackground style={style.GameBlock} source={statusImages[status]}>
            {Array.isArray(text) 
                ? text.map((value, key) => (<Text key={key} style={style.GameBlockText}>{value}</Text>)) 
                : <Text style={style.GameBlockText}>{text}</Text>
            }
        </ImageBackground>
    )
}

const style = StyleSheet.create({
    GameBlock: {
        width: 100,
        height: 100,
        justifyContent: 'center',
        alignItems: 'center',
    },
    GameBlockText: {
        color: '#fff',
        fontSize: 16
    },
})