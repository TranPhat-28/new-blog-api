import { Injectable } from '@nestjs/common';
import { SQSClient, SendMessageCommand } from '@aws-sdk/client-sqs';

@Injectable()
export class MessagingService {
    private readonly sqs = new SQSClient({
        region: process.env.AWS_REGION ?? 'ap-southeast-2',
    });

    async sendLoginNotification(payload: {
        eventType: 'USER_LOGIN';
        userId: string;
        email: string;
        occurredAt: string;
    }) {
        await this.sqs.send(
            new SendMessageCommand({
                QueueUrl: process.env.SQS_LOGIN_NOTIFICATION_QUEUE_URL,
                MessageBody: JSON.stringify(payload),
            }),
        );
    }
}
