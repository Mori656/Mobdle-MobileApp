import {ScrollView, StyleSheet, Text, TouchableOpacity, View, ImageBackground, Image } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';

import { versions } from '../Components/Versions';
import Block from '../Components/GameBlock';

export default function GamePage () {
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
        }]

    return (
        <View style={style.mainContainer}>
            <ImageBackground source={require('../assets/img/MainPageBackground.jpg')} resizeMode="cover">
                    <View style={style.contentContainer}>
                            <View>
                                <Image source={require('../assets/img/logo.png')} resizeMode="stretch" style={style.logo}/>
                            </View>

                            <View style={style.gameContainer}>
                                <View style={style.guessingZone}>
                                    {/* <Dropdown /> */}
                                    <TouchableOpacity style={style.select}></TouchableOpacity>
                                    <TouchableOpacity style={style.submit}>
                                        <Text style={style.submitText}>{'>'}</Text>
                                    </TouchableOpacity>
                                </View>


                                <ScrollView style={{height: 300, width: 350, marginTop: 20}} horizontal>
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
                                            {mobs.map((item, index) => (
                                                <View key={index} style={style.chosenItem}>
                                                    <Image source={{uri: item.image}} style={style.itemImage}/>
                                                    <Block text={versions[item.version]} status={'more'}></Block>
                                                    <Block text={item.health} status={'less'}></Block>
                                                    <Block text={item.height} status={'more'}></Block>
                                                    <Block text={item.behavior} status={'correct'}></Block>
                                                    <Block text={item.movement} status={'partial'}></Block>
                                                    <Block text={item.dimension} status={'correct'}></Block>
                                                </View>
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
        alignItems: 'stretch'
    },
    select: {
        backgroundColor: '#a0c4ff',
        width: 275,
        height: 70,
    },
    submit: {
        backgroundColor: '#a0c4ff',
        height: 70,
        width: 70,
        justifyContent: 'center',
    },
    submitText: {
        fontSize: 50,
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
        marginVertical: 5
    },
    itemImage: {
        height: 100,
        width: 100,
        borderWidth: 3,
        borderColor: '#ccc',
    },
})