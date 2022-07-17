import { AbstractBroker } from "./brokers/abstract-broker";
import { RabbitMQBroker } from "./brokers/rabbitmq";
type BrokerType = "rabbitmq" | "apache-kafka" | "nats";

interface IService {
    url: string;
    name: string;
}

interface Broker {
    methods: string[];
    abilities: string[];
}

/**
 * This is the main class, the entry point to api-gateway.
 */
export class ApiGateway {
    private protocol: string | null;
    public connection_uri: string;
    private broker: AbstractBroker;
    private services: IService[];
    /**
     * Instantiate with broker type, connection url
     */
    constructor(message_broker: BrokerType, connection_uri: string) {
        this.connection_uri = connection_uri;

        switch (message_broker) {
            case "rabbitmq":
                this.protocol = "amqp";
                this.broker = new RabbitMQBroker(this);
                break;
            case "apache-kafka":
                // TODO: continue from here
                break;
            case "nats":
                break;
            default:
                break;
        }
    }

    public async init() {
        await this.broker.connect();
    }

    public async stop() {
        await this.broker.close();
    }

    // TODO: to be removed, just for testing
    public getBroker(){
        return this.broker;
    }

    register(service: IService) {}
}
