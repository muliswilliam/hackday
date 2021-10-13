export interface MenuItem {
  id: string | number;
  title: string;
  url: string;
  iconUrl: string;
  alt?: string;
  isSeparated?: boolean;
  active?: boolean;
}
