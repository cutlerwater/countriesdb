import React,{useState} from 'react'
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
const regions = [
  {
    value: 'All',
    label: 'All',
  },
  {
    value: 'Europe',
    label: 'Europe',
  },
  {
    value: 'Asia',
    label: 'Asia',
  },
  {
    value: 'Africa',
    label: 'Africa',
  },{
    value: 'Americas',
    label: 'Americas',
  },{
    value: 'Oceania',
    label: 'Oceania',
  },
];

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
  colors:{
   backgroundColor:"white"
  }
}));

const Filter = ({sendDataToParent}) => {
   const classes = useStyles();
  const [region, setRegion] = useState('All');
  const handleChange = (event) => {
    setRegion(event.target.value);
    sendDataToParent(event.target.value)
  };

 return (
    <form className={classes.root} noValidate autoComplete="off">
      <div className="">
        <TextField
          id="standard-select-region"
          select
          value={region}
          onChange={handleChange}
           className={classes.colors}
        >
          {regions.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
      </div>
    </form>
 )
}

export default Filter