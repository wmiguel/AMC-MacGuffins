import React, {useEffect, useState} from "react";
import { Link } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";
import { MdAdd } from "react-icons/md";
import { MdLogout } from "react-icons/md";
import { FaUser } from "react-icons/fa6";
import { FaFilter } from "react-icons/fa6";
import { db } from "../firebase";
import {
  query,
  collection,
  onSnapshot,
  orderBy,
} from "firebase/firestore";
// import Tags from "./Tags";

const Navbar = () => {
  const { user, logOut } = UserAuth();
  const [tags, setTags] = useState([]);
  console.log(tags);

  // Read todo from firebase
  useEffect(() => {
    const q = query(collection(db, "recipes"), orderBy("name"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let todosArr = [];
      querySnapshot.forEach((doc) => {
        todosArr.push({ ...doc.data(), id: doc.id });
      });
      setTags(todosArr);
      // setRecipes(todosArr);
    });
    return () => unsubscribe();
  }, []);

  const handleSignOut = async () => {
    try {
      await logOut();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <nav className="bg-[#231f1f] px-4 py-2">
      <div className="mx-auto max-w-screen-lg">
        <div className="flex h-16 items-center justify-between">
          <Link to="/" className="text-xl font-medium text-[#ffa504]">
            MacGuffins Bar Recipes
          </Link>

          <div className="flex gap-4">
            {user ? (
              <>
                <Link
                  className="rounded-md bg-[#ffa504] px-3 py-2 text-lg font-medium text-[#231f1f]"
                  to="/addrecipe"
                >
                  <MdAdd />
                </Link>
                <button
                  className="rounded-md bg-[#ffa504] px-3 py-2 text-lg font-medium text-[#231f1f]"
                  onClick={handleSignOut}
                >
                  <MdLogout />
                </button>
              </>
            ) : (
              <>
                <Link
                  className="rounded-md bg-[#ffa504] px-3 py-2 text-lg font-medium text-[#231f1f]"
                  to="/signin"
                >
                  <FaUser />
                </Link>
                <Link className="rounded-md bg-[#ffa504] px-3 py-2 text-lg font-medium text-[#231f1f]">
                  <FaFilter />
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
      {/* <div className="mx-auto max-w-screen-lg">
        <div className="flex h-16-items-center-justify-between">
          <Tags tags={tags} />
        </div>
      </div> */}
    </nav>
  );
};

export default Navbar;