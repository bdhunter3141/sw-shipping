import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import {
  fetchStarshipAction
} from "../actions/dataActions";

const starshipInfo = (starship) => {
  return (
    <div>
      <h2>Stats for the {starship.name}</h2>
      <ul>
        <li>Manufacturer: {starship.manufacturer}</li>
        <li>Model: {starship.model}</li>
        <li>Starship Class: {starship.starship_class}</li>
        <li>Megalights: {starship.MGLT}/hr</li>
        <li>Cargo Capacity: {starship.cargo_capacity} kg</li>
        <li>Consumables: {starship.consumables} before resupply</li>
        <li>Cost: {starship.cost_in_credits} credits</li>
        <li>Crew: {starship.crew} people needed</li>
        <li>Hyperdrive Rating: {starship.hyperdrive_rating}</li>
        <li>Length: {starship.length} meters</li>
        <li>Max Atmosphering Speed: {starship.max_atmosphering_speed}</li>
        <li>Passengers: Holds {starship.passengers} people</li>
      </ul>
    </div>
  )
}


const Starship = (props) => {
  const starship = useSelector(state => state.currentStarship);
  const loading = useSelector(state => state.loading);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchStarshipAction(props.match.params.id));
  }, [dispatch, props.match.params]);

  return (
    <div>
      <Link to="/">Return Home</Link>
      <h1>Starship Profile: {starship ? starship.name : ''}</h1>

      {Object.entries(starship).length !== 0 && starship.constructor === Object ? starshipInfo(starship) : <div>&nbsp;</div>}

      {loading && 'Loading Starship...'}

    </div>
  );
};

export default Starship;