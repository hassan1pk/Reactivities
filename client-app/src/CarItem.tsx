import React from 'react'
import { ICar } from './demo'

interface IProps {
    car: ICar;
}

/*const CarItem = (props: IProps) => {
    return (
        <div>
            <h1>{props.car.color}</h1>
        </div>
    )
}*/

const CarItem = ({car}: IProps):JSX.Element => {
    return (
        <div>
            <h1>{car.color}</h1>
        </div>
    )
}


export default CarItem
