import assert from "assert";
import {Apis} from "../lib";

var coreAsset;
var default_api = "ws://163.172.142.178:8839";

describe("Connection", () => {

    afterEach(function() {
        return new Promise(function(res) {
            Apis.close().then(res);
        })
    });

    it("Connect to Mainnet", function() {
        return new Promise( function(resolve, reject) {
            Apis.instance(default_api, true).init_promise.then(function (result) {
                coreAsset = result[0].network.core_asset;
                assert(coreAsset === "DST");
                resolve();
            }).catch(reject)
        });
    });

    it("Connect to Testnet", function() {
        return new Promise( function(resolve, reject) {
            Apis.instance("ws://163.172.142.178:8839", true).init_promise.then(function (result) {
                coreAsset = result[0].network.core_asset;
                assert(coreAsset === "TEST");
                resolve();
            }).catch(reject)
        });
    });

    it("Times out properly", function() {
        return new Promise( function(resolve, reject) {
            /* 1ms connection timeout */
            Apis.instance(default_api, true, 1).init_promise.then(function() {
                reject();
            }).catch(function(err) {
                assert(err.message.search("Connection attempt timed out") !== -1);
                resolve();
            })
        });
    });

    it("Can be closed", function() {
        return new Promise( function(resolve, reject) {
            Apis.instance(default_api, true).init_promise.then(function (result) {
                coreAsset = result[0].network.core_asset;
                assert(coreAsset === "BTS");
                Apis.instance().close().then(function() {
                    resolve();
                }).catch(reject)
            })
        });
    });
});

describe("Connection reset", () => {
    afterEach(function() {
        return new Promise(function(res) {
            Apis.close().then(res);
        })
    });

    it("Resets between chains", function() {
        return new Promise( function(resolve, reject) {
            Apis.instance(default_api, true).init_promise.then(function (result) {
                coreAsset = result[0].network.core_asset;
                assert(coreAsset === "BTS");
                Apis.reset("wss://node.testnet.bitshares.eu", true).then(instance => {
                    instance.init_promise.then(function (result) {
                        coreAsset = result[0].network.core_asset;
                        assert(coreAsset === "TEST");
                        resolve();
                    }).catch(reject)
                })

            });
        });
    });
});
