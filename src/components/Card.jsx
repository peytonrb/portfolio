import React from 'react';

const Card = ({ image }) => {
    return (
        <div className="relative overflow-hidden h-[900px] min-w-[1700px] bg-slate-400 flex justify-center items-center">
            <img src={image} alt={image} width={1700} height={900} style={{ objectFit: 'cover' }} />
        </div>
    );
}

export default Card;