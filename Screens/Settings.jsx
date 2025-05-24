import {
  TextInput,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ImageBackground,
  Image,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState, useEffect } from 'react';
import { useFocusEffect } from '@react-navigation/native';

export default function Settings() {
  const [username, setUsername] = useState('');

  const saveUsername = async () => {
    try {
      await AsyncStorage.setItem('username', username);
    } catch (e) {
      console.error('AsyncStorage error:', e);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      const loadUsername = async () => {
        try {
          const savedName = await AsyncStorage.getItem('username');
          if (savedName !== null) {
            setUsername(savedName);
          }
        } catch (e) {
          console.error('Failed to load username', e);
        }
      };
      loadUsername();
    }, [])
  );

  return (
    <View style={style.mainContainer}>
      <ImageBackground
        source={require('../assets/img/MainPageBackground.jpg')}
        resizeMode="cover"
      >
        <View style={style.contentContainer}>
          <View>
            <Image
              source={require('../assets/img/logo.png')}
              resizeMode="stretch"
              style={style.logo}
            />
          </View>

          <Text style={style.text}>Select Your Image</Text>
          <Image
            style={style.imageSelect}
            source={{ uri: 'https://minecraft.wiki/images/AllayFace.png?f466a' }}
          />

          <Text style={style.text}>Select Your Name</Text>
          <TextInput
            value={username}
            onChangeText={setUsername}
            style={style.input}
            placeholder="Username"
          />

          <TouchableOpacity onPress={saveUsername} style={style.button}>
            <Text style={style.buttonText}>Save</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
}

const style = StyleSheet.create({
  mainContainer: {
    width: '100%',
    height: '100%',
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
    marginBottom: 100,
  },
  imageSelect: {
    height: 100,
    width: 100,
    marginBottom: 50,
  },
  input: {
    fontFamily: 'minecraft-regular',
    backgroundColor: '#a0c4ff',
    width: 275,
    height: 50,
    fontSize: 24,
    paddingHorizontal: 10,
  },
  text: {
    fontFamily: 'minecraft-regular',
    fontSize: 36,
    color: '#FFF',
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#a0c4ff',
    padding: 12,
    marginTop: 20,
    alignItems: 'center',
  },
  buttonText: {
    fontWeight: 'bold',
    fontSize: 20,
  },
});
