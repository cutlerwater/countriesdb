import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 345,
    maxWidth: 345,
    height: 400,
    borderRadius: '10px',
    marginTop: '2.5rem',
  },
  media: {
    height: 171,
    paddingTop: '56.25%', // 16:9
  },
  content: {},
}));

const CardInd = (props) => {
  const { flag, name, population, region, capital } = props;
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardMedia className={classes.media} image={flag} title={name} />
      <CardContent className='bg-white text-gray-800 dark:text-gray-100 dark:bg-gray-600 h-full'>
        <Typography variant='h5' component='p'>
          {name}
        </Typography>
        <Typography variant='h6' component='p'>
          Population: {population}
        </Typography>
        <Typography variant='h6' component='p'>
          Region: {region}
        </Typography>
        <Typography variant='h6' component='p'>
          Capital: {capital}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default CardInd;