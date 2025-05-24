import React, { useEffect, useState } from 'react';
import { View, Text, Image, ImageBackground, ScrollView, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function Leaderboard() {
    const [scores, setScores] = useState([]);

    useEffect(() => {
        AsyncStorage.getItem('Leaderboard').then(scores => {
            if (scores) {
                const parsedScores = JSON.parse(scores);
                parsedScores.sort((a, b) => a.score - b.score);
                setScores(parsedScores);
            }
        });
    }, []);

    function groupByDate(scores) {
        return scores.reduce((acc, score) => {
            (acc[score.Date] = acc[score.Date] || []).push(score);
            return acc;
        }, {});
    }

    const groupedScores = groupByDate(scores);

    return (
        <View style={style.mainContainer}>
            <ImageBackground source={require('../assets/img/MainPageBackground.jpg')} resizeMode="cover">
                <View style={style.contentContainer}>
                    <View>
                        <Image source={require('../assets/img/leaderboard.png')} resizeMode="stretch" style={style.logo}/>
                    </View>
                    <ScrollView style={{height: 400}}>
                        <View style={style.leaderboard}>
                            {/* Header Row */}
                            <View style={style.headerRow}>
                                <View style={style.userCell}><Text style={style.headerCell}>User</Text></View>
                                <View style={style.guessesCell}><Text style={style.headerCell}>Guesses</Text></View>
                                <View style={style.mobCell}><Text style={style.headerCell}>Mob</Text></View>
                            </View>
                            {/* Score Rows */}
                            {Object.entries(groupedScores).map(([date, dayScores]) => (
                                <View key={date}>
                                    <View style={style.dateSeparator}>
                                        <Text style={style.dateSeparatorText}>{date}</Text>
                                    </View>
                                    {dayScores.map((item, index) => (
                                        <View key={index} style={style.scoreRow}>
                                            <View style={style.userCell}>
                                                <View style={style.userInfoRow}>
                                                    <Image source={{ uri: item.image }} style={style.userImage} />
                                                    <Text style={style.cell}>{item.username}</Text>
                                                </View>
                                            </View>
                                            <View style={style.guessesCell}><Text style={style.cell}>{item.score}</Text></View>
                                            <View style={style.mobCell}><Text style={style.cell}>{item.mob}</Text></View>
                                        </View>
                                    ))}
                                </View>
                            ))}
                        </View>
                    </ScrollView>
                </View>
            </ImageBackground>
        </View>
    );
}

const style = StyleSheet.create({
    mainContainer: {
        flex: 1,
        width: '100%',
    },
    contentContainer: {
        flex: 1,
        alignItems: 'center',
        paddingTop: 40,
    },
    logo: {
        height: 90,
        width: 400,
        marginBottom: 30,
        resizeMode: 'contain',
    },
    leaderboard: {
        flexDirection: 'column',
        width: 370,
        alignSelf: 'center',
        backgroundColor: 'rgba(255,255,255,0.02)',
        borderRadius: 0,
        borderWidth: 3,
        borderColor: '#a0c4ff',
        padding: 0,
    },
    headerRow: {
        flexDirection: 'row',
        backgroundColor: '#a0c4ff',
        borderBottomWidth: 2,
        borderColor: '#222',
        paddingVertical: 8,
        alignItems: 'center',
    },
    headerCell: {
        color: '#222',
        fontWeight: 'bold',
        fontSize: 16,
        textAlign: 'center',
    },
    scoreRow: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderColor: '#a0c4ff',
        paddingVertical: 8,
        backgroundColor: 'transparent',
        alignItems: 'center',
    },
    userCell: {
        flex: 2,
        justifyContent: 'center',
    },
    guessesCell: {
        flex: 1,
        justifyContent: 'center',
    },
    mobCell: {
        flex: 2,
        justifyContent: 'center',
    },
    userImage: {
        width: 28,
        height: 28,
        borderRadius: 6,
        borderWidth: 2,
        borderColor: '#a0c4ff',
        backgroundColor: '#fff',
    },
    userImagePlaceholder: {
        width: 28,
        height: 28,
        borderRadius: 6,
        backgroundColor: '#ccc',
        borderWidth: 2,
        borderColor: '#a0c4ff',
    },
    cell: {
        color: '#fff',
        fontSize: 16,
        textAlign: 'center',
    },
    dateSeparator: {
        backgroundColor: '#a0c4ff',
        paddingVertical: 5,
        alignItems: 'center',
    },
    dateSeparatorText: {
        color: '#222',
        fontWeight: 'bold',
        fontSize: 14,
    },
    userInfoRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        justifyContent: 'center',
    },
});