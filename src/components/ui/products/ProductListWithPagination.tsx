"use client";

import { useState } from "react";
import { Col, Row, Pagination } from "react-bootstrap";
import ProductCard from "@/components/ui/products/ProductsCards";

const ProductListWithPagination = ({ products }: any) => {
    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 6;

    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

    const totalPages = Math.ceil(products.length / productsPerPage);

    const handlePageChange = (pageNumber : number) => {
        setCurrentPage(pageNumber as number);
    };

    return (
        <>
            <Row className="mt-4">
                {currentProducts.map((product : any) => (
                    <Col key={product.id} md={4} className="mb-4">
                        <ProductCard product={product as any} />
                    </Col>
                ))}
            </Row>

            <Pagination>
                {Array.from({ length: totalPages }, (_, index) => (
                    <Pagination.Item
                        key={index + 1}
                        active={index + 1 === currentPage}
                        onClick={() => handlePageChange(index + 1)}
                    >
                        {index + 1}
                    </Pagination.Item>
                ))}
            </Pagination>
        </>
    );
};

export default ProductListWithPagination;
