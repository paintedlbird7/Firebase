import firestore from '@react-native-firebase/firestore';

export const createDocumentWithId = async (
  path: string,
  documentId: string,
  data: Object,
) => {
  return await firestore()
    .collection(path)
    .doc(documentId)
    .set(data)
    .then(() => {
      return {error: undefined};
    })
    .catch(error => {
      return {error: error};
    });
};
export const createDocumentWithRandomId = async (
  path: string,
  data: Object,
) => {
  return await firestore()
    .collection(path)
    .add(data)
    .then(doc => {
      return doc.id;
    });
};

export const updateDocument = async (path: string, id: string, data: {}) => {
  await firestore().collection(path).doc(id).update(data);
};

export const updateDocumentByField = async (
  path: string,
  documentId: string,
  fieldToUpdate: string,
  data: Object,
) => {
  return await firestore()
    .collection(path)
    .doc(documentId)
    .update({[fieldToUpdate]: data})
    .then(() => {
      return {error: undefined};
    })
    .catch(error => {
      return {error: error};
    });
};
