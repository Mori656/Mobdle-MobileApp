import {ScrollView, StyleSheet, Text, TouchableOpacity, View, ImageBackground, Image } from 'react-native';


export default function Leaderboard() {
    const scores = [
        {
            'guessNumber': 2,
            'nickname': 'adam'
        },{
            'guessNumber': 4,
            'nickname': 'grzyb'
        },{
            'guessNumber': 6,
            'nickname': 'tomasz'
        },{
            'guessNumber': 83,
            'nickname': 'piotr'
        }
    ]

    function scoreSort(input) {        
        return [...input].sort((a, b) => a.guessNumber - b.guessNumber);
    }

    return (
        <View style={style.mainContainer}>
            <ImageBackground source={require('../assets/img/MainPageBackground.jpg')} resizeMode="cover">
                    <View style={style.contentContainer}>
                            <View>
                                <Image source={require('../assets/img/leaderboard.png')} resizeMode="stretch" style={style.logo}/>
                            </View>
                            <ScrollView style={{height: 400}}> 
                                <View style={style.Leaderboard}>
                                    {scores.map((item, index) => (
                                        <View key={index} style={style.scoreItem}>
                                            <View style={style.itemIndex}><Text style={style.itemText}>{index + 1}.</Text></View>
                                            <View style={style.itemNickname}><Text style={style.itemText}>{item.nickname}</Text></View>
                                            <View style={style.itemScore}><Text style={style.itemText}>{item.guessNumber}</Text></View>
                                        </View>
                                    ))}
                                </View>
                            </ScrollView>
                            
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
        margin: 'auto',
        height: 60,
        width: 400,
        marginTop: 50,
        marginBottom: 100
    },
    scoreItem: {
        display: 'flex',
        flexDirection: 'row',
        width: 350,
    },
    itemText: {
        color: '#fff',
        fontSize: 24,
    },
    itemIndex: {
        width: 30
    },
    itemNickname: {
        width: 290
    },
    itemScore: {
        width: 30
    }
})