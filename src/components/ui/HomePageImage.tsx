'use client';
import Image from 'next/image';

function HomePageImage() {
    return (
        <div className="d-flex flex-column flex-md-row align-items-center justify-content-center my-5">
            <Image priority className="p-3 d-flex flex-column flex-sm-row align-items-center justify-content-center order-1 order-md-2"
                   src="/chez-maxime-homepage.jpg" alt="Welcome" width={500} height={500} />
        </div>
    )
}

export default HomePageImage;
