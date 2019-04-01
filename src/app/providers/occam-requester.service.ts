import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class OccamRequesterService {
  public readonly occamUrl = 'https://occam-dev.cs.pitt.edu/';
  constructor(private httpClient: HttpClient) { }

  public async getConfigurationFromExperiment(URL: string) {
    const token = this.getToken(URL);
    const firstResult = await this.getDataFromURL(URL);
    const workflow = await this.findWorkFlow(firstResult, URL, token);
    const thirdResult = await this.findConfigByName(workflow, 'configuration', token);
    return thirdResult;
  }

  public async getBuildFromExperiment(URL: string) {
    const token = this.getToken(URL);
    const firstResult = await this.getDataFromURL(URL);
    const workflow = await this.findWorkFlow(firstResult, URL, token);
    //Should this be a list in the future?
    const object = await this.findConfigForXSIM(workflow, token);
    const final = await this.getBuild(object, token);
    return final;
  }

  private async getBuild(obj: any, token: string) {
    const url = this.occamUrl + obj.schema.id + '/' + obj.schema.revision + '/?token=' + token;
    return await this.httpClient.get(url).toPromise();
  }

  //The name of this function should change
  private async findConfigForXSIM(workflow: any, token: string) {
    for (const obj of workflow.contains) {
      if (!obj.name.includes('plotter')) {
        const url = this.occamUrl + obj.id + '/' + obj.revision + '?token=' + token;
        return await this.httpClient.get(url).toPromise();
      }
    }
  }

  private getToken(URL: string): string {
    let token = URL.split('?')[1];
    token = token.slice(6, token.length);
    return token;
  }

  public getOutputFromExperiment(URL: string): Promise<any> {
    return this.httpClient.get(URL).toPromise();
  }

  // Returns array contains. This array tells what the object has
  private async getDataFromURL(URL: string) {
    return await this.httpClient.get(URL).toPromise();
  }

  private async findWorkFlow(arr: any, URL: string, token: string) {
    for (const i in arr.contains) {
      if (arr.contains[i].type === 'workflow') {
        const worfkFlow = URL.split('?')[0] + '/' + i + '?token=' + token;
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
