// import styled from 'styled-components'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
    cardDiv: {
        width: '30%',
        backgroundColor: 'rgba(59, 148, 94, .6)',
        padding: theme.spacing(3, 6),
        margin: '10% auto',
        boxShadow:'10px 10px 5px 0px rgba(0,0,0,0.75)',
        color: 'white',
    }
}))

export default useStyles

// export const ContainerDiv = styled.div`
//     padding: 10%;
    
// `
// export const CardDiv = styled.div`
//     width: 30%;
//     background-color: teal;
//     padding: 5% 10%;
//     margin: auto;
//     border-radius: 15%;
//     box-shadow:10px 10px 5px 0px rgba(0,0,0,0.75);
//     color: white;

//     h1 {
//         text-align: center;
//     }

// `
