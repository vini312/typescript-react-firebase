import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Button, Container } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import 'firebase/firestore';
import { useFirestore, useFirestoreCollectionData } from 'reactfire';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
});

export default function List() {
    const productsRef = useFirestore().collection('products');

    const collObj = useFirestoreCollectionData(productsRef)

    const classes = useStyles();


    const history = useHistory();

    function deleteProductHandler(id: string) {
        productsRef.doc(id).delete();
    }

    function dataDisplay(data: any) {
        return (
            data.map((dataDoc: any) => (
                <TableRow key={dataDoc.NO_ID_FIELD} onClick={() => updateProductHandler(dataDoc.NO_ID_FIELD)}>
                    <TableCell component="th" scope="row">{dataDoc.name}</TableCell>
                    <TableCell align="right">{dataDoc.price}</TableCell>
                    <TableCell align="right">{dataDoc.category}</TableCell>
                    <TableCell align="right"><Button
                        variant="contained"
                        color="secondary"
                        startIcon={<DeleteIcon />}
                        onClick={() => deleteProductHandler(dataDoc.NO_ID_FIELD)}
                    >
                        Delete
                    </Button>
                    </TableCell>
                </TableRow>
            )))
    }

    function updateProductHandler(id: any) {
        history.push(`/update-product/${id}`);
    }

    return (
        <div>
            <Container maxWidth="md">
                <h1>List of products data stored</h1>
                <TableContainer component={Paper}>
                    <Table className={classes.table} size="small" aria-label="a dense table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Product</TableCell>
                                <TableCell align="right">Price</TableCell>
                                <TableCell align="right">Category</TableCell>
                                <TableCell></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {collObj.status === 'loading' ? <TableRow><TableCell>Loading Products...</TableCell></TableRow> : dataDisplay(collObj.data)}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Container>
        </div>
    );
}