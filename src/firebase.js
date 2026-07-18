import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"

// ============================================================================
// Reemplaza estos valores con los de TU proyecto de Firebase:
// Firebase Console → ⚙️ Configuración del proyecto → "Tus apps" → app Web
// (Ver el paso a paso completo en el README.md)
//
// Estas claves NO son secretas: Firebase está diseñado para que este objeto
// viaje al navegador y sea público. La seguridad real la da el método de
// inicio de sesión (correo/contraseña) y las reglas de Firebase, no el
// hecho de ocultar esta configuración.
// ============================================================================
const firebaseConfig = {
  apiKey: "TU_API_KEY",
  authDomain: "TU_PROYECTO.firebaseapp.com",
  projectId: "TU_PROYECTO",
  storageBucket: "TU_PROYECTO.appspot.com",
  messagingSenderId: "TU_SENDER_ID",
  appId: "TU_APP_ID",
}

export const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
