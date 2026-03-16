export interface NavItem {
    title: string;
    url?: string;
    icon?: string; 
    roles?: string[]; 
    children?: NavItem[]; 
  }

export const MOCK_NAVIGATION: NavItem[] = [
    { title: "Dashboard", url: "/", icon: "layout-dashboard" },
    { title: "Products", url: "/products", icon: "package" },
    {
      title: "Sales",
      icon: "shopping-cart",
      children: [
        { title: "New Transaction", url: "/sales/new" },
        { title: "History", url: "/sales/history" }
      ]
    }
];