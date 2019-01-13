import { AsyncStorage } from 'react-native';

const getData = async (key) => {
  return new Promise(async (resolve, reject) => {
    try {
      const value = await AsyncStorage.getItem(key);
      if (value !== null) {
        // log(value);
        resolve(JSON.parse(value));
      } else {
        reject('no-key');
      }
    } catch (error) {
      reject(error);
    }
  });
};

const setData = async (key, data) => {
  return new Promise(async (resolve, reject) => {
    try {
      await AsyncStorage.setItem(key, JSON.stringify(data));
      resolve();
    } catch (error) {
      reject(error);
    }
  });
};

export const storage = {
  getData,
  setData,
};
