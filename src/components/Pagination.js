import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Pagination from '@material-ui/lab/Pagination';
const useStyles = makeStyles((theme) => ({
  root: {
    '& > * + *': {
      marginTop: theme.spacing(2),
    },display:"inline-flex",
    justifyContent:"center",
    width:"100%",
    alignItems:"center",
    flexDirection:"column",
  },
  typo:{
       background:"white"
  }
}));

const PaginationWraper = ({countriesPerPage,totalCountries,paginate}) => {
 const totalPages = []
 for(let i = 1 ; i <= Math.ceil(totalCountries / countriesPerPage) ; i++){
  totalPages.push(i)
 }
   const classes = useStyles();
  const [page, setPage] = React.useState(1);
  const handleChange = (event, value) => {
    setPage(value);
    paginate(value)
  };

 return (
    <div className={classes.root}>
      <Typography >Page: {page}</Typography>
      <Pagination className={classes.typo} count={totalPages.length} page={page} onChange={handleChange} />
    </div>
 )
}

export default PaginationWraper