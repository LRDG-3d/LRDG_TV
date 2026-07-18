import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"
import { getDatabase } from "firebase/database"

// Configuración de tu proyecto de Firebase (el-rosano).
// Estas claves no son secretas: Firebase está diseñado para que viajen al
// navegador. La seguridad la da el inicio de sesión con correo/contraseña
// y que solo tú tienes una cuenta creada en Authentication → Users.
const firebaseConfig = {
  apiKey: "AIzaSyA3ICC5J3soncJmPS_wXPzr1HEnyb3nLu4",
  authDomain: "el-rosano.firebaseapp.com",
  databaseURL: "https://el-rosano-default-rtdb.firebaseio.com",
  projectId: "el-rosano",
  storageBucket: "el-rosano.firebasestorage.app",
  messagingSenderId: "287622683451",
  appId: "1:287622683451:web:23ba9c3366b7b919d8f51e",
  measurementId: "G-V0BSYEDJNX",
}

export const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export const db = getDatabase(app)
