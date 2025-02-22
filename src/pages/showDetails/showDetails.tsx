import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Typography, Box, Card, CardMedia, CardContent, CircularProgress } from "@mui/material";

interface ShowDetails {
    id: number;
    name: string;
    summary: string;
    image?: { medium: string; original: string };
    genres: string[];
    premiered: string;
    rating?: { average: number };
    runtime: number;
    officialSite?: string;
    language: string;
    network?: { name: string };
}

export default function ShowDetails() {
    const { id } = useParams<{ id: string }>();
    const [show, setShow] = useState<ShowDetails | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchShowDetails() {
            try {
                const response = await fetch(`https://api.tvmaze.com/shows/${id}`);
                const data = await response.json();
                setShow(data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching show details:", error);
                setLoading(false);
            }
        }

        fetchShowDetails();
    }, [id]);

    if (loading) return <CircularProgress sx={{ display: "block", margin: "20px auto" }} />;
    if (!show) return <Typography>No data found</Typography>;

    return (
        <Box sx={{ p: 3, display: "flex", flexDirection: "column", alignItems: "center" }}>
            <Card sx={{ maxWidth: 600, mb: 3 }}>
                {show.image && <CardMedia component="img" height="400" image={show.image.original} alt={show.name} />}
                <CardContent>
                    <Typography variant="h4">{show.name}</Typography>
                    <Typography variant="subtitle1" color="textSecondary">
                        {show.genres.join(", ")} | {show.language} | {show.runtime} min
                    </Typography>
                    {show.network && <Typography variant="subtitle2">Network: {show.network.name}</Typography>}
                    {show.premiered && <Typography variant="subtitle2">Premiered: {show.premiered}</Typography>}
                    {show.rating?.average && <Typography variant="h6">⭐ {show.rating.average}/10</Typography>}
                    <Typography dangerouslySetInnerHTML={{ __html: show.summary }} sx={{ mt: 2 }} />
                    {show.officialSite && (
                        <Typography variant="body2" sx={{ mt: 2 }}>
                            <a href={show.officialSite} target="_blank" rel="noopener noreferrer">
                                Visit Official Site
                            </a>
                        </Typography>
                    )}
                </CardContent>
            </Card>
        </Box>
    );
}