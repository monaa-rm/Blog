import { initializeApp } from "firebase/app";

export const firebaseConfig = {
  apiKey: "AIzaSyCEVD-c4JX07IWITKdiRYwTuL0_1_A2MtM",
  authDomain: "weblog-proj.firebaseapp.com",
  projectId: "weblog-proj",
  storageBucket: "weblog-proj.appspot.com",
  messagingSenderId: "313375596988",
  appId: "1:313375596988:web:f6bc6a83a19e433b048bb9"
};

const app = initializeApp(firebaseConfig);