import { AccountTreeIcon, ApartmentIcon, ApiIcon, AutoAwesomeIcon, AutoStoriesIcon, BadgeIcon, ConstructionIcon, CreateNewFolderIcon, DashboardIcon, DescriptionIcon, DomainIcon, GroupIcon, HelpIcon, NotesIcon, PeopleAltIcon, SettingsIcon, StorageIcon, TableChartIcon, TodayIcon, TourIcon, UpdateIcon, ViewQuiltIcon } from "../../theme/icons";
import { NavigationItem } from "@/interfaces/Navigation";

export const MinimalRoutes = [
  { label: 'Dashboard', path: '/dashboard' },
  { label: 'Movimentações', path: '/movimentacoes' },
  { label: 'Visitações', path: '/visitacoes' },
  { label: 'Livro Virtual', path: '/livro' },
  // { label: 'Relatórios', path: '/relatorios' },
];


export const AppNavBarRoutes: NavigationItem[] = [
  {
    segment: 'dashboard',
    title: 'Dashboard',
    icon: <DashboardIcon />,
  },
  {
    segment: 'chat',
    title: 'Chat IA',
    icon: <AutoAwesomeIcon />,
  },
  {
    segment: 'help',
    title: 'Ajuda',
    icon: <HelpIcon />,
  },
  {
    segment: 'about',
    title: 'Sobre',
    icon: <GroupIcon />,
  },

];
