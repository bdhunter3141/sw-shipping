import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import {
  fetchStarshipAction
} from "../actions/dataActions";


// Display all Starship stats
const starshipInfo = (starship) => {
  return (
    <div>
      <ul className="collection starship-stats">
        <li className="collection-header"><h4 className="grey-text text-lighten-1">Statistics</h4></li>
        <li className="collection-item"><i className="grey-text text-darken-2 fas fa-tools"></i> <span className="stat-descriptor grey-text text-darken-2">Manufacturer:</span> &nbsp;{starship.manufacturer}</li>
        <li className="collection-item"><i className="grey-text text-darken-2 fas fa-rocket"></i> <span className="stat-descriptor grey-text text-darken-2">Model:</span> &nbsp;{starship.model}</li>
        <li className="collection-item"><i className="grey-text text-darken-2 fas fa-filter"></i> <span className="stat-descriptor grey-text text-darken-2">Starship Class:</span> &nbsp;{starship.starship_class}</li>
        <li className="collection-item"><i className="grey-text text-darken-2 fas fa-meteor"></i> <span className="stat-descriptor grey-text text-darken-2">Megalights:</span> &nbsp;{starship.MGLT}/hr</li>
        <li className="collection-item"><i className="grey-text text-darken-2 fas fa-boxes"></i> <span className="stat-descriptor grey-text text-darken-2">Cargo Capacity:</span> &nbsp;{starship.cargo_capacity} kg</li>
        <li className="collection-item"><i className="grey-text text-darken-2 fas fa-truck-loading"></i> <span className="stat-descriptor grey-text text-darken-2">Consumables:</span> &nbsp;{starship.consumables} before resupply</li>
        <li className="collection-item"><i className="grey-text text-darken-2 fas fa-dollar-sign"></i> <span className="stat-descriptor grey-text text-darken-2">Cost:</span> &nbsp;{starship.cost_in_credits} credits</li>
        <li className="collection-item"><i className="grey-text text-darken-2 fas fa-people-carry"></i> <span className="stat-descriptor grey-text text-darken-2">Crew:</span> &nbsp;{starship.crew} people needed</li>
        <li className="collection-item"><i className="grey-text text-darken-2 fas fa-star"></i> <span className="stat-descriptor grey-text text-darken-2">Hyperdrive Rating:</span> &nbsp;{starship.hyperdrive_rating}</li>
        <li className="collection-item"><i className="grey-text text-darken-2 fas fa-ruler"></i> <span className="stat-descriptor grey-text text-darken-2">Length:</span> &nbsp;{starship.length} meters</li>
        <li className="collection-item"><i className="grey-text text-darken-2 fas fa-tachometer-alt"></i> <span className="stat-descriptor grey-text text-darken-2">Max Atmosphering Speed:</span> &nbsp;{starship.max_atmosphering_speed}</li>
        <li className="collection-item"><i className="grey-text text-darken-2 fas fa-users"></i> <span className="stat-descriptor grey-text text-darken-2">Passengers:</span> &nbsp;Holds {starship.passengers} people</li>
      </ul>
    </div>
  )
}


const Starship = (props) => {

  // Define all constants
  const starship = useSelector(state => state.currentStarship);
  const loading = useSelector(state => state.loading);
  const dispatch = useDispatch();

  // Fetch Starship stats
  useEffect(() => {
    dispatch(fetchStarshipAction(props.match.params.id));
  }, [dispatch, props.match.params]);

  return (
    <div>
      <Link to="/"><i className="fas fa-arrow-left"></i> Return</Link>
      <h3 className="light-blue-text text-darken-3"><strong>Starship Profile:</strong> {starship.name ? `The ${starship.name}` : ''}</h3>

      {Object.entries(starship).length !== 0 && starship.constructor === Object ? starshipInfo(starship) : <div>&nbsp;</div>}

      {loading && 'Loading Starship...'}

    </div>
  );
};

export default Starship;