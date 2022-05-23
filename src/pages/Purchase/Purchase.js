import React from 'react';
import { useParams } from 'react-router-dom';

const Purchase = () => {

    const {toolId} = useParams();

    return (
        <div>
            {toolId}
        </div>
    );
};

export default Purchase;