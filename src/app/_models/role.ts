export class Role {
  id: string = '';
  name: string = '';
  description: string = '';
  accessLevel: string = '';
  isActive: boolean = true;
  permissions: Permission[] = [];
}

export class RoleUpdate {
  name: string = '';
  description: string = '';
  permissions: string[] = [];
}

export class RoleOption {
  id: string = '';
  name: string = '';
}

export class Permission {
  id: string = '';
  name: string = '';
  isActive: boolean = true;
  module: string = '';
}

export class PermissionStatus {
  id: string = '';
  status: boolean = false;
  constructor(id: string, status: boolean) {
    this.id = id;
    this.status = status;
  }
}
