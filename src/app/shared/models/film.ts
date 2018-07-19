// enum STATUS { 'watch', 'plan', 'done' }
// enum TYPE { 'movie', 'series' }

export interface Film {
  id?: string;
  user_id?: string;
  film_id: string;
  poster: string;
  status: string;
  type: string;
  title: string;
  episodes: number;
  user_episode: number;
  user_season: string;
}
