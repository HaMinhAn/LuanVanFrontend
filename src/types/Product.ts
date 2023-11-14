export interface Product {
  id: number;
  name: string;
  manufacturer: Manufacturer;
  category: Category;
  price: number;
  pictureList: Picture[];
  authors: Author[];
  language: Language;
  quantity: number;
  sale: number;
  description: string;
}

export interface Manufacturer {
  id: number;
  name: string;
}
export interface Language {
  id: number;
  language: string;
}
export interface Author {
  id: number;
  name: string;
  story: string;
}
export interface Category {
  id: number;
  name: string;
}

export interface Picture {
  path: string;
  caption: string;
}

export interface BookRequest {
  name: string;
  price: number;
  quantity: number;
  idManufacturer: number;
  idLanguage: number;
  idCategory: number;
  idAuthor: number;
  list: Picture[];
  description: string;
}
