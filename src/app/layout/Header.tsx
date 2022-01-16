import { AppBar, Switch, Toolbar, Typography } from "@mui/material";

export default function Header({darkMode, handleChange}: Props){
    return (
        <AppBar position='static' sx={{mb: 4}}>
            <Toolbar>
                <Typography variant='h6'>
                RE-STORE
                </Typography>
                <Switch onChange={handleChange} checked={darkMode} />
            </Toolbar>
        </AppBar>
    )
}

interface Props {
    darkMode: boolean;
    handleChange: ()=>void;
}