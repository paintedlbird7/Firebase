import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import ItemComponent from './ItemComponent';

import database from '@react-native-firebase/database';

let itemsRef = database().ref('/items');

export default function List() {
  const [itemsArray, setItemsArray] = React.useState([]);

  React.useEffect(() => {
    itemsRef.on('value', snapshot => {
      let data = snapshot.val();
      console.log(data);
      const items = Object.values(data);
      setItemsArray(items);
      console.log(items);
    });
  }, []);

  return (
    <View style={styles.container}>
      {itemsArray.length > 0 ? (
        <ItemComponent items={itemsArray} />
      ) : (
        <Text>No items</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ebebeb',
  },
});
