import { useNavigation } from '@react-navigation/native';
import {ScrollView, StyleSheet, Text, TouchableOpacity, View, ImageBackground, Image } from 'react-native';


export default function HomePage() {

    const navigation = useNavigation();

    return (
        <View style={style.mainContainer}>
            <ImageBackground source={require('../assets/img/MainPageBackground.jpg')} resizeMode="cover">
                <View style={style.contentContainer}>
                    <View>
                        <Image source={require('../assets/img/logo.png')} resizeMode="stretch" style={style.logo}/>
                    </View>

                    <TouchableOpacity onPress={() => navigation.navigate('GamePage')}>
                        <ImageBackground source={require('../assets/img/SpruceWood.png')} resizeMode="repeat" style={style.button}>
                            <Text style={style.buttonText}>Start Game</Text>
                        </ImageBackground>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => navigation.navigate('Leaderboard')}>
                        <ImageBackground source={require('../assets/img/SpruceWood.png')} resizeMode="repeat" style={style.button}>
                            <Text style={style.buttonText}>Leaderboard</Text>
                        </ImageBackground>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => navigation.navigate('Settings')}>
                        <ImageBackground source={require('../assets/img/SpruceWood.png')} resizeMode="repeat" style={style.button}>
                            <Text style={style.buttonText}>Settings</Text>
                        </ImageBackground>
                    </TouchableOpacity>
                </View>
            </ImageBackground>
        </View>
    )
}

const style = StyleSheet.create({
    mainContainer: {
        width: '100%',
    },
    contentContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        paddingVertical: '2em',
        width: '90vw',
        margin: 'auto',
        height: 'auto',
        minHeight: '100%',
        gap: 0,
    },
    logo: {
        height: 90,
        width: 400,
        marginTop: 50,
        marginBottom: 100
    },
    button: {
        marginVertical: 20,
        paddingVertical: 15,
        paddingHorizontal: 10,
        width: 260,
    },
    buttonText: {
        color: '#fff',
        fontSize: 36,
        textAlign: 'center',
        fontFamily: 'minecraft-regular'
    }
})