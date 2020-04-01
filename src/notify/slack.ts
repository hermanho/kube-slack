import * as config from 'config';
import * as Slack from 'node-slack';
import logger from '../logger';
import { NotifyMessage, NotifierMethod } from '../types';

export default class SlackNotifier implements NotifierMethod {
	slack: Slack | null;

	constructor() {
		let opts: Partial<Slack.Option> = {};

		if (config.has('slack_proxy')) {
			opts.proxy = config.get('slack_proxy');
		}

		try {
			this.slack = new Slack(config.get('slack_url'), opts as Slack.Option);
		} catch (err) {
			logger.error('Could not initialize Slack', err);
			this.slack = null;
		}
		return this;
	}

	notify(item: NotifyMessage) {
		if (!this.slack) {
			return Promise.resolve();
		}

		let channel = item.channel || config.get('slack_channel');
		let username = item.username || config.get('slack_username');
		delete item.channel;

		return this.slack
			.send({
				text: item.text || 'Kubernetes Notification:',
				attachments: [item],
				channel,
				username
			})
			.then(
				() => {
					logger.info('Slack message sent');
				},
				(err: any) => {
					logger.error('Could not send notification to Slack', err);
				}
			);
	}
}
