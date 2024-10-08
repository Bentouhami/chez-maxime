// src/ui/navigations/ClientSidebar.tsx (Client Component) sidebar for the client side

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { DOMAIN } from '@/utils/constants';
import { toast } from 'react-toastify';
import Accordion from 'react-bootstrap/Accordion';
import Link from 'next/link';
import styles from '../navigations/header/Header.module.css';

interface Category {
    id: number;
    name: string;
    subCategories?: Category[];
}

interface ClientSidebarProps {
    onSelect?: () => void;
}

const ClientSidebar = ({ onSelect }: ClientSidebarProps) => {
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Fetch categories only once
        const fetchCategories = async () => {
            try {
                const response = await axios.get(`${DOMAIN}/api/products/categories`);
                const categoriesData = response.data;

                const categoriesWithSubcategories = await Promise.all(
                    categoriesData.map(async (category: Category) => {
                        const resSubCategories = await axios.get(
                            `${DOMAIN}/api/products/subcategories?parentId=${category.id}`
                        );
                        return {
                            ...category,
                            subCategories: resSubCategories.data,
                        };
                    })
                );

                setCategories(categoriesWithSubcategories);
                setLoading(false);
            } catch (error) {
                toast.error('Error fetching categories and subcategories');
                console.error(error);
                setLoading(false);
            }
        };

        fetchCategories();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <Accordion defaultActiveKey={['0']} alwaysOpen>
                {categories.map((category, index) => (
                    <Accordion.Item eventKey={index.toString()} key={category.id}>
                        <Accordion.Header>{category.name}</Accordion.Header>
                        <Accordion.Body>
                            {category.subCategories && category.subCategories.length > 0 ? (
                                <ul>
                                    {category.subCategories.map((subCategory) => (
                                        <li key={subCategory.id}>
                                            <Link className={styles.navLink}
                                                  href={{
                                                      pathname: '/products/subcategories',
                                                      query: { subcategoryId: subCategory.id },
                                                  }}
                                                  onClick={onSelect}
                                            >
                                                {subCategory.name}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p>No subcategories available.</p>
                            )}
                        </Accordion.Body>
                    </Accordion.Item>
                ))}
            </Accordion>
        </div>
    );
};

export default ClientSidebar;
