import React from 'react'
import {
  Autocomplete as MuiAutocomplete,
  CircularProgress,
} from '@mui/material'
import Controls from './Controls'
import { Box } from '@mui/system'
const AutoComplete = ({ values, options, setChange, label, error }) => {
  const [open, setOpen] = React.useState(false)

  return (
    <MuiAutocomplete
      open={open}
      onOpen={() => {
        setOpen(true)
      }}
      onClose={() => {
        setOpen(false)
      }}
      autoHighlight
      value={values.type}
      onChange={(event, newValue) => {
        setChange({ ...values, type: newValue })
      }}
      getOptionLabel={(option) => option.type}
      options={options}
      sx={{ width: '100%' }}
      renderOption={(props, option) => (
        <Box
          component="li"
          sx={{ '& > img': { mr: 2, flexShrink: 0 } }}
          {...props}
        >
          {option.type}
        </Box>
      )}
      renderInput={(params) => (
        <Controls.Input
          {...params}
          variant="outlined"
          label={label}
          type="text"
          {...(error && {
            error: true,
            helperText: error,
          })}
          inputProps={{
            ...params.inputProps,
            autoComplete: 'new-password', // disable autocomplete and autofill
          }}
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <React.Fragment>{params.InputProps.endAdornment}</React.Fragment>
            ),
          }}
        />
      )}
    />
  )
}

export default AutoComplete
