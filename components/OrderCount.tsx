'use client';

import { useHeaderData } from "@/app/context/headerProvider";
import React from "react";

export default function OrderCount() {
	const { headerData } = useHeaderData();
	
	return (
		<span
		  className="text-xs bg-red-600 relative rounded w-full text-white  bottom-3 right-4 text-center"
		  style={{ width: "15px", borderRadius: "50px" }}
		>{headerData?.orderCount || 0}</span>
	);

}