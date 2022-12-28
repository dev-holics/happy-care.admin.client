import { Injectable } from '@angular/core';
import { HttpService } from 'src/app/_services/http.service';
import { URL_CONFIG } from '../../../shared/config';
import { BranchModel, CityModel, DistrictModel } from '../models/branch.model';

@Injectable({
  providedIn: 'root'
})
export class BranchesService {
  constructor(
    public httpService: HttpService
  ) {}

  async getBranches(queryObject: any): Promise<any> {
    const query = this.httpService.convertQueryString(queryObject);
    const url = `${URL_CONFIG.BRANCH_PUBLIC_URL}/list/${query}`;
    const res = await this.httpService.get(url);
  
    const data = res.data;
    const paginator = {
      page: res.currentPage,
      limit: res.limit,
      totalData: res.totalData
    }
  
    return {
      data: data,
      paginator: paginator
    }
  }

  async getBranchById(branchId: string) : Promise<BranchModel> {
    const url = `${URL_CONFIG.BRANCH_PUBLIC_URL}/${branchId}`;
    const res = await this.httpService.get(url);
    return res.data;
  }

  async getCities() : Promise<CityModel[]> {
    const url = `${URL_CONFIG.CITY_PUBLIC_URL}`;
    const res = await this.httpService.get(url);
    return res.data;
  }

  async getDistricts() : Promise<DistrictModel[]> {
    const url = `${URL_CONFIG.DISTRICT_PUBLIC_URL}`;
    const res = await this.httpService.get(url);
    return res.data;
  }

  async getDistrictsByCityId(cityId: string): Promise<DistrictModel[]> {
    const url = `${URL_CONFIG.CITY_PUBLIC_URL}/${cityId}/district`;
    const res = await this.httpService.get(url);
    return res.data;
  }

  async addBranch(branch: BranchModel) {
    const url = `${URL_CONFIG.BRANCH_ADMIN_URL}`;
    await this.httpService.post(url, branch);
  }

  async updateBranch(branch: BranchModel) {
    const url = `${URL_CONFIG.BRANCH_ADMIN_URL}/${branch.id}`;
    await this.httpService.put(url, branch);
  }

  async deleteBranch(id: number) {
    const url = `${URL_CONFIG.BRANCH_ADMIN_URL}/${id}`;
    await this.httpService.delete(url);
  }
}
