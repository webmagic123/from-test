import React, { useState } from 'react';
import {
  Form,
  TextInput,
  TextArea,
  InlineNotification,
  Button,
} from 'carbon-components-react';
import jwt from 'jsonwebtoken';
import { useDispatch, useSelector } from 'react-redux';

import * as HomeStore from './store/home';
import './app.scss';

const Home = () => {
  const dispatch = useDispatch();

  const name = useSelector(HomeStore.name);
  const email = useSelector(HomeStore.email);
  const privateKey = useSelector(HomeStore.privateKey);
  const publicKey = useSelector(HomeStore.publicKey);
  const token = useSelector(HomeStore.token);
  const [error, setError] = useState('');
  const [decodeError, setDecodeError] = useState('');
  const [success, setSuccess] = useState('');
  const [decodeSuccess, setDecodeSuccess] = useState('');
  const [image, setImage] = useState('');

  const handleGenerate = () => {
    setError('');
    setSuccess('');
    setDecodeError('');
    setDecodeSuccess('');
    setImage('');

    if (!name) {
      return setError('Please input name!');
    }

    if (!email) {
      return setError('Please input email!');
    }

    const generated = jwt.sign(
      {
        name,
        email,
      },
      privateKey,
      {
        algorithm: 'RS256',
      }
    );
    dispatch(HomeStore.setToken(generated));
    setSuccess('Generated JWT!');

    fetch('https://picsum.photos/200/300?random=1', {
      method: 'GET',
      headers: {
        Authentication: generated,
      },
    })
      .then(response => response.blob())
      .then(imageBlob => {
        setImage(URL.createObjectURL(imageBlob));
      });
  };

  const handleVerify = () => {
    setError('');
    setSuccess('');
    setDecodeError('');
    setDecodeSuccess('');

    jwt.verify(
      token,
      publicKey,
      {
        algorithm: 'RS256',
      },
      function(err, decoded) {
        if (err) {
          console.log(err);
          setDecodeError('Invalid Token');
        } else {
          dispatch(HomeStore.setName(decoded.name));
          dispatch(HomeStore.setEmail(decoded.email));
          setDecodeSuccess('Signature Verified!');
        }
      }
    );
  };

  return (
    <div className="container">
      <h1>Test</h1>
      <div className="row">
        <div className="column">
          <Form>
            <div className="form-item">
              <TextInput
                labelText="Name"
                value={name}
                id="name"
                onChange={e => dispatch(HomeStore.setName(e.target.value))}
              />
            </div>
            <div className="form-item">
              <TextInput
                type="email"
                labelText="Email"
                value={email}
                id="email"
                onChange={e => dispatch(HomeStore.setEmail(e.target.value))}
              />
            </div>
            <div className="form-item">
              <TextArea
                labelText="Private Key"
                value={privateKey}
                id="jwt"
                onChange={e =>
                  dispatch(HomeStore.setPrivateKey(e.target.value))
                }
              />
            </div>
            {!!error && (
              <div className="form-item">
                <InlineNotification
                  title={error}
                  kind="error"
                  hideCloseButton={true}
                />
              </div>
            )}
            {!!image && (
              <div className="form-item">
                <img src={image} alt="JWT" />
              </div>
            )}
            {!!success && (
              <div className="form-item">
                <InlineNotification
                  title={success}
                  kind="success"
                  hideCloseButton={true}
                />
              </div>
            )}
            <Button onClick={handleGenerate}>Generate</Button>
          </Form>
        </div>
        <div className="column">
          <Form>
            <div className="form-item">
              <TextArea
                labelText="JWT"
                value={token}
                id="jwt"
                rows={15}
                onChange={e => dispatch(HomeStore.setToken(e.target.value))}
              />
            </div>
            <div className="form-item">
              <TextArea
                labelText="Public Key"
                value={publicKey}
                id="jwt"
                onChange={e => dispatch(HomeStore.setPublicKey(e.target.value))}
              />
            </div>
            {!!decodeError && (
              <div className="form-item">
                <InlineNotification
                  title={decodeError}
                  kind="error"
                  hideCloseButton={true}
                />
              </div>
            )}
            {!!decodeSuccess && (
              <div className="form-item">
                <InlineNotification
                  title={decodeSuccess}
                  kind="success"
                  hideCloseButton={true}
                />
              </div>
            )}
            <Button onClick={handleVerify}>Verify</Button>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Home;
