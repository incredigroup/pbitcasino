import { useState, useEffect } from "react"
import { ListItem, IconButton, ListItemIcon, ListItemText } from "@mui/material";
import {
    useQuery,
    gql,
    ApolloQueryResult
} from "@apollo/client";
import NumberFormat from 'react-number-format';

import CloseIcon from '@mui/icons-material/Close';
import awardIcon from "../assets/icon.svg"
import { TokenItemProps } from "../interfaces";
// query to get EUR price according to base symbol
const PRICE_QUERY = gql`
    query price($symbol: String!) {
        markets(filter:{ baseSymbol: {_eq: $symbol} quoteSymbol: {_in: ["EUR"]} marketStatus: { _eq: Active }}) {
        marketSymbol
        ticker {
            lastPrice
        }
        }
    }
`;

export default function TokenItem(TokenItemProps: TokenItemProps) {
    const { tokenSymbol, handleRemove } = TokenItemProps
    const [tokenUnit, setTokenUnit] = useState<string>("€")
    const [result, setResult] = useState<ApolloQueryResult<any>>()
    const { refetch } = useQuery(PRICE_QUERY, {
        variables: { symbol: tokenSymbol }
    });
    /**
     * Refetch data
     */
    const onRefetchInformation = async () => {
        const tokenData = await refetch();
        setResult(tokenData)
    }
    /**
     * Get data using query on realtime
     */
    useEffect(() => {
        onRefetchInformation()
        setInterval(() => {onRefetchInformation()}, process.env.REACT_APP_REALTIME_DELAY * 1000)
    }, [])
    return (
        <>
            <ListItem
                secondaryAction={
                    <IconButton edge="end" aria-label="delete" onClick={() => handleRemove(tokenSymbol)}>
                        <CloseIcon />
                    </IconButton>
                }
            >
                <ListItemIcon>
                    <img src={awardIcon} alt="Icon" />
                </ListItemIcon>
                <ListItemText primary={tokenSymbol}
                    secondary={ <NumberFormat value={result?.data?.markets[0]?.ticker.lastPrice} 
                                fixedDecimalScale={true} decimalScale={2} displayType={'text'}
                                suffix={' ' + tokenUnit} /> } 
                />
            </ListItem>
            <hr className="border-bottom-gradient" />
        </>
    )
}