import { useRouter } from "next/router";
import React from "react";

const productPage = () => {
    const router = useRouter();
    return (
        <>
            <div>productId : {router.query.productId}</div>
            <div>{JSON.stringify(router.query)}</div>
        </>
    );
};

export default productPage;
