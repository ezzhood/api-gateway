import amqp from "amqplib";
import type { Connection, Channel, ConsumeMessage, Options } from "amqplib";
import { AbstractBroker } from "../abstract-broker";
import type { ApiGateway } from "../../api-gateway";

export class RabbitMQBroker extends AbstractBroker {
    private gateway: ApiGateway;
    private connection: Connection;
    public channel: Channel;

    constructor(gateway: ApiGateway) {
        super();
        this.gateway = gateway;
    }

    public async connect() {
        this.connection = await amqp.connect(this.gateway.connection_uri);
        this.channel = await this.connection.createChannel();
        console.log("Connecting")
    }

    public async close() {
        if (this.connection) {
            await this.connection.close();
        }
    }

    public async send(queue: string, msg: Buffer, options?: Options.Publish | undefined) {
        await this.channel.assertQueue(queue, {durable: true});

        return this.channel.sendToQueue(queue, msg, options);
    }

    public async consume(queue: string, onMessage: (msg: ConsumeMessage | null) => void) {
        await this.channel.assertQueue(queue, {durable: true});

        await this.channel.consume(queue, onMessage, {noAck: true})
    }
}
