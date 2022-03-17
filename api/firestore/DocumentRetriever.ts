import firebase, {
  FirebaseFirestoreTypes,
} from '@react-native-firebase/firestore';

export async function getAllDocumentsWithPath(path: string) {
  let documents;
  return await firebase()
    .collection(path)
    .get()
    .then(querySnapshot => {
      documents = getDocumentsFromQuerySnapshot(querySnapshot);
      if (documents.length > 0) {
        console.log(
          `The following documents were successfully retrieved at path(${path}): ${JSON.stringify(
            documents,
            null,
            2,
          )}`,
        );
        return {
          path: path,
          id: null,
          data: documents,
          wasSuccessful: true,
          error: undefined,
        };
      }
    });
}

export const getDocumentWithPathAndId = async (
  path: string,
  documentId: string,
) => {
  return await firebase()
    .collection(path)
    .doc(documentId)
    .get()
    .then(doc => {
      if (doc.exists) {
        return {
          path: path,
          id: documentId,
          data: doc.data(),
          wasSuccessful: true,
          error: undefined,
        };
      } else {
        return handleUnsuccessfulRetrieval(
          path,
          documentId,
          `No document found at path(${path})`,
        );
      }
    })
    .catch(error => {
      return handleUnsuccessfulRetrieval(path, documentId, error);
    });
};

export const getDocumentsInNestedCollection = async (
  path: string,
  documentId: string,
  nestedCollection: string,
) => {
  return await firebase()
    .collection(path)
    .doc(documentId)
    .collection(nestedCollection);
};

/**
 * Used to filter documents.
 * @link https://googleapis.dev/nodejs/firestore/latest/CollectionReference.html#where
 */
export type WhereCriteria = {
  field: string;
  operation: FirebaseFirestoreTypes.WhereFilterOp;
  criteria: any;
};

/**
 * Retrieve document at a given path that matches one set of criteria
 * @param path The collection to read from
 * @param criteria The set of instructors to filter documents by
 */
export async function getDocumentsWithCriteria(
  path: string,
  criteria: WhereCriteria,
) {
  const query = firebase()
    .collection(path)
    .where(
      criteria.field || firebase.FieldPath.documentId(),
      criteria.operation,
      criteria.criteria,
    );
  return await query
    .get()
    .then(querySnapshot => {
      return handleWhereQuery(path, querySnapshot);
    })
    .catch(error => {
      return handleUnsuccessfulRetrieval(path, null, error);
    });
}

/**
 * Retrieve document at a given path that matches two set of criteria
 * @param path The collection to read from
 * @param criteria The set of instructors to filter documents by
 */
export const getDocumentsWithTwoCriteria = async (
  path: string,
  criteria: WhereCriteria[],
) => {
  const query = firebase()
    .collection(path)
    .where(criteria[0].field, criteria[0].operation, criteria[0].criteria)
    .where(criteria[1].field, criteria[1].operation, criteria[1].criteria);
  return await query
    .get()
    .then(querySnapshot => {
      return handleWhereQuery(path, querySnapshot);
    })
    .catch(error => {
      return handleUnsuccessfulRetrieval(path, null, error);
    });
};

/**
 * Handle the result of a where query and it's list of QuerySnapshots
 * @param path The collection that the documents are returned from
 * @param snapshot The result of a where query - containing a list of data
 */
async function handleWhereQuery(
  path: string,
  snapshot: FirebaseFirestoreTypes.QuerySnapshot,
) {
  const documents = getDocumentsFromQuerySnapshot(snapshot);
  if (documents.length > 0) {
    // console.log(`The following documents were successfully retrieved at path(${path}) where (${field} ${operation} ${criteria}): ${JSON.stringify(documents, null, 2)}`);
    return {
      path: path,
      id: null,
      data: documents,
      wasSuccessful: true,
      error: undefined,
    };
  } else {
    return handleUnsuccessfulRetrieval(
      path,
      null,
      `No documents found at path(${path})`,
    );
  }
}

const handleUnsuccessfulRetrieval = (
  path: string,
  documentId: string | null,
  error: any,
) => {
  console.log(
    `Error retrieving document(${documentId}) path(${path}). ERR: ${error}`,
  );
  return {
    path: path,
    id: documentId,
    data: null,
    wasSuccessful: false,
    error: error,
  };
};

export function getDocumentsFromQuerySnapshot(
  querySnapshot: FirebaseFirestoreTypes.QuerySnapshot,
) {
  const documents: any = [];
  querySnapshot.forEach(doc => {
    documents.push({...doc.data(), id: doc.id});
  });
  return documents;
}
