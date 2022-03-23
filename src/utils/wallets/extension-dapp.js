// Copyright 2019-2022 @polkadot/extension-dapp authors & contributors
// SPDX-License-Identifier: Apache-2.0
import { u8aEq } from "@polkadot/util";
import { decodeAddress, encodeAddress } from "@polkadot/util-crypto";
import { u8aUnwrapBytes, u8aWrapBytes } from "@polkadot/util";

const unwrapBytes = u8aUnwrapBytes;
const wrapBytes = u8aWrapBytes;
const win = window;

win.injectedWeb3 = win.injectedWeb3 || {};

export { unwrapBytes, wrapBytes };

export function documentReadyPromise(creator) {
  return new Promise((resolve) => {
    if (document.readyState === "complete") {
      resolve(creator());
    } else {
      window.addEventListener("load", () => resolve(creator()));
    }
  });
}

function web3IsInjected() {
  return Object.keys(win.injectedWeb3).length !== 0;
}

function throwError(method) {
  throw new Error(
    `${method}: web3Enable(originName) needs to be called before ${method}`
  );
}

function mapAccounts(source, list, ss58Format) {
  return list.map(({ address, genesisHash, name, type }) => {
    const encodedAddress =
      address.length === 42
        ? address
        : encodeAddress(decodeAddress(address), ss58Format);
    return {
      address: encodedAddress,
      meta: {
        genesisHash,
        name,
        source,
      },
      type,
    };
  });
}

let isWeb3Injected = web3IsInjected();
let web3EnablePromise = null;
export { isWeb3Injected, web3EnablePromise };

function getWindowExtensions(originName, wallet) {
  return Promise.all(
    Object.entries(win.injectedWeb3)
      .filter(([name]) => name === wallet)
      .map(([name, { enable, version }]) =>
        Promise.all([
          Promise.resolve({
            name,
            version,
          }),
          enable(originName).catch((error) => {
            console.error(`Error initializing ${name}: ${error.message}`);
          }),
        ])
      )
  );
}

export function web3Enable(originName, compatInits = [], wallet) {
  if (!originName) {
    throw new Error(
      "You must pass a name for your app to the web3Enable function"
    );
  }

  const initCompat = compatInits.length
    ? Promise.all(compatInits.map((c) => c().catch(() => false)))
    : Promise.resolve([true]);
  web3EnablePromise = documentReadyPromise(() =>
    initCompat.then(() =>
      getWindowExtensions(originName, wallet)
        .then((values) =>
          values
            .filter((value) => !!value[1])
            .map(([info, ext]) => {
              if (!ext.accounts.subscribe) {
                ext.accounts.subscribe = (cb) => {
                  ext.accounts.get().then(cb).catch(console.error);
                  return () => {};
                };
              }

              return { ...info, ...ext };
            })
        )
        .catch(() => [])
        .then((values) => {
          const names = values.map(({ name, version }) => `${name}/${version}`);
          isWeb3Injected = web3IsInjected();
          console.log(
            `web3Enable: Enabled ${values.length} extension${
              values.length !== 1 ? "s" : ""
            }: ${names.join(", ")}`
          );
          return values;
        })
    )
  );
  return web3EnablePromise;
}

export async function web3Accounts({ accountType, ss58Format } = {}) {
  if (!web3EnablePromise) {
    return throwError("web3Accounts");
  }

  const accounts = [];
  const injected = await web3EnablePromise;
  const retrieved = await Promise.all(
    injected.map(async ({ accounts, name: source }) => {
      try {
        const list = await accounts.get();
        return mapAccounts(
          source,
          list.filter(({ type }) =>
            type && accountType ? accountType.includes(type) : true
          ),
          ss58Format
        );
      } catch (error) {
        return [];
      }
    })
  );
  retrieved.forEach((result) => {
    accounts.push(...result);
  });
  const addresses = accounts.map(({ address }) => address);
  console.log(
    `web3Accounts: Found ${accounts.length} address${
      accounts.length !== 1 ? "es" : ""
    }: ${addresses.join(", ")}`
  );
  return accounts;
}
export async function web3AccountsSubscribe(cb, { ss58Format } = {}) {
  if (!web3EnablePromise) {
    return throwError("web3AccountsSubscribe");
  }

  const accounts = {};

  const triggerUpdate = () =>
    cb(
      Object.entries(accounts).reduce((result, [source, list]) => {
        result.push(...mapAccounts(source, list, ss58Format));
        return result;
      }, [])
    );

  const unsubs = (await web3EnablePromise).map(
    ({ accounts: { subscribe }, name: source }) =>
      subscribe((result) => {
        accounts[source] = result;
        triggerUpdate();
      })
  );
  return () => {
    unsubs.forEach((unsub) => {
      unsub();
    });
  };
}

export async function web3FromSource(source) {
  if (!web3EnablePromise) {
    return throwError("web3FromSource");
  }

  const sources = await web3EnablePromise;
  const found = source && sources.find(({ name }) => name === source);

  if (!found) {
    throw new Error(`web3FromSource: Unable to find an injected ${source}`);
  }

  return found;
}

export async function web3FromAddress(address) {
  if (!web3EnablePromise) {
    return throwError("web3FromAddress");
  }

  const accounts = await web3Accounts();
  let found;

  if (address) {
    const accountU8a = decodeAddress(address);
    found = accounts.find((account) =>
      u8aEq(decodeAddress(account.address), accountU8a)
    );
  }

  if (!found) {
    throw new Error(`web3FromAddress: Unable to find injected ${address}`);
  }

  return web3FromSource(found.meta.source);
}

export async function web3ListRpcProviders(source) {
  const { provider } = await web3FromSource(source);

  if (!provider) {
    console.warn(`Extension ${source} does not expose any provider`);
    return null;
  }

  return provider.listProviders();
}

export async function web3UseRpcProvider(source, key) {
  const { provider } = await web3FromSource(source);

  if (!provider) {
    throw new Error(`Extension ${source} does not expose any provider`);
  }

  const meta = await provider.startProvider(key);
  return {
    meta,
    provider,
  };
}
