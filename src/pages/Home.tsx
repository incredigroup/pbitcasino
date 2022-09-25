import { Box, Button, List, TextField, Typography, Container, CircularProgress } from "@mui/material";
import { useState, ChangeEvent } from "react";
import {
    useQuery,
    gql
} from "@apollo/client";

import { MarketsData } from "../interfaces";
import TokenItem from "../components/TokenItem";
import slashBackground from "../assets/bg.png";
import figureImg from "../assets/figure.png";
import "./home.scss";
// query to get all symbol data 
const SYMBOL_QUERY = gql`
    query price {
        markets(filter:{quoteSymbol: {_eq:"EUR"}}) {
            baseSymbol
        }
    }
`;

export default function Home() {
    // get all symbol data
    const { loading, error, data } = useQuery(SYMBOL_QUERY);
    const [isError, setIsError] = useState<boolean>(false)
    const [errorText, setErrorText] = useState<string>("")
    const [listItemsSymbol, setListItemsSymbol] = useState<Array<string>>([])
    const [tokenSymbol, setTokenSymbol] = useState<string>("")
    /**
     * This is a function to set tokenSymbol when change input content
     * @param event will be put automatically 
     */
    const handleInput = (event: ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();
        setTokenSymbol(event.target.value.toUpperCase())
    }
    /**
     * This is a function to add TokenItem
     * @param tokenSymbol is inputed the value of tokenSymbol state
     */
    const addItem = (tokenSymbol: string) => {
        let isBaseSymbol = false;
        data?.markets.forEach((item: MarketsData) => {
            if (item.baseSymbol === tokenSymbol) {
                isBaseSymbol = true;
            }
        });
        if (tokenSymbol === "") {
            setIsError(true)
            setErrorText("Must input code!")
            return;
        }
        if (!isBaseSymbol) {
            setIsError(true)
            setErrorText("Cryptocurrency Code Error!")
            return;
        }
        if (listItemsSymbol.find((item: string) => item === tokenSymbol)) {
            setIsError(true)
            setErrorText("Already Exists!")
            return;
        }
        setIsError(false)
        setErrorText("")
        setListItemsSymbol([...listItemsSymbol, tokenSymbol])
    }
    /**
     * This is a function to remove TokenItem
     * @param tokenSymbol is inputed the value of tokenSymbol state
     */
    const handleRemove = (tokenSymbol: string) => {
        setListItemsSymbol(listItemsSymbol.filter((ListItem: string) => ListItem !== tokenSymbol))
    }
    return (
        <Box className="main-container">
            {
                !data ? <Box className="loading-box">
                    <CircularProgress />
                </Box> : (
                    <Container>
                        <img className="bg-slash-img" src={slashBackground} alt="Background" />
                        <img className="bg-figure-img" src={figureImg} alt="figureImg" />
                        <Box className="aside-left">
                            <Typography variant="h4" component="h2">Now you can track<br /> all your cryptos here!</Typography>
                            <Typography variant="body1" component="p">Just enter teh cryptocurrency code on the form to the right.</Typography>
                            <List className="result-list">
                                {listItemsSymbol.map((item: string, index: number) =>
                                    <TokenItem key={index} tokenSymbol={item} handleRemove={handleRemove} />
                                )}
                            </List>
                        </Box>
                        <Box className="aside-right">
                            <TextField label="CRYPTOCURRENCY CODE" error={isError} helperText={errorText}
                                variant="outlined" onInput={handleInput} />
                            <Button variant="contained" onClick={() => addItem(tokenSymbol)}>Add</Button>
                            <Typography variant="body1" component='p'>Use of this service is subject to terms and conditions.</Typography>
                        </Box>
                    </Container>
                )
            }
        </Box >
    )
}