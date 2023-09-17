// pages/api/ftp.js
const ftp = require('ftp');

export default async function handler(req, res) {
  const { directory } = req.query;
  const ftpClient = new ftp();

  const ftpConfig = {
    host: 'ftp.sqlare.com',
    port: 21210, // FTP 포트 번호
    user: 'sqlare',
    password: 'qlalfqjsghanjffhgkwlwlsWK'
  };

  try {
    // FTP 연결
    ftpClient.connect(ftpConfig);

    ftpClient.on('ready', function() {
      // 디렉토리 변경
      ftpClient.cwd('/'); {
        if (err) {
          res.status(500).json({ error: err.message });
        } else {
          // 현재 디렉토리에서 파일 목록 가져오기
          ftpClient.list(function(err, files) {
            if (err) {
              res.status(500).json({ error: err.message });
            } else {
              const fileList = files.map(file => {
                return {
                  name: file.name,
                  isDirectory: file.type === 'd',
                };
              });
              res.status(200).json({ fileList });
            }
            ftpClient.end();
          });
        }
      });
  });
} catch (error) {
  res.status(500).json({ error: error.message });
}
}
