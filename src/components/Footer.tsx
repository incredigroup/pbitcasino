import { Box, Container, Typography } from "@mui/material";
import "./footer.scss";

export default function Footer() {
    return (
        <>
            <Box className="footer-container">
                <Container>
                    <Typography component="p" >Lorem ipsum dolor sit amet consectetur, adipisicing elit. Corrupti modi iusto, repellat obcaecati labore voluptas consequatur eos ea voluptatum!
                        Harum deserunt ullam magni cupiditate illo voluptates neque ratione ut dolores!</Typography>
                </Container>
            </Box>
        </>
    )
};