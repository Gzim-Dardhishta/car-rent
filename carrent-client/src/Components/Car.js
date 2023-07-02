import React from 'react'
import { CarsData } from './data'
import NavBar from '../shared/NavBar';
import { useParams } from 'react-router-dom';

const Car = () => {

    const { params } = useParams();
    const carId = parseInt(params)

    console.log(carId)
    console.log(CarsData)

    const car = CarsData.find((car) => (car.id === carId));

    if (carId !== CarsData.id) {
        // Handle the case when the product is not found
        return <div>Car not found.</div>;
    }
    // console.log(car)

    return (
        <div>
            <NavBar />
            <h2>{carId}</h2>
            {/* <h3>{car.name}</h3> */}
            <h3>hello</h3>

        </div>
    )
}

export default Car