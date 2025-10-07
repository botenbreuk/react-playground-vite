import { useEffect, useState } from 'react';
import { Alert, Button } from 'reactstrap';
import test from '../../assets/logo.svg';
import { Page } from '../../ui';
import { LineText } from '../../ui/LineText/LineText';
import { Logo } from '../../ui/Logo/Logo';
import { ModalButton } from '../../ui/Modal';

export function Dashboard() {
  const [status, setStatus] = useState(false);
  const [version, setVersion] = useState('');

  useEffect(() => {
    async function fetchStatus() {
      const [response, actuator] = await Promise.all([
        fetch('/api/status'),
        fetch('/api/actuator/info')
      ]);
      const [{ status: responseStatus }, { version: apiVersion }] = await Promise.all([
        response.json(),
        actuator.json()
      ]);

      setStatus(!!responseStatus);
      setVersion(apiVersion);
    }

    fetchStatus();
  }, []);

  return (
    <Page>
      <div className="container-fluid text-sm-center p-5 bg-light">
        <h1 className="display-3">Hello, world!</h1>
        <LineText text={<div style={{ fontSize: '2rem' }}>Example</div>} />

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
        <img src={test} width="80" alt="react-logo" />
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
            <ModalButton
              title="Modal button test"
              button={{ label: 'Click me! Modal test', casing: 'keep-text' }}
              primary={{ onClick: () => undefined }}
            >
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
                veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
                commodo consequat.
              </p>
              <p>
                Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
                dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
                proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
              </p>
            </ModalButton>
          </header>
        </div>
      </div>
    </Page>
  );
}
