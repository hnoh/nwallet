import { Logger } from '../common/logger/logger';
import { Events } from 'ionic-angular';
import { NWallet } from '../../interfaces/nwallet';
import { Injectable } from '@angular/core';
import { PreferenceProvider, Preference } from '../common/preference/preference';
import { Keypair } from 'stellar-sdk';

@Injectable()
export class AccountProvider {
    public account: NWallet.Account;

    constructor(private event: Events, private preference: PreferenceProvider, private logger: Logger) {
        this.init();
    }

    private async init(): Promise<void> {
        this.account = await this.preference.get(Preference.Nwallet.walletAccount);
    }

    // todo remove me --sky`
    public async setAccount(account: NWallet.Account): Promise<NWallet.Account> {
        await this.preference.set(Preference.Nwallet.walletAccount, account);
        this.account = account;
        return this.account;
    }

    // todo remove me --sky`
    public async getAccount(): Promise<NWallet.Account> {
        if (!this.account) {
            this.account = await this.preference.get(Preference.Nwallet.walletAccount);
        }
        return this.account;
    }

    public getId(): string {
        return this.account.signature.public;
    }



    // todo decoration --sky`
    private checkAccount(): void {
        if (!this.account) {
            throw new Error('[account] account not exist!');
        }
    }

    // public getAsset(): NWallet.AssetContext {
    //     this.checkAccount();

    //     return this.account.wallets.find(wallet => {
    //         return wallet.item.asset.isNative() === true;
    //     });
    // }

    public getNativeWallet(): NWallet.AssetContext {
        this.checkAccount();

        return this.account.wallets.find(wallet => {
            return wallet.item.asset.isNative() === true;
        });
    }

    public generateSignature(secretKey?: string): NWallet.Signature {
        let keyPair: Keypair;
        if (secretKey) {
            keyPair = Keypair.fromSecret(secretKey);
        } else {
            keyPair = Keypair.random();
        }

        return <NWallet.Signature>{
            public: keyPair.publicKey(),
            secret: keyPair.secret(),
        };
    }

    public flush(): void {
        this.account = undefined;
    }
}
