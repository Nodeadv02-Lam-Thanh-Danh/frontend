'use client';
import { ShoppingCartOutlined } from "@ant-design/icons";
import React, { useEffect } from "react";
import DetailsCart from "./detailsCart";
import { Button } from "antd";
import { GroupItem, OrderDetailItem } from "../types/my";
import { useRouter } from "next/navigation";

export default function Home() {
  const [count, setCount] = React.useState(0);
  const [total, setTotal] = React.useState(0);
  const [groupItems, setGroupItems] = React.useState<GroupItem[]>([]);
  const router = useRouter();

  useEffect(() => {
    fetch(`http://localhost:3000/api/users/order`, {
		credentials: "include",
		headers: {
			"Content-Type": "application/json"
		},
	})
	.then((res) => res.json())
    .then((data) => {
        let items: OrderDetailItem[] = data.order?.details || [];
		let count: number = 0;
		let total: number = 0;
		const groupItems: GroupItem[] = [];
		for (const item of items) {
			const idx = groupItems.findIndex(
			  (groupItem) => item.food.restaurant.id === groupItem.restaurant.id
			);
			if (idx == -1) {
			  groupItems.push({
				restaurant: item.food.restaurant,
				items: [item],
			  });
			} else {
			  groupItems[idx].items.push(item);
			}
		
			total += item.food.price * item.quantity;
			count ++
		}
		setCount(count);
		setTotal(total);
		setGroupItems(groupItems);
    });

  }, []);

  const deleteItem = (foodId: number) => {
    const newGroupItems = groupItems.map((groupItem) => {
      const newItems = groupItem.items.filter((item) => item.food.id !== foodId);
      return {
      ...groupItem,
      items: newItems,
      };
    });
	  setGroupItems(newGroupItems);
	}

	const onCreateCheckout = async () => {
		const response = await fetch("http://localhost:3000/api/users/checkouts", {
			method: "POST",
			credentials: "include",
			headers: {
				"Content-Type": "application/json",
			}
		});
		const data = await response.json();
		if (response.ok && data.checkout) {
			router.push("/checkout");
		} else {
			alert("Đã có lỗi xảy ra");
		}
	}

  return (
    <>
      <div className="flex flex-row w-full h-20 bg-white ">
        <div className="w-1/2 h-full flex flex-row  items-center gap-3">
          <div className="ml-10 text-4xl  text-beamin font-bold">
            <ShoppingCartOutlined />
          </div>
          <div className="text-2xl  text-beamin ">|</div>
          <div className="text-3xl  text-beamin font-bold">Giỏ hàng</div>
        </div>
        <div className="w-1/2 h-full flex   items-center gap-3"></div>
      </div>
      <div className="mt-4 px-16 flex flex-col gap-4  pb-16 rounded-md">
        <div className=" w-full h-16  bg-white  grid grid-cols-12">
          <div className="pl-8  col-span-4 flex items-center flex-row gap-5">
            <input
              id="default-checkbox"
              type="checkbox"
              value=""
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded   dark:ring-offset-gray-800 "
            />
            <span className="text-base font-normal"> Món Ăn</span>
          </div>
          <div className="col-span-2 flex items-center justify-center flex-row gap-3">
            <span className="text-base font-normal  text-gray-600">
              Đơn giá
            </span>
          </div>
          <div className="col-span-2 flex items-center justify-center flex-row gap-3">
            <span className="text-base font-normal  text-gray-600">
              Số lượng
            </span>
          </div>
          <div className="col-span-2 flex items-center justify-center flex-row gap-3">
            <span className="text-base font-normal  text-gray-600">
              Số tiền
            </span>
          </div>
          <div className="col-span-2 flex items-center justify-center flex-row gap-3">
            <span className="text-base font-normal  text-gray-600">
              Thao tác
            </span>
          </div>
        </div>
        <DetailsCart groupItems={groupItems} onDeleteItem={deleteItem} />
        <div className=" flex flex-row fixed bottom-0  w-[90.6%]  mr-16  h-16 bg-white items-center  ">
          <div className="flex flex-row gap-2 w-1/2 h-full items-center ml-10">
            <div className="cursor-pointer hover:text-red-600 ">Hủy</div>
            <div> Quán Đã chọn: </div>
            <div> The Chicken Gang</div>
          </div>
          <div className="flex flex-row gap-2 w-1/2 h-full items-center justify-end pr-2">
            <div className=""> Tổng thanh toán ({count} Sản phẩm):</div>
            <div className="text-red-600">₫{total.toLocaleString("en-US")} </div>
            <div>
              <Button
                href="/checkout"
                style={{ background: "#3AC5C9", color: "white" }}
                className="bg-beamin text-white w-40 h-10 rounded-md hover:brightness-105"
				onClick={onCreateCheckout}
              >Thanh toán</Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
