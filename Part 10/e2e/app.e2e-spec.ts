import { AccountOwnerClientPage } from './app.po';

describe('account-owner-client App', () => {
  let page: AccountOwnerClientPage;

  beforeEach(() => {
    page = new AccountOwnerClientPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
