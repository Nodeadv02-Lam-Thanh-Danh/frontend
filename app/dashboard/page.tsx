import Category,{ CategoryItem } from "@/components/Category";
import TodayScrollFood from "@/components/TodayScrollFood";
import ScrollBar from "@/components/scrollBar";
import React from "react";

export default async function Home() {
    const res = await fetch("http://localhost:3000/api/food-categories");
  	const json = await res.json();
	const categoryItems: CategoryItem[] = json.categories;

    const banneritems = [
        {
            id: '1',
            name: 'anh 1',
            url: '/images/map1.png',
        },
        {
            id: '2',
            name: 'anh 2',
            url: '/images/map2.png',
        },
        {
            id: '3',
            name: 'anh 32',
            url: '/images/map3.png',
        },
        {
            id: '3',
            name: 'anh 32',
            url: '/images/map4.png',
        }
    ]

    return (
        <>
            <div className="grid grid-cols-12 gap-4">
                <div className="col-span-3 pt-3 pl-8 pr-8  z-40">
                    <div className="flex flex-col fixed  bg-white w-64 rounded-2xl  pl-3 pt-2  pb-5 gap-3  ">
                        <Category items={categoryItems} />
                    </div>
                </div>
                <div className="col-span-9 w-full  pt-3 pr-8 gap-3 flex flex-col">
                    <ScrollBar items={banneritems} ></ScrollBar>
					{
						categoryItems.map(item => (<TodayScrollFood key={item.id} title={item.name} categoryId={item.id} />))
					}
                </div>

            </div>

        </>
    )
}