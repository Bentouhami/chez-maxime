import React from 'react'
import {Metadata} from "next";

const AboutPage = () => {
    return (
        <div className={"container vh-100 d-flex flex-column justify-content-center align-items-center"}>
            <h1 className={"text-center"}>About</h1>
        </div>
    )
}
export default AboutPage

export const metadata: Metadata = {
    title: 'About Page',
    description: 'Articles about programming',
}
