import storage from '@react-native-firebase/storage';

export async function getImageAtPath(path: string) {
  const storageRef = storage().ref(path);
  // console.log('path: ', path);
  return await storageRef
    .getDownloadURL()
    .then(url => {
      // console.log(`Successfully retrieved imageUrl(${url}) at path(${path})`);
      return {imageUrl: url, wasSuccessful: true, error: null};
    })
    .catch(error => {
      return handleUnsuccessfulImageRetrieval(path, error);
    });
}

export async function getImageMetadataAtPath(path: string) {
  const storageRef = storage().ref(path);
  return await storageRef
    .getMetadata()
    .then(metadata => {
      return {timeCreated: metadata.timeCreated, error: undefined};
    })
    .catch(error => {
      return {timeCreated: '', error};
    });
}

export async function storeImage(name: string, path: string) {
  const reference = storage().ref(name);
  return reference.putFile(path).on('state_changed', snapshot => {
    if (snapshot.state === 'success') {
      return snapshot.ref.path;
    }
  });
}

function handleUnsuccessfulImageRetrieval(path: string, error: any) {
  // console.warn(`Error retrieving image at path(${path}) ERR: ${error}`);
  return {imageUrl: null, wasSuccessful: false, error: error};
}
