'use client';
import Image from "next/image";
import React from "react";
import { GroupItem } from "../types/my";

interface GroupItemProps {
	groupItems: GroupItem[];
	onDeleteItem: (foodId: number) => void;
}

export default function DetailsCart({groupItems, onDeleteItem}: GroupItemProps) {

	const deleteFood = async (id: number) => {
		try {
			const response = await fetch("http://localhost:3000/api/users/order/" + id, {
				method: "DELETE",
				credentials: 'include',
				headers: {
					"Content-Type": "application/json",
				}
			});
			const data = await response.json();
			if (response.ok) {
				if (data.result) {
					onDeleteItem(id);
				}
			}
		} catch (error) {
		} finally {
		}
	}
  return (
    <>
      {
	  	groupItems.map((groupItem, index) => {
			if (groupItem.items.length == 0) {
				return null;
			}

			return (
				<div className="w-full flex flex-col  bg-white rounded-md " key={index}>
					<div className=" flex flex-row my-7 ml-8 items-center gap-3">
						<input
						id="default-checkbox"
						type="checkbox"
						value=""
						className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded   dark:ring-offset-gray-800 "
						/>
						<span className="text-base font-normal">
						{" "}
						{groupItem.restaurant.name}
						</span>
						<div className=" bg-beamin p-1 rounded-md">
						<span className="text-sm font-normal text-white">
							Quán đối tác
						</span>
						</div>
					</div>
					<div className=" w-full border-t border-b border-solid border-gray-600 py-3">
						{
							groupItem.items.map((item, index) => {
								return (
									<div
										key={index}
										className={
										index === groupItem.items.length - 1
											? "w-full grid grid-cols-12"
											: "w-full grid grid-cols-12 border-b border-solid border-x-gray-300"
										}
									>
										<div className="pl-8  col-span-4 flex items-center flex-row gap-3">
										<input
											id="default-checkbox"
											type="checkbox"
											value=""
											className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded   dark:ring-offset-gray-800 "
										/>
										<div className="relative h-36 w-36">
											<Image
											layout="fill"
											objectFit="cover"
											src={item.food.image[0]}
											alt={""}
											/>
										</div>
										<div className="flex flex-col gap-3">
											<span className="text-base ">{item.food.name}</span>
											<span className="text-sm text-gray-600">
											{item.food.name}
											</span>
										</div>
										</div>
										<div className="col-span-2 flex items-center justify-center flex-row gap-3">
										₫{item.food.price.toLocaleString("en-US")}
										</div>
										<div className="col-span-2 flex items-center justify-center flex-row gap-3">
										<input
											type="number"
											id="quantity"
											className="w-16 text-center border border-gray-300 rounded"
											defaultValue={item.quantity}
											min="1"
											max="100"
										/>
										</div>
										<div className="col-span-2 flex items-center justify-center flex-row gap-3">
										₫{(item.quantity * item.food.price).toLocaleString("en-US")}
										</div>
										<div className="col-span-2 flex items-center justify-center flex-row gap-3">
										<span className=" hover:text-red-600 cursor-pointer" onClick={() => deleteFood(item.food.id)}>
											Xóa
										</span>
										</div>
									</div>
								)
							})
						}
					</div>
				</div>
			)
		})
		}
    </>
  );
}
