import React, { ReactNode } from "react";

const BigTitle = ( {children} :{children:ReactNode}) => {

    return(<div className="titleContainer">
        <img src="/logo1.png" width="100" height="100"/>
        <h3 className="titleText">{children}</h3>
    </div>);
}

const SimpleTitle = ( {children} :{children:ReactNode}) => {

    return(<div className="titleContainer">
        <img src="/logo1.png" width="50" height="50"/>
        <h1 className="titleText">{children} </h1>
    </div>);
}
interface Props {
    children:ReactNode;
    type:boolean;
}
const Title = ({children, type} :Props) => {
    if(type == true) {
        return <BigTitle>{children}</BigTitle>;
    } else {
        return <SimpleTitle>{children}</SimpleTitle>;
    }
}
export default Title;