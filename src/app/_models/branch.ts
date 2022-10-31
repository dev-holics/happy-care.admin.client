export class Branch {
  id: string = '';
  isActive: string = '';
  address: string = '';
  districtId: string = '';
  district: District;
}

export class BranchCreateUpdate {
  address: string = '';
  districtId: string = '';
}
export class District {
  id: string = '';
  name: string = '';
  cityId: string = '';
  city: City;
}

export class City {
  id: string = '';
  name: string = '';
}
