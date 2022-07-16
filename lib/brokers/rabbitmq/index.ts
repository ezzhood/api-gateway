import amqp from "amqplib";
import type { Connection, Channel, ConsumeMessage } from "amqplib";
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
    }

    public async close() {
        if (this.connection) {
            await this.connection.close();
        }
    }
}
