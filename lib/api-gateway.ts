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
    private broker: Broker;
    private services: IService[];
    /**
     * Instantiate with broker type, connection url
     */
    constructor(message_broker: BrokerType, connection_url: string) {
        switch (message_broker) {
            case "rabbitmq":
                this.protocol = "amqp";
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

    register(service: IService) {}
}
