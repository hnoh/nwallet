// import { PinModalPage } from './1.security/pin/pin';
import { PipesModule } from './../pipes/pipes.module';
import { WalletLoanPage } from './wallet-detail/wallet-loan/wallet-loan';
import { WalletBuyPage } from './wallet-detail/wallet-buy/wallet-buy';
import { CreateAccountPage } from './1.account/createaccount';
import { NgModule } from '@angular/core';
import { WalletDetailPage } from './wallet-detail/wallet-detail';
import { IonicPageModule } from 'ionic-angular';
import { TutorialPage } from './tutorial/tutorial';
import { EntrancePage } from './0.entrance/entrance';
import { WalletPage } from './wallet/wallet';
import { ImportAccountPage } from './1.account/importaccount';
import { FingerprintModalPage } from './1.security/fingerprint/fingerprint';

@NgModule({
    declarations: [TutorialPage, EntrancePage, CreateAccountPage, WalletPage, ImportAccountPage, WalletDetailPage, WalletBuyPage, WalletLoanPage, FingerprintModalPage],
    imports: [
        IonicPageModule.forChild(TutorialPage),
        IonicPageModule.forChild(EntrancePage),
        IonicPageModule.forChild(WalletPage),
        IonicPageModule.forChild(CreateAccountPage),
        IonicPageModule.forChild(ImportAccountPage),
        IonicPageModule.forChild(WalletDetailPage),
        IonicPageModule.forChild(WalletBuyPage),
        IonicPageModule.forChild(WalletLoanPage),
        IonicPageModule.forChild(FingerprintModalPage),
        //IonicPageModule.forChild(PinModalPage),
        PipesModule
    ],
    entryComponents: [TutorialPage, EntrancePage, WalletPage],
})
export class NWalletPageModule {}
