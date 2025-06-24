import {
    UserIcon
} from '../icons'
import { useAuthStore } from '../store/auth';

type UserRole = 'USER' | 'STUDENT' | 'ADMIN' | 'SUPERADMIN' | string;

export type NavItem = {
    name: string;
    icon: React.ReactNode;
    path?: string;
    allowedRoles?: UserRole[];
    subItems?: { 
        name: string; 
        path: string; 
        pro?: boolean; 
        new?: boolean;
        allowedRoles?: UserRole[];
    }[];
};

// Función auxiliar para verificar si un elemento debe mostrarse según el rol del usuario
export const shouldShowNavItem = (item: NavItem): boolean => {
    const user = useAuthStore.getState().user;
    
    // Si no hay restricciones de roles, mostrar el elemento
    if (!item.allowedRoles || item.allowedRoles.length === 0) {
        return true;
    }
    
    // Si no hay usuario o no tiene rol, no mostrar elementos con restricciones
    if (!user || !user.role) {
        return false;
    }
    
    // Verificar si el rol del usuario está en la lista de roles permitidos
    return item.allowedRoles.includes(user.role);
};

// Función auxiliar para verificar si un subelemento debe mostrarse según el rol del usuario
export const shouldShowSubItem = (subItem: { allowedRoles?: UserRole[] }): boolean => {
    const user = useAuthStore.getState().user;
    
    // Si no hay restricciones de roles, mostrar el elemento
    if (!subItem.allowedRoles || subItem.allowedRoles.length === 0) {
        return true;
    }
    
    // Si no hay usuario o no tiene rol, no mostrar elementos con restricciones
    if (!user || !user.role) {
        return false;
    }
    
    // Verificar si el rol del usuario está en la lista de roles permitidos
    return subItem.allowedRoles.includes(user.role);
};

export const navItems: NavItem[] = [
    // {
    //   icon: <GridIcon />,
    //   name: "Dashboard",
    //   subItems: [{ name: "Ecommerce", path: "/", pro: false }],
    // },
    {
      icon: <UserIcon />,
      name: "Estudiantes",
      path: "/estudiantes",
      allowedRoles: ['ADMIN', 'SUPERADMIN'],
    },
    {
      icon: <UserIcon />,
      name: "Crear Estudiante",
      path: "/crear-estudiante",
      allowedRoles: ['ADMIN', 'SUPERADMIN'],
    },
    {
      icon: <UserIcon />,
      name: "Inicio",
      path: "/",
      allowedRoles: ['USER', 'STUDENT', 'ADMIN', 'SUPERADMIN'],
    },
    // {
    //   icon: <UserCircleIcon />,
    //   name: "User Profile",
    //   path: "/profile",
    // },
    // {
    //   name: "Forms",
    //   icon: <ListIcon />,
    //   subItems: [{ name: "Form Elements", path: "/form-elements", pro: false }],
    // },
    // {
    //   name: "Tables",
    //   icon: <TableIcon />,
    //   subItems: [{ name: "Basic Tables", path: "/basic-tables", pro: false }],
    // },
    // {
    //   name: "Pages",
    //   icon: <PageIcon />,
    //   subItems: [
    //     { name: "Blank Page", path: "/blank", pro: false },
    //     { name: "404 Error", path: "/error-404", pro: false },
    //   ],
    // },
];
  
export const othersItems: NavItem[] = [
    // {
    //   icon: <PieChartIcon />,
    //   name: "Charts",
    //   subItems: [
    //     { name: "Line Chart", path: "/line-chart", pro: false },
    //     { name: "Bar Chart", path: "/bar-chart", pro: false },
    //   ],
    // },
    // {
    //   icon: <BoxCubeIcon />,
    //   name: "UI Elements",
    //   subItems: [
    //     { name: "Alerts", path: "/alerts", pro: false },
    //     { name: "Avatar", path: "/avatars", pro: false },
    //     { name: "Badge", path: "/badge", pro: false },
    //     { name: "Buttons", path: "/buttons", pro: false },
    //     { name: "Images", path: "/images", pro: false },
    //     { name: "Videos", path: "/videos", pro: false },
    //   ],
    // },
    // {
    //   icon: <PlugInIcon />,
    //   name: "Authentication",
    //   subItems: [
    //     { name: "Sign In", path: "/signin", pro: false },
    //     { name: "Sign Up", path: "/signup", pro: false },
    //   ],
    // },
  ];