// ftp.js
const ftp = require('ftp');
const express = require('express');

const app = express();
const ftpClient = new ftp();

const ftpConfig = {
  host: 'ftp.sqlare.com',
  port: 21210, // FTP 포트 번호
  user: 'sqlare',
  password: 'qlalfqjsghanjffhgkwlwlsWK'
};

function getFtpFileList(directory, callback) {
  ftpClient.on('ready', function() {
    // 디렉토리 변경
    ftpClient.cwd(directory, function(err, currentDir) {
      if (err) {
        callback(err, null);
      } else {
        // 현재 디렉토리에서 파일 목록 가져오기
        ftpClient.list(function(err, files) {
          if (err) {
            callback(err, null);
          } else {
            const fileList = files.map(file => file.name);
            callback(null, fileList);
          }
          ftpClient.end();
        });
      }
    });
  });

  ftpClient.connect(ftpConfig);
}

app.get('/api/ftp', (req, res) => {
  const directory = req.query.directory || '/'; // 디렉토리는 쿼리 매개변수로 전달
  getFtpFileList(directory, (err, files) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json({ fileList: files });
    }
  });
});

module.exports = app;
