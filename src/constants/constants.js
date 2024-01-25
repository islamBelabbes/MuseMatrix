export const NAV_LINKS = [
  {
    id: 1,
    name: "الرئيسية",
    href: "/",
    requireAuth: false,
    onlyAdmin: false,
  },
  {
    id: 2,
    name: "مقالات",
    href: "/genre/17",
    requireAuth: false,
    onlyAdmin: false,
  },
  {
    id: 3,
    name: "بودكاست",
    href: "/genre/18",
    requireAuth: false,
    onlyAdmin: false,
  },
  {
    id: 4,
    name: "كتب",
    href: "/genre/16",
    requireAuth: false,
    onlyAdmin: false,
  },
  {
    id: 5,
    name: "اقتباسات",
    href: "/quotes",
    requireAuth: false,
    onlyAdmin: false,
  },
  {
    id: 6,
    name: "Drafts",
    href: "/drafts",
    requireAuth: true,
    onlyAdmin: true,
  },
];

export const PrivetRoutes = [
  "post/create",
  "post/update",
  "quotes/create",
  "quotes/update",
  "drafts",
];

export const STATUS_OPTIONS = [
  { value: "Draft", label: "Draft" },
  { value: "Published", label: "Published" },
];
