import { GroupItem } from "@/app/types/my";
import Image from "next/image";

interface DetailsCheckoutProps {
  groupItems: GroupItem[];
}

export default function DetailsCheckout({ groupItems }: DetailsCheckoutProps) {
  return (
    <>
      <div className="mt-3 ml-10 grid grid-cols-12">
        <div className="col-span-6">Món Ăn</div>
        <div className="col-span-2">Đơn giá </div>
        <div className="col-span-2">Số Lượng </div>
        <div className="col-span-2">Thành tiền</div>
      </div>
      {groupItems.map((groupItem, index) => {
        return (
          <>
            <div key={index} className="ml-10 mt-8">
              {groupItem.restaurant.name}
            </div>
            {groupItem.items.map((item, index) => (
              <div key={index} className="mt-4 ml-10 grid grid-cols-12">
                <div className="col-span-6 flex flex-row items-center gap-3">
                  <div className="w-16 h-16 relative">
                    <Image
                      layout="fill"
                      objectFit="cover"
                      src={item.food.image[0]}
                      alt={""}
                    ></Image>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-base">{item.food.name}</span>
                    <span className="text-sm text-gray-600">
                      {item.food.name}
                    </span>
                  </div>
                </div>
                <div className="col-span-2 ml-1 flex items-center">
                  {item.food.price}{" "}
                </div>
                <div className="col-span-2 ml-5 flex items-center ">
                  {item.quantity}
                </div>
                <div className="col-span-2 ml-5  flex items-center">
                  {(item.quantity * item.food.price).toLocaleString('en-US')}
                </div>
              </div>
            ))}
          </>
        );
      })}
    </>
  );
}
