"use client";
import {
  EyeInvisibleOutlined,
  EyeTwoTone,
  FacebookOutlined,
  GoogleOutlined,
} from "@ant-design/icons";
import { Input } from "antd";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { use, useEffect } from "react";
import { useHeaderData } from "../context/headerProvider";
import { Config } from "../types/my";

const Page: React.FC = () => {
  const router = useRouter();
  const [emailOrUsername, setEmailOrUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const { setHeaderData } = useHeaderData();

  // Handle input changes
  const handleEmailOrUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmailOrUsername(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/login", {
        method: "POST",
		credentials: 'include',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          emailOrUsername: emailOrUsername,
          password: password,
        }),
      });

      const data = await response.json();
      if (response.ok) {
		if (data?.token.length) {
			const config: Config = {
				isUserLoggedIn: true,
				lastName: data?.user.last_name || "",
				orderCount: 0
			}
			setHeaderData(config);
		}
        router.push("/dashboard");
      } else {
        console.error("Login failed:", data);
      }
    } catch (error) {
    } finally {
    }
  };

  return (
    <>
      <div className="mt-14 w-1/3  bg-white border rounded-2xl flex flex-col p-5 gap-5 pb-8">
        <div className="flex justify-center items-center w-full text-beamin font-semibold text-[26px]">
          Đăng Nhập
        </div>
        <div className="flex flex-col w-full gap-3">
          <Input
            placeholder="Email/Số điện thoại/Tên đăng nhập"
            className="h-[40px]"
            onChange={handleEmailOrUsernameChange}
            value={emailOrUsername}
          />
        </div>
        <div className="flex flex-col w-full mt-3">
          <Input.Password
            placeholder="Mật khẩu"
            className="h-[40px]"
            iconRender={(visible) =>
              visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
            }
            value={password}
            onChange={handlePasswordChange}
          />
        </div>
        <div className="flex flex-col w-full mt-3">
          <button
            className="w-full h-[40px] uppercase text-white bg-beamin rounded-lg"
            onClick={handleSubmit}
          >
            Đăng Nhập
          </button>
          <div className="flex flex-row justify-between items-center w-full text-sm text-beamin">
            <span className="cursor-pointer">Quên mật khẩu </span>
            <span className="cursor-pointer">Đăng nhập bằng SMS </span>
          </div>
        </div>
        <div className="flex items-center justify-center">
          <div className="flex-grow border-t border-gray-300"></div>
          <span className="mx-4 text-sm text-gray-600">HOẶC</span>
          <div className="flex-grow border-t border-gray-300"></div>
        </div>
        <div className="flex flex-row items-center justify-center gap-5 h-[40px] ">
          <button className="flex items-center justify-center gap-3 border w-full h-full p-1 text-beamin text-base">
            <FacebookOutlined />
            <span>Facebook</span>
          </button>
          <button className="flex items-center justify-center gap-3 border w-full h-full p-1 text-beamin text-base">
            <GoogleOutlined />
            <span>Google</span>
          </button>
        </div>
        <div className="flex items-center justify-center gap-1">
          <span className="text-gray-600">Bạn mới biết đến Baemin?</span>
          <Link className="text-beamin cursor-pointer" href={"/register"}>
            {" "}
            Đăng kí
          </Link>
        </div>
      </div>
    </>
  );
};
export default Page;
