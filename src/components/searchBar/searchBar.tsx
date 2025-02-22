import { useState } from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate } from "react-router-dom";
import { List, ListItem, ListItemText, Paper } from "@mui/material";


const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    width: '100%',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        [theme.breakpoints.up('sm')]: {
            width: '12ch',
            '&:focus': {
                width: '20ch',
            },
        },
    },
}));

interface Show {
    id: number;
    name: string;
}

export default function SearchAppBar() {
    const [query, setQuery] = useState('');
    const [shows, setShows] = useState<Show[]>([]);
    const navigate = useNavigate();

    async function fetchShows(searchQuery: string){
        if (searchQuery.length > 2){
            setShows([]);
            return;
        }
        const response = await fetch(`https://api.tvmaze.com/search/shows?q=${searchQuery}`);
        const data = await response.json();
        setShows(data.map((item: any) => item.show));
    }

    function handleInputChange(event: React.ChangeEvent<HTMLInputElement>){
        const value = event.target.value;
        setQuery(value);
        fetchShows(value);
    }

    function handleShowClick(id: number){
        navigate(`/shows/${id}`);
        setQuery('');
        setShows([])
    }


    return (
        <Box sx={{ flexGrow: 1, position: "relative" }}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton size="large" edge="start" color="inherit" aria-label="open drawer" sx={{ mr: 2 }}>
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}>
                        TV Show Search
                    </Typography>
                    <Search>
                        <SearchIconWrapper>
                            <SearchIcon />
                        </SearchIconWrapper>
                        <StyledInputBase
                            placeholder="Search…"
                            inputProps={{ "aria-label": "search" }}
                            value={query}
                            onChange={handleInputChange}
                        />
                    </Search>
                </Toolbar>
            </AppBar>

            {shows.length > 0 && (
                <Paper sx={{ position: "absolute", top: 60, width: "100%", zIndex: 2 }}>
                    <List>
                        {shows.map((show) => (
                            <ListItem component="div" key={show.id} onClick={() => handleShowClick(show.id)} sx={{ cursor: "pointer" }}>
                                <ListItemText primary={show.name} />
                            </ListItem>
                        ))}
                    </List>
                </Paper>
            )}
        </Box>
    );
}
