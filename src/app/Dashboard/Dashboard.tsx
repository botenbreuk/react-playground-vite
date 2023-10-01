import { useEffect, useState } from 'react';
import { Alert, Button } from 'reactstrap';
import test from '../../assets/logo.svg';
import { ConfirmModal, Page } from '../../ui';
import Logo from '../../ui/Logo/Logo';

export function Dashboard() {
  const [status, setStatus] = useState(false);
  const [version, setVersion] = useState('');

  useEffect(() => {
    async function fetchStatus() {
      const [response, actuator] = await Promise.all([
        fetch('/api/status'),
        fetch('/api/actuator/info')
      ]);
      const [{ status }, { version }] = await Promise.all([
        response.json(),
        actuator.json()
      ]);

      setStatus(!!status);
      setVersion(version);
    }

    fetchStatus();
  }, []);

  return (
    <Page>
      <div className="container-fluid text-sm-center p-5 bg-light">
        <h1 className="display-3">Hello, world!</h1>
        <p className="lead">
          This is a simple hero unit, a simple Jumbotron-style component for calling extra
          attention to featured content or information.
        </p>
        <p>
          <dl>
            <dt>Mode</dt>
            <dd>{import.meta.env.MODE}</dd>
            <dt>Environment var:</dt>
            <dd>
              {import.meta.env.VITE_USERNAME} {import.meta.env.VITE_PASSWORD}
            </dd>
            <dt>Package version: </dt>
            <dd>{VITE_VERSION}</dd>
          </dl>
        </p>
        <p>API is {status ? ' running' : 'not running'}</p>
        <p>API version: {version}</p>
        <img src={test} width="80" />
        <hr className="my-2" />
        <p>
          It uses utility classes for typography and spacing to space content out within
          the larger container.
        </p>
        <p
          className="lead"
          style={{ display: 'flex', justifyContent: 'center', gap: '0.8rem' }}
        >
          <Button color="primary">Learn More</Button>
          <Button color="secondary">Learn More</Button>
          <Button color="danger">Learn More</Button>
          <Button color="success">Learn More</Button>
          <Button color="warning">Learn More</Button>
          <Button color="info">Learn More</Button>
        </p>
        <p
          className="lead"
          style={{ display: 'flex', justifyContent: 'center', gap: '0.8rem' }}
        >
          <Button color="primary" outline>
            Learn More
          </Button>
          <Button color="secondary" outline>
            Learn More
          </Button>
          <Button color="danger" outline>
            Learn More
          </Button>
          <Button color="success" outline>
            Learn More
          </Button>
          <Button color="warning" outline>
            Learn More
          </Button>
          <Button color="info" outline>
            Learn More
          </Button>
        </p>
      </div>
      <div id="main">
        <div>
          <header className="app-header">
            <Logo className="app-logo" />
            <p>
              Edit <code>src/App.tsx</code> and save to reload.
            </p>
            <Alert color="primary">This is a primary alert — check it out!</Alert>
            <ConfirmModal buttonLabel="Test" />
          </header>
        </div>
      </div>
    </Page>
  );
}
