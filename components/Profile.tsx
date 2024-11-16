'use client';
import { useHeaderData } from "@/app/context/headerProvider";
import { Config } from "@/app/types/my";
import { SolutionOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { useEffect } from "react";

interface ProfilePros {
	lastName: string;
	orderCount: number;
}

export	default function Profile({lastName, orderCount}: ProfilePros) {
	const { headerData, setHeaderData } = useHeaderData();
	useEffect(() => {
		const config: Config = {
			isUserLoggedIn: lastName.length > 0,
			lastName: lastName,
			orderCount: orderCount
		}
		setHeaderData(config)
	}, []);
	return (
		<Button
          href="/login"
          className="font-normal  leading-5 btn-home	"
          style={{
            fontSize: "18px",
            height: "100%",
            color: "rgb(128, 128, 137)",
          }}
          type="text"
          icon={<SolutionOutlined />}
        >
          {headerData?.lastName || lastName || "Đăng nhập"}
        </Button>
	);
}