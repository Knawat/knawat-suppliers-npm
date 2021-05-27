import { Products } from '../../src';

Products.baseUrl = 'https://dev.mp.knawat.io/api';
const apiRateLimit = {
  reservoir: 1,
  reservoirRefreshInterval: 1000,
  reservoirRefreshAmount: 1,
};
const instance = {
  key: 'd6f54aa0-0e34-11eb-8d4e-c3a9e850ddfa',
  secret: 'c6cc034c-2dc6-43bf-806a-ad993a0cc96e',
  apiRateLimit,
};
const instance2 = {
  apiRateLimit,
  key: '353194b0-4982-11eb-9f6e-914d97a230e9',
  secret: 'd6f2c6df-8f20-4634-95f9-2f7fd1a9f3cd',
};
const client = new Products(instance);
const client2 = new Products(instance2);
const spy = jest.spyOn(client, 'refreshToken');
// const spy2 = jest.spyOn(client2, 'refreshToken');
/**
 * Test Knawat API limit
 */
// SP
const callsToTest = 10;
const bucketSize = 1;
// divide by two (fetch token then fetch fro the request)
const seconds = callsToTest / bucketSize;
jest.setTimeout((seconds + 10) * 2000);
test(`Throttling ${callsToTest} requests in ${seconds}+ seconds`, async done => {
  // call endpoint x times, expect to be finish in x / 2 since we have 2 requests per second
  const startDate = new Date();
  return Promise.all(
    [...Array(callsToTest).keys()].map(async () => {
      return client.getProducts();
    })
  ).then(res => {
    expect(spy).toHaveBeenCalledTimes(1);
    console.log(
      `Took ${(new Date() - startDate) /
        1000} seconds to execute ${callsToTest} requests`
    );
    expect((new Date() - startDate) / 1000).toBeGreaterThanOrEqual(seconds);
    done();
  });
});

jest.setTimeout((seconds + 10) * 5000);
test(`Throttling ${callsToTest} requests in ${seconds}+ seconds with two class instances, new supplier each.`, async done => {
  // call endpoint x times, expect to be finish in x / 2 since we have 2 requests per second
  const startDate = new Date();
  return Promise.all([
    ...[...Array(callsToTest).keys()].map(() => {
      return client.getProducts();
    }),
    ...[...Array(callsToTest).keys()].map(() => {
      return client2.getProducts();
    }),
  ]).then(() => {
    console.log(
      `Took ${(new Date() - startDate) /
        1000} seconds to execute requests from two instances with ${callsToTest} requests each.`
    );
    expect((new Date() - startDate) / 1000).toBeLessThanOrEqual(seconds * 1.3);
    done();
  });
});

test(`Throttling ${callsToTest} requests in ${seconds}+ seconds with new instance each call.`, async done => {
  // call endpoint x times, expect to be finish in x / 2 since we have 2 requests per second
  const client3 = new Products(instance);
  await client3.getProducts();
  const token = await client3.token;
  const startDate = new Date();
  return Promise.all(
    [...Array(callsToTest).keys()].map(() => {
      return new Products({ token, apiRateLimit }).getProducts();
    })
  ).then(() => {
    console.log(
      `Took ${(new Date() - startDate) /
        1000} seconds to execute ${callsToTest} requests with a new instace each`
    );
    expect((new Date() - startDate) / 1000).toBeLessThanOrEqual(seconds * 1.3);
    expect((new Date() - startDate) / 1000).toBeGreaterThanOrEqual(seconds - 1);
    done();
  });
});
