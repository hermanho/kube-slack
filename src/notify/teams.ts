import * as config from 'config';
import logger from '../logger';
import * as https from 'https';
import { NotifyMessage } from '../types';

export default class TeamsNotifier {
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
      return;
    }

    switch (item.color) {
      case 'danger':
        item.color = 'e00808';
        break;
      default:
        item.color = '0078D7';
    }

    const body = JSON.stringify({
      "@type": "MessageCard",
      "@context": "https://schema.org/extensions",
      "summary": "Kubernetes card",
      "themeColor": item.color,
      "title": item.title,
      "text": item.text,
      "sections": [{
      }]
    })

    const url = this.teamsUrl.toString().replace('https://', '');
    const hostname = url.split(/\/(.+)/)[0];
    const path = url.split(/\/(.+)/)[1];

    const options = {
      hostname,
      port: 443,
      path: "/" + path,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Content-Length": Buffer.byteLength(body)
      }
    }

    const req = https.request(options, (res) => {

      res.on('data', (d) => {
        if (res.statusCode === 200) {
          logger.info('Teams message sent');
        }
      });
    });

    req.on('error', (e) => {
      logger.error('Could not send notification to Teams\n', e);
    });
    req.write(body)
    req.end();

    return;
  }
}
