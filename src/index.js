import dva from 'dva';
import {message} from 'antd';
import './index.css';

const app = dva();

app.use({
  onError(e) {
    message.error(e.message);
    console.log(e);
  },
});

app.model(require('./models/contentSwitch'));

app.router(require('./router'));

app.start('#root');
