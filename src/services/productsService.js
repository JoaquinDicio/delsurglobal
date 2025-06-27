import app from "../firebase";
import {
  getFirestore,
  addDoc,
  collection,
  query,
  doc,
  getDocs,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";

const db = getFirestore(app);

const productsService = {
  add: async (newProduct) => {
    try {
      const reference = await addDoc(collection(db, "products"), newProduct);

      return { ok: true, doc: reference };
    } catch (error) {
      return { ok: false, msg: "Error al guardar el producto", error };
    }
  },

  update: async (id, editedProduct) => {
    try {
      const productRef = doc(db, "products", id);

      await updateDoc(productRef, editedProduct);

      return { ok: true };
    } catch (error) {
      console.error("Error actualizando el producto:", error);

      return { ok: false, error };
    }
  },

  delete: async (id) => {
    try {
      await deleteDoc(doc(db, "products", id));

      return { ok: true };
    } catch (error) {
      console.error("Error eliminando el producto:", error);

      return { ok: false, error };
    }
  },

  getAll: async () => {
    try {
      const q = query(collection(db, "products"));

      const querySnapshot = await getDocs(q);

      const results = [];

      querySnapshot.forEach((doc) => {
        results.push({ id: doc.id, ...doc.data() });
      });

      return results;
    } catch (error) {
      return { ok: false, error, msg: "Error obteniendo los productos" };
    }
  },
};

export default productsService;
