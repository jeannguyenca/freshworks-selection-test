import React, { useState } from 'react'
import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'

import DateTimePicker from '@mui/lab/DateTimePicker'
import InputAdornment from '@mui/material/InputAdornment'

import DateAdapter from '@mui/lab/AdapterDateFns'
import LocalizationProvider from '@mui/lab/LocalizationProvider'

import MaterialUIGooglePlaces from '../components/MaterialUIGooglePlaces'

const Form = () => {
  const [datetime, setDatetime] = useState(new Date())
  const [location, setLocation] = useState('')
  const [numOfDuck, setNumOfDuck] = useState(0)
  const [foodWeight, setFoodWeight] = useState(0)

  // handle saving changes based on target id
  const handleChange = (e) => {
    switch (e.target.id) {
      case 'numOfDuck':
        setNumOfDuck(parseInt(e.target.value))
        break
      case 'foodWeight':
        setFoodWeight(parseInt(e.target.value))
        break
      default:
        break
    }
  }

  const handleChangeLocation = location => {
    setLocation(location)
  };

  const handleChangeDateTime = (datetime) => {
    setDatetime(datetime)
  }

  const handleSubmit = async () => {
    // if location include description, then assign to description foundLocation otherwise assign location
    let foundLocation = location && location.description ? location.description : location

    // use ISO string to format datetime for storing purpose
    let toISOString = new Date(datetime).toISOString()

    const response = await fetch(process.env.REACT_APP_API_URL, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ datetime: toISOString, location: foundLocation, numOfDuck, foodWeight })
    });
    return response.json();
  }

  return <Container maxWidth="sm">
    <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1, width: '100%' },
        p: 2
      }}
      autoComplete="off"
    >
      <LocalizationProvider dateAdapter={DateAdapter}>
        <DateTimePicker
          label="Please choose a day and time"
          value={datetime}
          renderInput={(params) => <TextField {...params} />}
          onChange={handleChangeDateTime}
          id="datepicker"
        />
      </LocalizationProvider>

      <MaterialUIGooglePlaces
        location={location}
        handleChange={handleChangeLocation}
        handleSelect={handleChangeLocation}
      />

      <TextField
        type="number"
        helperText="Please enter the number of ducks fed"
        label="Number of ducks"
        InputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
        id="numOfDuck"
        onChange={(e) => { handleChange(e) }}
      />

      <TextField
        type="number"
        helperText="Please enter how much food the ducks are fed"
        label="Quantity"
        InputProps={{
          inputMode: 'numeric', pattern: '[0-9]*', endAdornment: < InputAdornment position="end" > kg</InputAdornment>
        }}
        id="foodWeight"
        onChange={(e) => { handleChange(e) }}
      />
      <Button variant="contained" onClick={handleSubmit}>Submit</Button>

    </Box >
  </Container>

}

export default Form