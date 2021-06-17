import MultiSelect from 'react-native-multiple-select';
import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList,
  TextInput,
  TextStyle,
  TextInputProps,
  ViewStyle,
  Button,
  Alert,
} from 'react-native';

import BackendService from '../services/BackendService';
import DropDownPicker from 'react-native-dropdown-picker';
import generalStyles from '../generalStyles';
import {useForm, Controller} from 'react-hook-form';
const backendService = new BackendService();

export default function ExchangeSelect(props) {
  // Form
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm();
  const onConnect = (data) => {
    const objToSend = {...data, exchange: exchangeToAdd.value._id};
    backendService
      .connectToExchange(bearerToken, objToSend)
      .then((r) => {
        closeFunction();
      });
  };

  const closeFunction = props.props.closeFunction;
  // Other stuff
  const [user, setUser] = useState(props.props.user);
  const [navigation, setNavigation] = useState(props.props.navigation);
  const [exchanges, setExchanges] = useState([]);
  const [exchangeToAdd, setExchangeToAdd] = useState(null);
  const [bearerToken, setBearerToken] = useState(
    props.props.route.params?.props.bearerToken,
  );

  useEffect(() => {
    let mounted = true;
    backendService.getAllExchanges().then((r) => {
      if (mounted) {
        const newObj = r.data.map((e) => {
          return {label: e.name, value: e};
        });
        let arr = [...newObj];
        console.log('recebi exchanges: ', [...newObj]);
        setExchanges([...newObj]);
      }
    });
    return () => (mounted = false);
  }, []);

  return (
    exchanges.length > 0 && (
      <View style={{flex: 1, backgroundColor: generalStyles.background}}>
        <Text style={{fontSize: 30, marginBottom: 20}}>Connect Exchange</Text>
        <DropDownPicker
          items={exchanges}
          // defaultValue={this.state.exchangeToAdd}
          containerStyle={{height: 40}}
          placeholder="Select exchange"
          style={{backgroundColor: '#fafafa'}}
          itemStyle={{
            justifyContent: 'flex-start',
          }}
          dropDownStyle={{backgroundColor: '#fafafa'}}
          onChangeItem={(item) => {
            console.log('Alterei exchangeToAdd para: ', item);
            setExchangeToAdd(item);
          }}
        />

        {exchangeToAdd && (
          <View>
            <View
              style={{
                flexDirection: 'row',
                alignContent: 'center',
                margin: 20,
              }}>
              <Image
                style={{width: 40, height: 40, marginRight: 10}}
                source={{uri: exchangeToAdd.value.logoUrl}}
              />
              <Text style={{alignSelf: 'center', fontSize: 26, marginLeft: 5}}>
                {exchangeToAdd.label}
              </Text>
            </View>
            <Controller
              control={control}
              render={({field: {onChange, onBlur, value}}) => (
                <View>
                  <Text style={{marginLeft: 10}}>API Key</Text>
                  <TextInput
                    placeholder="Insert API Key"
                    style={{...styles.textInputStyle, margin: 10, width: '80%'}}
                    itemStyle={{marginLeft: 10}}
                    onBlur={onBlur}
                    onChangeText={(value) => onChange(value)}
                    value={value}
                  />
                </View>
              )}
              name="apiKey"
              rules={{required: true}}
              defaultValue=""
            />
            {errors.firstName && <Text>This is required.</Text>}

            <Controller
              control={control}
              render={({field: {onChange, onBlur, value}}) => (
                <View>
                  <Text style={{marginLeft: 10}}>API Secret</Text>
                  <TextInput
                    style={{...styles.textInputStyle, margin: 10, width: '80%'}}
                    placeholder="Insert API Secret"
                    onBlur={onBlur}
                    onChangeText={(value) => onChange(value)}
                    value={value}
                  />
                </View>
              )}
              name="secretKey"
              rules={{required: true}}
              defaultValue=""
            />
            <TouchableOpacity
              onPress={handleSubmit(onConnect)}
              style={styles.buttonContainer}>
              <Text style={{color: 'white'}}>Connect</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    )
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
    marginRight: 10,
    height: 40,

    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',

    // alignSelf: 'center',
    width: 200,
    borderRadius: 30,
    backgroundColor: generalStyles.mainColor,
  },
  textInputStyle: {
    color: 'black',
    backgroundColor: 'white',
    width: 200,
    height: 40,
    borderRadius: 40,

    alignContent: 'center',
    justifyContent: 'center',
  },
});
