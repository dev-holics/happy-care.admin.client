export class BranchModel {
  id: string = '';
  isActive: string = '';
  address: string = '';
  districtId: string = '';
  district: DistrictModel;
}

export class DistrictModel {
  id: string = '';
  name: string = '';
  cityId: string = '';
  city: CityModel;
}

export class CityModel {
  id: string = '';
  name: string = '';
}
