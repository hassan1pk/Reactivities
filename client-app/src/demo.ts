let data : string | number;
data = 10;

export interface ICar {
    color: string;
    model: string;
    topSpeed?: number;
}

const car1 : ICar = {
    color: 'pink',
    model: 'honda'
}

const car2 : ICar = {
    color: 'purple',
    model: 'toyota',
    topSpeed: 150
}

const multiply = (x : number, y: number) : string => {
    return (x*y).toString();
}

const add = (x : number, y: number) : number => {
    return x + y;
}

const subtract = (x : number, y: number) : void => {
    let z : string = (x - y).toString();
}

export const cars = [car1, car2];