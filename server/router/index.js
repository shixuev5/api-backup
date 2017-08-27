const router = require('express').Router();
const path = require('path');
const fs = require('fs');
const archiver = require('archiver');
const exec = require('child_process').exec;
const config = require('../config');
const model = require('../model');

router.route('/project')
.get((req, res) => {
  model.project.getAllProject().then((data) => {
    res.send(data);
  });
})
.post((req, res) => {
  model.project.createProject(req.body).then(() => {
    res.sendStatus(200);
  });
});
router.route('/project/update')
.post((req, res) => {
  model.project.updateProject(req.body).then(() => {
    res.sendStatus(200);
  });
});

router.route('/url/base')
  .get((req, res) => {
    model.urls.getAllBaseUrl().then((data) => {
      res.send(data);
    });
  })
  .post((req, res) => {
    model.urls.createBaseUrl(req.body.baseUrl).then(() => {
      res.sendStatus(200);
    });
  });
router.route('/url/base/update')
  .post((req, res) => {
    model.urls.updateBaseUrl(req.body).then(() => {
      res.sendStatus(200);
    });
  });
// .delete((req, res) => {
//   db.prepare('DELETE FROM baseUrl WHERE id=?').get(req.params.id);
//   res.status(200).send();
// });

router.route('/url/module')
  .get((req, res) => {
    model.urls.getAllModuleUrl().then((data) => {
      res.send(data);
    });
  })
  .post((req, res) => {
    model.urls.createModuleUrl(req.body.moduleUrl).then(() => {
      res.sendStatus(200);
    });
  });
router.route('/url/module/update')
  .post((req, res) => {
    model.urls.updateModuleUrl(req.body).then(() => {
      res.sendStatus(200);
    });
  });
// .delete((req, res) => {
//   db.prepare('DELETE FROM moduleUrl WHERE id=?').get(req.params.id);
//   res.status(200).send();
// });

router.route('/url/server')
  .get((req, res) => {
    model.urls.getAllServerUrl().then((data) => {
      const result = JSON.parse(JSON.stringify(data));
      result.forEach((val) => {
        val.baseUrl = val.baseUrl.baseUrl;
        val.moduleUrl = val.moduleUrl.moduleUrl;
        val.url = val.baseUrl + val.moduleUrl + val.serverUrl;
      });
      res.send(result);
    });
  })
  .post((req, res) => {
    model.urls.createServerUrl(req.body).then((serverUrl) => {
      res.send(serverUrl);
    });
  });

router.route('/url/server/update')
  .post((req, res) => {
    model.urls.updateServerUrl(req.body).then(() => {
      res.sendStatus(200);
    });
  });

router.route('/module/getall')
  .get((req, res) => {
    model.modules.getAllModule().then((data) => {
      res.send(data);
    });
  });
router.route('/module/add')
  .post((req, res) => {
    model.modules.createModule(req.body).then(() => {
      res.sendStatus(200);
    });
  });

router.route('/method/getall')
  .get((req, res) => {
    model.methods.getAllMethod().then((data) => {
      res.send(data);
    });
  });

router.route('/method/add')
  .post((req, res) => {
    model.methods.createMethod(req.body).then(() => {
      res.sendStatus(200);
    });
  });

router.route('/method/update')
  .post((req, res) => {
    model.methods.updateMethod(req.body).then(() => {
      res.sendStatus(200);
    });
  });
router.route('/method/delete')
  .post((req, res) => {
    model.urls.deleteServerUrl(req.body).then(() => {
      model.methods.deleteMethod(req.body).then(() => {
        res.sendStatus(200);
      });
    });
  });

/* eslint-disable */
router.route('/package')
  .post((req, res) => {
    model.urls.getAllServerUrl().then((data) => {
      let serverUrl = JSON.parse(JSON.stringify(data));
      serverUrl.forEach((val) => {
        val.baseUrl = val.baseUrl.baseUrl;
        val.moduleUrl = val.moduleUrl.moduleUrl;
        val.url = val.baseUrl + val.moduleUrl + val.serverUrl;
      });
      if (req.body.moduleId && Array.isArray(req.body.moduleId)) {
        serverUrl = serverUrl.filter(val => req.body.moduleId.indexOf(val.moduleId) > -1);
      }
      fs.writeFileSync(path.join(config.api, 'config/urls.js'), `module.exports = ${JSON.stringify(serverUrl)};`);
    })
    model.methods.getAllMethod().then((data) => {
      let methods = JSON.parse(JSON.stringify(data));
      methods.forEach((val) => {
        val.data = JSON.parse(val.data);
        val.params = JSON.parse(val.params);
        val.moduleName = val.module.name;
      })
      if (req.body.moduleId && Array.isArray(req.body.moduleId)) {
        methods = methods.filter(val => req.body.moduleId.indexOf(val.moduleId) > -1);
      }
      fs.writeFileSync(path.join(config.api, 'config/methods.js'), `module.exports = ${JSON.stringify(methods)};`);
    })

    const command = req.body.version === 'dev' ? 'npm run api:dev' : 'npm run api:prod';

    exec(command, (err, stdout) => {
      if (err) throw err;
      const output = fs.createWriteStream(path.join(config.api, '../dist/ktw.api.zip'));
      const archive = archiver('zip', { zlib: { level: 9 } });      
      archive.pipe(output);
      archive.directory(path.join(config.api, './dist'), false);
      archive.finalize();
      output.on('close', function() {
        res.send({
          message: stdout,
        });
      });
    });
  });


router.route('/markdown')
  .get((req, res) => {
    fs.readFile(path.join(config.api, '../README.md'), {
      encoding: 'utf-8',
    }, (err, data) => {
      if (err) {
        res.status(400).send('error');
      } else {
        res.send(data.toString());
      }
    });
  });

router.use(router);

module.exports = router;
