import React, { useEffect, useState } from 'react';
import { Container, Grid, Typography, Card, CardMedia, CardContent, CardActions, IconButton, Box } from '@mui/material';
import { ThumbUp, ThumbDown } from '@mui/icons-material';
import { backend } from 'declarations/backend';

type CatPicture = {
  id: bigint;
  url: string;
  upvotes: bigint;
  downvotes: bigint;
};

const App: React.FC = () => {
  const [cats, setCats] = useState<CatPicture[]>([]);

  useEffect(() => {
    const fetchCats = async () => {
      try {
        await backend.init();
        const fetchedCats = await backend.getCatPictures();
        setCats(fetchedCats);
      } catch (error) {
        console.error('Error fetching cats:', error);
      }
    };
    fetchCats();
  }, []);

  const handleVote = async (id: bigint, isUpvote: boolean) => {
    try {
      if (isUpvote) {
        await backend.upvoteCat(id);
      } else {
        await backend.downvoteCat(id);
      }
      const updatedCats = await backend.getCatPictures();
      setCats(updatedCats);
    } catch (error) {
      console.error('Error voting:', error);
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h2" component="h1" gutterBottom align="center" color="primary">
        Cat Rating App
      </Typography>
      <Grid container spacing={4}>
        {cats.map((cat) => (
          <Grid item key={Number(cat.id)} xs={12} sm={6} md={4}>
            <Card>
              <CardMedia
                component="img"
                height="240"
                image={cat.url}
                alt={`Cat ${Number(cat.id)}`}
              />
              <CardContent>
                <Typography variant="h6" component="div">
                  Cat #{Number(cat.id)}
                </Typography>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2 }}>
                  <Typography variant="body2" color="text.secondary">
                    Upvotes: {Number(cat.upvotes)}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Downvotes: {Number(cat.downvotes)}
                  </Typography>
                </Box>
              </CardContent>
              <CardActions>
                <IconButton onClick={() => handleVote(cat.id, true)} color="primary">
                  <ThumbUp />
                </IconButton>
                <IconButton onClick={() => handleVote(cat.id, false)} color="secondary">
                  <ThumbDown />
                </IconButton>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default App;
