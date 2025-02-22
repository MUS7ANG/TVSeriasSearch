import { Routes, Route } from "react-router-dom";
import SearchAppBar from "./components/searchBar/searchBar.tsx";
import ShowDetails from "./pages/showDetails/showDetails.tsx";
import { CssBaseline, Container } from "@mui/material";

export default function App() {
    return (
        <>
            <CssBaseline />
            <Container>
                <Routes>
                    <Route path="/" element={<SearchAppBar />} />
                    <Route path="/shows/:id" element={<ShowDetails />} />
                </Routes>
            </Container>
        </>
    );
}


