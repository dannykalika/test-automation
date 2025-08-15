import { Page } from './page.js';

class VisibilityPage extends Page {
    get hideBtn() {
        return $('#hideButton');
    }

    get removeBtn() {
        return $('#removedButton');
    }

    get zeroWidthBtn() {
        return $('#zeroWidthButton');
    }

    get overlapBtn() {
        return $('#overlappedButton');
    }

    get transparentBtn() {
        return $('#transparentButton');
    }

    get invisibleBtn() {
        return $('#invisibleButton');
    }

    get noDisplayBtn() {
        return $('#notdisplayedButton');
    }

    get offscreenBtn() {
        return $('#offscreenButton');
    }
}

export default new VisibilityPage();
