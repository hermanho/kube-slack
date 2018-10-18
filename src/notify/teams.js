const config = require('config');
const logger = require('../logger');
const https = require('https');
const teams_url = "";

class TeamsNotifier {
  constructor() {
    let opts = {};
    try {
      this.teams_url = config.get('teams_url');
      console.log(this.teams_url);
    } catch (err) {
      logger.error({err}, 'Could not initialize Teams');
      this.teams_url = null;
    }
  }

  notify(item) {
    if (!this.teams_url) {
      return;
    }

    switch (item.color) {
      case 'danger':
        item.color = 'e00808';
        break;
      default:
        item.color = '0078D7';
    }

    var body = JSON.stringify({
      "@type": "MessageCard",
      "@context": "https://schema.org/extensions",
      "summary": "Kubernetes card",
      "themeColor": item.color,
      "title": item.title,
      "sections": [{
        "text": item.text
      }]
    })

    var url = this.teams_url.toString().replace('https://', '');
    var hostname = url.split(/\/(.+)/)[0];
    var path = url.split(/\/(.+)/)[1];

    var options = {
        hostname: hostname,
        port: 443,
        path: "/" + path,
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Content-Length": Buffer.byteLength(body)
        }
    }

    var req = https.request(options, (res) => {

      res.on('data', (d) => {
        if (res.statusCode == '200') {
          logger.info('Teams message sent');
        }
      });
    });

    req.on('error', (e) => {
      logger.error({ e }, 'Could not send notification to Teams');
    });
    req.write(body)
    req.end();
  }
}

module.exports = TeamsNotifier;
