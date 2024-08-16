import React from 'react'
import type {Metadata} from "next";

const InfosPage = () => {
    return (
        <div className={"container vh-100 d-flex flex-column justify-content-center align-items-center"}>
            <h1 className={"text-center"}>Infos</h1>
        </div>
    )
}
export default InfosPage
export const metadata: Metadata = {
    title: 'Infos Page',
    description: 'Articles about programming',
}
