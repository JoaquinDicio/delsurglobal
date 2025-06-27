import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import app from "../firebase";

const auth = getAuth(app);

const authService = {
  login: async (form) => {
    const { password, email } = form;

    try {
      const { user } = await signInWithEmailAndPassword(auth, email, password);
      if (user) return { ok: true, user };
    } catch (error) {
      return { ok: false, error, msg: "Credenciales invalidas" };
    }
  },
};

export default authService;
