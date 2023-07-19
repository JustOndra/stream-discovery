export interface ICategory {
  id: string;
  name: string;
  streamer: [{ count: number }];
}

export interface IStreamer {
  name: string;
  description: string;
  thumbnail_url: string;
  id: string;
  category_id: string;
  category: {
    name: string;
  };
  rating: [
    {
      rating: number;
      user_id: string;
      id: string;
    }
  ];
}
