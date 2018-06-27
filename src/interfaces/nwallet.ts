import { Asset } from 'stellar-sdk';
export namespace NWallet {
    export interface Account {
        isActivate: boolean;
        signature: Signature;
        address: Address;
        profile: Profile;
        wallets: WalletContext[];
    }

    export interface Address {
        location: string;
    }

    export interface Profile {
        firstName: string;
        middleName?: string;
        lastName: string;
        phoneNumber: { countryCode: string; number: string };
    }

    export interface Signature {
        public: string;
        secret: string;
    }

    export interface WalletItem {
        asset: Asset;
        isNative: boolean;
        price: number;
    }

    export interface WalletContext {
        item: WalletItem;
        amount: string;
    }

    //todo move to other namespace

    export const Assets = {
        NCH: <Asset>undefined,
        NCN: <Asset>undefined,
        XLM: Asset.native(),
    };
    export const NCH = new Asset('NCH', 'GD5KULZRARHGYJHDKDCUYHTY645Z4NP7443WS4HQJSNX45BMHV5CCTM3');
}

export namespace NWallet.Transactions {
    export interface Context {
        pageToken: string;
        records: NWallet.Transactions.Record[];
        hasNext: boolean;
    }

    export interface Record {
        type: string;
        context: WalletContext;
        date: Date;
        id: string;
    }

    export function parseRecords(asset: Asset, data: Object): Record[] {
        const rawRecords = data['records'] as Object[];
        return rawRecords
            .map<Record>(raw => {
                const asset = raw['asset'];
                const item = getOrAddWalletItem(asset['code'], asset['issuer'], raw['native']);
                const amount = raw['amount'];
                const createdAt = raw['created_at'];
                return <Record>{
                    type: raw['type'],
                    context: <WalletContext>{
                        item: item,
                        amount: amount,
                    },
                    date: createdAt,
                    id : '804ddcf3b5b1f912d901d298dff1c30082182b839729dc767be5cbaf9316e588'
                };
            })
            .filter(record => {
                //todo extract --sky
                if (asset.isNative() && record.context.item.asset.isNative()) {
                    return true;
                } else {
                    return (
                        asset.getCode() === record.context.item.asset.getCode() &&
                        asset.getIssuer() === record.context.item.asset.getIssuer() &&
                        asset.getAssetType() === record.context.item.asset.getAssetType()
                    );
                }
            });
    }
}

const Assets = new Map<string, NWallet.WalletItem>([
    [
        'XLM_native',
        <NWallet.WalletItem>{
            asset: Asset.native(),
            price: 0,
        },
    ],
]);

//todo AOP (cache decorator) --sky
export function getOrAddWalletItem(code: string, issuer: string, isNative: boolean): NWallet.WalletItem {
    if (code === 'XLM' && isNative === true) {
        issuer = 'native';
    }

    const key = `${code}_${issuer}`;

    if (Assets.has(key)) {
        return Assets.get(key);
    } else {

        const asset = new Asset(code, issuer);
        if (code === 'NCH' && isNative) {
            NWallet.Assets.NCH = asset;
        }

        if (code === 'NCN' && isNative) {
            NWallet.Assets.NCN = asset;
        }

        return Assets.set(key, <NWallet.WalletItem>{
            asset: asset,
            price: 0,
            isNative: isNative,
        }).get(key);
    }
}
