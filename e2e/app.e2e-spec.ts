import { Psqla2Page } from './app.po';

describe('psqla2 App', () => {
  let page: Psqla2Page;

  beforeEach(() => {
    page = new Psqla2Page();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
