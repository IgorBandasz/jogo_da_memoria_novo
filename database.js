//Firebase

// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
import { getFirestore, collection, getDoc, doc, setDoc } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-firestore.js";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
apiKey: "AIzaSyDCvydcHneq1kv48nDrWkOyeLaXhRRbktY",
authDomain: "jogo-memoria-2ed97.firebaseapp.com",
projectId: "jogo-memoria-2ed97",
storageBucket: "jogo-memoria-2ed97.firebasestorage.app",
messagingSenderId: "507836348079",
appId: "1:507836348079:web:1cfc46cd07e847f1a3c65a",
measurementId: "G-CQ4DKL3JWL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);

async function getJogador(id) {
    const docRef = doc(firestore, "jogadores", id);
    const docSnap = await getDoc(docRef);

    const jogador = {
        id: docSnap.id,
        ...docSnap.data()
    }
    console.log(jogador)
    return jogador;
}

async function salvarPontuacao(id, nivel, pontos){
    let objeto;
    switch (nivel) {
        case 1:
            objeto = { facil: pontos }
            break;
        case 2:
            objeto = { medio: pontos }
            break;
        case 3:
            objeto = { dificil: pontos }
            break;
        default:
            break;
    }

    await setDoc(doc(firestore, "jogadores", id), 
        objeto,
        { merge: true });
}

export {getJogador, salvarPontuacao}