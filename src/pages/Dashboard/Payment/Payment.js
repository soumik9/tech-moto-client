import React from 'react';
import { useParams } from 'react-router-dom';

const Payment = () => {

    let {toolId} = useParams();

    return (
        <div>
            payment {toolId}
        </div>
    );
};

export default Payment;