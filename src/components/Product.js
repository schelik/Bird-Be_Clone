import React from 'react'
import { useState } from 'react';
import '../Product.css'
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
    root: {
      '& > *': {
        margin: theme.spacing(1),
        width: '25ch',
      },
    },
    button: {
        margin: theme.spacing(0),
        width: "330px",
        height: "50px",
        marginTop: "30px",
        borderRadius: "0em",
        display: "flex",
        padding: "10px",
      },
}));



function Product({productName, productType, productLink, price, addProductPrice}) {
    const classes = useStyles();
    const [value, setValue] = useState('one-time');
    const [checkbox, setCheckbox] = useState(false);
    const [name, setName] = useState("");
    const [errorName, setErrorName] = useState(false);

    const handleChange = (event) => {
      setValue(event.target.value);
    };

    const submitPressed = (e) => { 
        if(name === ""){
            setErrorName(true);
        }
        else{
            setErrorName(false);
            if(checkbox){
                setCheckbox(false);
                addProductPrice(parseInt(price)* -1);
            }
            else{
                setCheckbox(true);
                addProductPrice(parseInt(price));
            }
        }
    }

    return (
        <div className="Product">
            <Paper className="Canvas" elevation={4} square="true" >
                <div className="Content">
                        <h3>{productName}</h3>
                        <p id="subHeading">for {productType}</p>
                        <p id="Price">${price}</p>
                        <div id="Checkbox"><Checkbox color="primary" disableRipple="true" checked={checkbox} /></div>
                </div>
                <div id="ProductBody">
                    <p id="ProductContent">Nullam quis risus eget urna mollis ornare vel eu leo. Nulla vitae elit libero, a pharetra augue. 
                        Maecenas sed diam eget risus varius blandit sit amet non manga.
                    </p>
                    <img id="ProductImage" src={productLink} alt={productName} />
                </div>
                <div id="ProductFooter">
                    <p>Who it's for:<span style={{color:"red"}}>*</span></p>
                    <TextField id="outlined-basic" label="Recipient's name" variant="outlined" size="small"
                    onChange={ (e) => setName(e.target.value)} 
                    error={errorName}
                    helperText={errorName ? "Recipient name cannot be blank." : ""}
                    />
                    <p>List any allergies:</p>
                    <TextField id="outlined-basic" label="Allergies" variant="outlined" size="small" />

                </div>
                <div className="RadioButtons" >
                    {/* <FormControl component="fieldset"> */}
                        <RadioGroup aria-label="purchase" value={value} onChange={handleChange} row >
                            <FormControlLabel value="one-time" control={<Radio color="primary" />}  label="One-time purchase" />
                            <FormControlLabel value="subscription" control={<Radio color="primary" />} label="Subscribe every 3 months and save 10%" />
                        </RadioGroup>
                    {/* </FormControl> */}
                </div>
                <Button variant="contained" color="primary" disableElevation className={classes.button} size="large"  onClick={e => submitPressed(e)}>
                     Add to cart - ${price}
                </Button>
            </Paper>
        </div>
    )
}

export default Product
