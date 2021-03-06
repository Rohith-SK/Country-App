import React, { useContext } from 'react'
import CountryContext from '../core/Context/countryContext'
import './countryNameDetails.css'

function CountryNameDetails(props) {
    const countries = useContext(CountryContext)
    return (
        <div>
            {
                countries.map(country => {
                    if (country.name === props.name) {
                        return (

                            <ul className='country-details-ul'>
                                <li className='country-details-li' key={country.name}><span className='country-details-head'>Country ID:</span> {country.id}</li>
                                <li className='country-details-li' key={country.name}><span className='country-details-head'>Country Name:</span> {country.name}</li>
                                <li className='country-details-li' key={country.name}><span className='country-details-head'>Country Abbreviation:</span> {country.abbr3}</li>
                                <li className='country-details-li' key={country.name}><span className='country-details-head'>Country ALTName:</span> {country.altName}</li>
                                <li className='country-details-li' key={country.name}><span className='country-details-head'>Continent:</span> {country.continent}</li>
                                <li className='country-details-li' key={country.name}><span className='country-details-head'>Units of Distance:</span> {country.distanceUnits}</li>
                                <li className='country-details-li' key={country.name}><span className='country-details-head'>ESRI Units:</span> {country.esriUnits}</li>
                            </ul>
                        )
                    }

                })
            }
        </div>
    )
}

export default CountryNameDetails