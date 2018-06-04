import { Pipe, PipeTransform } from '@angular/core';
import { NWallet } from '../../interfaces/nwallet';

/**
 * Generated class for the CurrencyFormatPipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
    name: 'priceCurrency',
})
// USD only (fix it later!)
export class PriceCurrencyPipe implements PipeTransform {
    /**
     * Takes a value and makes it lowercase.
     */
    transform(wallet: NWallet.WalletItem) {
        const value = Number.parseInt(wallet.amount) * wallet.price;
        const floor = Math.floor(value * 100) / 100;
        return `$${floor} USD`;
    }
}
