import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import * as dotenv from 'dotenv';
import { lastValueFrom } from 'rxjs';

dotenv.config();

@Injectable()
export class PaypalService {
  constructor(private readonly httpService: HttpService) {}

  async generateAccessToken(): Promise<string> {
    const { PAYPAL_CLIENT_ID, PAYPAL_CLIENT_SECRET, PAYPAL_BASE } = process.env;
    const auth = Buffer.from(
      `${PAYPAL_CLIENT_ID}:${PAYPAL_CLIENT_SECRET}`,
    ).toString('base64');

    const response = this.httpService.post(
      `${PAYPAL_BASE}/v1/oauth2/token`,
      'grant_type=client_credentials',
      {
        headers: {
          Authorization: `Basic ${auth}`,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      },
    );

    const { data } = await lastValueFrom(response); // Convert observable to a promise
    return data.access_token;
  }

  async createOrder(cart: any): Promise<any> {
    const { PAYPAL_CLIENT_ID, PAYPAL_CLIENT_SECRET, PAYPAL_BASE } = process.env;
    const accessToken = await this.generateAccessToken();
    const url = `${PAYPAL_BASE}/v2/checkout/orders`;
    const payload = {
      intent: 'CAPTURE',
      purchase_units: [
        {
          amount: {
            currency_code: 'USD',
            value: '100.00',
          },
        },
      ],
    };

    const response = this.httpService.post(url, payload, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const { data, status } = await lastValueFrom(response);
    return { jsonResponse: data, status };
  }

  async captureOrder(orderID: string): Promise<any> {
    const { PAYPAL_BASE } = process.env;
    const accessToken = await this.generateAccessToken();
    const url = `${PAYPAL_BASE}/v2/checkout/orders/${orderID}/capture`;
    const response = this.httpService.post(
      url,
      {},
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );

    const { data, status } = await lastValueFrom(response);
    return { jsonResponse: data, status };
  }
}
