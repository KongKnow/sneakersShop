import React from 'react';

export const NextArrow = (props) => {
    return (
        <div className="slider-next-arrow">
            <button onClick={props.onClick}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="#C8C8C8">
                    <polygon points="7.293 4.707 14.586 12 7.293 19.293 8.707 20.707 17.414 12 8.707 3.293 7.293 4.707"/>
                </svg>
            </button>
        </div>
    );
};

export const PrevArrow = (props) => {
    return (
        <div className="slider-prev-arrow">
            <button onClick={props.onClick}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="#C8C8C8">
                    <polygon points="15.293 3.293 6.586 12 15.293 20.707 16.707 19.293 9.414 12 16.707 4.707 15.293 3.293"/>
                </svg>
            </button>
        </div>
    );
};
