import { Injectable } from '@angular/core';
import { DEFAULT_TAG_NAME } from '../constants';

@Injectable()
export class IdGeneratorUtil {
  private ids: { [key: string]: boolean } = {};

  generate(element: HTMLElement): string {
    if (element && element.id && !(element.id in this.ids)) return element.id;

    const tagName = element.tagName || DEFAULT_TAG_NAME;

    let id = '';

    do {
      const number = Math.random().toString().slice(2);
      id = tagName + '-' + number;
    } while (id in this.ids);

    this.ids[id] = true;
    element.id = id;

    return id;
  }

  isTaken(id: string): boolean {
    return id in this.ids;
  }

  isUnique(id: string): boolean {
    return !this.isTaken(id);
  }
}
