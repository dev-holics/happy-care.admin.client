export class CategoryModel {
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
  parentId: any = null;
  order: number = 0;
  images: [];
}

export class CategoryOptions {
  id: string = '';
  name: string = '';

  constructor(id: string, name: string) {
    this.id = id;
    this.name = name;
  }
}
