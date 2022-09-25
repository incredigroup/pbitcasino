import { Container, Box } from "@mui/material";
import { Link } from "@mui/material";
import logo from '../assets/logo.svg';
import "./header.scss";

export default function Header() {
    return (
        <Box className="header-container">
            <Container>
                <Link>
                    <img className="logo" src={logo} />
                </Link>
            </Container>
        </Box>
    )
};