import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class OccamRequesterService {
  private readonly occamUrl = 'https://occam-dev.cs.pitt.edu/';

  constructor(private httpClient: HttpClient) { }

  public async getDataFromExperiment(URL: string, token: string) {
    const firstResult = await this.getDataFromURL(URL);
    const secondResult = await this.findWorkFlow(firstResult, URL, token);
    const thirdResult = await this.findConfigByName(secondResult, 'plotter', token);
    return thirdResult;
  }

  // Returns array contains. This array tells what the object has
  private async getDataFromURL(URL: string) {
    return await this.httpClient.get(URL).toPromise();
  }

  private async findWorkFlow(arr: any, url: string, token: string) {
    for (const i in arr.contains) {
      if (arr.contains[i].type === 'workflow') {
        const worfkFlow = url.split('?')[0] + '/' + i + '?token=' + token;
        const result = await this.httpClient.get(worfkFlow).toPromise();
        return result;
      }
    }
  }

  private async findConfigByName(obj: any, name: string, token: string) {
    for (const i in obj.contains) {
      if (!obj.contains[i].name.includes(name)) {
        const result = await this.httpClient.get(this.occamUrl + obj.contains[i].id + '/'
          + obj.contains[i].revision + '/raw/data.json?token=' + token).toPromise();
        return result;
      }
    }
  }

}
