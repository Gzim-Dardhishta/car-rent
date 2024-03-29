import React, {useState} from 'react'
import { CarsData } from './data'
import './styles/cars.scss'
import { Link } from 'react-router-dom'
import CarsCarousel from './slider/CarsCarousel'
import searchIcon from "../assets/search-normal.svg"
import filter from "../assets/filter.svg"
import Car from './Car'
import useFetch from '../hooks/useFetch'

const Cars = () => {

    const { data: cars, isLoading, error } = useFetch('http://localhost:8000/api/v1/cars/all-cars')

    const [filteredResults, setFilteredResults] = useState([]);
    const [searchInput, setSearchInput] = useState('');

    const searchItems = (searchValue) => {
        setSearchInput(searchValue)

        if (searchInput !== '') {
            const filteredData = cars.filter((item) => {
                return Object.values(item).join('').toLowerCase().includes(searchInput.toLowerCase())
            })
            setFilteredResults(filteredData)
        }
        else {
            setFilteredResults(cars)
        }
    }

    return (
        <div className='cars'>

            <h5 className='popular-cars-title'>Popular Cars</h5>

            <CarsCarousel />

            <div className="search-bar">
                <div className="search-icon">
                    <img src={searchIcon} width={20} alt="" />
                </div>
                <div className="input-container">
                    <input type="text" onChange={(e) => searchItems(e.target.value)} placeholder='Search something here' />
                </div>
                <div className="filter-icon">
                    <img src={filter} width={20} alt="" />
                </div>
            </div>

            <h5 className='recomendation-cars-title'>Recomendation Car</h5>

            {error && <div>{error}</div>}
            {isLoading && <div>Loading...</div>}

            <div className="car-list">
                {searchInput.length >= 1 ? (
                    filteredResults.map(car => {
                        return (
                            <Link className='car-link' to={`/car/${car.id}`} key={car.id} data-aos="zoom-in">
                                <Car cars={car} />
                            </Link>
                        )
                    })
                ) : (
                    cars?.map(car => {
                        return (
                            <Link className='car-link' to={`/car/${car.id}`} key={car.id} data-aos="zoom-in">
                                <Car cars={car} />
                            </Link>
                        )
                    })
                )}
            </div>
        </div>
    )
}

export default Cars