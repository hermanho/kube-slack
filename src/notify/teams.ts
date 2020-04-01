import * as config from 'config';
import * as bent from 'bent';
import logger from '../logger';
import { NotifyMessage, NotifierMethod } from '../types';

export default class TeamsNotifier implements NotifierMethod {
  teamsUrl: string | null;

  constructor() {
    try {
      this.teamsUrl = config.get('teams_url');
      logger.info('teamsUrl: ' + this.teamsUrl);
    } catch (err) {
      logger.error('Could not initialize Teams', err);
      this.teamsUrl = null;
    }
  }

  notify(item: NotifyMessage) {
    if (!this.teamsUrl) {
      return Promise.resolve();
    }

    switch (item.color) {
      case 'danger':
        item.color = 'e00808';
        break;
      default:
        item.color = '0078D7';
    }

    const data = {
      "@type": "MessageCard",
      "@context": "https://schema.org/extensions",
      "summary": "Kubernetes card",
      "themeColor": item.color,
      "title": item.title,
      "text": item.text,
      "sections": [{
      }]
    };

    const hostname = this.teamsUrl.split(/\/(.+)/)[0];
    const path = this.teamsUrl.split(/\/(.+)/)[1];

    const post = bent(hostname, 'POST', 'json', 200);
    const response = post(path, data)
      .then(
        (r) => {
          logger.info('Teams message sent');
          return r;
        },
        (err: any) => {
          logger.error('Could not send notification to Teams', err);
        }
      );
    return response;

    // const options = {
    //   hostname,
    //   port: 443,
    //   path: "/" + path,
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //     "Content-Length": Buffer.byteLength(body)
    //   }
    // }

    // const req = https.request(options, (res) => {

    //   res.on('data', (d) => {
    //     if (res.statusCode === 200) {
    //       logger.info('Teams message sent');
    //     }
    //   });
    // });

    // req.on('error', (e) => {
    //   logger.error('Could not send notification to Teams\n', e);
    // });
    // req.write(body)
    // req.end();

    // return;
  }
}
