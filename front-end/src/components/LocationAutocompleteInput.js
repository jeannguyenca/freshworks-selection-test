import React, { useState } from 'react';
import PlacesAutocomplete, {
} from 'react-places-autocomplete';
import TextField from '@mui/material/TextField'

const Form = ({ location, handleChange, handleSelect }) => {
  return <PlacesAutocomplete
    value={location}
    onChange={handleChange}
    onSelect={handleSelect}
    id="locationAutocomplete"
  >
    {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
      <div>
        <TextField
          {...getInputProps({
            placeholder: 'Location',
            className: 'location-search-input',
          })}
        />
        <div className="autocomplete-dropdown-container">
          {loading && <div>Loading...</div>}
          {suggestions.map(suggestion => {
            const className = suggestion.active
              ? 'suggestion-item--active'
              : 'suggestion-item';
            // inline style for demonstration purpose
            const style = suggestion.active
              ? { backgroundColor: '#fafafa', cursor: 'pointer' }
              : { backgroundColor: '#ffffff', cursor: 'pointer' };
            return (
              <div
                {...getSuggestionItemProps(suggestion, {
                  className,
                  style,
                })}
                key={Math.random()}
              >
                <span>{suggestion.description}</span>
              </div>
            );
          })}
        </div>
      </div>
    )}
  </PlacesAutocomplete>

}

export default Form