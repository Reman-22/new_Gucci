export type Page =
  | { name: "home" }
  | { name: "category"; parentCategory: string }
  | { name: "product"; productId: string }
  | { name: "search" }
  | { name: "account" }
  | { name: "services" };

export type NavigateFn = (p: Page) => void;
