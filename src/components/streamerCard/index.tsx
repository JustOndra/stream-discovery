import { OpenInNew } from '@mui/icons-material';
import {
  Avatar,
  Box,
  Card,
  CardActionArea,
  CardContent,
  Chip,
  Rating,
  Typography,
} from '@mui/material';
import { useCreate, useGetIdentity, useLink } from '@refinedev/core';
import { useMemo, useState } from 'react';
import { IStreamer } from 'src/interfaces/types';

interface IProps {
  streamer: IStreamer;
}

interface IUser {
  name: string;
  id: string;
}

const StreamerCard = ({ streamer }: IProps) => {
  const { isLoading, data } = useGetIdentity<IUser>();
  const [rating, setRating] = useState(0);
  const { mutate } = useCreate();
  const ratedId = streamer.rating.find((item) => item.user_id === data?.id);

  const link = useLink();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (streamer.rating.length > 0) {
    useMemo(() => {
      let rat = 0;
      streamer.rating.forEach((item) => (rat += item.rating));
      setRating(rat / streamer.rating.length);
    }, []);
  }

  const handleRatingChange = (streamer_id: string, rating: number) => {
    if (!!ratedId) {
      mutate({
        resource: 'rating',
        values: {
          streamer_id: streamer_id,
          rating: rating,
          user_id: data?.id,
        },
        invalidates: ['list', 'many'],
      });
    }
  };

  return (
    <Card sx={{ maxWidth: 400, height: '100%' }}>
      <Box
        sx={{
          paddingY: 10,
          display: 'flex',
          justifyContent: 'center',
          alignContent: 'center',
          alignItems: 'center',
        }}
      >
        <Avatar
          src={streamer.thumbnail_url}
          sx={{ width: 120, height: 120 }}
          alt={`${streamer.name} profile picture`}
        />
      </Box>
      <CardContent>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Rating
            value={rating}
            name={streamer.id}
            readOnly={!data?.id || !!ratedId}
            onChange={(event, newValue) => {
              handleRatingChange(streamer.id, newValue!);
            }}
          />
          <Chip label={streamer.category.name} variant="outlined" />
        </Box>
        <CardActionArea
          LinkComponent={link}
          href={`https://www.twitch.tv/${streamer.name}`}
          target="_blank"
        >
          <Typography
            gutterBottom
            variant="h5"
            component="div"
            display="flex"
            alignItems="center"
            gap="10px"
          >
            {streamer.name}
            <OpenInNew />
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {streamer.description}
          </Typography>
        </CardActionArea>
      </CardContent>
    </Card>
  );
};

export default StreamerCard;
