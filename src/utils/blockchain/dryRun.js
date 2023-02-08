import { BN } from "@polkadot/util";

const toContractAbiMessage = (contractPromise, message) => {
  const value = contractPromise.abi.messages.find((m) => m.method === message);

  if (!value) {
    const messages = contractPromise?.abi.messages
      .map((m) => m.method)
      .join(", ");

    const error = `"${message}" not found in metadata.spec.messages: [${messages}]`;
    console.error(error);

    return { ok: false, error };
  }

  return { ok: true, value };
};

export default async function getGasLimit(
  api,
  userAddress,
  message,
  contract,
  options = {},
  args = []
) {
  const abiMessage = toContractAbiMessage(contract, message);

  if (!abiMessage.ok) return abiMessage;

  const { value, gasLimit, storageDepositLimit } = options;

  const { gasRequired } = await api.call.contractsApi.call(
    userAddress,
    contract.address,
    value ?? new BN(0),
    gasLimit ?? null,
    storageDepositLimit ?? null,
    abiMessage.value.toU8a(args)
  );

  // FOR DEV ONLY
  // if (process.env.NODE_ENV === "development") {
  //   console.table({
  //     ActionType: message,
  //     "gasRequired.refTime": gasRequired.refTime.toHuman(),
  //     "gasRequired.proofSize": gasRequired.proofSize.toHuman(),
  //   });

  //   const { data: balance } = await api.query.system.account(userAddress);

  //   const now = await api.query.timestamp.now();

  //   console.table({
  //     "Log time": now.toString(),
  //     "Balance START":
  //       balance.free.toHuman().slice(0, -16) +
  //       "." +
  //       balance.free.toHuman().slice(-15, -8),
  //   });
  // }

  return { ok: true, value: gasRequired };
}
