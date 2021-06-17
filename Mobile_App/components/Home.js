import React, {Component, useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList,
} from 'react-native';

import generalStyles from '../generalStyles';
import {Modal, Portal, Provider} from 'react-native-paper';
import ExchangeSelect from './ExchangeSelect';
import BackendService from '../services/BackendService';

const backendService = new BackendService();

export default function Home(props) {
  console.log('Recebi props: ', props.route.params);

  const [user, setUser] = useState({});
  const [navigation, setNavigation] = useState(props.navigation);
  const [visible, setVisible] = useState(false);
  const [connections, setConnections] = useState([]);
  const [bearerToken, setBearerToken] = useState(
    props.route.params.props.bearerToken,
  );

  useEffect(() => {
    let mounted = true;

    backendService.getUserProfile(bearerToken).then((r) => {
      if (mounted) {
        console.log('Profile is: ', r.data);
        const user = r.data;
        setUser(r.data);
        console.log('Uset ficou ', user);
        backendService.getExchangesForUser(bearerToken).then((r) => {
          console.log('Recebi: ', r);
          const arr = [...r.data?.exchangeConnections];
          console.log('Array ficou: ', arr);
          setConnections(arr);
        });
      }
    });

    return () => (mounted = false);
  }, [bearerToken]);

  const logout = () => {
    // this.setState({username: null, email: null});
    setBearerToken(null);
    console.log("I'll try to logout");
  };

  const showModal = () => {
    setVisible(true);
  };

  const hideModal = () => {
    backendService.getExchangesForUser(bearerToken).then((r) => {
      const arr = [...r.data?.exchangeConnections];
      setConnections(arr);
    });
    setVisible(false);
  };

  const removeExchangeConnection = (userId, connectionId) => {
    backendService.removeExchangeConnection(userId, connectionId).then((r) => {
      backendService.getExchangesForUser(bearerToken).then((r) => {
        const arr = [...r.data?.exchangeConnections];
        setConnections(arr);
      });
    });
  };

  return (
    <Provider>
      <View style={styles.header}>
        <View
          style={{
            marginRight: '20%',
            flexDirection: 'column',
            justifyContent: 'center',
          }}>
          <Image
            style={{alignSelf: 'center', marginLeft: 20, width: 40, height: 40}}
            source={require('../img/Logo_6.png')}
          />
          <Text
            style={{
              alignSelf: 'center',
              fontSize: 20,
              fontWeight: 'bold',
              color: '#BCBCBC',
            }}>
            Magnify
          </Text>
        </View>
      </View>

      <View style={styles.body}>
        <View style={styles.bodyContent}>
          <Text style={styles.name}>Welcome !</Text>
          <Text style={styles.info}>Username: {user.username}</Text>
          <Text style={styles.info}>E-mail: {user.email}</Text>
          <View style={{width: '100%', alignItems: 'center'}}>
            <TouchableOpacity onPress={logout} style={styles.buttonContainer}>
              <Text style={{color: 'white'}}>Logout</Text>
            </TouchableOpacity>

            <Text style={styles.name}>Exchanges</Text>

            <FlatList
              data={connections}
              style={{marginBottom: 5, marginTop: 10}}
              renderItem={({item}) => {
                return (
                  <View
                    style={[
                      styles.container,
                      {
                        // Try setting `flexDirection` to `"row"`.
                        flexDirection: 'row',
                        flex: 1,
                        padding: 5,
                        justifyContent: 'space-between',
                      },
                    ]}>
                    <View style={{flexDirection: 'row'}}>
                      <Image
                        style={{width: 25, height: 25, marginRight: 10}}
                        source={{uri: item.exchange.logoUrl}}
                      />
                      <Text>{item.exchange.name}</Text>
                    </View>
                    <View>
                      <TouchableOpacity
                        onPress={() =>
                          removeExchangeConnection(user._id, item._id)
                        }
                        style={{...styles.miniButton, marginLeft: 50}}>
                        <Text style={{color: 'white'}}>X</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                );
              }}
              keyExtractor={(item, index) => item._id}
            />

            <TouchableOpacity
              onPress={showModal}
              style={styles.buttonContainer}>
              <Text style={{color: 'white'}}>Adicionar Exchange</Text>
            </TouchableOpacity>
          </View>
          <Portal>
            <Modal
              visible={visible}
              onRequestClose={() => {
                console.log('Fechei trigger');
              }}
              onDismiss={hideModal}
              contentContainerStyle={{
                flex: 1,
                backgroundColor: generalStyles.background,
                padding: 20,
                height: '60%',
              }}>
              <ExchangeSelect props={{...props, closeFunction: hideModal}} />
            </Modal>
          </Portal>
        </View>
      </View>
    </Provider>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: generalStyles.mainColor,
    height: 100,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  container: {
    backgroundColor: generalStyles.background,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 63,
    borderWidth: 4,
    borderColor: 'white',
    marginBottom: 10,
    marginLeft: 50,
    alignSelf: 'flex-start',
    position: 'absolute',
    marginTop: 60,
    backgroundColor: generalStyles.background,
    zIndex: 3,
  },
  body: {
    backgroundColor: generalStyles.background,
    flex: 3,
  },
  bodyContent: {
    flex: 1,
    alignSelf: 'flex-start',
    paddingLeft: 30,
    padding: 30,
    backgroundColor: generalStyles.background,
  },
  name: {
    fontSize: 28,
    color: 'white',
    fontWeight: '600',
    marginTop: 20,
  },
  info: {
    fontSize: 16,
    color: '#00BFFF',
    marginTop: 10,
    backgroundColor: generalStyles.background,
  },
  description: {
    fontSize: 16,
    color: 'white',
    marginTop: 10,
    textAlign: 'center',
  },
  buttonContainer: {
    marginTop: 10,
    height: 30,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: 150,
    borderRadius: 30,
    backgroundColor: generalStyles.mainColor,
  },
  miniButton: {
    marginTop: 10,
    height: 30,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: 30,
    borderRadius: 30,
    backgroundColor: generalStyles.mainColor,
  },
});
