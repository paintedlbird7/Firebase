import React from 'react';
import {getAllDocumentsWithPath} from './api/firestore/DocumentRetriever';
import {FlatList, View, StyleSheet} from 'react-native';

export default function List() {
  const [itemsArray, setItemsArray] = React.useState([]);

  React.useEffect(() => {
    console.log(getAllDocumentsWithPath('items'));
    setItemsArray(itemsArray);
    console.log(itemsArray);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const renderItem = ({item}) => {
    console.log(item);
    return (
      <>
        <View>{item.description}</View>
        <View style={styles.font}>{item.name}</View>
      </>
    );
  };

  return (
    <View style={styles.container}>
      {itemsArray && (
        <FlatList
          itemsArray={itemsArray}
          renderItem={renderItem}
          keyExtractor={item => item.id.toString()}
        />
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
  font: {
    justifyContent: 'center',
    fontSize: 111,
    color: 'red',

  }
});
