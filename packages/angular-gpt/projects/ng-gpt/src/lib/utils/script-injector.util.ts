import { Injectable } from '@angular/core';

@Injectable()
export class ScriptInjectorUtil {
  injectScript(url: string) {
    const script = this.createScript(url);
    const head = document.head || document.querySelector('head');

    head.appendChild(script);

    return this.promiseScript(script, url);
  }

  private createScript(url: string): HTMLScriptElement {
    const script = document.createElement('script');

    script.async = true;
    script.type = 'text/javascript';
    script.src = this.completeURL(url);

    return script;
  }

  private completeURL(url: string): string {
    const ssl = document.location.protocol === 'https:';
    return (ssl ? 'https:' : 'http:') + url;
  }

  private promiseScript(script: any, url: string): Promise<any> {
    const promise = new Promise((resolve, reject) => {
      script.onload = () => {
        resolve(script);
      };
      script.onerror = () => {
        reject({
          path: url,
          loaded: false,
        });
      };
    });

    promise.catch(() => {
      console.error(`Error: loading script "${url}"`);
    });

    return promise;
  }
}
