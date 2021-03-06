import React, { useState } from 'react'
import { Container, Box, TextField, Button, Alert, InputAdornment } from '@mui/material'

import DateTimePicker from '@mui/lab/DateTimePicker'

import DateAdapter from '@mui/lab/AdapterDateFns'
import LocalizationProvider from '@mui/lab/LocalizationProvider'

import MaterialUIGooglePlaces from '../components/MaterialUIGooglePlaces'
/**
 * Component for duck feeding form
 */
const Form = () => {
  const [datetime, setDatetime] = useState(new Date())
  const [location, setLocation] = useState('')
  const [numOfDuck, setNumOfDuck] = useState(0)
  const [foodWeight, setFoodWeight] = useState(0)
  const [formStatus, setFormStatus] = useState()

  // handle saving changes based on target id
  /**
   * @param  {Event} e Event object
   */
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
    if (!location || isNaN(numOfDuck) || isNaN(foodWeight)) {
      setFormStatus({ severity: "error", message: "Error. Missing information" })
    } else {
      setFormStatus()

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

      if (response.status === 200) {
        setFormStatus({ severity: "success", message: "We have received the information" })

        setNumOfDuck(0)
        setFoodWeight(0)
      } else {
        setFormStatus({ severity: "error", message: "Error. Please try again" })
      }
    }

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
        value={numOfDuck}
        type="number"
        helperText="Please enter the number of ducks fed"
        label="Number of ducks"
        InputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
        id="numOfDuck"
        onChange={(e) => { handleChange(e) }}
      />

      <TextField
        value={foodWeight}
        type="number"
        helperText="Please enter how much food the ducks are fed"
        label="Quantity"
        InputProps={{
          inputMode: 'numeric', pattern: '[0-9]*', endAdornment: < InputAdornment position="end" > kg</InputAdornment>
        }}
        id="foodWeight"
        onChange={(e) => { handleChange(e) }}
      />
      {formStatus && <Alert severity={formStatus.severity}>{formStatus.message}</Alert>}
      <Button variant="contained" onClick={handleSubmit}>Submit</Button>

    </Box >
  </Container >

}

export default Form