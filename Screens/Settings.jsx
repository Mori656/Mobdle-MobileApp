import { TextInput, StyleSheet, Text, TouchableOpacity, View, ImageBackground, Image, Modal, FlatList, } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState, useEffect } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import userImages from '../Components/UserImages';

export default function Settings() {
  const [username, setUsername] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const saveUsername = async () => {
    try {
      await AsyncStorage.setItem('username', username);
    } catch (e) {
      console.error('AsyncStorage error:', e);
    }
  };

  const saveUserImage = async (img) => {
    try {
      await AsyncStorage.setItem('userImage', img);
      setSelectedImage(img);
      setModalVisible(false);
    } catch (e) {
      console.error('AsyncStorage error:', e);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      const loadData = async () => {
        try {
          const savedName = await AsyncStorage.getItem('username');
          if (savedName !== null) setUsername(savedName);
          const savedImg = await AsyncStorage.getItem('userImage');
          if (savedImg) setSelectedImage(savedImg);
        } catch (e) {
          console.error('Failed to load data', e);
        }
      };
      loadData();
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
          <TouchableOpacity style={style.imageSelect} onPress={() => setModalVisible(true)}>
            {selectedImage ? 
            (
              <Image style={style.imageSelect} source={{ uri: selectedImage }} />
            ):(
              <View style={[style.imageSelect, { backgroundColor: '#a0c4ff' }]} />
            )}
          </TouchableOpacity>

          <Modal
            visible={modalVisible}
            transparent={true}
            animationType="slide"
            onRequestClose={() => setModalVisible(false)}
          >
            <View style={style.modalOverlay}>
              <View style={style.modalContent}>
                <Text style={style.modalTitle}>Choose an Image</Text>
                <FlatList
                  data={userImages}
                  keyExtractor={(item, id) => id.toString()}
                  numColumns={4}
                  renderItem={({ item }) => (
                    <TouchableOpacity style={style.gridImageWrapper} onPress={() => saveUserImage(item)}>
                      <Image source={{ uri: item }} style={style.gridImage} />
                    </TouchableOpacity>
                  )}
                />
                <TouchableOpacity style={style.closeModalButton} onPress={() => setModalVisible(false)}>
                  <Text style={style.buttonText}>Close</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>

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
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#FFF',
    borderRadius: 10,
    padding: 20,
    width: 350,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#222',
  },
  gridImageWrapper: {
    margin: 4,
    borderWidth: 2,
    borderColor: '#a0c4ff',
  },
  gridImage: {
    width: 65,
    height: 65,
    resizeMode: 'cover',
  },
  closeModalButton: {
    backgroundColor: '#a0c4ff',
    padding: 10,
    marginTop: 16,
    alignItems: 'center',
    width: 100,
  },
});
