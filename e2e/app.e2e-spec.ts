import { Ang4ConmanagerPage } from './app.po';

describe('ang4-conmanager App', () => {
  let page: Ang4ConmanagerPage;

  beforeEach(() => {
    page = new Ang4ConmanagerPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
