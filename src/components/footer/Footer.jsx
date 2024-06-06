import { Container, Grid, Typography, Box, Button } from "@mui/material";
import { Link } from "react-router-dom";
import style from "./Footer.module.css";

export const Footer = () => {

    return (
        <Grid container sx={{ backgroundColor: "primary.dark", display: 'flex', position: 'relative', height: '310px' }}>
            <Container style={{ marginTop: "50px" }}>
                <Grid container spacing={3}>
                    <Grid 
                        item 
                        xs={12} 
                        sm={6} 
                        md={4} 
                        lg={3}
                        container 
                        direction="column" 
                        alignItems="center" 
                        justifyContent="center" 
                    >
                        <Link to="/">
                            <Box 
                                component="img"
                                alt="logo"
                                sx={{ 
                                    mr: 2,
                                    height: 80, 
                                    width: 80, 
                                    display: { xs: 'none', md: 'flex' }
                                }}
                                src="/logo.svg"
                            />
                        </Link>
                        <Typography variant="h7" sx={{ margin: "5px 15px", color: "#C2C2C2" }} className={style.icon}>Soporte Técnico: ecommercetech2024@gmail.com</Typography>
                    </Grid>

                    <Grid item xs={12} sm={6} md={4} lg={3} container direction="column" alignItems="left">
                        <Typography variant="h5" sx={{ margin: "15px", fontWeight: "bold", color: "white" }}>Front-End Developers</Typography>
                        <Typography variant="h7" sx={{ margin: "5px 15px" }}>
                            <a href="https://www.linkedin.com/in/alen-oviedo-lagos-7342a316a/" target="_blank" rel="noopener noreferrer" className={style.link}>
                                Alen Oviedo Lagos
                            </a>
                        </Typography>
                        <Typography variant="h7" sx={{ margin: "5px 15px" }}>
                            <a href="https://www.linkedin.com/in/javier-arangue-ba9897108/" target="_blank" rel="noopener noreferrer" className={style.link}>
                                Javier Arangue
                            </a>
                        </Typography>
                        <Typography variant="h7" sx={{ margin: "5px 15px" }}>
                            <a href="https://www.linkedin.com/in/jerickdev/" target="_blank" rel="noopener noreferrer" className={style.link}>
                                Jorge Garcia Moron
                            </a>
                        </Typography>
                        <Typography variant="h7" sx={{ margin: "5px 15px" }}>
                            <a href="https://www.linkedin.com/in/julian-santiago-navarro-mart%C3%ADnez-844963203/" target="_blank" rel="noopener noreferrer" className={style.link}>
                                Julian Navarro
                            </a>
                        </Typography>
                    </Grid>

                    <Grid item xs={12} sm={6} md={4} lg={3} container direction="column" alignItems="left">
                        <Typography variant="h5" sx={{ margin: "15px", fontWeight: "bold", color: "white" }}>Back-End Developers</Typography>
                        <Typography variant="h7" sx={{ margin: "5px 15px" }}>
                            <a href="https://www.linkedin.com/in/anthony-depablos/" target="_blank" rel="noopener noreferrer" className={style.link}>
                                Anthony Depablos
                            </a>
                        </Typography>
                        <Typography variant="h7" sx={{ margin: "5px 15px" }}>
                            <a href="https://www.linkedin.com/in/camila-sotomayor-avello/" target="_blank" rel="noopener noreferrer" className={style.link}>
                                Camila Sotomayor
                            </a>
                        </Typography>
                        <Typography variant="h7" sx={{ margin: "5px 15px" }}>
                            <a href="https://www.linkedin.com/in/cristian-sebastian-galván-7766a6136" target="_blank" rel="noopener noreferrer" className={style.link}>
                                Cristian Sebastian Galván
                            </a>
                        </Typography>
                        <Typography variant="h7" sx={{ margin: "5px 15px" }}>
                            <a href="https://www.linkedin.com/in/mariano-velarde-fullstack/" target="_blank" rel="noopener noreferrer" className={style.link}>
                                Mariano Velarde
                            </a>
                        </Typography>
                    </Grid>

                    <Grid item xs={12} sm={6} md={4} lg={3} container direction="column" alignItems="left">
                        <Typography variant="h5" sx={{ margin: "15px", fontWeight: "bold", color: "white" }}>Tecnologías</Typography>
                        <Grid container direction="row">
                            <Typography variant="h4" sx={{ margin: "9px" }} className={style.icon}><i className="devicon-javascript-plain"></i></Typography>
                            <Typography variant="h4" sx={{ margin: "9px" }} className={style.icon}><i className="devicon-react-original-wordmark"></i></Typography>
                            <Typography variant="h4" sx={{ margin: "9px" }} className={style.icon}><i className="devicon-redux-original"></i></Typography>
                            <Typography variant="h4" sx={{ margin: "9px" }} className={style.icon}><i className="devicon-postgresql-plain-wordmark"></i></Typography>
                            <Typography variant="h4" sx={{ margin: "9px" }} className={style.icon}><i className="devicon-vitejs-plain"></i></Typography>
                        </Grid>
                        <Link to="/arrepentimiento" style={{ textDecoration: "none" }}>
                            <Button 
                                variant="outlined" 
                                sx={{ 
                                    marginTop: "10px", 
                                    color: "white",
                                    backgroundColor: "primary.dark",
                                    borderColor: "gray",
                                    borderRadius: '30px',
                                    textTransform: 'none',
                                    '&:hover': {
                                        backgroundColor: "primary.dark",
                                        borderColor: "gray"
                                    }
                                }}
                            >
                                Botón de Arrepentimiento
                            </Button>
                        </Link>
                    </Grid>

                    
                </Grid>
            </Container>
        </Grid>
    )
}