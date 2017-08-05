import { Ag4ContactManagerPage } from './app.po';

describe('ag4-contact-manager App', () => {
  let page: Ag4ContactManagerPage;

  beforeEach(() => {
    page = new Ag4ContactManagerPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
