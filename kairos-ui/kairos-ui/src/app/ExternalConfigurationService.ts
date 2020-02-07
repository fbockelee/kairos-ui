import {Injectable} from '@angular/core';
import {ExternalConfigurationHandlerInterface, ExternalConfiguration} from 'angular4-hal';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ExternalConfigurationService implements ExternalConfigurationHandlerInterface {

  constructor(private http: HttpClient) {
  }

  deserialize() {
  }
  serialize() {
  }

  getProxyUri(): string {
    return 'http://localhost:8082/core/';
  }

  getRootUri(): string {
    return 'http://localhost:8082/core/';
  }

  getHttp(): HttpClient {
    return this.http;
  }

  getExternalConfiguration(): ExternalConfiguration {
    return null;
  }

  setExternalConfiguration(externalConfiguration: ExternalConfiguration) {
  }
}

