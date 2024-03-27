import React, { ReactNode } from "react";

export const Title = ( {children} :{children:ReactNode}) => {

    return(<div className="titleContainer">
        <img src="/logo1.png" width="50" height="50" alt="title"/>
        <h1 className="titleText">{children} </h1>
    </div>);
};

export default Title;