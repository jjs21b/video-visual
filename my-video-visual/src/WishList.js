import Cookies from 'js-cookie';
import React, { useState, useEffect } from 'react';
const WishList = ({ wishlist, removeFromWishlist, setWishlist }) => {
    const clearWishlist = () => {
        setWishlist([]);
    };
    return (
        <div>
            {wishlist.map(game => (
                <div key={game.id}>
                    <h4>{game.name}</h4>
                    <button onClick={() => removeFromWishlist(game.id)}>Remove</button>
                </div>
            ))}
        </div>
    );
};

export default WishList;
