import { ScrollView, StyleSheet, Text, TouchableOpacity, View, ImageBackground, Image, Alert } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { versions } from '../Components/Versions';
import Block from '../Components/GameBlock';
import { useEffect, useState } from 'react';

import useGameStore from '../Stores/gameStore';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function GamePage () {
    const [selectedOption, setSelectedOption] = useState();
    
    const {
        chosenMob,
        options, fetchOptions, removeOption,
        triedOptions, modifyTriedOptions, clearTriedOptions,
    } = useGameStore();

    useEffect(() => {
        fetchOptions();
        clearTriedOptions();
    }, []);

    const checkStatus = (info) => {
        const selectedValue = selectedOption[info];
        const chosenValue = chosenMob[info];
        
        if (JSON.stringify(selectedValue) === JSON.stringify(chosenValue)) {
            return 'correct';
        }

        if (Array.isArray(selectedValue)) {
            if (selectedValue.some((val) => chosenValue.includes(val))) {
                return 'partial';
            }
        }
    
        return 'wrong';
    };

    const checkStatus2 = (info) => {
        const selectedValue = selectedOption[info];
        const chosenValue = chosenMob[info];
        
        if (selectedValue === chosenValue) {
            return 'correct';
        } else if (selectedValue < chosenValue) {
            return 'more';
        } else {
            return 'less';
        }
    };

    const checkWin = async (item) => {
        if (
            item.versionStatus !== 'correct' ||
            item.healthStatus !== 'correct' ||
            item.heightStatus !== 'correct' ||
            item.behaviorStatus !== 'correct' ||
            item.movementStatus !== 'correct' ||
            item.dimensionStatus !== 'correct'
        ) {
            return;
        } else {
            Alert.alert(
                'Congratulations!',
                `You guessed the mob: ${item.name}`,
            );

            const Leaderboard = await AsyncStorage.getItem('Leaderboard');
            const username = await AsyncStorage.getItem('username');
            const score = {
                username: username,
                score: triedOptions.length,
                Date: new Date().toLocaleDateString(),
                mob: chosenMob.name,
            };

            const tmp = Leaderboard ? JSON.parse(Leaderboard) : [];
            tmp.push(score);

            await AsyncStorage.setItem('Leaderboard', JSON.stringify(tmp));
        }
    }
    

    const handleSubmit = () => {
        if (selectedOption) {
            const tmp = {
                name: selectedOption.name, 
                image: selectedOption.image, 
                version: selectedOption.version, 
                versionStatus: checkStatus2('version'),
                health: selectedOption.health, 
                healthStatus: checkStatus2('health'),
                height: selectedOption.height, 
                heightStatus: checkStatus2('height'),
                behavior: selectedOption.behavior, 
                behaviorStatus: checkStatus('behavior'),
                movement: selectedOption.movement, 
                movementStatus: checkStatus('movement'),
                dimension: selectedOption.dimension,
                dimensionStatus: checkStatus('dimension')
            }
            checkWin(tmp);
            modifyTriedOptions(tmp);
            setSelectedOption(null);
            removeOption(selectedOption);
        }
    }

    const mobs = [
        {
            "name": "Allay",
            "image": "https://minecraft.wiki/images/AllayFace.png?f466a",
            "version": 31,
            "health": 20,
            "height": 0.6,
            "behavior": [
              "Passive"
            ],
            "movement": [
              "Flying"
            ],
            "dimension": [
              "Overworld"
            ]
          },
        {
          "name": "Armadillo",
          "image": "https://minecraft.wiki/images/ArmadilloFace.png?18991",
          "version": 33,
          "health": 12,
          "height": 0.65,
          "behavior": [
            "Passive"
          ],
          "movement": [
            "Walking"
          ],
          "dimension": [
            "Overworld"
          ]
    }];



    return (
        <View style={style.mainContainer}>
            <ImageBackground source={require('../assets/img/MainPageBackground.jpg')} resizeMode="cover">
                    <View style={style.contentContainer}>
                            <View>
                                <Image source={require('../assets/img/logo.png')} resizeMode="stretch" style={style.logo}/>
                            </View>

                            <View style={style.gameContainer}>
                                <View style={style.guessingZone}>
                                    <Dropdown
                                        style={{
                                            height: 60,
                                            width: 285,
                                            borderWidth: 1,
                                            paddingHorizontal: 10,
                                            backgroundColor: '#A0C4FF',
                                        }}
                                        selectedTextStyle={{
                                            fontSize: 24,
                                        }}
                                        placeholderStyle={{
                                            fontSize: 24,
                                            color: '#555',
                                        }}
                                        data={options}
                                        search
                                        labelField="name"
                                        valueField="name"
                                        imageField="image"
                                        placeholder="Choose a mob"
                                        value={selectedOption}
                                        onChange={item => {
                                            setSelectedOption(item);
                                            console.log('Selected:', item);
                                        }}
                                        renderItem={item => (
                                            <View style={dropdownStyle.item}>
                                                <Image source={{uri: item.image}} style={dropdownStyle.image}/><Text style={dropdownStyle.text}>{item.name}</Text>
                                            </View>
                                        )}
                                    />
                                    <TouchableOpacity style={style.submit} onPress={handleSubmit}>
                                        <Text style={style.submitText}>{'>>'}</Text>
                                    </TouchableOpacity>
                                </View>


                                <ScrollView style={{height: 400, width: 350, marginTop: 20}} horizontal>
                                    <View style={{display: 'flex', flexDirection: 'column'}}>
                                        <View style={style.categoryView}>
                                            <Text style={style.category}>Mob</Text>
                                            <Text style={style.category}>Version</Text>
                                            <Text style={style.category}>Hp</Text>
                                            <Text style={style.category}>Height</Text>
                                            <Text style={style.category}>Behavior</Text>
                                            <Text style={style.category}>Movement</Text>
                                            <Text style={style.category}>Dimension</Text>
                                        </View>
                                        <ScrollView>
                                            <View style={style.chosenOptions}> 
                                            {triedOptions.map((item, index) => (
                                                item?(
                                                <View key={index} style={style.chosenItem}>
                                                    <Image source={{uri: item.image}} style={style.itemImage}/>
                                                    <Block text={versions[item.version]} status={item.versionStatus}></Block>
                                                    <Block text={item.health} status={item.healthStatus}></Block>
                                                    <Block text={item.height} status={item.heightStatus}></Block>
                                                    <Block text={item.behavior} status={item.behaviorStatus}></Block>
                                                    <Block text={item.movement} status={item.movementStatus}></Block>
                                                    <Block text={item.dimension} status={item.dimensionStatus}></Block>
                                                </View>) : null
                                            ))}
                                            </View>
                                        </ScrollView>
                                    </View>
                                </ScrollView>
                            </View>
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
        margin: 'auto',
        minHeight: '100%',
    },
    logo: {
        height: 90,
        width: 400,
        marginTop: 50,
        marginBottom: 50
    },
    gameContainer: {
        width: '100%',
    },
    guessingZone: {
        display: 'flex',
        flexDirection: 'row',
        gap: 5,
        alignItems: 'stretch',
        width: '100%',
    },
    submit: {
        backgroundColor: '#a0c4ff',
        height: 60,
        width: 60,
        justifyContent: 'center',
    },
    submitText: {
        fontSize: 30,
        textAlign: 'center',
    },
    categoryView: {
        display: 'flex',
        flexDirection: 'row',
        gap: 10
    },
    category: {
        width: 100,
        height: 20,
        textAlign: 'center',
        textAlignVertical: 'bottom',
        color: '#fff',
        fontSize: 16
    },
    chosenOptions: {
        display: 'flex',
        flexDirection: 'column'
    },
    chosenItem: {
        display: 'flex',
        flexDirection: 'row',
        gap: 10,
        marginVertical: 5,
        borderBottomWidth: 2,
        borderBottomColor: '#ccc',
        paddingBottom: 10,
    },
    itemImage: {
        height: 100,
        width: 100,
        borderWidth: 3,
        borderColor: '#ccc',
    },
})

const dropdownStyle = StyleSheet.create({
    item: {
        padding: 10,
        display: 'flex',
        flexDirection: 'row'
    },
    image: {
        width: 30,
        height: 30
    },
    text: {
        fontSize: 20,
        marginLeft: 10,
        textAlignVertical: 'center'
    }
})