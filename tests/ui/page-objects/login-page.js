import { Page } from './page.js';

class LoginPage extends Page {
    get userNameField() {
        return browser.$('//input[@name="UserName"]');
    }
    get passwordField() {
        return browser.$('//input[@name="Password"]');
    }
    get loginButton() {
        return $('#login');
    }
    get successMessage() {
        return $('label.text-success');
    }
    get infoMessage() {
        return $('label.text-info');
    }
    get errorMessage() {
        return $('label.text-danger');
    }
}

export default new LoginPage();
