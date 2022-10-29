export class Category {
  id: string = '';
  isActive: string = '';
  name: string = '';
  description: string = '';
  parentId: string;
  order: number = 0;
  images: [];
}

export class CategoryCreateUpdate {
  name: string = '';
  description: string = '';
  parentId: string;
  order: number = 0;
  images: [];
}

export class CategoryOptions {
  id: string = '';
  name: string = '';
}
