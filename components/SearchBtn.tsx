'use client';
import Search from "antd/es/input/Search";
import { useRouter } from "next/navigation";

export default function SearchBtn() {
	const router = useRouter();

	const onSearch = (value: string) => {
		router.push(`/search?search=${value}`);
	}

	return (
		<Search
          className="w-1/3"
          placeholder="input search text"
          enterButton="Tìm kiếm"
          size="large"
          onSearch={onSearch}	
        />
	)
}