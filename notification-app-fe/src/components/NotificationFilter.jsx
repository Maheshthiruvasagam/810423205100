
import React from 'react';
import { Box, FormControl, InputLabel, Select, MenuItem } from '@mui/material';

export default function NotificationFilter({ filterType, setFilterType, limit, setLimit }) {
  return (
    <Box display="flex" gap={2} my={3} justifyContent="space-between">
      <FormControl variant="outlined" size="small" style={{ minWidth: 160 }}>
        <InputLabel id="filter-type-label">Filter Type</InputLabel>
        <Select 
          labelId="filter-type-label"
          value={filterType} 
          onChange={(e) => setFilterType(e.target.value)} 
          label="Filter Type"
        >
          <MenuItem value=""><em>All Types</em></MenuItem>
          <MenuItem value="Placement">Placement</MenuItem>
          <MenuItem value="Result">Result</MenuItem>
          <MenuItem value="Event">Event</MenuItem>
        </Select>
      </FormControl>

      <FormControl variant="outlined" size="small" style={{ minWidth: 120 }}>
        <InputLabel id="limit-label">View Limit</InputLabel>
        <Select 
          labelId="limit-label"
          value={limit} 
          onChange={(e) => setLimit(e.target.value)} 
          label="View Limit"
        >
          <MenuItem value={10}>Top 10</MenuItem>
          <MenuItem value={15}>Top 15</MenuItem>
          <MenuItem value={20}>Top 20</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}