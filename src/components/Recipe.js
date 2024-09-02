import React from "react";

const style = {
  details: `bg-white w-full rounded overflow-hidden p-4`,
  summary: `flex font-semibold text-xl justify-between items-center`,
  data: `flex flex-col gap-4 pt-4`,
};

const Recipe = ({ recipe }) => {
  // console.log(recipe.name);
  // console.log(recipe.tags);

  return (
    <details className={style.details}>
      <summary className={style.summary}>
        <span>{recipe.name}</span>
        <div>
          {recipe.tags ? (
            <>
              {recipe.tags.map((tag, index) => (
                <span
                  className="text-red-500 ml-2 font-medium text-xs uppercase"
                  key={index}
                >
                  {tag.tag}
                </span>
              ))}
            </>
          ) : null}
        </div>
      </summary>
      <div className={style.data}>
        <p className="font-medium text-lg">{recipe.glass}</p>

        <p className="text-base">{recipe.instructions}</p>

        <table className="">
          <tbody>
            {recipe.ingredients.map((ingredient, index) => (
              <tr key={index}>
                <td className="font-bold py-2 w-24">{ingredient.measurement}</td>
                <td className="py-2">{ingredient.liquor}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <p className="font-medium text-base">
          <strong>Garnish:</strong> {recipe.garnish}
        </p>

        {recipe.notes ? (
          <p className="font-medium text-base">
            <strong>Additional Notes:</strong> {recipe.notes}
          </p>
        ) : null}
      </div>
    </details>
  );
};

export default Recipe;