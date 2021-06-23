import { useState } from 'react';
import 'firebase/firestore';
import { useFirestore } from 'reactfire';
import TextField from '@material-ui/core/TextField';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { Button, Container } from '@material-ui/core';
import { useHistory, useParams } from 'react-router-dom';
import { useEffect } from 'react';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            '& .MuiTextField-root': {
                margin: theme.spacing(1),
                width: '25ch',
            },
        },
    }),
);

export default function AddProducts() {

    const classes = useStyles();

    const productsRef = useFirestore().collection('products');
    
    const history = useHistory();

    const [name, setName] = useState<string>();
    const [price, setPrice] = useState<number>();
    const [category, setCategory] = useState<string>();
    const [description, setDescription] = useState<string>();

    const { id } = useParams<any>();

    useEffect(() => {
        if (id) {
            const docRef = productsRef.doc(id);

            docRef.get().then((doc: any) => {
                if (doc.exists) {
                    console.log(doc.data())
                    setName(doc.data().name)
                    setPrice(doc.data().price)
                    setCategory(doc.data().category)
                    setDescription(doc.data().description)
                } else {
                    console.log("Document ID not found");
                }
            }).catch((error) => {
                console.log("Error getting document:", error);
            });
        }
    }, [id])

    function addProductsHandler(newData: any) {
        productsRef.doc().set({
            name: newData.name,
            price: newData.price,
            category: newData.category,
            description: newData.description
        }).then(() => {
            history.push('/');
            console.log("Product successfully added")
        })
            .catch(e => console.log("Error adding a product: " + e.message))
    }


    function updateProductsHandler(updateData: any) {
        productsRef.doc(updateData.id).update({
            name: updateData.name,
            price: updateData.price,
            category: updateData.category,
            description: updateData.description
        }).then(() => {
            history.push('/');
            console.log("Product successfully updated")
    })
            .catch(e => console.log("Error adding a product: " + e.message))
    }

    function submitHandler(event: any) {
        event.preventDefault();

        let submitData: Object

        if (id) {
            submitData = {
                id: id,
                name: name,
                price: price,
                category: category,
                description: description
            }
            updateProductsHandler(submitData);
        }
        else {
            submitData = {
                name: name,
                price: price,
                category: category,
                description: description
            }
            addProductsHandler(submitData);
        }
    }

    return (
        <Container maxWidth="sm">
            {id ? <h1>Update product data</h1> : <h1>Create new product</h1>}
            <form onSubmit={submitHandler} className={classes.root} noValidate autoComplete="off">
                <div>
                    <TextField
                        required
                        id="name"
                        label="Product Name"
                        InputLabelProps={{ shrink: true }}
                        variant="outlined"
                        value={name}
                        onChange={(event): void => setName(event.target.value)}
                    />
                </div>
                <div>
                    <TextField
                        required
                        id="outlined-number"
                        label="Price"
                        type="number"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        variant="outlined"
                        value={price}
                        onChange={(event): void => setPrice(+event.target.value)}
                    />
                </div>
                <div>
                    <TextField
                        required
                        id="category"
                        label="Category"
                        InputLabelProps={{ shrink: true }}
                        variant="outlined"
                        value={category}
                        onChange={(event): void => setCategory(event.target.value)}
                    />
                </div>
                <div>
                    <TextField
                        required
                        id="outlined-multiline-flexible"
                        label="Description"
                        multiline
                        rowsMax={5}
                        InputLabelProps={{ shrink: true }}
                        variant="outlined"
                        value={description}
                        onChange={(event): void => setDescription(event.target.value)}
                    />
                </div>
                <Button variant="contained" color="primary" type='submit'>{id ? "Update Product" : "Add New Product"}</Button>
            </form>
        </Container>
    );
}
