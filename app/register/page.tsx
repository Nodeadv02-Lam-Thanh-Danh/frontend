"use client";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { Input } from "antd";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

const Page: React.FC = () => {
  const router = useRouter();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");

  const handleSubmit = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          first_name: firstName,
          last_name: lastName,
          username: username,
          phone: phone,
          email: email,
		  address: address,
          password: password,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        router.push("/login");
      } else {
        console.error("Login failed:", data);
      }
    } catch (error) {
    } finally {
    }
  };

  return (
    <>
      <div className="mt-28 w-1/3  bg-white border rounded-2xl flex flex-col p-5 gap-5 pb-8">
        <div className="flex justify-center items-center w-full text-beamin font-semibold text-[26px]">
          Đăng Kí
        </div>
        <div className="flex flex-row w-full gap-2">
          <Input
            placeholder="Họ "
            className="h-[40px]"
            value={firstName}
            onChange={(event) => setFirstName(event.target.value)}
          />
          <Input
            placeholder="Tên"
            className="h-[40px]"
            value={lastName}
            onChange={(event) => setLastName(event.target.value)}
          />
        </div>
        <div className="flex flex-col w-full gap-3">
          <Input
            placeholder="Tên đăng nhập"
            className="h-[40px]"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
        </div>
        <div className="flex flex-col w-full gap-3">
          <Input
            placeholder="Số điện thoại"
            className="h-[40px]"
            value={phone}
            onChange={(event) => setPhone(event.target.value)}
          />
        </div>
        <div className="flex flex-col w-full gap-3">
          <Input
            placeholder="Email"
            className="h-[40px]"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </div>
		<div className="flex flex-col w-full gap-3">
          <Input
            placeholder="Address"
            className="h-[40px]"
            value={address}
            onChange={(event) => setAddress(event.target.value)}
          />
        </div>
        <div className="flex flex-col w-full ">
          <Input.Password
            placeholder="Mật khẩu"
            className="h-[40px]"
            iconRender={(visible) =>
              visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
            }
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>
        <div className="flex flex-col w-full ">
          <Input.Password
            placeholder="Nhập lại mật khẩu"
            className="h-[40px]"
            iconRender={(visible) =>
              visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
            }
            value={rePassword}
            onChange={(event) => setRePassword(event.target.value)}
          />
        </div>
        <div className="flex flex-col w-full">
          <button
            className="w-full h-[40px] uppercase text-white bg-beamin rounded-lg"
            onClick={handleSubmit}
          >
            Đăng Ký
          </button>
        </div>
        <div className="flex items-center justify-center gap-1">
          <span className="text-gray-600">Bạn đã có tài khoản?</span>
          <Link className="text-beamin cursor-pointer" href={"/login"}>
            {" "}
            Đăng nhập
          </Link>
        </div>
      </div>
    </>
  );
};
export default Page;
