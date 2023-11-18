export interface CustomRoutes {
  key: string;
  path: string;
  exact?: boolean;
  component: React.FC;
}
