export interface CategoryItem {
  id: number;
  name: string;
  icon: string;
};

interface CategoryProps {
  items: CategoryItem[];
};

const Category = ({ items }: CategoryProps) => {
  return (
    <>
      <span>Thực đơn </span>
      {items.map((item: CategoryItem, index: number) => (
        <div
          key={index}
          className="flex flex-col gap-3 cursor-pointer hover:bg-slate-100"
        >
          <div className="flex flex-row items-center gap-1">
            <img src={item.icon} width={30} height={30} alt={item.name} />
            <span>{item.name}</span>
          </div>
        </div>
      ))}
    </>
  );
};

export default Category;
