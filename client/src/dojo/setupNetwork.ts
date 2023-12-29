import { defineContractComponents } from "./contractComponents";
import { world } from "./world";
import manifest from "./manifest.json";
// import manifest from "../../../contracts/target/dev/manifest.json";
import * as torii from "@dojoengine/torii-client";
import { Slayer } from "./generated/Slayer";

export type SetupNetworkResult = Awaited<ReturnType<typeof setupNetwork>>;

export async function setupNetwork() {
    // Extract environment variables for better readability.
    const {
        VITE_PUBLIC_WORLD_ADDRESS,
        VITE_PUBLIC_NODE_URL,
        VITE_PUBLIC_TORII,
    } = import.meta.env;

    // Create a new RPCProvider instance.
    const provider = new Slayer(
        VITE_PUBLIC_WORLD_ADDRESS,
        manifest,
        VITE_PUBLIC_NODE_URL
    );

    const toriiClient = await torii.createClient([], {
        rpcUrl: VITE_PUBLIC_NODE_URL,
        toriiUrl: VITE_PUBLIC_TORII,
        worldAddress: VITE_PUBLIC_WORLD_ADDRESS,
    });

    // Return the setup object.
    return {
        provider,
        world,
        toriiClient,

        // Define contract components for the world.
        contractComponents: defineContractComponents(world),
    };
}
