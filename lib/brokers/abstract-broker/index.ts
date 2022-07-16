import type { ApiGateway } from "../../api-gateway";

export abstract class AbstractBroker {
    constructor() {}

    abstract connect(): Promise<void>;

    abstract close(): Promise<void>;
}
