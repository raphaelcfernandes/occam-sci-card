import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class OccamRequesterService {
  public readonly occamUrl = 'https://occam-dev.cs.pitt.edu/';
  private token: any;
  constructor(private httpClient: HttpClient) { }

  public async getConfigurationFromExperiment(URL: string) {
    this.token = URL.split('?')[1];
    this.token = this.token.slice(6, this.token.length);
    const firstResult = await this.getDataFromURL(URL);
    const secondResult = await this.findWorkFlow(firstResult, URL);
    const thirdResult = await this.findConfigByName(secondResult, 'configuration');
    return thirdResult;
  }

  public getOutputFromExperiment(URL: string): Promise<any> {
    return this.httpClient.get(URL).toPromise();
  }

  // Returns array contains. This array tells what the object has
  private async getDataFromURL(URL: string) {
    return await this.httpClient.get(URL).toPromise();
  }

  private async findWorkFlow(arr: any, url: string) {
    for (const i in arr.contains) {
      if (arr.contains[i].type === 'workflow') {
        const worfkFlow = url.split('?')[0] + '/' + i + '?token=' + this.token;
        const result = await this.httpClient.get(worfkFlow).toPromise();
        return result;
      }
    }
  }

  private async findConfigByName(obj: any, name: string) {
    for (const i in obj.contains) {
      if (!obj.contains[i].name.includes(name)) {
        const result = await this.httpClient.get(this.occamUrl + obj.contains[i].id + '/'
          + obj.contains[i].revision + '/raw/data.json?token=' + this.token).toPromise();
        return result;
      }
    }
  }

}
