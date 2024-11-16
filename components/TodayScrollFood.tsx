"use client";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import React, { useEffect } from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

interface TodayScrollFoodProps {
  title: string;
  categoryId: number;
}

type Restaurant = {
  id?: number;
  name: string;
  address: string;
  business_hours?: string;
};

type FoodItem = {
  id: number;
  name: string;
  restaurant: Restaurant;
  image: string[];
  price: number;
};

export default function TodayScrollFood({
  title, categoryId,
}: TodayScrollFoodProps) {
  const [items, setItems] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    fetch(
      `http://localhost:3000/api/foods?categoryId=${categoryId}&page=1&limit=10`
    )
      .then((res) => res.json())
      .then((data) => {
        setItems(data.foods);
        setLoading(false);
      });
  }, []);

  const handleNavigate = (foodId: number) => {
    router.push("/foods/" + foodId);
  };
  const containerRef = React.useRef<HTMLDivElement>(null);
  const handleNext = () => {
    if (containerRef.current) {
      if (items.length - 1 > currentIndex) setCurrentIndex(currentIndex + 1);
      containerRef.current.scrollBy({ left: 180, behavior: "smooth" });
    }
  };

  const handlePrev = () => {
    if (containerRef.current) {
      if (0 < currentIndex) setCurrentIndex(currentIndex - 1);
      containerRef.current.scrollBy({ left: -180, behavior: "smooth" });
    }
  };

  if (isLoading) return <p>Loading...</p>;
  if (!items) return <p>No items</p>;

  return (
    <>
      <div
        className=" bg-white rounded-2xl w-full   "
        style={{ height: "300px !important" }}
      >
        <div
          className="w-full h-full flex flex-col px-4 pt-4 pb-2"
          style={{ height: "300px !important" }}
        >
          <div className="relative ml-3 text-xl font-bold mb-2">{title}</div>
          <div className="w-full relative h-full">
            {currentIndex > 0 && (
              <button
                onClick={handlePrev}
                className="absolute hover:text-beamin hover:bg-slate-50 bg-white top-20  w-8 h-8 rounded-full z-20"
              >
                <LeftOutlined />
              </button>
            )}
            <div
              ref={containerRef}
              className=" scroll-container  w-full h-full flex flex-row gap-3"
            >
              {items.map((item: FoodItem, index: number) => (
                <div onClick={() => handleNavigate(item.id)}
                  key={index}
                  className=" group w-48 h-full cursor-pointer "
                >
                  <div className="w-full h-2/3">
                    <div
                      className="group-hover:brightness-75"
                      style={{
                        position: "relative",
                        width: "100%",
                        height: "100%",
                      }}
                    >
                      <Image
                        layout="fill"
                        objectFit="cover"
                        src={item.image.length ? item.image[0] : ''}
                        alt={""}
                      ></Image>
                    </div>
                  </div>
                  <div className="group-hover:bg-slate-50 w-full h-1/3  flex flex-col pl-2 pr-2 border-solid border-2  border-beamin-50">
                    <div className="w-full truncate text-base ">
                      <span> {item.name} </span>
                    </div>
                    <div
                      className="w-full truncate text-sm "
                      style={{ color: "#959595" }}
                    >
                      <span> {item.restaurant.address}</span>
                    </div>
                    <div className="w-full text-sm border-t  border-beamin-50 mt-2 ">
                      <span className="mt-2">{item.restaurant.name}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {currentIndex < items.length - 1 && (
              <button
                onClick={handleNext}
                className="absolute hover:text-beamin hover:bg-slate-50 bg-white top-20 right-1  w-8 h-8 rounded-full z-20"
              >
                <RightOutlined />
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
