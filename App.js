import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import ItemComponent from './ItemComponent';
import database from '@react-native-firebase/database';

let itemsRef = database().ref('/task');

export default function List() {
  console.log(List);
  const [itemsArray, setItemsArray] = React.useState([]);

  React.useEffect(() => {
    itemsRef.on('value', snapshot => {
      console.log(data);
      let data = snapshot.val();
      const task = Object.values(data);
      setItemsArray(task);
    });
  }, []);

  return (
    <View style={styles.container}>
      {/* <Flatlist /> */}
      {itemsArray.length > 0 ? (
        <ItemComponent task={itemsArray} />
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
