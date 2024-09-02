import React from "react";

// const style = {
//   details: `bg-white w-full rounded overflow-hidden p-4`,
//   summary: `flex font-semibold text-xl justify-between items-center`,
//   data: `flex flex-col gap-4 pt-4`,
// };

const Tags = ({ tags }) => {
  console.log(tags);

  const tagSet = new Set(tags.map((tag) => tag.tags));
  const tagSorted = [...tagSet].sort();
  console.log(tagSorted);

  return (
    <>
      {tags ? (
        <>
          {tagSorted.length === 1 ? null : (
            <>
              {tagSorted.map((item, index) => {
                console.log(item);
                const resDirector = item.filter(
                  (crew) => crew.tag === "Director"
                );
                console.log(resDirector)
                return (
                  <div
                    key={index}
                    // className={`${highlight === index ? "highlight" : ""}`}
                    // onClick={() => dateSelected(date, index)}
                  >
                    <p>Today</p>
                  </div>
                );
              })}
            </>
          )}
        </>
      ) : null}
    </>
  );
};

export default Tags;