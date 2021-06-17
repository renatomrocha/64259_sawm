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

export default function Portfolio(props) {
  const [user, setUser] = useState(props.route.params.user);
  const [navigation, setNavigation] = useState(props.navigation);
  const [visible, setVisible] = useState(false);
  const [connections, setConnections] = useState([]);

  useEffect(() => {
    let mounted = true;
    backendService
      .getExchangesForUser({id: '60573c4be67c22b31929f2d5'})
      .then((r) => {
        if (mounted) {
          const arr = [...r.data?.exchangeConnections];
          setConnections(arr);
        }
      });
    return () => (mounted = false);
  }, []);

  const logout = () => {
    console.log("I'll try to logout");
  };

  const showModal = () => {
    setVisible(true);
  };

  const hideModal = () => {
    backendService
      .getExchangesForUser({id: '60573c4be67c22b31929f2d5'})
      .then((r) => {
        const arr = [...r.data?.exchangeConnections];
        setConnections(arr);
      });
    setVisible(false);
  };

  return (
    <Provider style={styles.container}>
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
          <Text style={styles.info}>Username {user.username}</Text>
          <Text style={styles.info}>E-mail {user.email}</Text>
          {/* <Text style={styles.description}>Lorem ipsum dolor sit amet, saepe sapientem eu nam. Qui ne assum electram expetendis, omittam deseruisse consequuntur ius an,</Text> */}
          <View style={{width: '100%', alignItems: 'center'}}>
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
                        padding: 5,
                      },
                    ]}>
                    <Image
                      style={{width: 25, height: 25, marginRight: 10}}
                      source={{uri: item.exchange.logoUrl}}
                    />
                    <Text>{item.exchange.name}</Text>
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
});
