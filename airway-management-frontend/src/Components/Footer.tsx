import { AppBar, Toolbar, Typography, Container } from "@material-ui/core";
import FacebookIcon from '@material-ui/icons/Facebook';
import InstagramIcon from '@material-ui/icons/Instagram';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
export default function Footer() {
    return (
        <AppBar position="static" style={{ background: "#008080" }}>
            <Container maxWidth="md">
                <Toolbar>
                    <Typography variant="body1" color="inherit">
                        &copy; 2021    Airway Management
                        Contact Us: <MailOutlineIcon style={{ marginLeft: "10px" }} />
                        <FacebookIcon style={{ marginLeft: "10px" }} />
                        <InstagramIcon style={{ marginLeft: "10px" }} />
                    </Typography>

                </Toolbar>
            </Container>
        </AppBar>
    )
}