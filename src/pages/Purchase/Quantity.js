import React from 'react';
import toast from 'react-hot-toast';
import { AiOutlinePlusSquare, AiOutlineMinusSquare } from 'react-icons/ai'

const Quantity = ({ minimum, quantity, orderQuantity, setOrderQuantity, newOrderQuantity, setnewOrderQuantity }) => {

    let quantityError;
    setOrderQuantity(minimum)

    const plus = (maximumQuantity) => {
        if (newOrderQuantity? newOrderQuantity >= maximumQuantity : orderQuantity >= maximumQuantity) {
            toast.error(`Order should be maximum ${maximumQuantity} pc`, { duration: 2000, position: 'top-right' });
        } else {
            setnewOrderQuantity(newOrderQuantity ? newOrderQuantity + 1 : orderQuantity + 1);
        }
    }

    const minus = (minimumQuantity) => {
        if (newOrderQuantity ? newOrderQuantity === minimumQuantity : orderQuantity === minimumQuantity) {
            toast.error(`Order should be minimum ${minimumQuantity} pc`, { duration: 2000, position: 'top-right' });
        } else {
            setnewOrderQuantity(newOrderQuantity ? newOrderQuantity - 1 : orderQuantity - 1);
        }
    }

    return (
        <div className='mt-5'>
            <p className='mb-2'>Quantity</p>
            <div className="input-group">
                <span className="input-group-btn">
                    <button type="button" className="btn btn-danger" onClick={() => minus(minimum)}>
                        <AiOutlineMinusSquare className='icon-p' />
                    </button>
                </span>
                <input type="number" className="form-control" value={newOrderQuantity ? newOrderQuantity : orderQuantity} />
                <span className="input-group-btn">
                    <button type="button" className="btn btn-success" onClick={() => plus(quantity)}>
                        <AiOutlinePlusSquare className='icon-p' />
                    </button>
                </span>
            </div>

            {quantityError}
        </div>
    );
};

export default Quantity;