import { ScrollView, StyleSheet, Text, TouchableOpacity, View, ImageBackground, Image, Alert, Modal } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { versions } from '../Components/Versions';
import Block from '../Components/GameBlock';
import { useEffect, useState } from 'react';

import useGameStore from '../Stores/gameStore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { SelectList } from 'react-native-dropdown-select-list'


export default function GamePage() {
    const [selectedOption, setSelectedOption] = useState();
    const [winModalVisible, setWinModalVisible] = useState(false);
    const [winInfo, setWinInfo] = useState(null);
    
    const {
        chosenMob,
        options, fetchOptions, removeOption,
        triedOptions, modifyTriedOptions, clearTriedOptions,
    } = useGameStore();

    const navigation = useNavigation();

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
            const Leaderboard = await AsyncStorage.getItem('Leaderboard');
            const username = await AsyncStorage.getItem('username');
            const userImage = await AsyncStorage.getItem('userImage');
            const score = {
                username: username,
                image: userImage || 'https://minecraft.wiki/images/HumanFace.png?db4dc',
                score: triedOptions.length,
                Date: new Date().toLocaleDateString('pl-PL'),
                mob: chosenMob.name,
            };

            const tmp = Leaderboard ? JSON.parse(Leaderboard) : [];
            tmp.push(score);

            await AsyncStorage.setItem('Leaderboard', JSON.stringify(tmp));

            // Show win modal
            setWinInfo({
                mob: item.name,
                image: item.image,
                score: triedOptions.length,
                date: score.Date,
            });
            setWinModalVisible(true);
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
                                        searchPlaceholder="Search mob..."
                                        inputSearchStyle={{
                                            fontSize: 20,
                                            color: '#000',
                                        }}
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
            <Modal
  visible={winModalVisible}
  transparent={true}
  animationType="slide"
  onRequestClose={() => setWinModalVisible(false)}
>
  <View style={style.modalOverlay}>
    <View style={style.modalContent}>
      <Text style={style.modalTitle}>You Won!</Text>
      {winInfo && (
        <>
          <Image source={{ uri: winInfo.image }} style={style.winMobImage} />
          <Text style={style.winText}>Mob: <Text style={{fontWeight: 'bold'}}>{winInfo.mob}</Text></Text>
          <Text style={style.winText}>Score: <Text style={{fontWeight: 'bold'}}>{winInfo.score}</Text></Text>
          <Text style={style.winText}>Date: <Text style={{fontWeight: 'bold'}}>{winInfo.date}</Text></Text>
        </>
      )}
      <TouchableOpacity
        style={style.closeModalButton}
        onPress={() => {
            setWinModalVisible(false);
            navigation.reset({
                index: 0,
                routes: [{ name: 'HomePage' }],
            });
        }}
      >
        <Text style={style.buttonText}>Main Menu</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[style.closeModalButton, {marginTop: 8}]}
        onPress={() => {
            setWinModalVisible(false);
            navigation.reset({
                index: 1,
                routes: [
                    { name: 'HomePage' },
                    { name: 'Leaderboard' }
                ],
            });
        }}
      >
        <Text style={style.buttonText}>Leaderboard</Text>
      </TouchableOpacity>
    </View>
  </View>
</Modal>
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
        width: 110,
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
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 20,
        width: 320,
        alignItems: 'center',
    },
    modalTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 16,
        color: '#222',
    },
    winMobImage: {
        width: 80,
        height: 80,
        borderRadius: 10,
        marginBottom: 12,
        borderWidth: 2,
        borderColor: '#a0c4ff',
        backgroundColor: '#fff',
    },
    winText: {
        fontSize: 18,
        color: '#222',
        marginBottom: 6,
    },
    closeModalButton: {
        backgroundColor: '#a0c4ff',
        padding: 10,
        borderRadius: 6,
        marginTop: 16,
        alignItems: 'center',
        width: 160,
    },
    buttonText: {
        color: '#222',
        fontWeight: 'bold',
        fontSize: 16,
        textAlign: 'center',
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