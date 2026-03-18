export interface NavItem {
  title: string;
  url?: string;
  icon?: string; 
  children?: NavItem[]; 
}

export interface NavGroup {
  label: string;
  items: NavItem[];
}

export const MOCK_NAVIGATION: NavGroup[] = [
  {
    label: "HOME",
    items: [
      { title: "Dashboard", url: "/", icon: "layout-dashboard" }
    ]
  },
  {
    label: "POS",
    items: [
      {
        title: "Sales",
        icon: "shopping-cart",
        children: [
          { title: "New Transaction", url: "/sales/new" },
          { title: "History", url: "/sales/history" }
        ]
      },
      { title: "Products", url: "/products", icon: "package" }
    ]
  },
  {
    label: "MASTER",
    items: [
      { title: "Customers", url: "/master/customers", icon: "users" },
      { title: "Suppliers", url: "/master/suppliers", icon: "truck" }
    ]
  },
  {
    label: "CONFIG",
    items: [
      { title: "Settings", url: "/config/app", icon: "settings" },
      { title: "Users", url: "/config/users", icon: "user-cog" }
    ]
  }
];