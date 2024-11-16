import React from 'react';
import TypeSelector from './type';
import AreaSelector from './area';
import FilterSelector from './filter';
import ResultFood from './result';
import { Food } from '../types/my';

const Page: React.FC = async (
	{ searchParams }: {searchParams?:{ [key: string]: string | undefined }}
) => {
	const search = searchParams?.search
	const res = await fetch(`http://localhost:3000/api/foods?page=1&limit=10` + (search ? `&search=${search}` : ''), {
		headers: {
		  "Content-Type": "application/json"
		},
	});

	const json = await res.json();
	const foods = json.foods as Food[];

    return (
        <>
            <div className='w-full flex flex-row justify-between items-center border-b border-solid'>
                <div className='flex flex-row gap-3'>
                    <AreaSelector />
                    <TypeSelector />
                </div>
                <div className='flex items-center justify-center '>
                    <FilterSelector></FilterSelector>
                </div>

            </div>
            <div className='my-3 flex flex-row'>
                asdasd
            </div>
            <ResultFood items={foods} />
        </>
    )
}
export default Page;