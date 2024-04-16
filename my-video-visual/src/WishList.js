import Cookies from 'js-cookie';
import React, { useState, useEffect } from 'react';
const ChildComponent = ({ wishlist, addToWishlist, removeFromWishlist }) => {
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
            <button onClick={() => addToWishlist({ id: 'new_game', name: 'New Game' })}>Add New Game</button>
        </div>
    );
};

export default ChildComponent;
