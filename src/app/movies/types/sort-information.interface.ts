import { SortBy } from 'src/app/movies/types/sort-by.td';

export interface SortInformation {
  sortBy: SortBy;
  sortOrder: 'asc' | 'desc';
}
