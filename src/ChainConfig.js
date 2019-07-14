var config = {
  core_asset: "DST",
  address_prefix: "DST",
  expire_in_secs: 15,
  expire_in_secs_proposal: 24 * 60 * 60,
  review_in_secs_committee: 24 * 60 * 60,
  networks: {
    DST: {
      core_asset: "DST",
      address_prefix: "DST",
      chain_id:
        "2b4bcdbc9cd28f1517c5a44e0125780b574f15f4d52ccfd4c6675ef9a3a5c1a8"
    }
  },

  /** Set a few properties for known chain IDs. */
  setChainId: chain_id => {
    let result = Object.entries(config.networks).find(
      ([network_name, network]) => {
        if (network.chain_id === chain_id) {
          config.network_name = network_name;

          if (network.address_prefix) {
            config.address_prefix = network.address_prefix;
          }
          return true;
        }
      }
    );

    if (result) return { network_name: result[0], network: result[1] };
    else console.log("Unknown chain id (this may be a testnet)", chain_id);
  },

  reset: () => {
    config.core_asset = "DST";
    config.address_prefix = "DST";
    config.expire_in_secs = 15;
    config.expire_in_secs_proposal = 24 * 60 * 60;

    console.log("Chain config reset");
  },

  setPrefix: (prefix = "DST") => (config.address_prefix = prefix)
};

export default config;
