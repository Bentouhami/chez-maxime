// Error. page
'use client';

import React from 'react'


interface ErrorPageProps {
    error: Error;
    reset: () => void;
}

const ErrorPage = ({error, reset}: ErrorPageProps) => {
    return (
        <div>
            <h1>Cette page n&apos;a pas été trouvée 😭</h1>

            <p>{error.message}</p>

            <button className="btn btn-primary" onClick={reset}>
                Retourner à l&apos;accueil
            </button>
        </div>
    )
}
export default ErrorPage
