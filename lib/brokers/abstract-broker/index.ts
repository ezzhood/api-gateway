import type { ApiGateway } from "../../api-gateway";
import type { ConsumeMessage, Options } from "amqplib";

export abstract class AbstractBroker {
    constructor() {}

    abstract connect(): Promise<void>;

    abstract close(): Promise<void>;

    abstract send(queue: string, msg: Buffer, options?: Options.Publish | undefined ): Promise<boolean> 

    abstract consume(queue: string, onMessage: (msg: ConsumeMessage | null) => void): Promise<void>
}
