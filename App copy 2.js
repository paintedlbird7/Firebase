// import {useEffect} from 'react';
// import firestore from '@react-native-firebase/firestore';

// function Task({taskId}) {
//   const usersCollection = firestore().collection('task');
//   // Get user document with an ID of ABC
//   const userDocument = firestore().collection('task').doc('description');

//   useEffect(() => {
//     const subscriber = firestore()
//       .collection('task')
//       .doc(taskId)
//       .onSnapshot(documentSnapshot => {
//         console.log('Task data: ', documentSnapshot.data());
//       });

//     // Stop listening for updates when no longer required
//     return () => subscriber();
//   }, [taskId]);
// }
