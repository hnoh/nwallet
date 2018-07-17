import { WalletBuyPage } from './2.wallet-tab/wallet-detail/wallet-buy/wallet-buy';
import { AccountProvider } from './../../providers/account/account';
import { AppServiceProvider } from './../../providers/app/app.service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TransferTabPage } from './0.transfer-tab/transfer-tab';
import { AccountTabPage } from './4.account-tab/account-tab';
import { LoanNcashTabPage } from './3.loan-ncash-tab/loan-ncash-tab';
import { WalletTabPages, WalletPage } from './2.wallet-tab/wallet-tab';

/**
 * Generated class for the TabcontainerPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
export interface WalletTabContext {
    // title: "Schedule",
    // name: "TabsPage",
    component: any;
    // tabComponent: SchedulePage,
    // index: 0,
    // icon: "calendar"
}

@IonicPage()
@Component({
    selector: 'page-tabcontainer',
    templateUrl: 'tabcontainer.html',
})
export class TabcontainerPage {
    selectedIndex: number;
    tabItems: WalletTabContext[] = [
        {
            component: TransferTabPage,
        },
        {
            component: WalletBuyPage,
        },
        {
            component: WalletPage,
        },
        {
            component: LoanNcashTabPage,
        },
        {
            component: AccountTabPage,
        },
    ];

    constructor(public navCtrl: NavController, public navParams: NavParams, private appService: AppServiceProvider, private account: AccountProvider) {
        this.selectedIndex = 2;
        this.init();
    }

    private async init(): Promise<void> {
        this.account.getAccount().then(async account => {
            await this.appService.login(account);
        });
    }

    chat() {

    }
}

export const NWalletTabPages = [TabcontainerPage, TransferTabPage, WalletBuyPage, LoanNcashTabPage, AccountTabPage, ...WalletTabPages];
