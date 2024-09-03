import React, { useState } from "react";
import { db } from "../firebase";
import { addDoc, collection } from "firebase/firestore";
import { MdAdd } from "react-icons/md";
import { MdRemoveCircleOutline } from "react-icons/md";


const style = {
  bg: `w-screen px-4 py-8 bg-[#EAE7E7]`,
  container: `flex flex-col gap-8 bg-white p-4     mx-auto max-w-screen-lg`,
  heading: `text-3xl font-bold text-center text-gray-800`,
  form: `flex flex-col gap-4`,
  label: `text-xs font-semibold uppercase`,
  input: `border p-2 w-full text-lg rounded-md`,
  inputSmall: `border p-2 w-[90px] text-lg rounded-md`,
  button: `rounded-md px-3 py-2 bg-[#ffa504] font-medium text-[#231f1f]`,
  addBut: `flex gap-1 items-center rounded-md px-2 py-1 bg-[#FFD78D] cursor-pointer`,
};

const AddRecipe = () => {
  const [name, setName] = useState("");
  const [glass, setGlass] = useState("");
  const [instructions, setInstructions] = useState("");
  const [garnish, setGarnish] = useState("");
  const [addNotes, setAddNotes] = useState("");
  const [tags, setTags] = useState([
    { tag: "" }
  ]);
  const [ingredients, setIngredients] = useState([
    { measurement: "", liquor: "" },
  ]);
  const handleFormChange = (event, index) => {
    let ingredient = [...ingredients];
    ingredient[index][event.target.name] = event.target.value;
    setIngredients(ingredient);
  }
  const addField = () => {
    let object = {
      measurement: "",
      liquor: ""
    }
    setIngredients([...ingredients, object])
  }
  const removeField = (index) => {
    let ingredient = [...ingredients];
    ingredient.splice(index, 1)
    setIngredients(ingredient)
  }

  const handleTags = (event, index) => {
    let tag = [...tags];
    tag[index][event.target.name] = event.target.value;
    setTags(tag);
  }
  const addTag = () => {
    let object = { tag: "" };
    setTags([...tags, object])
  }
  const removeTag = (index) => {
    let tag = [...tags];
    tag.splice(index, 1)
    setTags(tag)
  }

  // Create todo
  const addRecipe = async (e) => {
    e.preventDefault(e);
    if (name === "") {
      alert("Please enter a valid name");
      return;
    }
    await addDoc(collection(db, "recipes"), {
      name: name,
      glass: glass,
      instructions: instructions,
      ingredients: ingredients,
      garnish: garnish,
      notes: addNotes,
      tags: tags,
    });
    setName("");
    setGlass("");
    setInstructions("");
    setIngredients([{ measurement: "", liquor: "" }]);
    setGarnish("");
    setAddNotes("");
    setTags([{ tag: "" }]);
  };

  return (
    <div className={style.bg}>
      <div className={style.container}>
        <form onSubmit={addRecipe} className={style.form}>
          <div className="flex flex-col gap-2">
            <label className={style.label}>Name</label>
            <input
              list="format-options"
              onChange={(e) => setName(e.target.value)}
              className={style.input}
              placeholder="Margarita"
              type="text"
              value={name}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className={style.label}>Glass</label>
            <select
              name="glass"
              required
              onChange={(e) => setGlass(e.target.value)}
              className={style.input}
              defaultValue=""
            >
              <option value="" disabled>
                Choose a cup...
              </option>
              <option value="24 oz Cup">24 oz Cup</option>
              <option value="16 oz Cup">16 oz Cup</option>
              <option value="14 oz Cup">14 oz Cup</option>
              <option value="10 oz Cup">10 oz Cup</option>
            </select>
          </div>

          <div className="flex flex-col gap-2">
            <label className={style.label}>Instructions</label>
            <input
              list="format-options"
              onChange={(e) => setInstructions(e.target.value)}
              className={style.input}
              placeholder="Build in mixing glass with ice, Shake and strain into ice-packed glass."
              type="text"
              value={instructions}
            />
          </div>

          <div className="flex flex-col gap-2">
            <div className="flex justify-between items-center">
              <label className={style.label}>Ingredients</label>
              <div className={style.addBut} onClick={addField}>
                <MdAdd /> Add
              </div>
            </div>
            <div className="flex flex-col gap-4">
              {ingredients.map((form, index) => {
                return (
                  <div key={index} className="flex gap-4">
                    <input
                      className={style.inputSmall}
                      name="measurement"
                      placeholder="2 oz"
                      onChange={(event) => handleFormChange(event, index)}
                      value={form.measurement}
                    />
                    <input
                      className={style.input}
                      name="liquor"
                      placeholder="Liquor of choice"
                      onChange={(event) => handleFormChange(event, index)}
                      value={form.liquor}
                    />
                    <button onClick={() => removeField(index)}>
                      <MdRemoveCircleOutline />
                    </button>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className={style.label}>Garnish</label>
            <input
              list="format-options"
              onChange={(e) => setGarnish(e.target.value)}
              className={style.input}
              placeholder="Salted Rim, Lime Wedge"
              type="text"
              value={garnish}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className={style.label}>Additional Notes</label>
            <input
              list="format-options"
              onChange={(e) => setAddNotes(e.target.value)}
              className={style.input}
              placeholder="Upsell Casamigos Blanco"
              type="text"
              value={addNotes}
            />
          </div>

          <div className="flex flex-col gap-2">
            <div className="flex justify-between items-center">
              <label className={style.label}>Tags</label>
              <div className={style.addBut} onClick={addTag}>
                <MdAdd /> Add
              </div>
            </div>
            <div className="flex flex-col gap-4">
              {tags.map((form, index) => {
                return (
                  <div key={index} className="flex gap-4">
                    <input
                      name="tag"
                      onChange={(event) => handleTags(event, index)}
                      className={style.input}
                      placeholder="Summer 2024"
                      type="text"
                      value={form.tag}
                    />
                    <button onClick={() => removeTag(index)}>
                      <MdRemoveCircleOutline />
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </form>

        <button className={style.button} onClick={(e) => addRecipe(e)}>
          Add Recipe
        </button>
      </div>
    </div>
  );
};

export default AddRecipe;