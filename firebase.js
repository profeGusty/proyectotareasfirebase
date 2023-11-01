  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-app.js";
  // import { collection, getFirestore, addDoc} from "https://www.gstatic.com/firebasejs/10.4.0/firebase-firestore.js"
  import { collection,
           getFirestore,
           addDoc,
           getDocs,
           onSnapshot,
           deleteDoc,
           doc,
           getDoc,
           updateDoc
          } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-firestore.js"
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyCNddfZBYQ1WPBk_Pr4Z0DidEedlbFDD_E",
    authDomain: "fir-gustavo-bd66d.firebaseapp.com",
    projectId: "fir-gustavo-bd66d",
    storageBucket: "fir-gustavo-bd66d.appspot.com",
    messagingSenderId: "254691936537",
    appId: "1:254691936537:web:cb8e55e6f927f5f2c31d88"
  };

  // Initialize Firebase

  const app = initializeApp(firebaseConfig);

  const db = getFirestore()

  export const saveTask = (title, descripcion) => {
         addDoc(collection(db, 'task'), {title,descripcion})

  }

  export const getTasks = () => getDocs(collection(db,'task'))

  export const onGetTasks = (callback) => onSnapshot(collection(db,'task'),callback)

  export const deleteTask = (id) => deleteDoc(doc(db,'task',id))

  export const getTask = (id) => getDoc(doc(db,'task', id))

  export const updateTask = (id, newFields) => updateDoc (doc(db,'task',id),newFields)

  