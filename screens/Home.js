import React, { useCallback } from 'react';
import {
    View,
    Text
} from 'react-native';
import { MainLayout  } from '.';
import { useDispatch, useSelector } from 'react-redux';
import { getCoinMarket, getHoldings } from '../store/market/marketAction';
import { useFocusEffect } from '@react-navigation/native';
import { COLORS, FONTS, SIZES, dummyData, icons } from '../constants';
import { BalanceInfo, Chart, IconTextButton  } from '../components';

const Home = () => {
    const dispatch = useDispatch();
    const { myHoldings, coins } = useSelector(state => state.marketReducer);
    useFocusEffect(
        useCallback(() => {
            dispatch(getHoldings(dummyData.holdings));
            dispatch(getCoinMarket());
        }, [])
    )

    const totalWallet = myHoldings.reduce((a, b) => a + (b.total || 0), 0);
    const valueChange = myHoldings.reduce((a, b) => a + (b.holding_value_change_7d || 0), 0)
    const percChange = valueChange / (totalWallet - valueChange) * 200;
    console.log(coins[0]?.sparkline_in_7d?.price);

    const renderWalletInfoSection = () => {
        return (
            <View
                style={{
                    paddingHorizontal: SIZES.padding,
                    borderBottomLeftRadius: 25,
                    borderBottomRightRadius: 25,
                    backgroundColor: COLORS.gray,
                }}
            >
                {/* Balance Info */}
                <BalanceInfo  
                    title="Your Wallet"
                    displayAmount={totalWallet}
                    changePct={percChange}
                    containerStyle={{
                        marginTop: 50,
                    }}
                />
    
                {/* Button */}
                <View style={{
                    flexDirection: 'row',
                    marginTop: 30,
                    marginBottom: -15,
                    paddingHorizontal: SIZES.radius
                }}>
                    <IconTextButton 
                        label="Transfer"
                        icon={icons.send}
                        containerStyle={{
                            flex: 1,
                            height: 40,
                            marginRight: SIZES.radius,
                        }}
                        onPress={() => console.log('Transfer')}
                    />
                    <IconTextButton 
                        label="Withdraw"
                        icon={icons.withdraw}
                        containerStyle={{
                            flex: 1,
                            height: 40,
                        }}
                        onPress={() => console.log('Withdraw')}
                    />
                </View>
            </View>
        )
    }

    return (
        <MainLayout>
            <View
                style={{
                    flex: 1,
                    backgroundColor: COLORS.black
                }}
            >
                {/* Header section - Wallet Info*/}
                {renderWalletInfoSection()}

                {/* Chart */}
                <Chart 
                    containerStyle={{
                        marginTop: SIZES.padding * 2
                    }}
                    chartPrices={coins[0]?.sparkline_in_7d?.price}
                />
            </View>
        </MainLayout>
    )
}

export default Home;