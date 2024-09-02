import React, { useState, useEffect } from "react";
import Recipe from "../components/Recipe";
import { db } from "../firebase";
import {
  query,
  collection,
  onSnapshot,
  orderBy,
  // updateDoc,
  // doc,
  // addDoc,
  // deleteDoc,
} from "firebase/firestore";

const style = {
  bg: `w-screen px-4 py-8 bg-[#EAE7E7]`,
  footer: `text-center pt-4`,
};

const Home = () => {
  const [recipes, setRecipes] = useState([]);

  // Read todo from firebase
  useEffect(() => {
    const q = query(collection(db, "recipes"), orderBy("name"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let todosArr = [];
      querySnapshot.forEach((doc) => {
        todosArr.push({ ...doc.data(), id: doc.id });
      });
      setRecipes(todosArr);
    });
    return () => unsubscribe();
  }, []);
  return (
    <div className={style.bg}>
      {/* <div>2024 Recipes</div> */}
      <div className="flex flex-wrap gap-4 justify-between mx-auto max-w-screen-lg">
        {recipes.map((recipe, index) => (
          <Recipe key={index} recipe={recipe} />
        ))}
      </div>

      <p className={style.footer}>Coded by William Miguel</p>
    </div>
  );
};

export default Home;