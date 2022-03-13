// // Import the functions you need from the SDKs you need
// // Import Firestore database
// // import db from './firbase';
// import 'firebase/firestore';
// // import {initializeApp} from 'firebase/app';
// // import firebase from 'firebase/app';
// // import 'firebase/datastore';
// // import db 'firebase/datastore';
// import {useState, useEffect, FlatList, View} from 'react-native';
// import 'react-native-gesture-handler';

// // Firebase credentials
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// // const firebaseConfig = {
// //   apiKey: 'AIzaSyBzMLes9MMsMVHs0k21jEkjdDSnGJtsLtg',
// //   authDomain: 'test-tht-project.firebaseapp.com',
// //   projectId: 'test-tht-project',
// //   storageBucket: 'test-tht-project.appspot.com',
// //   messagingSenderId: '324516046360',
// //   appId: '1:324516046360:web:d48230e608a1d88ac8456d',
// //   measurementId: 'G-NY7T3TH2VM',
// // };

// // Initialize Firebase
// // firebase.initializeApp(firebaseConfig);
// // var db = firebase.firestore();

// export default function GetData() {
//   const [task, setTask] = useState([]); // Initial empty array of info

//   // const fetchData = async () => {
//   //   db.collection('data').get().then((querySnapshot => {
//   //       //loop forEach-data & store it in array to display
//   //       querySnapshot.forEach(documentSnapshot => {
//   //         var data = documentSnapshot.data();
//   //         setData(arr => [...arr , data]);
//   //         // ...documentSnapshot.data(),
//   //         // setData();
//   //       });
//   //     })
//   // }

//   // eslint-disable-next-line react-hooks/exhaustive-deps
//   const fetchData = async () => {
//     // eslint-disable-next-line no-undef
//     const response = db.collection('task');
//     const data = await response.get();
//     data.docs.forEach(item => {
//       setTask([...task, item.data()]);
//     });
//   };

//   useEffect(() => {
//     fetchData;
//   }, [fetchData]);

//   // Display the result on the page
//   return (
//     // eslint-disable-next-line react/react-in-jsx-scope
//     <View>
//       {task && (
//         // eslint-disable-next-line react/react-in-jsx-scope
//         <FlatList
//           // keyExtractor={item => item.id.toString()} //array type
//           // eslint-disable-next-line no-undef
//           data={data}
//           // eslint-disable-next-line no-shadow
//           renderItem={({task}) => {
//             // eslint-disable-next-line react/react-in-jsx-scope
//             return <View description={task.description} />;
//           }}
//         />
//       )}
//     </View>
//   );
// }

// // import firestore from '@react-native-firebase/firestore';

// // const usersCollection = firestore().collection('Users');

// // // Get user document with an ID of ABC
// // const userDocument = firestore().collection('Users').doc('ABC');

// // const tasks = await firestore().collection('Tasks').get();
// // const task = await firestore().collection('Tasks').doc('description').get();
