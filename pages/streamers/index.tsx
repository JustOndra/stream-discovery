import NewStreamerDialog from '@components/newStreamerDialog/newStreamerDialog';
import StreamerCard from '@components/streamerCard';
import { Add } from '@mui/icons-material';
import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
} from '@mui/material';
import {
  HttpError,
  useInfiniteList,
  useIsAuthenticated,
  useNotification,
  useParsed,
  useSelect,
} from '@refinedev/core';
import { useModalForm } from '@refinedev/react-hook-form';
import { useEffect } from 'react';
import { ICategory, IStreamer } from 'src/interfaces/types';

export const StreamerList = () => {
  const { open: openNotification } = useNotification();
  const { data: user } = useIsAuthenticated();
  const { params } = useParsed();

  const {
    formState: { errors },
    refineCore: { onFinish, formLoading },
    modal: { visible, close, show },
    register,
    handleSubmit,
    resetField,
    saveButtonProps,
  } = useModalForm<IStreamer, HttpError, IStreamer>({
    refineCoreProps: { action: 'create', resource: 'streamer' },
  });

  const {
    data,
    error,
    hasNextPage,
    isLoading,
    fetchNextPage,
    isFetchingNextPage,
  } = useInfiniteList<IStreamer>({
    resource: 'streamer',
    metaData: {
      select: '*, category(name), rating(rating, user_id, id)',
    },
    pagination: {
      pageSize: 12,
    },
    filters: [
      {
        field: !!params?.filters ? params.filters[0].field : '',
        operator: !!params?.filters ? params.filters[0].operator : '',
        value: !!params?.filters ? params.filters[0].value : '',
      },
    ],
    sorters: [
      {
        field: 'name',
        order: 'asc',
      },
    ],
  });

  const { options } = useSelect<ICategory>({
    resource: 'category',
    optionLabel: 'name',
    optionValue: 'id',
  });

  useEffect(() => {
    resetField('category.name');
  }, [options]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (data == null) {
    return <div>No data found.</div>;
  }

  if (error) {
    openNotification?.({
      type: 'error',
      message: 'Error',
      description: error.message,
    });
  }

  return (
    <>
      <Box justifyContent={'flex-end'} display={'flex'} paddingY={1}>
        {user?.authenticated && (
          <Button variant="outlined" startIcon={<Add />} onClick={() => show()}>
            New
          </Button>
        )}
      </Box>
      <Grid
        container
        rowSpacing={2}
        gridAutoRows={'1 fr'}
        columnSpacing={{ xs: 2, sm: 2, md: 2, lg: 2 }}
        columns={{ xs: 2, sm: 4, md: 6, lg: 12 }}
      >
        {data?.pages.map((streamers) =>
          streamers.data.map((streamer: IStreamer) => (
            <Grid item xs={2} sm={2} md={3} lg={4} key={streamer.id}>
              <StreamerCard key={streamer.id} streamer={streamer} />
            </Grid>
          ))
        )}
      </Grid>
      <Box display={'flex'} justifyContent={'center'} paddingY={10}>
        <Button
          variant="outlined"
          color="info"
          onClick={() => fetchNextPage()}
          disabled={!hasNextPage || isFetchingNextPage}
        >
          {isFetchingNextPage
            ? 'Loading more...'
            : hasNextPage
            ? 'Load More'
            : 'Nothing more to load'}
        </Button>
      </Box>

      <NewStreamerDialog
        visible={visible}
        formLoading={formLoading}
        saveButtonProps={saveButtonProps}
        close={close}
      >
        <form onSubmit={handleSubmit(onFinish)}>
          <Stack spacing={2} paddingY={2}>
            <TextField
              id="name"
              label="Name"
              {...register('name', {
                required: 'Name is required',
              })}
              error={!!errors.name}
              helperText={errors.name?.message}
            />
            <TextField
              id="description"
              label="Description"
              {...register('description', {
                required: 'Description is required',
              })}
              error={!!errors.description}
              helperText={errors.description?.message}
            />
            <TextField
              id="thumbnail_url"
              label="Thumbnail"
              {...register('thumbnail_url', {
                required: 'Tumbnail is required',
              })}
              error={!!errors.thumbnail_url}
              helperText={errors.thumbnail_url?.message}
            />
            <FormControl error={!!errors.category_id}>
              <InputLabel id="category-select-label">Category</InputLabel>
              <Select
                labelId="category-select-label"
                label="Category"
                id="category_id"
                {...register('category_id', {
                  required: 'Category is required',
                })}
                defaultValue={''}
              >
                {options?.map((category) => (
                  <MenuItem key={category.value} value={category.value}>
                    {category.label}
                  </MenuItem>
                ))}
              </Select>
              <FormHelperText>{errors.category_id?.message}</FormHelperText>
            </FormControl>
          </Stack>
        </form>
      </NewStreamerDialog>
    </>
  );
};

export default StreamerList;
