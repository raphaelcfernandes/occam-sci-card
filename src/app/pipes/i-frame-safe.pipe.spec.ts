import { IFrameSafePipe } from './i-frame-safe.pipe';
import { DomSanitizer } from '@angular/platform-browser';

describe('IFrameSafePipe', () => {
  it('create an instance', () => {
    const pipe = new IFrameSafePipe(DomSanitizer);
    expect(pipe).toBeTruthy();
  });
});
