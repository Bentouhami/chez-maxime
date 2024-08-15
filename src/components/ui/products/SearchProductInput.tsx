// SearchProductInput.tsx component

"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

const SearchProductInput = () => {
    const router = useRouter();
    const [searchText, setSearchText] = useState("");

    const formSubmitHandler = (e:React.FormEvent) => {
        e.preventDefault();
        
        console.log({ searchText });
        router.push(`/products/search?searchText=${searchText}`);
    }

    return (
        <form onSubmit={formSubmitHandler} className="my-5 w-full md:w-2/3 m-auto">
            <input 
             className="w-full p-3 rounded text-xl border-none text-gray-900" 
             type="search" 
             placeholder="Chercher un produit"
             value={searchText}
             onChange={(e) => setSearchText(e.target.value)}
            />
        </form>
    )
}

export default SearchProductInput;