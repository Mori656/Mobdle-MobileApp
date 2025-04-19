import {ScrollView, StyleSheet, Text, TouchableOpacity, View, ImageBackground, Image } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';


export function GamePage () {
    const mobs = [
        {
            "name": "Allay",
            "image": "https://minecraft.wiki/images/AllayFace.png?f466a",
            "version": 31,
            "health": 20,
            "height": 0.6,
            "behavior": [
              "Passive",
              "Neutral"
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
                                                    <View style={style.itemBlock}><Text>{item.version}</Text></View>
                                                    <View style={style.itemBlock}><Text>{item.health}</Text></View>
                                                    <View style={style.itemBlock}><Text>{item.height}</Text></View>
                                                    <View style={[style.itemBlock, {backgroundColor: '#ee5252'}]}><Text>{item.behavior}</Text></View>
                                                    <View style={style.itemBlock}><Text>{item.movement}</Text></View>
                                                    <View style={style.itemBlock}><Text>{item.dimension}</Text></View>
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
        height: 100,
        width: 400,
        marginTop: 50,
        marginBottom: 100
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
        height: 50,
        textAlign: 'center',
        textAlignVertical: 'bottom',
        color: '#fff',
        fontSize: 20
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
    itemBlock: {
        width: 100,
        height: 100,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#52ee52',
        borderWidth: 3,
        borderColor: '#ccc',
    }
})