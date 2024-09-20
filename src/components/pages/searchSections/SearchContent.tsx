"use client";
import { useState } from "react";
import { useGetCategorySeveralQuery } from "@/redux/api/category";
import { ColorExtractor } from "react-color-extractor";
import scss from "./SearchContent.module.scss";

const SearchContent = () => {
  const { data, isLoading, error } = useGetCategorySeveralQuery();
  const [colors, setColors] = useState<string[][]>([]);

  if (isLoading) {
    return <p>Loading...</p>;
  }
  if (error) {
    return <p>Error loading categories</p>;
  }
  const itemCategory = data?.categories.items;

  const addColors = (newColors: string[], index: number) => {
    setColors((prevColors) => {
      const updatedColors = [...prevColors];
      updatedColors[index] = newColors;
      return updatedColors;
    });
  };

  return (
    <section className={scss.SearchContent}>
      <div className="container">
        <div className={scss.content}>
          <div className="">
            {itemCategory?.map((item, index) => (
              <div key={index}>
                {/* Проверка наличия иконки */}
                {item.icons.length > 0 && (
                  <ColorExtractor
                    src={item.icons[0]?.url}
                    onExtract={(colors) => addColors(colors, index)}
                  />
                )}
                <div
                  style={{
                    background: `url(${item.icons[0]?.url}) no-repeat center/cover`,
                    width: "200px",
                    height: "200px",
                    cursor: "pointer",
                    border: `5px solid ${colors[index]?.[0] || "#000"}`,
                  }}
                  className=""
                >
                  <p>{item.name}</p>
                </div>
                {/* Проверка, что цвета успешно извлечены */}
                {colors[index]?.length > 0 && (
                  <div
                    style={{ display: "flex", gap: "10px", marginTop: "10px" }}
                  >
                    {colors[index].map((color, i) => (
                      <div
                        key={i}
                        style={{
                          width: "30px",
                          height: "30px",
                          backgroundColor: color,
                        }}
                      ></div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SearchContent;
